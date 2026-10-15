#!/usr/bin/env python3
"""Build Class-1 Computer book -> docs/pdf/computer/*.pdf + book/computer/manifest.json"""
import os, sys, json, subprocess
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import content as C
from lib import CSS

ROOT = os.path.join(HERE, '..', '..')
TMP = os.path.join(ROOT, 'book', 'pdf', 'computer'); os.makedirs(TMP, exist_ok=True)
OUT = os.path.join(ROOT, 'docs', 'pdf', 'computer'); os.makedirs(OUT, exist_ok=True)
EDGE = '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'
SLUGS = ['computer_my_friend', 'a_smart_machine', 'a_handy_machine', 'know_my_friend_parts', 'connect_with_computer', 'dos_and_donts', 'revision_tests']
chs = [f() for f in (C.ch1, C.ch2, C.ch3, C.ch4, C.ch5, C.ch6, C.revision)]
STYLE = CSS + C.CSS_EXTRA


def page(body, t): return f'<!doctype html><html><head><meta charset="utf-8"><title>{t}</title><style>{STYLE}</style></head><body>{body}</body></html>'
def cover(sub):
    return (f'<div class="cover"><div class="big">🖥️🐶⌨️</div><h1>Computer</h1><h2>Class 1 · Learn &amp; Practise</h2><p>{sub}</p>'
            '<p class="sm">Concepts explained simply · activities · exercises with answer keys</p></div>')
def toc():
    rows = ''.join(f'<tr><td>{c.emoji}</td><td>Chapter {c.no}</td><td><b>{c.title}</b></td></tr>' for c in chs)
    return (f'<div class="chapter" style="--c:#1864ab"><h2>📖 Contents</h2><table class="toc">{rows}</table>'
            '<div class="box tip"><b>How to use this book.</b> One chapter a week (20–25 minutes). Read together, point to the real thing '
            '(keyboard, mouse), let the child do the exercises, then check with the 🔑 answer key. Hands-on practice on a real computer is best.</div></div>')
def pdf(h, p):
    subprocess.run([EDGE, '--headless', '--disable-gpu', '--no-sandbox', '--no-pdf-header-footer', f'--print-to-pdf={p}',
                    'file://' + os.path.abspath(h)], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

do_pdf = '--no-pdf' not in sys.argv
names = []
for c, s in zip(chs, SLUGS):
    n = f'{c.no:02d}_{s}'; names.append(n)
    h = os.path.join(TMP, n + '.html'); open(h, 'w', encoding='utf8').write(page(cover(f'Chapter {c.no}: {c.title}') + c.html(), f'Computer Class 1 — {c.title}'))
    if do_pdf: pdf(h, os.path.join(OUT, n + '.pdf'))
app = C.glossary() + '<div class="page-break"></div>' + C.appendix_resources()
h = os.path.join(TMP, '08_appendix.html'); open(h, 'w', encoding='utf8').write(page(app, 'Computer Class 1 — Appendix'))
if do_pdf: pdf(h, os.path.join(OUT, '08_appendix_glossary_resources.pdf'))
full = cover('Complete Book — all chapters') + toc() + '<div class="page-break"></div>' + '<div class="page-break"></div>'.join(c.html() for c in chs) + '<div class="page-break"></div>' + app
h = os.path.join(TMP, 'Computer_Class1_full.html'); open(h, 'w', encoding='utf8').write(page(full, 'Computer Class 1 — Complete Book'))
if do_pdf: pdf(h, os.path.join(OUT, 'Computer_Class1_full.pdf'))
man = {'title': 'Computer', 'icon': '🖥️', 'full': 'pdf/computer/Computer_Class1_full.pdf',
       'chapters': [{'title': c.title, 'icon': c.emoji, 'file': f'pdf/computer/{n}.pdf'} for c, n in zip(chs, names)]
       + [{'title': 'Appendix: Word Bank & Resources', 'icon': '📎', 'file': 'pdf/computer/08_appendix_glossary_resources.pdf'}]}
json.dump(man, open(os.path.join(HERE, 'manifest.json'), 'w'), ensure_ascii=False, indent=1)
print('computer built', len(chs))
