SCENE=conferenceroom

python -m netdissect.ablate \
      --segmenter "netdissect.upgandissect.GanImageSegmenter(segsizes=[160,288])" \
      --model "proggan.from_pth_file('models/lsun_models/${SCENE}_lsun.pth')" \
      --outdir dissect/ganunified/${SCENE} \
      --netname "ProgGAN-${SCENE}" \
      --metric "opt" \
      --classes curtain chair person table window \
      --startcount 20 \
      --unitcount 20 \
      --layer layer4 \
      --size 1000
