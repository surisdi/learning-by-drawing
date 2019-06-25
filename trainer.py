import json
import os
import random
import time

import cv2
import numpy as np
import torch
from netdissect import dissect, GeneratorSegRunner
from netdissect.easydict import EasyDict
from netdissect.modelconfig import annotate_model_shapes
from netdissect.pidfile import mark_job_done
from netdissect.progress import verbose_progress
from netdissect.zdataset import z_sample_for_model
from torch.utils.data import TensorDataset

import active_learning
import losses
import utils
from ablate import gantest
from clusterer import Clusterer
from segmenter import ClusterSegmenter


class Trainer:

    def __init__(self, model, optimizer, all_loaders, args, resume_epoch):

        self.resume_epoch = resume_epoch
        self.args = args

        self.optimizer = torch.optim.SGD((model.parameters()), args.lr, momentum=args.momentum,
                                         weight_decay=args.weight_decay)

        self.layer_list_all = args.layers
        self.layers_dict = {
            'layer2': {'name': 'layer2', 'depth': 512, 'size': 4},
            'layer3': {'name': 'layer3', 'depth': 512, 'size': 8},
            'layer4': {'name': 'layer4', 'depth': 512, 'size': 8},
            'layer5': {'name': 'layer5', 'depth': 256, 'size': 16},
            'layer6': {'name': 'layer6', 'depth': 256, 'size': 16},
        }

        self.generator = gantest.GanTester(args.path_model_gan, self.layer_list_all, device=torch.device('cuda'))
        self.z = self.generator.standard_z_sample(200000)

        self.model = model
        self.optimizer = optimizer
        self.loaders = all_loaders
        self.loss_type = args.loss_type

        # Other parameters
        self.margin = args.margin
        self.clustering = args.clustering

        self.epoch = 0
        self.unorm = utils.UnNormalize(mean=(0.485, 0.456, 0.406), std=(0.229, 0.224, 0.225))

        output_size = 32 if 'large' in args.audio_model else 256

        if args.active_learning:
            active_learning.get_clusterer(self, args, output_size, model)
        else:
            if args.clustering:
                print('Creating cluster from scratch')
                cluster_path = os.path.join(self.args.results, 'clusters',
                                            args.name_checkpoint + '_' + str(time.time()))
                self.clusterer = Clusterer(self.loaders['train'], model, path_store=cluster_path,
                                           model_dim=args.embedding_dim, save_results=True, output_size=output_size,
                                           args=self.args, path_cluster_load=args.path_cluster_load)

        self.epochs_clustering = self.args.epochs_clustering
        self.clusters = self.mean_clust = self.std_clust = self.cluster_counts = self.clusters_unit = None

    def train(self):
        """
        Main training loop. For each epoch train the model and save checkpoint if the results are good.
        Cluster every epochs_clustering epochs
        """
        best_eval = 0

        try:
            for epoch in range(self.resume_epoch, self.args.epochs):
                self.epoch = epoch

                # Clustering
                if self.clustering and \
                        ((epoch % self.epochs_clustering == 0) or (self.args.resume and epoch == self.resume_epoch)):
                    self.clusterer.save_results = True
                    clus, mean_clust, std_clust = self.clusterer.create_clusters(iteration=0)
                    self.clusters = torch.FloatTensor(clus).cuda()
                    self.mean_clust = torch.FloatTensor(mean_clust)
                    self.std_clust = torch.FloatTensor(std_clust)
                    self.cluster_counts = 1 / self.clusters.max(1)[0]
                    self.clusters_unit = self.cluster_counts.view(self.clusters.size(0), 1).expand_as(self.clusters) * \
                                         self.clusters

                    self.clusterer.name_with_images_clusters()
                    self.clusterer.name_clusters()
                    self.optimize_neurons()

                    # This is for visualization:
                    # self.clusterer.segment_images()
                    # self.clusterer.create_web_images()  # segment_images has to be uncommented before
                    self.clusterer.create_web_clusters(with_images=True)

                utils.adjust_learning_rate(self.args, self.optimizer, epoch)

                # Train for one epoch
                print('Starting training epoch ' + str(epoch))
                self.train_epoch(epoch)

                # Evaluate on validation set
                print('Starting evaluation epoch ' + str(epoch))
                eval_score, recalls = self.eval()
                self.args.writer.add_scalar('eval_score', eval_score, epoch)

                # Remember best eval score and save checkpoint
                is_best = eval_score > best_eval
                best_eval = max(eval_score, best_eval)
                utils.save_checkpoint({
                    'epoch': epoch + 1,
                    'model_state_dict': self.model.state_dict(),
                    'best_eval': best_eval,
                    'recall_now': recalls,
                    'optimizer': self.optimizer.state_dict(),
                }, is_best, self.args, name_checkpoint=self.args.name_checkpoint)

        except KeyboardInterrupt:
            print('You decided to finish the training at epoch ' + str(epoch + 1))

    def train_epoch(self, epoch):
        """
        Train one epoch. It consists of 5 steps
        Step 1: Compute the output of the positive image
        Step 2: Compute the mask for the positive image features
        Step 3: Generate the negative image from this mask
        Step 4: Compute the output of this negative
        Step 5: Compute all the losses
        And after that, do the backpropagation and weight updates
        """
        if not self.args.use_cpu:
            torch.cuda.synchronize()
        batch_time = utils.AverageMeter()
        data_time = utils.AverageMeter()
        losses_meter = utils.AverageMeter()

        # Switch to train mode
        self.model.train()

        end = time.time()
        N_examples = self.loaders['train'].dataset.__len__()

        loss_list_total = {'loss_regular': 0, 'loss_neg': 0, 'loss_hardneg': 0, 'loss_total': 0}
        for batch_id, (image_input, audio_input, neg_images, nframes, path, image_raw) in enumerate(
                self.loaders['train']):
            loss_list = {'loss_regular': 0, 'loss_neg': 0, 'loss_hardneg': 0, 'loss_total': 0}

            # Measure data loading time
            data_time.update(time.time() - end)

            if not self.args.use_cpu:
                audio_input = audio_input.cuda(async=True)

            if not self.args.loading_image:
                path_ints = [p.split('/')[-1] for p in path]  # in case the audio is inside a subfolder

                v_init = self.z[int(path_ints[0])]
                z_img = torch.FloatTensor(image_input.size(0), v_init.shape[0])

                for k in range(image_input.size(0)):
                    z_img[k, :] = self.z[int(path_ints[k])]

                image_input = self.generator.generate_images(z_img, intervention=None)
                image_input = utils.transform(image_input).detach()

            else:
                image_input = image_input.cuda()
                neg_images = neg_images.cuda()

            # STEP 1: Compute output positive
            model_output = self.model(image_input, audio_input, [])
            image_output = model_output[0]
            audio_output = model_output[1]

            neg_images = []

            pooling_ratio = round(audio_input.size(3) / audio_output.size(3))
            nframes.div_(pooling_ratio)

            binary_mask_0 = None

            # Only do steps 2-4 if we want to train with semantic negatives
            if self.loss_type == 'negatives_edited' or self.loss_type == 'negatives_both':
                # STEP 2: Compute mask from image features
                limits = np.zeros((image_input.size(0), 2))

                for i in range(image_input.size(0)):
                    pos_image = image_input[i, :, :, :]

                    nF = nframes[i]

                    matchmap = utils.compute_matchmap(image_output[i], audio_output[i][:, :, :nF])

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

                    if self.clustering:
                        if self.args.active_learning and 'active' in path[i]:
                            neg_img = active_learning.get_negatives(self, path_ints[i])

                        else:
                            v = (image_output[i][:, ind_h, ind_w] - self.mean_clust.cuda()) / (
                                        self.std_clust.cuda() + 1e-8)

                            normalized_clusters = np.matmul(self.clusters.cpu(), v.detach().cpu().numpy().transpose())
                            sorted_val = -np.sort(-normalized_clusters[:])
                            sorted_val = np.clip(sorted_val, 0, 4)
                            if np.sum(sorted_val) <= 0:
                                print("None of the clusters was close to the image feature. If this happens regularly, "
                                      "it probably means they were low quality clusters. Did you pretrain with a "
                                      "regular loss before clustering?")
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
                            bmask = torch.Tensor(binary_mask_eval).cuda()
                            bmask = bmask.view(1, 128, 128).expand(3, 128, 128)

                            while norm < threshold_random:
                                with torch.no_grad():
                                    binary_mask = matchmap_image > (thresold_heatmap * matchmap_image.max())
                                    binary_mask = utils.geodesic_dilation(binary_mask, (ind_h, ind_w))

                                    if binary_mask_0 is None:
                                        binary_mask_0 = cv2.resize(binary_mask, (224, 224))

                                    # STEP 3: Generate new image
                                    z_img = self.z[int(path_ints[i])]
                                    z_img = z_img[np.newaxis, :]

                                    _ = self.generator.generate_images(z_img)
                                    intervention = {}
                                    for layer_n in self.layer_list_all:
                                        units_ids = self.layers_units[layer_n][cluster_id][:num_units_dict[layer_n]]
                                        layer_size = self.layers_dict[layer_n]['size']
                                        layer_dim = self.layers_dict[layer_n]['depth']

                                        ablation, replacement = self.get_ablation_replacement(
                                            params=[layer_dim, units_ids], option='specific')
                                        ablation_final = cv2.resize(binary_mask, (layer_size, layer_size))
                                        ablation_final = np.tile(ablation_final, (layer_dim, 1, 1)).astype(np.float32)
                                        ablation_final = torch.cuda.FloatTensor(ablation_final)
                                        ablation_final = ablation.view(layer_dim, 1, 1).expand_as(
                                            ablation_final) * ablation_final
                                        intervention[layer_n] = (ablation_final, replacement)

                                    neg_img = self.generator.generate_images(z_img, intervention=intervention).detach()
                                    neg_img_t = utils.transform(neg_img).detach()

                                    norm = (neg_img_t[0, :, :, :] - pos_image.detach())
                                    norm = norm * bmask
                                    norm = torch.norm(torch.norm(torch.norm(norm, dim=2), dim=1), dim=0)
                                    norm_normalized = norm / torch.norm(
                                        torch.norm(torch.norm(pos_image.detach() * bmask, dim=2), dim=1), dim=0)
                                    norm = norm_normalized.item()
                                    for layer_n in self.layer_list_all:
                                        num_units_dict[layer_n] = num_units_dict[
                                                                      layer_n] + 40  # increase units to change
                                    thresold_heatmap = thresold_heatmap - 0.1
                                    threshold_random = threshold_random - 0.05

                                    cluster_id = np.random.choice(sorted_id, size=1, p=prob_samples)[0]

                                    count = count + 1

                    else:  # random edited negatives
                        binary_mask = matchmap_image > (threshold * matchmap_image.max())
                        binary_mask = utils.geodesic_dilation(binary_mask, (ind_h, ind_w))
                        if binary_mask_0 is None:
                            binary_mask_0 = cv2.resize(binary_mask, (224, 224))
                        norm = 0
                        threshold_random = 0.95
                        p = 0.4

                        while norm < threshold_random:
                            with torch.no_grad():
                                intervention = {}

                                for layer_n in self.layer_list_all:
                                    layer_size = self.layers_dict[layer_n]['size']
                                    layer_dim = self.layers_dict[layer_n]['depth']

                                    ablation, replacement = self.get_ablation_replacement(params=[layer_dim, True, 0.5],
                                                                                          option='random')
                                    ablation_final = cv2.resize(binary_mask, (layer_size, layer_size))
                                    ablation_final = np.tile(ablation_final, (layer_dim, 1, 1)).astype(np.float32)
                                    ablation_final = torch.cuda.FloatTensor(ablation_final)
                                    ablation_final = ablation.view(layer_dim, 1, 1).expand_as(
                                        ablation_final) * ablation_final
                                    intervention[layer_n] = (ablation_final, replacement)

                                # STEP 3: Generate new image
                                z_img = self.z[int(path_ints[i])]
                                z_img = z_img[np.newaxis, :].detach()
                                neg_img = self.generator.generate_images(z_img, intervention=intervention).detach()
                                neg_img_t = utils.transform(neg_img).detach()

                                binary_mask = cv2.resize(binary_mask, (128, 128))

                                bmask = torch.Tensor(binary_mask).cuda()

                                bmask = bmask.view(1, 128, 128).expand(3, 128, 128)
                                norm = (neg_img_t[0, :, :, :] - pos_image.detach())

                                norm = norm * bmask
                                norm = torch.norm(torch.norm(torch.norm(norm, dim=2), dim=1), dim=0)
                                norm_normalized = norm / torch.norm(torch.norm(torch.norm(pos_image.detach() * bmask,
                                                                                          dim=2), dim=1), dim=0)
                                norm = norm_normalized.item()

                                if random.random() > 0.2:
                                    p = p + 0.05
                                else:
                                    threshold_random = threshold_random - 0.01

                    neg_images.append(neg_img)

                neg_images = torch.cat(neg_images)
                neg_images_t = utils.transform(neg_images)
                # print(neg_images_t.size())

                # STEP 4: Compute output negative
                image_output_neg, _, _ = self.model(neg_images_t, None, [])

            # STEP 5: Compute losses
            if self.args.active_learning:
                image_output, image_output_neg = active_learning.switch_pos_neg(self, image_input, image_output,
                                                                                image_output_neg, path)

            if self.loss_type == 'regular':
                loss = losses.sampled_margin_rank_loss(image_output, audio_output, nframes, self.margin,
                                                       self.args.symfun)
                loss_list['loss_regular'] = loss.item()
                loss_list['loss_total'] = loss.item()

            elif self.loss_type == 'negatives_edited':  # train with semantic negatives
                loss_regular = losses.sampled_margin_rank_loss(image_output, audio_output, nframes, self.margin,
                                                               self.args.symfun)
                loss_neg = losses.negatives_loss(image_output, audio_output, image_output_neg, nframes, self.margin,
                                                 self.args.symfun)
                loss = loss_regular + loss_neg
                loss_list['loss_regular'] = loss_regular.item()
                loss_list['loss_neg'] = loss_neg.item()
                loss_list['loss_total'] = loss.item()

            elif self.loss_type == 'negatives_hard':  # train with hard negatives
                loss_regular = losses.sampled_margin_rank_loss(image_output, audio_output, nframes, self.margin,
                                                               self.args.symfun)
                loss_neg = losses.hard_negative_loss(image_output, audio_output, nframes, self.margin, self.args.symfun)
                loss = loss_regular + loss_neg
                loss_list['loss_regular'] = loss_regular.item()
                loss_list['loss_neg'] = loss_neg.item()
                loss_list['loss_total'] = loss.item()

            elif self.loss_type == 'negatives_both':  # combine hard negatives with semantic negatives
                loss_hardneg = losses.combined_random_hard_negative_loss(image_output, audio_output, image_output_neg,
                                                                         nframes, self.margin, self.args.symfun)
                loss_regular = losses.sampled_margin_rank_loss(image_output, audio_output, nframes, self.margin,
                                                               self.args.symfun)
                loss_regular = torch.clamp(loss_regular, min=0, max=5)
                loss_hardneg = torch.clamp(loss_hardneg, min=0, max=5)
                loss = loss_regular + loss_hardneg
                loss_list['loss_regular'] = loss_regular.item()
                loss_list['loss_hardneg'] = loss_hardneg.item()
                loss_list['loss_total'] = loss.item()

            else:
                raise Exception(f'The loss function {self.loss_type} is not implemented.')

            last_sample = N_examples * epoch + batch_id * self.args.batch_size + image_input.size(0)

            # Record loss
            losses_meter.update(loss.item(), image_input.size(0))

            # Backward pass and update
            self.optimizer.zero_grad()
            loss.backward()
            self.optimizer.step()

            # Measure elapsed time
            batch_time.update(time.time() - end)
            end = time.time()

            # Print results
            if (batch_id + 1) % self.args.print_freq == 0:
                for name in loss_list:
                    loss_list_total[name] += loss_list[name]
                for name in loss_list:
                    loss_list_total[name] = loss_list_total[name] / self.args.print_freq

                for loss_name in loss_list:
                    self.args.writer.add_scalar(f'losses/{loss_name}', loss_list_total[loss_name], last_sample)

                print(f'Epoch: [{epoch}][{batch_id+1}/{len(self.loaders["train"])}]\t'
                      f'Time {batch_time.val:.3f} ({batch_time.avg:.3f})\t'
                      f'Data {data_time.val:.3f} ({data_time.avg:.3f})\t'
                      f'Loss {losses_meter.val:.4f} ({losses_meter.avg:.4f})\t', flush=True)

                image_raw = self.unorm(image_input[0].data.cpu())
                self.args.writer.add_image('positive', image_raw, last_sample)
                if self.loss_type == 'negatives_edited' or self.loss_type == 'negatives_both':
                    image_raw_neg = self.unorm(neg_images[0].data.cpu())
                    image_neg = image_raw_neg / torch.max(image_raw_neg)
                    self.args.writer.add_image('negative', image_neg, last_sample)
                    self.args.writer.add_image('Images/region',
                                               255 * np.array([binary_mask_0, binary_mask_0, binary_mask_0]).
                                               swapaxes(0, 1).swapaxes(1, 2), last_sample)
                loss_list_total = {k: 0 for k, v in loss_list_total.items()}

            else:
                for loss_name in loss_list:
                    loss_list_total[loss_name] += loss_list[loss_name]

    def optimize_neurons(self):

        # Set up console output
        verbose_progress(True)

        gan_model = self.generator.model
        annotate_model_shapes(gan_model, gen=True)

        outdir = os.path.join(self.args.results, 'dissect', self.args.name_checkpoint + '_' + str(time.time()))
        os.makedirs(outdir, exist_ok=True)

        size = 1000

        sample = z_sample_for_model(gan_model, size)

        train_sample = z_sample_for_model(gan_model, size, seed=2)

        dataset = TensorDataset(sample)
        train_dataset = TensorDataset(train_sample)
        self.cluster_segmenter = ClusterSegmenter(self.model, self.clusters, self.mean_clust, self.std_clust)

        segrunner = GeneratorSegRunner(self.cluster_segmenter)

        netname = outdir
        # Run dissect
        with torch.no_grad():
            dissect(outdir, gan_model, dataset,
                    train_dataset=train_dataset,
                    segrunner=segrunner,
                    examples_per_unit=20,
                    netname=netname,
                    quantile_threshold='iqr',
                    meta=None,
                    make_images=False,  # True,
                    make_labels=True,
                    make_maxiou=False,
                    make_covariance=False,
                    make_report=True,
                    make_row_images=True,
                    make_single_images=True,
                    batch_size=8,
                    num_workers=8,
                    rank_all_labels=True)

            sample_ablate = z_sample_for_model(gan_model, 16)

            dataset_ablate = TensorDataset(sample_ablate)
            data_loader = torch.utils.data.DataLoader(dataset_ablate, batch_size=8, shuffle=False,
                                                      num_workers=8, pin_memory=True, sampler=None)

            with open(os.path.join(outdir, 'dissect.json')) as f:
                data = EasyDict(json.load(f))
            dissect_layer = {lrec.layer: lrec for lrec in data.layers}

            self.layers_units = {
                'layer2': [],
                'layer3': [],
                'layer4': [],
                'layer5': [],
                'layer6': [],
            }

            noise_units = np.array([35, 221, 496, 280])

            for i in range(2, len(self.clusters) + 2):
                print('Cluster', i)
                rank_name = 'c_{0}-iou'.format(i)
                for l in range(len(self.layer_list_all)):
                    ranking = next(r for r in dissect_layer[self.layer_list_all[l]].rankings if r.name == rank_name)
                    unit_list = np.array(range(512))
                    unit_list[noise_units] = 0
                    ordering = np.argsort(ranking.score)
                    units_list = unit_list[ordering]
                    self.layers_units[self.layer_list_all[l]].append(units_list)

        # Mark the directory so that it's not done again.
        mark_job_done(outdir)

    def get_ablation_replacement(self, params=(), option='random'):

        if option == 'random':
            import random
            dim_mask = params[0]
            binary = params[1]
            values = np.random.rand(dim_mask)

            if binary:
                prob_ones = params[2]
                ablation = torch.FloatTensor((np.random.rand(dim_mask) < prob_ones).astype(np.float)).cuda()
            else:
                ablation = torch.FloatTensor(values).cuda()
            replacement = torch.zeros(dim_mask).cuda()

        elif option == 'specific':
            units_ids = params[1]
            dim_mask = params[0]
            ablation, replacement = torch.zeros(dim_mask).cuda(), torch.zeros(dim_mask).cuda()
            ablation[units_ids] = 1  # color

        else:
            raise Exception('Please introduce a valid option')

        return ablation, replacement

    def eval(self):
        """
        Collects features for number_recall images and audios and computes the recall @{1, 5, 10} of predicting one from
        the other. It does not involve any hard or edited negative.
        """
        number_recall = 500
        if not self.args.use_cpu:
            torch.cuda.synchronize()
        batch_time = utils.AverageMeter()

        # Switch to evaluate mode
        self.model.eval()

        end = time.time()
        N_examples = self.loaders['val'].dataset.__len__()
        image_embeddings = []  # torch.FloatTensor(N_examples, embedding_dim)
        audio_embeddings = []  # torch.FloatTensor(N_examples, embedding_dim)
        frame_counts = []

        with torch.no_grad():
            for i, (image_input, audio_input, negatives, nframes, path, _) in enumerate(self.loaders['val']):
                if len(image_embeddings) * image_input.size(0) > 500:
                    break

                if not self.args.loading_image:
                    path_ints = [p.split('/')[-1] for p in path]  # in case the audio is inside a subfolder

                    v_init = self.z[int(path_ints[0])]
                    z_img = torch.FloatTensor(image_input.size(0), v_init.shape[0])

                    for k in range(image_input.size(0)):
                        z_img[k, :] = self.z[int(path_ints[k])]

                    image_input = self.generator.generate_images(z_img, intervention=None)
                    image_input = utils.transform(image_input)
                    negatives = []
                else:
                    image_input = image_input.cuda()
                    negatives = [negatives.cuda()]

                # compute output
                model_output = self.model(image_input, audio_input, negatives)
                image_output = model_output[0]
                audio_output = model_output[1]

                image_embeddings.append(image_output.data.cpu())
                audio_embeddings.append(audio_output.data.cpu())

                # find pooling ratio
                # audio_input is (B, D, 40, T)
                # audio_output is (B, D, 1, T/p)
                pooling_ratio = round(audio_input.size(3) / audio_output.size(3))
                nframes.div_(pooling_ratio)
                frame_counts.append(nframes.cpu())

                batch_time.update(time.time() - end)
                end = time.time()

                if i % self.args.print_freq == 0:
                    print('Eval: [{0}/{1}]\t'.format(i + 1, len(self.loaders['val'])), flush=True)

            image_outputs = torch.cat(image_embeddings)
            audio_outputs = torch.cat(audio_embeddings)
            frame_counts_tensor = torch.cat(frame_counts)

            N_examples = np.minimum(number_recall, N_examples)

            image_outputs = image_outputs[-N_examples:, :, :, :]
            audio_outputs = audio_outputs[-N_examples:, :, :, :]
            frame_counts_tensor = frame_counts_tensor[-N_examples:]
            # measure accuracy and record loss
            print('Computing recalls...')
            recalls = utils.calc_recalls(image_outputs, audio_outputs, frame_counts_tensor, loss_type=self.loss_type)
            A_r10 = recalls['A_r10']
            I_r10 = recalls['I_r10']
            A_r5 = recalls['A_r5']
            I_r5 = recalls['I_r5']
            A_r1 = recalls['A_r1']
            I_r1 = recalls['I_r1']

            print(' * Audio R@10 {A_r10:.3f} Image R@10 {I_r10:.3f} over {N:d} validation pairs'
                  .format(A_r10=A_r10, I_r10=I_r10, N=N_examples), flush=True)
            print(' * Audio R@5 {A_r5:.3f} Image R@5 {I_r5:.3f} over {N:d} validation pairs'
                  .format(A_r5=A_r5, I_r5=I_r5, N=N_examples), flush=True)
            print(' * Audio R@1 {A_r1:.3f} Image R@1 {I_r1:.3f} over {N:d} validation pairs'
                  .format(A_r1=A_r1, I_r1=I_r1, N=N_examples), flush=True)

            eval_score = (A_r5 + I_r5) / 2

        return eval_score, recalls
