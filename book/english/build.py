#!/usr/bin/env python3
"""Build Class-1 English book PDFs (Edge headless) → docs/pdf/english + book/english/manifest.json
Run: python3 book/english/build.py [--no-pdf]"""
import os, re, subprocess, sys, json, shutil, glob
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
sys.path.insert(0, os.path.join(HERE, '..', 'maths'))
from lib import CSS
import e1, e2, e3

OUT = os.path.join(HERE, '..', 'pdf', 'english'); os.makedirs(OUT, exist_ok=True)
DST = os.path.join(HERE, '..', '..', 'docs', 'pdf', 'english'); os.makedirs(DST, exist_ok=True)
EDGE = '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'

chs = [e1.ch1(), e1.ch2(), e1.ch3(), e1.ch4(), e1.ch5(), e1.ch6(),
       e2.ch7(), e2.ch8(), e2.ch9(), e2.ch10(), e2.ch11(), e2.ch12(),
       e3.ch13(), e3.ch14(), e3.ch15(), e3.ch16(), e3.revision()]


def page(body, title):
    return f'<!doctype html><html><head><meta charset="utf-8"><title>{title}</title><style>{CSS}</style></head><body>{body}</body></html>'


def cover(sub):
    return (f'<div class="cover"><div class="big">📖🐶✏️</div><h1>English</h1><h2>Class 1 · Learn & Practise</h2>'
            f'<p>{sub}</p><p class="sm">Letters &amp; phonics · grammar · reading · writing · answer keys</p></div>')


def toc():
    rows = ''.join(f'<tr><td>{c.emoji}</td><td>Chapter {c.no}</td><td><b>{c.title}</b></td></tr>' for c in chs)
    return (f'<div class="chapter" style="--c:#1864ab"><h2>📖 Contents</h2><table class="toc">{rows}</table>'
            '<div class="box tip"><b>How to use this book.</b> One chapter at a time (20–25 minutes). Read the learning part aloud together, '
            'do the first item with the child, let the child try the rest, then check with the 🔑 answer key. '
            'Where the answer says "answers vary" accept any correct sentence. Suggested pace: 1 chapter a week, then the Revision Tests.</div></div>')


def pdf(h, p):
    subprocess.run([EDGE, '--headless', '--disable-gpu', '--no-sandbox', '--no-pdf-header-footer',
                    f'--print-to-pdf={p}', 'file://' + os.path.abspath(h)], check=True,
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


do_pdf = '--no-pdf' not in sys.argv
slug = lambda c: f'{c.no:02d}_' + re.sub(r'[^a-z0-9]+', '_', c.title.lower()).strip('_')
for c in chs:
    hp = os.path.join(OUT, slug(c) + '.html')
    open(hp, 'w', encoding='utf8').write(page(cover(f'Chapter {c.no}: {c.title}') + c.html(), f'English Class 1 — {c.title}'))
    if do_pdf: pdf(hp, hp[:-5] + '.pdf')

PB = '<div class="page-break"></div>'
app = e3.glossary() + PB + e3.appendix_lists() + PB + e3.appendix_resources()
full = cover('Complete Book — all chapters') + toc() + PB + PB.join(c.html() for c in chs) + PB + app
fp = os.path.join(OUT, 'English_Class1_full.html')
open(fp, 'w', encoding='utf8').write(page(full, 'English Class 1 — Complete Book'))
ap = os.path.join(OUT, '18_appendix_word_lists_and_resources.html')
open(ap, 'w', encoding='utf8').write(page(app, 'English Class 1 — Appendix'))
if do_pdf:
    pdf(fp, fp[:-5] + '.pdf'); pdf(ap, ap[:-5] + '.pdf')
    for f in glob.glob(os.path.join(OUT, '*.pdf')): shutil.copy(f, DST)

man = {'title': 'English', 'icon': '📖', 'full': 'pdf/english/English_Class1_full.pdf',
       'chapters': [{'title': c.title, 'icon': c.emoji, 'file': f'pdf/english/{slug(c)}.pdf'} for c in chs]
       + [{'title': 'Appendix: Word Lists & Resources', 'icon': '📎', 'file': 'pdf/english/18_appendix_word_lists_and_resources.pdf'}]}
json.dump(man, open(os.path.join(HERE, 'manifest.json'), 'w'), ensure_ascii=False, indent=1)
print('built', len(chs), 'chapters')
