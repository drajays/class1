# Sanskrit book helpers: Hindi-labelled Chapter subclass + extra CSS (reuses book/maths/lib.py).
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'maths'))
from lib import *  # noqa: F401,F403
from lib import Chapter, CSS as BASE_CSS, blank, esc, table, COLORS

CSS = BASE_CSS + """
body{font-family:'Kohinoor Devanagari','Devanagari Sangam MN','Noto Sans Devanagari','ITF Devanagari','Avenir Next',sans-serif;line-height:1.65}
.remember:before{content:"⭐ याद रखो  "}
.sl{font-size:17pt;line-height:1.9;text-align:center;background:#fff9db;border-radius:14px;padding:3mm 6mm;margin:3mm 0;border:2px solid #ffd43b;page-break-inside:avoid}
.sl small{display:block;font-size:11.5pt;color:#495057;line-height:1.5;text-align:left;margin-top:1mm}
.big{font-size:26pt;font-weight:700}
.ex{break-inside:avoid}
.grid{display:grid;gap:3mm}
.wd{border:1.5px solid var(--c);border-radius:10px;padding:1.5mm 2mm;text-align:center;break-inside:avoid;font-size:12pt}
.wd .s{font-size:17pt;font-weight:700;color:var(--c)}
.wd .e{font-size:20pt}
"""


class SChapter(Chapter):
    def __init__(self, no, title, emoji, color, goals):
        self.no, self.title, self.emoji, self.color = no, title, emoji, color
        self.parts, self.keys, self.nex = [], [], 0
        g = ''.join(f'<li>{x}</li>' for x in goals)
        self.parts.append(
            f'<div class="chap-head" style="background:{color}"><div class="em">{emoji}</div>'
            f'<div><div class="no">पाठ {no}</div><h1>{title}</h1></div></div>'
            f'<div class="box goals"><b>🎯 इस पाठ में मैं सीखूँगा / सीखूँगी:</b><ul style="margin:1mm 0 0 5mm">{g}</ul></div>')

    def remember(self, t): self.parts.append(f'<div class="box remember">{t}</div>')
    def tip(self, t): self.parts.append(f'<div class="box tip"><b>👩‍🏫 अभिभावक / शिक्षक सुझाव:</b> {t}</div>')
    def fun(self, t): self.parts.append(f'<div class="box fun">{t}</div>')

    def shloka(self, text, meaning=None):
        m = f'<small>अर्थ: {meaning}</small>' if meaning else ''
        self.parts.append(f'<div class="sl">{text}{m}</div>')

    def words(self, rows, cols=4):
        """rows: (sanskrit, hindi[, emoji])"""
        cells = ''.join(
            f'<div class="wd">{"<div class=e>"+r[2]+"</div>" if len(r) > 2 else ""}<div class="s">{r[0]}</div>{r[1]}</div>'
            for r in rows)
        self.parts.append(f'<div class="grid" style="grid-template-columns:repeat({cols},1fr)">{cells}</div>')

    def ex(self, title, instr, items, cols=2):
        self.nex += 1
        label = f'अभ्यास {self.no}.{self.nex}'
        lis = []
        for i, (q, a) in enumerate(items, 1):
            lis.append(f'<div class="it"><span class="n">{i}.</span>{q.replace("{_}", blank())}</div>')
        self.parts.append(
            f'<div class="ex"><div class="t">{label}: {title}</div><div class="ins">{instr}</div>'
            f'<div class="items c{cols}">{"".join(lis)}</div></div>')
        self.keys.append((f'{label}: {title}', [a for _, a in items]))

    def key_html(self):
        rows = []
        for t, ans in self.keys:
            a = ' &nbsp;•&nbsp; '.join(f'<b>{i}.</b> {esc(x)}' for i, x in enumerate(ans, 1))
            rows.append(f'<div class="k"><b>{t}</b><br>{a}</div>')
        return (f'<div class="key" style="--c:{self.color}"><h2>🔑 उत्तर-कुंजी — पाठ {self.no}: {self.title}</h2>'
                + ''.join(rows) + '</div>')
