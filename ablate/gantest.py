'''
GanTester holds on to a specific model to test.
(1) loads and instantiates the GAN;
(2) instruments it at every layer so that units can be ablated
(3) precomputes z dimensionality, and output image dimensions.
'''

import numpy
import os
import threading
import torch
import warnings
import wget
from netdissect.nethook import retain_layers, edit_layers
from torch.utils.data import TensorDataset, DataLoader

from . import proggan

warnings.filterwarnings("ignore", message="nn.Upsampling is deprecated.")


def test_main():
    tester = GanTester('./downloaded_files/', ['layer1', 'layer2', 'layer3', 'layer4', 'layer5', 'layer6'])
    z = tester.standard_z_sample(10)
    imgs = tester.generate_images(z)
    return (((imgs + 1) / 2) * 255).clamp(0, 255).byte()


class GanTester:
    def __init__(self, pthdir, layers=None, device=None, dissectdir=None):

        os.makedirs(pthdir, exist_ok=True)

        self.device = device if device is not None else torch.device('cpu')
        self.dissectdir = dissectdir if dissectdir is not None else (os.path.join(pthdir, 'dissect'))
        self.modellock = threading.Lock()

        # Load the generator from the pth file. If the file is not there, download
        path_gan_checkpoint = os.path.join(pthdir, 'generator.pth')
        if not os.path.isfile(path_gan_checkpoint):
            wget.download('http://wednesday.csail.mit.edu/gaze/ganclevr/files/generator.pth', out=path_gan_checkpoint)
        model = proggan.from_pth_file(path_gan_checkpoint, map_location=lambda storage, location: storage)
        model.eval()
        self.model = model

        # Get the set of layers of interest.
        # Default: all shallow children except last.
        if layers is None:
            layers = [name for name, module in model.named_children()][:-1]
        self.layers = layers

        # Modify model to instrument the given layers
        retain_layers(model, layers)
        edit_layers(model, layers)

        # Move it to CUDA if wanted.
        model.to(device)

        # Determine z dimension.
        self.z_dimension = [c for c in model.modules() if isinstance(c, torch.nn.Conv2d)][0].in_channels

        # Run the model on one sample input to determine output image size as well as feature size of every layer
        z = torch.randn(self.z_dimension)[None, :, None, None].to(device)
        output = model(z)
        self.image_shape = output.shape[2:]
        self.layer_shape = {layer: tuple(model.retained[layer].shape) for layer in layers}

        for param in self.model.parameters():
            param.requires_grad = False

    def layer_shapes(self):
        return self.layer_shape

    def standard_z_sample(self, size=100, seed=1, device=None):
        '''
        Generate a standard set of random Z as a (size, z_dimension) tensor.
        With the same random seed, it always returns the same z (e.g.,
        the first one is always the same regardless of the size.)
        '''
        # Use numpy RandomState since it can be done deterministically
        # without affecting global state
        rng = numpy.random.RandomState(seed)
        result = torch.from_numpy(rng.standard_normal(size * self.z_dimension).reshape(size, self.z_dimension)).float()
        if device is not None:
            result = result.to(device)
        return result

    def reset_intervention(self):
        for layer in self.layers:
            self.model.ablation[layer] = None
            self.model.replacement[layer] = None

    def apply_intervention(self, intervention):
        '''
        Applies an ablation recipe of the form [(layer, unit, alpha)...].
        '''
        self.reset_intervention()
        if not intervention:
            return
        for layer, (a, v) in intervention.items():
            self.model.ablation[layer] = a
            self.model.replacement[layer] = v

    def generate_images(self, z_batch, intervention=None):
        '''
        Makes some images.
        '''
        with torch.no_grad(), self.modellock:
            batch_size = z_batch.size(0)
            self.apply_intervention(intervention)
            test_loader = DataLoader(TensorDataset(z_batch[:, :, None, None]), batch_size=batch_size,
                                     pin_memory=('cuda' == self.device.type and z_batch.device.type == 'cpu'))
            # result_img = torch.zeros(*((len(z_batch), 3) + self.image_shape),
            #         dtype=torch.uint8, device=self.device)
            # for batch_num, [batch_z,] in enumerate(test_loader):
            #     batch_z = batch_z.to(self.device)
            #     out = self.model(batch_z)
            #     result_img[batch_num*batch_size:
            #             batch_num*batch_size+len(batch_z)] = (
            #                     (((out + 1) / 2) * 255).clamp(0, 255).byte())

            for batch_num, [batch_z, ] in enumerate(test_loader):
                batch_z = batch_z.to(self.device)
                out = self.model(batch_z)
                result_img = (((out + 1) / 2) * 255).clamp(0, 255)
            return result_img

    def get_layers(self):
        return self.layers


def safe_dir_name(filename):
    keepcharacters = (' ', '.', '_', '-')
    return ''.join(c for c in filename if c.isalnum() or c in keepcharacters).rstrip()


if __name__ == '__main__':
    test_main()
