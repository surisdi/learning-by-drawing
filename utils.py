import collections
import datetime
import os
import random
import shutil
import time

import cv2
import numpy as np
import torch.nn as nn
from torch.autograd import Variable

try:
    import torch
    from torchvision.transforms import functional as F
except ImportError:
    print('Torch not imported. Will not be able to use functions using it')


# ------------------------------- GENERAL UTILS ---------------------------------- #


class Args(dict):
    """dot.notation access to dictionary attributes"""
    __getattr__ = dict.get
    __setattr__ = dict.__setitem__
    __delattr__ = dict.__delitem__


def load_options(args, options):
    for key, value in options.items():
        if key in args:
            setattr(args, key, value)
        else:
            raise Exception('Attribute {} is not in args. Check the spelling'.format(key))
    return args


def save_checkpoint(state, is_best, args, name_checkpoint=''):
    if name_checkpoint == '':
        name_checkpoint = args.model + '_' + args.name_dataset
    filename = 'checkpoint_' + name_checkpoint + '.pth.tar'
    filename_best = 'model_best_' + name_checkpoint + '.pth.tar'

    os.makedirs(args.expdir, exist_ok=True)
    full_filename = os.path.join(args.expdir, filename)
    torch.save(state, full_filename)
    now = str(datetime.datetime.now())
    print("Saved file " + full_filename + " on " + now, flush=True)
    if is_best:
        shutil.copyfile(full_filename, os.path.join(args.expdir, filename_best))


def load_from_checkpoint(model, path_load, submodels_load=None, optimizer=None):
    """
    Loads model from checkpoint.
    """
    if os.path.isfile(path_load):
        checkpoint = torch.load(path_load)
        if submodels_load is None or len(submodels_load) == 0:
            c = checkpoint['model_state_dict']
            checkp_dp = list(c.items())[0][0].startswith('module.')
            model_dp = isinstance(model, torch.nn.DataParallel)

            if (checkp_dp and model_dp) or (not checkp_dp and not model_dp):
                model.load_state_dict(c)
            elif checkp_dp and not model_dp:
                c_nodp = {k.partition('module.')[2]: v for k, v in checkpoint['model_state_dict'].items() if
                          k.startswith('module.')}
                model.load_state_dict(c_nodp)
            else:
                raise NotImplementedError("Not implemented. Meanwhile, you can load the model before the DataParallel, "
                                          "it is easy")
        else:
            for m in submodels_load:
                submodel = {k.partition('module.' + m)[2]: v for k, v in checkpoint['model_state_dict'].items() if
                            k.startswith('module.' + m)}
                model.__getattr__(m).load_state_dict(submodel)
        if optimizer is not None and 'optimizer' in checkpoint:
            optimizer.load_state_dict(checkpoint['optimizer'])
            # for param_group in optimizer.param_groups:
            #     param_group['lr'] = 0.01
            print('Optimizer loaded')
        print('Loaded seed model from ' + path_load + ' in epoch ' + str(checkpoint['epoch']), flush=True)
    else:
        raise Exception('No checkpoint found at ' + path_load)


def transform(images):
    # images is a batch of images
    images = images.type(torch.cuda.FloatTensor) / 255
    images[:, 0, :, :] = (images[:, 0, :, :] - 0.485) / 0.229
    images[:, 1, :, :] = (images[:, 1, :, :] - 0.456) / 0.224
    images[:, 2, :, :] = (images[:, 2, :, :] - 0.406) / 0.225

    return images


class UnNormalize(object):
    def __init__(self, mean, std):
        self.mean = mean
        self.std = std

    def __call__(self, tensor):
        """
        Args:
            tensor (Tensor): Tensor image of size (C, H, W) to be normalized.
        Returns:
            Tensor: Normalized image.
        """
        for t, m, s in zip(tensor, self.mean, self.std):
            t.mul_(s).add_(m)
            # The normalize code -> t.sub_(m).div_(s)
        return tensor


def accuracy(output, target, topk=(1,)):
    """Computes the accuracy over the k top predictions for the specified values of k"""
    with torch.no_grad():
        maxk = max(topk)
        batch_size = target.size(0)

        _, pred = output.topk(maxk, 1, True, True)
        pred = pred.t()
        correct = pred.eq(target.view(1, -1).expand_as(pred))

        res = []
        for k in topk:
            correct_k = correct[:k].view(-1).float().sum(0, keepdim=True)
            res.append(correct_k.mul_(100.0 / batch_size))
        return res


def update(newValue, existing_aggregate):
    (count, mean, M2) = existing_aggregate
    count = count + 1
    delta = newValue - mean
    mean = mean + delta / count
    delta2 = newValue - mean
    M2 = M2 + delta * delta2

    existing_aggregate = (count, mean, M2)
    return existing_aggregate


# retrieve the mean, variance and sample variance from an aggregate
def finalize(existing_aggregate):
    (count, mean, M2) = existing_aggregate
    (mean, variance, sampleVariance) = (mean, M2 / count, M2 / (count - 1))
    if count < 2:
        return float('nan')
    else:
        return (mean, variance, sampleVariance)


def send_email(msg, subject):
    import smtplib
    import yaml
    with open('config_files/general_config.yaml', 'r') as file:
        config = yaml.load(file)
    fromaddr = config['email_usr']
    toaddr = config['email_usr']
    username = config['email_usr']
    password = config['email_pwd']
    server = smtplib.SMTP('smtp.gmail.com:587')
    server.ehlo()
    server.starttls()
    server.login(username, password)
    msg = "\r\n".join([
        "From: {}".format(fromaddr),
        "To: {}".format(toaddr),
        "Subject: {}".format(subject),
        "",
        "{}".format(msg)
    ])
    # server.sendmail(fromaddr, toaddr, msg)
    server.quit()


class AverageMeter(object):
    """Computes and stores the average and current value"""

    def __init__(self):
        self.reset()

    def reset(self):
        self.val = 0
        self.avg = 0
        self.sum = 0
        self.count = 0

    def update(self, val, n=1):
        self.val = val
        self.sum += val * n
        self.count += n
        self.avg = self.sum / self.count


def print_model_report(model):
    print('-' * 100)
    print(model)
    print('Dimensions =', end=' ')
    count = 0
    for p in model.named_parameters():
        print(p[0], p[1].size(), '%s' % (human_format(np.prod(p[1].size()))))
        count += np.prod(p[1].size())
    print()
    print('Num parameters total = %s' % (human_format(count)))
    print('-' * 100)
    return count


def human_format(num):
    magnitude = 0
    while abs(num) >= 1000:
        magnitude += 1
        num /= 1000.0
    return '%.1f%s' % (num, ['', 'K', 'M', 'G', 'T', 'P'][magnitude])


def geodesic_dilation(mask, marker_mask):
    mask = mask.astype(np.uint8)
    marker = np.zeros(mask.shape, np.uint8)
    marker[marker_mask[0], marker_mask[1]] = 1

    kernel = np.ones((3, 3), np.uint8)
    while True:
        marker_old = marker
        marker = cv2.dilate(marker, kernel, iterations=1)
        marker_new = np.minimum(mask, marker)
        if (marker_new != marker_old).sum() == 0:
            break
        marker = marker_new
    return marker


class Timer(object):
    def __init__(self, name=None):
        self.name = name

    def __enter__(self):
        self.tstart = time.time()

    def __exit__(self, _, value, traceback):
        if self.name:
            print('[%s]' % self.name)
            print('Elapsed: %s' % (time.time() - self.tstart))


def adjust_learning_rate(args, optimizer, epoch):
    """Sets the learning rate to the initial LR decayed by 10 every lr_decay epochs"""
    lr = args.lr * (0.1 ** (epoch // args.lrdecay))
    for param_group in optimizer.param_groups:
        param_group['lr'] = lr


class HorizontalFlip:
    """Horizontally flip the given PIL Image randomly with a probability of p."""

    def __init__(self, p=1):
        self.p = p

    def __call__(self, img):
        """
        Args:
            img (PIL Image): Image to be flipped.

        Returns:
            PIL Image: Randomly flipped image.
        """
        if random.random() < self.p:
            return F.hflip(img)
        return img


class HiddenPrints:
    def __enter__(self):
        # self._original_stdout = sys.stdout
        # sys.stdout = io.StringIO()
        # # sys.stdout = None

        # open 2 fds
        self.null_fds = [os.open(os.devnull, os.O_RDWR) for x in range(2)]
        # save the current file descriptors to a tuple
        self.save = os.dup(1), os.dup(2)
        # put /dev/null fds on 1 and 2
        os.dup2(self.null_fds[0], 1)
        os.dup2(self.null_fds[1], 2)

    def __exit__(self, exc_type, exc_val, exc_tb):
        # sys.stdout = self._original_stdout

        # restore file descriptors so I can print the results
        os.dup2(self.save[0], 1)
        os.dup2(self.save[1], 2)
        # close the temporary fds
        os.close(self.null_fds[0])
        os.close(self.null_fds[1])


def as_numpy(obj):
    if isinstance(obj, collections.Sequence):
        return [as_numpy(v) for v in obj]
    elif isinstance(obj, collections.Mapping):
        return {k: as_numpy(v) for k, v in obj.items()}
    elif isinstance(obj, Variable):
        return obj.data.cpu().numpy()
    elif torch.is_tensor(obj):
        return obj.cpu().numpy()
    else:
        return np.array(obj)


def unique(ar, return_index=False, return_inverse=False, return_counts=False):
    ar = np.asanyarray(ar).flatten()

    optional_indices = return_index or return_inverse
    optional_returns = optional_indices or return_counts

    if ar.size == 0:
        if not optional_returns:
            ret = ar
        else:
            ret = (ar,)
            if return_index:
                ret += (np.empty(0, np.bool),)
            if return_inverse:
                ret += (np.empty(0, np.bool),)
            if return_counts:
                ret += (np.empty(0, np.intp),)
        return ret
    if optional_indices:
        perm = ar.argsort(kind='mergesort' if return_index else 'quicksort')
        aux = ar[perm]
    else:
        ar.sort()
        aux = ar
    flag = np.concatenate(([True], aux[1:] != aux[:-1]))

    if not optional_returns:
        ret = aux[flag]
    else:
        ret = (aux[flag],)
        if return_index:
            ret += (perm[flag],)
        if return_inverse:
            iflag = np.cumsum(flag) - 1
            inv_idx = np.empty(ar.shape, dtype=np.intp)
            inv_idx[perm] = iflag
            ret += (inv_idx,)
        if return_counts:
            idx = np.concatenate(np.nonzero(flag) + ([ar.size],))
            ret += (np.diff(idx),)
    return ret


def colorEncode(labelmap, colors, mode='BGR'):
    labelmap = labelmap.astype('int')
    labelmap_rgb = np.zeros((labelmap.shape[0], labelmap.shape[1], 3),
                            dtype=np.uint8)
    for label in unique(labelmap):
        if label < 0:
            continue
        labelmap_rgb += (labelmap == label)[:, :, np.newaxis] * \
                        np.tile(colors[label],
                                (labelmap.shape[0], labelmap.shape[1], 1))

    if mode == 'BGR':
        return labelmap_rgb[:, :, ::-1]
    else:
        return labelmap_rgb


def frange(start, stop, step):
    i = start
    while i < stop:
        yield i
        i += step


# ---------------------------- IMAGE AND AUDIO PROJECT ------------------------------- #

def calc_recalls(I_embeddings, A_embeddings, frame_counts, loss_type):
    # frame_counts = frame_counts[0:500]
    # I_embeddings = I_embeddings[0:500]
    # A_embeddings = A_embeddings[0:500]
    n_i = len(I_embeddings)
    n_a = len(A_embeddings)
    assert (n_i == n_a)
    n = n_i
    S = torch.Tensor(n_i, n_a).zero_()
    I_e = torch.Tensor(I_embeddings[0].size()).cuda()
    A_e = torch.Tensor(A_embeddings[0].size()).cuda()
    for image_i in range(n_i):
        for audio_i in range(n_a):
            nF = frame_counts[audio_i]
            I_e.copy_(I_embeddings[image_i])
            A_e.copy_(A_embeddings[audio_i])

            S[image_i, audio_i] = matchmap_sim(compute_matchmap(I_e, A_e[:, :, 0:nF]))
    A2I_scores, A2I_ind = S.topk(10, 0)
    I2A_scores, I2A_ind = S.topk(10, 1)
    A_r1 = AverageMeter()
    A_r5 = AverageMeter()
    A_r10 = AverageMeter()
    I_r1 = AverageMeter()
    I_r5 = AverageMeter()
    I_r10 = AverageMeter()
    for i in range(n):
        A_foundind = -1
        I_foundind = -1
        for ind in range(10):
            if A2I_ind[ind, i] == i:
                I_foundind = ind
            if I2A_ind[i, ind] == i:
                A_foundind = ind
        # do r1s
        if A_foundind == 0:
            A_r1.update(1)
        else:
            A_r1.update(0)
        if I_foundind == 0:
            I_r1.update(1)
        else:
            I_r1.update(0)
        # do r5s
        if 0 <= A_foundind < 5:
            A_r5.update(1)
        else:
            A_r5.update(0)
        if 0 <= I_foundind < 5:
            I_r5.update(1)
        else:
            I_r5.update(0)
        # do r10s
        if 0 <= A_foundind < 10:
            A_r10.update(1)
        else:
            A_r10.update(0)
        if 0 <= I_foundind < 10:
            I_r10.update(1)
        else:
            I_r10.update(0)

    recalls = {'A_r1': A_r1.avg, 'A_r5': A_r5.avg, 'A_r10': A_r10.avg, 'I_r1': I_r1.avg, 'I_r5': I_r5.avg,
               'I_r10': I_r10.avg}

    return recalls


def matchmap_sim(matchmap):
    # M is assumed to be (H, W, T)
    # MISA
    matchmap_max_h, _ = matchmap.max(0)
    matchmap_max_hw, _ = matchmap_max_h.max(0)
    return matchmap_max_hw.mean()


def compute_matchmap_vectorized(image, audio):
    # I is assumed to be (N_b,embedding_dim, H, W)
    # A is assumed to be (N_b,embedding_dim, 1, T)
    N = image.size(0)
    D = image.size(1)
    H = image.size(2)
    W = image.size(3)
    T = audio.size(3)

    audio_r = audio.squeeze(2)  # (N,D, T)

    image_r = image.view(N, D, -1).permute(0, 2, 1)  # (H*W, D)

    matchmap = torch.bmm(image_r, audio_r)  # size (H*W, T)

    matchmap = matchmap.view(N, H, W, T)
    return matchmap


def compute_matchmap(image, audio, symfun='dot'):
    # I is assumed to be (embedding_dim, H, W)
    # A is assumed to be (embedding_dim, 1, T)
    D = image.size(0)
    H = image.size(1)
    W = image.size(2)
    T = audio.size(2)
    audio_r = audio.squeeze(1)  # (D, T)
    image_r = image.view(D, -1).t()  # (H*W, D)

    if symfun == 'cos':
        audio_r = nn.functional.normalize(audio_r, p=2, dim=0)
        image_r = nn.functional.normalize(image_r, p=2, dim=1)

    matchmap = torch.mm(image_r, audio_r)  # size (H*W, T)

    matchmap = matchmap.view(H, W, T)

    return matchmap
