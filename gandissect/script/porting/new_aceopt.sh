# tail -n+2 target_labels.csv | \
# while IFS=, read SCENE LABEL
# do
SCENE=churchoutdoor
LABEL=door
LAYER=layer4
    echo "erasing $LABEL from scene $SCENE at layer $LAYER"
    python -m netdissect.aceoptimize \
      --model "proggan.from_pth_file('models/lsun_models/${SCENE}_lsun.pth')" \
      --outdir "dissect/arxiv/newace/${SCENE}" \
      --classname $LABEL \
      --layer "${LAYER}" \
      --initfrom "dissect/ganunified/${SCENE}"
# done
#      --no-cache \
