import os
import os.path
import pickle
import random
import tarfile
import warnings

import cv2
import imageio
import numpy as np
import scipy
import scipy.ndimage.morphology as morph
import torch
import torch.utils.data
import torchvision.transforms as transforms
import wget

import segmenter
import utils


def experiment(name, trainer):
    trainer.model.eval()
    if name == 'recall':
        test_recall(trainer)
    elif name == 'videos':
        create_videos(trainer)
    elif name == 'recall_selected':
        test_recall_selected(trainer)
    elif name == 'test_synthetic':
        test_synthetic(trainer)
    elif name == 'repeated_attributes':
        repeated_attributes(trainer)
    else:
        raise Exception(f'The {name} experiment is not available')


def test_recall(trainer):
    """
    This experiment computes one positive and num_fakes corresponding negatives with the GAN, gives the recall of the
    system in distinguishing the positive from the negatives.
    Similar to the test_recall_selected, but selecting the negatives online, not using the pre-selected (and better)
    negatives.
    """

    number_recall = 200
    num_fakes = 9
    if not trainer.args.use_cpu:
        torch.cuda.synchronize()

    recall1_meter = utils.AverageMeter()
    recall5_meter = utils.AverageMeter()

    # Switch to evaluate mode
    trainer.model.eval()

    with torch.no_grad():
        for i, (image_input, audio_input, negatives, nframes, path, _) in enumerate(trainer.loaders['test']):
            if i % 50 == 0:
                print(f'Starting batch {i}')
            if i * image_input.size(0) > number_recall:
                break

            for j in range(image_input.size(0)):

                score_vector = torch.FloatTensor(num_fakes + 1)

                if not trainer.args.loading_image:
                    v_init = trainer.z[0]
                    z_img = torch.FloatTensor(1, v_init.shape[0])
                    z_img[0, :] = trainer.z[int(path[j])]
                    image_input = trainer.generator.generate_images(z_img, intervention=None)
                    image_input = utils.transform(image_input)
                else:
                    image_input = image_input.cuda()

                pos_image = image_input[0, :, :, :]
                model_output = trainer.model(image_input, audio_input, [])
                image_output = model_output[0]
                audio_output = model_output[1]
                nF = nframes[j]

                matchmap = utils.compute_matchmap(image_output[0], audio_output[0][:, :, :nF])

                real_score = utils.matchmap_sim(matchmap)
                score_vector[0] = real_score
                matchmap = matchmap.data.cpu().numpy().copy()
                matchmap = matchmap.transpose(2, 0, 1)  # l, h, w
                matchmap = matchmap / matchmap.max()
                matchmap_image = matchmap.max(axis=0)

                threshold = 0.95

                ind_max = np.argmax(matchmap)
                ind_h = (ind_max % (matchmap.shape[2] * matchmap.shape[1])) // matchmap.shape[1]
                ind_w = (ind_max % (matchmap.shape[2] * matchmap.shape[1])) % matchmap.shape[1]

                for fake_id in range(num_fakes):
                    binary_mask = matchmap_image > (threshold * matchmap_image.max())
                    binary_mask = utils.geodesic_dilation(binary_mask, (ind_h, ind_w))
                    norm = 0
                    threshold_random = 0.95
                    p = 0.4

                    while norm < threshold_random:
                        with torch.no_grad():
                            intervention = {}
                            for layer_n in trainer.layer_list_all:
                                layer_size = trainer.layers_dict[layer_n]['size']
                                layer_dim = trainer.layers_dict[layer_n]['depth']

                                ablation, replacement = trainer.get_ablation_replacement(params=[layer_dim, True, p],
                                                                                         option='random')
                                ablation_final = cv2.resize(binary_mask, (layer_size, layer_size))
                                ablation_final = np.tile(ablation_final, (layer_dim, 1, 1)).astype(np.float32)
                                ablation_final = torch.cuda.FloatTensor(ablation_final)
                                ablation_final = ablation.view(layer_dim, 1, 1).expand_as(
                                    ablation_final) * ablation_final
                                intervention[layer_n] = (ablation_final, replacement)

                            z_img = trainer.z[int(path[j])]
                            z_img = z_img[np.newaxis, :].detach()
                            neg_img = trainer.generator.generate_images(z_img, intervention=intervention).detach()
                            neg_img_t = utils.transform(neg_img).detach()

                            binary_mask = cv2.resize(binary_mask, (128, 128))

                            bmask = torch.Tensor(binary_mask).cuda()

                            bmask = bmask.view(1, 128, 128).expand(3, 128, 128)
                            norm = (neg_img_t[0, :, :, :] - pos_image[:, :, :].detach())

                            norm = norm * bmask
                            norm = torch.norm(torch.norm(torch.norm(norm, dim=2), dim=1), dim=0)
                            norm_normalized = norm / torch.norm(
                                torch.norm(torch.norm(pos_image[:, :, :].detach() * bmask, dim=2), dim=1), dim=0)
                            norm = norm_normalized.item()

                            if random.random() > 0.2:
                                p = p + 0.05
                            else:
                                threshold_random = threshold_random - 0.01
                    model_output = trainer.model(neg_img_t, audio_input, [])
                    image_output = model_output[0]
                    audio_output = model_output[1]
                    score_vector[1 + fake_id] = utils.matchmap_sim(
                        utils.compute_matchmap(image_output[0], audio_output[0][:, :, :nF]))

                _, ids = score_vector.topk(10)
                ids = ids.cpu().numpy()
                ids = np.where(ids == 0)[0]

                A_foundind = ids[0]

                if A_foundind == 0:
                    recall1_meter.update(1)
                else:
                    recall1_meter.update(0)

                if A_foundind < 5:
                    recall5_meter.update(1)
                else:
                    recall5_meter.update(0)
                # print('Recall 1: {0}'.format(recall1_meter.avg))
                # print('Recall 5: {0}'.format(recall5_meter.avg))

    print('Recall 1: {0}'.format(recall1_meter.avg))
    print('Recall 5: {0}'.format(recall5_meter.avg))

    return recall1_meter.avg


def create_videos(trainer):
    """
    Create videos for visualizing. Will generate a video for each sample, so cancel when you have enough videos.
    For this experiment, you need to have the images downloaded.
    """
    if not trainer.args.use_cpu:
        torch.cuda.synchronize()

    # Switch to evaluate mode
    trainer.model.eval()

    len_audio = 20.48  # Only if target_spec_length = 2048
    folder_name = os.path.join(trainer.args.results, 'results_video', trainer.args.name_checkpoint)
    os.makedirs(folder_name, exist_ok=True)

    with torch.no_grad():
        for i, (image_input, audio_input, negatives, nframes, path, _) in enumerate(trainer.loaders['test']):

            v_init = trainer.z[int(path[0])]
            z_img = torch.FloatTensor(audio_input.size(0), v_init.shape[0])

            for k in range(audio_input.size(0)):
                z_img[k, :] = trainer.z[int(path[k])]

            if not trainer.args.loading_image:
                image_input = trainer.generator.generate_images(z_img, intervention=None)
                image_input = utils.transform(image_input).detach()

            # compute output
            model_output = trainer.model(image_input, audio_input, [])
            image_output = model_output[0]
            audio_output = model_output[1]

            pooling_ratio = round(audio_input.size(3) / audio_output.size(3))
            nframes.div_(pooling_ratio)

            fps = audio_output.size(3) / len_audio

            for bs in range(image_output.size(0)):

                try:
                    target_writer = imageio.get_writer(folder_name + f'/output_video_{path[bs]}.mp4', fps=fps)
                    matchmap = utils.compute_matchmap(image_output[bs],
                                                      audio_output[bs][:, :, 0:nframes[bs]]).data.cpu().numpy().copy()
                    wav = trainer.loaders['test'].dataset.load_audio_raw(path=path[bs])
                    scipy.io.wavfile.write(folder_name + f'/output_audio_{path[bs]}.mp3', 44100,
                                           wav.astype(np.int16))

                    matchmap = matchmap.transpose(2, 0, 1)  # l, h, w
                    matchmap = matchmap / matchmap.sum()
                    matchmap_l, matchmap_h, matchmap_w = matchmap.shape
                    k_ranges = utils.frange(np.max(matchmap) / 100, np.max(matchmap), np.max(matchmap) / 100)

                    for k in k_ranges:
                        binary_mask = matchmap > k
                        map_temp = np.multiply(matchmap, binary_mask)
                        if np.sum(map_temp) < 0.1:
                            break

                    smoothing_factor = 1
                    struct_element = [[[True]]] * smoothing_factor
                    binary_mask = morph.binary_dilation(binary_mask, struct_element)  # Temporal smoothing
                    matchmap = np.multiply(matchmap, binary_mask)
                    matchmap = (matchmap - np.min(matchmap)) / (np.max(matchmap) - np.min(matchmap))

                    image = trainer.loaders['test'].dataset.load_image_raw(path=path[bs])

                    for t in range(matchmap_l):
                        mask_resize = np.array([cv2.resize(binary_mask[t, :, :].astype(float),
                                                           (image.shape[1], image.shape[0]))] * 3).transpose(1, 2, 0)
                        map_t = cv2.resize(matchmap[t, :, :], (image.shape[1], image.shape[0]))
                        map_t = 1 - map_t
                        map_t = 255 * map_t
                        map_t = map_t.astype(np.uint8)
                        map_t = cv2.applyColorMap(map_t, cv2.COLORMAP_JET)

                        im_final = np.multiply((0.3 * image + 0.7 * map_t), mask_resize) + np.multiply(image,
                                                                                                       1 - mask_resize)

                        target_writer.append_data(im_final)

                    target_writer.close()
                    # -y means overwrite

                    os.system('ffmpeg -y -i ' +
                              folder_name + f'/output_video_{path[bs]}.mp4 -i ' +
                              folder_name + f'/output_audio_{path[bs]}.mp3 -vf scale=1200:1200 -shortest -strict -2 '
                                            '-c:v libx264 ' +
                              folder_name + f'/video_{path[bs]}.mp4')
                except KeyboardInterrupt as e:
                    print('you decided to finish!')

                finally:
                    # Remove temporary files
                    try:
                        os.remove(folder_name + f'/output_video_{path[bs]}.mp4')
                    except OSError:
                        pass
                    try:
                        os.remove(folder_name + f'/output_audio_{path[bs]}.mp3')
                    except OSError:
                        pass

    return False


def test_synthetic(trainer):
    """
    Computes experiment which consists in determining the correct (positive) image given an audio, where the options
    are the positive image and a hard synthetic (rendered or precomputed) negative. Chance is 50 %
    """
    total_examples = 0
    correct_1vs1 = 0
    with torch.no_grad():
        for j, (image_input, audio_input, negatives, nframes, path, _) in enumerate(trainer.loaders['test']):
            if j % 50 == 0:
                print(f'Starting batch {i}')

            image_input = image_input.cuda()
            audio_input = audio_input.cuda()
            negatives = [negatives[i].cuda() for i in range(len(negatives))]

            model_output = trainer.model(image_input, audio_input, negatives)
            image_output = model_output[0]
            audio_output = model_output[1]
            negatives_output = model_output[2]

            pooling_ratio = round(audio_input.size(3) / audio_output.size(3))
            nframes.div_(pooling_ratio)

            for i in range(image_input.shape[0]):
                list1 = [image_output[i]]
                for neg in negatives_output:
                    list1.append(neg[i])
                all_images = torch.stack(list1)

                matchmaps = torch.matmul(all_images.permute(0, 2, 3, 1), audio_output[i][..., :nframes[i]].squeeze())
                values = matchmaps.mean(3)
                values, _ = values.max(2)
                values, _ = values.max(1)
                values = values.cpu().numpy()
                indexes = np.argsort(-values)
                if values[0] > values[np.random.randint(1, 5)]:  # randomly choose one of the negatives
                    correct_1vs1 += 1
                total_examples += 1

    print(f'Recall@1 (1vs1): {correct_1vs1}/{total_examples}={correct_1vs1/total_examples}')


def test_recall_selected(trainer):
    """
    Semantic test in the paper. Use pre-extracted negatives (selected so that they have one changed attribute with
    respect to the positive image, and are different among them) and try to detect the positive one.

    If this test is performed with the natural speech data, some of its images will not have any associated audio, so
    they will be ignored.
    """
    normalize = transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    print('loading segmentor')
    segment = segmenter.GroundTruthSegmenter(trainer.args.path_model_segmenter)
    print('segmentor loaded')

    if not trainer.layer_list_all == ['layer4']:
        warnings.warn(f'The negatives were extracted for layer 4. The current configuration of the GAN '
                      f'({trainer.layer_list_all}) will NOT be used. Note that this is not a problem, because the '
                      f'images used in the experiment -and the layers used to generate them- are unrelated to the '
                      f'layers we used during training')

    layer_name = 'layer4'
    dim_mask = trainer.layers_dict[layer_name]['depth']
    layer_size = trainer.layers_dict[layer_name]['size']

    os.makedirs(trainer.args.path_negatives_test, exist_ok=True)
    if not os.path.isfile(os.path.join(trainer.args.path_negatives_test, 'negatives.pth.tar')):
        wget.download('http://wednesday.csail.mit.edu/gaze/ganclevr/files/negatives.pth.tar',
                      out=os.path.join(trainer.args.path_negatives_test, 'negatives.pth.tar'))

    negatives_test = [[k, v] for k, v in torch.load(
        os.path.join(trainer.args.path_negatives_test, 'negatives.pth.tar')).items()]

    with torch.no_grad():
        results = np.zeros(5)
        total_examples = 0
        correct_r3 = 0
        correct_r1 = 0
        for i, (path_audio, neg) in enumerate(negatives_test):
            if i % 100 == 0:
                print(f'Starting sample {i}')
            audio, nframes = trainer.loaders['test'].dataset.load_mel_spectrogram(path_audio, verbose=False)
            if audio.sum() == 0:
                continue
            path_int = int(path_audio)
            z_img = trainer.z[path_int]
            z_img = z_img[np.newaxis, :]
            images = []
            pos_img = trainer.generator.generate_images(z_img)
            images.append(pos_img)
            L = segment.get_pred(normalize(pos_img[0] / 255), return_L=True)[0]
            for j, (position_original, ablation) in enumerate(neg):
                binary_mask = (L == L[int(position_original[0]), int(position_original[1])]).astype(float)
                ablation_final = cv2.resize(binary_mask, (layer_size, layer_size), interpolation=cv2.INTER_AREA)
                ablation_final = np.tile(ablation_final, (dim_mask, 1, 1)).astype(np.float32)
                ablation_final = torch.cuda.FloatTensor(ablation_final)
                ablation_final = ablation.view(dim_mask, 1, 1).expand_as(ablation_final) * ablation_final

                intervention = {layer_name: (ablation_final, None)}
                neg_img = trainer.generator.generate_images(z_img, intervention=intervention)
                images.append(neg_img)

            images = torch.cat(images, dim=0)
            images = utils.transform(images).detach()
            audio = audio.cuda()
            audio = audio.view(1, 1, audio.shape[0], audio.shape[1])
            image_output = trainer.model(images, None, [])[0]
            audio_output = trainer.model._modules['module'].model_audio.audio_model(audio)
            matchmaps = torch.matmul(image_output.permute(0, 2, 3, 1), audio_output.squeeze())
            values = matchmaps[..., 0:nframes].mean(3)
            values, _ = values.max(2)
            values, _ = values.max(1)
            values = values.cpu().numpy()
            indexes = np.argsort(-values)
            if indexes[0] == 0:
                correct_r1 += 1
            else:
                a = 2  # just to debug
            if 0 in indexes[0:3]:
                correct_r3 += 1
            results[indexes[0]] += 1
            total_examples += 1

    print(results)
    print(f'Recall@1: {correct_r1}/{total_examples}={correct_r1/total_examples}')
    print(f'Recall@3: {correct_r3}/{total_examples}={correct_r3/total_examples}')


def repeated_attributes(trainer):
    """
    Here we check if the model is able of determining which images contain a specific attribute mentioned in the audio.
    It is the experiment reported in Table 1 in the paper.
    For each attribute, find 500 images with the attribute and 500 without (with the segmentor).
    We use the same list of images (for each attribute) for all the compared checkpoints.
    The audios with the repeated attributes are also always the same.
    """

    if not os.path.isdir(os.path.join(trainer.args.path_repeated_attributes, 'repetition_audios')):
        path_tar = os.path.join(trainer.args.path_repeated_attributes, 'repeated_attributes.tar.gz')
        wget.download('http://wednesday.csail.mit.edu/gaze/ganclevr/files/repetition_audios.tar.gz', out=path_tar)
        tf = tarfile.open(path_tar)
        tf.extractall(trainer.args.path_repeated_attributes)
        os.remove(path_tar)
    trainer.model.eval()
    num_elements_each = 500
    path_paths = os.path.join(trainer.args.results, 'repeated_attributes', f'paths_{trainer.args.name_dataset}.pkl')
    list_attributes = ['RUBBER', 'METAL', 'CUBE', 'SPHERE', 'CYLINDER', 'LARGE', 'SMALL', 'GRAY', 'RED', 'BLUE',
                       'GREEN', 'BROWN', 'PURPLE', 'CYAN', 'YELLOW']

    # First step: get paths of images to test for the specific dataset
    print('Obtaining samples to compare')
    if not os.path.isfile(path_paths):
        j = 0
        normalize = transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        segment = segmenter.GroundTruthSegmenter(trainer.args.path_model_segmenter)

        counter_no_attribute = {word_attribute: 0 for word_attribute in list_attributes}
        counter_attribute = {word_attribute: 0 for word_attribute in list_attributes}

        # The key is the path, and the values are the attributes. This way, if a path (image) contains more than one
        # attribute, we can share the forward pass (much faster)
        paths_attributes = {}

        while ((np.array(list(counter_no_attribute.values())) < num_elements_each).any() or (
                np.array(list(counter_attribute.values())) < num_elements_each).any()) and \
                j < len(trainer.loaders['test'].dataset):
            p = trainer.loaders['test'].dataset.paths[j]
            j += 1

            raw_image = trainer.loaders['test'].dataset.load_image_raw(path=f'{p}')

            L = segment.get_pred(normalize(torch.tensor(raw_image).cuda().permute(2, 0, 1).float()/255), return_L=True)
            B = L >> 16
            G = (L - (B << 16)) >> 8
            R = (L - (B << 16) - (G << 8))
            pred_size = B >> 4  # - ids
            pred_shape = G >> 4
            pred_material = G - (pred_shape << 4)
            pred_color = R

            segmentation_keys = {'CUBE': [pred_shape, 1], 'SPHERE': [pred_shape, 2], 'CYLINDER': [pred_shape, 3],
                                 'RUBBER': [pred_material, 1], 'METAL': [pred_material, 2], 'LARGE': [pred_size, 1],
                                 'SMALL': [pred_size, 2], 'GRAY': [pred_color, 1], 'RED': [pred_color, 2],
                                 'BLUE': [pred_color, 3], 'GREEN': [pred_color, 4], 'BROWN': [pred_color, 5],
                                 'PURPLE': [pred_color, 6], 'CYAN': [pred_color, 7], 'YELLOW': [pred_color, 8]}

            exists = {}
            for word_attribute in list_attributes:
                no_size = word_attribute not in ['LARGE', 'SMALL']
                prob_exists = (segmentation_keys[word_attribute][0] == segmentation_keys[word_attribute][1]).sum()
                if prob_exists > 100 and prob_exists < (700 if no_size else 20000):  # otherwise can be noise
                    exists[word_attribute] = 1
                elif prob_exists < 10:  # to make sure it is not there (10 pixels is almost nothing)
                    exists[word_attribute] = -1
                else:
                    exists[word_attribute] = 0
                # Check if attribute in the image
                if exists[word_attribute] == 1 and counter_attribute[word_attribute] < num_elements_each:
                    counter_attribute[word_attribute] += 1
                    if p in paths_attributes:
                        paths_attributes[p].append([word_attribute, exists[word_attribute]])
                    else:
                        paths_attributes[p] = [[word_attribute, exists[word_attribute]]]
                elif exists[word_attribute] == -1 and counter_no_attribute[word_attribute] < num_elements_each:
                    counter_no_attribute[word_attribute] += 1
                    if p in paths_attributes:
                        paths_attributes[p].append([word_attribute, exists[word_attribute]])
                    else:
                        paths_attributes[p] = [[word_attribute, exists[word_attribute]]]

        os.makedirs(os.path.join(trainer.args.results, 'repeated_attributes'), exist_ok=True)
        with open(path_paths, 'wb') as f:
            pickle.dump(paths_attributes, f, protocol=pickle.HIGHEST_PROTOCOL)
    else:
        with open(path_paths, 'rb') as f:
            paths_attributes = pickle.load(f)

    # Second step: compute matching values for each image and audio in the list
    print('Computing matching values')
    synthetic = 'synth' in trainer.args.name_dataset

    results_checkpoint = {word_attribute: [] for word_attribute in list_attributes}

    # Load audio of all attributes and store in dict
    audio_features = {}
    for word_attribute in list_attributes:
        # Load audio of the word
        path_audio = os.path.join(trainer.args.path_repeated_attributes, 'repetition_audios',
                                  f'{word_attribute}_{"synthetic" if synthetic else "amt"}.wav')
        audio, nframes = trainer.loaders['test'].dataset.load_mel_spectrogram(path='', path_audio=path_audio)
        audio = audio[:,0:nframes]
        audio = audio.unsqueeze(0).unsqueeze(0).cuda()
        with torch.no_grad():
            audio_feat = trainer.model._modules['module'].model_audio.audio_model(audio)
        audio_features[word_attribute] = audio_feat

    # Load images and compute matchmaps
    for path, attributes in paths_attributes.items():
        with torch.no_grad():
            image = trainer.loaders['test'].dataset.load_image(path=path).unsqueeze(0).cuda()
            image_output = trainer.model._modules['module'].model_image.image_model(image)

        for word_attribute, ex in attributes:
            matchmap = utils.compute_matchmap(image_output[0], audio_features[word_attribute][0])  # all frames
            matchmap_max_h, _ = matchmap.max(0)
            matchmap_max_hw, _ = matchmap_max_h.max(0)
            #matchmap_max_hw = matchmap_max_hw[4:-4]  # cut beginning and end
            value1 = matchmap_max_hw.mean()
            value2, _ = matchmap_max_hw.max(0)

            results_checkpoint[word_attribute].append([ex == 1, value1.cpu().numpy(), value2.cpu().numpy()])

    # Third step: compute final experiment value
    print('Computing final experiment value')
    diff_ = 0
    n_pairs_total = 0

    shape = [0, 0]
    color = [0, 0]
    size = [0, 0]
    material = [0, 0]

    for attribute, values in results_checkpoint.items():
        a = np.array(values)
        pos = a[np.where(a[:, 0] == 1)][:, 1]
        neg = a[np.where(a[:, 0] == 0)][:, 1]
        l = np.minimum(pos.shape[0], neg.shape[0])
        diff = (pos[:l] > neg[:l]).sum()
        n_pairs_total += l
        diff_ += diff

        if attribute in ['CUBE', 'SPHERE', 'CYLINDER']:
            shape[0] += diff
            shape[1] += l
        elif attribute in ['RUBBER', 'METAL', 'RUBBER', 'METAL']:
            material[0] += diff
            material[1] += l
        elif attribute in ['LARGE', 'SMALL']:
            size[0] += diff
            size[1] += l
        elif attribute in ['GRAY', 'RED', 'BLUE', 'GREEN', 'BROWN', 'CYAN', 'PURPLE', 'YELLOW']:
            color[0] += diff
            color[1] += l

    print('')
    print(f'Color: {color[0]/color[1]:0.03f}')
    print(f'Material: {material[0]/material[1]:0.03f}')
    print(f'Size: {size[0]/size[1]:0.03f}')
    print(f'Shape: {shape[0]/shape[1]:0.03f}')
    print(f'Mean: {(shape[0]/shape[1] + color[0]/color[1] + size[0]/size[1] + material[0]/material[1])/4:0.03f}')

