#!/usr/bin/env python3
"""Hindi Class-1 book → book/pdf/hindi (intermediate) + docs/pdf/hindi + book/hindi/manifest.json.
Run: python3 book/hindi/build.py [--no-pdf]"""
import os, sys, json, subprocess, shutil, glob
H = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(H, '..', '..'))
sys.path.insert(0, os.path.join(ROOT, 'book', 'maths')); sys.path.insert(0, H)
import lib
from lib import CSS, COLORS, table, esc
from data import L

OUT = os.path.join(ROOT, 'book', 'pdf', 'hindi'); os.makedirs(OUT, exist_ok=True)
DST = os.path.join(ROOT, 'docs', 'pdf', 'hindi'); os.makedirs(DST, exist_ok=True)
EDGE = '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'
FONT = ("body{font-family:'Kohinoor Devanagari','Devanagari Sangam MN','Noto Sans Devanagari','Avenir Next',Arial,sans-serif;font-size:14pt;line-height:1.65}"
        ".dev{font-size:20pt}.pass{font-size:17pt;line-height:1.9;background:#fffdf5;border:2px solid #ffe8a3;border-radius:14px;padding:4mm 6mm;margin:3mm 0}"
        ".pass div{margin:.5mm 0}.poem div{text-align:center}.hint{color:#868e96;font-size:11pt}"
        ".w{display:inline-block;text-align:center;margin:1.5mm 3mm;min-width:24mm}.w b{font-size:17pt;display:block}.w i{font-size:26pt;font-style:normal}.w span{font-size:9.5pt;color:#868e96;display:block}"
        ".chart td{font-size:17pt;padding:1.2mm 2mm}")
lessons = json.load(open(os.path.join(ROOT, 'docs', 'data', 'hindi_lessons.json')))['chapters']


class HChapter(lib.Chapter):
    def __init__(self, no, title, emoji, color, goals):
        self.no, self.title, self.emoji, self.color = no, title, emoji, color
        self.parts, self.keys, self.nex = [], [], 0
        self.parts.append(f'<div class="chap-head" style="background:{color}"><div class="em">{emoji}</div>'
                          f'<div><div class="no">{'वर्णमाला' if no == 0 else 'पाठ ' + str(no)}</div><h1>{esc(title)}</h1></div></div>')
        if goals:
            self.parts.append('<div class="box goals"><b>🎯 इस पाठ में हम सीखेंगे:</b><ul style="margin:1mm 0 0 5mm">'
                              + ''.join(f'<li>{g}</li>' for g in goals) + '</ul></div>')

    def remember(self, t): self.parts.append(f'<div class="box remember" style="--c:{self.color}">{t}</div>')
    def ex(self, title, instr, items, cols=1):
        self.nex += 1; label = f'अभ्यास {self.no}.{self.nex}'
        lis = ''.join(f'<div class="it"><span class="n">{i}.</span>{q.replace("{_}", lib.blank())}</div>' for i, (q, _) in enumerate(items, 1))
        self.parts.append(f'<div class="ex"><div class="t">{label}: {title}</div><div class="ins">{instr}</div><div class="items c{cols}">{lis}</div></div>')
        self.keys.append((f'{label}: {title}', [a for _, a in items]))
    def key_html(self):
        rows = ''.join(f'<div class="k"><b>{esc(t)}</b><br>' + ' &nbsp;•&nbsp; '.join(f'<b>{i}.</b> {esc(x)}' for i, x in enumerate(a, 1)) + '</div>' for t, a in self.keys)
        return f'<div class="key" style="--c:{self.color}"><h2>🔑 उत्तर — {esc(self.title)}</h2>{rows}</div>'


def words_html(ws):
    return '<div class="flex">' + ''.join(f'<div class="w"><i>{e}</i><b>{h}</b><span>{en}</span></div>' for h, e, en in ws) + '</div>'


SWAR = [('अ','अनार'),('आ','आम'),('इ','इमली'),('ई','ईख'),('उ','उल्लू'),('ऊ','ऊन'),('ऋ','ऋषि'),('ए','एक'),('ऐ','ऐनक'),('ओ','ओखली'),('औ','औरत'),('अं','अंगूर'),('अः','प्रातः')]
VYAN = [('क','कमल'),('ख','खरगोश'),('ग','गमला'),('घ','घर'),('ङ','—'),('च','चम्मच'),('छ','छतरी'),('ज','जहाज़'),('झ','झंडा'),('ञ','—'),
        ('ट','टमाटर'),('ठ','ठेला'),('ड','डमरू'),('ढ','ढोल'),('ण','—'),('त','तरबूज़'),('थ','थैला'),('द','दवात'),('ध','धनुष'),('न','नल'),
        ('प','पतंग'),('फ','फल'),('ब','बतख'),('भ','भालू'),('म','मछली'),('य','यात्री'),('र','रथ'),('ल','लड्डू'),('व','वकील'),
        ('श','शेर'),('ष','षटकोण'),('स','सेब'),('ह','हाथी'),('क्ष','क्षमा'),('त्र','त्रिशूल'),('ज्ञ','ज्ञान')]
MATRA = [('आ','ा','का'),('इ','ि','कि'),('ई','ी','की'),('उ','ु','कु'),('ऊ','ू','कू'),('ए','े','के'),('ऐ','ै','कै'),('ओ','ो','को'),('औ','ौ','कौ'),('अं','ं','कं'),('अः','ः','कः')]


def varnamala():
    c = HChapter(0, 'वर्णमाला', '🔤', COLORS[0], ['स्वर और व्यंजन पहचानना', 'हर अक्षर से शब्द बनाना', 'अक्षर सुंदर लिखना'])
    c.p('<span class="hint">Varnamala = the Hindi alphabet: 13 vowels (स्वर) and 36 consonants (व्यंजन).</span>')
    c.h('स्वर (Vowels)')
    c.raw(table([a for a, _ in SWAR], [[f'<span class="em2"></span>{w}' for _, w in SWAR]], cls='t chart'))
    c.h('व्यंजन (Consonants)')
    for i in range(0, len(VYAN), 9):
        ch = VYAN[i:i + 9]
        c.raw(table([a for a, _ in ch], [[w for _, w in ch]], cls='t chart'))
    c.remember('स्वर अपने आप बोले जाते हैं। व्यंजन में स्वर मिलने से "बारहखड़ी" बनती है: क + आ = का।')
    c.ex('स्वर पूरे करो', 'खाली जगह में सही स्वर लिखो।', [
        ('अ, आ, {_}, ई, उ, {_}', 'इ, ऊ'), ('ए, {_}, ओ, {_}, अं, अः', 'ऐ, औ'), ('{_} से अनार, {_} से आम', 'अ, आ')], cols=1)
    c.ex('अक्षर से शब्द', 'अक्षर के आगे सही शब्द लिखो।', [
        ('क → {_} (कमल / घर)', 'कमल'), ('ख → {_} (खरगोश / नल)', 'खरगोश'), ('म → {_} (मछली / सेब)', 'मछली'),
        ('स → {_} (सेब / शेर)', 'सेब'), ('ह → {_} (हाथी / थैला)', 'हाथी'), ('प → {_} (पतंग / फल)', 'पतंग')], cols=2)
    c.ex('क्रम पूरा करो', 'अक्षरों को क्रम से लिखो।', [
        ('क, ख, {_}, घ, ङ', 'ग'), ('च, छ, {_}, झ, ञ', 'ज'), ('ट, {_}, ड, ढ, ण', 'ठ'), ('त, थ, {_}, ध, न', 'द'), ('प, फ, {_}, भ, म', 'ब')], cols=1)
    c.tip = None
    c.raw('<div class="box tip"><b>👩‍🏫 माता-पिता / शिक्षक के लिए:</b> रोज़ 3–4 अक्षर, आवाज़ के साथ। पहले अँगुली से हवा में, फिर रेत/थाली में, फिर कॉपी में लिखवाएँ। बच्चे से पूछें: "इस अक्षर से और कौन-सा शब्द शुरू होता है?"</div>')
    return c


def lesson(i):
    d, j = L[i], lessons[i]
    no = i + 1
    c = HChapter(no, j['title'], j['icon'], COLORS[(i + 1) % 15], [])
    c.parts.append(f'<div class="hint">{d["hint"]}</div>')
    c.h('📖 पाठ को समझो')
    for s in j['concept']['intro']:
        c.p(s)
    c.remember('💡 ' + j['concept']['tip'])
    lab = {'poem': '🎵 कविता पढ़ो', 'story': '📚 कहानी पढ़ो', 'matra': '👀 पढ़ो', 'mixed': '👀 पढ़ो'}[d['kind']]
    c.h(lab)
    cls = 'pass poem' if d['kind'] == 'poem' else 'pass'
    c.raw(f'<div class="{cls}">' + ''.join(f'<div>{x}</div>' for x in d['passage']) + '</div>')
    c.h('🔤 नए शब्द')
    c.raw(words_html(d['words']))
    if d.get('build'):
        c.ex('मात्रा जोड़कर शब्द बनाओ', 'अक्षरों को जोड़ो और शब्द लिखो।', [(f'{p} = {{_}}', a) for p, a in d['build']], cols=2)
    em = [w[1] for w in d['words'][:4]]; rot = em[1:] + em[:1]
    abc = 'कखगघ'
    c.ex('चित्र से मिलाओ', 'शब्द के आगे सही चित्र का अक्षर लिखो। ' + '  '.join(f'({abc[k]}) {rot[k]}' for k in range(4)),
         [(f'{w[0]} → {{_}}', abc[rot.index(w[1])]) for w in d['words'][:4]], cols=2)
    c.ex('खाली जगह भरो', 'सही शब्द लिखो।', d['fill'], cols=1)
    mq = []
    for p in j['problems']:
        opts = ' &nbsp; '.join(f'({"कखग"[k]}) {o}' for k, o in enumerate(p['options']))
        ans = '  '.join(f'({"कखग"[k]}) {o}' for k, o in enumerate(p['options']) if o == p['a']) or p['a']
        mq.append((f'{p["q"]}<br><span class="sm">{opts}</span>' + ' {_}', ans))
    c.ex('प्रश्न-उत्तर', 'सही उत्तर का अक्षर लिखो।', mq, cols=1)
    w3 = '، '.join(w[0] for w in d['words'][:3]).replace('،', ',')
    c.ex('लिखो', 'कॉपी में सुंदर अक्षरों में लिखो।', [(f'इन शब्दों को दो-दो बार लिखो: {w3}', 'कॉपी में जाँचें'),
        (f'"{d["words"][0][0]}" से एक वाक्य बनाओ।', 'अपना वाक्य'), ('पाठ की कोई एक पंक्ति आँखें बंद करके बोलो।', 'बोलकर')], cols=1)
    c.raw('<div class="box tip"><b>👩‍🏫 माता-पिता / शिक्षक:</b> पहले बच्चे से पाठ ज़ोर से पढ़वाएँ, फिर चित्र देखकर कहानी अपने शब्दों में सुनाने को कहें। गलती पर टोकें नहीं — एक बार स्वयं पढ़कर सुनाएँ।</div>')
    return c


def appendix():
    rows = [[a, b + ' ' + ('का कि की कु कू के कै को कौ कं कः'.split()[k] if k < 11 else '')] for k, (a, b, _) in enumerate(MATRA)]
    baras = '<table class="t chart"><tr>' + ''.join(f'<th>{a}</th>' for a, _, _ in MATRA) + '</tr><tr>' + ''.join(f'<td>{m}</td>' for _, _, m in MATRA) + '</tr><tr>' + ''.join(f'<td>{b}</td>' for _, b, _ in MATRA) + '</tr></table>'
    bar_rows = ''
    for ch in 'कखगचजतदनपबमरलसह':
        bar_rows += f'<tr><td><b>{ch}</b></td>' + ''.join(f'<td>{ch}{m}</td>' for m in ['', 'ा', 'ि', 'ी', 'ु', 'ू', 'े', 'ै', 'ो', 'ौ', 'ं', 'ः']) + '</tr>'
    barakhadi = '<table class="t chart"><tr><th></th>' + ''.join(f'<th>{h}</th>' for h in ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः']) + f'</tr>{bar_rows}</table>'
    res = table(['प्रकार', 'क्या', 'कहाँ'], [
        ['पुस्तक', 'NCERT <b>रिमझिम</b> (कक्षा 1 हिंदी) — मुफ़्त PDF, कविताएँ और कहानियाँ', 'ncert.nic.in → Textbook'],
        ['वेबसाइट', '<b>StoryWeaver</b> (Pratham Books) — हिंदी में मुफ़्त बाल-कहानियाँ', 'storyweaver.org.in'],
        ['पोर्टल', '<b>DIKSHA</b> — पाठ-आधारित वीडियो व अभ्यास-पत्र', 'diksha.gov.in'],
        ['वीडियो', 'वर्णमाला गीत, बारहखड़ी गीत, बाल कविताएँ (बच्चों के चैनल)', 'YouTube: "hindi varnamala song"'],
        ['घर पर', 'अक्षर-कार्ड, चित्र-कार्ड, रेत की ट्रे, कहानी पढ़ने का 10 मिनट का समय', 'खुद बनाएँ'],
        ['खेल', 'अंत्याक्षरी, शब्द-शृंखला, "मैं देखता हूँ…" (पहला अक्षर बताओ)', 'परिवार के साथ']])
    return ('<div class="chapter" style="--c:#1864ab"><h2>📎 परिशिष्ट क — मात्राएँ</h2>' + baras
            + '<h2>📎 परिशिष्ट ख — बारहखड़ी</h2>' + barakhadi
            + '</div><div class="page-break"></div><div class="chapter" style="--c:#2b8a3e"><h2>🌟 परिशिष्ट ग — अच्छे संसाधन</h2>' + res
            + '<div class="box tip">रोज़ 15 मिनट पढ़ना, सप्ताह में एक बार कहानी सुनाना। (वेबसाइट व नाम बदल सकते हैं — नाम से खोजें।)</div></div>')


def page(body, title):
    return f'<!doctype html><html lang="hi"><head><meta charset="utf-8"><title>{title}</title><style>{CSS}{FONT}</style></head><body>{body}</body></html>'


def cover(sub):
    return (f'<div class="cover"><div class="big">🕉️📖🌸</div><h1>हिंदी</h1><h2>कक्षा 1 · पढ़ो और सीखो</h2><p>{sub}</p>'
            '<p class="sm">वर्णमाला · मात्राएँ · कविताएँ और कहानियाँ · अभ्यास · उत्तर</p></div>')


def pdf(hp, pp):
    subprocess.run([EDGE, '--headless', '--disable-gpu', '--no-sandbox', '--no-pdf-header-footer', f'--print-to-pdf={pp}', 'file://' + hp],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


do_pdf = '--no-pdf' not in sys.argv
chs = [varnamala()] + [lesson(i) for i in range(26)]
slugs = ['varnamala'] + [d['slug'] for d in L]
files = []
for n, (c, s) in enumerate(zip(chs, slugs), 1):
    c.no_file = n
    f = f'{n:02d}_{s}'
    hp = os.path.join(OUT, f + '.html')
    open(hp, 'w', encoding='utf8').write(page(cover(c.title) + c.html(), f'हिंदी कक्षा 1 — {c.title}'))
    if do_pdf: pdf(hp, hp[:-5] + '.pdf')
    files.append(f)
toc = '<div class="chapter" style="--c:#1864ab"><h2>📖 अनुक्रम</h2><table class="toc">' + ''.join(
    f'<tr><td>{c.emoji}</td><td>{"" if k == 0 else "पाठ " + str(c.no)}</td><td><b>{c.title}</b></td></tr>' for k, c in enumerate(chs)) + '</table>' \
    '<div class="box tip"><b>कैसे पढ़ें:</b> एक दिन में एक पाठ। 1) पाठ ज़ोर से पढ़ें 2) नए शब्द देखें 3) अभ्यास बच्चा खुद करे 4) अंत में 🔑 उत्तर से जाँचें।</div></div>'
full = cover('पूरी पुस्तक') + toc + '<div class="page-break"></div>' + '<div class="page-break"></div>'.join(c.html() for c in chs) \
    + '<div class="page-break"></div>' + appendix()
fp = os.path.join(OUT, 'Hindi_Class1_full.html')
open(fp, 'w', encoding='utf8').write(page(full, 'हिंदी कक्षा 1 — पूरी पुस्तक'))
ap = os.path.join(OUT, '28_appendix_matras_barakhadi_resources.html')
open(ap, 'w', encoding='utf8').write(page(appendix(), 'हिंदी कक्षा 1 — परिशिष्ट'))
if do_pdf:
    pdf(fp, fp[:-5] + '.pdf'); pdf(ap, ap[:-5] + '.pdf')
    for p in glob.glob(os.path.join(OUT, '*.pdf')): shutil.copy(p, DST)
man = {'title': 'हिंदी', 'icon': '🕉️', 'full': 'pdf/hindi/Hindi_Class1_full.pdf',
       'chapters': [{'title': ('वर्णमाला' if k == 0 else c.title), 'icon': c.emoji, 'file': f'pdf/hindi/{f}.pdf'} for k, (c, f) in enumerate(zip(chs, files))]
       + [{'title': 'परिशिष्ट: मात्राएँ, बारहखड़ी और संसाधन', 'icon': '📎', 'file': 'pdf/hindi/28_appendix_matras_barakhadi_resources.pdf'}]}
json.dump(man, open(os.path.join(H, 'manifest.json'), 'w'), ensure_ascii=False, indent=1)
print('built', len(chs))
