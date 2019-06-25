import contextlib
import json
import os
import os.path
import random
import re
import wave

import librosa
import matplotlib
import numpy as np
import scipy
import scipy.io.wavfile
import scipy.signal
import torch
import torch.utils.data as data
from PIL import Image
from pydub import AudioSegment
from scipy import interpolate

matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.ticker import PercentFormatter


class ImageAudioDataset(data.Dataset):
    """
    Class containing the dataset methods for a general Image and Audio dataset
    It assumes the structure of the dataset folders is the following:
    path_dataset/name_list_train.txt
    path_dataset/name_list_val.txt
    path_dataset/images/#.(image_extension)
    path_dataset/audio/#.(audio_extension)

    Note that the images in the images/ folder are not used, as they are generated with the GAN during training.
    They are still provided and can be used as input if the loading_image flag is set to True

    The current code does NOT have the option to return text, but all the methods are available in case it is needed
    """

    def read_name_list(self, path, init=0, end=None):
        d = {}
        file_name_list = '/name_list_' + self.split + '.txt'
        with open(path + file_name_list, 'r') as f:
            for index, line in enumerate(f):
                if end is None:
                    end = 1e8
                if init <= index < end:
                    d[index - init] = line.replace('\n', '')
        return d

    def __init__(self, path_dataset, transform=None, split='train', negative_image=None,
                 loading_image=False, random_sampling=False, init=0, end=None, ext_audio='wav', ext_img='jpg'):
        """
        :param path_dataset: path to the .txt file containing the names of the data files
        :param ext_{audio, img}: extensions of audio and image
        :param transform: transform to apply on the images
        :param split: if train or val (validation)
        :param loading_image: boolean. return (or not) images
        :param negative_image: boolean. return (or not) negatives for images (only when loading_image == True)
        :param random_sampling: boolean. randomly sample from the input audio (True), or return a long signal (False)
        :param init. Initial datapoint from the name_list file
        :param end. Final datapoint from the name_list file
        """
        self.random_sampling = random_sampling
        self.loading_image = loading_image

        self.negative_image = negative_image
        self.transform = transform
        self.windows = {
            'hamming': scipy.signal.hamming,
            'hann': scipy.signal.hann,
            'blackman': scipy.signal.blackman,
            'bartlett': scipy.signal.bartlett
        }
        self.image_extension = ext_img
        self.audio_extension = ext_audio
        self.split = split
        self.path_dataset = path_dataset

        if isinstance(path_dataset, str):
            self.paths = self.read_name_list(path_dataset, init=init, end=end)
        else:
            self.paths = path_dataset

        # If we wanted to work with text
        # self.word2index, self.vocab_index = self.create_word2index()

    @staticmethod
    def preemphasis(signal, coeff=0.97):
        """perform preemphasis on the input signal.

        :param signal: The signal to filter.
        :param coeff: The preemphasis coefficient. 0 is none, default 0.97.
        :returns: the filtered signal.
        """
        return np.append(signal[0], signal[1:] - coeff * signal[:-1])

    def create_word2index(self):
        word2index = {}
        index = 1
        for i, path in self.paths.items():  # For all samples
            p = self.path_dataset + '/text/' + path + '.txt'
            with open(p, 'r') as f:
                text = f.read()
            words = re.split(' |\. |\.', text.upper())
            # words = text.upper().split()
            for w in words:
                if w not in word2index:
                    word2index[w] = index
                    index += 1
        vocab_size = index
        return word2index, vocab_size

    def load_text(self, path, path_text=''):
        if path_text == '':
            path_text = self.path_dataset + '/text/' + path + '.txt'
        with open(path_text, "r") as f:
            text = f.read().upper()

        one_hots = []
        tokens = text.replace('.', '').split()
        c = 0
        for tok in tokens:
            idx = self.padding_index
            if tok in self.word2index:
                idx = self.word2index[tok]
            one_hots.append(idx)
            c += 1
            if c >= self.padlength:
                break
        nframes = c
        while c < self.padlength:
            one_hots.append(self.padding_index)
            c += 1
        one_hots = torch.LongTensor(one_hots)
        if nframes == 0:
            nframes = 2
            print(path)

        return one_hots, nframes

    def load_text_raw(self, index=-1, path=''):
        if index is not -1:
            p = self.path_dataset + '/text/' + self.paths[index] + '.txt'
        elif path is not '':
            p = self.path_dataset + '/text/' + path + '.txt'
        else:
            raise Exception('Please provide either the index or the path')

        with open(p, 'r') as f:
            text = f.read()

        return text

    def load_mel_spectrogram(self, path, path_audio='', verbose=True):
        preemph_coef = 0.97
        sample_rate = 16000
        window_size = 0.025
        window_stride = 0.01
        window_type = 'hamming'
        num_mel_bins = 40
        if self.random_sampling:
            target_spec_length = 1024
        else:
            target_spec_length = 2048  # when evaluating we use a longer audio
        use_raw_length = False
        spec_padval = 0
        n_fft = int(sample_rate * window_size)
        win_length = n_fft
        hop_length = int(sample_rate * window_stride)
        normalize = False

        # Load audio, subtract DC, preemphasis
        if path_audio == '':
            path_audio = self.path_dataset + '/audio/' + path + '.' + self.audio_extension

        try:
            y, sr = librosa.load(path_audio, sample_rate)
            y = y - y.mean()
            y = self.preemphasis(y, preemph_coef)
            # Compute mel spectrogram
            stft = librosa.stft(y, n_fft=n_fft, hop_length=hop_length, win_length=win_length,
                                window=self.windows.get(window_type, self.windows['hamming']))
            spec = np.abs(stft) ** 2
            mel_basis = librosa.filters.mel(sr, n_fft, n_mels=num_mel_bins, fmin=20)
            melspec = np.dot(mel_basis, spec)

            # Convert to dB
            logmelspec = librosa.power_to_db(melspec, ref=np.max)
            if normalize:
                mean = logmelspec.mean()
                std = logmelspec.std()
                logmelspec = logmelspec - mean
                logmelspec = logmelspec / std

            n_frames = logmelspec.shape[1]
            if use_raw_length:
                target_spec_length = n_frames
            p = target_spec_length - n_frames
            if p > 0:
                logmelspec = np.pad(logmelspec, ((0, 0), (0, p)), 'constant',
                                    constant_values=(spec_padval, spec_padval))
            elif p < 0:
                if self.random_sampling:
                    init_frame = random.randint(0, n_frames - target_spec_length - 1)
                    logmelspec = logmelspec[:, init_frame:init_frame + target_spec_length]
                else:
                    logmelspec = logmelspec[:, 0:target_spec_length]
                n_frames = target_spec_length
        except:
            # In case of empty data
            logmelspec = np.zeros((num_mel_bins, target_spec_length))
            n_frames = target_spec_length
            if verbose:
                print('Error in creating spectrogram in sample in path ' + path_audio)
        logmelspec = torch.FloatTensor(logmelspec)
        return logmelspec, n_frames

    def load_audio_raw(self, index=-1, path='', return_nframes=False, pad=True):
        try:
            if index is not -1:
                p = self.path_dataset + '/audio/' + self.paths[index] + '.' + self.audio_extension
            elif path is not '':
                p = self.path_dataset + '/audio/' + path + '.' + self.audio_extension
            else:
                raise Exception('Please provide either the index or the path')
            if self.audio_extension == 'wav':
                te, data = scipy.io.wavfile.read(p)
            elif self.audio_extension == 'mp3':
                song = AudioSegment.from_mp3(p)
                samples = song.get_array_of_samples()
                data = np.array(samples)
                te = song.frame_rate
            else:
                raise Exception('Error: We are not prepared to handle the .' + self.audio_extension + ' extension.')
            duration = data.shape[0] / te
            time_old = np.linspace(0, duration, data.shape[0])
            time_new = np.linspace(0, duration, int(data.shape[0] * 44100 / te))
            interpolator = interpolate.interp1d(time_old, data.T)
            new_audio = interpolator(time_new).T

            if not pad:
                if return_nframes:
                    return new_audio, new_audio.shape[0]
                return new_audio

            # Important! If the target_spec_length changes, the 451584 also changes
            if new_audio.shape[0] < 451584 * 2:
                audio = np.pad(new_audio, (0, 451584 * 2 - new_audio.shape[0]), 'constant', constant_values=(0))
            else:
                audio = new_audio[0:int(451584 * 2)]
            if return_nframes:
                return audio, new_audio.shape[0]

            return audio

        except Exception as e:
            print('Audio Error')
            if return_nframes:
                return np.zeros(451584 * 2), 1
            return np.zeros(451584 * 2)

    def load_image(self, path, path_image=''):
        if path_image == '':
            path_image = self.path_dataset + '/images/' + path + '.' + self.image_extension
        img = Image.open(path_image).convert('RGB')
        if self.transform is not None:
            img = self.transform(img)
        else:
            raise Exception('At least a ''ToTensor()'' transform has to be included')
        return img

    def load_image_raw(self, path, path_image=''):
        if path_image == '':
            path_image = self.path_dataset + '/images/' + path + '.' + self.image_extension
        img = Image.open(path_image).convert('RGB')

        return np.array(img)

    # ------- Negatives --------- #

    def get_negatives_color_image(self, image):
        image_neg = image.sum(0) / 3
        image_neg = image_neg.view(1, image_neg.size(0), image_neg.size(1)).expand_as(image)

        return image_neg

    def get_negatives_warping(self, image):
        import cv2
        alpha = 800
        sigma = 10
        distortion = 1

        image = image.permute(1, 2, 0).numpy()
        shape_size = image.shape[:2]

        # Downscaling the random grid and then upsizing post filter
        # improves performance. Approx 3x for scale of 4, diminishing returns after.
        grid_scale = 4
        grid_shape = (shape_size[0] // grid_scale, shape_size[1] // grid_scale)

        blur_size = int(4 * sigma) | 1
        rand_x = cv2.GaussianBlur(
            (np.random.rand(grid_shape[0], grid_shape[1]) * 2 - 1).astype(np.float32),
            ksize=(blur_size, blur_size), sigmaX=sigma) * alpha
        rand_y = cv2.GaussianBlur(
            (np.random.rand(grid_shape[0], grid_shape[1]) * 2 - 1).astype(np.float32),
            ksize=(blur_size, blur_size), sigmaX=sigma) * alpha
        if grid_scale > 1:
            rand_x = cv2.resize(rand_x, shape_size[::-1])
            rand_y = cv2.resize(rand_y, shape_size[::-1])

        grid_x, grid_y = np.meshgrid(np.arange(shape_size[1]), np.arange(shape_size[0]))
        grid_x = (grid_x + rand_x).astype(np.float32)
        grid_y = (grid_y + rand_y).astype(np.float32)

        warped = cv2.remap(image, grid_x, grid_y, borderMode=cv2.BORDER_REFLECT_101, interpolation=cv2.INTER_LINEAR)
        warped = torch.FloatTensor(warped).permute(2, 0, 1)

        return warped

    def get_negatives_stitching(self, path, mode=1):
        import cv2
        import os
        import scipy.ndimage.morphology as morph
        import random

        # decide if the negative is of color or shape (only one, so that they cannot mix)
        color_or_shape = np.random.randint(0, 3)  # 0 is color, 1 is shape, 2 is material

        path_image_original = self.path_dataset + '/images/' + self.split + '/positive/' + path + '.' + self.image_extension
        index_object_original = np.random.randint(0, 3)
        image_original = cv2.imread(path_image_original)
        seg_original = cv2.imread(path_image_original.replace('positive', 'segmentation'))
        with open(os.path.join(self.path_dataset, 'scenes', self.split, f'{path}.json'), 'rb') as f:
            scene_original = json.load(f)
        color_original = scene_original['objects'][index_object_original]['color']
        shape_original = scene_original['objects'][index_object_original]['shape']
        material_original = scene_original['objects'][index_object_original]['material']
        position = scene_original['objects'][index_object_original]['pixel_coords'][:2]

        # inpaint hole of previous object
        mask_inpaint = (seg_original[..., 2] == index_object_original + 1).astype(np.uint8)
        mask_inpaint = morph.binary_dilation(mask_inpaint, structure=np.ones((5, 5))).astype(np.uint8)
        image_inpainted = cv2.inpaint(image_original, mask_inpaint, 3, cv2.INPAINT_TELEA)

        # open other image
        other_correct = False

        while not other_correct:
            path_other = random.choice(list(self.paths.values()))
            index_object_other = np.random.randint(0, 3)
            with open(os.path.join(self.path_dataset, 'scenes', self.split, f'{path_other}.json'), 'rb') as f:
                scene_other = json.load(f)
            color_other = scene_other['objects'][index_object_other]['color']
            shape_other = scene_other['objects'][index_object_other]['shape']
            material_other = scene_other['objects'][index_object_other]['material']
            # brute force...
            if mode == 1:
                if color_or_shape == 1 and (
                        color_other != color_original or material_other != material_original or shape_other == shape_original):
                    continue
                elif color_or_shape == 0 and (
                        color_other == color_original or material_other != material_original or shape_other != shape_original):
                    continue
                elif color_or_shape == 2 and (
                        color_other != color_original or material_other == material_original or shape_other != shape_original):
                    continue
                else:
                    other_correct = True
            elif mode == 2:
                if color_or_shape == 1 and (shape_other == shape_original):
                    continue
                elif color_or_shape == 0 and (color_other == color_original):
                    continue
                elif color_or_shape == 2 and (material_other == material_original):
                    continue
                else:
                    other_correct = True

            path_image_other = self.path_dataset + '/images/' + self.split + '/positive/' + path_other + '.' + self.image_extension
            image_other = cv2.imread(path_image_other)
            seg_other = cv2.imread(path_image_other.replace('positive', 'segmentation'))

        # stitch object
        # %10 in the case of SCLEVR3, if not, it does not harm
        mask_stitch = (seg_other[..., 2] % 10) == index_object_other + 1
        mask_stitch = mask_stitch.astype(np.uint8)
        # extend mask so that the gradients (borders) are visible
        mask_stitch = morph.binary_dilation(mask_stitch, structure=np.ones((10, 10))).astype(np.uint8)
        mask_stitch = np.stack((mask_stitch,) * 3, -1) * 255

        try:
            image_stitched = cv2.seamlessClone(image_other, image_inpainted, mask_stitch, tuple(position),
                                               cv2.NORMAL_CLONE)
        except:
            print('retry')
            return self.get_negatives_stitching(path)

        img = Image.fromarray(image_stitched).convert('RGB')
        img = self.transform(img)
        return img

    def get_negatives_flip_image(self, image):

        image_neg = image.numpy()
        image_neg = np.flip(image_neg, 1)
        image_neg = torch.FloatTensor(image_neg.copy())  # Copy because negative strides still not supported in pytorch

        return image_neg

    def __getitem__(self, index):
        """
        returns: image, audio, neg_image, nframes, path, image_raw as pytorch tensors
        """
        path = self.paths[index]

        audio, nframes = self.load_mel_spectrogram(path)
        audio = audio.unsqueeze(0)

        if self.loading_image:
            image = self.load_image(path)
            neg_image = torch.Tensor(1)
            if self.negative_image:
                # Either load a precomputed negative (for example rendered with a different color) or create it by
                # editing the positive image (this script has code to edit via stitching, flipping, warping, or changing
                # color)
                # neg_image = self.load_image(path negative image)
                neg_image = self.get_negatives_flip_image(image)
            image_raw = self.load_image_raw(self.split + '/positive/' + path)
            return image, audio, neg_image, nframes, path, image_raw
        else:
            empty_vector = torch.Tensor(1)
            return empty_vector, audio, empty_vector, nframes, path, empty_vector

    def __len__(self):
        return len(self.paths)


def plot_histogram_audio_duration(dataset_folder, out_folder):
    folder = os.path.join(dataset_folder, 'audio')
    list_files = os.listdir(folder)
    aa = []
    for file in list_files:
        with contextlib.closing(wave.open(os.path.join(folder, file), 'r')) as f:
            frames = f.getnframes()
            rate = f.getframerate()
            duration = frames / float(rate)
            if duration > 60:
                continue
            aa.append(duration)
    plt.hist(np.array(aa), weights=np.ones(len(aa)) / len(aa), bins=np.array(list(range(30))) + 1)
    plt.gca().yaxis.set_major_formatter(PercentFormatter(1))
    plt.xlabel('duration (s)')
    plt.savefig(os.path.join(out_folder, 'hist.png'))
