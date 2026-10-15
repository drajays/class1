#!/usr/bin/env python3
"""Build Class-1 EVS book → docs/pdf/evs/*.pdf + book/evs/manifest.json"""
import os, sys, re, json, shutil, subprocess
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from evs_core import *
from evs_more import *
OUT = os.path.join(HERE, '..', 'pdf', 'evs'); os.makedirs(OUT, exist_ok=True)
DST = os.path.join(HERE, '..', '..', 'docs', 'pdf', 'evs'); os.makedirs(DST, exist_ok=True)
EDGE = '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'
chs = [ch1(), ch2(), ch3(), ch4(), ch5(), ch6(), ch7(), ch8(), ch9(), ch10(), ch11(), ch12(), ch13(), ch14(), ch15(), revision()]
import evs_extra; evs_extra.add(chs)
page = lambda body, t: f'<!doctype html><html><head><meta charset="utf-8"><title>{t}</title><style>{CSS}table.t{{break-inside:auto}}tr{{break-inside:avoid}}</style></head><body>{body}</body></html>'
cover = lambda sub: (f'<div class="cover" style="background:linear-gradient(160deg,#d3f9d8,#d0ebff 55%,#fff3bf)"><div class="big">🌿🦋🌍</div>'
                     f'<h1>EVS</h1><h2>Environmental Studies · Class 1</h2><p>{sub}</p>'
                     '<p class="sm">Simple stories · pictures in words · activities · answer keys</p></div>')
def toc():
    rows = ''.join(f'<tr><td>{c.emoji}</td><td>Chapter {c.no}</td><td><b>{c.title}</b></td></tr>' for c in chs)
    return (f'<div class="chapter" style="--c:#2b8a3e"><h2>📖 Contents</h2><table class="toc">{rows}</table>'
            '<div class="box tip"><b>How to use.</b> One chapter a week. Read aloud together, look at real things around you, '
            'do the exercises, then check with the 🔑 answer key. Open-ended answers (marked "own answer") need no key – praise effort.</div></div>')
def pdf(h, p):
    subprocess.run([EDGE, '--headless', '--disable-gpu', '--no-sandbox', '--no-pdf-header-footer', f'--print-to-pdf={p}', 'file://' + os.path.abspath(h)],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
def slug(c): return f'{c.no:02d}_' + re.sub(r'[^a-z0-9]+', '_', c.title.lower()).strip('_')
PB = '<div class="page-break"></div>'
for c in chs:
    hp = os.path.join(OUT, slug(c) + '.html')
    open(hp, 'w', encoding='utf8').write(page(cover(f'Chapter {c.no}: {c.title}') + c.html(), f'EVS Class 1 — {c.title}'))
    pdf(hp, hp[:-5] + '.pdf')
app = glossary() + PB + appendix_resources()
full = cover('Complete Book — all chapters') + toc() + PB + PB.join(c.html() for c in chs) + PB + app
for name, body, t in (('Evs_Class1_full', full, 'EVS Class 1 — Complete Book'), ('17_appendix_glossary_and_resources', app, 'EVS Class 1 — Appendix')):
    hp = os.path.join(OUT, name + '.html'); open(hp, 'w', encoding='utf8').write(page(body, t)); pdf(hp, hp[:-5] + '.pdf')
for f in os.listdir(OUT):
    if f.endswith('.pdf'): shutil.copy(os.path.join(OUT, f), DST)
man = {'title': 'EVS', 'icon': '🌿', 'full': 'pdf/evs/Evs_Class1_full.pdf',
       'chapters': [{'title': c.title, 'icon': c.emoji, 'file': f'pdf/evs/{slug(c)}.pdf'} for c in chs]
                   + [{'title': 'Appendix: Word Bank & Resources', 'icon': '📎', 'file': 'pdf/evs/17_appendix_glossary_and_resources.pdf'}]}
json.dump(man, open(os.path.join(HERE, 'manifest.json'), 'w'), ensure_ascii=False, indent=1)
print('built', len(chs))
