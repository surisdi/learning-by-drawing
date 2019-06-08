netdissect
==========

[Network Dissection](http://netdissect.csail.mit.edu/) is a way
to inspect the internal representations of a deep convolutional
neural network to understand how internal units align with
human-interpretable concepts.

This new version is able to analyze both classification networks
and generative networks (such as GANs).  It depends on python 3
and pytorch 4.1.

## Setup

To install everything needed from this repo, have `conda` available,
and run:

```
script/setup_env.sh      # Create a conda environment with dependencies
script/download_data.sh  # Download support data and demo GANs
source activate netd     # Enter the conda environment
pip install -v -e .      # Link the local netdissect package into the env
```

Details.  The code depends on python 3, pytorch 4.1, and several other
packages.  For conda users, `script/environment.yml` provides the details
of the dependencies.  For pip users, `setup.py` lists everything needed.

Data.  The `download_data.sh` script downloads the segmentation dataset
used to dissect classifiers, the segmentation network used to dissect GANs,
and several example GAN models to dissect.  The downloads will go into
the directories `dataset/` and `models/`.  If you do not wish to download
the example networks, `python -m netdissect --download` will download
just the data and models needed for netdissect itself.


## Dissecting a GAN

GAN example: to dissect three layers of the LSUN living room progressive
GAN trained by Karras:

```
python -m netdissect \
   --gan \
   --model "netdissect.proggan.from_pth_file('models/karras/livingroom_lsun.pth')" \
   --outdir "dissect/livingroom" \
   --layer layer1 layer4 layer7 \
   --size 1000
```

The result is a static HTML page at `dissect/livingroom/dissect.html`, and
a JSON file of metrics at `dissect/livingroom/dissect.json`.

You can test your own model: the `--model` argument is a fully-qualified
python function or constructor for loading the GAN to test.  The
`--layer` names are fully-qualified (`state_dict`-style) names for layers.

By default a scene-based segmentation is used but a different segmenter class
can be substituted by supplying an alternate class constructor to
`--segmenter`.  See `netdissect/segmenter.py` for the sgementer base class.

## Running a GAN editing server

Once a GAN is dissected, you can run a webserver that provides an API
that generates images with (optional) interventions.

```
python -m netdissect.server --address 0.0.0.0
```

An editing UI is served at `http://localhost:5001/`.

Other URLs:
  * `http://localhost:5001/api/ui` is the OpenAPI/swagger UI for directly
    testing GAN interventions.
  * `http://localhost:5001/data/livingroom/dissect.html` static net
    dissection reports.
  * `http://localhost:5001/data/livingroom/edit.html` a dissection-based
    interface for testing interventions.

## Dissecting a Classifier

Classifier example: to dissect three layers of the pretrained alexnet
in torchvision:

```
python -m netdissect \
   --model "torchvision.models.alexnet(pretrained=True)" \
   --layers features.6:conv3 features.8:conv4 features.10:conv5 \
   --imgsize 227 \
   --outdir dissect/alexnet-imagenet
```

No special webserver for a classifier.

## Command Line Details

Documentation for the netdissect command-line utility.

```
usage: python -m netdissect [-h] [--model MODEL] [--pthfile PTHFILE]
                            [--outdir OUTDIR] [--layers LAYERS [LAYERS ...]]
                            [--segments SEGMENTS] [--segmenter SEGMENTER]
                            [--download] [--imgsize IMGSIZE]
                            [--netname NETNAME] [--meta META [META ...]]
                            [--examples EXAMPLES] [--size SIZE]
                            [--batch_size BATCH_SIZE]
                            [--num_workers NUM_WORKERS]
                            [--quantile_threshold {[0-1],iqr}] [--no-labels]
                            [--maxiou] [--covariance] [--no-images]
                            [--no-report] [--no-cuda] [--gen] [--gan]
                            [--perturbation PERTURBATION] [--add_scale_offset]
                            [--quiet]
```

optional arguments:

```
  -h, --help            show this help message and exit
  --model MODEL         constructor for the model to test
  --pthfile PTHFILE     filename of .pth file for the model
  --outdir OUTDIR       directory for dissection output
  --layers LAYERS [LAYERS ...]
                        space-separated list of layer names to dissect, in the
                        form layername[:reportedname]
  --segments SEGMENTS   directory containing segmentation dataset
  --segmenter SEGMENTER
                        constructor for asegmenter class
  --download            downloads Broden dataset if needed
  --imgsize IMGSIZE     input image size to use
  --netname NETNAME     name for network in generated reports
  --meta META [META ...]
                        json files of metadata to add to report
  --examples EXAMPLES   number of image examples per unit
  --size SIZE           dataset subset size to use
  --batch_size BATCH_SIZE
                        batch size for forward pass
  --num_workers NUM_WORKERS
                        number of DataLoader workers
  --quantile_threshold {[0-1],iqr}
                        quantile to use for masks
  --no-labels           disables labeling of units
  --maxiou              enables maxiou calculation
  --covariance          enables covariance calculation
  --no-images           disables generation of unit images
  --no-report           disables generation report summary
  --no-cuda             disables CUDA usage
  --gen                 test a generator model (e.g., a GAN)
  --gan                 synonym for --gen
  --perturbation PERTURBATION
                        filename of perturbation attack to apply
  --add_scale_offset    offsets masks according to stride and padding
  --quiet               silences console output
```

## API, for classifiers

It can be used from code as a function, as follows:

1. Load up the convolutional model you wish to dissect, and call
   `retain_layers(model, [layernames,..])` to instrument the model.
2. Load the segmentation dataset using the BrodenDataset class;
   use the `transform_image` argument to normalize images to be
   suitable for the model, and the `size` argument to truncate the dataset.
3. Choose a directory in which to write the output, and call
   `dissect(outdir, model, dataset)`.

A quick approximate dissection can be done by reducing the `size`
of the `BrodenDataset`.  Generating example images can be time-consuming
and the number of images can be set via `examples_per_unit`.

Example:

```
    from netdissect import retain_layers, dissect
    from netdissect import BrodenDataset

    model = load_my_model()
    model.eval()
    model.cuda()
    retain_layers(model, ['conv1', 'conv2', 'conv3', 'conv4', 'conv5'])
    bds = BrodenDataset('dataset/broden1_227',
            transform_image=transforms.Compose([
                transforms.ToTensor(),
                transforms.Normalize(IMAGE_MEAN, IMAGE_STDEV)]),
            size=10000)
    dissect('result/dissect', model, bds,
            batch_size=100,
            examples_per_unit=10)
```

The Broden dataset is oriented towards semantic objects, parts,
material, colors, etc that are found in natural scene photographs.
If you want to analyze your model with a different semantic segmentation,
you can substitute a different segmentation dataset and supply a `segrunner`
argument that describes how to get segmentations and RGB images
from the dataset.  See `ClassifierSegRunner` for the details.

## API, for generators

Similarly:

1. Load up the generator model wish to dissect, and call
   `retain_layers(model, [layernames,..])` to instrument the model.
2. Create a dataset of z input samples for testing.  If your model
   uses a uniform normal distribution, z_dataset_for_model will make one.
3. Choose a directory in which to write the output, and call
   `dissect(outdir, model, dataset, segrunner=GeneratorSegRunner())`.

The time for the dissection is proportional to the number of samples
in the dataset.

```
    from netdissect import retain_layers, dissect
    from netdissect import z_dataset_for_model, GeneratorSegRunner

    model = load_my_model()
    model.eval()
    model.cuda()
    retain_layers(model, ['layer3', 'layer4', 'layer5'])
    zds = z_dataset_for_model(size, model)
    dissect('result/gandissect', model, zds,
            segrunner=GeneratorSegRunner(),
            batch_size=100,
            examples_per_unit=10)
```

The `GeneratorSegRunner` defaults to a running a semantic segmentation network
oriented towards semantic objects, parts, and materials found in natural
scene.  To use a different semantic segmentation, you can supply a
custom `Segmenter` subclass to the constructor of `GeneratorSegRunner`.

