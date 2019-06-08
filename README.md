# Learning Words by Drawing Images

This is the official PyTorch implementation of the paper 
[Learning Words by Drawing Images](http://openaccess.thecvf.com/content_CVPR_2019/html/Suris_Learning_Words_by_Drawing_Images_CVPR_2019_paper.html) by: 


| ![Dídac Surís][suris-photo] | ![Adrià Recasens][recasens-photo]  | ![David Bau][bau-photo]  | ![David Harwath][harwath-photo]  | ![James Glass][glass-photo]  |![Antonio Torralba][torralba-photo]  |
|:------:|:------:|:------:|:-------:|:------:|:----:|
| [Dídac Surís(*)][suris-web]  | [Adrià Recasens(*)][recasens-web]  | [David Bau][bau-web]  | [David Harwath][harwath-web]  | [James Glass][glass-web]  | [Antonio Torralba][torralba-web]  |

(*) Equal contribution

[suris-web]: http://www.didacsuris.com/
[recasens-web]: http://people.csail.mit.edu/recasens/
[bau-web]: https://people.csail.mit.edu/davidbau/home/
[harwath-web]: https://people.csail.mit.edu/dharwath/
[glass-web]: https://people.csail.mit.edu/jrg/
[torralba-web]: http://web.mit.edu/torralba/www/

[suris-photo]:  images/dsuris.jpg?raw=true "Dídac Surís"
[recasens-photo]: images/arecasens.jpg?raw=true "Adrià Recasens"
[bau-photo]: images/dbau.jpg?raw=true "David Bau"
[harwath-photo]:  images/dharwath.jpg?raw=true "David Harwath"
[glass-photo]:  images/jglass.jpg?raw=true "James Glass"
[torralba-photo]:  images/atorralba.jpg?raw=true "Antonio Torralba"

In this paper, we propose a framework for learning through drawing. Our goal is to learn the correspondence between 
spoken words and abstract visual attributes, from a dataset of spoken descriptions of images. We use the learned 
representations of GANs and manipulate them to edit semantic concepts in the generated outputs, and use such 
GAN-generated images to train a model using a triplet loss. 

## Installation and setup

### Code and dependencies
The current code is programmed with Python 3.6. We do not guarantee it will work with other versions of Python.
We use the PyTorch framework, version 0.4. It should also work for PyTorch 1.0, but it was not tested.

To install everything needed, have [_conda_](https://docs.anaconda.com/anaconda/install/) available, and create a new
virtual environment:

```
conda create -n env_drawing python=3.6
conda activate env_drawing
```

Then install the libraries listed in `requirements.txt`.

After that, we still need to install the `netdissect` module, which is provided as part of the code. To do so, go to the
root folder of the project, and use the following instructions:

```
gandissect/script/download_data_drawing.sh  # Download support models
pip install -v -e ./gandissect/             # Link the local netdissect package into the env
```

### Data and pretrained models

The data can be obtained downloading the files in [this link](http://wednesday.csail.mit.edu/gaze/ganclevr/data/)

The default folder structure is:


- `/path/to/project/`
    - `data/`
        - `audio_clevrgan_natural/`
            - `name_list_{train, val, test}.txt`  <-- Download from 
            [here](http://wednesday.csail.mit.edu/gaze/ganclevr/data/list_natural_train.txt) (train), 
            [here](http://wednesday.csail.mit.edu/gaze/ganclevr/data/list_natural_val.txt) (val), 
            [here](http://wednesday.csail.mit.edu/gaze/ganclevr/data/list_natural_test.txt) (test), 
            - `audio/`  <-- Extract here the files in 
            [this file](http://wednesday.csail.mit.edu/gaze/ganclevr/data/audio_natural.tar.gz)
            - `images/` <-- Extract here the files in 
            [this file](http://wednesday.csail.mit.edu/gaze/ganclevr/data/images.tar.gz)
            - `text/`   <-- Extract here the files in 
            [this file](http://wednesday.csail.mit.edu/gaze/ganclevr/data/text_natural.tar.gz)
        - `audio_clevrgan_synth/`
            - `name_list_{train, val, test}.txt`  <-- Download from 
            [here](http://wednesday.csail.mit.edu/gaze/ganclevr/data/list_synth_train.txt) (train), 
            [here](http://wednesday.csail.mit.edu/gaze/ganclevr/data/list_synth_val.txt) (val), 
            [here](http://wednesday.csail.mit.edu/gaze/ganclevr/data/list_synth_test.txt) (test), 
            - `audio/`  <-- Extract here the files in 
            [this file](http://wednesday.csail.mit.edu/gaze/ganclevr/data/audio_synth.tar.gz)
            - `images/` <-- Extract here the files in 
            [this file](http://wednesday.csail.mit.edu/gaze/ganclevr/data/images.tar.gz)
                        or (if audio_clevrgan_natural is alredy downloaded) create a symlink to
            [this file](http://wednesday.csail.mit.edu/gaze/ganclevr/data/text_synth.tar.gz)


Please note that there is NO NEED to download the images, as the default training setting generates them with the GAN. 
They are only needed if the GAN generation is not desired (the flag loading_image has to be activated) or for evaluation
purposes.
The text transcription of the audios is also NOT used, but we make it available in case it is useful.

In order to download the basic data (audio and name_list files) and prepare it with the correct folder structure, 
execute:

```
./download_data.sh
```

Modify the `DATA_FOLDER` in `download_data.sh` to choose your preferred data folder. Change the flag "folder_dataset" 
accordingly when running the code.

The name (ID) of the files corresponds to the ID of the noise vector used to generate the image of the image/caption 
pair. Do NOT modify the seed of the random noise generation.

Pretrained models are downloaded during the execution of the scripts, if they are not found. No manual action is 
required. In case there is any problem, they can be found [here](http://wednesday.csail.mit.edu/gaze/ganclevr/files/). 
Please take a look at the default folder where these models are stored, which is `./downloaded_files`. In order to 
change it, set the flags `path_negatives_test`, `path_model_gan` and `path_model_segmenter` accordingly. 

## Code structure and running
The code is structured as follows
- `run.py`: script we have to execute. From a configuration file (in the `\config_files` folder), it calls the script in
the `file` attribute of the configuration file, with all the parameters in the configuration file. Example of execution:
```
CUDA_VISIBLE_DEVICES=0 python run.py -f train_example.yaml
```
- `main.py`: main script called from run.py. It creates all the actors (trainer, optimizer, dataset) and calls their 
methods in order to train, evaluate or test the system.
- `trainer.py`: contains the main training class (Trainer), including the training loop.
- `dataset.py`: implements a Dataset class inheriting from _torch.utils.data.Dataset_, which loads images, audios and 
text.
- `models.py`: networks used for this project. Classes inheriting from _torch.nn.Module_.
- `clusterer.py`: class that performs the clustering of features, as well as some auxiliary methods.
- `segmenter.py`: class that performs segmentations, both using ground truth labels, and using the cluster classes.
- `losses.py`: methods used to compute the loss. Loss definitions.
- `experiments.py`: methods implementing experiments for testing. See the example in `config_files/`. 
- `utils.py`: general useful methods.
- `active_learning.py`: methods to generate and use active learning samples.
- `README.md`: this file.
- `requirements.txt`: list of python libraries required.
- `download_data.sh`: script used to download data. See instructions above.
- `config_files`: folder with _.yaml_ configuration files. Take a look at the examples to understand the format. All 
the checkpoints and results contain the checkpoint name in the _.yaml_ file so that it is easy to follow what parameters
were used.
- `ablate/`: contains auxiliary scripts to help ablate units of the GAN.
- `gandissect/`: folder containing the `netdissect` module.

The training can be visualized in a web browser (localhost), using tensorboard with the following command (from the 
project root folder):

```
tensorboard --logidir=./results/runs/ --port=6006
```

## Citation

If you want to cite our research, please use:

```
@InProceedings{Suris_2019_CVPR,
    author = {Suris, Didac and Recasens, Adria and Bau, David and Harwath, David and Glass, James and Torralba, Antonio},
    title = {Learning Words by Drawing Images},
    booktitle = {The IEEE Conference on Computer Vision and Pattern Recognition (CVPR)},
    month = {June},
    year = {2019}
}
```