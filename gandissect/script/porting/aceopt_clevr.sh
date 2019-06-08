#!/bin/bash

set -e

# Start from parent directory of script
cd "$(dirname "${BASH_SOURCE[0]}")/../.."

SCENE=clevr

for LAYER in layer4 layer5 layer6
do

for LABEL in \
    sphere \
    cube \
    cylinder \
    metal \
    rubber \
    large \
    small \
    red \
    yellow \
    cyan \
    blue \
    purple \
    gray \
    brown
do

echo "erasing $LABEL from scene $SCENE at layer $LAYER"
python -m netdissect.aceoptimize \
 --model \
  "netdissect.proggan.from_pth_file('models/clevr/generator-005.pth')" \
 --segmenter \
  "netdissect.segmenter.SemanticSegmenter(segvocab='clevrseg3')" \
 --outdir dissect/${SCENE} \
 --classname $LABEL \
 --layer "${LAYER}"

done

done
