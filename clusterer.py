"""
Class that computes the clustering
"""

import os.path
import random
from shutil import copyfile

import cv2
import matplotlib
import numpy as np
import scipy.io.wavfile
import scipy.ndimage.morphology as morph
import sklearn.cluster as cluster
import torch
from scipy.ndimage.measurements import label

matplotlib.use('Agg')
import matplotlib.pyplot as plt

import utils
from ablate import gantest


class Clusterer():
    def __init__(self, dataloader, model, path_store, model_dim=512, max_datapoints=10000, num_clusters=250,
                 num_images_segment=10, save_results=False, load_datapoints=False, load_clustering=False,
                 load_name_final=False, load_histogram=False, output_size=256, args=None):
        """
        Clusterer class
        :param dataloader: dataloader
        :param model: model
        :param model_dim: dimensions of the feature space
        :param max_datapoints: number of datapoints used to compute the clusters
        :param num_clusters: number of clusters. Currently fixed
        :param num_images_segment: number of images to soft-segment
        :param save_results: boolean. Save intermediate results
        :param path_store: path where the intermediate results are stored
        :param load_datapoints: boolean. load datapoints instead of computing them
        :param load_clustering: boolean. load clusters instead of computing them
        :param load_name_final: boolean. load cluster representatives instead of computing them
        """
        self.output_size = output_size
        self.path_store = path_store
        self.max_datapoints = max_datapoints
        self.num_clusters = num_clusters
        self.args = args

        seed = 1
        torch.cuda.manual_seed_all(seed)
        torch.manual_seed(seed)
        np.random.seed(seed)
        random.seed(seed)

        # This list only represent the layers that will be prepared to be ablated, NOT the layers that will be ablated
        # Alternatively we can just select the layers in args.layers
        layer_list_all = ['layer2', 'layer3', 'layer4', 'layer5', 'layer6']
        self.generator = gantest.GanTester(self.args.path_model_gan, layer_list_all, device=torch.device('cuda'))

        self.z = self.generator.standard_z_sample(200000)

        self.load = {'datapoints': load_datapoints, 'clustering': load_clustering, 'name_final': load_name_final,
                     'histogram': load_histogram}
        self.num_images_segment = num_images_segment
        self.save_results = save_results
        if save_results:
            os.makedirs(self.path_store, exist_ok=True)

        self.dataloader = dataloader
        self.model = model
        self.model_dim = model_dim

        self.datapoints_audio = None
        self.datapoints_image = None
        self.datapoints_mul = None
        self.names = None
        self.centroids = None
        self.final_names = None
        self.segmentations = None
        self.seg_audios = None
        self.names_images = None
        self.names_im = None
        self.indexes = None
        self.mean_centroids = None
        self.var_centroids = None

    def create_clusters(self, iteration=0):
        """
        Create clusters from a trained audio model
        :param iteration: iteration the clusterer was called. Simply for logging purposes
        :return: numpy tensor of self.num_clusters x self.model_dim
        """
        print('Computing datapoints')
        if not self.load['datapoints']:
            with torch.no_grad():
                self.get_datapoints()
            if self.save_results:
                print(f'saving in {self.path_store}')
                torch.save(self.datapoints_image, os.path.join(self.path_store,
                                                               f'datapoints_image_{iteration}.pth.tar'))
                torch.save(self.names_im, os.path.join(self.path_store, f'names_im_{iteration}.pth.tar'))
                torch.save(self.datapoints_audio, os.path.join(self.path_store,
                                                               f'datapoints_audio_{iteration}.pth.tar'))
                torch.save(self.names, os.path.join(self.path_store, f'names_{iteration}.pth.tar'))
                torch.save(self.datapoints_mul, os.path.join(self.path_store, f'datapoints_mul_{iteration}.pth.tar'))
        else:
            print('Loading datapoints')
            self.datapoints_image = torch.load(os.path.join(self.path_store, f'datapoints_image_{iteration}.pth.tar'))
            self.names_im = torch.load(os.path.join(self.path_store, f'names_im_{iteration}.pth.tar'))
            self.datapoints_audio = torch.load(os.path.join(self.path_store, f'datapoints_audio_{iteration}.pth.tar'))
            self.names = torch.load(os.path.join(self.path_store, f'names_{iteration}.pth.tar'))
            self.datapoints_mul = torch.load(os.path.join(self.path_store, f'datapoints_mul_{iteration}.pth.tar'))

        print('Computing histogram')
        if not self.load['histogram']:
            n_total, bins_total = self.compute_histograms()
            self.indexes = (n_total[:, 0] < 6000) & (n_total.max(1) < 10000)
            if sum(self.indexes) < 40:
                self.indexes = (n_total[:, 0] < 10000) & (n_total.max(1) < 10000)
            if self.save_results:
                torch.save(self.indexes, os.path.join(self.path_store, f'indexes_{iteration}.pth.tar'))
        else:
            self.indexes = torch.load(os.path.join(self.path_store, f'indexes_{iteration}.pth.tar'))

        self.mean_centroids = np.mean(self.datapoints_image, axis=0)
        self.var_centroids = np.std(self.datapoints_image, axis=0)

        print('Clustering')
        if not self.load['clustering']:
            self.cluster_datapoints(self.indexes)
            if self.save_results:
                torch.save(self.centroids, os.path.join(self.path_store, f'centroids_{iteration}.pth.tar'))
                torch.save(self.mean_centroids, os.path.join(self.path_store, f'mean_{iteration}.pth.tar'))
                torch.save(self.var_centroids, os.path.join(self.path_store, f'var_{iteration}.pth.tar'))
        else:
            self.centroids = torch.load(os.path.join(self.path_store, f'centroids_{iteration}.pth.tar'))
            self.mean_centroids = torch.load(os.path.join(self.path_store, f'mean_{iteration}.pth.tar'))
            self.var_centroids = torch.load(os.path.join(self.path_store, f'var_{iteration}.pth.tar'))

        return self.centroids, self.mean_centroids, self.var_centroids

    def get_datapoints(self):
        """
        Compute datapoints
        :return: datapoints and path names identifying all the datapoints
        """
        names_audio = []
        names_image = []
        finish = False

        dim = self.model_dim
        datapoints_image = np.zeros((self.max_datapoints, dim))
        datapoints_audio = np.zeros((self.max_datapoints, dim))
        datapoints_mul = np.zeros((self.max_datapoints, dim))
        current_datapoints_image = 0
        current_datapoints_audio = 0
        current_datapoints_mul = 0
        finish_image = False
        finish_audio = False

        for batch_id, (image_input, audio_input, _, nframes, path, image_raw) in enumerate(self.dataloader):
            # print(f'Current datapoints: ({current_datapoints_image}, '
            #       f'{current_datapoints_audio})/{self.max_datapoints}')
            if finish:
                break

            path_ints = [p.split('/')[-1] for p in path]  # in case the audio is inside a subfolder

            v_init = self.z[int(path_ints[0])]
            z_img = torch.FloatTensor(audio_input.size(0), v_init.shape[0])

            for k in range(audio_input.size(0)):
                z_img[k, :] = self.z[int(path_ints[k])]

            image_input = self.generator.generate_images(z_img, intervention=None)
            image_input = utils.transform(image_input)

            image_input = image_input.cuda(async=True)
            audio_input = audio_input.cuda(async=True)

            model_output = self.model(image_input, audio_input, [])
            image_output = model_output[0]
            audio_output = model_output[1]

            pooling_ratio = round(audio_input.size(3) / audio_output.size(3))
            nframes.div_(pooling_ratio)

            # Compute matchmap to detect where there are important concepts that we want to cluster
            for i in range(image_input.shape[0]):
                nF = nframes[i]
                matchmap_i = utils.compute_matchmap(image_output[i], audio_output[i][:, :, 0:nF])

                matchmap = matchmap_i.data.cpu().numpy().copy()
                matchmap = matchmap.transpose(2, 0, 1)  # l, h, w
                matchmap = matchmap / matchmap.max()
                ind_max = np.argmax(matchmap)
                ind_t = ind_max // (matchmap.shape[2] * matchmap.shape[1])
                ind_h = (ind_max % (matchmap.shape[2] * matchmap.shape[1])) // matchmap.shape[1]
                ind_w = (ind_max % (matchmap.shape[2] * matchmap.shape[1])) % matchmap.shape[1]

                d_audio = audio_output[i][:, 0, ind_t].view(-1)
                d_image = image_output[i][:, ind_h, ind_w].view(-1)

                d_all = d_audio * d_image
                datapoints_mul[current_datapoints_mul:current_datapoints_mul + 1] = d_all.cpu().numpy()
                current_datapoints_mul = current_datapoints_mul + 1

                # Computing image
                matchmap_i_max = matchmap_i.mean(2).view(-1)
                structure = np.ones(3, dtype=np.int)
                labeled, ncomponents = label(matchmap_i_max.cpu() > 0.5 * matchmap_i_max.max().cpu(), structure)
                indexes = np.zeros(ncomponents)
                for n in range(ncomponents):
                    indexes[n] = np.array(np.where(labeled == n + 1)).mean().round().astype(int)
                num_datapoints = len(indexes)
                if current_datapoints_image + num_datapoints > self.max_datapoints:
                    num_datapoints = self.max_datapoints - current_datapoints_image
                datapoints_i = image_output[i].view(image_output.shape[1], -1)[:, indexes[:num_datapoints]]

                if num_datapoints > 0:
                    datapoints_image[current_datapoints_image:current_datapoints_image + num_datapoints] = \
                        datapoints_i.transpose(1, 0).cpu().numpy()

                names_i = []
                for index in indexes[:num_datapoints]:
                    names_i.append((path[i], index))
                names_image[current_datapoints_image:current_datapoints_image + num_datapoints] = names_i
                current_datapoints_image += num_datapoints
                if current_datapoints_image >= self.max_datapoints:
                    finish_image = True

                matchmap_i_max, _ = matchmap_i.max(1)
                matchmap_i_max, _ = matchmap_i_max.max(0)

                structure = np.ones(3, dtype=np.int)
                labeled, ncomponents = label(matchmap_i_max.cpu() > 0.5 * matchmap_i_max.max().cpu(), structure)
                indexes = np.zeros(ncomponents)
                for n in range(ncomponents):
                    indexes[n] = np.array(np.where(labeled == n + 1)).mean().round().astype(int)

                num_datapoints = len(indexes)

                if current_datapoints_audio + num_datapoints > self.max_datapoints:
                    num_datapoints = self.max_datapoints - current_datapoints_audio
                if num_datapoints > 0:
                    datapoints_i = audio_output[i][..., indexes[:num_datapoints]]. \
                        view(audio_output.shape[1], num_datapoints)
                    datapoints_audio[current_datapoints_audio:current_datapoints_audio + num_datapoints] = \
                        datapoints_i.transpose(1, 0).cpu().numpy()

                names_i = []
                for index in indexes[:num_datapoints]:
                    names_i.append((path[i], index))
                names_audio[current_datapoints_audio:current_datapoints_audio + num_datapoints] = names_i

                current_datapoints_audio += num_datapoints

                if current_datapoints_audio >= self.max_datapoints:
                    finish_audio = True

                if finish_image and finish_audio:
                    finish = True

        if current_datapoints_image < self.max_datapoints:
            datapoints_image = datapoints_image[:current_datapoints_image]

        if current_datapoints_audio < self.max_datapoints:
            datapoints_audio = datapoints_audio[:current_datapoints_audio]

        if current_datapoints_mul < self.max_datapoints:
            datapoints_mul = datapoints_mul[:current_datapoints_mul]

        self.datapoints_audio = datapoints_audio
        self.datapoints_image = datapoints_image
        self.datapoints_mul = datapoints_mul
        self.names_im = names_image
        self.names = names_audio

        return datapoints_image, names_image

    def compute_histograms(self):
        datapoints = self.datapoints_image
        n_total = []
        bins_total = []
        for i in range(512):
            n, bins, patches = plt.hist(x=datapoints[:, i], bins=20)
            # maxfreq = n.max()
            # plt.ylim(ymax=np.ceil(maxfreq / 10) * 10 if maxfreq % 10 else maxfreq + 10)
            # plt.savefig(os.path.join(self.path_store, 'histograms_image', f'hist{i}.jpg'))
            # plt.cla()
            n_total.append(n)
            bins_total.append(bins)

        return np.array(n_total), bins_total

    def cluster_datapoints(self, indexes):
        """
        Create clusters from data points
        :return: return centroids
        """
        # We cluster using the datapoints from the two modalities
        datapoints = np.concatenate([self.datapoints_image, self.datapoints_audio])

        names_list = ['image', 'audio', 'product']

        Html_file = open(os.path.join(self.path_store, 'visualize_clusters.html'), "w")
        Html_file.write('<table>')
        threshold_list = [0.9, 0.95, 0.99]
        Html_file.write('<tr>')
        Html_file.write('<td>Threshold</td>')
        Html_file.write('<td>Image Correlation</td>')
        Html_file.write('<td>Audio Correlation</td>')
        Html_file.write('<td>Product Correlation</td>')
        Html_file.write('</tr>')

        for th in threshold_list:
            for i, ds in enumerate([self.datapoints_image, self.datapoints_audio, self.datapoints_mul]):
                activation_units = np.quantile(ds, th, axis=0) + 1e-7
                activation_units = activation_units.reshape((-1, ds.shape[1]))
                activation_units = np.repeat(activation_units, ds.shape[0], axis=0)
                dat = ds > activation_units
                dat = dat.astype(float)
                counts_units = dat.sum(axis=0)
                counts_i = counts_units.reshape((-1, ds.shape[1])).repeat(ds.shape[1], axis=0)
                counts_j = counts_units.reshape((ds.shape[1], -1)).repeat(ds.shape[1], axis=1)
                count_ij = np.matmul(dat.transpose(), dat)
                corr = (count_ij) / (counts_i + counts_j - count_ij + 1e-10)

                for j in range(corr.shape[0]): corr[j, j] = 0

                path_corr = os.path.join(self.path_store, 'correlation_{0}_{1}.jpg'.format(names_list[i], str(th)))
                corr_viz = corr
                svd = np.linalg.svd(corr_viz)
                v = abs(svd[2][0, :])
                idx = np.argsort(-v)
                corr_viz = corr_viz[idx, :]
                corr_viz = corr_viz[:, idx]
                mask_im = corr_viz * 255
                mask_im = mask_im.astype(np.uint8)
                mask_im = cv2.applyColorMap(mask_im, cv2.COLORMAP_JET)
                cv2.imwrite(path_corr, mask_im)
            Html_file.write('<tr>')
            Html_file.write('<td>' + str(th) + '</td>')
            Html_file.write('<td><img src="' + os.path.join('correlation_image_{0}.jpg'.format(str(th))) + '"</td>')
            Html_file.write('<td><img src="' + os.path.join('correlation_audio_{0}.jpg'.format(str(th))) + '"</td>')
            Html_file.write('<td><img src="' + os.path.join('correlation_product_{0}.jpg'.format(str(th))) + '"</td>')
        Html_file.write('</tr>')
        Html_file.write('</table>')

        # Calculate distance first
        distance_matrix = 1 - corr

        cluster_agg = cluster.AgglomerativeClustering(n_clusters=self.num_clusters, affinity='precomputed',
                                                      linkage='average')
        classification = cluster_agg.fit_predict(distance_matrix)

        for i in range(corr.shape[0]):
            corr[i, i] = 1

        centroids = np.zeros((self.num_clusters, datapoints.shape[1]))

        for i in range(self.num_clusters): centroids[i] = (classification == i).astype(float)
        ids_mul = centroids.sum(1) > 3
        centroids = centroids[ids_mul, :]
        self.num_clusters = ids_mul.astype(int).sum()

        max_units = centroids.sum(1)

        for i in range(self.num_clusters): centroids[i] = centroids[i] / max_units[i]

        self.centroids = centroids
        return centroids

    def name_clusters(self):
        """
        Find representatives for the audio clusters. Simply for visualization purposes.
        :return: dict with the input signals representing each cluster
        """
        if not self.load['name_final']:
            assert self.datapoints_audio is not None
            assert self.centroids is not None
            assert self.names is not None
            # print('Assigning cluster representatives')

            datapoints = self.datapoints_audio

            def get_audio(names, i):
                path, index = names[i]
                audio_raw, nframes = self.dataloader.dataset.load_audio_raw(path=path, return_nframes=True)
                feature_map_binary = np.zeros(self.output_size)
                feature_map_binary[index.astype(int)] = 1
                feature_map_morph = morph.binary_dilation(feature_map_binary,
                                                          structure=np.ones(int(3) * self.output_size // 32))
                mask_base_audio = cv2.resize(feature_map_morph.astype(float), (1, 451584 * 2))
                mask_audio = mask_base_audio.copy()
                mask_audio = np.reshape(mask_audio, (-1))
                mask_audio[nframes:] = 0
                audio_mask = audio_raw[np.where(mask_audio > 0.5)]
                return audio_mask

            num_words_per_cluster = 100

            final_names = {}

            values = np.matmul(self.centroids.astype(float), datapoints.transpose(1, 0))
            values = values / np.maximum(values.sum(0), 100)

            for c in range(self.num_clusters):
                max_words_indexes = np.argsort(-values[c])[:num_words_per_cluster]
                final_names[c] = [get_audio(self.names, index) for index in max_words_indexes]

            if self.save_results:
                torch.save(final_names, os.path.join(self.path_store, f'name_final.pth.tar'))

        else:
            final_names = torch.load(os.path.join(self.path_store, f'name_final.pth.tar'))

        self.final_names = final_names
        return final_names

    def name_with_images_clusters(self):
        """
        Find representatives for the clusters, now with images. Simply for visualization purposes.
        :return: list of dicts. For each cluster, 5 key-value pairs in the dict {path: mask}
        """

        if not self.load['name_final']:  # We use the same flag
            assert self.centroids is not None
            assert self.names_im is not None
            assert self.datapoints_image is not None

            datapoints = self.datapoints_image
            values = np.matmul(self.centroids.astype(float), datapoints.transpose(1, 0))

            num_images_per_cluster = 100

            return_vector = []
            audio_output = torch.FloatTensor(self.centroids).cuda()
            audio_output = audio_output.transpose(1, 0).view(self.centroids.shape[1], 1, self.centroids.shape[0])

            with torch.no_grad():
                for c in range(self.num_clusters):
                    dict_c = {}
                    max_images_indexes = np.argsort(-values[c])
                    for i in range(num_images_per_cluster):
                        count = 0
                        im_index = max_images_indexes[i]
                        path, index = self.names_im[im_index]

                        while path in dict_c:
                            count = count + 1
                            im_index = max_images_indexes[i + count]
                            path, index = self.names_im[im_index]

                        path_ints = path.split('/')[-1]  # in case the audio is inside a subfolder

                        v_init = self.z[int(path_ints)]
                        z_img = torch.FloatTensor(1, v_init.shape[0])
                        z_img[0, :] = v_init

                        image_input = self.generator.generate_images(z_img, intervention=None)
                        image_input = utils.transform(image_input)

                        model_output = self.model(image_input, None, [])
                        image_output = model_output[0]
                        mask = utils.compute_matchmap(image_output[0], audio_output).cpu().numpy()[:, :, c]
                        th = 0.64
                        binary_mask = mask > mask.max() * th
                        per = binary_mask.astype(float).sum() / 64.0
                        while per < 0.2:
                            binary_mask = mask > mask.max() * th
                            per = binary_mask.astype(float).sum() / 64.0
                            th = th - 0.02

                        dict_c[path] = binary_mask

                    return_vector.append(dict_c)

            if self.save_results:
                torch.save(return_vector, os.path.join(self.path_store, f'names_images.pth.tar'))

        else:
            return_vector = torch.load(os.path.join(self.path_store, f'names_images.pth.tar'))

        self.names_images = return_vector
        return return_vector

    def segment_images(self):
        assert self.centroids is not None

        with torch.no_grad():
            while True:
                self.segmentations, self.seg_audios = self.segment_images_iter()

                # Clean clusters
                c_repeated = np.zeros(self.centroids.shape[0])
                counter = 0
                for im_index, v_im in self.segmentations.items():
                    for pixel, v_pix in v_im.items():
                        counter += 1
                        for i in v_pix:
                            c_repeated[i] += 1

                if (c_repeated > 0.5 * counter).sum() == 0:
                    break
                else:
                    self.centroids[c_repeated > 0.5 * counter] = np.zeros(self.centroids.shape[1])

    def segment_images_iter(self):
        images = {}
        audios = {}
        counter_images = 0
        for batch_id, (image_input, audio_input, _, nframes, path, image_raw) in enumerate(self.dataloader):

            v_init = self.z[int(path[0])]
            z_img = torch.FloatTensor(audio_input.size(0), v_init.shape[0])

            for k in range(audio_input.size(0)):
                z_img[k, :] = self.z[int(path[k])]

            image_input = self.generator.generate_images(z_img, intervention=None)
            image_input = utils.transform(image_input)

            audio_input = audio_input.cuda(async=True)

            model_output = self.model(image_input, audio_input, [])
            image_output = model_output[0]
            audio_output = model_output[1]

            pooling_ratio = round(audio_input.size(3) / audio_output.size(3))
            nframes = nframes.div(pooling_ratio)

            # Compute matchmap to detect where there are important concepts that we want to cluster (this time in image)
            for i in range(image_input.shape[0]):
                nF = nframes[i]
                matchmap_i = utils.compute_matchmap_mul_audio(image_output[i], audio_output[i][:, :, 0:nF])
                matchmap_i_mean = matchmap_i.mean(2).view(-1)
                indexes = np.where(matchmap_i_mean > 0.9 * matchmap_i_mean.max())[0]
                features_im = image_output[i].view(image_output.shape[1], -1)[..., indexes].cpu().numpy()

                product = np.matmul(self.centroids, features_im)

                # For each selected superpixel in the image, find top 5 concepts
                seg_image = {}
                for j, index in enumerate(indexes):
                    clust = np.argsort(-product[:, j])[:5]
                    seg_image[index] = clust
                images[path[i]] = seg_image

                # Also for the audio, for testing purposes
                matchmap_i_max = matchmap_i.max(1)[0].max(0)[0]
                indexes = np.where(matchmap_i_max > 0.9 * matchmap_i_max.max())[0]
                features_au = audio_output[i].view(audio_output.shape[1], -1)[..., indexes].cpu().numpy()

                product = np.matmul(self.centroids, features_au)

                # For each selected superpixel in the image, find top 5 concepts
                seg_audio = {}
                for j, index in enumerate(indexes):
                    clust = np.argsort(-product[:, j])[:5]
                    seg_audio[index + 20] = clust
                audios[path[i]] = seg_audio

                counter_images += 1
                if counter_images >= self.num_images_segment:
                    return images, audios

        return images, audios

    def create_web_clusters(self, with_images=False):
        assert self.final_names is not None
        if with_images:
            assert self.names_images is not None

        def create_images(names_images, cluster_id):
            images_cluster = names_images[cluster_id]
            final_images = []
            for k, binary_mask in images_cluster.items():
                path = k
                image = self.dataloader.dataset.load_image_raw(path)
                struct_element = [[True]] * 1  # 6  # 10 in a total scale of matchmap_l (128)
                binary_mask = morph.binary_dilation(binary_mask, struct_element)  # Temporal smoothing
                mask_resize = np.array([cv2.resize(binary_mask.astype(float),
                                                   (image.shape[1], image.shape[0]))] * 3).transpose(1, 2, 0)
                im_final = np.multiply(image, mask_resize)
                final_images.append(im_final)
            image_join_ = np.concatenate(final_images, 1)
            return image_join_

        name_html = f'cluster_representatives'
        file_html = os.path.join(self.path_store, name_html)
        title = 'CLUSTER REPRESENTATIVES'
        html = '<style>hr {display: block;height: 1px;border: 0;border-top: 3px solid #ccc;margin: 1em 0;padding: 0;' \
               'border-color: blue}</style>'
        html = html + '<h1 align="center">' + title + '</h1><br>'

        audio_folder = os.path.join(self.path_store, f'audio')
        image_folder = os.path.join(self.path_store, f'image')
        os.makedirs(image_folder, exist_ok=True)
        os.makedirs(audio_folder, exist_ok=True)

        for i in range(len(self.final_names)):
            audio2file = np.concatenate(self.final_names[i], axis=0)
            audio2file = np.reshape(audio2file, (-1))
            path_audio = os.path.join(self.path_store, f'audio', 'cluster%03d.wav' % i)
            path_audio_simple = os.path.join(f'audio', 'cluster%03d.wav' % i)
            scipy.io.wavfile.write(path_audio, 44100, audio2file.astype(np.int16))
            html = html + f'\n<br>CLUSTER {i}<br>'
            html = html + f'<audio controls><source src="{path_audio_simple}" type="audio/wav"></audio>'

            if with_images:
                image_join = create_images(self.names_images, i)
                path_image = os.path.join(self.path_store, f'image', 'cluster%03d.jpg' % i)
                path_image_simple = os.path.join(f'image', 'cluster%03d.jpg' % i)

                image_join = cv2.cvtColor(image_join.astype(np.uint8), cv2.COLOR_RGB2BGR)
                cv2.imwrite(path_image, image_join)
                html = html + f'<img src="{path_image_simple}" width="20000" height="200">'
            html = html + '<hr>'

        with open(file_html + '.html', 'w') as f:
            f.write(html)
            print('HTML {} saved'.format(name_html))

        return

    def create_web_images(self):
        assert self.segmentations is not None
        assert self.seg_audios is not None

        name_html = f'image_soft_segmentation'
        file_html = os.path.join(self.path_store, name_html)
        title = 'SOFT SEGMENTATION'
        html = '<style>hr {display: block;height: 1px;border: 0;border-top: 3px solid #ccc;margin: 1em 0;padding: 0;' \
               'border-color: blue}</style>'
        html = html + '<h1 align="center">' + title + '</h1><br>'

        if not os.path.exists(os.path.join(self.path_store, f'images')):
            os.makedirs(os.path.join(self.path_store, f'images'), exist_ok=True)
            os.makedirs(os.path.join(self.path_store, f'text_image'), exist_ok=True)
            os.makedirs(os.path.join(self.path_store, f'audioim'), exist_ok=True)
            os.makedirs(os.path.join(self.path_store, f'text_audioim'), exist_ok=True)

        for (path, properties), (path, properties_audio) in zip(self.segmentations.items(), self.seg_audios.items()):
            html = html + f'\n<hr><br><br>IMAGE {path}<br><td><nobr>'

            # Image part
            path_image = os.path.join(self.path_store, f'images', f'{path}.jpg')
            path_image_simple = os.path.join(f'images', f'{path}.jpg')

            copyfile(os.path.join(self.dataloader.dataset.path_dataset, 'images', f'{path}.jpg'), path_image)

            path_text = os.path.join(self.path_store,
                                     f'text_image', f'{path}.txt')
            path_text_simple = os.path.join(f'text_image', f'{path}.txt')

            text = ''
            for p, num in properties.items():
                text = text + f'{str(p)}: {str(num)}\n'
            f = open(path_text, 'w')
            f.write(text)
            f.close()

            html = html + f'<img src="{path_image_simple}" width=200>'
            html = html + '<table style="width:20%" >'
            for i in range(14):
                html = html + '<tr>'
                for j in range(14):
                    if (14 * i + j) in properties:
                        html = html + f'<td>{14*i+j:02d}</td>'
                    else:
                        html = html + f'<td>--</td>'
                html = html + '</tr>'
            html = html + '</table>'
            html = html + f'<embed src="{path_text_simple}" width="700" height="200">'

            # Audio part
            path_audioim = os.path.join(self.path_store, f'audioim', f'{path}.mp3')
            path_audioim_simple = os.path.join(f'audioim', f'{path}.mp3')

            copyfile(os.path.join(self.dataloader.dataset.path_dataset, 'audio', f'{path}.mp3'), path_audioim)

            path_text_audioim = os.path.join(self.path_store,
                                             f'text_audioim', f'{path}.txt')
            path_text_audioim_simple = os.path.join(f'text_audioim', f'{path}.txt')

            text = ''
            for p, num in properties_audio.items():
                text = text + f'{str(p)}: {str(num)}\n'
            f = open(path_text_audioim, 'w')
            f.write(text)
            f.close()

            html = html + f'<audio controls><source src="{path_audioim_simple}" type="audio/wav"></audio>'
            html = html + '<table style="width:80%" >'
            for i in range(1):
                html = html + '<tr>'
                for j in range(256):
                    if j in properties_audio:
                        html = html + f'<td>{j:03d}</td>'
                    else:
                        html = html + f'<td>-</td>'
                html = html + '</tr>'
            html = html + '</table>'
            html = html + f'<embed src="{path_text_audioim_simple}" width="700" height="200">'

            html = html + '</nobr></td>'

        with open(file_html + '.html', 'w') as f:
            f.write(html)
            print('HTML {} saved'.format(name_html))
        return
