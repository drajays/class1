#!/usr/bin/env python3
"""Build Class-1 Sanskrit book -> docs/pdf/sanskrit/*.pdf + book/sanskrit/manifest.json"""
import os, sys, json, subprocess
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from sk import CSS, table
import content_a as A, content_b as B, content_c as C

ROOT = os.path.join(HERE, '..', '..')
TMP = os.path.join(ROOT, 'book', 'pdf', 'sanskrit'); os.makedirs(TMP, exist_ok=True)
OUT = os.path.join(ROOT, 'docs', 'pdf', 'sanskrit'); os.makedirs(OUT, exist_ok=True)
EDGE = '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'
SLUGS = ['prarthana', 'varnamala', 'balgeetani', 'matra_parichay', 'sanyuktakshar', 'ehi_ehi_veer_re', 'matribhumi_namah',
         'kriyabodh', 'sankhyabodh', 'asti_nasti', 'pipasitah_kakah', 'mam_shariram', 'shrugal_drakshaphalam', 'subhashitani',
         'amarkosh_devnam', 'divyavani', 'vyavaharik_shabdkosh', 'adbhutam_sanskritam', 'dandalopi_aksharam', 'shabdkosh_parishishtam', 'abhyas_pariksha']
fns = [A.ch1, A.ch2, A.ch3, A.ch4, A.ch5, A.ch6, A.ch7, A.ch8, A.ch9, B.ch10, B.ch11, B.ch12, B.ch13, B.ch14, B.ch15, B.ch16, B.ch17, B.ch18, C.ch_dandalopi, C.ch_shabdkosh2, B.ch19]
chs = [f() for f in fns]


def page(body, t): return f'<!doctype html><html lang="hi"><head><meta charset="utf-8"><title>{t}</title><style>{CSS}</style></head><body>{body}</body></html>'
def cover(sub):
    return (f'<div class="cover"><div class="big">🪔📜🕉️</div><h1>संस्कृतम्</h1><h2>देवभाषा · कक्षा १</h2><p>{sub}</p>'
            '<p class="sm">सरल व्याख्या · श्लोक · शब्दार्थ · अभ्यास · उत्तर-कुंजी</p></div>')
def toc():
    rows = ''.join(f'<tr><td>{c.emoji}</td><td>पाठ {c.no}</td><td><b>{c.title}</b></td></tr>' for c in chs)
    return (f'<div class="chapter" style="--c:#1864ab"><h2>📖 विषय-सूची</h2><table class="toc">{rows}</table>'
            '<div class="box tip"><b>इस पुस्तक का प्रयोग कैसे करें?</b> एक दिन में एक छोटा भाग। 1) श्लोक/कहानी को पहले सुनें और बोलें। '
            '2) शब्दार्थ के साथ अर्थ समझें। 3) बच्चे को अभ्यास स्वयं करने दें। 4) अंत में 🔑 उत्तर-कुंजी से जाँचें। '
            'ग़लती पर डाँटें नहीं — फिर से बोलकर दोहराएँ। संस्कृत मुख्यतः सुनने और बोलने की भाषा है।</div></div>')
def pdf(h, p):
    subprocess.run([EDGE, '--headless', '--disable-gpu', '--no-sandbox', '--no-pdf-header-footer', f'--print-to-pdf={p}',
                    'file://' + os.path.abspath(h)], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

do_pdf = '--no-pdf' not in sys.argv
files = []
for c, s in zip(chs, SLUGS):
    name = f'{c.no:02d}_{s}'
    h = os.path.join(TMP, name + '.html')
    open(h, 'w', encoding='utf8').write(page(cover(f'पाठ {c.no}: {c.title}') + c.html(), f'संस्कृतम् — {c.title}'))
    if do_pdf: pdf(h, os.path.join(OUT, name + '.pdf'))
    files.append(name)
app = B.glossary() + '<div class="page-break"></div>' + B.appendix_resources()
h = os.path.join(TMP, '22_appendix.html'); open(h, 'w', encoding='utf8').write(page(app, 'संस्कृतम् — परिशिष्ट'))
if do_pdf: pdf(h, os.path.join(OUT, '22_appendix_glossary_resources.pdf'))
full = (cover('सम्पूर्ण पुस्तक') + toc() + '<div class="page-break"></div>' + '<div class="page-break"></div>'.join(c.html() for c in chs)
        + '<div class="page-break"></div>' + app)
h = os.path.join(TMP, 'Sanskrit_Class1_full.html'); open(h, 'w', encoding='utf8').write(page(full, 'संस्कृतम् — सम्पूर्ण पुस्तक'))
if do_pdf: pdf(h, os.path.join(OUT, 'Sanskrit_Class1_full.pdf'))
man = {'title': 'संस्कृतम्', 'icon': '🪔', 'full': 'pdf/sanskrit/Sanskrit_Class1_full.pdf',
       'chapters': [{'title': c.title, 'icon': c.emoji, 'file': f'pdf/sanskrit/{n}.pdf'} for c, n in zip(chs, files)]
       + [{'title': 'परिशिष्ट: शब्द-भण्डार और संसाधन', 'icon': '📎', 'file': 'pdf/sanskrit/22_appendix_glossary_resources.pdf'}]}
json.dump(man, open(os.path.join(HERE, 'manifest.json'), 'w'), ensure_ascii=False, indent=1)
print('sanskrit built', len(chs))
