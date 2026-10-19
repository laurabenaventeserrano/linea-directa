(() => {
'use strict';
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle = a => { for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random()*a.length)];
const digits = s => String(s).replace(/\D/g,'');
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const C = { ink:'#2A0F45', line:'#A9507E', cream:'#FFFBF4', red:'#FF7FA3', green:'#8ADB93', lav:'#DCCBFF' };
// Los fondos de las fotos: pastel, alternando para que dos vecinos no repitan.
const PASTEL = ['var(--mint)','var(--sky)','var(--butter)','var(--lav)'];

const DATA = window.LD_DATA;
const PEOPLE = DATA.candidates;
const byId = id => PEOPLE.find(p=>p.id===id);
const HOT = DATA.hotline;
const bgOf = p => { const i=PEOPLE.indexOf(p); return PASTEL[(i+Math.floor(i/4)*2)%4]; };

/* ---------------- Pantalla fija ----------------
   En ordenador el juego mide 1440×960 y se escala para caber entero (ver .staged).
   S es la escala: el teléfono la usa para seguir al ratón. */
const STAGE={w:1440,h:960};
let S=1;
function fit(){
  const on=innerWidth>=900&&innerHeight>=560;
  document.documentElement.classList.toggle('staged',on);
  S=on?Math.min(innerWidth/STAGE.w,innerHeight/STAGE.h):1;
  document.documentElement.style.setProperty('--s',S);
}
addEventListener('resize',fit); fit();

/* ---------------- Icons (los corazones del estilo aprobado) ---------------- */
const HEART='M30 50C13 37 4 29 4 18 4 10 10 4 18 4c5 0 9 3 12 7 3-4 7-7 12-7 8 0 14 6 14 14 0 11-9 19-26 32z';
const heart=(fill,inner)=>`<svg viewBox="0 0 60 54" aria-hidden="true"><path d="${HEART}" fill="${fill}" stroke="${C.line}" stroke-width="3.5" stroke-linejoin="round"/>${inner}</svg>`;
const I = {
  call:heart(C.green,`<path d="M22 17c-2 1-3 3-2 6 2 6 7 11 13 13 3 1 5 0 6-2l1-2-5-4-3 2c-3-1-6-4-7-7l2-3-4-5z" fill="${C.cream}" stroke="${C.line}" stroke-width="2" stroke-linejoin="round"/>`),
  del:heart(C.lav,`<path d="M38 22H22m6-6-6 6 6 6" fill="none" stroke="${C.line}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`),
  hang:heart(C.red,`<path d="M16 25c4-4 9-6 14-6s10 2 14 6l-1 4-6-1v-3c-4-1-10-1-14 0v3l-6 1z" fill="${C.cream}" stroke="${C.line}" stroke-width="2" stroke-linejoin="round"/>`),
  flag:`<svg viewBox="0 0 28 28" aria-hidden="true"><path d="M6 3v23" stroke="${C.line}" stroke-width="3" stroke-linecap="round"/><path d="M7 4h16l-4 5 4 5H7z" fill="${C.red}" stroke="${C.line}" stroke-width="2.5" stroke-linejoin="round"/></svg>`,
  x:`<svg viewBox="0 0 24 24" preserveAspectRatio="none" aria-hidden="true"><path d="M2 2l20 20M22 2L2 22" stroke="${C.line}" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  hearts:(n)=>I.meter(5,n),
  meter:(total,n)=>Array.from({length:total},(_,i)=>`<svg viewBox="0 0 60 54"><path d="${HEART}" fill="${i<n?C.red:C.cream}" stroke="${C.line}" stroke-width="5" stroke-linejoin="round"/></svg>`).join('')
};

/* ---------------- Hover tags ----------------
   Todo lo que se puede tocar lleva data-tip. Una sola etiqueta flotante,
   con el estilo de las etiquetas del juego, solo con ratón. */
const tip=document.createElement('div'); tip.className='tip'; tip.hidden=true; tip.setAttribute('aria-hidden','true');
document.body.appendChild(tip);
const canHover=matchMedia('(hover: hover) and (pointer: fine)');
let tipEl=null, mx=0, my=0;
function refreshTip(){ // la etiqueta va pegada al cursor: encima de la punta del dedo
  const t=tipEl&&tipEl.isConnected&&tipEl.getAttribute('data-tip');
  if(!t||!canHover.matches){ tip.hidden=true; return; }
  if(tip.textContent!==t) tip.textContent=t;
  tip.hidden=false;
  const w=tip.offsetWidth, below=my<tip.offsetHeight+14;
  tip.classList.toggle('below',below);
  tip.style.left=Math.max(6+w/2,Math.min(innerWidth-6-w/2,mx))+'px';
  tip.style.top=my+'px';
}
document.addEventListener('pointerover',e=>{ if(e.pointerType!=='mouse') return; mx=e.clientX; my=e.clientY; tipEl=e.target.closest?e.target.closest('[data-tip]'):null; refreshTip(); });
document.addEventListener('pointermove',e=>{ if(e.pointerType!=='mouse') return; mx=e.clientX; my=e.clientY; if(tipEl) refreshTip(); },{passive:true});
document.addEventListener('pointerdown',e=>{ if(e.target.closest&&e.target.closest('.ph,#titleStage')){ tipEl=null; refreshTip(); } });
document.addEventListener('click',()=>setTimeout(refreshTip,0));
addEventListener('scroll',()=>{ tip.hidden=true; },{passive:true});

/* ---------------- Pixel portraits ---------------- */
const BASE_PALETTE = { k:C.ink, e:C.ink, w:'#FBF5EA', m:'#8F1419', r:'#D3242C', R:'#8F1419', p:'#E7A6A1', G:'#7BE495', V:'#2F7A47',
  y:'#E3B341', Y:'#A97C1B', n:'#3A302A', b:'#4A5D86', B:'#33426A', s:'#F2C6A0', d:'#D99C78', h:'#3B2216', g:'#6E4630', v:'#3B2216', c:'#888', C:'#555' };
const portraitCache = {};
function portrait(p){
  if (portraitCache[p.id]) return portraitCache[p.id];
  const pal = {...BASE_PALETTE, ...p.palette};
  const g = p.pixels.map(r=>[...r]);
  for (const [y,x,str] of (p.over||[])) [...str].forEach((ch,i)=>{ if (ch!==' ' && g[y]) g[y][x+i]=ch; });
  if (p.fade) for (let y=0;y<24;y++) for (let x=14;x<24;x++){ // el ghoster se va desvaneciendo
    if (((x*7+y*13)%11)/11 < (x-13)/11*.85) g[y][x]='.';
  }
  let out = '';
  for (let y=0;y<24;y++){
    let x=0;
    while (x<24){ // une los píxeles iguales de cada fila
      const ch=g[y][x]; let w=1;
      while (x+w<24 && g[y][x+w]===ch) w++;
      if (ch!=='.') out += `<rect x="${x}" y="${y}" width="${w}" height="1.04" fill="${pal[ch]||'#f0f'}"/>`;
      x+=w;
    }
  }
  return portraitCache[p.id] = `<svg viewBox="0 0 24 24" shape-rendering="crispEdges" aria-hidden="true">${out}</svg>`;
}

/* ---------------- The telephone ----------------
   El teléfono aprobado vive en phone.js y no se toca. Aquí solo se mueve:
   descolgar, arrastrar, dejarlo en la base para colgar, teclas. */
const LP = window.LD_PHONE;
function Phone(host, opts){
  host.innerHTML=`<div class="base">${LP.baseSVG()}</div>`+
    `<div class="ph" tabindex="0" role="application" aria-label="Telephone. Drag it or tap it to pick up. Dial with the keypad. Put it back on the base to hang up.">${LP.phoneSVG('',true)}</div>`;
  const ph=host.querySelector('.ph'), lcd=ph.querySelector('.plcd');
  const pos={x:0,y:0,r:0}; let up=false, ringing=false, drag=null;
  const keys=[...ph.querySelectorAll('.k')].filter(g=>/\d/.test(g.dataset.k));
  const tag=()=>{
    ph.setAttribute('data-tip',ringing?'ANSWER':up?'DRAG TO THE BASE TO HANG UP':'PICK UP');
    keys.forEach(g=>up?g.setAttribute('data-tip','DIAL '+g.dataset.k):g.removeAttribute('data-tip'));
    refreshTip();
  };
  tag();
  const place=anim=>{ ph.classList.toggle('anim',!!anim&&!reduced()); ph.style.transform=`translate(${pos.x}px,${pos.y}px) rotate(${pos.r}deg)`; };
  const pose=(x,y,r)=>{ pos.x=x; pos.y=y; pos.r=r; if(!drag) place(true); };
  ph.addEventListener('pointerdown',e=>{
    if(e.button>0) return;
    const key=e.target.closest('.k');
    const r=ph.getBoundingClientRect();
    drag={id:e.pointerId,sx:e.clientX,sy:e.clientY,ox:pos.x,oy:pos.y,moved:false,key:key&&key.dataset.k,
          home:{l:r.left-pos.x*S,t:r.top-pos.y*S,r:r.right-pos.x*S,b:r.bottom-pos.y*S}};
    try{ph.setPointerCapture(e.pointerId)}catch(_){}
    opts.onGrab&&opts.onGrab();
    e.preventDefault();
  });
  ph.addEventListener('pointermove',e=>{
    if(!drag||e.pointerId!==drag.id) return;
    const dx=(e.clientX-drag.sx)/S, dy=(e.clientY-drag.sy)/S;
    if(!drag.moved&&Math.hypot(dx,dy)*S<7) return;
    if(!drag.moved){ drag.moved=true; ph.classList.add('drag'); ph.classList.remove('anim'); opts.onLift&&opts.onLift(); }
    // límites: que no se salga de la pantalla
    const h=drag.home;
    pos.x=Math.max((4-h.l)/S,Math.min((innerWidth-4-h.r)/S,drag.ox+dx));
    pos.y=Math.max((4-h.t)/S,Math.min(Math.max(20,(innerHeight-4-h.b)/S),drag.oy+dy));
    pos.r=Math.max(-14,Math.min(14,(e.movementX||0)*.8));
    place(false);
  });
  const end=e=>{
    if(!drag||(e&&e.pointerId!==drag.id)) return;
    const d=drag; drag=null; ph.classList.remove('drag');
    if(!d.moved){
      if(d.key&&up) return opts.onKey&&opts.onKey(d.key);
      if(!up) return opts.onTap&&opts.onTap();
      return place(true);
    }
    pos.r=up?-6:0;
    if(Math.hypot(pos.x,pos.y)<40) return opts.onDrop&&opts.onDrop(); // si lo dejas en la base, cuelgas
    place(true);
  };
  ph.addEventListener('pointerup',end); ph.addEventListener('pointercancel',end);
  ph.addEventListener('keydown',e=>{ if((e.key==='Enter'||e.key===' ')&&e.target===ph){ e.preventDefault(); e.stopPropagation(); opts.onTap&&opts.onTap(); } });
  return {
    lift(){ up=true; pose(-10,-46,-6); tag(); },
    hook(){ up=false; pose(0,0,0); tag(); },
    isUp(){ return up; },
    ring(on){ ringing=!!on; ph.classList.toggle('ring',ringing); tag(); },
    screen(t){ lcd.textContent=t; },
    led(){}, // el teléfono aprobado no tiene luz
    flash(k){ const g=ph.querySelector(`.k[data-k="${CSS.escape(k)}"]`); if(!g) return; g.classList.add('down'); setTimeout(()=>g.classList.remove('down'),130); }
  };
}

/* ---------------- Sound (WebAudio, real DTMF tones) ---------------- */
const Sound = (()=>{
  let ac=null, master=null, muted=false, dial=null;
  const unlock=()=>{
    if(!ac){ const A=window.AudioContext||window.webkitAudioContext; if(!A) return;
      ac=new A(); master=ac.createGain(); master.gain.value=.18; master.connect(ac.destination); }
    if(ac.state==='suspended') ac.resume();
  };
  const now=()=>ac?ac.currentTime:0;
  const tone=(f,t0,dur,type='sine',vol=1,f2=null)=>{
    if(!ac||muted) return;
    const o=ac.createOscillator(), g=ac.createGain();
    o.type=type; o.frequency.setValueAtTime(f,t0);
    if(f2) o.frequency.exponentialRampToValueAtTime(f2,t0+dur);
    g.gain.setValueAtTime(0,t0); g.gain.linearRampToValueAtTime(vol,t0+.01);
    g.gain.setValueAtTime(vol,t0+dur*.8); g.gain.linearRampToValueAtTime(0,t0+dur);
    o.connect(g); g.connect(master); o.start(t0); o.stop(t0+dur+.02);
  };
  const DT={1:[697,1209],2:[697,1336],3:[697,1477],4:[770,1209],5:[770,1336],6:[770,1477],7:[852,1209],8:[852,1336],9:[852,1477],'*':[941,1209],0:[941,1336],'#':[941,1477]};
  return {
    unlock,
    muted:()=>muted,
    toggle(){ muted=!muted; if(muted){ this.dialStop(); } return muted; },
    dtmf(d){ const p=DT[d]; if(!p) return; const t=now(); tone(p[0],t,.13,'sine',.8); tone(p[1],t,.13,'sine',.8); },
    dialStart(){ // tono de marcar: 350 + 440 Hz
      if(!ac||muted||dial) return;
      const g=ac.createGain(); g.gain.value=.25; g.connect(master);
      const o=[350,440].map(f=>{ const x=ac.createOscillator(); x.frequency.value=f; x.connect(g); x.start(); return x; });
      dial={g,o,t:setTimeout(()=>this.dialStop(),8000)};
    },
    dialStop(){ if(!dial) return; clearTimeout(dial.t); dial.o.forEach(x=>x.stop()); dial.g.disconnect(); dial=null; },
    ringback(){ const t=now(); tone(440,t,.7,'sine',.55); tone(480,t,.7,'sine',.55); },
    busy(){ const t=now(); for(let i=0;i<3;i++){ tone(480,t+i*.3,.15,'sine',.8); tone(620,t+i*.3,.15,'sine',.8);} },
    ring(){ const t=now(); for(let i=0;i<14;i++) tone(i%2?1040:880,t+i*.045,.04,'square',.35); },
    pick(){ tone(500,now(),.1,'triangle',.7,1000); },
    hang(){ tone(700,now(),.1,'triangle',.7,250); },
    blip(f=880){ tone(f,now(),.05,'square',.3); },
    clue(){ const t=now(); [988,1319].forEach((f,i)=>tone(f,t+i*.07,.06,'square',.25)); },
    stamp(){ const t=now(); tone(160,t,.16,'square',.6,60); tone(90,t,.2,'triangle',.8,40); },
    win(){ const t=now(); [523,659,784,1046].forEach((f,i)=>tone(f,t+.12+i*.1,.14,'square',.4)); },
    fanfare(){ const t=now(); [523,659,784,659,784,1046,1318].forEach((f,i)=>tone(f,t+i*.12,.16,'square',.42)); },
    no(){ const t=now(); [392,330,262].forEach((f,i)=>tone(f,t+i*.15,.18,'square',.4)); },
  };
})();

/* ---------------- Session ---------------- */
// G: la partida (quién está identificado). R: el caso actual (a quién buscas ahora).
let G=null, R=null;
const LIVES=3; // tres corazones: tres fallos y se acaba
const left = () => PEOPLE.filter(p=>!G.blocked.includes(p.id));
function newSession(){
  disarm();
  G={ blocked:[], clues:0, calls:0, used:{}, over:false, lives:LIVES };
  R=null;
  renderBoard();
}
function variant(cat,val){ // una frase que todavía no haya salido en esta partida
  const pool=DATA.clues[cat][val], key=cat+'.'+val;
  const used=G.used[key]=G.used[key]||[];
  let free=pool.map((_,i)=>i).filter(i=>!used.includes(i));
  if(!free.length){ used.length=0; free=pool.map((_,i)=>i); }
  const i=pick(free); used.push(i); return pool[i];
}
function newCase(){
  const pool=left();
  const target=pick(pool);
  const traits=shuffle(Object.keys(DATA.traits)).map(cat=>({cat,val:target.traits[cat]}));
  const nots=shuffle(pool.filter(p=>p!==target)).map(p=>({not:p.id}));
  R={ target:target.id, queue:[...traits,...nots], given:[], crossed:new Set(), nope:new Set() };
}
function suspects(){ // quién encaja todavía con lo que sabes
  return left().filter(p=>!R.nope.has(p.id)&&R.given.every(c=>c.cat==='msg'||(c.not?p.id!==c.not:p.traits[c.cat]===c.val)));
}
function nextClue(){
  // salta las pistas que ya no sirven para distinguir a nadie
  const alive=suspects();
  if(alive.length<2) return null;
  while(R.queue.length){
    const q=R.queue.shift();
    if(q.not){ if(alive.some(p=>p.id===q.not)) return {cat:'not', not:q.not, text:HOT.not.replace('{name}',byId(q.not).name), tag:'NOT'}; continue; }
    if(alive.some(p=>p.traits[q.cat]!==q.val)) return {cat:q.cat, val:q.val, text:variant(q.cat,q.val), tag:DATA.traits[q.cat].label};
  }
  return null;
}

/* ---------------- Board ---------------- */
function chipsHTML(p){
  return Object.entries(DATA.traits).map(([k,t])=>`<li class="chip ${k}"><b>${t.label}</b><span>${esc(t.values[p.traits[k]])}</span></li>`).join('');
}
function cardTop(p){
  return `<div class="cand-top"><span class="no">#${String(PEOPLE.indexOf(p)+1).padStart(2,'0')}</span><span class="name">${esc(p.name)}<small>${p.age}</small></span></div>`;
}
function renderBoard(){
  // La carta del juego de mesa: nombre, foto con tira de película, rasgos y el número para llamar.
  $('board').innerHTML=PEOPLE.map(p=>`
    <article class="cand" data-id="${p.id}" style="--bg:${bgOf(p)}">
      ${cardTop(p)}
      <button class="pick frame" aria-pressed="false" aria-label="Cross out ${esc(p.name)}"><i class="strip"></i><span class="pic">${portrait(p)}</span><i class="strip"></i><span class="xout">${I.x}</span><span class="stamp"></span></button>
      <ul class="chips">${chipsHTML(p)}</ul>
      <div class="rev"><span class="arch">${esc(p.reveal.archetype)}</span><span class="fl">RED FLAG: ${esc(p.reveal.flag)}</span></div>
      <button class="tel dial" aria-label="Call ${esc(p.name)}, ${esc(p.phone)}" data-tip="CALL ${esc(p.name.toUpperCase())}"><span>${esc(p.phone)}</span><small>☎ CALL</small></button>
      <button class="blk" aria-label="Block ${esc(p.name)}">✕ BLOCK</button>
    </article>`).join('');
  updateBoard();
}
function updateBoard(){
  document.querySelectorAll('#board .cand').forEach(el=>{
    const id=el.dataset.id, p=byId(id);
    const blocked=G.blocked.includes(id), nope=R&&R.nope.has(id), crossed=R&&R.crossed.has(id)&&!blocked;
    el.classList.toggle('blocked',blocked);
    el.classList.toggle('nope',!!nope&&!blocked);
    el.classList.toggle('crossed',!!crossed);
    el.classList.toggle('dialled',!blocked&&L.dialled===id);
    el.classList.toggle('live',!blocked&&L.with===id);
    el.querySelector('.stamp').textContent=blocked?'BLOCKED':nope?'WRONG ONE':'';
    const pk=el.querySelector('.pick'), dl=el.querySelector('.dial'), bk=el.querySelector('.blk');
    const off=blocked||G.over, armedHere=armed===id&&!off;
    pk.disabled=off; dl.disabled=off; bk.disabled=off||!!nope; // al que ya fallaste no se le vuelve a bloquear en este caso
    pk.setAttribute('aria-pressed',crossed?'true':'false');
    pk.setAttribute('aria-label',blocked?`${p.name}: blocked, ${p.reveal.archetype}`:`${crossed?'Bring back':'Cross out'} ${p.name}`);
    pk.dataset.tip=off?'':crossed?'BRING BACK':'CROSS OUT';
    dl.dataset.tip=off?'':`CALL ${p.name.toUpperCase()}`;
    dl.querySelector('small').textContent=blocked?'NUMBER BLOCKED':'☎ CALL';
    bk.classList.toggle('armed',armedHere);
    bk.textContent=armedHere?'SURE? TAP AGAIN':'✕ BLOCK';
    bk.dataset.tip=off||nope?'':armedHere?'WRONG ONE = −1 ♥':`BLOCK ${p.name.toUpperCase()}`;
  });
  $('hFound').textContent=`${G.blocked.length}/${PEOPLE.length}`;
  $('hMeter').innerHTML=I.meter(PEOPLE.length,G.blocked.length);
  $('hLife').innerHTML=I.meter(LIVES,G.lives);
  nextStep();
  $('hClues').textContent=G.clues;
  $('hCalls').textContent=G.calls;
  refreshTip();
}
// Bloquear pide confirmación: el primer toque arma el botón, el segundo bloquea.
let armed=null, armT=0;
function disarm(){ clearTimeout(armT); armed=null; }
$('board').addEventListener('click',e=>{
  const card=e.target.closest('.cand'); if(!card||!G||!R||G.over) return;
  const id=card.dataset.id; if(G.blocked.includes(id)) return;
  Sound.unlock();
  if(e.target.closest('.dial')){ disarm(); updateBoard(); return dialPerson(id); }
  if(e.target.closest('.blk')){
    if(armed===id){ disarm(); return blockPerson(id); }
    disarm(); armed=id; Sound.blip(420);
    armT=setTimeout(()=>{ armed=null; updateBoard(); refreshTip(); },3000);
    updateBoard(); refreshTip(); return;
  }
  if(e.target.closest('.pick')){
    R.crossed.has(id)?R.crossed.delete(id):R.crossed.add(id);
    Sound.blip(R.crossed.has(id)?520:780); updateBoard();
  }
});

/* ---------------- The CRT ---------------- */
let typing=0;
let nowClue=-1; // la pista que se está mostrando abajo, para no repetirla arriba
function say(who,text,{tag=null,cat=null,red=false,clue=-1}={}){
  clearInterval(typing);
  nowClue=clue; if(R) renderHistory();
  $('nowWho').textContent=who;
  const p=$('nowSay'); p.classList.toggle('red',red);
  p.innerHTML=(tag?`<span class="tag ${cat}">${esc(tag)}</span> `:'')+'<span class="tx"></span><span class="cur" aria-hidden="true">_</span>';
  const tx=p.querySelector('.tx');
  $('live').textContent=`${who}: ${text}`;
  if(reduced()) tx.textContent=text;
  else { let i=0; const step=Math.max(1,Math.ceil(text.length/60));
    typing=setInterval(()=>{ i=Math.min(text.length,i+step); tx.textContent=text.slice(0,i); if(i>=text.length) clearInterval(typing); },18); }
}
function renderHistory(){
  const h=$('history');
  const rows=R.given.map((c,i)=>i===nowClue?'':`<li class="${i<R.given.length-1?'prev':''}"><span class="tag ${c.cat}">${esc(c.tag)}</span><span>${esc(c.text)}</span></li>`).join('');
  h.innerHTML=rows||'<li class="none">Earlier clues show up here.</li>';
  h.scrollTop=1e6;
}
function crtState(t,red){ const s=$('crtState'); s.textContent=t; s.classList.toggle('red',!!red); }
function crtCase(){ $('hCase').textContent=`CASE ${String(G.blocked.length+1).padStart(2,'0')}/${String(PEOPLE.length).padStart(2,'0')}`; }
function glitch(){ const s=$('screen'); s.classList.remove('glitch'); void s.offsetWidth; s.classList.add('glitch'); }

/* ---------------- The line ---------------- */
// mode: idle (on hook) · tone (dial tone) · ringing (calling out) · talk · busy · incoming (it rings)
const L={offHook:false,mode:'idle',dial:'',dialled:null,with:null,timers:[]};
let P=null;
function later(fn,ms){ L.timers.push(setTimeout(fn,ms)); }
function clearTimers(){ L.timers.forEach(clearTimeout); L.timers=[]; }
const HOT_NUM=digits(HOT.number);
const numLen=()=>HOT_NUM.length;
const formatDial=d=>d.length>3?d.slice(0,3)+'-'+d.slice(3):d;
const personByNum=n=>PEOPLE.find(p=>digits(p.phone)===n);
function nextStep(){ // qué hacer ahora, en una línea, debajo de la pantalla
  let t='';
  if(G&&R&&!G.over){
    const open=left().filter(p=>!R.crossed.has(p.id)&&!R.nope.has(p.id)).length;
    if(L.mode==='incoming') t='▶ PICK UP THE PHONE';
    else if(L.mode==='ringing') t='RINGING…';
    else if(L.mode==='tone'&&L.dial) t=L.dial.length<numLen()?'▶ KEEP DIALLING':'▶ PRESS CALL';
    else if(open===1&&R.given.length) t='▶ ONE LEFT? BLOCK THEM';
    else if(!L.offHook) t='▶ PICK UP OR PRESS HOTLINE';
    else if(L.mode==='tone') t=R.given.length?'▶ CROSS OUT WHO DOESN’T FIT · CALL FOR MORE':'▶ PRESS CALL FOR A CLUE';
    else if(R.given.length) t='▶ CROSS OUT WHO DOESN’T FIT';
  }
  $('nowNext').textContent=t;
}
function setButtons(){
  $('bCall').classList.toggle('glow',(L.mode==='tone'&&L.dial.length===numLen())||L.mode==='incoming');
  $('bCall').querySelector('span').textContent=L.mode==='incoming'?'ANSWER':'CALL';
  $('bCall').dataset.tip=L.mode==='incoming'?'ANSWER':L.dial?'CALL '+formatDial(L.dial):'CALL THE HOTLINE';
  nextStep();
}
function showDial(){
  P.screen(L.dial?formatDial(L.dial):(L.mode==='tone'?'_':'555-FLAG'));
  const who=L.dial.length===numLen()?personByNum(L.dial):null;
  L.dialled=who?who.id:null;
  $('crtDial').textContent=L.dial?`DIALLING ${formatDial(L.dial)}${who?' · '+who.name.toUpperCase():L.dial===HOT_NUM?' · HOTLINE':''}`:'LINE 1';
  setButtons(); updateBoard();
}
function liftUp(){
  if(L.offHook) return;
  if(L.mode==='incoming') return answerIncoming();
  L.offHook=true; L.mode='tone'; L.dial='';
  Sound.pick(); Sound.dialStart(); P.lift(); P.led('on');
  crtState('DIAL TONE'); showDial();
}
function hangUp(silent){
  const was=L.mode;
  clearTimers(); Sound.dialStop();
  L.offHook=false; L.mode='idle'; L.dial=''; L.with=null;
  P.ring(false); P.hook(); P.led(null);
  crtState('ON HOOK'); showDial();
  if(silent) return;
  Sound.hang();
  if(was==='incoming'){ say('MISSED CALL','The hotline called. Call it back when you’re ready.'); }
  else if(was==='ringing') say('HUNG UP','You hung up before anyone answered.');
}
function readyAgain(){
  L.with=null;
  if(!L.offHook) return updateBoard();
  L.mode='tone'; L.dial='';
  Sound.dialStart(); crtState('DIAL TONE'); showDial();
}
function ensureLine(){ // descuelga si hace falta; devuelve si se puede marcar
  if(!G||!R) return false;
  if(L.mode==='incoming'){ answerIncoming(); return false; }
  if(!L.offHook) liftUp();
  else if(L.mode==='talk'||L.mode==='busy'){ clearTimers(); readyAgain(); } // cortas y vuelves a tener línea
  return L.mode==='tone';
}
function pressKey(k){
  Sound.unlock();
  if(!ensureLine()) return;
  P.flash(k); Sound.dialStop(); Sound.dtmf(k);
  if(/\d/.test(k)&&L.dial.length<numLen()) L.dial+=k;
  showDial();
}
function delKey(){
  Sound.unlock();
  if(L.mode!=='tone'||!L.dial) return;
  L.dial=L.dial.slice(0,-1); Sound.blip(600); showDial();
}
function callNow(){
  Sound.unlock();
  if(!G||!R) return;
  if(L.mode==='incoming') return answerIncoming();
  if(!L.offHook){ liftUp(); return; }
  if(L.mode!=='tone') return;
  if(!L.dial) return autoDial(HOT_NUM,true); // sin número: llamas a la línea directa
  if(L.dial.length<numLen()) return failLine('Not enough digits.');
  connect();
}
function autoDial(num,thenCall){ // marca tecla a tecla, como si lo hicieras tú
  if(L.mode==='ringing'||!ensureLine()) return;
  L.dial='';
  const keys=[...num];
  const step=()=>{ if(L.mode!=='tone') return; if(!keys.length){ if(thenCall) later(connect,180); return; } pressKey(keys.shift()); later(step,90); };
  step();
}
function dialPerson(id){
  if(L.mode==='ringing'||!ensureLine()) return;
  autoDial(digits(byId(id).phone),true);
}
function connect(){
  const num=L.dial;
  if(num===HOT_NUM){
    L.mode='ringing'; P.screen('CALLING'); crtState('CALLING HOTLINE'); setButtons();
    Sound.ringback(); later(()=>hotlineAnswers(false),1000);
    return;
  }
  const p=personByNum(num);
  if(!p) return failLine('The number you dialled is not in service.');
  if(G.blocked.includes(p.id)) return failLine(`${p.name}’s number is blocked.`);
  L.mode='ringing'; L.with=p.id; P.screen('CALLING'); crtState(`CALLING ${p.name.toUpperCase()}`); setButtons(); updateBoard();
  Sound.ringback(); later(()=>talkTo(p),1200);
}
function failLine(msg){
  L.mode='busy'; Sound.busy(); P.screen('BUSY'); crtState('BUSY',true);
  say('OPERATOR',msg,{red:true});
  later(readyAgain,1400);
}

/* ---------------- Calls ---------------- */
function hotlineAnswers(first){
  L.mode='talk'; P.screen('HOTLINE'); crtState('CONNECTED · HOTLINE'); setButtons();
  const c=nextClue();
  if(!c){ say('HOTLINE',suspects().length<2?HOT.enough:HOT.empty); later(readyAgain,1800); return; }
  R.given.push(c); G.clues++;
  updateBoard(); Sound.clue();
  say('HOTLINE · CLUE '+R.given.filter(x=>x.cat!=='msg').length,c.text,{tag:c.tag,cat:c.cat,clue:R.given.length-1});
  later(readyAgain,1600);
}
function talkTo(p){ // llamar a alguien: contesta con su frase. Para adivinar, se bloquea desde la carta.
  L.mode='talk'; P.screen(p.name.slice(0,8).toUpperCase()); crtState(`CONNECTED · ${p.name.toUpperCase()}`); setButtons();
  G.calls++;
  say(p.name.toUpperCase(),pick(p.hellos));
  updateBoard();
  later(readyAgain,2600);
}
function blockPerson(id){
  if(!G||!R||G.over) return;
  const p=byId(id);
  hangUp(true);
  if(id===R.target){
    G.blocked.push(id);
    say(p.name.toUpperCase(),p.caught||pick(DATA.caught));
    crtState('ADMIRER BLOCKED',true); P.screen('BLOCKED');
    Sound.stamp(); Sound.win(); updateBoard();
    const el=document.querySelector(`#board .cand[data-id="${id}"]`);
    el.classList.add('just'); setTimeout(()=>el.classList.remove('just'),500);
    later(()=>showReveal(p),1500);
    return;
  }
  // bloquear al que no es: pierdes un corazón y quien te quiere sigue molestando
  const t=byId(R.target);
  G.lives--; R.nope.add(id);
  Sound.stamp(); Sound.no();
  if(G.lives<=0){
    G.over=true;
    say('GAME OVER',`${p.name} didn’t even like you. And you’re out of hearts.`,{red:true});
    crtState('GAME OVER',true); P.screen('GAME OVER');
    updateBoard();
    later(()=>showLost(p,t),1600);
    return;
  }
  say('WRONG ONE',`${p.name} didn’t even like you. ${G.lives} ${G.lives===1?'heart':'hearts'} left.`,{red:true});
  crtState(`WRONG ONE · ${G.lives} ♥ LEFT`,true);
  updateBoard();
  later(()=>pester(t),1700);
}
function pester(t){ // el que te quiere no se ha enterado de nada y te vuelve a escribir. Su voz es otra pista.
  if(!G||G.over||!R||R.target!==t.id) return;
  const used=R.pestered=R.pestered||[];
  const free=t.pester.filter(x=>!used.includes(x)); const msg=pick(free.length?free:t.pester); used.push(msg);
  R.given.push({cat:'msg', text:msg, tag:'MSG'});
  Sound.ring(); P.ring(true); P.screen('NEW MSG'); setTimeout(()=>{ if(L.mode!=='incoming') P.ring(false); },900);
  say('UNKNOWN NUMBER',msg,{tag:'MSG',cat:'msg',clue:R.given.length-1});
  crtState('THEY’RE STILL TEXTING',true);
  later(()=>{ if(!L.offHook) crtState('ON HOOK'); },2600);
}
function startRinging(){
  L.mode='incoming'; P.ring(true); P.led('blink'); P.screen('RING!');
  crtState('INCOMING CALL',true); setButtons();
  say('INCOMING CALL',HOT.ring); // la línea directa dice el objetivo al llamar
  const ringOnce=()=>{ if(L.mode!=='incoming') return; Sound.ring(); later(ringOnce,1300); };
  ringOnce();
}
function answerIncoming(){
  clearTimers(); P.ring(false); Sound.pick();
  L.offHook=true; P.lift(); P.led('on');
  hotlineAnswers(true);
}
function beginCase(answered){
  clearTimers(); Sound.dialStop();
  L.offHook=false; L.mode='idle'; L.dial=''; L.with=null; P.hook();
  newCase(); renderHistory(); crtCase(); glitch(); updateBoard(); showDial();
  banner(`CASE ${String(G.blocked.length+1).padStart(2,'0')}`);
  if(answered){ answerIncoming(); return; }
  later(startRinging,reduced()?0:500);
}

let bannerT=0;
function banner(t){ // el letrero grande de cada caso, como el «ROUND 1» de una recreativa
  const b=$('banner'); $('bannerT').textContent=t;
  b.hidden=false; b.classList.remove('go'); void b.offsetWidth; b.classList.add('go');
  clearTimeout(bannerT); bannerT=setTimeout(()=>{ b.hidden=true; },1600);
}

/* ---------------- Dialogs ---------------- */
let onClose=null;
function modal(bar,html,close){
  $('mBar').textContent=bar; $('mBody').innerHTML=html; $('modal').hidden=false;
  onClose=close||null;
  const b=$('mBody').querySelector('[data-go]');
  setTimeout(()=>b&&b.focus(),40);
}
function closeModal(){ $('modal').hidden=true; const f=onClose; onClose=null; f&&f(); }
$('mBody').addEventListener('click',e=>{ if(e.target.closest('[data-go]')) { Sound.unlock(); closeModal(); } });
addEventListener('keydown',e=>{ if(e.key==='Escape'&&!$('modal').hidden){ e.preventDefault(); e.stopImmediatePropagation(); closeModal(); } }); // que Esc cierre la ventana sin colgar también

function showReveal(p){
  const r=p.reveal, last=G.blocked.length===PEOPLE.length;
  Sound.fanfare();
  modal('♥ ADMIRER BLOCKED',`
    <div class="cand rv-card" style="--bg:${bgOf(p)}">
      ${cardTop(p)}
      <div class="frame"><i class="strip"></i><span class="pic">${portrait(p)}</span><i class="strip"></i><span class="stamp">BLOCKED</span></div>
      <span class="tel"><span>${esc(p.phone)}</span></span>
    </div>
    <h2 id="mTitle">${esc(r.archetype)}</h2>
    <q>${esc(r.quote)}</q>
    <dl class="stats">${r.stats.map(([k,v])=>`<div><dt>${esc(k)}</dt><span class="lead"></span><dd>${esc(v)}</dd></div>`).join('')}</dl>
    <div class="flagbox">${I.flag}<div><small>RED FLAG</small><b>${esc(r.flag)}</b></div></div>
    <p>${esc(r.why)}</p>
    <div class="danger"><span>DANGER LEVEL</span><span class="meter" aria-hidden="true">${I.hearts(r.level)}</span><b>${esc(r.danger)}</b></div>
    <button class="btn btn-big" data-go>${last?'▶ SEE YOUR RESULTS':'▶ NEXT CALL'}</button>`,
    ()=>{ hangUp(true); if(last) showComplete(); else beginCase(false); });
}
function showComplete(){
  const score=G.clues+G.calls;
  const end=DATA.ending.find(x=>score<=x.max)||DATA.ending[DATA.ending.length-1];
  Sound.fanfare();
  modal('♥ EVERY ADMIRER BLOCKED',`
    <h2 id="mTitle">${esc(end.title)}</h2>
    <p>${esc(end.line)}</p>
    <div class="roll" aria-hidden="true">${PEOPLE.map(p=>`<span style="--bg:${bgOf(p)}">${portrait(p)}</span>`).join('')}</div>
    <div class="score"><span>${PEOPLE.length}/${PEOPLE.length} BLOCKED</span><span>${G.clues} ${G.clues===1?'CLUE':'CLUES'}</span><span>${G.calls} ${G.calls===1?'CALL':'CALLS'}</span><span>${G.lives}/${LIVES} ♥ LEFT</span></div>
    <button class="btn btn-big" data-go>▶ PLAY AGAIN</button>`,
    ()=>{ newSession(); beginCase(false); });
}
function showLost(p,t){
  modal('♥ GAME OVER',`
    <div class="cand rv-card" style="--bg:${bgOf(t)}">
      ${cardTop(t)}
      <div class="frame"><i class="strip"></i><span class="pic">${portrait(t)}</span><i class="strip"></i><span class="stamp">IT WAS ME</span></div>
      <span class="tel"><span>${esc(t.phone)}</span></span>
    </div>
    <h2 id="mTitle">Out of hearts</h2>
    <p>${esc(p.name)} didn’t even like you. It was ${esc(t.name)}: ${esc(t.reveal.archetype)}. And now they’ll never stop:</p>
    <q>${esc(pick(t.pester))}</q>
    <div class="score"><span>${G.blocked.length}/${PEOPLE.length} BLOCKED</span><span>${G.clues} ${G.clues===1?'CLUE':'CLUES'}</span><span>${G.calls} ${G.calls===1?'CALL':'CALLS'}</span></div>
    <button class="btn btn-big" data-go>▶ PLAY AGAIN</button>`,
    ()=>{ newSession(); beginCase(false); });
}
function showHelp(){
  modal('✦ HOW IT WORKS',`
    <h2 id="mTitle">Guess who likes you. Then block them.</h2>
    <ol>
      <li>Someone in the lineup likes you. The hotline calls with a clue about who. Pick up.</li>
      <li>Need more? Call the hotline again (${esc(HOT.label)}, or just press CALL).</li>
      <li>Every card shows how they text, how they make plans and what they talk about. Cross out whoever doesn’t fit.</li>
      <li>Call anyone in the lineup to hear them out. Tap their number.</li>
      <li>Know who likes you? BLOCK them. Get it right and they’re gone for good. Block someone who doesn’t like you and you lose a heart, and your admirer keeps texting you. You have three hearts.</li>
      <li>To hang up, press HANG UP or put the phone back on its base.</li>
      <li>Keys: 0–9 dial · Enter call · ← delete · Esc hang up.</li>
    </ol>
    <button class="btn y" data-go>GOT IT ▶</button>`);
}

/* ---------------- Controls ---------------- */
$('bCall').innerHTML=`${I.call}<span>CALL</span>`;
$('bDel').innerHTML=`${I.del}<span>DELETE</span>`;
$('bHang').innerHTML=`${I.hang}<span>HANG UP</span>`;
$('bHot').textContent='☎ HOTLINE';
const tips={bDel:'DELETE A DIGIT',bHang:'HANG UP',bHot:'CALL THE HOTLINE',bMute:'SOUND OFF',bHelp:'HOW TO PLAY',bRestart:'START AGAIN',startBtn:'START',tHelp:'HOW TO PLAY',tSound:'SOUND OFF'};
for(const [id,t] of Object.entries(tips)) $(id).dataset.tip=t;
$('titleStage').dataset.tip='PICK UP';
$('bCall').setAttribute('aria-label','Call'); $('bDel').setAttribute('aria-label','Delete a digit'); $('bHang').setAttribute('aria-label','Hang up');
$('bCall').addEventListener('click',callNow);
$('bDel').addEventListener('click',delKey);
$('bHang').addEventListener('click',()=>{ Sound.unlock(); if(L.offHook||L.mode==='incoming') hangUp(); });
$('bHot').addEventListener('click',()=>{ Sound.unlock(); if(L.mode==='incoming') return answerIncoming(); autoDial(HOT_NUM,true); });
$('bHelp').addEventListener('click',showHelp);
$('bMute').addEventListener('click',()=>{
  const m=Sound.toggle(); syncSound(m);
  if(!m&&L.mode==='tone'&&!L.dial) Sound.dialStart();
});
$('bRestart').addEventListener('click',()=>{
  if(!G.over&&G.blocked.length+G.clues+G.calls>0&&!confirm('Start again? Everyone you identified comes back.')) return;
  Sound.unlock(); disarm(); newSession(); beginCase(false);
});
addEventListener('keydown',e=>{
  if($('app').hidden||!$('modal').hidden||e.metaKey||e.ctrlKey||e.altKey) return;
  if(e.target.closest&&e.target.closest('button,[role=button],.ph')&&(e.key==='Enter'||e.key===' ')) return; // deja que el botón haga lo suyo
  if(/^[0-9#*]$/.test(e.key)){ e.preventDefault(); pressKey(e.key); }
  else if(e.key==='Enter'){ e.preventDefault(); callNow(); }
  else if(e.key==='Backspace'){ e.preventDefault(); delKey(); }
  else if(e.key==='Escape'){ if(L.offHook||L.mode==='incoming') hangUp(); }
});

/* ---------------- Title ---------------- */
// El teléfono aprobado en su base, con su meneo. Cogerlo (tocarlo o arrastrarlo) contesta.
{
  const tp=$('titleStage');
  tp.innerHTML=`<div class="phone">${LP.phoneSVG(HOT.label)}</div>${LP.baseSVG()}`;
  const ph=tp.querySelector('.phone');
  let held=false,sx=0,sy=0;
  tp.addEventListener('pointerdown',e=>{ held=true; tp.classList.add('held'); try{tp.setPointerCapture(e.pointerId)}catch(_){} sx=e.clientX; sy=e.clientY; Sound.unlock(); Sound.pick(); });
  tp.addEventListener('pointermove',e=>{ if(!held) return; const x=(e.clientX-sx)/S, y=(e.clientY-sy)/S; ph.style.transform=`translate(${x}px,${y}px) rotate(${x*.08}deg)`; });
  const release=()=>{ if(!held) return; held=false; tp.classList.remove('held'); ph.style.transform=''; start(); };
  tp.addEventListener('pointerup',release); tp.addEventListener('pointercancel',()=>{ held=false; tp.classList.remove('held'); ph.style.transform=''; });
}
let ringT=0;
const titleRing=()=>{ Sound.ring(); ringT=setTimeout(titleRing,1300); };
$('title').addEventListener('pointerdown',e=>{ if(!ringT&&!e.target.closest('#titleStage,.menu')){ Sound.unlock(); titleRing(); } },{once:true});

// Portada: el tablero. Un camino crema con casillas de corazón donde están las fichas
// de todos, cuatro zonas con su textura y su icono dentro, y cartas sueltas encima.
{
  const W=1440, H=960, cx=W/2, cy=H/2, L='#A9507E';
  const ell=(rx,ry,deg,f=1)=>{ const a=deg*Math.PI/180; return [cx+rx*f*Math.cos(a), cy+ry*f*Math.sin(a)]; };
  const ICON={ // iconos de las zonas, con el trazo del juego
    cafe:`<svg viewBox="0 0 30 30"><path d="M6 12h14v7a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6z" fill="#FFFBF4" stroke="${L}" stroke-width="2.5" stroke-linejoin="round"/><path d="M20 14h2a3 3 0 0 1 0 6h-2" fill="none" stroke="${L}" stroke-width="2.5"/><path d="M10 4c-2 2 2 3 0 6M15 4c-2 2 2 3 0 6" fill="none" stroke="${L}" stroke-width="2" stroke-linecap="round"/></svg>`,
    gym:`<svg viewBox="0 0 30 30"><rect x="3" y="9" width="5" height="12" rx="1.5" fill="#FF7FA3" stroke="${L}" stroke-width="2.5"/><rect x="22" y="9" width="5" height="12" rx="1.5" fill="#FF7FA3" stroke="${L}" stroke-width="2.5"/><path d="M8 15h14" stroke="${L}" stroke-width="3"/></svg>`,
    park:`<svg viewBox="0 0 30 30"><circle cx="15" cy="12" r="8" fill="#8ADB93" stroke="${L}" stroke-width="2.5"/><path d="M15 20v7" stroke="${L}" stroke-width="3" stroke-linecap="round"/></svg>`,
    disco:`<svg viewBox="0 0 30 30"><path d="M15 2v5" stroke="${L}" stroke-width="2"/><circle cx="15" cy="17" r="10" fill="#DCCBFF" stroke="${L}" stroke-width="2.5"/><path d="M5 17h20M15 7v20M8 11h14M8 23h14" stroke="${L}" stroke-width="1.5"/></svg>`
  };
  const ZONES=[ // nombre, color, textura, color de la cinta, icono
    ['THE CAFÉ','#C3F0DF','pDots','#FFF0B3','cafe'],['THE GYM','#C9E2FF','pStripes','#FFB3D1','gym'],
    ['THE PARK','#FFF0B3','pChecks','#C3F0DF','park'],['THE DISCO','#DCCBFF','pHearts','#FFF0B3','disco']];
  const Z={x:580,y:380}, T={x:630,y:412}; // zonas · camino de las fichas
  let svg=`<defs>
    <pattern id="pDots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="2.4" fill="${L}" opacity=".22"/><circle cx="15" cy="15" r="2.4" fill="${L}" opacity=".22"/></pattern>
    <pattern id="pStripes" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="18" fill="${L}" opacity=".12"/></pattern>
    <pattern id="pChecks" width="28" height="28" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#FFFBF4" opacity=".6"/><rect x="14" y="14" width="14" height="14" fill="#FFFBF4" opacity=".6"/></pattern>
    <pattern id="pHearts" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M10 12c-2-3-6-2-6 1.5 0 2.5 3 4.5 6 7 3-2.5 6-4.5 6-7 0-3.5-4-4.5-6-1.5z" fill="${L}" opacity=".2"/></pattern>
  </defs>`;
  // el camino: una banda crema con borde y una línea discontinua
  svg+=`<ellipse cx="${cx}" cy="${cy}" rx="${T.x+52}" ry="${T.y+46}" fill="#FFFBF4" stroke="${L}" stroke-width="3"/>`+
       `<ellipse cx="${cx}" cy="${cy}" rx="${T.x}" ry="${T.y}" fill="none" stroke="${L}" stroke-width="2.5" stroke-dasharray="4 12" stroke-linecap="round" opacity=".55"/>`+
       `<ellipse cx="${cx}" cy="${cy}" rx="${T.x-52}" ry="${T.y-46}" fill="#FFD1E4" stroke="${L}" stroke-width="3"/>`;
  ZONES.forEach(([,fill,pat],i)=>{
    const a0=i*90+45, a1=a0+90; let d=`M${cx} ${cy}`;
    for(let k=0;k<=18;k++){ const [x,y]=ell(Z.x-60,Z.y-44,a0+(a1-a0)*k/18); d+=` L${x.toFixed(1)} ${y.toFixed(1)}`; }
    svg+=`<path d="${d} Z" fill="${fill}" stroke="${L}" stroke-width="3" stroke-linejoin="round"/><path d="${d} Z" fill="url(#${pat})"/>`;
  });
  // casillas de corazón entre ficha y ficha
  const HP='M0 -3c-3-4-9-3-9 2 0 4 5 7 9 10 4-3 9-6 9-10 0-5-6-6-9-2z';
  for(let i=0;i<PEOPLE.length;i++){ const [x,y]=ell(T.x,T.y,90+(i+.5)*360/PEOPLE.length);
    svg+=`<path d="${HP}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(1.4)" fill="${['#FF7FA3','#DCCBFF','#FFF0B3'][i%3]}" stroke="${L}" stroke-width="1.8" stroke-linejoin="round"/>`; }
  $('zones').innerHTML=svg;
  // las cintas con el nombre de cada zona (a medio camino entre la hoja y el camino)
  $('zlabels').innerHTML=ZONES.map(([t,,,bg,ic],i)=>{ const [x,y]=ell(Z.x-60,Z.y-44,i*90+90,.72);
    const pos=[[0,58],[15,130],[0,-58],[-15,-140]][i]; // fuera del teléfono y de las cartas
    return `<span class="zl" style="left:${(x+pos[0])/W*100}%;top:${(y+pos[1])/H*100}%;--r:${[-3,-8,4,7][i]}deg;--zb:${bg}">${ICON[ic]}${t}</span>`; }).join('');
  // las fichas sobre el camino, mirando hacia fuera pero legibles
  $('ring').innerHTML=PEOPLE.map((p,i)=>{
    const deg=90+i*360/PEOPLE.length, a=deg*Math.PI/180;
    const [x,y]=ell(T.x,T.y,deg);
    let r=Math.atan2(Math.sin(a)/T.y,Math.cos(a)/T.x)*180/Math.PI-90;
    if(r<-180) r+=360; if(r>90) r-=180; if(r<-90) r+=180;
    return `<div class="tk" style="left:${x/W*100}%;top:${y/H*100}%;--r:${(r*.35).toFixed(1)}deg;--i:${i};--bg:${bgOf(p)}">`+
      `<div class="frame"><i class="strip"></i><span class="pic">${portrait(p)}</span><i class="strip"></i></div><b>${esc(p.name.toUpperCase())}</b></div>`;
  }).join('');
  // cartas sueltas sobre el tablero, como si alguien las hubiera dejado ahí
  const SPOTS=[[1190,480,6],[880,96,-6],[560,866,7],[1196,836,-5],[262,846,-9]];
  $('scatter').innerHTML=shuffle([...PEOPLE]).slice(0,SPOTS.length).map((p,i)=>{ const [x,y,r]=SPOTS[i];
    return `<div class="cand scard" style="left:${x/W*100}%;top:${y/H*100}%;--r:${r}deg;--i:${i};--bg:${bgOf(p)}">${cardTop(p)}`+
      `<div class="frame"><i class="strip"></i><span class="pic">${portrait(p)}</span><i class="strip"></i></div>`+
      `<span class="tel"><span>${esc(p.phone)}</span></span></div>`; }).join('');
}
// El menú: el corazón marca la opción; flechas para moverse, Enter para elegir
const MENU=[...document.querySelectorAll('#menu .mi')];
let menuSel=0;
function selectMenu(i,focus){ menuSel=(i+MENU.length)%MENU.length; MENU.forEach((m,j)=>m.classList.toggle('sel',j===menuSel)); if(focus) MENU[menuSel].focus(); }
MENU.forEach((m,i)=>{ m.addEventListener('pointerenter',()=>selectMenu(i)); m.addEventListener('focus',()=>selectMenu(i)); });
function syncSound(m){
  $('tSound').textContent=m?'SOUND: OFF':'SOUND: ON'; $('tSound').setAttribute('aria-pressed',m); $('tSound').dataset.tip=m?'SOUND ON':'SOUND OFF';
  $('bMute').textContent=m?'♪ OFF':'♪ ON'; $('bMute').setAttribute('aria-pressed',m); $('bMute').dataset.tip=m?'SOUND ON':'SOUND OFF';
  $('bMute').setAttribute('aria-label',m?'Sound off':'Sound on');
}
$('tHelp').addEventListener('click',()=>{ Sound.unlock(); Sound.blip(780); clearTimeout(ringT); ringT=0; showHelp(); });
$('tSound').addEventListener('click',()=>{ Sound.unlock(); const m=Sound.toggle(); if(m){ clearTimeout(ringT); ringT=0; } else Sound.blip(780); syncSound(m); });
addEventListener('keydown',e=>{
  if($('title').hidden||!$('modal').hidden||e.metaKey||e.ctrlKey||e.altKey) return;
  if(e.key==='ArrowDown'||e.key==='ArrowUp'){ e.preventDefault(); Sound.unlock(); Sound.blip(660); selectMenu(menuSel+(e.key==='ArrowDown'?1:-1),true); }
  else if((e.key==='Enter'||e.key===' ')&&!(e.target.closest&&e.target.closest('button'))){ e.preventDefault(); MENU[menuSel].click(); }
});
function start(){
  clearTimeout(ringT);
  Sound.unlock();
  $('title').hidden=true; $('app').hidden=false;
  P=Phone($('stage'),{
    onKey:k=>pressKey(k),
    onLift:()=>{ Sound.unlock(); if(L.mode==='incoming') answerIncoming(); else if(!L.offHook) liftUp(); },
    onDrop:()=>{ if(L.offHook||L.mode==='incoming') hangUp(); else P.hook(); },
    onTap:()=>{ Sound.unlock(); if(L.mode==='incoming') answerIncoming(); else if(!L.offHook) liftUp(); else hangUp(); }
  });
  newSession();
  beginCase(true);
  scrollTo(0,0);
}
$('startBtn').addEventListener('click',start);
})();
