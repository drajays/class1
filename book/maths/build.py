#!/usr/bin/env python3
"""Build Class-1 Maths book: HTML per chapter + full book → PDFs via headless Edge.
Run: python3 book/maths/build.py [--no-pdf]"""
import os, subprocess, sys, re
sys.path.insert(0, os.path.dirname(__file__))
from lib import CSS
import content1, content2, content3

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'pdf', 'maths')
os.makedirs(OUT, exist_ok=True)
EDGE = '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'

chs = [content1.ch1(), content1.ch2(), content1.ch3(), content1.ch4(), content1.ch5(),
       content2.ch6(), content2.ch7(), content2.ch8(), content2.ch9(), content2.ch10(),
       content3.ch11(), content3.ch12(), content3.ch13(), content3.ch14(), content3.revision()]


def page(body, title):
    return f'<!doctype html><html><head><meta charset="utf-8"><title>{title}</title><style>{CSS}</style></head><body>{body}</body></html>'


def cover(sub):
    return (f'<div class="cover"><div class="big">🧮🐶🌈</div><h1>Maths</h1><h2>Class 1 · Learn & Practise</h2>'
            f'<p>{sub}</p><p class="sm">Concepts explained simply · worked examples · practice with answer keys</p></div>')


def toc():
    rows = ''.join(f'<tr><td>{c.emoji}</td><td>Chapter {c.no}</td><td><b>{c.title}</b></td></tr>' for c in chs)
    return (f'<div class="chapter" style="--c:#1864ab"><h2>📖 Contents</h2><table class="toc">{rows}</table>'
            '<div class="box tip"><b>How to use this book.</b> One chapter at a time (about 20–25 minutes). '
            '1) Read the "learn" part aloud together. 2) Do the ✏️ example with the child. 3) Let the child do the exercises '
            'alone — never rush. 4) Check with the 🔑 answer key at the end of each chapter. '
            'Mistakes are good: ask "show me how you thought". Suggested pace: 1 chapter per week, then Revision Tests.</div></div>')


def pdf(html_path, pdf_path):
    subprocess.run([EDGE, '--headless', '--disable-gpu', '--no-sandbox', '--no-pdf-header-footer',
                    f'--print-to-pdf={pdf_path}', 'file://' + os.path.abspath(html_path)],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


do_pdf = '--no-pdf' not in sys.argv
for c in chs:
    slug = f'{c.no:02d}_' + re.sub(r'[^a-z0-9]+', '_', c.title.lower()).strip('_')
    hp = os.path.join(OUT, slug + '.html')
    open(hp, 'w', encoding='utf8').write(page(cover('Chapter ' + str(c.no) + ': ' + c.title) + c.html(), f'Maths Class 1 — {c.title}'))
    if do_pdf: pdf(hp, hp[:-5] + '.pdf')
full = (cover('Complete Book — all chapters') + toc() + '<div class="page-break"></div>'
        + '<div class="page-break"></div>'.join(c.html() for c in chs) + '<div class="page-break"></div>' + content3.glossary()
        + '<div class="page-break"></div>' + content3.appendix_tables()
        + '<div class="page-break"></div>' + content3.appendix_resources())
fp = os.path.join(OUT, 'Maths_Class1_full.html')
open(fp, 'w', encoding='utf8').write(page(full, 'Maths Class 1 — Complete Book'))
if do_pdf: pdf(fp, fp[:-5] + '.pdf')
ap = os.path.join(OUT, '16_appendix_tables_and_resources.html')
open(ap, 'w', encoding='utf8').write(page(content3.glossary() + '<div class="page-break"></div>' + content3.appendix_tables() + '<div class="page-break"></div>' + content3.appendix_resources(), 'Maths Class 1 — Appendix'))
if do_pdf: pdf(ap, ap[:-5] + '.pdf')
print('built', len(chs), 'chapters')

# ---- publish PDFs to the app (docs/pdf/maths) + library manifest (docs/data/library.json)
import json, shutil, glob
DOCS = os.path.join(HERE, '..', '..', 'docs')
dst = os.path.join(DOCS, 'pdf', 'maths'); os.makedirs(dst, exist_ok=True)
for f in glob.glob(os.path.join(OUT, '*.pdf')): shutil.copy(f, dst)
lib_path = os.path.join(DOCS, 'data', 'library.json')
lib = json.load(open(lib_path)) if os.path.exists(lib_path) else {}
lib['maths'] = {'title': 'Maths', 'icon': '📘',
    'full': 'pdf/maths/Maths_Class1_full.pdf',
    'chapters': [{'title': c.title, 'icon': c.emoji,
                  'file': 'pdf/maths/' + f'{c.no:02d}_' + re.sub(r'[^a-z0-9]+', '_', c.title.lower()).strip('_') + '.pdf'} for c in chs]
                + [{'title': 'Appendix: Tables 1–20 & Resources', 'icon': '📎', 'file': 'pdf/maths/16_appendix_tables_and_resources.pdf'}]}
json.dump(lib, open(lib_path, 'w'), ensure_ascii=False, indent=1)
