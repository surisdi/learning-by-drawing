#!/bin/bash

set -e

# Start from parent directory of script
cd "$(dirname "${BASH_SOURCE[0]}")/../.."

for SCENE in \
    clevr
do

echo "Doing ${SCENE}"

PTHFILE="models/clevr/generator-005.pth"
SEGARGS="segvocab='clevrseg3',segdiv='quad'"
python -m netdissect --gan \
 --model  "netdissect.proggan.from_pth_file('${PTHFILE}')" \
 --segmenter "netdissect.segmenter.SemanticSegmenter(${SEGARGS})" \
 --outdir dissect/${SCENE} \
 --layer layer1 layer2 layer3 layer4 layer5 layer6 \
         layer7 layer8 layer9 layer10 layer11 layer12 \
 --size 1000

done
