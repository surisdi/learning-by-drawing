#!/bin/bash

set -e

# Start from parent directory of script
cd "$(dirname "${BASH_SOURCE[0]}")/../.."

LAYER=layer4

SCENE=churchoutdoor
LABEL=door
    echo "erasing $LABEL from scene $SCENE at layer $LAYER"
    python -m netdissect.aceoptimize \
        --outdir dissect/${SCENE} \
        --classname ${LABEL} \
        --layer "${LAYER}"
