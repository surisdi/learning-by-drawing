for SCENE in \
    diningroom \
    churchoutdoor \
    bedroom \
    kitchen \
    livingroom \
    restaurant
do
python -m netdissect.ablate \
      --segmenter "netdissect.upgandissect.GanImageSegmenter(segsizes=[160,288])" \
      --model "proggan.from_pth_file('models/lsun_models/${SCENE}_lsun.pth')" \
      --outdir dissect/ganunified/${SCENE} \
      --netname "ProgGAN-${SCENE}" \
      --metric "opt" \
      --classes window \
      --startcount 20 \
      --unitcount 20 \
      --layer layer4 \
      --size 1000
done

for SCENE in \
    bedroom \
    kitchen \
    livingroom \
    restaurant
do
python -m netdissect.ablate \
      --segmenter "netdissect.upgandissect.GanImageSegmenter(segsizes=[160,288])" \
      --model "proggan.from_pth_file('models/lsun_models/${SCENE}_lsun.pth')" \
      --outdir dissect/ganunified/${SCENE} \
      --netname "ProgGAN-${SCENE}" \
      --metric "opt" \
      --classes person chair table \
      --startcount 20 \
      --unitcount 20 \
      --layer layer4 \
      --size 1000
done

SCENE=churchoutdoor
python -m netdissect.ablate \
      --segmenter "netdissect.upgandissect.GanImageSegmenter(segsizes=[160,288])" \
      --model "proggan.from_pth_file('models/lsun_models/${SCENE}_lsun.pth')" \
      --outdir dissect/ganunified/${SCENE} \
      --netname "ProgGAN-${SCENE}" \
      --metric "opt" \
      --classes person tree door grass \
      --startcount 20 \
      --unitcount 20 \
      --layer layer4 \
      --size 1000
