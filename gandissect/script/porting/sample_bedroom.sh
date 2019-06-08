#!/usr/bin/env bash

# Start from parent directory of script
cd "$(dirname "${BASH_SOURCE[0]}")/../.."

SCENE=bedroom
DIR=dissect/imagesample

for SIZE in 100 1000
do

echo "Doing ${SCENE} (${SIZE})"
python -m netdissect.tool.makesample \
  --model "netdissect.proggan.from_pth_file('models/lsun_models/${SCENE}_lsun.pth')" \
  --outdir ${DIR}/${SCENE}/size_${SIZE} \
  --size ${SIZE}

done
