#!/usr/bin/env bash
# Another way to download the dataset.
# In this version we only download the necessary models for the "learning words by drawing images" code

set -e

# Start from parent directory of script
cd "$(dirname "${BASH_SOURCE[0]}")/.."


# Download segmodel
if [ ! -f dataset/segmodel/upp-resnet50-upernet/decoder_epoch_40.pth ]
then

echo "Downloading segmentation model"
mkdir -p dataset/segmodel/upp-resnet50-upernet
pushd dataset/segmodel/upp-resnet50-upernet
for F in \
    labels.json \
    encoder_epoch_40.pth \
    decoder_epoch_40.pth
do
wget --progress=bar \
 http://netdissect.csail.mit.edu/data/segmodel/upp-resnet50-upernet/${F} \
 -O ${F}
done
popd

fi
