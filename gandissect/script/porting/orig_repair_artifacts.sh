#!/usr/bin/env bash

# Start from parent directory of script
cd "$(dirname "${BASH_SOURCE[0]}")/../.."

LAYER=layer4
SCENE=bedroom
DIRNAME=artifacts/orig_5pct/


# 20 manually chosen untis
MANUAL_UNITS="457 231 63 147 112 438 304 306 271 293 511 435 333 289 163 25 23 30 9 151"
# 20 Worst FID on 5% sample
FID_UNITS="231 112 457 151 63 511 9 230 224 43 195 350 342 288 56 147 438 123 381 267"
# 31 units in common.
MERGED_UNITS="457 231 63 147 112 438 304 306 271 293 511 435 333 289 163 25 23 30 9 151 230 224 43 195 350 342 288 56 123 381 267"


# 10% samples
# FID_UNITS="112 457 231 151 224 342 63 350 9 511 230 43 195 410 381 288 56 267 438 320"
# MERGED_UNITS="320 195 457 9 267 333 271 147 342 23 151 25 410 30 350 224 289 288 163 293 230 231 43 112 304 306 435 381 438 56 63 511"

for SIZE in 100 1000 10000
do

echo "Doing ${SCENE} (${SIZE})"
python -m netdissect.tool.makesample \
  --model "netdissect.proggan.from_pth_file('models/lsun_models/${SCENE}_lsun.pth')" \
  --outdir dissect/imagesample/${DIRNAME}/size_${SIZE}/unfixed/${SCENE} \
  --layer ${LAYER} \
  --size ${SIZE} \
  --maximize_units ${MANUAL_UNITS}

python -m netdissect.tool.makesample \
  --model "netdissect.proggan.from_pth_file('models/lsun_models/${SCENE}_lsun.pth')" \
  --outdir dissect/imagesample/${DIRNAME}/size_${SIZE}/fixed_both/${SCENE} \
  --layer ${LAYER} \
  --size ${SIZE} \
  --maximize_units ${MANUAL_UNITS} \
  --ablate_units ${MERGED_UNITS}

python -m netdissect.tool.makesample \
  --model "netdissect.proggan.from_pth_file('models/lsun_models/${SCENE}_lsun.pth')" \
  --outdir dissect/imagesample/${DIRNAME}/size_${SIZE}/fixed_manual/${SCENE} \
  --layer ${LAYER} \
  --size ${SIZE} \
  --maximize_units ${MANUAL_UNITS} \
  --ablate_units ${MANUAL_UNITS}

python -m netdissect.tool.makesample \
  --model "netdissect.proggan.from_pth_file('models/lsun_models/${SCENE}_lsun.pth')" \
  --outdir dissect/imagesample/${DIRNAME}/size_${SIZE}/fixed_fid/${SCENE} \
  --layer ${LAYER} \
  --size ${SIZE} \
  --maximize_units ${MANUAL_UNITS} \
  --ablate_units ${FID_UNITS}

done
