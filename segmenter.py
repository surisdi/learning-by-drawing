"""
This file has code for two different segmenters.
The first one (ClusterSegmenter) is the one we use during training, that inherits from the netdissect segmenter. It
performs the segmentation described in the paper, where images are segmented according to the clusters their features
are closer to.
The second one (GroundTruthSegmenter) is a segmentation network trained with ground truth CLEVR segmentation information
It is only used for testing purposes, not during training.
"""
import os

import netdissect.segmenter
import torch
import torch.nn as nn
import wget
from netdissect import segmodel as segmodel_module

import utils


class ClusterSegmenter(netdissect.segmenter.BaseSegmenter):
    def __init__(self, model, clusters, mean_clust, std_clust):
        self.model = model
        self.clusters = clusters  # N_clusters x 512
        self.mean_clust = torch.Tensor(mean_clust).cuda()
        self.std_clust = torch.Tensor(std_clust).cuda()
        self.threshold = 0.5

    def get_label_and_category_names(self):
        return [('c_%d' % (i + 1), 'cluster') for i in range(len(self.clusters) + 1)], ['cluster']

    def segment_batch(self, tensor_images, downsample=1):
        '''
        Returns a multilabel segmentation for the given batch of (RGB [-1...1])
        images.  Each pixel of the result is a torch.long indicating a
        predicted class number.  Multiple classes can be predicted for
        the same pixel: output shape is (n, multipred, y, x), where
        multipred is 3, 5, or 6, for how many different predicted labels can
        be given for each pixel (depending on whether subdivision is being
        used).  If downsample is specified, then the output y and x dimensions
        are downsampled from the original image.
        '''
        output_images, _, _ = self.model(tensor_images, None, [])  # N x 512 x W x H
        output_seg = []
        t = 1.5

        for i in range(len(output_images)):
            c_trans = torch.transpose(self.clusters, 0, 1)
            c_trans = c_trans[:, None, :]  # 512 x T
            clust_mean = self.mean_clust.view(-1, 1, 1)
            clust_mean = clust_mean.expand(output_images[i].size(0), output_images[i].size(1), output_images[i].size(2))
            std_clust = self.std_clust.view(-1, 1, 1)
            std_clust = std_clust.expand(output_images[i].size(0), output_images[i].size(1), output_images[i].size(2))

            im_normalized = (output_images[i] - clust_mean) / (std_clust + 1e-8)

            matchmap = utils.compute_matchmap(im_normalized, c_trans)  # H x W x N_clusters

            matchmap = matchmap.permute(2, 0, 1)  # N_c x H x W

            matchmap = torch.nn.functional.interpolate(matchmap[None, :, :, :], size=(64, 64), mode='bilinear')[0]

            matchmap = nn.Threshold(self.threshold, 0)(matchmap)
            matchmap = -nn.Threshold(-0.1, -1)(-matchmap)

            seg = torch.zeros(self.clusters.size(0), matchmap.size(1), matchmap.size(2)).long().cuda()
            for c in range(self.clusters.size(0)):
                seg[c, :, :] = ((c + 1) * matchmap[c, :, :]).long()
            output_seg.append(seg)

        output_seg = torch.stack(output_seg)
        return output_seg

    def predict_single_class(self, tensor_images, classnum, downsample=1):
        '''
        Given a batch of images (RGB, normalized to [-1...1]) and
        a specific segmentation class number, returns a tuple with
           (1) a differentiable ([0..1]) prediction score for the class
               at every pixel of the input image.
           (2) a binary mask showing where in the input image the
               specified class is the best-predicted label for the pixel.
        Does not work on subdivided labels.
        '''
        output_images, _, _ = self.model(tensor_images, None, [])  # N x 512 x W x H
        output_seg = []
        for i in range(len(output_images)):
            c_trans = torch.transpose(self.clusters, 0, 1)
            c_trans = c_trans[:, None, :]  # 512 x T
            clust_mean = self.mean_clust.view(-1, 1, 1)
            clust_mean = clust_mean.expand(output_images[i].size(0), output_images[i].size(1), output_images[i].size(2))
            std_clust = self.std_clust.view(-1, 1, 1)
            std_clust = std_clust.expand(output_images[i].size(0), output_images[i].size(1), output_images[i].size(2))
            im_normalized = (output_images[i] - clust_mean) / (std_clust + 1e-8)

            matchmap = utils.compute_matchmap(im_normalized, c_trans[:, :, classnum:classnum + 1])  # H x W x N_clusters

            matchmap = matchmap[:, :, classnum - 1]
            matchmap = nn.Threshold(self.threshold, 0)(matchmap)
            matchmap = matchmap / (torch.sum(matchmap[:]) + 1e-8)
            output_seg.append(matchmap)

        output_seg = torch.stack(output_seg)
        return output_seg


class GroundTruthSegmenter:
    def __init__(self, model_path):
        # Bits 0-1 represent size
        # Bits 2-3 represent material
        # Bits 4-7 represent shape
        # Bits 8-15 represent color
        # Bits 16-17 represent foreground/background
        num_class = 18

        fc_dim = 2048
        weights_encoder = os.path.join(model_path, 'seg_encoder.pth')
        weights_decoder = os.path.join(model_path, 'seg_decoder.pth')

        os.makedirs(model_path, exist_ok=True)
        if not os.path.isfile(weights_encoder):
            wget.download('http://wednesday.csail.mit.edu/gaze/ganclevr/files/seg_encoder.pth', out=weights_encoder)
        if not os.path.isfile(weights_decoder):
            wget.download('http://wednesday.csail.mit.edu/gaze/ganclevr/files/seg_decoder.pth', out=weights_decoder)

        # Network Builders
        builder = segmodel_module.ModelBuilder()
        net_encoder = builder.build_encoder(arch='resnet50_dilated8', fc_dim=fc_dim, weights=weights_encoder)
        net_decoder = builder.build_decoder(arch='ppm_bilinear_deepsup', fc_dim=fc_dim, num_class=num_class,
                                            weights=weights_decoder, use_softmax=True)
        crit = nn.NLLLoss(ignore_index=-1)

        segmentation_module = segmodel_module.SegmentationModule(net_encoder, net_decoder, crit)
        segmentation_module.cuda()

        self.segmentation_module = segmentation_module

    def get_pred(self, file, return_L=False):
        segmentation_module = self.segmentation_module
        segmentation_module.eval()

        data = file
        data = data.view(1, data.size(0), data.size(1), data.size(2))
        pred = segmentation_module({'img_data': data}, segSize=(128, 128))

        pred_color_torch = pred[:, 8:16, :, :]
        pred_shape_torch = pred[:, 4:8, :, :]
        pred_size_torch = pred[:, 0:2, :, :]
        pred_material_torch = pred[:, 2:4, :, :]
        pred_foreground_torch = pred[:, 16:18, :, :]

        _, pred_foreground = torch.max(pred_foreground_torch.detach().clone(), dim=1)

        _, pred_color = torch.max(pred_color_torch.detach().clone(), dim=1)
        pred_color += 1
        pred_color = pred_color.squeeze(0)

        pred_color = pred_foreground * pred_color

        _, pred_shape = torch.max(pred_shape_torch.detach().clone(), dim=1)
        pred_shape += 1
        pred_shape = pred_shape.squeeze(0)
        pred_shape = pred_foreground * pred_shape

        _, pred_size = torch.max(pred_size_torch.detach().clone(), dim=1)
        pred_size += 1
        pred_size = pred_size.squeeze(0)
        pred_size = pred_foreground * pred_size

        _, pred_material = torch.max(pred_material_torch.detach().clone(), dim=1)
        pred_material += 1
        pred_material = pred_material.squeeze(0)
        pred_material = pred_foreground * pred_material

        if return_L:
            pred_shape = utils.as_numpy(pred_shape)
            pred_size = utils.as_numpy(pred_size)
            pred_material = utils.as_numpy(pred_material)

            B = pred_size << 4  # + ids
            G = pred_material + (pred_shape << 4)
            R = pred_color.cpu().numpy()
            L = R + (G << 8) + (B << 16)

            return L

        else:
            return [pred_color, pred_shape, pred_size, pred_material, pred_foreground]
