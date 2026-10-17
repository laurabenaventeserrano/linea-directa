# Dibuja los cursores de Línea Directa: píxel a píxel, 2 px por píxel, con sombra dura rosa.
import os
COL={'K':'#A9507E','W':'#FFFBF4','P':'#FFB3D1','Y':'#FFF0B3'}
SH='#F5A9C9'
CURSORS={
 'arrow':[
  'K...........',
  'KK..........',
  'KWK.........',
  'KWWK........',
  'KWWWK.......',
  'KWWWWK......',
  'KWWWWWK.....',
  'KWWWWWWK....',
  'KWWWWWWWK...',
  'KWWWWWWWWK..',
  'KWWWWWKKKKK.',
  'KWWKWWK.....',
  'KWK.KWWK....',
  'KK..KWWK....',
  'K....KWWK...',
  '.....KWWK...',
  '......KK....'],
 'hand':[
  '....KK..........',
  '...KWWK.........',
  '...KWWK.........',
  '...KWWK.........',
  '...KWWKKK.......',
  '...KWWKWWKKK....',
  '...KWWKWWKWWKK..',
  'KK.KWWKWWKWWKWK.',
  'KWKKWWWWWWWWKWK.',
  'KWWKWWWWWWWWWWK.',
  '.KWWWWWWWWWWWWK.',
  '..KWWWWWWWWWWWK.',
  '..KWWWWWWWWWWK..',
  '...KWWWWWWWWWK..',
  '....KPPPPPPPK...',
  '....KKKKKKKKK...'],
 'grab':[
  '....KK.KK.KK....',
  '...KWWKWWKWWK...',
  '...KWWKWWKWWK...',
  '...KWWKWWKWWKK..',
  '...KWWKWWKWWKWK.',
  'KK.KWWKWWKWWKWK.',
  'KWKKWWWWWWWWWWK.',
  'KWWKWWWWWWWWWWK.',
  '.KWWWWWWWWWWWWK.',
  '..KWWWWWWWWWWWK.',
  '..KWWWWWWWWWWK..',
  '...KWWWWWWWWWK..',
  '....KPPPPPPPK...',
  '....KKKKKKKKK...'],
 'grabbing':[
  '................',
  '................',
  '....KKKKKKKK....',
  '...KWWKWWKWWK...',
  '..KKWWKWWKWWKK..',
  '.KWKWWKWWKWWKWK.',
  '.KWWKKKKKKKKWWK.',
  '.KWWWWWWWWWWWWK.',
  '.KWWWWWWWWWWWWK.',
  '..KWWWWWWWWWWK..',
  '...KWWWWWWWWK...',
  '...KPPPPPPPPK...',
  '...KKKKKKKKKK...'],
}
out=os.path.dirname(os.path.abspath(__file__))  # python3 cursors/make-cursors.py
for name,g in CURSORS.items():
    w=max(len(r.rstrip('.')) for r in g)+1; h=len(g)+1   # +1 para la sombra
    rects=[]
    filled={(x,y) for y,r in enumerate(g) for x,c in enumerate(r) if c!='.'}
    for (x,y) in sorted(filled):
        if (x+1,y+1) not in filled: rects.append(f'<rect x="{x+1}" y="{y+1}" width="1" height="1" fill="{SH}"/>')
    for y,r in enumerate(g):
        for x,c in enumerate(r):
            if c!='.': rects.append(f'<rect x="{x}" y="{y}" width="1" height="1" fill="{COL[c]}"/>')
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{w*2}" height="{h*2}" viewBox="0 0 {w} {h}" shape-rendering="crispEdges">'+''.join(rects)+'</svg>\n'
    open(os.path.join(out,name+'.svg'),'w').write(svg)
    print(name, w*2, h*2)
