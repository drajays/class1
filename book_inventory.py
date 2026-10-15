import re,glob,os
M=re.compile(r'(practice sheet|worksheet|activity|reading|exercise|story|revision|test|Q\s*\d|example|fill in|match|circle|tick)',re.I)
out=['# Book inventory (from organized/*/content.md)\n']
for s in sorted(glob.glob('organized/*')):
    out.append(f'\n## {os.path.basename(s)}\n\n| # | folder | words | imgs | headings | exercise markers | first heading |\n|---|---|---|---|---|---|---|')
    for i,c in enumerate(sorted(glob.glob(s+'/*'))):
        t=open(c+'/content.md',encoding='utf8').read()
        h=re.findall(r'^#+\s*(.+)$',t,re.M)
        ex=len(M.findall(t))
        im=len(re.findall(r'!\[',t))
        out.append(f'| {i} | {os.path.basename(c)} | {len(t.split())} | {im} | {len(h)} | {ex} | {(h[0] if h else "")[:40]} |')
open('book/INVENTORY.md','w').write('\n'.join(out))
