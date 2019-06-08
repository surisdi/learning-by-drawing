import argparse, json, os

parser = argparse.ArgumentParser()
parser.add_argument('--dissect')
parser.add_argument('--layer')
parser.add_argument('--ranking')
args = parser.parse_args()

with open(os.path.join(args.dissect, 'dissect.json')) as f:
    data = json.load(f)
lrec = [l for l in data['layers'] if l['layer'] == args.layer][0]
rrec = [r for r in lrec['rankings'] if r['name'] == args.ranking][0]
ordering = [(s, i) for i, s in enumerate(rrec['score'])]
ordering.sort()
for s, i in ordering:
    print('%d: %g' % (i, s))
