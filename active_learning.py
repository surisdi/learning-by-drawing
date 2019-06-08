"""
File with all the active learning functionality, both for generating new active learning samples, and for using them
This code works for a single layer ablations. This means that the training before and after collecting them only makes
sense for one layer ablations (and it has to be the same layer)
If working with active learning, the parameter 'clustering' has to be set to True.
"""

import os
import time

import cv2
import numpy as np
import torch
from PIL import Image, ImageDraw

import utils
from clusterer import Clusterer


def generate_active_learning(trainer):
    """
    Generate active learning samples, selecting the positive/negative pairs in which the model has the highest error
    The saved information is:
    - Current clusters. They are necessary to generate the same negative (as they select the mask)
    - jpg negative images. Only needed to get the captions. Not needed for training (as they will be GAN-generated)
    - Information to generate the negative images (masks and units, and the associated paths)

    This information is saved in {args.active_learning_path}/{trainer.args.name_checkpoint}_{str(time.time())}/

    When training with these images, it is recommended to start from the same checkpoint used for obtaining them.

    After this, the next steps before running again the system with the new samples are:
    - Collecting captions of the active learning samples (the negatives; the positives already have captions)
    - Adding the new collected samples to the dataset. The can be added in a separate folder, and only modifying the
    name_list_{}.txt files is enough. Note that the noise ID (and thus the name of the file) will already exist (for the
    positive one), so save the new ones in an "active" subfolder.
    """

    assert len(trainer.layer_list_all) == 1, 'Active learning is only implemented for a single layer ablations'

    trainer.clusterer.save_results = True
    clus, mean_clust, std_clust, _ = trainer.clusterer.create_clusters(iteration=0)
    trainer.clusters = torch.FloatTensor(clus).cuda()
    trainer.mean_clust = torch.FloatTensor(mean_clust)
    trainer.std_clust = torch.FloatTensor(std_clust)
    trainer.cluster_counts = 1 / trainer.clusters.max(1)[0]
    trainer.clusters_unit = trainer.cluster_counts.view(trainer.clusters.size(0), 1).expand_as(trainer.clusters) * \
                            trainer.clusters

    trainer.clusterer.name_with_images_clusters()
    trainer.clusterer.name_clusters()

    trainer.optimize_neurons()

    if not trainer.args.use_cpu:
        torch.cuda.synchronize()
    data_time = utils.AverageMeter()

    # Switch to train mode
    trainer.model.eval()

    active_learning_name = os.path.join(trainer.args.active_learning_path,
                                        f'{trainer.args.name_checkpoint}_{str(time.time())}')

    end = time.time()

    all_loss = []
    all_hmap = []
    all_hmap_eval = []
    all_units = []
    all_paths = []

    for batch_id, (image_input, audio_input, neg_images, nframes, path, image_raw) in \
            enumerate(trainer.loaders['train']):
        print(batch_id)

        # Measure data loading time
        data_time.update(time.time() - end)

        if not trainer.args.use_cpu:
            audio_input = audio_input.cuda(async=True)

        if not trainer.args.loading_image:
            if trainer.args.active_learning:
                path_ints = [p.split('/')[-1] for p in path]
            else:
                path_ints = path

            v_init = trainer.z[int(path_ints[0])]
            z_img = torch.FloatTensor(image_input.size(0), v_init.shape[0])

            for k in range(image_input.size(0)):
                z_img[k, :] = trainer.z[int(path_ints[k])]

            image_input = trainer.generator.generate_images(z_img, intervention=None)
            image_input = utils.transform(image_input).detach()

        else:
            image_input = image_input.cuda()
            neg_images = neg_images.cuda()

        model_output = trainer.model(image_input, audio_input, [])
        image_output = model_output[0]
        audio_output = model_output[1]

        neg_images = []

        pooling_ratio = round(audio_input.size(3) / audio_output.size(3))
        nframes.div_(pooling_ratio)

        binary_mask_0 = None

        if trainer.loss_type == 'negatives_edited' or trainer.loss_type == 'negatives_both':
            limits = np.zeros((image_input.size(0), 2))

            for i in range(image_input.size(0)):
                pos_image = image_input[i, :, :, :]

                nF = nframes[i]

                matchmap = utils.compute_matchmap(image_output[i], audio_output[i][:, :, :nF])

                positive_score = utils.matchmap_sim(matchmap).detach()
                matchmap = matchmap.data.cpu().numpy().copy()

                matchmap = matchmap.transpose(2, 0, 1)  # l, h, w
                matchmap = matchmap / (matchmap.max() + 1e-10)
                matchmap_image = matchmap.max(axis=0)
                threshold = 0.95

                # ind_max = np.argmax(matchmap_image)
                ind_max = np.argmax(matchmap)
                ind_t = ind_max // (matchmap.shape[2] * matchmap.shape[1])
                ind_h = (ind_max % (matchmap.shape[2] * matchmap.shape[1])) // matchmap.shape[1]
                ind_w = (ind_max % (matchmap.shape[2] * matchmap.shape[1])) % matchmap.shape[1]

                limits[i, 0] = ind_t
                limits[i, 1] = ind_t + 1

                v = (image_output[i][:, ind_h, ind_w] - trainer.mean_clust.cuda()) / (trainer.std_clust.cuda() + 1e-8)

                normalized_clusters = np.matmul(trainer.clusters.cpu(), v.detach().cpu().numpy().transpose())
                sorted_val = -np.sort(-normalized_clusters[:])
                sorted_val = np.clip(sorted_val, 0, 4)
                prob_samples = sorted_val / np.sum(sorted_val)
                sorted_id = np.argsort(-normalized_clusters[:])
                cluster_id = sorted_id[0]

                norm = 0
                threshold_random = 0.95

                # The number of units to be ablated grows if we cannot generate a good (changed) negative
                # The following numbers are the starting number of units to change
                num_units_dict = {'layer2': 30, 'layer3': 30, 'layer4': 140, 'layer5': 30, 'layer6': 30}
                thresold_heatmap = threshold

                count = 0
                binary_mask_eval = matchmap_image > (thresold_heatmap * matchmap_image.max())
                binary_mask_eval = utils.geodesic_dilation(binary_mask_eval, (ind_h, ind_w))
                binary_mask_eval = cv2.resize(binary_mask_eval, (128, 128))
                all_hmap_eval.append(binary_mask_eval)
                bmask = torch.Tensor(binary_mask_eval).cuda()
                bmask = bmask.view(1, 128, 128).expand(3, 128, 128)
                all_paths.append(path_ints[i])

                while norm < threshold_random:
                    with torch.no_grad():
                        binary_mask = matchmap_image > (thresold_heatmap * matchmap_image.max())
                        binary_mask = utils.geodesic_dilation(binary_mask, (ind_h, ind_w))

                        if binary_mask_0 is None:
                            binary_mask_0 = cv2.resize(binary_mask, (224, 224))

                        z_img = trainer.z[int(path_ints[i])]
                        z_img = z_img[np.newaxis, :]

                        _ = trainer.generator.generate_images(z_img)
                        intervention = {}
                        for layer_n in trainer.layer_list_all:  # This will only be one layer
                            units_ids = trainer.layers_units[layer_n][cluster_id][:num_units_dict[layer_n]]
                            layer_size = trainer.layers_dict[layer_n]['size']
                            layer_dim = trainer.layers_dict[layer_n]['depth']

                            ablation, replacement = trainer.get_ablation_replacement(params=[layer_dim, units_ids],
                                                                                     option='specific')
                            ablation_final = cv2.resize(binary_mask, (layer_size, layer_size))
                            ablation_final = np.tile(ablation_final, (layer_dim, 1, 1)).astype(np.float32)
                            ablation_final = torch.cuda.FloatTensor(ablation_final)
                            ablation_final = ablation.view(layer_dim, 1, 1).expand_as(ablation_final) * ablation_final
                            intervention[layer_n] = (ablation_final, replacement)

                        neg_img = trainer.generator.generate_images(z_img, intervention=intervention).detach()
                        neg_img_t = utils.transform(neg_img).detach()

                        binary_mask = cv2.resize(binary_mask, (128, 128))
                        norm = (neg_img_t[0, :, :, :] - pos_image.detach())
                        norm_im = torch.norm(norm, dim=0)
                        norm = norm * bmask
                        im_dif = norm
                        norm = torch.norm(torch.norm(torch.norm(norm, dim=2), dim=1), dim=0)
                        norm_normalized = norm / torch.norm(torch.norm(torch.norm(pos_image.detach() * bmask, dim=2),
                                                                       dim=1), dim=0)
                        norm = norm_normalized.item()
                        for layer_n in trainer.layer_list_all:
                            num_units_dict[layer_n] = num_units_dict[layer_n] + 40  # increase units to change
                        thresold_heatmap = thresold_heatmap - 0.1

                        threshold_random = threshold_random - 0.05

                        cluster_id = np.random.choice(sorted_id, size=(1), p=prob_samples)[0]

                        count = count + 1

                neg_images.append(neg_img.detach())
                all_hmap.append(binary_mask)
                all_units.append(units_ids)

            neg_images = torch.cat(neg_images)
            neg_images_t = utils.transform(neg_images)

            image_output_neg, _, _ = trainer.model(neg_images_t, None, [])

            loss_list = trainer.vectorized_negatives_loss(image_output, audio_output, image_output_neg, nframes)
            loss_list = [x.detach() for x in loss_list]
            all_loss.extend(loss_list)

    all_loss = [x.view(1, -1) for x in all_loss]
    all_loss = torch.cat(all_loss).view(-1, 1)
    _, ind = all_loss.topk(3000, 0)
    ind = [x.item() for x in ind]

    a_units = [all_units[i] for i in ind]
    a_paths = [all_paths[i] for i in ind]
    a_hmaps = [all_hmap[i] for i in ind]
    a_hmaps_eval = [all_hmap_eval[i] for i in ind]

    torch.save(a_units, os.path.join(active_learning_name, 'units.pth'))
    torch.save(a_paths, os.path.join(active_learning_name, 'a_paths.pth'))
    torch.save(a_hmaps, os.path.join(active_learning_name, 'a_hmaps.pth'))
    torch.save(a_hmaps_eval, os.path.join(active_learning_name, 'a_hmaps_eval.pth'))

    os.makedirs(os.path.join(active_learning_name, 'images'), exist_ok=True)
    os.makedirs(os.path.join(active_learning_name, 'hm'), exist_ok=True)

    for j in range(len(a_units)):
        path = a_paths[j]
        units_ids = a_units[j]
        binary_mask = a_hmaps[j]
        layer_n = trainer.layer_list_all[0]
        layer_size = trainer.layers_dict[layer_n]['size']
        layer_dim = trainer.layers_dict[layer_n]['depth']
        intervention = {}
        ablation, replacement = trainer.get_ablation_replacement(params=[layer_dim, units_ids], option='specific')
        ablation_final = cv2.resize(binary_mask, (layer_size, layer_size))
        ablation_final = np.tile(ablation_final, (layer_dim, 1, 1)).astype(np.float32)
        ablation_final = torch.cuda.FloatTensor(ablation_final)
        ablation_final = ablation.view(layer_dim, 1, 1).expand_as(ablation_final) * ablation_final
        intervention[layer_n] = (ablation_final, replacement)
        z_img = trainer.z[int(path)]
        z_img = z_img[np.newaxis, :]
        neg_img = trainer.generator.generate_images(z_img, intervention=intervention).detach()
        neg_im = neg_img[0, :, :, :].cpu().numpy().transpose(1, 2, 0)
        neg_im = neg_im.astype(np.uint8)
        neg_im = Image.fromarray(neg_im.astype('uint8'), 'RGB')

        draw = ImageDraw.Draw(neg_im)
        hm = a_hmaps_eval[j]
        rows = np.any(hm, axis=1)
        cols = np.any(hm, axis=0)
        rmin, rmax = np.where(rows)[0][[0, -1]]
        cmin, cmax = np.where(cols)[0][[0, -1]]
        draw.rectangle(((cmin, rmin), (cmax, rmax)), outline='red')

        neg_im.save(os.path.join(active_learning_name, 'images', f'{j}_hn.jpg'))
        binary_mask_eval = cv2.resize(a_hmaps_eval[j], (128, 128))
        mask_im = binary_mask_eval * 255
        mask_im = mask_im.astype(np.uint8)
        mask_im = mask_im.reshape((128, 128, 1))
        mask_im = np.concatenate((mask_im, mask_im, mask_im), axis=2)

        mask_im = Image.fromarray(mask_im.astype('uint8'), 'RGB')
        mask_im.save(os.path.join(active_learning_name, 'hm', f'{j}_hn.jpg'))


def get_clusterer(trainer, args, output_size, model):
    assert len(trainer.layer_list_all) == 1, 'Active learning is only implemented for a single layer ablations'
    assert args.clustering, 'Active learning samples are associated with a specific clustering. The clustering flag ' \
                            'is necessary'
    active_paths = torch.load(os.path.join(args.active_learning_name, 'a_paths.pth'))
    active_units = torch.load(os.path.join(args.active_learning_name, 'units.pth'))
    active_binary_masks = torch.load(os.path.join(args.active_learning_name, 'a_hmaps.pth'))

    trainer.active_dict = {}
    for i, path in enumerate(active_paths):
        trainer.active_dict[path] = {'mask': active_binary_masks[i], 'units': active_units[i], 'index': i}

    cluster_path = os.path.join(args.active_learning_name, 'cluster')
    trainer.clusterer = Clusterer(trainer.loaders['train'], model, path_store=cluster_path,
                                  model_dim=args.embedding_dim, load_datapoints=True, load_histogram=True,
                                  load_clustering=True, load_name_final=True, save_results=True,
                                  output_size=output_size, args=args)
    return trainer.clusterer


def get_negatives(trainer, path_i):
    with torch.no_grad():
        intervention = {}
        data = trainer.active_dict[path_i]
        binary_mask = data['mask']
        units_ids = data['units']
        layer_n = trainer.layer_list_all[0]
        layer_size = trainer.layers_dict[layer_n]['size']
        layer_dim = trainer.layers_dict[layer_n]['depth']
        ablation, replacement = trainer.get_ablation_replacement(params=[layer_dim, units_ids], option='specific')
        ablation_final = cv2.resize(binary_mask, (layer_size, layer_size))
        ablation_final = np.tile(ablation_final, (layer_dim, 1, 1)).astype(np.float32)
        ablation_final = torch.cuda.FloatTensor(ablation_final)
        ablation_final = ablation.view(layer_dim, 1, 1).expand_as(ablation_final) * ablation_final
        intervention[layer_n] = (ablation_final, replacement)
        z_img = trainer.z[int(path_i)]
        z_img = z_img[np.newaxis, :]
        neg_img = trainer.generator.generate_images(z_img, intervention=intervention).detach()

        return neg_img


def switch_pos_neg(trainer, image_input, image_output, image_output_neg, path):
    if trainer.loss_type == 'negatives_edited' or trainer.loss_type == 'negatives_both':
        # When we caption negative images in the active learning process in order to use them as positives, we
        # still have to create them as negatives (with interventions), but then we move them to the "positive"
        # tensor. And their negative is the image that originally was positive. So we basically swap these.
        for i in range(image_input.size(0)):
            if 'active' in path[i]:  # we identify the active learning images with a 'active' in the path
                aux = image_output[i]
                image_output[i] = image_output_neg[i]
                image_output_neg[i] = aux

    return image_output, image_output_neg
