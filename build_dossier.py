# Cleaned plain-text dossier per chapter: tables inlined, LaTeX stripped, images as [IMG n].
import re,glob,os,html
def cell_text(t): return re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>',' ',t))).strip()
def table(path):
    h=open(path,encoding='utf8').read()
    rows=[' | '.join(cell_text(c) for c in re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>',r,re.S)) for r in re.findall(r'<tr[^>]*>(.*?)</tr>',h,re.S)]
    return '[TABLE]\n'+'\n'.join(rows)+'\n[/TABLE]'
for sub in sorted(glob.glob('organized/*')):
    s=os.path.basename(sub); os.makedirs(f'book/dossier/{s}',exist_ok=True)
    for c in sorted(glob.glob(sub+'/*')):
        t=open(c+'/content.md',encoding='utf8').read()
        t=re.sub(r'<table.*?</table>',lambda m:'[TABLE]\n'+'\n'.join(' | '.join(cell_text(x) for x in re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>',r,re.S)) for r in re.findall(r'<tr[^>]*>(.*?)</tr>',m.group(0),re.S))+'\n[/TABLE]',t,flags=re.S)
        t=re.sub(r'\[Table \d+\]\((tables/[^)]+)\)',lambda m:table(f'{c}/{m.group(1)}') if os.path.exists(f'{c}/{m.group(1)}') else '',t)
        t=re.sub(r'<div[^>]*>!\[[^]]*\]\(pictures/(img_\d+)\.jpg\)</div>',r'[\1]',t)
        t=re.sub(r'\$\s*\\underline\{\\text\{(.*?)\}\}\s*\$',r'\1',t)
        t=re.sub(r'\s*\$\s*\\?[^$]{0,40}\$\s*',lambda m:' '+re.sub(r'[\\{}^_]|text|mathrm','',m.group(0)).replace('$','')+' ',t)
        t=re.sub(r'\n{2,}','\n',t)
        open(f'book/dossier/{s}/{os.path.basename(c)}.txt','w',encoding='utf8').write(t)
