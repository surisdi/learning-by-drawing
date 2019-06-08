#!/usr/bin/env bash

DATA_FOLDER="./data"  # Has to be an existing directory
mkdir ${DATA_FOLDER}/audio_clevrgan_natural
mkdir ${DATA_FOLDER}/audio_clevrgan_natural/audio
mkdir ${DATA_FOLDER}/audio_clevrgan_synth
mkdir ${DATA_FOLDER}/audio_clevrgan_synth/audio

Splits="train val test"
Datasets="natural synth"

echo "Downloading name list txts"
for split in ${Splits}; do
    for dataset in ${Datasets}; do
        wget -O ${DATA_FOLDER}/audio_clevrgan_${dataset}/name_list_${split}.txt \
            http://wednesday.csail.mit.edu/gaze/ganclevr/data/list_${dataset}_${split}.txt
    done
done

echo "Downloading audios"
for dataset in ${Datasets}; do
    wget --progress=bar -O ${DATA_FOLDER}/audio_clevrgan_${dataset}/audio.tar.gz \
        http://wednesday.csail.mit.edu/gaze/ganclevr/data/audio_${dataset}.tar.gz
    tar xvzf ${DATA_FOLDER}/audio_clevrgan_${dataset}/audio.tar.gz -C ${DATA_FOLDER}/audio_clevrgan_${dataset}/audio \
        --strip-components=1
    rm ${DATA_FOLDER}/audio_clevrgan_${dataset}/audio.tar.gz
done
