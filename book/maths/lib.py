# Helpers: HTML building blocks + CSS for the Class-1 Maths book (print/A4).
import html as _h

COLORS = ['#e8590c', '#1c7ed6', '#2f9e44', '#ae3ec9', '#e03131', '#0c8599', '#f08c00', '#5f3dc4',
          '#d6336c', '#1971c2', '#2b8a3e', '#c2255c', '#e67700', '#0b7285', '#6741d9']

CSS = """
@page { size: A4; margin: 13mm 13mm 15mm 13mm; }
*{box-sizing:border-box}
body{font-family:'Avenir Next','Arial Rounded MT Bold','Trebuchet MS',Arial,sans-serif;font-size:13.5pt;line-height:1.5;color:#1f2937;margin:0}
.page-break{page-break-before:always}
.cover{height:262mm;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;
  background:linear-gradient(160deg,#fff3bf,#d0ebff 55%,#d3f9d8);border-radius:18px;padding:20mm;page-break-after:always}
.cover h1{font-size:46pt;margin:6mm 0 2mm;color:#1864ab;line-height:1.1}
.cover h2{font-size:20pt;color:#e8590c;margin:0 0 10mm}
.cover .big{font-size:70pt;letter-spacing:6px}
.cover p{font-size:14pt;max-width:140mm}
.chap-head{border-radius:16px;padding:7mm 8mm;color:#fff;display:flex;align-items:center;gap:7mm;margin-bottom:6mm}
.chap-head .no{font-size:13pt;opacity:.9;letter-spacing:2px;text-transform:uppercase}
.chap-head h1{margin:0;font-size:30pt;line-height:1.1}
.chap-head .em{font-size:44pt}
h2{font-size:18pt;margin:6mm 0 2mm;color:var(--c);break-after:avoid}
table.t,.row,.chap-head,svg,.bar{break-inside:avoid}
h3{font-size:14.5pt;margin:4mm 0 1mm;color:#364fc7}
p{margin:1.5mm 0}
.box{border-radius:12px;padding:3.5mm 5mm;margin:3.5mm 0;page-break-inside:avoid}
.goals{background:#f1f3f5;border-left:6px solid var(--c)}
.remember{background:#fff9db;border:2px dashed #f59f00}
.remember:before{content:"⭐ Remember  ";font-weight:800;color:#e67700}
.try{background:#e7f5ff;border:2px solid #74c0fc}
.fun{background:#ebfbee;border:2px solid #8ce99a}
.tip{background:#f8f0fc;border-left:6px solid #9c36b5;font-size:11.5pt}
.ex{background:#fff;border:1.5px solid var(--c);border-radius:12px;padding:3mm 5mm 4mm;margin:4mm 0}
.ex>.t{font-weight:800;color:var(--c);font-size:14pt}
.ex>.ins{font-style:italic;color:#495057;margin-bottom:1.5mm}
.items{display:grid;gap:2mm 8mm}
.c1{grid-template-columns:1fr}.c2{grid-template-columns:1fr 1fr}.c3{grid-template-columns:1fr 1fr 1fr}.c4{grid-template-columns:repeat(4,1fr)}.c5{grid-template-columns:repeat(5,1fr)}
.it{break-inside:avoid;font-size:14pt}
.it .n{display:inline-block;min-width:7mm;font-weight:800;color:var(--c)}
.blank{display:inline-block;min-width:16mm;border-bottom:2px solid #868e96;height:1em;vertical-align:baseline}
table.t{border-collapse:collapse;margin:2mm 0}
table.t td,table.t th{border:1.5px solid #adb5bd;padding:1.2mm 3mm;text-align:center;font-size:13pt}
table.t th{background:#fff4e6}
table.hund td{width:9.5mm;height:8mm;padding:0;font-size:11pt}
.vert{display:inline-grid;grid-template-columns:auto 6mm 6mm;font-size:15pt;font-weight:700;text-align:right;
  margin:1mm 3mm 1mm 0;border-bottom:2.5px solid #343a40;line-height:1.25}
.vert.t2{}
.vsum{display:inline-block;vertical-align:top;margin:1mm 4mm}
.vsum .r{display:flex;justify-content:flex-end;gap:2mm;font-size:16pt;font-weight:700;font-family:'Courier New',monospace}
.vsum .r.op{border-bottom:2.5px solid #343a40}
.vsum .r span{width:7mm;text-align:center}
.vsum .hd{font-size:9pt;color:#868e96;font-weight:400}
.em2{font-size:20pt;letter-spacing:2px}
.flex{display:flex;flex-wrap:wrap;gap:3mm;align-items:center}
.row{margin:1.5mm 0}
.key{font-size:10.5pt;page-break-before:always}
.key h2{font-size:15pt}
.key .k{break-inside:avoid;margin:1.5mm 0}
.key .k b{color:var(--c)}
.toc td{padding:1.4mm 4mm;font-size:13pt;border:none}
.sm{font-size:11pt;color:#495057}
.badge{display:inline-block;background:var(--c);color:#fff;border-radius:20px;padding:0 4mm;font-weight:700;font-size:11pt}
.bar{display:flex;align-items:flex-end;gap:3mm;height:46mm;border-left:2px solid #495057;border-bottom:2px solid #495057;padding:0 3mm}
.bar div{width:11mm;border-radius:4px 4px 0 0;text-align:center;font-weight:800;color:#fff;font-size:10pt}
.cert{border:5px double #f59f00;border-radius:16px;padding:10mm;text-align:center;margin-top:12mm}
"""


def blank(w=16):
    return f'<span class="blank" style="min-width:{w}mm"></span>'


def esc(s):
    return _h.escape(str(s))


class Chapter:
    def __init__(self, no, title, emoji, color, goals):
        self.no, self.title, self.emoji, self.color = no, title, emoji, color
        self.parts = []
        self.keys = []  # (exercise title, [answers])
        self.nex = 0
        head = (f'<div class="chap-head" style="background:{color}"><div class="em">{emoji}</div>'
                f'<div><div class="no">Chapter {no}</div><h1>{esc(title)}</h1></div></div>')
        g = ''.join(f'<li>{g}</li>' for g in goals)
        self.parts.append(head + f'<div class="box goals"><b>🎯 In this chapter I will learn:</b><ul style="margin:1mm 0 0 5mm">{g}</ul></div>')

    def h(self, t): self.parts.append(f'<h2>{t}</h2>')
    def p(self, t): self.parts.append(f'<p>{t}</p>')
    def raw(self, t): self.parts.append(t)
    def remember(self, t): self.parts.append(f'<div class="box remember">{t}</div>')
    def tip(self, t): self.parts.append(f'<div class="box tip"><b>👩‍🏫 Parent / Teacher tip:</b> {t}</div>')
    def fun(self, t): self.parts.append(f'<div class="box fun">{t}</div>')
    def tryit(self, t): self.parts.append(f'<div class="box try"><b>✏️ Let\'s try together:</b> {t}</div>')

    def ex(self, title, instr, items, cols=2, ans_style='line'):
        """items: list of (question_html, answer_text). Question may contain {_} for a blank."""
        self.nex += 1
        label = f'Exercise {self.no}.{self.nex}'
        lis = []
        for i, (q, a) in enumerate(items, 1):
            q = q.replace('{_}', blank())
            lis.append(f'<div class="it"><span class="n">{i}.</span>{q}</div>')
        self.parts.append(
            f'<div class="ex"><div class="t">{label}: {title}</div><div class="ins">{instr}</div>'
            f'<div class="items c{cols}">{"".join(lis)}</div></div>')
        self.keys.append((f'{label}: {title}', [a for _, a in items]))

    def html(self, with_key=True):
        out = [f'<div class="chapter" style="--c:{self.color}">'] + self.parts
        if with_key and self.keys:
            out.append(self.key_html())
        out.append('</div>')
        return '\n'.join(out)

    def key_html(self):
        rows = []
        for t, ans in self.keys:
            a = ' &nbsp;•&nbsp; '.join(f'<b>{i}.</b> {esc(x)}' for i, x in enumerate(ans, 1))
            rows.append(f'<div class="k"><b>{esc(t)}</b><br>{a}</div>')
        return (f'<div class="key" style="--c:{self.color}"><h2>🔑 Answer key — Chapter {self.no}: {esc(self.title)}</h2>'
                + ''.join(rows) + '</div>')


def vsum(a, b, op='+'):
    """Vertical sum, tens/ones columns."""
    A, B = f'{a:02d}' if a >= 10 else f' {a}', f'{b:02d}' if b >= 10 else f' {b}'
    sp = lambda s: ''.join(f'<span>{c.strip() or "&nbsp;"}</span>' for c in s)
    return (f'<div class="vsum"><div class="r hd"><span></span><span>T</span><span>O</span></div>'
            f'<div class="r">{sp(" "+A[0])}{sp(A[1])}</div>'
            f'<div class="r op"><span>{op}</span>{sp(B[0])}{sp(B[1])}</div>'
            f'<div class="r"><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span></div></div>')


def tens_ones(n, em='🟦'):
    """Place-value picture: tens as bars, ones as dots."""
    t, o = divmod(n, 10)
    bars = ''.join('<span style="display:inline-block;width:3.2mm;height:14mm;background:#4dabf7;border:1px solid #1971c2;margin-right:1mm;border-radius:2px"></span>' for _ in range(t))
    dots = ''.join('<span style="display:inline-block;width:3.2mm;height:3.2mm;background:#ff922b;border:1px solid #d9480f;margin:0 .6mm;border-radius:50%"></span>' for _ in range(o))
    return f'<span style="display:inline-flex;align-items:flex-end;gap:3mm">{bars}<span style="max-width:20mm">{dots}</span></span>'


def emo(e, n):
    return f'<span class="em2">{e * n}</span>'


def numline(a, b, mark=None, hop=None):
    """SVG number line a..b; hop=(from,to) draws an arc."""
    n = b - a
    W, step = 560, 560 / n
    s = [f'<svg width="{W+30}" height="{70 if hop else 46}" viewBox="-15 {-24 if hop else 0} {W+30} {70 if hop else 46}">',
         f'<line x1="0" y1="14" x2="{W}" y2="14" stroke="#343a40" stroke-width="2.5"/>']
    for i in range(n + 1):
        x = i * step
        c = '#e03131' if mark is not None and a + i == mark else '#343a40'
        s.append(f'<line x1="{x}" y1="8" x2="{x}" y2="20" stroke="{c}" stroke-width="2"/>'
                 f'<text x="{x}" y="38" text-anchor="middle" font-size="14" font-weight="700" fill="{c}">{a+i}</text>')
    if hop:
        x1, x2 = (hop[0] - a) * step, (hop[1] - a) * step
        s.append(f'<path d="M{x1},10 Q{(x1+x2)/2},-22 {x2},10" fill="none" stroke="#1c7ed6" stroke-width="3"/>'
                 f'<polygon points="{x2},12 {x2-7},2 {x2+2},3" fill="#1c7ed6"/>')
    s.append('</svg>')
    return ''.join(s)


def hundred_chart(hl=None, blank_ones=()):
    hl = hl or set()
    rows = []
    for r in range(10):
        tds = ''
        for c in range(1, 11):
            n = r * 10 + c
            st = 'background:#ffe3e3;font-weight:800' if n in hl else ''
            tds += f'<td style="{st}">{"" if n in blank_ones else n}</td>'
        rows.append(f'<tr>{tds}</tr>')
    return f'<table class="t hund">{"".join(rows)}</table>'


def table(headers, rows, cls='t'):
    th = ''.join(f'<th>{h}</th>' for h in headers)
    tr = ''.join('<tr>' + ''.join(f'<td>{c}</td>' for c in r) + '</tr>' for r in rows)
    return f'<table class="{cls}"><tr>{th}</tr>{tr}</table>'


def bars(data, colors=None, unit=1, maxv=None):
    """CSS bar graph; data = [(label, value)]"""
    maxv = maxv or max(v for _, v in data)
    H = 40  # mm for maxv
    out = ['<div class="bar">']
    for i, (l, v) in enumerate(data):
        c = (colors or COLORS)[i % 12]
        out.append(f'<div style="height:{H*v/maxv:.1f}mm;background:{c}">{v}</div>')
    out.append('</div><div style="display:flex;gap:3mm;padding:0 3mm;font-size:10pt">')
    for l, _ in data:
        out.append(f'<div style="width:11mm;text-align:center">{l}</div>')
    out.append('</div>')
    return ''.join(out)
