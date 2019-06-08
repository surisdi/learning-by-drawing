#!/bin/bash

set -e

# Start from parent directory of script
cd "$(dirname "${BASH_SOURCE[0]}")/../.."

LAYER=layer4

tail -n+2 script/porting/target_labels.csv | \
while IFS=, read SCENE LABEL
do
    echo "erasing $LABEL from scene $SCENE at layer $LAYER"
    python -m netdissect.aceoptimize \
        --outdir dissect/${SCENE} \
        --classname ${LABEL} \
        --layer "${LAYER}"
done
