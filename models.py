import torch.nn as nn
import torch.nn.functional as F
import torchvision.models as models


# ------------------------------ SUBMODELS ----------------------------------- #


class DavenetText(nn.Module):
    def __init__(self, embedding_dim, vocab_size, padding_idx=0):
        super(DavenetText, self).__init__()
        self.wordEmbedder = nn.Embedding(vocab_size, 200, padding_idx=padding_idx)
        self.c1 = nn.Conv1d(200, 512, 3, padding=1)
        self.c2 = nn.Conv1d(512, embedding_dim, 3, padding=1)

    def forward(self, x):
        # x is assumed to be a LongTensor of size (N, W)
        x = self.wordEmbedder(x)
        # x is now (N, W, wordvec_dim)
        # Need to get it into (N, wordvec_dim, W) for conv layer
        x = x.transpose(1, 2)
        x = self.c1(x)
        x = F.relu(x)
        x = self.c2(x)
        x = F.relu(x)
        return x.unsqueeze(2)


class DavenetTextLarge(nn.Module):
    def __init__(self, embedding_dim, vocab_size, padding_idx=0):
        super(DavenetTextLarge, self).__init__()
        self.wordEmbedder = nn.Embedding(vocab_size, 200, padding_idx=padding_idx)
        self.c1 = nn.Conv1d(200, 200, 5, padding=2)
        self.c2 = nn.Conv1d(200, 300, 5, padding=2)
        self.c3 = nn.Conv1d(300, 300, 5, padding=2)
        self.c4 = nn.Conv1d(300, 512, 5, padding=2)
        self.c5 = nn.Conv1d(512, embedding_dim, 5, padding=2)

    def forward(self, x, h=False):
        # x is assumed to be a LongTensor of size (N, W)
        x = self.wordEmbedder(x)
        # x is now (N, W, wordvec_dim)
        # Need to get it into (N, wordvec_dim, W) for conv layer
        x = x.transpose(1, 2)
        x = self.c1(x)
        x = F.relu(x)
        x = self.c2(x)
        x = F.relu(x)
        x = self.c3(x)
        x = F.relu(x)
        x = self.c4(x)
        x = F.relu(x)
        y = x.mean(2)
        x = self.c5(x)
        x = F.relu(x)

        if h:
            return x.unsqueeze(2), y
        return x.unsqueeze(2)


class DavenetImage(nn.Module):
    def __init__(self, embedding_dim):
        super(DavenetImage, self).__init__()

        num_channels = 512

        self.image_model = models.vgg16(pretrained=False)
        self.image_model = self.image_model.features  # remove classifier
        self.image_model = nn.Sequential(*list(self.image_model.children())[:-1])  # remove final maxpool
        # output here given a (batchsize, 3, 224, 224) input would be
        # (batchsize, 256, 13, 13) for alexnet
        # (batchsize, 512, 14, 14) for vgg
        # add projection convolution here to step up to embedding dimension
        last_layer_index = len(list(self.image_model.children()))
        self.image_model.add_module(str(last_layer_index),
                                    nn.Conv2d(num_channels, embedding_dim, kernel_size=(3, 3), stride=(1, 1),
                                              padding=(1, 1)))
        self.activation = nn.ReLU()

    def forward(self, x):
        x = self.image_model(x)
        x = self.activation(x)
        return x


class DavenetAudio(nn.Module):
    def __init__(self, embedding_dim):
        super(DavenetAudio, self).__init__()

        self.audio_model = nn.Sequential(
            nn.BatchNorm2d(1),
            nn.Conv2d(1, 128, kernel_size=(40, 1), stride=(1, 1), padding=(0, 0)),
            nn.ReLU(inplace=True),
            nn.Conv2d(128, 256, kernel_size=(1, 11), stride=(1, 1), padding=(0, 5)),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=(1, 3), stride=(1, 2), padding=(0, 1)),
            nn.Conv2d(256, 512, kernel_size=(1, 17), stride=(1, 1), padding=(0, 8)),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=(1, 3), stride=(1, 2), padding=(0, 1)),
            nn.Conv2d(512, 512, kernel_size=(1, 17), stride=(1, 1), padding=(0, 8)),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=(1, 3), stride=(1, 2), padding=(0, 1)),
            nn.Conv2d(512, embedding_dim, kernel_size=(1, 17), stride=(1, 1), padding=(0, 8)),
            nn.ReLU(inplace=True),
        )

        self.output_pooler = nn.Sequential(nn.AdaptiveAvgPool2d((1, 1)))
        self.pool_output = False

    def forward(self, x):
        x = self.audio_model(x)
        if self.pool_output:
            x = self.output_pooler(x)
        return x


class DavenetAudioLarge(nn.Module):
    def __init__(self, embedding_dim):
        super(DavenetAudioLarge, self).__init__()

        self.audio_model = nn.Sequential(
            nn.BatchNorm2d(1),
            nn.Conv2d(1, 128, kernel_size=(40, 1), stride=(1, 1), padding=(0, 0)),
            nn.ReLU(inplace=True),
            nn.Conv2d(128, 256, kernel_size=(1, 11), stride=(1, 1), padding=(0, 5)),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=(1, 3), stride=(1, 2), padding=(0, 1)),
            nn.Conv2d(256, 512, kernel_size=(1, 17), stride=(1, 1), padding=(0, 8)),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=(1, 3), stride=(1, 2), padding=(0, 1)),
            nn.Conv2d(512, 512, kernel_size=(1, 17), stride=(1, 1), padding=(0, 8)),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=(1, 3), stride=(1, 2), padding=(0, 1)),
            nn.Conv2d(512, 512, kernel_size=(1, 17), stride=(1, 1), padding=(0, 8)),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=(1, 3), stride=(1, 2), padding=(0, 1)),
            nn.Conv2d(512, 512, kernel_size=(1, 17), stride=(1, 1), padding=(0, 8)),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=(1, 3), stride=(1, 2), padding=(0, 1)),
            nn.Conv2d(512, 512, kernel_size=(1, 17), stride=(1, 1), padding=(0, 8)),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=(1, 3), stride=(1, 2), padding=(0, 1)),
            nn.Conv2d(512, embedding_dim, kernel_size=(1, 17), stride=(1, 1), padding=(0, 8)),
            nn.ReLU(inplace=True),
        )

        self.output_pooler = nn.Sequential(nn.AdaptiveAvgPool2d((1, 1)))
        self.pool_output = False

    def forward(self, x):
        x = self.audio_model(x)
        if self.pool_output:
            x = self.output_pooler(x)
        return x


# -------------------------------------- GENERAL MODEL ------------------------------------- #


class Davenet(nn.Module):
    def __init__(self, args):
        super(Davenet, self).__init__()

        # Parameters
        embedding_dim = args.embedding_dim

        self.model_image = DavenetImage(embedding_dim)
        if args.audio_model == 'large':
            self.model_audio = DavenetAudioLarge(embedding_dim)
        elif args.audio_model == 'small':
            self.model_audio = DavenetAudio(embedding_dim)
        else:
            raise Exception(f'The audio model {args.audio_model} is not an option')

    def forward(self, image_input, audio_input, negatives):
        if audio_input is not None:
            audio_output = self.model_audio(audio_input)
        else:
            audio_output = None

        if image_input is not None:
            image_output = self.model_image(image_input)
        else:
            image_output = None

        negatives_output = [self.model_image(neg) for neg in negatives]

        return image_output, audio_output, negatives_output
