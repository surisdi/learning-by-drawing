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

echo "testing $LABEL from scene $SCENE at layer $LAYER (iou)"
python -m netdissect.evalablate \
      --outdir dissect/${SCENE} \
      --classes $LABEL \
      --metric iou \
      --layer ${LAYER} \
      --size 200

echo "testing $LABEL from scene $SCENE at layer $LAYER (ace)"
python -m netdissect.evalablate \
      --outdir dissect/${SCENE} \
      --classes $LABEL \
      --metric ace \
      --layer ${LAYER} \
      --size 200
done

done
