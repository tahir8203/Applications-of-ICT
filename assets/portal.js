/* ICT-1013 portal layer: app shell (tab bar, top bar, search, toasts), student dashboard, practice centre,
   web-journey visualizer, resources, profile. Loaded before app.js; uses window.ICTApp lazily. */
(function(){
const $=(q,r=document)=>r.querySelector(q), $$=(q,r=document)=>[...r.querySelectorAll(q)];
const A=()=>window.ICTApp, T=()=>window.ICTTools, D=()=>window.ICTData;
const app=()=>$('#app');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const strip=s=>String(s||'').replace(/<[^>]+>/g,'');
const IN_APP=()=>!!window.AndroidApp;
const APK='https://github.com/tahir8203/Applications-of-ICT/releases/latest/download/ICT-1013.apk';
const SITE='https://applications-of-ict.vercel.app/';

/* ---------- portal storage ---------- */
const PK='ict-portal-v1';
const blank=()=>({name:'',roll:'',start:'',skip:0,xp:0,days:{},notes:{},best:{},got:{},cnt:{},bestStreak:0});
let ps=blank(); try{ ps=Object.assign(ps, JSON.parse(localStorage.getItem(PK)||'{}')); }catch(e){}
const save=()=>{ try{ localStorage.setItem(PK, JSON.stringify(ps)); }catch(e){} };
const dkey=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const today=()=>dkey(new Date());
function streak(){ let n=0; const d=new Date(); while(ps.days[dkey(d)]){ n++; d.setDate(d.getDate()-1); } return n; }
function markDay(){ if(!ps.days[today()]){ ps.days[today()]=1; const s=streak(); if(s>ps.bestStreak) ps.bestStreak=s; save(); } }
function curWeek(){ if(!ps.start) return 0; const s=new Date(ps.start+'T00:00:00'); if(isNaN(s)) return 0; const w=Math.floor((Date.now()-s.getTime())/6048e5)+1; return w<1?0:Math.min(w,17); }

/* ---------- levels / XP ---------- */
const LV=['Digital Beginner','Smart Searcher','Document Maker','Cloud Collaborator','Connected Learner','Safe Surfer','Ethics Champion','ICT Master'];
const LVXP=250;
const lvl=()=>Math.min(Math.floor(ps.xp/LVXP), LV.length-1);
function addXP(n, why){ const before=lvl(); ps.xp=Math.max(0,ps.xp+n); save(); if(n>0) toast(`<b>+${n} XP</b> · ${esc(why)}`); if(lvl()>before){ setTimeout(()=>{ toast(`🎉 Level up: <b>${LV[lvl()]}</b>`); confetti(); },500); } }
function once(key, fn){ if(ps.got[key]) return false; ps.got[key]=1; save(); fn(); return true; }

/* ---------- feedback: haptics, toast, confetti ---------- */
function haptic(ms){ try{ if(IN_APP()&&AndroidApp.haptic) AndroidApp.haptic(ms||12); else if(navigator.vibrate) navigator.vibrate(ms||10); }catch(e){} }
function toast(html){ let box=$('#toasts'); if(!box) return; const t=document.createElement('div'); t.className='toast'; t.innerHTML=html; box.append(t); setTimeout(()=>t.classList.add('out'),2600); setTimeout(()=>t.remove(),3100); }
function confetti(){ if(matchMedia('(prefers-reduced-motion:reduce)').matches) return; const c=document.createElement('div'); c.className='confetti'; const col=['#3b82f6','#22d3ee','#34d399','#fbbf24','#a78bfa','#f87171'];
  for(let i=0;i<46;i++){ const p=document.createElement('i'); p.style.cssText=`left:${Math.random()*100}%;background:${col[i%col.length]};animation-delay:${Math.random()*.5}s;animation-duration:${1.6+Math.random()*1.2}s;transform:rotate(${Math.random()*360}deg)`; c.append(p); }
  document.body.append(c); setTimeout(()=>c.remove(),3200); }

/* ---------- small UI helpers ---------- */
function ring(p, big, sub){ return `<div class="ringw"><svg class="ring" viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs><circle class="rb" cx="50" cy="50" r="42"/><circle class="rf" cx="50" cy="50" r="42" stroke-dasharray="264" stroke-dashoffset="264" data-p="${p}"/></svg><div class="rc"><b>${big}</b><span>${sub||''}</span></div></div>`; }
function animate(root){
  requestAnimationFrame(()=>requestAnimationFrame(()=>{ $$('.rf[data-p]',root).forEach(c=>{ c.style.strokeDashoffset=264*(1-Math.min(100,+c.dataset.p)/100); }); $$('.xbar i[data-w]',root).forEach(b=>b.style.width=b.dataset.w+'%'); }));
  $$('[data-count]',root).forEach(el=>{ const n=+el.dataset.count, suf=el.dataset.suf||''; if(!n){ el.textContent='0'+suf; return; } const t0=performance.now(); const tick=t=>{ const k=Math.min(1,(t-t0)/900); el.textContent=Math.round(n*(1-Math.pow(1-k,3)))+suf; if(k<1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
}
function sheet(html, cls){ const w=document.createElement('div'); w.className='sheetw '+(cls||''); w.innerHTML=`<div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>${html}</div>`; w.addEventListener('click',e=>{ if(e.target===w||e.target.closest('[data-close]')) closeSheet(w); }); document.body.append(w); requestAnimationFrame(()=>w.classList.add('open')); return w; }
function closeSheet(w){ if(!w) return; w.classList.remove('open'); setTimeout(()=>w.remove(),260); }
const shuffle=a=>{ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
const pick=a=>a[Math.floor(Math.random()*a.length)];
let cleanups=[]; const onLeave=f=>cleanups.push(f);
function bank(filter){ const out=[]; A().sessions.forEach(s=>{ if(filter&&!filter(s)) return; (s.quiz||[]).forEach(q=>out.push({q,s})); ((s.assessment&&s.assessment.mcq)||[]).forEach(q=>out.push({q,s})); }); return out; }

/* ---------- shell: tab bar, toasts, header ---------- */
const ICON={home:'<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',learn:'<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-4a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h5z"/>',practice:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',tools:'<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3"/><path d="M7.5 14h9"/>',me:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'};
const TABS=[['home','#/','Home'],['learn','#/sessions','Learn'],['practice','#/practice','Practice'],['tools','#/tools','Tools'],['me','#/me','Me']];
const TABOF={'':'home',sessions:'learn',s:'learn',practice:'practice',flash:'practice',tools:'tools',journey:'tools',me:'me',bookmarks:'me'};
const TITLES={'':'Applications of ICT',sessions:'Sessions',practice:'Practice',tools:'Lab tools',journey:'Web journey',sheets:'Resources',me:'My profile',glossary:'Glossary',flash:'Flashcards',outline:'Course outline',bookmarks:'Progress',assess:'Assessments',revision:'Revision'};
function buildShell(){
  const nav=document.createElement('nav'); nav.className='tabbar'; nav.id='tabbar'; nav.setAttribute('aria-label','App navigation');
  nav.innerHTML=TABS.map(t=>`<a class="tab" href="${t[1]}" data-t="${t[0]}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON[t[0]]}</svg><span>${t[2]}</span></a>`).join('');
  document.body.append(nav);
  nav.addEventListener('click',e=>{ const a=e.target.closest('.tab'); if(!a) return; haptic(8); if(a.getAttribute('href')===(location.hash||'#/')) window.scrollTo({top:0,behavior:'smooth'}); });
  const tb=document.createElement('div'); tb.id='toasts'; tb.setAttribute('aria-live','polite'); document.body.append(tb);
  const rp=document.createElement('div'); rp.id='rprog'; rp.innerHTML='<i></i>'; document.body.append(rp);
  const bb=$('#backBtn'); if(bb) bb.onclick=()=>{ haptic(8); if(history.length>1) history.back(); else location.hash='#/'; };
  const sb=$('#searchBtn'); if(sb) sb.onclick=openSearch;
  document.addEventListener('keydown',e=>{ if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){ e.preventDefault(); openSearch(); } });
  document.addEventListener('pointerdown',e=>{ const b=e.target.closest('.btn,.tile,.op,.tab,.qopt'); if(b){ b.classList.add('tap'); setTimeout(()=>b.classList.remove('tap'),180); } },{passive:true});
  if(IN_APP()) document.documentElement.classList.add('inapp');
  if('serviceWorker' in navigator && !IN_APP() && location.protocol==='https:') addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
}
let installEvt=null; addEventListener('beforeinstallprompt',e=>{ e.preventDefault(); installEvt=e; });

function afterRoute(h){
  cleanups.forEach(f=>{ try{f()}catch(e){} }); cleanups=[];
  markDay();
  const k=h[0]||'', tab=TABOF[k];
  $$('#tabbar .tab').forEach(a=>a.classList.toggle('on', a.dataset.t===tab));
  const root=['','sessions','practice','tools','me'].includes(k) && !h[1];
  document.body.classList.toggle('sub', !root); document.body.classList.toggle('homepg', k==='');
  const bb=$('#backBtn'); if(bb) bb.hidden=root;
  let title=TITLES[k]||'Applications of ICT'; if(k==='s'){ const s=A().sess(h[1]); if(s) title=A().label(s); }
  if(k==='practice'&&h[1]) title=({quick:'Quick quiz',mid:'Midterm mock',final:'Final mock',phish:'Phishing spotter',keys:'Shortcut trainer',xl:'Formula challenge',match:'Term match'}[h[1]])||title;
  const pt=$('#ptitle'); if(pt) pt.textContent=title;
  document.title=(k===''?'':title+' · ')+'Applications of ICT · ICT-1013';
  const me=$('#meBtn'); if(me) me.textContent=ps.name?ps.name.trim()[0].toUpperCase():'👤';
  $$('#nav a').forEach(a=>{ const hr=a.getAttribute('href'); a.classList.toggle('on', hr==='#/'+k || (k==='s'&&hr==='#/sessions') || (k==='journey'&&hr==='#/tools') || ((k==='flash'||k==='glossary')&&hr==='#/revision')); });
  const el=app(); el.classList.remove('pg'); void el.offsetWidth; el.classList.add('pg');
  $('#rprog').classList.remove('show');
  if(k==='s') enhanceStudy(h[1]);
  if(k==='tools') enhanceTools();
  if(k==='revision') enhanceRevision();
  animate(el);
  if(jump){ const j=jump; jump=null; setTimeout(()=>{ const t=document.getElementById(j); if(t){ t.scrollIntoView({block:'start'}); t.classList.add('flashhi'); setTimeout(()=>t.classList.remove('flashhi'),1600); } },120); }
  if(k==='' && !ps.name && !ps.skip) setTimeout(onboard,500);
}
let jump=null;

/* ---------- study page extras: notes, reading progress ---------- */
function enhanceStudy(id){
  const s=A().sess(id), el=app(); if(!s) return; const terms=$('#terms',el); if(!terms) return;
  const box=document.createElement('div'); box.innerHTML=`<div class="card notes" id="notes"><h2>📝 My notes</h2><p class="tiny">Private to this device. Saved automatically.</p><textarea id="noteTa" placeholder="Write your own summary, questions for the teacher, or exam reminders…">${esc(ps.notes[s.id]||'')}</textarea><div class="tiny" id="noteSt"></div></div><br>`;
  terms.before(...box.childNodes);
  let tm; $('#noteTa',el).oninput=e=>{ clearTimeout(tm); tm=setTimeout(()=>{ const v=e.target.value.trim(); if(v) ps.notes[s.id]=e.target.value; else delete ps.notes[s.id]; save(); $('#noteSt',el).textContent='Saved ✓'; },500); };
  const toc=$('.toc',el); if(toc){ const a=document.createElement('a'); a.href='#notes'; a.textContent='📝 My notes'; a.onclick=e=>{ e.preventDefault(); $('#notes',el).scrollIntoView({behavior:'smooth'}); }; toc.append(a); }
  const bar=$('#rprog'), fill=$('i',bar); bar.classList.add('show');
  const onS=()=>{ const max=document.documentElement.scrollHeight-innerHeight; fill.style.width=(max>0?Math.min(100,scrollY/max*100):0)+'%'; };
  addEventListener('scroll',onS,{passive:true}); onS(); onLeave(()=>removeEventListener('scroll',onS));
}
function enhanceTools(){ const tb=$('.shead .toolbar',app()); if(tb && !$('#pvLink',tb)){ const a=document.createElement('a'); a.className='btn sm pri'; a.id='pvLink'; a.href='#/journey'; a.textContent='🌐 Web journey visualizer'; tb.prepend(a); } }
function enhanceRevision(){ const tb=$('.shead .toolbar',app()); if(tb && !$('#rvX',tb)){ const f=document.createElement('span'); f.id='rvX'; f.style.display='contents'; f.innerHTML='<a class="btn" href="#/glossary">📘 Glossary</a><a class="btn" href="#/sheets">📑 Cheat sheets</a><a class="btn" href="#/practice">🎯 Practice</a>'; tb.append(f); } }

/* ---------- hooks from app.js ---------- */
function onDone(s,on){ haptic(18); if(on){ if(!once('d'+s.id,()=>addXP(50,'Session completed'))) toast('✔ Marked as completed'); confetti(); const all=A().sessions.every(x=>A().st.done[x.id]); if(all) setTimeout(()=>toast('🏆 Whole course completed. Well done!'),900); } else toast('Marked as not completed'); }
function onQuiz(s,r,n){ haptic(14); once('k'+s.id,()=>{ if(r) addXP(r*10,`Knowledge check ${r}/${n}`); }); if(r===n) confetti(); }
function onAssess(s,r,n){ once('a'+s.id,()=>{ if(r) addXP(r*5,`${s.assessment.title} ${r}/${n}`); }); }
function onPres(on){ document.body.classList.toggle('presenting',on); try{ if(IN_APP()&&AndroidApp.keepAwake) AndroidApp.keepAwake(!!on); if(!on&&IN_APP()&&AndroidApp.orient) AndroidApp.orient('auto'); }catch(e){}
  if(on && IN_APP() && AndroidApp.orient){ const hd=$('#pres .phead'); if(hd && !$('#pRot',hd)){ const b=document.createElement('button'); b.className='iconbtn'; b.id='pRot'; b.title='Rotate screen'; b.setAttribute('aria-label','Rotate screen'); b.textContent='⟳'; let land=false; b.onclick=()=>{ land=!land; AndroidApp.orient(land?'landscape':'auto'); }; const x=$('#pX',hd); x?x.before(b):hd.append(b); } } }
function reset(){ ps=Object.assign(blank(),{name:ps.name,roll:ps.roll,start:ps.start,skip:ps.skip}); save(); }

/* ---------- onboarding ---------- */
function onboard(){ if($('.sheetw')) return;
  const w=sheet(`<div class="ob"><div class="oblogo">ICT</div><h2>Welcome to Applications of ICT</h2><p class="muted">Set up your student portal. Everything is saved only on this device.</p>
  <label>Your name<input id="obN" type="text" autocomplete="name" placeholder="e.g. Ali Ahmad" maxlength="40"></label>
  <label>Roll number <span class="tiny">(optional)</span><input id="obR" type="text" placeholder="e.g. BSPSY-24-014" maxlength="30"></label>
  <label>Semester start date <span class="tiny">(optional, shows the current week)</span><input id="obS" type="date"></label>
  <div class="toolbar"><button class="btn pri" id="obGo">Start learning →</button><button class="btn" id="obSkip">Skip</button></div></div>`);
  $('#obGo',w).onclick=()=>{ ps.name=$('#obN',w).value.trim(); ps.roll=$('#obR',w).value.trim(); ps.start=$('#obS',w).value; ps.skip=1; save(); closeSheet(w); haptic(); home(); afterRoute(['']); if(ps.name) toast(`Welcome, <b>${esc(ps.name)}</b> 👋`); };
  $('#obSkip',w).onclick=()=>{ ps.skip=1; save(); closeSheet(w); };
}


/* ---------- web journey helpers + mini journey (home hero) ---------- */
function fakeIP(host){ let h=7; for(const c of host) h=(h*31+c.charCodeAt(0))>>>0; return '203.0.113.'+(h%200+10); }
function parseAddr(v){ v=String(v||'').trim(); if(!v) throw new Error('Type a web address first.'); if(!/^[a-z][a-z0-9+.-]*:\/\//i.test(v)) v='https://'+v;
  let u; try{ u=new URL(v); }catch(e){ throw new Error('That does not look like a web address.'); }
  if(!/^https?:$/.test(u.protocol)) throw new Error('Use an address that starts with http:// or https://');
  const host=u.hostname.toLowerCase(), L=host.split('.'); if(L.length<2||L.some(x=>!x)) throw new Error('A domain name needs a dot, for example university.example');
  const two=L.length>=3 && /^(edu|com|org|gov|net|ac|co)$/.test(L[L.length-2]) && L[L.length-1].length===2, nt=two?2:1;
  return {secure:u.protocol==='https:', scheme:u.protocol.replace(':',''), host, tld:L.slice(-nt).join('.'), name:L[L.length-nt-1], sub:L.slice(0,-nt-1).join('.'), path:u.pathname||'/', query:u.search.replace(/^\?/,''), ip:fakeIP(host)}; }
function browserMock(a,body){ return `<div class="mock"><div class="mockbar"><span class="${a.secure?'lk':'nlk'}">${a.secure?'🔒':'⚠️ Not secure'}</span><span class="murl">${esc(a.host+(a.path==='/'?'':a.path))}</span></div><div class="mockpg">${body}</div></div>`; }
function miniJourney(el){
  let a; try{ a=parseAddr('https://lms.university.example/courses'); }catch(e){ return; }
  const st=[['Address','<div class="mp-src mp-url">'+'lms.university.example'.split('').map((c,i)=>`<span style="animation-delay:${i*40}ms">${esc(c)}</span>`).join('')+'</div><p class="tiny">You type a name that is easy for people to remember.</p>'],
   ['DNS','<div class="mp-tok"><span class="tkc" style="animation-delay:0ms"><b>lms.university.example</b><i>name</i></span><span class="tkc" style="animation-delay:260ms"><b>→</b><i>lookup</i></span><span class="tkc" style="animation-delay:520ms"><b>'+a.ip+'</b><i>IP address</i></span></div><p class="tiny">DNS is the internet\'s phone book: it turns the name into a number.</p>'],
   ['Request','<pre class="code mp-code">'+['GET /courses HTTP/1.1','Host: lms.university.example','🔒 sent inside an encrypted HTTPS connection'].map((c,i)=>`<span style="animation-delay:${i*260}ms">${esc(c)}</span>`).join('\n')+'</pre><p class="tiny">Your browser asks the server for the page.</p>'],
   ['Page',browserMock(a,'<i class="b1"></i><i class="b2"></i><i class="b3"></i>')+'<p class="tiny">The server answers; the browser builds the page from HTML, CSS and JavaScript.</p>']];
  el.innerHTML=`<div class="mp-head">${st.map((s,i)=>`<button data-i="${i}">${s[0]}</button>`).join('<i>›</i>')}</div><div class="mp-body" id="mpBody"></div><a class="btn sm" href="#/journey">🌐 Try your own address →</a>`;
  let i=0, tm; const show=k=>{ i=k; $('#mpBody',el).innerHTML=`<div class="mp-stage">${st[k][1]}</div>`; $$('.mp-head button',el).forEach((b,j)=>b.classList.toggle('on',j===k)); };
  const run=()=>{ tm=setInterval(()=>show((i+1)%st.length),3400); };
  el.onclick=e=>{ const b=e.target.closest('.mp-head button'); if(b){ clearInterval(tm); show(+b.dataset.i); run(); } };
  show(0); run(); onLeave(()=>clearInterval(tm));
}

/* ---------- HOME: student dashboard ---------- */
function home(){
  const a=A(), S=a.sessions, st=a.st, p=a.pct(), doneN=S.filter(s=>st.done[s.id]).length;
  const hr=new Date().getHours(), greet=hr<12?'Good morning':hr<17?'Good afternoon':'Good evening';
  const last=st.last&&a.sess(st.last.s), wk=curWeek(), sk=streak(), L=lvl();
  let next=S.filter(s=>!st.done[s.id]); if(wk){ const cur=next.filter(s=>s.week===wk); next=cur.concat(next.filter(s=>s.week!==wk)); } next=next.slice(0,4);
  const ups=S.filter(s=>s.assessment&&!st.done[s.id]).slice(0,3);
  const B=bank(), qd=B.length?B[[...today()].reduce((h,c)=>(h*31+c.charCodeAt(0))>>>0,7)%B.length]:null;
  const tiles=[['#/sessions','📚','Sessions','30 + mid & final'],['#/w/'+((next[0]||S[0]).id),'▶️','Watch','animated lecture'],['#/practice','🎯','Practice','quizzes & games'],['#/journey','🌐','Web journey','how a page reaches you'],['#/tools','🧪','Lab tools','password · APA · stats'],['#/sheets','📑','Cheat sheets','shortcuts & rules'],['#/flash','🃏','Flashcards','key terms'],['#/assess','📝','Assessments','quizzes · assignments'],['#/revision','🔁','Revision','all key points'],['#/glossary','📘','Glossary','every term'],['#/sheets/viva','🎤','Viva Q&A','oral exam prep'],['#/sheets/today','🚀','ICT today','AI, passkeys, deepfakes'],['#/sheets/toolbox','🆘','Help & tools','if something goes wrong'],['#/outline','🗓️','Outline','calendar & policies']];
  const weeks=[]; for(let w=1;w<=17;w++) weeks.push({w,list:S.filter(s=>s.week===w)});
  app().innerHTML=`
  <section class="dhero"><div class="wrap dheroGrid"><div>
    <span class="chip">${wk?`📅 Week ${wk} of 17 · `:''}ICT-1013 · BS Psychology · 3 Credit Hours</span>
    <h1>${greet}${ps.name?`, <span>${esc(ps.name.split(' ')[0])}</span>`:''} 👋</h1>
    <p class="lead">${doneN===0?'Your Applications of ICT portal: animated lectures, practice games, lab tools and exam preparation in one place.':p===100?'You have completed the whole course. Keep revising with practice quizzes and cheat sheets.':`You have completed <b>${doneN}</b> of ${S.length} units. Keep going!`}</p>
    <div class="cta">${last?`<a class="btn pri" href="#/p/${last.id}/${st.last.k}">⏯ Resume ${esc(a.short(last))} · slide ${st.last.k}</a>`:`<a class="btn pri" href="#/s/1">Start Session 1 →</a>`}<a class="btn watch" href="#/w/${(next[0]||S[0]).id}">▶ Watch next lecture</a><a class="btn" href="#/practice/quick">🎯 Quick quiz</a>${IN_APP()?'':`<a class="btn dl" href="${APK}">📱 Android app</a>`}</div>
  </div>
  <div class="card mini" id="mini" aria-label="Animated journey of a web request"></div></div></section>
  <div class="wrap dash">
    <div class="dgrid">
      <a class="card pcard" href="#/me">${ring(p,`<span data-count="${p}" data-suf="%">0%</span>`,'complete')}<div class="grow"><div class="tiny">LEVEL ${L+1}</div><h3>${LV[L]}</h3><div class="xbar"><i data-w="${L>=LV.length-1?100:Math.round(ps.xp%LVXP/LVXP*100)}"></i></div><div class="tiny"><b data-count="${ps.xp}">0</b> XP${L<LV.length-1?` · ${LVXP-ps.xp%LVXP} to ${LV[L+1]}`:''}</div></div></a>
      <div class="card statc"><div><b>🔥 <span data-count="${sk}">0</span></b><span>day streak</span></div><div><b data-count="${doneN}">0</b><span>of ${S.length} units</span></div><div><b data-count="${Object.keys(st.quiz).length}">0</b><span>quizzes done</span></div><div><b data-count="${Object.keys(ps.notes).length}">0</b><span>notes</span></div></div>
    </div>
    <section class="sec"><h2>Quick access</h2><div class="tiles">${tiles.map((t,i)=>`<a class="tile" href="${t[0]}" style="--i:${i}"><span class="ti">${t[1]}</span><b>${t[2]}</b><small>${t[3]}</small></a>`).join('')}</div></section>
    <section class="sec"><div class="sech"><h2>${wk?`This week and next`:'Up next'}</h2><a href="#/sessions">All sessions →</a></div>
      <div class="hscroll">${next.map(s=>`<a class="ncard" href="#/s/${s.id}"><div class="nn">${s.exam?(s.id===90?'M':'F'):s.id}</div><div class="tiny">Week ${s.week} · ${esc(s.unit)}</div><h4>${esc(s.title)}</h4><div class="nfoot">${a.kindChip(s)}<span class="chip">${a.deck(s).length} slides</span></div></a>`).join('')||'<p class="muted">All units completed 🎉</p>'}</div></section>
    <div class="grid g2">
      ${qd?`<section class="card qday" id="qday"><div class="sech"><h3>💡 Question of the day</h3><span class="chip">${esc(a.short(qd.s))}</span></div><div class="quiz">${a.mcqBlock([qd.q],'')}</div><a class="tiny" href="#/s/${qd.s.id}">From: ${esc(qd.s.title)} →</a></section>`:''}
      <section class="card"><div class="sech"><h3>📌 Coming up</h3><a href="#/assess">All →</a></div>${ups.map(s=>`<a class="uprow" href="#/s/${s.id}"><span class="chip ${s.assessment.kind==='quiz'?'q':s.assessment.kind==='assignment'?'a':'x'}">${esc(s.assessment.kind)}</span><span class="grow"><b>${esc(s.assessment.title)}</b><small>Week ${s.week} · ${esc(s.title)}</small></span><span>›</span></a>`).join('')||'<p class="muted">Nothing pending.</p>'}
        <div class="toolbar"><a class="btn sm" href="#/practice/mid">📝 Midterm mock</a><a class="btn sm" href="#/practice/final">🎓 Final mock</a></div></section>
    </div>
    <section class="sec"><div class="sech"><h2>🚀 ICT today</h2><a href="#/sheets/today">All →</a></div><div class="hscroll">${D().modern.slice(0,6).map(m=>`<a class="ncard mod2" href="#/sheets/today"><div class="nn">${m[0]}</div><h4>${m[1]}</h4><p class="tiny">${esc(m[2].slice(0,110))}…</p><div class="nfoot"><span class="chip">${m[3]}</span></div></a>`).join('')}</div></section>
    <section class="sec"><h2>Course roadmap</h2><p class="muted">16 teaching weeks · Midterm in Week 9 · Final exam in Week 17.</p>
      <div class="road">${weeks.map(({w,list})=>`<div class="wk ${w===wk?'now':''}"><div class="n">WEEK ${w}${w===wk?' · NOW':''}</div><h4>${esc(list[0]?list[0].unit:'')}</h4>${list.map(s=>`<a href="#/s/${s.id}"><span class="d ${st.done[s.id]?'done':''}"></span>${esc(a.short(s))} · ${esc(s.title)}</a>`).join('')}<div style="margin-top:6px">${list.map(a.kindChip).join(' ')}</div></div>`).join('')}</div></section>
    <section class="sec"><h2>Course learning outcomes</h2><div class="grid g2">${window.COURSE.outcomes.map((o,i)=>`<div class="card"><span class="chip ok">LO${i+1}</span><p style="margin:.6em 0 0">${esc(o)}</p></div>`).join('')}</div></section>
    <section class="sec">${a.instructorCard()}</section>
  </div>`;
  miniJourney($('#mini'));
  if(qd){ const box=$('#qday'); if(ps.got['q'+today()]) box.classList.add('answered'); a.wireChoices(box,{mcq:[qd.q]},(r)=>{ haptic(14); once('q'+today(),()=>{ if(r){ addXP(10,'Question of the day'); } }); if(r) confetti(); }); }
}

/* ---------- PRACTICE ---------- */
function practice(h){ const m=h[1]; if(m==='quick') return quickSetup(); if(m==='mid') return startExam('mid'); if(m==='final') return startExam('final'); if(m==='phish') return phishGame(); if(m==='keys') return keysQuiz(); if(m==='xl') return xlChallenge(); if(m==='match') return matchGame();
  const b=ps.best, c=ps.cnt;
  const cards=[['#/practice/quick','⚡','Quick quiz','10 random questions from any unit. Instant explanations.',b.quick!=null?`Best ${b.quick}/10`:'New'],
   ['#/practice/mid','📝','Midterm mock','20 questions from Weeks 1–8, 20 minutes.',b.mid!=null?`Best ${b.mid}/20`:'New'],
   ['#/practice/final','🎓','Final mock','25 questions from the whole course, 25 minutes.',b.final!=null?`Best ${b.final}/25`:'New'],
   ['#/practice/phish','🎣','Phishing spotter','Read a message and decide: suspicious or safe? All messages are fictional.',b.phish!=null?`Best ${b.phish}/8`:'New'],
   ['#/practice/keys','⌨️','Shortcut trainer','10 quick questions on keyboard shortcuts for Windows and Office.',b.keys!=null?`Best ${b.keys}/10`:'New'],
   ['#/practice/xl','📊','Formula challenge','Work out what a spreadsheet formula returns for a small data table.',c.xl?`${c.xl} solved`:'New'],
   ['#/practice/match','🧩','Term match','Match six key terms to their meanings against the clock.',c.match?`${c.match} done`:'New'],
   ['#/flash','🃏','Flashcards','Flip through every key term.',''],['#/journey','🌐','Web journey','Watch what happens after you type a web address.','']];
  app().innerHTML=`<div class="wrap"><div class="shead"><h1>🎯 Practice centre</h1><p class="muted">${bank().length} questions with explanations, four skill games and timed mock exams. Practice earns XP.</p></div>
  <div class="grid g3">${cards.map((x,i)=>`<a class="scard pc" href="${x[0]}" style="--i:${i}"><div class="top2"><div class="num">${x[1]}</div><div><h3>${x[2]}</h3></div></div><p>${x[3]}</p>${x[4]?`<div><span class="chip ${/Best|solved|done/.test(x[4])?'ok':''}">${x[4]}</span></div>`:''}</a>`).join('')}</div></div>`;
}

function quickSetup(){ const units=[...new Set(A().sessions.map(s=>s.unit))];
  app().innerHTML=`<div class="wrap narrow"><div class="shead"><h1>⚡ Quick quiz</h1><p class="muted">10 questions. Choose a topic or mix everything.</p></div><div class="card"><label class="fld">Topic<select id="qu"><option value="">All topics (mixed)</option>${units.map(u=>`<option>${esc(u)}</option>`).join('')}</select></label><div class="toolbar"><button class="btn pri" id="qgo">Start →</button><a class="btn" href="#/practice">Back</a></div></div></div>`;
  $('#qgo').onclick=()=>{ const u=$('#qu').value; const qs=shuffle(bank(u?s=>s.unit===u:null)).slice(0,10); runQuiz({title:'Quick quiz'+(u?' · '+u:''),qs,key:'quick',xp:5,again:'#/practice/quick'}); }; }
function startExam(kind){ const mid=kind==='mid', n=mid?20:25;
  app().innerHTML=`<div class="wrap narrow"><div class="shead"><h1>${mid?'📝 Midterm mock':'🎓 Final mock'}</h1><p class="muted">${n} multiple-choice questions from ${mid?'Weeks 1–8 (Sessions 1–16)':'the whole course'}. ${n} minutes. Answers and explanations are shown at the end.</p></div><div class="card"><ul><li>One question at a time; you cannot go back.</li><li>The timer finishes the exam automatically.</li><li>This is practice only. Official marks are set by your instructor.</li></ul><div class="toolbar"><button class="btn pri" id="ego">Start exam →</button><a class="btn" href="#/practice">Back</a></div></div></div>`;
  $('#ego').onclick=()=>runQuiz({title:mid?'Midterm mock':'Final mock',qs:shuffle(bank(mid?s=>s.week<=9:null)).slice(0,n),key:kind,xp:6,secs:n*60,exam:true,again:'#/practice/'+kind}); }
function runQuiz(o){
  const qs=o.qs, n=qs.length; if(!n){ app().innerHTML='<div class="wrap shead"><p class="muted">No questions for this topic.</p><a class="btn" href="#/practice">Back</a></div>'; return; }
  let i=0, right=0, t0=Date.now(), tm, ended=false; const log=[];
  const fmt=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
  app().innerHTML=`<div class="wrap narrow qz"><div class="qzhead"><a class="iconbtn" href="#/practice" aria-label="Close">✕</a><div class="qzbar"><i id="qzb"></i></div><span class="chip" id="qzt">⏱ 00:00</span></div><div id="qzq"></div></div>`;
  const tick=()=>{ const el=Math.floor((Date.now()-t0)/1000); const tt=$('#qzt'); if(!tt) return; if(o.secs){ const left=Math.max(0,o.secs-el); tt.textContent='⏱ '+fmt(left); tt.classList.toggle('x',left<60); if(left<=0) finish(); } else tt.textContent='⏱ '+fmt(el); };
  tm=setInterval(tick,1000); tick(); onLeave(()=>clearInterval(tm));
  const show=()=>{ const {q,s}=qs[i]; $('#qzb').style.width=(i/n*100)+'%';
    $('#qzq').innerHTML=`<div class="card qcard"><div class="tiny">Question ${i+1} of ${n} · ${esc(A().short(s))}</div><h2>${q.q}</h2><div class="qopts">${q.o.map((x,j)=>`<button class="qopt" data-j="${j}"><span>${String.fromCharCode(65+j)}</span>${x}</button>`).join('')}</div><div class="qwhy" id="qwhy" hidden></div><div class="toolbar" id="qnx" hidden><button class="btn pri" id="qnext">${i===n-1?'See result':'Next question →'}</button></div></div>`;
    $$('.qopt').forEach(b=>b.onclick=()=>{ if($('.qopt.sel')) return; const j=+b.dataset.j, ok=j===q.a; b.classList.add('sel'); log.push({q,s,j,ok}); if(ok) right++; haptic(ok?10:30);
      if(o.exam){ setTimeout(next,220); return; }
      $$('.qopt')[q.a].classList.add('right'); if(!ok) b.classList.add('wrong'); const w=$('#qwhy'); w.hidden=false; w.innerHTML=(ok?'✅ <b>Correct.</b> ':'❌ <b>Not quite.</b> ')+q.e; $('#qnx').hidden=false; $('#qnext').onclick=next; $('#qnext').focus(); }); };
  const next=()=>{ i++; if(i>=n) finish(); else show(); };
  function finish(){ if(ended) return; ended=true; clearInterval(tm); const secs=Math.floor((Date.now()-t0)/1000), pc=Math.round(right/n*100);
    if(ps.best[o.key]==null||right>ps.best[o.key]) ps.best[o.key]=right; ps.cnt.quiz=(ps.cnt.quiz||0)+1; save(); if(right) addXP(right*o.xp,`${o.title} ${right}/${n}`); if(pc>=80) confetti();
    const wrong=log.filter(l=>!l.ok), skipped=n-log.length;
    app().innerHTML=`<div class="wrap narrow"><div class="card result">${ring(pc,`<span data-count="${pc}" data-suf="%">0%</span>`,`${right} / ${n}`)}<h2>${pc>=80?'Excellent work! 🌟':pc>=50?'Good effort 👍':'Keep practising 💪'}</h2><p class="muted">${esc(o.title)} · time ${fmt(secs)}${skipped?` · ${skipped} not answered`:''} · best ${ps.best[o.key]}/${n}</p><div class="toolbar" style="justify-content:center"><a class="btn pri" href="${o.again}" id="qagain">Try again</a><a class="btn" href="#/practice">Practice centre</a></div></div>
      ${(o.exam?log:wrong).length?`<h3 style="margin:22px 0 10px">${o.exam?'Review all answers':'Review your mistakes'}</h3>${(o.exam?log:wrong).map(l=>`<div class="card rev ${l.ok?'ok':'bad'}"><p><b>${l.q.q}</b></p>${l.ok?'':`<p class="bad">Your answer: ${l.q.o[l.j]}</p>`}<p class="okk">Correct: ${l.q.o[l.q.a]}</p><p class="tiny">💡 ${l.q.e}</p><a class="tiny" href="#/s/${l.s.id}">Study ${esc(A().short(l.s))}: ${esc(l.s.title)} →</a></div>`).join('')}`:''}</div>`;
    $('#qagain').onclick=e=>{ if(location.hash===o.again){ e.preventDefault(); A().route(); } };
    animate(app()); window.scrollTo(0,0); }
  show();
}

/* ---------- skill games ---------- */
function resultCard(pc,right,n,title,extra){ return `<div class="wrap narrow"><div class="card result">${ring(pc,`<span data-count="${pc}" data-suf="%">0%</span>`,`${right} / ${n}`)}<h2>${pc>=80?'Excellent work! 🌟':pc>=50?'Good effort 👍':'Keep practising 💪'}</h2><p class="muted">${esc(title)}${extra?' · '+extra:''}</p><div class="toolbar" style="justify-content:center"><button class="btn pri" id="gAgain">Play again</button><a class="btn" href="#/practice">Practice centre</a></div></div></div>`; }
function phishGame(){
  const P=D().phish, order=shuffle(P.map((_,i)=>i)).slice(0,8), n=order.length; let i=0, right=0;
  const show=()=>{ const m=P[order[i]];
    app().innerHTML=`<div class="wrap narrow"><div class="shead"><h1>🎣 Phishing spotter</h1><p class="muted">Message ${i+1} of ${n}. Every message, sender and organisation here is fictional. Decide first, then read the explanation.</p><div class="qzbar"><i style="width:${i/n*100}%"></i></div></div>
     <div class="card msg"><div class="msgh"><span class="chip">${esc(m.ch)}</span><div class="grow"><b>${esc(m.from)}</b>${m.subj?`<small>Subject: ${esc(m.subj)}</small>`:''}</div></div><p class="msgb">${esc(m.body)}</p>
     <div class="toolbar" id="phB"><button class="btn bad2" data-a="0">🚩 Suspicious</button><button class="btn ok2" data-a="1">✅ Looks safe</button></div><div id="phO"></div></div></div>`;
    $$('#phB button').forEach(b=>b.onclick=()=>{ const ok=(b.dataset.a==='1')===m.safe; if(ok) right++; haptic(ok?10:30); $('#phB').hidden=true;
      $('#phO').innerHTML=`<div class="qwhy"><p>${ok?'✅ <b>Correct.</b>':'❌ <b>Not quite.</b>'} This message is <b>${m.safe?'safe':'suspicious'}</b>.</p><ul>${m.flags.map(f=>`<li>${m.safe?'✔':'🚩'} ${esc(f)}</li>`).join('')}</ul><p>${esc(m.why)}</p></div><div class="toolbar"><button class="btn pri" id="phN">${i===n-1?'See result':'Next message →'}</button><a class="btn" href="#/sheets">📑 Red-flag list</a></div>`;
      $('#phN').onclick=()=>{ i++; if(i>=n) finish(); else show(); }; $('#phN').focus(); }); };
  const finish=()=>{ const pc=Math.round(right/n*100); if(ps.best.phish==null||right>ps.best.phish) ps.best.phish=right; ps.cnt.phish=(ps.cnt.phish||0)+1; save(); if(right) addXP(right*4,`Phishing spotter ${right}/${n}`); if(pc>=80) confetti();
    app().innerHTML=resultCard(pc,right,n,'Phishing spotter','best '+ps.best.phish+'/'+n); $('#gAgain').onclick=phishGame; animate(app()); window.scrollTo(0,0); };
  show();
}
function keysQuiz(){
  const K=D().keys, s=A().sess(5)||A().sessions[0];
  const qs=shuffle(K).slice(0,10).map((k,idx)=>{ const o=shuffle([k].concat(shuffle(K.filter(x=>x!==k)).slice(0,3))), e=`<kbd>${esc(k[0])}</kbd> = ${esc(k[1].toLowerCase())}.`;
    return idx%2===0 ? {s,q:{q:`What does <kbd>${esc(k[0])}</kbd> do? <small>(${esc(k[2])})</small>`,o:o.map(x=>esc(x[1])),a:o.indexOf(k),e}}
                     : {s,q:{q:`Which shortcut will ${esc(k[1].charAt(0).toLowerCase()+k[1].slice(1))}? <small>(${esc(k[2])})</small>`,o:o.map(x=>`<kbd>${esc(x[0])}</kbd>`),a:o.indexOf(k),e}}; });
  runQuiz({title:'Shortcut trainer',qs,key:'keys',xp:3,again:'#/practice/keys'});
}
function xlChallenge(){
  const names=shuffle(['Ayesha','Bilal','Fatima','Hamza','Iqra','Usman','Zainab','Saad','Maryam','Ali']).slice(0,5), sc=names.map(()=>30+Math.floor(Math.random()*14)*5), r=2+Math.floor(Math.random()*5);
  const sum=sc.reduce((a,b)=>a+b,0), avg=sum/5, R=x=>Math.round(x*100)/100, hi=Math.max(...sc), lo=Math.min(...sc), pass=sc.filter(x=>x>=50);
  const T=[['=SUM(B2:B6)',sum,`Add all five scores: ${sc.join(' + ')} = ${sum}.`],['=AVERAGE(B2:B6)',R(avg),`Sum ${sum} ÷ 5 values = ${R(avg)}.`],['=MAX(B2:B6)',hi,'MAX returns the largest value in the range.'],['=MIN(B2:B6)',lo,'MIN returns the smallest value in the range.'],
   ['=COUNT(B2:B6)',5,'COUNT counts the cells that contain numbers: five scores.'],['=COUNTIF(B2:B6,">=50")',pass.length,`Scores that are 50 or more: ${pass.join(', ')||'none'}.`],
   [`=IF(B${r}>=50,"Pass","Fail")`,sc[r-2]>=50?'Pass':'Fail',`B${r} is ${sc[r-2]}. The test B${r}>=50 is ${sc[r-2]>=50?'TRUE, so the first result is returned':'FALSE, so the second result is returned'}.`],
   ['=MAX(B2:B6)-MIN(B2:B6)',hi-lo,`The range of the scores: ${hi} − ${lo}.`],['=B2+B3*2',sc[0]+sc[1]*2,`Multiplication comes first: ${sc[1]} × 2 = ${sc[1]*2}, then + ${sc[0]}.`],['=(B2+B3)/2',R((sc[0]+sc[1])/2),`Brackets first: ${sc[0]} + ${sc[1]} = ${sc[0]+sc[1]}, then ÷ 2.`]];
  const q=pick(T); let done=false;
  app().innerHTML=`<div class="wrap narrow"><div class="shead"><h1>📊 Formula challenge</h1><p class="muted">Fictional stress-scale scores for five students. What does the formula return? Round to 2 decimal places if needed.</p></div>
   <div class="card"><div class="tblwrap"><table class="cal xlt"><tr><th></th><th>A</th><th>B</th></tr><tr><th>1</th><td><b>Student</b></td><td><b>Score</b></td></tr>${names.map((nm,k)=>`<tr><th>${k+2}</th><td>${nm}</td><td>${sc[k]}</td></tr>`).join('')}</table></div>
   <pre class="code big">${esc(q[0])}</pre><label class="fld">Your answer<input id="xla" type="text" autocomplete="off" autocapitalize="off" spellcheck="false"></label><div class="toolbar"><button class="btn pri" id="xlc">Check</button><button class="btn" id="xln">New question</button><a class="btn" href="#/sheets">📑 Formula sheet</a></div><div id="xlo"></div></div></div>`;
  $('#xlc').onclick=()=>{ const v=$('#xla').value.trim().replace(/^"|"$/g,''); if(!v) return; const ok=typeof q[1]==='number'?Math.abs(parseFloat(v)-q[1])<0.011:v.toLowerCase()===String(q[1]).toLowerCase(); haptic(ok?12:30);
    $('#xlo').innerHTML=`<div class="qwhy"><p>${ok?'✅ <b>Correct!</b>':'❌ <b>Not quite.</b>'} <code>${esc(q[0])}</code> returns <b>${esc(q[1])}</b>.</p><p>${esc(q[2])}</p></div>`;
    if(ok&&!done){ ps.cnt.xl=(ps.cnt.xl||0)+1; save(); addXP(6,'Formula challenge'); } done=true; };
  $('#xla').onkeydown=e=>{ if(e.key==='Enter') $('#xlc').click(); }; $('#xln').onclick=xlChallenge;
}
function matchGame(){
  const cut=s=>s.length>140?s.slice(0,137)+'…':s;
  const all=A().allTerms().filter(t=>t[1].length<=150 && t[0].length<=34), set=shuffle(all).slice(0,6), defs=shuffle(set.map((t,i)=>i)); let sel=null, left=set.length, miss=0; const t0=Date.now();
  app().innerHTML=`<div class="wrap"><div class="shead"><h1>🧩 Term match</h1><p class="muted">Tap a term, then tap its meaning. Six pairs.</p><div class="toolbar"><span class="chip" id="mgT">⏱ 00:00</span><span class="chip" id="mgM">0 mistakes</span><button class="btn sm" id="mgN">New set</button></div></div>
   <div class="mgrid"><div class="mcol">${set.map((t,i)=>`<button class="mt term" data-i="${i}">${esc(t[0])}</button>`).join('')}</div><div class="mcol">${defs.map(i=>`<button class="mt def" data-i="${i}">${esc(cut(set[i][1]))}</button>`).join('')}</div></div></div>`;
  const tm=setInterval(()=>{ const el=$('#mgT'); if(!el){ clearInterval(tm); return; } const s=Math.floor((Date.now()-t0)/1000); el.textContent='⏱ '+String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0'); },1000); onLeave(()=>clearInterval(tm));
  $$('.mt.term').forEach(b=>b.onclick=()=>{ if(b.classList.contains('done')) return; $$('.mt.term').forEach(x=>x.classList.remove('sel')); b.classList.add('sel'); sel=b; haptic(6); });
  $$('.mt.def').forEach(b=>b.onclick=()=>{ if(b.classList.contains('done')) return; if(!sel){ toast('Tap a term first'); return; }
    if(b.dataset.i===sel.dataset.i){ b.classList.add('done'); sel.classList.add('done'); sel.classList.remove('sel'); sel=null; left--; haptic(10);
      if(!left){ clearInterval(tm); const secs=Math.floor((Date.now()-t0)/1000); ps.cnt.match=(ps.cnt.match||0)+1; save(); addXP(miss?10:15,'Term match'); if(!miss) confetti(); $('#mgT').textContent=`✔ Done in ${secs}s`; } }
    else { miss++; $('#mgM').textContent=miss+(miss===1?' mistake':' mistakes'); b.classList.add('no'); haptic(30); setTimeout(()=>b.classList.remove('no'),450); } });
  $('#mgN').onclick=matchGame;
}

/* ---------- WEB JOURNEY VISUALIZER (a simulation: no request is ever sent) ---------- */
function journey(){
  const exs=D().journeys;
  app().innerHTML=`<div class="wrap"><div class="shead"><h1>🌐 Web journey visualizer</h1><p class="muted">Type a web address and follow it, one step at a time, from your keyboard to the server and back to your screen.</p>
   <div class="pvin"><input id="pvsrc" type="text" value="${esc(exs[0])}" spellcheck="false" autocapitalize="off" autocomplete="off" inputmode="url" aria-label="Web address"><button class="btn pri" id="pvrun">Go ▶</button></div>
   <div class="toolbar">${exs.map(e=>`<button class="btn sm pvex">${esc(e)}</button>`).join('')}</div><p class="tiny">This is a simulation for learning. Nothing is sent over the internet, and the IP addresses shown are made-up examples.</p></div>
   <div class="pvctl" id="pvctl" hidden><button class="btn sm pri" id="pvplay">▶ Play</button><button class="btn sm" id="pvback">← Back</button><button class="btn sm" id="pvstep">Step →</button><button class="btn sm" id="pvall">Show all</button><button class="btn sm" id="pvreset">↺ Reset</button><span class="pvcap" id="pvcap"></span></div>
   <div id="pvout"></div></div>`;
  let cur=-1, caps=[], tm=null;
  const stop=()=>{ clearInterval(tm); tm=null; const b=$('#pvplay'); if(b) b.textContent='▶ Play'; };
  onLeave(stop);
  const reveal=(k,on)=>{ $$(`[data-s="${k}"]`,app()).forEach(el=>{ el.classList.toggle('on',on); const stg=el.closest('.pv-stage'); if(stg&&on) stg.classList.add('on'); }); };
  const go=k=>{ k=Math.max(-1,Math.min(caps.length-1,k)); while(cur<k){ cur++; reveal(cur,true); } while(cur>k){ reveal(cur,false); cur--; }
    $$('.pv-stage',app()).forEach(s=>{ if(!$('.pv-h.on',s)) s.classList.remove('on'); });
    $('#pvcap').innerHTML=cur<0?'Press <b>Play</b> or <b>Step</b>.':`<b>${cur+1}/${caps.length}</b> ${caps[cur]}`;
    const el=$(`[data-s="${cur}"]`,app()); if(el){ const r=el.getBoundingClientRect(); if(r.bottom>innerHeight-90||r.top<120) (el.closest('.pv-stage')||el).scrollIntoView({behavior:'smooth',block:'center'}); }
    if(cur===caps.length-1&&caps.length){ stop(); once('jr'+today(),()=>addXP(5,'Web journey explored')); } };
  function build(){ stop(); const out=$('#pvout'); cur=-1; caps=[]; let a;
    try{ a=parseAddr($('#pvsrc').value); }catch(e){ $('#pvctl').hidden=true; out.innerHTML=`<div class="card"><p class="bad"><b>${esc(e.message)}</b></p><p class="tiny">Try something like <code>https://www.university.example/library</code>.</p></div>`; return; }
    let n=0; const S=cap=>{ caps.push(cap); return `data-s="${n++}"`; };
    const H=(cls,cap,html,tag)=>`<${tag||'span'} class="pv-h ${cls||''}" ${S(cap)}>${html}</${tag||'span'}>`;
    const full=(a.path+(a.query?'?'+a.query:''));
    const isFile=/\.(pdf|jpg|png|docx|pptx|mp4|zip)$/i.exec(a.path), ctype=isFile?({pdf:'application/pdf',jpg:'image/jpeg',png:'image/png',mp4:'video/mp4',zip:'application/zip'}[isFile[1].toLowerCase()]||'application/octet-stream'):'text/html; charset=utf-8';
    const stage=(num,ic,t,sub,body)=>`<section class="card pv-stage"><div class="pvh"><span class="pvn">${num}</span><div><h3>${ic} ${t}</h3><p class="tiny">${sub}</p></div></div>${body}</section>`;
    const parts=[H('up sch',`<b>${a.scheme}://</b> is the protocol. ${a.secure?'HTTPS means the connection will be encrypted.':'Plain HTTP is <b>not encrypted</b>: anyone on the same network could read what is sent.'}`,`<b>${a.scheme}://</b><i>protocol</i>`)];
    if(a.sub) parts.push(H('up',`<b>${esc(a.sub)}</b> is a subdomain: one section or service of the organisation's site.`,`<b>${esc(a.sub)}.</b><i>subdomain</i>`));
    parts.push(H('up dom',`<b>${esc(a.name)}</b> is the registered domain name: the identity of the website. Read this part carefully to spot fake sites.`,`<b>${esc(a.name)}</b><i>domain name</i>`));
    parts.push(H('up',`<b>.${esc(a.tld)}</b> is the top-level domain${a.tld.length===2||/\.\w\w$/.test(a.tld)?' (it includes a two-letter country code)':''}.`,`<b>.${esc(a.tld)}</b><i>top-level domain</i>`));
    parts.push(H('up',`<b>${esc(a.path)}</b> is the path: which page or file on that server.`,`<b>${esc(a.path)}</b><i>path</i>`));
    if(a.query) parts.push(H('up',`<b>?${esc(a.query)}</b> is the query string: extra information sent to the page, such as search words. It is visible in your history, so it should never contain passwords.`,`<b>?${esc(a.query)}</b><i>query</i>`));
    const dns=[['🗂️','Browser and device cache','Have I visited this site recently? Not this time.'],['📡','DNS resolver','Your device asks a resolver, usually run by your internet provider.'],['🌍','Root and .'+esc(a.tld)+' servers','They point to the name server that is responsible for '+esc(a.name)+'.'+esc(a.tld)+'.'],['✅','Answer','<b>'+esc(a.host)+'</b> → <b>'+a.ip+'</b>']]
      .map(d=>H('dnsrow',`${d[1]}: ${strip(d[2])}`,`<span class="ti">${d[0]}</span><span class="grow"><b>${d[1]}</b><small>${d[2]}</small></span>`,'div')).join('');
    const hops=[['📱','Your device'],['📶','Wi-Fi router'],['🏢','Internet provider'],['🌐','Internet backbone'],['🖥️','Web server']].map((h,i)=>H('hop',i===0?'The request starts on your device.':`Hop ${i}: the data is passed on to the ${h[1].toLowerCase()}${i===4?' at '+a.ip:''}. Each router only reads the address and forwards the packet.`,`<b>${h[0]}</b><i>${h[1]}</i>`)).join('<span class="harr">→</span>');
    const tcp=[['SYN','Your device: "May I connect?"'],['SYN-ACK','Server: "Yes. Can you hear me?"'],['ACK','Your device: "Yes. Connected."']].map(t=>H('tkc',`TCP three-way handshake: <b>${t[0]}</b>. ${t[1]}`,`<b>${t[0]}</b><i>${t[1]}</i>`)).join('');
    const tls=a.secure?[['📜','Certificate','The server proves its identity with a certificate issued for '+esc(a.host)+'.'],['🔑','Key exchange','Both sides agree on a secret key that nobody else can work out.'],['🔒','Encrypted','From now on everything is scrambled. Others can see which site you visit, but not the page or what you type.']].map(t=>H('dnsrow',`TLS (the S in HTTPS): ${t[2]}`,`<span class="ti">${t[0]}</span><span class="grow"><b>${t[1]}</b><small>${t[2]}</small></span>`,'div')).join('')
      :H('dnsrow warnrow','There is no TLS step. With plain HTTP, passwords and card numbers would travel as readable text. Never log in or pay on an http:// page.','<span class="ti">⚠️</span><span class="grow"><b>No encryption</b><small>Plain HTTP: anyone on the path can read or change the data. Never log in or pay on a page like this.</small></span>','div');
    const req=[[`GET ${full} HTTP/1.1`,'The request line: the method GET means "send me this page".'],[`Host: ${a.host}`,'Which website on that server is wanted.'],['User-Agent: (your browser and device type)','The server learns your browser type, so it can send a suitable page.'],['Accept-Language: en','Your preferred language.'],['Cookie: (only cookies this site saved earlier)','Cookies let the site remember you, for example that you are logged in.']].map(r=>H('',r[1],esc(r[0]))).join('');
    const res=[['HTTP/1.1 200 OK','Status 200 means success. 404 would mean "page not found"; 500 would mean a server error.'],[`Content-Type: ${ctype}`,'What kind of content is coming, so the browser knows how to show it.'],['Content-Length: 48 213','The size of the reply in bytes.']].map(r=>H('',r[1],esc(r[0]))).join('');
    const pk=[3,1,4,2].map(k=>H('tkc',`Packet ${k} of 4 arrives. Packets can take different routes and arrive out of order.`,`<b>📦 ${k}</b><i>of 4</i>`)).join('')+H('tkc okc','The device puts the packets back in order (1, 2, 3, 4) and checks that none is missing. A lost packet is requested again.','<b>1 2 3 4</b><i>reassembled ✔</i>');
    const rend=isFile?H('dnsrow',`The browser opens or downloads the ${isFile[1].toUpperCase()} file.`,`<span class="ti">📄</span><span class="grow"><b>${isFile[1].toUpperCase()} file</b><small>Shown in the browser's viewer or saved to Downloads. Open downloaded files only from sources you trust.</small></span>`,'div')
      :[['🧱','HTML','gives the structure: headings, paragraphs, links and forms.'],['🎨','CSS','adds colours, fonts and layout.'],['⚙️','JavaScript','adds behaviour: menus, checks and live updates.'],['🖼️','Images and fonts','are fetched with more requests like this one, often dozens per page.']].map(t=>H('dnsrow',`${t[1]} ${t[2]}`,`<span class="ti">${t[0]}</span><span class="grow"><b>${t[1]}</b><small>${t[2]}</small></span>`,'div')).join('');
    out.innerHTML=
     stage(1,'⌨️','You type an address','A URL has several parts. Each part tells the browser something different.',`<div class="urlp">${parts.join('')}</div>`)+
     stage(2,'📒','DNS lookup','Computers find each other by number, so the name must be translated into an IP address.',dns)+
     stage(3,'🤝','Connection','The request travels through several networks, then the two computers agree to talk.',`<div class="hops">${hops}</div><div class="mp-tok" style="margin-top:12px">${tcp}</div><div style="margin-top:10px">${tls}</div>`)+
     stage(4,'📤','HTTP request','Your browser asks for the page.',`<pre class="code pvcode">${req}</pre>`)+
     stage(5,'🖥️','The server answers','The server finds or builds the page and sends a reply.',`<pre class="code pvcode">${res}</pre>`)+
     stage(6,'📦','Packets travel back','The reply is cut into small packets that travel separately.',`<div class="mp-tok">${pk}</div>`)+
     stage(7,'🎨','The browser shows the page','The browser turns the reply into what you see.',`${rend}${H('',a.secure?'Done. The padlock shows that the connection is encrypted. It does <b>not</b> prove the site is honest: always read the domain name.':'Done, but the browser warns "Not secure" because the connection was not encrypted.',browserMock(a,'<i class="b1"></i><i class="b2"></i><i class="b3"></i>'),'div')}`);
    $('#pvctl').hidden=false; go(-1); go(0);
  }
  $('#pvrun').onclick=()=>{ haptic(); build(); };
  $('#pvsrc').onkeydown=e=>{ if(e.key==='Enter') build(); };
  $$('.pvex').forEach(b=>b.onclick=()=>{ $('#pvsrc').value=b.textContent; build(); });
  $('#pvstep').onclick=()=>{ stop(); go(cur+1); }; $('#pvback').onclick=()=>{ stop(); go(cur-1); };
  $('#pvall').onclick=()=>{ stop(); go(caps.length-1); window.scrollTo({top:0,behavior:'smooth'}); }; $('#pvreset').onclick=()=>{ stop(); go(-1); go(0); window.scrollTo({top:0,behavior:'smooth'}); };
  $('#pvplay').onclick=()=>{ if(tm){ stop(); return; } if(cur>=caps.length-1){ go(-1); } $('#pvplay').textContent='⏸ Pause'; tm=setInterval(()=>go(cur+1),1500); go(cur+1); };
  build();
}

/* ---------- RESOURCES ---------- */
function sheets(h){
  const d=D(), tab=h[1]||'sheets', tabs=[['sheets','📑 Cheat sheets'],['viva','🎤 Viva Q&A'],['today','🚀 ICT today'],['toolbox','🆘 Help & tools']];
  let body='';
  if(tab==='viva') body=`<p class="muted">${d.viva.length} questions teachers ask in viva and short-answer papers. Say your answer aloud first, then open the model answer.</p><div class="toolbar"><button class="btn sm" id="vsh">🔀 Shuffle</button><button class="btn sm" id="vall">Open all</button></div><div id="vlist"></div>`;
  else if(tab==='today') body=`<p class="muted">What has changed recently in the technologies this course covers, and what it means for you.</p><div class="grid g2">${d.modern.map((m,i)=>`<article class="card mod" style="--i:${i}"><div class="top2"><span class="ti">${m[0]}</span><div><h3>${m[1]}</h3><span class="chip">${m[3]}</span></div></div><p>${m[2]}</p></article>`).join('')}</div>`;
  else if(tab==='toolbox') body=`<div class="card"><h3>🆘 If something goes wrong</h3><p class="tiny">Calm, step-by-step actions. In an emergency, contact local emergency services first.</p>${d.safety.map((s,i)=>`<details class="sheetc inl" ${i===0?'open':''}><summary><span class="ti">${i+1}</span><span class="grow"><b>${esc(s[0])}</b></span><span class="chev">›</span></summary><div class="shb">${s[1]}</div></details>`).join('')}</div><br>
    <div class="grid g2"><div class="card"><h3>🧰 Free tools for psychology students</h3>${d.tools.map(t=>`<div class="uprow"><span class="grow"><b>${t[0]}</b><small>${t[1]}</small></span><span class="chip">${t[2]}</span></div>`).join('')}<p class="tiny">Product names belong to their owners and are listed for learning only. Features and prices can change.</p></div>
    <div><div class="card"><h3>📝 Exam tips</h3><ul>${d.tips.map(t=>`<li>${t}</li>`).join('')}</ul></div><br><div class="card"><h3>📚 Books</h3><ul>${window.COURSE.books.concat(window.COURSE.refs).map(b=>`<li>${esc(b)}</li>`).join('')}</ul></div></div></div>`;
  else body=`<input class="search" id="shq" type="search" placeholder="Search the cheat sheets, e.g. shortcut, COUNTIF, phishing, APA…" aria-label="Search cheat sheets"><div class="toolbar"><button class="btn sm" id="shall">Open all</button><button class="btn sm" onclick="print()">🖨 Print</button></div><div id="shl">${d.sheets.map((s,i)=>`<details class="card sheetc" id="sh${i}" ${i===0?'open':''}><summary><span class="ti">${s.ic}</span><span class="grow"><b>${s.t}</b><small>${s.tag}</small></span><span class="chev">›</span></summary><div class="shb">${s.b}</div></details>`).join('')}</div>`;
  app().innerHTML=`<div class="wrap"><div class="shead"><h1>Resources</h1><div class="seg">${tabs.map(t=>`<a href="#/sheets${t[0]==='sheets'?'':'/'+t[0]}" class="${t[0]===tab?'on':''}">${t[1]}</a>`).join('')}</div></div>${body}</div>`;
  if(tab==='viva'){ let order=d.viva.map((_,i)=>i), open=false; const draw=()=>{ $('#vlist').innerHTML=order.map((k,i)=>`<details class="card sheetc" ${open?'open':''}><summary><span class="ti">${i+1}</span><span class="grow"><b>${esc(d.viva[k][0])}</b></span><span class="chev">›</span></summary><div class="shb"><p>${esc(d.viva[k][1])}</p></div></details>`).join(''); };
    $('#vsh').onclick=()=>{ order=shuffle(order); draw(); }; $('#vall').onclick=()=>{ open=!open; $('#vall').textContent=open?'Close all':'Open all'; draw(); }; draw(); }
  if(tab==='sheets'){ $('#shq').oninput=e=>{ const q=e.target.value.toLowerCase().trim(); $$('.sheetc').forEach((el,i)=>{ const s=d.sheets[i], hit=!q||(s.t+' '+strip(s.b)).toLowerCase().includes(q); el.hidden=!hit; if(q&&hit) el.open=true; }); };
    let all=false; $('#shall').onclick=()=>{ all=!all; $$('.sheetc').forEach(el=>el.open=all); $('#shall').textContent=all?'Close all':'Open all'; }; }
}

/* ---------- ME: profile, badges, settings ---------- */
function badges(){ const a=A(), st=a.st, S=a.sessions, done=ids=>ids.every(i=>st.done[i]), range=(x,y)=>{ const r=[]; for(let i=x;i<=y;i++) r.push(i); return r; };
  const perfect=Object.values(st.quiz).some(v=>{ const m=String(v).split('/'); return m[0]===m[1]&&+m[1]>0; });
  return [['🚀','First step','Complete your first unit',S.some(s=>st.done[s.id])],['💻','Digital basics','Complete Sessions 1–4',done(range(1,4))],['📊','Productivity pro','Complete Sessions 5–8',done(range(5,8))],['🎓','Connected learner','Complete Sessions 9–12',done(range(9,12))],['🩺','Health & money smart','Complete Sessions 13–16',done(range(13,16))],['🤝','Digital citizen','Complete Sessions 17–20',done(range(17,20))],['⚖️','Ethics champion','Complete Sessions 21–26',done(range(21,26))],['📝','Midterm ready','Complete Sessions 1–16 and the midterm unit',done(range(1,16).concat(90))],['🏆','ICT master','Complete all units',S.every(s=>st.done[s.id])],
   ['🎯','Perfect check','Score full marks in a knowledge check',perfect],['🔥','On fire','Study 3 days in a row',ps.bestStreak>=3],['⚡','Unstoppable','Study 7 days in a row',ps.bestStreak>=7],['🧪','Quiz explorer','Finish 5 practice quizzes',(ps.cnt.quiz||0)>=5],['🎣','Scam spotter','Finish the phishing spotter 3 times',(ps.cnt.phish||0)>=3],['🧩','Word wizard','Finish 3 term-match games',(ps.cnt.match||0)>=3]]; }
function me(){
  const a=A(), st=a.st, S=a.sessions, p=a.pct(), L=lvl(), B=badges(), got=B.filter(b=>b[3]).length, wk=curWeek();
  const units=[...new Set(S.map(s=>s.unit))].map(u=>{ const l=S.filter(s=>s.unit===u); return [u,l.filter(s=>st.done[s.id]).length,l.length]; });
  app().innerHTML=`<div class="wrap narrow2"><div class="card prof"><div class="pav">${ps.name?esc(ps.name.trim()[0].toUpperCase()):'👤'}</div><div class="grow"><h1>${ps.name?esc(ps.name):'Student'}</h1><p class="muted">${ps.roll?esc(ps.roll)+' · ':''}ICT-1013 · BS Psychology${wk?` · Week ${wk}`:''}</p><div class="tiny">LEVEL ${L+1} · <b>${LV[L]}</b> · <span data-count="${ps.xp}">0</span> XP</div><div class="xbar"><i data-w="${L>=LV.length-1?100:Math.round(ps.xp%LVXP/LVXP*100)}"></i></div></div><button class="btn sm" id="pedit">✏️ Edit</button></div>
   <div class="dgrid" style="margin-top:14px"><div class="card pcard">${ring(p,`<span data-count="${p}" data-suf="%">0%</span>`,'complete')}<div class="grow"><h3>Course progress</h3><p class="tiny">${S.filter(s=>st.done[s.id]).length} of ${S.length} units completed</p><a class="btn sm" href="#/bookmarks">Bookmarks & quiz results →</a></div></div>
   <div class="card statc"><div><b>🔥 <span data-count="${streak()}">0</span></b><span>day streak</span></div><div><b data-count="${ps.bestStreak}">0</b><span>best streak</span></div><div><b data-count="${Object.keys(ps.days).length}">0</b><span>days studied</span></div><div><b data-count="${got}">0</b><span>of ${B.length} badges</span></div></div></div>
   <section class="sec"><h2>Badges</h2><div class="badges">${B.map(b=>`<div class="badge ${b[3]?'got':''}" title="${esc(b[2])}"><span>${b[0]}</span><b>${b[1]}</b><small>${b[2]}</small></div>`).join('')}</div></section>
   <section class="sec"><h2>Progress by unit</h2><div class="card">${units.map(u=>`<div class="urow"><span>${esc(u[0])}</span><div class="xbar"><i data-w="${Math.round(u[1]/u[2]*100)}"></i></div><b>${u[1]}/${u[2]}</b></div>`).join('')}</div></section>
   <section class="sec"><h2>Settings</h2><div class="card setl">
     <button class="srow" id="sTheme"><span>🌗</span><span class="grow"><b>Appearance</b><small>Switch between dark and light</small></span><span>›</span></button>
     ${IN_APP()?'':`<button class="srow" id="sInst"><span>📲</span><span class="grow"><b>Install on this device</b><small>Add the portal to your home screen; works offline</small></span><span>›</span></button><a class="srow" href="${APK}"><span>🤖</span><span class="grow"><b>Download the Android app</b><small>APK file, works fully offline</small></span><span>›</span></a>`}
     <button class="srow" id="sShare"><span>📤</span><span class="grow"><b>Share with classmates</b><small>Send the portal link</small></span><span>›</span></button>
     <button class="srow" id="sBak"><span>💾</span><span class="grow"><b>Backup or move my progress</b><small>Copy a backup code, or restore one on a new phone</small></span><span>›</span></button>
     <a class="srow" href="#/outline"><span>🗓️</span><span class="grow"><b>Course outline & policies</b><small>Calendar, books, class rules</small></span><span>›</span></a>
     <button class="srow danger" id="sReset"><span>🗑️</span><span class="grow"><b>Reset my progress</b><small>Clears completion, scores, XP and notes on this device</small></span><span>›</span></button>
   </div><p class="tiny" style="text-align:center;margin-top:14px">Applications of ICT portal · version 2.0 · Instructor: Muhammad Tahir Mehmood</p></section></div>`;
  $('#pedit').onclick=()=>{ const w=sheet(`<div class="ob"><h2>Edit profile</h2><label>Name<input id="obN" type="text" maxlength="40" value="${esc(ps.name)}"></label><label>Roll number<input id="obR" type="text" maxlength="30" value="${esc(ps.roll)}"></label><label>Semester start date<input id="obS" type="date" value="${esc(ps.start)}"></label><div class="toolbar"><button class="btn pri" id="obGo">Save</button><button class="btn" data-close>Cancel</button></div></div>`);
    $('#obGo',w).onclick=()=>{ ps.name=$('#obN',w).value.trim(); ps.roll=$('#obR',w).value.trim(); ps.start=$('#obS',w).value; ps.skip=1; save(); closeSheet(w); me(); afterRoute(['me']); toast('Profile saved'); }; };
  $('#sTheme').onclick=()=>{ a.flipTheme(); haptic(); };
  const si=$('#sInst'); if(si) si.onclick=()=>{ if(installEvt){ installEvt.prompt(); installEvt=null; } else sheet(`<div class="ob"><h2>Install the portal</h2><p><b>Android (Chrome):</b> open the ⋮ menu and choose “Add to Home screen” or “Install app”.</p><p><b>iPhone (Safari):</b> tap the Share button, then “Add to Home Screen”.</p><p><b>Computer (Chrome / Edge):</b> click the install icon at the right of the address bar.</p><div class="toolbar"><button class="btn pri" data-close>OK</button></div></div>`); };
  $('#sShare').onclick=()=>{ const text='Applications of ICT (ICT-1013) course portal: animated lectures, practice games, lab tools and cheat sheets. '+SITE; try{ if(IN_APP()&&AndroidApp.share){ AndroidApp.share(text); return; } if(navigator.share){ navigator.share({title:'Applications of ICT',text,url:SITE}).catch(()=>{}); return; } }catch(e){} copy(SITE,'Link copied'); };
  $('#sBak').onclick=()=>{ let code=''; try{ code=btoa(unescape(encodeURIComponent(JSON.stringify({c:a.st,p:ps})))); }catch(e){}
    const w=sheet(`<div class="ob"><h2>Backup or move my progress</h2><p class="tiny">Copy this code and keep it (for example, send it to yourself). To restore, paste a code below and press Restore.</p><textarea id="bkOut" rows="3" readonly>${code}</textarea><div class="toolbar"><button class="btn sm pri" id="bkCopy">Copy code</button></div><label>Restore from a code<textarea id="bkIn" rows="3" placeholder="Paste a backup code here"></textarea></label><div class="toolbar"><button class="btn sm" id="bkGo">Restore</button><button class="btn sm" data-close>Close</button></div></div>`);
    $('#bkCopy',w).onclick=()=>copy(code,'Backup code copied');
    $('#bkGo',w).onclick=()=>{ try{ const o=JSON.parse(decodeURIComponent(escape(atob($('#bkIn',w).value.trim())))); if(!o||!o.c||!o.p) throw 0; localStorage.setItem('ict1013-v2',JSON.stringify(o.c)); localStorage.setItem(PK,JSON.stringify(o.p)); location.reload(); }catch(e){ toast('That code is not valid'); } }; };
  $('#sReset').onclick=()=>{ if(confirm('Reset all progress, quiz scores, XP, badges and notes on this device?')){ a.resetAll(); ps=Object.assign(blank(),{name:ps.name,roll:ps.roll,start:ps.start,skip:1}); save(); me(); afterRoute(['me']); toast('Progress reset'); } };
}
function copy(text,msg){ const done=()=>toast(msg||'Copied'); try{ if(navigator.clipboard&&isSecureContext){ navigator.clipboard.writeText(text).then(done,()=>fallback()); return; } }catch(e){} fallback();
  function fallback(){ const t=document.createElement('textarea'); t.value=text; t.style.cssText='position:fixed;opacity:0'; document.body.append(t); t.select(); try{ document.execCommand('copy'); done(); }catch(e){ toast('Select the text and copy it'); } t.remove(); } }

/* ---------- global search ---------- */
let sIndex=null;
function buildIndex(){ const a=A(), d=D(), I=[];
  [['#/','🏠','Home dashboard'],['#/sessions','📚','All sessions'],['#/practice','🎯','Practice centre'],['#/practice/quick','⚡','Quick quiz'],['#/practice/mid','📝','Midterm mock exam'],['#/practice/final','🎓','Final mock exam'],['#/practice/phish','🎣','Phishing spotter game'],['#/practice/keys','⌨️','Keyboard shortcut trainer'],['#/practice/xl','📊','Spreadsheet formula challenge'],['#/practice/match','🧩','Term match game'],['#/journey','🌐','Web journey visualizer: URL, DNS, HTTPS'],['#/tools','🧪','Lab tools: password, APA, search, statistics, binary, email'],['#/sheets','📑','Cheat sheets'],['#/sheets/viva','🎤','Viva questions and answers'],['#/sheets/today','🚀','ICT today: AI, passkeys, deepfakes, instant payments'],['#/sheets/toolbox','🆘','Help and tools: if something goes wrong, exam tips'],['#/flash','🃏','Flashcards'],['#/glossary','📘','Glossary'],['#/revision','🔁','Revision dashboard'],['#/assess','📝','Assessments'],['#/outline','🗓️','Course outline'],['#/me','👤','My profile, badges and settings']].forEach(p=>I.push({t:p[2],s:'Page',ic:p[1],h:p[0],w:3}));
  a.sessions.forEach(s=>{ I.push({t:a.label(s)+': '+s.title,s:'Week '+s.week+' · '+s.unit,ic:s.ic||'📖',h:'#/s/'+s.id,x:s.sub,w:3});
    s.slides.forEach((x,i)=>I.push({t:strip(x.h),s:a.short(s)+' · slide',ic:x.ic||'▫️',h:'#/s/'+s.id,j:'c'+i,x:strip((x.p||'')+' '+(x.pts||[]).map(p=>p[1]).join(' ')).slice(0,400),w:2}));
    if(s.assessment) I.push({t:s.assessment.title,s:'Assessment · Week '+s.week,ic:'📌',h:'#/s/'+s.id,j:'assess',w:2}); });
  a.allTerms().forEach(t=>I.push({t:t[0],s:'Term · '+t[1].slice(0,90),ic:'📘',h:'#/s/'+t[2],j:'terms',x:t[1],w:2}));
  d.sheets.forEach((s,i)=>I.push({t:s.t,s:'Cheat sheet · '+s.tag,ic:s.ic,h:'#/sheets',j:'sh'+i,x:strip(s.b),w:2}));
  d.viva.forEach(v=>I.push({t:v[0],s:'Viva question',ic:'🎤',h:'#/sheets/viva',x:v[1],w:1}));
  I.forEach(o=>{ o.lt=o.t.toLowerCase(); o.lx=(o.x||'').toLowerCase(); }); return I; }
function openSearch(){ if($('.sheetw.srch')) return; sIndex=sIndex||buildIndex();
  const w=sheet(`<div class="srchbox"><input id="sq" type="search" placeholder="Search sessions, slides, terms, cheat sheets…" autocomplete="off" aria-label="Search the course"><button class="iconbtn" data-close aria-label="Close">✕</button></div><div id="sres" class="sres"></div>`,'srch');
  const inp=$('#sq',w), res=$('#sres',w); let sel=0, items=[];
  const draw=()=>{ const q=inp.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    items=!q.length?sIndex.filter(o=>o.s==='Page').slice(0,12):sIndex.map(o=>{ let sc=0; for(const k of q){ if(o.lt.includes(k)) sc+=o.lt.startsWith(k)?6:4; else if(o.lx.includes(k)) sc+=1; else return null; } return {o,sc:sc+o.w}; }).filter(Boolean).sort((x,y)=>y.sc-x.sc).slice(0,40).map(x=>x.o);
    sel=0; res.innerHTML=items.length?items.map((o,i)=>`<a class="sr ${i===0?'on':''}" data-i="${i}" href="${o.h}"><span class="ti">${o.ic}</span><span class="grow"><b>${esc(o.t)}</b><small>${esc(o.s)}</small></span></a>`).join(''):'<p class="muted" style="padding:16px">No results. Try another word.</p>'; };
  const go=i=>{ const o=items[i]; if(!o) return; jump=o.j||null; closeSheet(w); if(location.hash===o.h) A().route(); else location.hash=o.h; };
  inp.oninput=draw; res.onclick=e=>{ const a=e.target.closest('.sr'); if(a){ e.preventDefault(); go(+a.dataset.i); } };
  inp.onkeydown=e=>{ if(e.key==='ArrowDown'||e.key==='ArrowUp'){ e.preventDefault(); sel=Math.max(0,Math.min(items.length-1,sel+(e.key==='ArrowDown'?1:-1))); $$('.sr',res).forEach((x,i)=>{ x.classList.toggle('on',i===sel); if(i===sel) x.scrollIntoView({block:'nearest'}); }); } if(e.key==='Enter'){ e.preventDefault(); go(sel); } if(e.key==='Escape') closeSheet(w); };
  draw(); setTimeout(()=>inp.focus(),80);
}

buildShell();
window.ICTPortal={ routes:{'':home, practice, journey, sheets, me}, afterRoute, onDone, onQuiz, onAssess, onPres, reset, toast, confetti, openSearch };
})();
