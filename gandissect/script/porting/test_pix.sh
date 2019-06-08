#!/bin/bash

set -e

# Start from parent directory of script
cd "$(dirname "${BASH_SOURCE[0]}")/../.."


LAYER=layer4
tail -n+2 script/porting/target_labels.csv | \
while IFS=, read SCENE LABEL
do

# SCENE=churchoutdoor
# LABEL=door
echo "testing $LABEL from scene $SCENE at layer $LAYER (iou)"
python -m netdissect.evalablate \
      --outdir dissect/${SCENE} \
      --classes $LABEL \
      --metric iou \
      --layer layer4 \
      --size 200

echo "testing $LABEL from scene $SCENE at layer $LAYER (ace)"
python -m netdissect.evalablate \
      --outdir dissect/${SCENE} \
      --classes $LABEL \
      --metric ace \
      --layer layer4 \
      --size 200
done

