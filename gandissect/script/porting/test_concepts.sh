SCENE=churchoutdoor

python -m netdissect.ablate \
      --segmenter "netdissect.upgandissect.GanImageSegmenter(segsizes=[256], segdiv='quad')" \
      --model "proggan.from_pth_file('models/lsun_models/${SCENE}_lsun.pth')" \
      --outdir dissect/ganunified/${SCENE} \
      --netname "ProgGAN-${SCENE}" \
      --classes door tree person \
      --metric $1 \
      --layer layer4 \
      --size 200
