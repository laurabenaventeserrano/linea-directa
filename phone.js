// Línea Directa · EL TELÉFONO. NO CAMBIAR.
//
// Este es el teléfono aprobado por Laura: el auricular fucsia con la pantalla
// amarilla, el teclado de 12 teclas, la rejilla y la base hexagonal.
// Copiado tal cual de la versión aprobada (commit bb5c8d0 del repo laura-portfolio).
// No se cambia su forma, sus colores, sus proporciones ni sus partes sin que
// Laura lo pida expresamente. Si una mecánica necesita algo del teléfono
// (una luz, un cable, otra pantalla), se pregunta antes. Ver la skill
// .claude/skills/linea-directa/SKILL.md.

window.LD_PHONE = (() => {
const C = { pink:'#FF2E9A', yellow:'#FFE14D', ink:'#2A0F45', paper:'#FFF6EC' };
const KEYS = ['1','2','3','4','5','6','7','8','9','*','0','#'];

function phoneSVG(lcdText, interactive){
  let k = '';
  KEYS.forEach((d,i)=>{
    const x = 24 + (i%3)*25, y = 116 + Math.floor(i/3)*24;
    k += `<g class="k" data-k="${d}">`+
      (interactive?`<rect x="${x-2}" y="${y-2.5}" width="26" height="24" fill="transparent"/>`:'')+
      `<rect class="face" x="${x}" y="${y}" width="22" height="19" rx="6" fill="${C.ink}"/>`+
      `<text x="${x+11}" y="${y+14}" text-anchor="middle" font-family="monospace" font-weight="700" font-size="12.5" fill="${C.paper}">${d}</text></g>`;
  });
  let dots = '';
  for(let r=0;r<3;r++) for(let c=0;c<4;c++) dots += `<circle cx="${45+c*10}" cy="${30+r*9}" r="2.8" fill="${C.ink}"/>`;
  let grille = '';
  for(let i=0;i<5;i++) grille += `<line x1="36" x2="84" y1="${238+i*10}" y2="${238+i*10}" stroke="${C.ink}" stroke-width="4.5" stroke-linecap="round"/>`;
  const body = 'M10 62 Q10 6 60 6 Q110 6 110 62 L110 284 Q110 300 94 300 L26 300 Q10 300 10 284 Z';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 312">
  <path d="${body}" transform="translate(9 9)" fill="${C.ink}"/>
  <path d="${body}" fill="${C.pink}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M22 66 Q22 22 52 16" fill="none" stroke="${C.paper}" stroke-width="5" stroke-linecap="round"/>
  <line x1="18" y1="84" x2="18" y2="206" stroke="${C.paper}" stroke-width="3.5" stroke-linecap="round"/>
  ${dots}
  <rect x="24" y="66" width="72" height="38" rx="7" fill="${C.yellow}" stroke="${C.ink}" stroke-width="4"/>
  <text class="plcd" x="60" y="91" text-anchor="middle" font-family="monospace" font-weight="700" font-size="14" fill="${C.ink}">${lcdText}</text>
  ${k}
  ${grille}
</svg>`;
}

function baseSVG(){
  return `<svg viewBox="0 0 220 90" xmlns="http://www.w3.org/2000/svg">
  <path d="M40 30 L180 30 L212 58 L180 84 L40 84 L8 58 Z" transform="translate(6 4)" fill="${C.ink}"/>
  <path d="M40 30 L180 30 L212 58 L180 84 L40 84 L8 58 Z" fill="${C.pink}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M60 8 L160 8 L184 30 L160 52 L60 52 L36 30 Z" fill="${C.pink}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M74 18 L146 18 L162 30 L146 42 L74 42 L58 30 Z" fill="${C.ink}"/>
  <line x1="24" y1="60" x2="196" y2="60" stroke="${C.ink}" stroke-width="3"/>
  </svg>`;
}

return { C, phoneSVG, baseSVG };
})();
