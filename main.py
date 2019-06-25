import argparse
import os
import random
import socket
from datetime import datetime

import numpy as np
import torch.utils.data
import torchvision.transforms as transforms
from tensorboardX import SummaryWriter

import active_learning
import dataset
import experiments
import utils
from trainer import Trainer


def get_args():
    # ------------------------------- GENERAL CONFIGURATION ----------------------------- #
    parser = argparse.ArgumentParser()

    # Define task
    parser.add_argument('-e', '--evaluate', action='store_true', help='evaluate model on val set')
    parser.add_argument('--experiment', default=False, type=bool, help='run experiment')
    parser.add_argument('--experiment_name', default='test', type=str,
                        choices=['recall', 'videos', 'recall_selected', 'test_synthetic'],
                        help='name of the experiment to run')

    # Main parameters
    parser.add_argument('--model', default='Davenet', type=str, choices=['Davenet'])
    parser.add_argument('--name_dataset', default='audio_clevrgan_natural', type=str,
                        choices=['audio_clevrgan_natural', 'audio_clevrgan_synth'])
    parser.add_argument('--margin', default=1.0, type=float, help='margin hyperparameter to use')
    parser.add_argument('--embedding_dim', default=512, type=int, help='feature dimension')
    parser.add_argument('--loss_type', default='regular', type=str,
                        choices=['regular', 'negatives_edited', 'negatives_hard', 'negatives_both'], help='loss')
    parser.add_argument('--audio_model', default='large', type=str, choices=['large', 'small'],
                        help='audio model version')
    parser.add_argument('--clustering', default=False, type=bool, help='train with clustering. If False and the loss '
                                                                       'has edited negatives, these are random')

    # Optimization
    parser.add_argument('--epochs', default=150, type=int, help='number of total epochs to run')
    parser.add_argument('-b', '--batch_size', default=32, type=int, help='mini-batch size (default: 32)')
    parser.add_argument('--lr', '--learning_rate', default=0.001, type=float, help='initial learning rate')
    parser.add_argument('--lrdecay', default=30, type=int, help='divide the learning rate by 10 every lr_decay epochs')
    parser.add_argument('--momentum', default=0.9, type=float, help='momentum')
    parser.add_argument('--weight_decay', '--wd', default=5e-7, type=float, help='weight decay (default: 1e-4)')

    # Checkpoints and files
    parser.add_argument('--expdir', default='./results/checkpoints/', type=str,
                        help='write checkpoints to this directory')
    parser.add_argument('--seed', default='', type=str, help='path to seed checkpoint (default: none)')
    parser.add_argument('-s', '--submodels_load', default=[], nargs='+',
                        help='Only if seed is not none. If [], load all model')  # e.g. 'model_image','model_audio'
    parser.add_argument('--name_checkpoint', default='', type=str, help='name for the checkpoint')
    parser.add_argument('--resume', default=False, type=bool, help='resume from checkpoint')
    parser.add_argument('--path_model_gan', type=str, default='./downloaded_files/',
                        help='path to directory of gan checkpoint. If file does not exist, it will be downloaded')
    parser.add_argument('--path_model_segmenter', type=str, default='./downloaded_files/',
                        help='path to directory of segmenter checkpoint. If file does not exist, it will be downloaded')
    parser.add_argument('--path_negatives_test', default='./downloaded_files/', type=str,
                        help='path to the "negatives.pth" file where hard semantic negatives are stored for the test')
    parser.add_argument('--path_cluster_load', default='', type=str,
                        help='path where clustering checkpoints are stored')
    # Other
    parser.add_argument('--epochs_clustering', default=15, type=int, help='cluster every "epochs_clustering" epochs')
    parser.add_argument('-j', '--workers', default=12, type=int, help='number of data loading workers (default: 12)')
    parser.add_argument('--print_freq', '-p', default=10, type=int, help='print frequency (default: 10)')
    parser.add_argument('--folder_dataset', default='./data/', type=str)
    parser.add_argument('-cpu', '--use_cpu', action='store_true')
    parser.add_argument('--layers', default=['layer4', 'layer5', 'layer6'], type=list,
                        help='list of layers to ablate, with a minimum of layer2 and maximum of layer6 (included)')
    parser.add_argument('--symfun', default='dot', type=str, choices=['dot', 'cos'], help='similarity function')
    parser.add_argument('--loading_image', default=False, type=bool,
                        help='load previously saved GAN-generated image. If False, obtain it with a GAN forward pass')
    parser.add_argument('--results', type=str, default='./results/',
                        help='path to save results , for example the clustering files or visualizations')

    # Active learning
    parser.add_argument('--active_learning', default=False, type=bool, help='use active learning data')
    parser.add_argument('--generate_active_learning', default=False, type=bool, help='generate active learning samples')
    parser.add_argument('--active_learning_name', default='', type=str,
                        help='full path to data used to get active learning samples. Its format when generated is '
                             '{args.active_learning_path}/{self.args.name_checkpoint}_{str(time.time())}')
    parser.add_argument('--active_learning_path', default='./active_learning/', type=str,
                        help='path to save active learning created samples and associated information. If used, the '
                             'path_cluster_load is not used')

    args = parser.parse_args()

    return args


def main(options=None):
    args = get_args()
    if options is not None:
        args = utils.load_options(args, options)

    seed = 1  # Do NOT modify the seed. The captions have been generated from images generated from this seed.
    torch.cuda.manual_seed_all(seed)
    torch.manual_seed(seed)
    np.random.seed(seed)
    random.seed(seed)

    # -------------------------------- INSTANTIATE MAIN ACTORS ----------------------------- #

    # --------------- Create dataset ---------------- #
    print('Creating dataset', flush=True)
    image_normalize = transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    transform = transforms.Compose([
        transforms.Resize(128),  # Smaller edge will be matched to this number
        transforms.CenterCrop((128, 128)),
        transforms.ToTensor(),
        image_normalize,
    ])

    train_dataset = dataset.ImageAudioDataset(args.folder_dataset + args.name_dataset, split='train',
                                              random_sampling=True, transform=transform,
                                              loading_image=args.loading_image)
    train_loader = torch.utils.data.DataLoader(train_dataset, batch_size=args.batch_size, shuffle=True,
                                               num_workers=args.workers, pin_memory=True,  sampler=None)

    val_dataset = dataset.ImageAudioDataset(args.folder_dataset + args.name_dataset, split='val', transform=transform,
                                            loading_image=args.loading_image)
    val_loader = torch.utils.data.DataLoader(val_dataset, batch_size=args.batch_size, shuffle=False,
                                             num_workers=args.workers, pin_memory=True)

    test_dataset = dataset.ImageAudioDataset(args.folder_dataset + args.name_dataset, split='test', transform=transform,
                                             loading_image=args.loading_image)
    test_loader = torch.utils.data.DataLoader(test_dataset, batch_size=args.batch_size, shuffle=False,
                                              num_workers=args.workers, pin_memory=True)

    # -------------- Create model --------------- #
    print('Creating model', flush=True)
    module = __import__('models')
    model_class = getattr(module, args.model)
    model = model_class(args)
    model = torch.nn.DataParallel(model).cuda()
    # Print model information
    utils.print_model_report(model)

    optimizer = torch.optim.SGD(model.parameters(), args.lr, momentum=args.momentum, weight_decay=args.weight_decay)

    # Load model
    resume_epoch = 0
    if args.seed:
        if args.seed == 'EXPDIR':
            if args.name_checkpoint == '':
                name = args.model + '_' + args.name_dataset
            else:
                name = args.name_checkpoint
            path_load = args.expdir + 'model_best_' + name + '.pth.tar'
        else:
            path_load = args.seed
        if args.resume:
            utils.load_from_checkpoint(model, path_load, submodels_load=args.submodels_load, optimizer=None)
            checkpoint = torch.load(path_load)
            resume_epoch = checkpoint['epoch']
        else:
            utils.load_from_checkpoint(model, path_load, submodels_load=args.submodels_load, optimizer=None)

    # --------------- Instantiate trainer --------------- #
    print('Instantiating trainer', flush=True)
    all_loaders = {'val': val_loader, 'train': train_loader, 'test': test_loader}
    trainer = Trainer(model, optimizer, all_loaders, args, resume_epoch=resume_epoch)

    # ------------------------- Others ----------------------- #
    current_time = datetime.now().strftime('%b%d_%H-%M-%S')
    log_dir = os.path.join(args.results, 'runs', args.name_checkpoint + '_' + current_time + '_' + socket.gethostname())
    args.writer = SummaryWriter(log_dir=log_dir)

    # ----------------------------------- TRAIN ------------------------------------------ #
    if args.experiment:
        print("Running experiment", flush=True)
        experiments.experiment(args.experiment_name, trainer)
    elif args.evaluate:
        print("Performing evaluation epoch", flush=True)
        trainer.eval()
    elif args.generate_active_learning:
        print("Generating active learning samples", flush=True)
        active_learning.generate_active_learning(trainer)
    else:
        print("Beginning training", flush=True)
        trainer.train()


if __name__ == '__main__':
    main()
