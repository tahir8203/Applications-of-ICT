/* ICT-1013 lab tools. Everything runs in the browser; nothing typed here is saved or sent anywhere. */
(function(){
const esc = s => String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const $ = (q,r=document)=>r.querySelector(q), $$=(q,r=document)=>[...r.querySelectorAll(q)];
const fmt = (n,d=2)=>{ if(!isFinite(n)) return '—'; const r=Math.round(n*10**d)/10**d; return r.toLocaleString('en-US',{maximumFractionDigits:d}); };

/* ---------- 1. Password strength ---------- */
const COMMON = ['123456','password','12345678','qwerty','123456789','12345','111111','abc123','password1','iloveyou','pakistan','admin','welcome','000000','123123','qwerty123','letmein','monkey','dragon','football','lahore','karachi','islamabad','student','user'];
function passInfo(p){
  const L=[...p].length; let pool=0;
  if(/[a-z]/.test(p)) pool+=26; if(/[A-Z]/.test(p)) pool+=26; if(/\d/.test(p)) pool+=10; if(/[^A-Za-z0-9]/.test(p)) pool+=33;
  let bits = L*Math.log2(pool||1);
  const issues=[], low=p.toLowerCase();
  if(COMMON.some(c=>low===c || (c.length>=6 && low.includes(c)))){ issues.push('Contains one of the most common passwords'); bits=Math.min(bits,12); }
  if(/(.)\1{2,}/.test(p)){ issues.push('Repeated characters (aaa, 111)'); bits*=.8; }
  if(/(?:012|123|234|345|456|567|678|789|abc|bcd|cde|qwe|wer|ert|asd)/i.test(p)){ issues.push('Keyboard or number sequence (123, abc, qwe)'); bits*=.8; }
  if(/(19|20)\d{2}/.test(p)){ issues.push('Looks like a year or date of birth'); bits*=.9; }
  if(L && L<12) issues.push('Shorter than 12 characters');
  if(L && pool<=26) issues.push('Only one kind of character');
  const guesses=Math.pow(2,bits)/2, secs=guesses/1e10;
  const time = !L?'—': secs<1?'less than a second': secs<60?Math.round(secs)+' seconds': secs<3600?Math.round(secs/60)+' minutes': secs<86400?Math.round(secs/3600)+' hours': secs<31557600?Math.round(secs/86400)+' days': secs<31557600*1000?Math.round(secs/31557600)+' years': secs<31557600*1e6?Math.round(secs/31557600/1000)+' thousand years':'millions of years or more';
  const score = !L?0: bits<28?1: bits<45?2: bits<65?3: bits<85?4:5;
  return {L,pool,bits,issues,time,score,label:['—','Very weak','Weak','Fair','Strong','Very strong'][score]};
}
const WORDS='river mango candle silver window garden rocket purple cricket lantern ocean pencil marble tiger violin bridge desert jasmine falcon copper meadow planet saffron harbour thunder willow compass velvet orchard pepper glacier lemon anchor maple feather canyon ribbon pebble sunrise walnut comet bamboo lagoon ginger cobalt quartz kettle meadow tulip'.split(' ');
function passphrase(){ const a=new Uint32Array(4); (window.crypto||window.msCrypto).getRandomValues(a); return [...a].map(x=>WORDS[x%WORDS.length]).join('-')+'-'+(a[0]%90+10); }

/* ---------- 2. APA 7 reference builder ---------- */
function apaName(full){ const p=full.trim().split(/\s+/); if(p.length<2) return p[0]||''; const last=p.pop(); return last+', '+p.map(x=>x[0].toUpperCase()+'.').join(' '); }
function apaAuthors(list){ const n=list.map(apaName).filter(Boolean); if(!n.length) return ''; if(n.length===1) return n[0]; if(n.length===2) return n[0]+', & '+n[1]; return n.slice(0,-1).join(', ')+', & '+n[n.length-1]; }
function apaCite(list,year){ const last=list.map(x=>x.trim().split(/\s+/).pop()).filter(Boolean); const y=year||'n.d.'; if(!last.length) return '('+y+')'; if(last.length===1) return `(${last[0]}, ${y})`; if(last.length===2) return `(${last[0]} & ${last[1]}, ${y})`; return `(${last[0]} et al., ${y})`; }
function apaRef(o){ const au=apaAuthors(o.authors), y='('+(o.year||'n.d.')+').', dot=s=>s?(/[.?!]$/.test(s)?s:s+'.'):'';
  const lead = au ? au+(/\.$/.test(au)?' ':'. ')+y : '';
  if(o.type==='book'){ const t=`<i>${esc(o.title)}</i>`+(o.edition?` (${esc(o.edition)} ed.)`:'')+'.'; return (lead?esc(lead)+' '+t:t+' '+esc(y))+' '+esc(dot(o.publisher)); }
  if(o.type==='journal'){ const j=`<i>${esc(o.journal)}${o.volume?', '+esc(o.volume):''}</i>${o.issue?'('+esc(o.issue)+')':''}${o.pages?', '+esc(o.pages):''}.`; return (lead?esc(lead)+' '+esc(dot(o.title)):esc(dot(o.title))+' '+esc(y))+' '+j+(o.doi?' '+esc(o.doi):''); }
  const t=`<i>${esc(o.title)}</i>.`; return (lead?esc(lead)+' '+t:t+' '+esc(y))+(o.site?' '+esc(dot(o.site)):'')+(o.url?' '+esc(o.url):'');
}

/* ---------- 4. descriptive statistics ---------- */
function stats(nums){ const a=nums.slice().sort((x,y)=>x-y), n=a.length; if(!n) return null;
  const sum=a.reduce((s,x)=>s+x,0), mean=sum/n, median=n%2?a[(n-1)/2]:(a[n/2-1]+a[n/2])/2;
  const f={}; a.forEach(x=>f[x]=(f[x]||0)+1); const mx=Math.max(...Object.values(f)); const mode=mx===1?[]:Object.keys(f).filter(k=>f[k]===mx).map(Number);
  const v=n>1?a.reduce((s,x)=>s+(x-mean)**2,0)/(n-1):0;
  return {n,sum,mean,median,mode,min:a[0],max:a[n-1],range:a[n-1]-a[0],variance:v,sd:Math.sqrt(v),sorted:a}; }

/* ---------- 7. email checker ---------- */
function emailCheck(subj,body){ const w=body.trim().split(/\s+/).filter(Boolean), low=body.toLowerCase(); const R=[];
  const add=(ok,t,tip)=>R.push({ok,t,tip});
  add(subj.trim().length>=8 && subj.trim().length<=90,'Clear subject line','Say the course, the purpose and your roll number, e.g. "ICT-1013 – Assignment 1 – BSPSY-24-017".');
  add(/^\s*(dear|respected|hello|good (morning|afternoon|evening)|assalam)/i.test(body),'Polite greeting','Start with "Dear Sir," / "Dear Ma\'am," / "Dear Dr Khan,".');
  add(/(regards|sincerely|thank you|thanks|yours)/i.test(low.slice(-220)),'Proper closing','End with "Regards," and your full name.');
  add(/(roll\s*(no|number)|bs\s*psy|semester|section)/i.test(low),'Identifies you','Add your roll number, class and semester so the teacher knows who you are.');
  add(!/\b(plz|pls|u|ur|thx|tnx|gonna|wanna|btw|bcz|coz|cuz|msg|tmrw|k)\b/i.test(body),'No chat abbreviations','Write full words: "please", "you", "because", "thank you".');
  add((body.match(/\b[A-Z]{4,}\b/g)||[]).filter(x=>!/^(ICT|BSPSY|LMS|PDF|APA)$/.test(x)).length<2,'No shouting in capitals','ALL CAPS reads as shouting. Use normal sentence case.');
  add(!/[!?]{2,}/.test(body) && !/[\u{1F300}-\u{1FAFF}]/u.test(body),'Calm punctuation, no emojis','One question mark is enough; leave emojis for chats.');
  add(w.length>=20 && w.length<=220,'Suitable length ('+w.length+' words)','Aim for roughly 20–200 words: complete but short.');
  const att=/attach/i.test(low); return {R, score:R.filter(x=>x.ok).length, att}; }

/* ---------- render ---------- */
function render(app){
  app.innerHTML=`<div class="wrap"><div class="shead"><h1>🧪 ICT lab tools</h1><p class="muted">Practical tools for the skills taught in this course. Everything runs on your device; nothing you type is saved or sent.</p>
  <div class="toolbar"><a class="btn sm" href="#t1" data-j>🔐 Password lab</a><a class="btn sm" href="#t2" data-j>✍️ APA reference</a><a class="btn sm" href="#t3" data-j>🔎 Search builder</a><a class="btn sm" href="#t4" data-j>📊 Statistics</a><a class="btn sm" href="#t5" data-j>💾 Data size</a><a class="btn sm" href="#t6" data-j>🔢 Text ↔ binary</a><a class="btn sm" href="#t7" data-j>📧 Email checker</a></div></div>

  <section class="card tool" id="t1"><h2>🔐 Password strength lab</h2><p class="tiny">Try example passwords to see what makes one strong. <b>Do not type a password you really use.</b> Used in Sessions 15 and 20.</p>
    <div class="pvin"><input type="text" id="pw" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type an example password" aria-label="Example password"><button class="btn" id="pwGen">🎲 Passphrase idea</button></div>
    <div class="meter" aria-hidden="true"><i id="pwBar"></i></div><div class="out" id="pwOut"></div></section><br>

  <section class="card tool" id="t2"><h2>✍️ APA 7 reference builder</h2><p class="tiny">Fill in the details and copy the reference and the in-text citation. Always check the result against your source. Used in Sessions 23–24.</p>
    <div class="frm"><label class="fld">Source type<select id="apT"><option value="book">Book</option><option value="journal">Journal article</option><option value="web">Web page</option></select></label>
    <label class="fld">Authors (one per line, first name then family name)<textarea id="apA" rows="2" placeholder="Ayesha Khan&#10;Bilal Ahmed"></textarea></label>
    <label class="fld">Year<input type="text" id="apY" inputmode="numeric" placeholder="2024"></label>
    <label class="fld">Title (sentence case)<input type="text" id="apTi" placeholder="Understanding human memory"></label><div id="apX" class="frm2"></div></div>
    <div class="out" id="apOut"></div></section><br>

  <section class="card tool" id="t3"><h2>🔎 Smart search builder</h2><p class="tiny">Combine search operators without memorising them. Used in Session 3.</p>
    <div class="frm"><label class="fld">Words to find<input type="text" id="sA" placeholder="exam anxiety students"></label><label class="fld">Exact phrase<input type="text" id="sP" placeholder="coping strategies"></label>
    <label class="fld">Leave out these words<input type="text" id="sN" placeholder="medication"></label><label class="fld">Only from this site or domain<input type="text" id="sS" placeholder="edu.pk"></label>
    <label class="fld">File type<select id="sF"><option value="">Any</option><option>pdf</option><option>pptx</option><option>docx</option><option>xlsx</option></select></label></div>
    <div class="out" id="sOut"></div></section><br>

  <section class="card tool" id="t4"><h2>📊 Descriptive statistics calculator</h2><p class="tiny">Paste scores separated by spaces, commas or new lines. Gives the same values as Excel's AVERAGE, MEDIAN, MODE and STDEV.S. Used in Session 5.</p>
    <textarea id="stIn" aria-label="Scores">12 15 9 18 15 21 14 15 11 17</textarea><div class="toolbar"><button class="btn pri" id="stGo">Calculate</button><button class="btn" id="stEx">Example: stress scores</button></div><div class="out" id="stOut"></div></section><br>

  <section class="card tool" id="t5"><h2>💾 Data size and download time</h2><p class="tiny">Convert between units and see how long a file takes on your connection. Used in Sessions 1 and 7.</p>
    <div class="frm"><label class="fld">File size<input type="text" id="dz" inputmode="decimal" value="700"></label><label class="fld">Unit<select id="du"><option>KB</option><option selected>MB</option><option>GB</option><option>TB</option></select></label><label class="fld">Internet speed (Mbps)<input type="text" id="ds" inputmode="decimal" value="10"></label></div>
    <div class="out" id="dOut"></div></section><br>

  <section class="card tool" id="t6"><h2>🔢 Text ↔ binary</h2><p class="tiny">See how a computer stores text as bits. Each English letter is one byte (8 bits); Urdu letters and emojis need more. Used in Session 1.</p>
    <input type="text" id="bi" value="ICT" aria-label="Text to convert" maxlength="40"><div class="out" id="bOut"></div></section><br>

  <section class="card tool" id="t7"><h2>📧 Formal email checker</h2><p class="tiny">Write a practice email to a teacher and check it against the etiquette rules. Use made-up details. Used in Session 4.</p>
    <label class="fld">Subject<input type="text" id="emS" placeholder="ICT-1013 – Request for assignment extension – BSPSY-24-017"></label>
    <label class="fld">Message<textarea id="emB" rows="7" placeholder="Dear Sir,&#10;&#10;…"></textarea></label><div class="toolbar"><button class="btn pri" id="emGo">Check my email</button><button class="btn" id="emBad">Load a weak example</button></div><div class="out" id="emOut"></div></section></div>`;
  $$('[data-j]',app).forEach(a=>a.onclick=e=>{ e.preventDefault(); $(a.getAttribute('href'),app).scrollIntoView({behavior:'smooth'}); });
  const toast=m=>{ try{ window.ICTPortal.toast(m); }catch(e){} };
  const copy=t=>{ try{ navigator.clipboard.writeText(t).then(()=>toast('Copied'),()=>toast('Select the text and copy it')); }catch(e){ toast('Select the text and copy it'); } };

  /* 1 */
  const pw=$('#pw',app), drawPw=()=>{ const i=passInfo(pw.value); const bar=$('#pwBar',app); bar.style.width=(i.score*20)+'%'; bar.className='s'+i.score;
    $('#pwOut',app).innerHTML=!i.L?'<p class="tiny">Start typing to see the analysis.</p>':`<p><b class="s${i.score}t">${i.label}</b> · ${i.L} characters · about ${Math.round(i.bits)} bits of entropy</p><p>Estimated time for a fast offline guessing attack: <b>${i.time}</b> <span class="tiny">(rough estimate at 10 billion guesses per second)</span></p>${i.issues.length?'<ul>'+i.issues.map(x=>'<li class="err">'+x+'</li>').join('')+'</ul>':'<p class="okk">No obvious weaknesses found. Still use a different password for every account, and turn on 2FA.</p>'}`; };
  pw.oninput=drawPw; $('#pwGen',app).onclick=()=>{ pw.value=passphrase(); drawPw(); }; drawPw();

  /* 2 */
  const apX=$('#apX',app), F={book:[['apE','Edition (optional, e.g. 2nd)',''],['apP','Publisher','Oxford University Press']],journal:[['apJ','Journal name','Journal of Applied Psychology'],['apV','Volume','12'],['apI','Issue','3'],['apPg','Pages','45–60'],['apD','DOI link (optional)','https://doi.org/…']],web:[['apSi','Website name','World Health Organization'],['apU','URL','https://…']]};
  const drawAp=()=>{ const g=id=>{ const el=$('#'+id,app); return el?el.value.trim():''; }; const type=$('#apT',app).value, authors=$('#apA',app).value.split('\n').map(x=>x.trim()).filter(Boolean);
    const o={type,authors,year:g('apY'),title:g('apTi'),edition:g('apE'),publisher:g('apP'),journal:g('apJ'),volume:g('apV'),issue:g('apI'),pages:g('apPg'),doi:g('apD'),site:g('apSi'),url:g('apU')};
    if(!o.title){ $('#apOut',app).innerHTML='<p class="tiny">Enter at least a title.</p>'; return; }
    const ref=apaRef(o), cite=apaCite(authors,o.year);
    $('#apOut',app).innerHTML=`<h4>Reference list entry</h4><p class="apa" id="apRef">${ref}</p><h4>In-text citation</h4><p class="apa">${esc(cite)}</p><div class="toolbar"><button class="btn sm pri" id="apC1">Copy reference</button><button class="btn sm" id="apC2">Copy citation</button></div><p class="tiny">Titles of books and web pages are in italics; for articles the journal name and volume are in italics. Use a hanging indent in your document.</p>`;
    $('#apC1',app).onclick=()=>copy($('#apRef',app).textContent); $('#apC2',app).onclick=()=>copy(cite); };
  const drawFields=()=>{ apX.innerHTML=F[$('#apT',app).value].map(f=>`<label class="fld">${f[1]}<input type="text" id="${f[0]}" placeholder="${esc(f[2])}"></label>`).join(''); $$('input',apX).forEach(i=>i.oninput=drawAp); drawAp(); };
  $('#apT',app).onchange=drawFields; ['apA','apY','apTi'].forEach(id=>$('#'+id,app).oninput=drawAp); drawFields();

  /* 3 */
  const drawS=()=>{ const v=id=>$('#'+id,app).value.trim(); const parts=[]; if(v('sA')) parts.push(v('sA')); if(v('sP')) parts.push('"'+v('sP').replace(/"/g,'')+'"'); v('sN').split(/\s+/).filter(Boolean).forEach(w=>parts.push('-'+w)); if(v('sS')) parts.push('site:'+v('sS').replace(/^https?:\/\//,'').replace(/\s+/g,'')); if(v('sF')) parts.push('filetype:'+v('sF'));
    const q=parts.join(' '); $('#sOut',app).innerHTML=q?`<pre class="code" id="sQ">${esc(q)}</pre><div class="toolbar"><button class="btn sm pri" id="sC">Copy query</button><a class="btn sm" target="_blank" rel="noopener" href="https://www.google.com/search?q=${encodeURIComponent(q)}">Open in Google ↗</a><a class="btn sm" target="_blank" rel="noopener" href="https://scholar.google.com/scholar?q=${encodeURIComponent(parts.filter(p=>!/^(site|filetype):/.test(p)).join(' '))}">Open in Google Scholar ↗</a></div>`:'<p class="tiny">Fill in any box to build a query.</p>';
    const c=$('#sC',app); if(c) c.onclick=()=>copy(q); };
  ['sA','sP','sN','sS'].forEach(id=>$('#'+id,app).oninput=drawS); $('#sF',app).onchange=drawS; drawS();

  /* 4 */
  const runSt=()=>{ const raw=$('#stIn',app).value.split(/[\s,;]+/).filter(Boolean), nums=raw.map(Number).filter(x=>isFinite(x)), bad=raw.length-nums.length, s=stats(nums);
    if(!s){ $('#stOut',app).innerHTML='<p class="err">Enter at least one number.</p>'; return; }
    const lo=s.min, hi=s.max, bins=Math.min(8,Math.max(3,Math.ceil(Math.sqrt(s.n)))), w=(hi-lo)/bins||1, cnt=Array(bins).fill(0); s.sorted.forEach(x=>cnt[Math.min(bins-1,Math.floor((x-lo)/w))]++); const mxc=Math.max(...cnt);
    $('#stOut',app).innerHTML=`${bad?`<p class="err">${bad} value(s) were not numbers and were ignored.</p>`:''}<div class="statg">${[['n',s.n,'COUNT'],['Mean',fmt(s.mean),'AVERAGE'],['Median',fmt(s.median),'MEDIAN'],['Mode',s.mode.length?s.mode.join(', '):'none','MODE.MULT'],['Minimum',fmt(s.min),'MIN'],['Maximum',fmt(s.max),'MAX'],['Range',fmt(s.range),'MAX − MIN'],['Std. deviation',fmt(s.sd),'STDEV.S'],['Variance',fmt(s.variance),'VAR.S'],['Sum',fmt(s.sum),'SUM']].map(r=>`<div><small>${r[0]}</small><b>${r[1]}</b><code>${r[2]}</code></div>`).join('')}</div>
     <h4>Distribution</h4><div class="hist">${cnt.map((c,i)=>`<div><i style="height:${Math.round(c/mxc*100)}%"></i><b>${c}</b><small>${fmt(lo+i*w,1)}–${fmt(lo+(i+1)*w,1)}</small></div>`).join('')}</div><p class="tiny">Report in APA style as: <i>M</i> = ${fmt(s.mean)}, <i>SD</i> = ${fmt(s.sd)}, <i>N</i> = ${s.n}.</p>`; };
  $('#stGo',app).onclick=runSt; $('#stEx',app).onclick=()=>{ $('#stIn',app).value='22 31 18 27 35 29 24 31 19 26 31 28 33 21 25'; runSt(); }; runSt();

  /* 5 */
  const drawD=()=>{ const z=parseFloat($('#dz',app).value), sp=parseFloat($('#ds',app).value), U={KB:1,MB:2,GB:3,TB:4}[$('#du',app).value];
    if(!(z>0)){ $('#dOut',app).innerHTML='<p class="err">Enter a file size greater than 0.</p>'; return; } const bytes=z*1024**U, secs=sp>0?bytes*8/(sp*1e6):NaN;
    const t=!isFinite(secs)?'—':secs<60?fmt(secs,1)+' seconds':secs<3600?fmt(secs/60,1)+' minutes':fmt(secs/3600,1)+' hours';
    $('#dOut',app).innerHTML=`<div class="statg">${[['Bits',fmt(bytes*8,0)],['Bytes',fmt(bytes,0)],['KB',fmt(bytes/1024)],['MB',fmt(bytes/1024**2)],['GB',fmt(bytes/1024**3,3)],['Phone photos (≈3 MB)',fmt(bytes/1024**2/3,0)]].map(r=>`<div><small>${r[0]}</small><b>${r[1]}</b></div>`).join('')}</div><p>Download time at ${fmt(sp)} Mbps: <b>${t}</b> <span class="tiny">(${fmt(sp/8)} MB per second; real speeds vary)</span></p>`; };
  ['dz','ds'].forEach(id=>$('#'+id,app).oninput=drawD); $('#du',app).onchange=drawD; drawD();

  /* 6 */
  const drawB=()=>{ const t=$('#bi',app).value; let bytes=[]; try{ bytes=[...new TextEncoder().encode(t)]; }catch(e){ bytes=[...t].map(c=>c.charCodeAt(0)&255); }
    const chars=[...t]; let k=0; const rows=chars.map(ch=>{ const n=new TextEncoder().encode(ch).length; const b=bytes.slice(k,k+n); k+=n; return `<span class="bch"><b>${ch===' '?'␣':esc(ch)}</b>${b.map(x=>`<i>${x.toString(2).padStart(8,'0')}</i>`).join('')}<small>${b.join(' ')}</small></span>`; }).join('');
    $('#bOut',app).innerHTML=t?`<div class="bins">${rows}</div><p class="tiny">${chars.length} character(s) = ${bytes.length} byte(s) = ${bytes.length*8} bits. The small number under each character is its code in decimal.</p>`:'<p class="tiny">Type something.</p>'; };
  $('#bi',app).oninput=drawB; drawB();

  /* 7 */
  const runEm=()=>{ const r=emailCheck($('#emS',app).value,$('#emB',app).value); const pc=Math.round(r.score/r.R.length*100);
    $('#emOut',app).innerHTML=`<p><b class="${pc>=85?'okk':pc>=60?'':'err'}">${r.score} of ${r.R.length} checks passed</b></p><ul class="chk">${r.R.map(x=>`<li class="${x.ok?'y':'n'}"><b>${x.ok?'✔':'✘'} ${x.t}</b>${x.ok?'':`<small>${x.tip}</small>`}</li>`).join('')}</ul>${r.att?'<p class="tiny">📎 You mention an attachment: check that the file is really attached and clearly named before sending.</p>':''}`; };
  $('#emGo',app).onclick=runEm; $('#emBad',app).onclick=()=>{ $('#emS',app).value='hi'; $('#emB',app).value='sir plz accept my assignment i was SICK and could not submit!!! u can check its attached. thx'; runEm(); };
}

window.ICTTools = { render, passInfo, stats, apaRef, apaCite, emailCheck };
})();
