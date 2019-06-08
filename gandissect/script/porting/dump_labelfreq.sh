for SCENE in \
    churchoutdoor \
    conferenceroom \
    bedroom \
    kitchen \
    livingroom \
    restaurant
do
    echo "Doing ${SCENE}"
    python -m netdissect.dump_labelfreq \
      --gan "netdissect.upgandissect.GanImageSegmenter(segsizes=[160,288], segdiv='quad')" \
      --outdir dissect/ganunified/${SCENE}
done
