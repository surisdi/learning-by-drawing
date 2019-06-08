for SCENE in \
    livingroom
do
    echo "Doing ${SCENE}"
    python -m netdissect --gan \
      --model "proggan.from_pth_file('models/lsun_models/${SCENE}_lsun.pth')" \
      --outdir dissect/gan/${SCENE} \
      --layer layer7 \
      --no-images \
      --ablation \
      --size 2000
done
