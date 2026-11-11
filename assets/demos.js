/* Educational animation widgets. Each demo explains one idea in steps.
   Controls: Play / Step / Reset. Keyboard in presentation: S = step, P = play, R = reset. */
(function(){
const D = {};
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const h = (tag, attrs={}, html='') => { const e=document.createElement(tag); for(const k in attrs) e.setAttribute(k,attrs[k]); if(html) e.innerHTML=html; return e; };

/* ---------- generic step engine ---------- */
function mount(el, id){
  const def = D[id]; if(!def){ el.textContent='Demo not found: '+id; return; }
  el.classList.add('demo'); el.innerHTML='';
  const title = def.title ? h('div',{class:'tiny'},'▶ Animation: <b>'+def.title+'</b>') : null;
  if(title) el.append(title);
  const stage = h('div',{class:'stage'}); const cap = h('div',{class:'cap','aria-live':'polite'});
  const ctl = h('div',{class:'ctl'});
  el.append(stage, cap, ctl);
  const ctx = def.build(stage) || {};
  const n = def.caps.length; let i = 0, timer = null;
  const play = h('button',{class:'btn sm pri',type:'button'},'▶ Play');
  const step = h('button',{class:'btn sm',type:'button'},'⏭ Step');
  const reset = h('button',{class:'btn sm',type:'button'},'↺ Reset');
  const dots = h('span',{class:'dots'}); for(let k=0;k<n;k++) dots.append(h('i'));
  if(n>1) ctl.append(play, step, reset, dots); else ctl.append(reset);
  function show(){
    cap.innerHTML = def.caps[i];
    [...dots.children].forEach((d,k)=>d.classList.toggle('on',k<=i));
    def.show(ctx, i, stage);
    step.disabled = i>=n-1;
  }
  function stop(){ clearInterval(timer); timer=null; play.textContent='▶ Play'; }
  function next(){ if(i<n-1){ i++; show(); } else stop(); }
  play.onclick = () => { if(timer){ stop(); return; } if(i>=n-1){ i=0; show(); } play.textContent='⏸ Pause'; timer=setInterval(next, RM?2600:2000); };
  step.onclick = () => { stop(); next(); };
  reset.onclick = () => { stop(); i=0; show(); };
  el._demo = { n, step:()=>step.click(), play:()=>{ if(!timer) play.click(); }, reset:()=>reset.click() };
  show();
}

/* ---------- generic flow: tiles connected by arrows ---------- */
function flow(title, tiles, caps, opts={}){
  return { title, caps,
    build(stage){
      const row = h('div',{class:'row'}); const els=[], arr=[];
      tiles.forEach((t,k)=>{
        if(k){ const a=h('span',{class:'arrow'},opts.vertical?'↓':'➜'); arr.push(a); row.append(a); }
        const d=h('div',{class:'tile'},`<span class="e">${t[0]}</span><b>${t[1]}</b>${t[2]?'<small>'+t[2]+'</small>':''}`);
        els.push(d); row.append(d);
      });
      stage.append(row); return {els,arr};
    },
    show(c,i){
      // step 0 = intro (nothing lit); step k lights tile k-1 (or a custom map)
      const lit = opts.map ? opts.map[i] : (i===0?-1:i-1);
      c.els.forEach((e,k)=>{ e.classList.toggle('on',k===lit); e.classList.toggle('good', opts.map? false : (k<lit)); e.classList.toggle('bad', !!(opts.bad && opts.bad[i]===k)); });
      c.arr.forEach((a,k)=>a.classList.toggle('on',k<lit));
    }};
}

/* ===== Session 1: IPO cycle ===== */
D.ipo = flow('The Input–Process–Output–Storage cycle',
  [['⌨️','Input','keyboard, mic, camera'],['🧠','Process','CPU follows instructions'],['🖥️','Output','screen, speaker, printer'],['💾','Storage','SSD, cloud']],
  ['Every computer task follows the same 4-stage cycle. Press <b>Step</b>.',
   '<b>Input:</b> you type the marks of 3 students: 70, 85, 90.',
   '<b>Process:</b> the CPU adds them and divides by 3 → 81.67.',
   '<b>Output:</b> the average "81.67" appears on the screen.',
   '<b>Storage:</b> the result is saved so you can open it tomorrow.']);

D.hardware = flow('What happens when you press the letter "A"',
  [['⌨️','Keyboard','input device'],['🔌','Motherboard','connects everything'],['🧠','CPU','processes signal'],['⚡','RAM','holds it right now'],['🖥️','Monitor','shows "A"'],['💾','SSD','keeps it after Save']],
  ['Follow one keypress through the hardware.',
   'The <b>keyboard</b> turns your press into an electrical signal (a code).',
   'The <b>motherboard</b> carries the signal along circuits to the CPU.',
   'The <b>CPU</b> (processor) works out which character it is.',
   '<b>RAM</b> holds the open document — temporary memory, lost when power goes off.',
   'The <b>monitor</b> (output device) draws the letter on screen.',
   'Only after <b>Save</b> is the file written to the <b>SSD</b>, which keeps data without power.']);

/* ===== Session 2: network packets ===== */
D.network = { title:'How data travels across a network', caps:[
  'You send a photo from your phone to a friend in another city.',
  'The photo is broken into small numbered pieces called <b>packets</b>.',
  'Packets travel by Wi-Fi to your <b>router</b> (your home or campus network = LAN).',
  'The router hands them to your <b>ISP</b> (e.g., PTCL, Nayatel, Jazz) which connects you to the <b>Internet</b>.',
  'Packets may take different routes. The receiving device puts them back <b>in order</b>.',
  'Photo delivered! Every device was found by its <b>IP address</b>, like a postal address.'],
  build(s){
    s.innerHTML=`<svg viewBox="0 0 760 220" role="img" aria-label="Network diagram">
      <path class="ln" id="n1" d="M95 110 H235"/><path class="ln" id="n2" d="M305 110 H425"/><path class="ln" id="n3" d="M495 110 H585"/>
      <path class="ln" id="n3b" d="M495 110 Q540 30 585 110"/>
      ${[['📱','Your phone',60],['📶','Router',270],['🌐','ISP / Internet',460],['📱','Friend',650]].map((t,k)=>`<g class="nd" id="nd${k}"><rect class="box" x="${t[2]-45}" y="70" width="90" height="80" rx="16"/><text x="${t[2]}" y="112" text-anchor="middle" font-size="32">${t[0]}</text><text x="${t[2]}" y="175" text-anchor="middle" font-size="15">${t[1]}</text></g>`).join('')}
      ${[0,1,2,3].map(k=>`<g class="tok hid" id="pk${k}"><rect x="-14" y="-12" width="28" height="24" rx="5" fill="var(--cy)"/><text x="0" y="5" text-anchor="middle" font-size="13" style="fill:#03222a;font-weight:700">${k+1}</text></g>`).join('')}
    </svg>`;
    return {pk:[0,1,2,3].map(k=>s.querySelector('#pk'+k)), nd:[0,1,2,3].map(k=>s.querySelector('#nd'+k)), ln:['n1','n2','n3','n3b'].map(k=>s.querySelector('#'+k))};
  },
  show(c,i){
    const xs=[60,270,460,650]; const pos = i<=1?0 : i===2?1 : i===3?2 : 3;
    c.pk.forEach((p,k)=>{ p.classList.toggle('hid', i===0); let x=xs[pos]+ (i===1? (k-1.5)*30 : (k-1.5)*16), y = 40 + (i===4 && k%2 ? -30:0);
      if(i>=5){ x=650+(k-1.5)*16; y=40; } p.setAttribute('transform',`translate(${x},${y})`); p.style.transform=`translate(${x}px,${y}px)`; });
    c.nd.forEach((n,k)=>n.classList.toggle('on', k===pos && i>0));
    c.ln.forEach((l,k)=>l.classList.toggle('on', (i===2&&k===0)||(i===3&&k===1)||(i===4&&(k===2||k===3))));
  }};

/* ===== Session 2: local vs cloud storage ===== */
D.cloudsync = { title:'Local storage vs cloud storage', caps:[
  'Your assignment file exists only on your laptop\'s drive = <b>local storage</b>.',
  'You save it in a synced folder (Google Drive / OneDrive). It <b>uploads</b> to the cloud.',
  'Your phone <b>syncs</b> — the same file appears there automatically.',
  'Your laptop is stolen or its drive fails 😱 …',
  '…but the cloud copy is safe. Sign in on any device and continue. <b>Cloud = access anywhere + backup</b>, but it needs internet and an account password.'],
  build(s){
    const r=h('div',{class:'row'});
    r.innerHTML=`<div class="tile" id="cl0"><span class="e">💻</span><b>Laptop</b><small>local drive</small></div><span class="arrow" id="ca0">⇄</span>
      <div class="tile dim" id="cl1"><span class="e">☁️</span><b>Cloud</b><small>provider's data centre</small></div><span class="arrow" id="ca1">⇄</span>
      <div class="tile dim" id="cl2"><span class="e">📱</span><b>Phone</b><small>signed-in device</small></div>`;
    s.append(r); return {t:[0,1,2].map(k=>r.querySelector('#cl'+k)), a:[0,1].map(k=>r.querySelector('#ca'+k))};
  },
  show(c,i){
    c.t[0].className='tile '+(i===3||i===4?'bad':'on'); c.t[0].querySelector('small').textContent = i>=3?'lost / broken':'local drive';
    c.t[1].className='tile '+(i>=1?(i===4?'good':'on'):'dim');
    c.t[2].className='tile '+(i>=2?(i===4?'good':'on'):'dim');
    c.a[0].classList.toggle('on',i===1); c.a[1].classList.toggle('on',i===2||i===4);
  }};

D.scope = flow('One ICT tool, many domains',
  [['🎓','Education','LMS, online classes'],['💼','Business','e-commerce, email'],['🏛️','Governance','e-Khidmat, NADRA'],['🩺','Healthcare','e-records, telemedicine'],['🎬','Media','streaming, news']],
  ['ICT is used in almost every field. Step through the domains.',
   '<b>Education:</b> Google Classroom, recorded lectures, online quizzes.',
   '<b>Business:</b> online stores, digital payments, video meetings.',
   '<b>Governance:</b> online services such as identity, tax filing and complaint portals.',
   '<b>Healthcare:</b> digital patient records, online doctor consultations, health apps.',
   '<b>Digital media & entertainment:</b> YouTube, streaming, online news, podcasts.']);

D.emerging = flow('Emerging technologies',
  [['🤖','AI','learns from data'],['📡','IoT','connected sensors'],['☁️','Cloud','computing on demand'],['🥽','AR / VR','mixed realities'],['🔗','Blockchain','shared ledger'],['📶','5G','very fast mobile']],
  ['Six technologies shaping the future. Step through them.',
   '<b>Artificial Intelligence:</b> software that learns patterns from data — chatbots, face unlock, translation.',
   '<b>Internet of Things:</b> everyday objects with sensors that send data — smartwatches, smart meters.',
   '<b>Cloud computing:</b> renting storage and software over the internet instead of buying hardware.',
   '<b>AR/VR:</b> AR adds digital objects to the real view; VR places you in a fully virtual world (e.g., exposure therapy research).',
   '<b>Blockchain:</b> a tamper-resistant shared record, used for cryptocurrency and supply chains.',
   '<b>5G:</b> faster, lower-delay mobile networks that enable remote surgery trials and smart cities.']);

/* ===== Session 3: search engines ===== */
D.searchpipe = flow('How a search engine works',
  [['🕷️','Crawl','bots visit pages'],['🗂️','Index','store words & links'],['⚖️','Rank','relevance + quality'],['📄','Results','the SERP']],
  ['A search engine does most of its work <b>before</b> you search.',
   '<b>Crawling:</b> automated programs (crawlers/spiders) follow links and download web pages.',
   '<b>Indexing:</b> words on each page are stored in a giant index — like the index at the back of a book.',
   '<b>Ranking:</b> when you search, algorithms order pages by relevance, quality, freshness, location and more.',
   'The <b>Search Engine Results Page (SERP)</b> shows ads (labelled "Sponsored") and organic results.']);

D.operators = { title:'Search operators narrow results', caps:[
  'Query: <b>stress students</b> → millions of mixed results.',
  'Add quotes: <b>"exam stress"</b> → only pages with that exact phrase.',
  'Add <b>site:.edu.pk</b> → only Pakistani university websites.',
  'Add <b>filetype:pdf</b> → only PDF documents (often reports and papers).',
  'Exclude a word with minus: <b>-advertisement</b>. Fewer, better results!'],
  build(s){
    const w=h('div',{style:'width:100%;max-width:600px'});
    w.innerHTML=`<div class="fx" id="q"></div><div class="meter"><i id="m"></i></div><div class="tiny" id="cnt" style="margin-top:6px"></div>`;
    s.append(w); return {q:w.querySelector('#q'),m:w.querySelector('#m'),c:w.querySelector('#cnt')};
  },
  show(c,i){
    const qs=['stress students','"exam stress"','"exam stress" site:.edu.pk','"exam stress" site:.edu.pk filetype:pdf','"exam stress" site:.edu.pk filetype:pdf -advertisement'];
    const w=[100,55,22,9,6]; const lbl=['very broad','exact phrase','one type of website','one file type','unwanted words removed'];
    c.q.textContent='🔎 '+qs[i]; c.m.style.width=w[i]+'%'; c.c.textContent='Result volume (illustrative): '+lbl[i];
  }};

/* ===== Session 4: email ===== */
D.emailflow = flow('The journey of an email',
  [['✍️','Compose','Gmail / Outlook'],['📤','Outgoing server','SMTP'],['🌐','Internet','DNS finds domain'],['📥','Recipient server','stores mail'],['📬','Inbox','IMAP / app']],
  ['What happens after you press <b>Send</b>?',
   'You write the message with To, Subject, body and attachment.',
   'Your provider\'s outgoing server uses <b>SMTP</b> (Simple Mail Transfer Protocol) to send it.',
   'The internet\'s address book (<b>DNS</b>) finds which server handles "@university.edu.pk".',
   'The recipient\'s mail server receives and stores the message (spam filters check it here).',
   'The recipient\'s app downloads/synchronises it using <b>IMAP</b>. Delivered in seconds.']);

D.emailcheck = { title:'Fixing an unprofessional email', caps:[
  'A student emails a teacher. What is wrong? Press <b>Step</b>.',
  '<b>Subject is empty</b> → write a clear subject: "Request: Assignment 1 extension – BS Psy (Sec A)".',
  '<b>Informal greeting</b> "hey sir!!" → use "Dear Sir," or "Dear Mr. Tahir,".',
  '<b>SMS language</b> "plz", "u", "asap" → write full, polite sentences.',
  '<b>No name/roll number</b> → end with a closing and signature: "Regards, Ayesha Khan, Roll No. 23-PSY-14".',
  'The improved email is clear, polite and complete. ✅'],
  build(s){
    const m=h('div',{class:'mail'});
    m.innerHTML=`<div class="f" id="e1"><b>Subject:</b> <span>(no subject)</span></div><div class="f" id="e2">hey sir!!</div>
      <div class="f" id="e3">plz give me more time for assignmnt, u know i was sick. reply asap</div><div class="f" id="e4">(no name)</div>`;
    s.append(m); return {f:[1,2,3,4].map(k=>m.querySelector('#e'+k))};
  },
  show(c,i){
    const bad=['<b>Subject:</b> <span>(no subject)</span>','hey sir!!','plz give me more time for assignmnt, u know i was sick. reply asap','(no name)'];
    const good=['<b>Subject:</b> Request: Assignment 1 extension – BS Psychology (Sec A)','Dear Sir,','I was unwell from 3–5 March (medical certificate attached). May I please submit Assignment 1 by 10 March? Thank you for considering my request.','Regards,<br>Ayesha Khan<br>Roll No. 23-PSY-14'];
    c.f.forEach((f,k)=>{ const fixed = i>k+1 || i===5; f.innerHTML = fixed?good[k]:bad[k]; f.className='f '+(i===k+1?'flag':fixed?'okk':''); });
  }};

/* ===== Session 5/6: Office tools ===== */
D.wordtoc = { title:'Heading styles build a Table of Contents', caps:[
  'A report typed as plain text: titles are just bold text.',
  'Apply <b>Heading 1</b> to chapter titles (Home → Styles).',
  'Apply <b>Heading 2</b> to sub-sections.',
  'References → <b>Table of Contents</b>: Word / Docs builds it automatically from the headings, with page numbers.',
  'Add a new heading later → click <b>Update Table</b>. No manual typing!'],
  build(s){
    const w=h('div',{class:'row',style:'align-items:flex-start'});
    w.innerHTML=`<div class="mail" style="max-width:300px" id="doc"></div><div class="mail" style="max-width:280px" id="toc"></div>`;
    s.append(w); return {doc:w.querySelector('#doc'),toc:w.querySelector('#toc')};
  },
  show(c,i){
    const H1=i>=1, H2=i>=2;
    c.doc.innerHTML=`<div style="${H1?'font-size:18px;color:var(--pri2);font-weight:700':'font-weight:700'}">1. Introduction</div><div style="${H2?'font-size:15px;color:var(--cy);font-weight:700;margin-left:8px':'font-weight:700'}">1.1 Background</div><div class="tiny">…text…</div><div style="${H1?'font-size:18px;color:var(--pri2);font-weight:700':'font-weight:700'}">2. Method</div><div style="${H2?'font-size:15px;color:var(--cy);font-weight:700;margin-left:8px':'font-weight:700'}">2.1 Participants</div>${i>=4?`<div style="font-size:18px;color:var(--pri2);font-weight:700">3. Results</div>`:''}`;
    c.toc.style.opacity = i>=3?1:.25;
    c.toc.innerHTML=`<b>Table of Contents</b><div>1. Introduction ........ 1</div><div style="margin-left:12px">1.1 Background ..... 1</div><div>2. Method .............. 2</div><div style="margin-left:12px">2.1 Participants ...... 2</div>${i>=4?'<div style="color:var(--ok)">3. Results ............ 3 ✚</div>':''}`;
  }};

D.sheet = { title:'How a spreadsheet formula is calculated', caps:[
  'Scores of three students on a stress scale (0–40). We want the average.',
  'Click cell <b>B5</b> and type <b>=AVERAGE(B2:B4)</b>. The colon means "from B2 to B4".',
  'The formula reads cells <b>B2, B3, B4</b> → 18, 26, 31.',
  'It calculates (18 + 26 + 31) ÷ 3 = <b>25</b>.',
  'Change B2 from 18 to 30 → the average <b>recalculates automatically</b> to 29.',
  'Now <b>=IF(B2>=27,"High","Normal")</b> labels each score. Formulas = live, reusable calculations.'],
  build(s){
    const w=h('div'); w.innerHTML=`<div class="fx" id="fx">fx</div><table class="sheet"><tr><th></th><th>A</th><th>B</th><th>C</th></tr>
      <tr><th>1</th><td>Name</td><td>Score</td><td>Level</td></tr><tr><th>2</th><td>Ali</td><td id="b2">18</td><td id="c2"></td></tr>
      <tr><th>3</th><td>Sara</td><td id="b3">26</td><td id="c3"></td></tr><tr><th>4</th><td>Hina</td><td id="b4">31</td><td id="c4"></td></tr>
      <tr><th>5</th><td>Average</td><td id="b5"></td><td></td></tr></table>`;
    s.append(w); const q=k=>w.querySelector('#'+k); return {fx:q('fx'),b:[q('b2'),q('b3'),q('b4')],b5:q('b5'),c:[q('c2'),q('c3'),q('c4')]};
  },
  show(c,i){
    const v=[i>=4?30:18,26,31];
    c.b[0].textContent=v[0];
    c.fx.textContent = i===0?'fx': i>=5?'fx  =IF(B2>=27,"High","Normal")':'fx  =AVERAGE(B2:B4)';
    c.b.forEach(b=>b.className = (i===2||i===4)?'on':'');
    c.b5.className = (i===3||i===4)?'res':''; c.b5.textContent = i>=3 ? (v.reduce((a,b)=>a+b)/3).toString() : (i>=1?'=AVERAGE(…)':'');
    c.c.forEach((x,k)=>{ x.textContent = i>=5 ? (v[k]>=27?'High':'Normal') : ''; x.className = i>=5?'res':''; });
  }};

D.slidefix = { title:'From a crowded slide to a clear slide', caps:[
  'A typical bad slide: a full paragraph, tiny text, many colours.',
  'Rule 1: <b>one idea per slide</b> — give it a clear title.',
  'Rule 2: <b>short points</b> (about 3–5 bullets, few words each), large font (≥ 24 pt).',
  'Rule 3: add <b>one relevant visual</b>; keep high contrast.',
  'Result: the audience listens to you instead of reading a wall of text. ✅'],
  build(s){ const m=h('div',{class:'mail',style:'max-width:520px;min-height:190px'}); s.append(m); return {m}; },
  show(c,i){
    if(i===0){ c.m.innerHTML=`<div style="font-size:11px;color:var(--warn)">Social media is a type of online platform that allows people to create and share content and interact with each other and it can affect mental health both positively and negatively because of comparison, cyberbullying, support networks, sleep disturbance, fear of missing out and many other factors that researchers have studied in many countries for many years…</div>`; return; }
    c.m.innerHTML=`<div style="font-family:var(--disp);font-size:22px;font-weight:700;color:var(--pri2)">Social Media & Mental Health</div>`+
      (i>=2?`<ul style="font-size:17px;margin:8px 0"><li>Support networks ➕</li><li>Social comparison ➖</li><li>Sleep disturbance ➖</li></ul>`:'')+
      (i>=3?`<div style="font-size:40px;text-align:right">📱⚖️🧠</div>`:'');
  }};

/* ===== Session 7: cloud sharing ===== */
D.share = { title:'Sharing permissions in cloud storage', caps:[
  'You own a file "Group Project.docx" in Google Drive / OneDrive / Dropbox.',
  '<b>Viewer:</b> can open and read only. Good for final reports.',
  '<b>Commenter:</b> can read and add comments/suggestions, cannot change text.',
  '<b>Editor:</b> can change content and share it further. Give only to group members.',
  '<b>"Anyone with the link"</b> means anyone who gets the link can open it — avoid for private data.'],
  build(s){
    const r=h('div',{class:'row'});
    r.innerHTML=['👀 Viewer','💬 Commenter','✏️ Editor','🔗 Anyone with link'].map((t,k)=>`<div class="tile" id="sp${k}"><span class="e">${t.split(' ')[0]}</span><b>${t.slice(t.indexOf(' ')+1)}</b><small>${['read only','read + comment','read + edit','public-ish'][k]}</small></div>`).join('');
    s.append(r); return {t:[0,1,2,3].map(k=>r.querySelector('#sp'+k))};
  },
  show(c,i){ c.t.forEach((t,k)=>t.className='tile '+(k===i-1?(k===3?'bad':'on'):'')); }};

D.backup321 = flow('The 3-2-1 backup rule',
  [['📄','3 copies','original + 2 backups'],['💽','2 media','e.g., laptop + USB'],['☁️','1 off-site','cloud copy']],
  ['How do professionals avoid losing data?',
   'Keep <b>3 copies</b> of important files (e.g., your thesis).',
   'Store them on <b>2 different types of media</b> — laptop SSD and an external drive.',
   'Keep <b>1 copy off-site</b>, such as cloud storage. A fire or theft cannot destroy all copies.']);

/* ===== Session 8: note-taking ===== */
D.notes = flow('Capture → Organise → Find → Sync',
  [['📝','Capture','type, photo, audio, web clip'],['🏷️','Organise','notebooks, sections, tags'],['🔍','Search','even text in images'],['🔄','Sync','phone ↔ laptop']],
  ['Digital note apps (Evernote, OneNote) follow four steps.',
   '<b>Capture:</b> type a lecture note, snap the whiteboard, record audio, clip a web article.',
   '<b>Organise:</b> OneNote uses Notebook → Section → Page; Evernote uses notebooks and <b>tags</b>.',
   '<b>Search:</b> find any word in seconds — both apps can search text inside images (OCR).',
   '<b>Sync:</b> notes update on all your signed-in devices through the cloud.']);

/* ===== Session 9: video conferencing ===== */
D.videocall = flow('What happens in a video call',
  [['🎥','Capture','camera + mic'],['🗜️','Compress','codec shrinks data'],['🌐','Send','internet'],['🖧','Server','Meet / Teams / Zoom'],['👥','Participants','decode & play']],
  ['Why does a weak connection freeze your video?',
   'Your camera and microphone capture many images and sound samples every second.',
   'A <b>codec</b> compresses the data so it can travel quickly.',
   'Data travels over the internet — slow or unstable bandwidth causes lag and freezing.',
   'The platform\'s servers forward your stream to everyone in the meeting.',
   'Each participant\'s device decodes and plays it. Tip: turning off video saves bandwidth.']);

/* ===== Session 10: social feed ===== */
D.feed = { title:'How a social media feed is ranked', caps:[
  'Posts arrive in time order. But apps rarely show them that way…',
  'The algorithm checks <b>signals</b>: who posted, likes, comments, shares, watch-time.',
  'Posts with high predicted engagement move <b>to the top</b>.',
  'Result: you see more of what you already react to → can create a <b>filter bubble</b>. Use "Following" / chronological view and diverse sources.'],
  build(s){
    const f=h('div',{class:'feed'}); const posts=[['Cousin\'s wedding photos','💬 2'],['Viral prank video','🔥 9.8k'],['University notice','👍 40'],['Friend\'s debate post','💬 1.2k']];
    posts.forEach((p,k)=>{ const d=h('div',{class:'post'},`<span>${p[0]}</span><b class="sig" style="opacity:0">${p[1]}</b>`); d.dataset.k=k; f.append(d); });
    s.append(f); return {f, posts:[...f.children]};
  },
  show(c,i){
    c.posts.forEach(p=>p.querySelector('.sig').style.opacity = i>=1?1:0);
    const order = i>=2 ? [1,3,2,0] : [0,1,2,3];
    order.forEach((k,pos)=>{ c.posts[k].style.order=pos; c.posts[k].style.borderColor = (i>=2&&pos===0)?'var(--cy)':''; });
    c.f.style.display='flex'; c.f.style.flexDirection='column';
  }};

D.profile = flow('Building a professional LinkedIn profile',
  [['🖼️','Photo','clear, professional'],['🏷️','Headline','BS Psychology student | …'],['📝','About','3–4 lines, goals'],['🎓','Education & skills','SPSS, counselling basics'],['🤝','Network','connect, post thoughtfully']],
  ['Your LinkedIn profile is your online CV.',
   'Use a clear, recent, professional photo — face visible, simple background.',
   'Headline example: <b>"BS Psychology student | Interested in Clinical & School Psychology"</b>.',
   'About: who you are, what you are learning, what you are looking for (internship, volunteering).',
   'List education, certificates (e.g., Coursera) and skills such as MS Excel, SPSS, report writing.',
   'Connect with classmates, teachers and professionals. Share and comment professionally.']);

/* ===== Session 11: LMS ===== */
D.lms = flow('An assignment\'s life inside an LMS',
  [['👩‍🏫','Teacher posts','instructions + due date'],['🔔','Notification','email / app'],['📤','Student submits','file before deadline'],['🔍','Check','similarity report'],['✅','Grade & feedback','returned online']],
  ['Learning Management Systems (Google Classroom, Moodle, Canvas) organise the whole cycle.',
   'The teacher creates an assignment with instructions, rubric and deadline.',
   'Students get a notification on the app or by email.',
   'The student uploads the file and clicks <b>Turn in / Submit</b>. Late work is marked "Late".',
   'Some LMSs include an originality check (e.g., Turnitin integration, Classroom originality reports).',
   'The teacher grades, writes feedback and returns it. Students see marks in one place.']);

/* ===== Session 12: online learning ===== */
D.mooc = flow('Taking an online course (MOOC)',
  [['🔎','Choose','Coursera, edX, Khan'],['🎬','Learn','videos + readings'],['📝','Practise','quizzes, peer review'],['🏅','Certificate','free or paid']],
  ['A MOOC is a Massive Open Online Course — anyone can join.',
   'Pick a course by topic, university, level and duration (e.g., "Introduction to Psychology").',
   'Watch short videos, read notes and join the discussion forum at your own pace.',
   'Complete graded quizzes and assignments, sometimes reviewed by other learners.',
   'Earn a certificate (often paid; financial aid available on some platforms) and add it to LinkedIn.']);

/* ===== Session 13: fitness tracking ===== */
D.fitness = flow('From your wrist to a health insight',
  [['⌚','Sensor','accelerometer, heart-rate'],['📲','Phone app','Bluetooth sync'],['☁️','Cloud','stores history'],['📊','Dashboard','trends & goals']],
  ['How does a fitness band count your steps?',
   'An <b>accelerometer</b> senses movement; an optical sensor estimates heart rate from blood flow.',
   'The band sends data by <b>Bluetooth</b> to an app such as Google Fit, Samsung Health or Apple Health.',
   'The app backs data up to the company\'s cloud — check privacy settings!',
   'Charts show steps, sleep and heart-rate trends. These are <b>estimates</b>, not medical diagnoses.']);

/* ===== Session 14: telemedicine ===== */
D.telemed = flow('A telemedicine consultation',
  [['📱','Search & book','Marham / Oladoc'],['🪪','Verify doctor','PMDC registration'],['🎥','Consult','video / audio / chat'],['💊','e-Prescription','advice & tests'],['📅','Follow-up','reminders']],
  ['Telemedicine = health care delivered at a distance using ICT.',
   'Search by specialty (e.g., psychiatrist, psychologist), city, fee and reviews; choose an online slot.',
   'Check the doctor\'s qualifications and <b>PMDC</b> registration (Pakistan Medical & Dental Council).',
   'Talk by video call from home. Platforms like Sehat Kahani connect patients with women doctors online.',
   'Receive advice or an electronic prescription; in-person visits are still needed for emergencies and examinations.',
   'Book follow-ups and keep your digital record. In an emergency, call <b>1122</b> instead.']);

/* ===== Session 15: digital payments ===== */
D.wallet = flow('Sending money with a mobile wallet',
  [['👤','You','enter amount + MPIN'],['📱','Wallet app','JazzCash / Easypaisa'],['🔐','Verify','MPIN / OTP'],['🔁','Payment rail','Raast / 1LINK'],['🏦','Receiver','bank or wallet'],['📩','Confirmation','SMS + receipt']],
  ['How does money move in a few seconds?',
   'You choose "Send money", enter the receiver\'s number or IBAN/Raast ID and the amount.',
   'The wallet app (a branchless-banking account) checks your balance.',
   'You confirm with a secret <b>MPIN</b> (never share it — not even with "bank staff").',
   'The transfer travels over a national payment system such as <b>Raast</b> (State Bank of Pakistan\'s instant payment system) or 1LINK.',
   'The receiver\'s account is credited instantly.',
   'Both sides get an SMS and a transaction ID — keep it as proof.']);

/* ===== Session 16: e-commerce ===== */
D.ecom = flow('What happens after you click "Place Order"',
  [['🛒','Cart','choose item'],['💳','Checkout','COD / card / wallet'],['🏬','Seller','packs order'],['🚚','Courier','tracking number'],['🏠','Delivery','inspect parcel'],['↩️','Return','within policy']],
  ['Follow one online order, e.g., on Daraz.',
   'Compare price, seller rating and reviews before adding to cart.',
   'Choose payment: <b>Cash on Delivery</b>, debit card or wallet. Check the total including delivery.',
   'The seller confirms and packs the order.',
   'A courier picks it up; you track it with a tracking number.',
   'At delivery, check the parcel. Keep the invoice.',
   'Wrong or damaged item? Use the platform\'s return/refund policy within the allowed days.']);

/* ===== Sessions 19–20: digital identity ===== */
D.footprint = { title:'Your digital footprint grows with every action', caps:[
  'You start with a clean profile.',
  '<b>Active footprint:</b> you post a picture and a comment — data you chose to share.',
  '<b>Passive footprint:</b> apps record your location, searches and likes — often without you noticing.',
  'Others add to it: friends tag you; a screenshot is shared.',
  'Years later, an employer or admissions officer searches your name. <b>Think before you post.</b>'],
  build(s){
    const w=h('div',{style:'width:100%;max-width:560px'});
    w.innerHTML=`<div class="row" id="fp"></div><div class="meter" style="margin:14px auto 0"><i id="fm"></i></div><div class="tiny" style="text-align:center;margin-top:6px">Footprint size</div>`;
    s.append(w); return {fp:w.querySelector('#fp'),fm:w.querySelector('#fm')};
  },
  show(c,i){
    const items=[[],[['📸','Post'],['💬','Comment']],[['📍','Location'],['🔍','Searches'],['❤️','Likes']],[['🏷️','Tagged photo'],['🖼️','Screenshot']],[['👔','Employer search']]];
    c.fp.innerHTML=''; items.slice(0,i+1).forEach((g,gi)=>g.forEach(t=>c.fp.append(h('div',{class:'tile '+(gi===i?'on':'')},`<span class="e">${t[0]}</span><small>${t[1]}</small>`))));
    c.fm.style.width=[5,30,60,85,100][i]+'%';
  }};

D.password = { title:'Try it: how strong is a password?', caps:['Type a <b>practice</b> password (not a real one). Nothing is saved or sent.'],
  build(s){
    const w=h('div',{style:'width:100%;max-width:520px'});
    w.innerHTML=`<label class="tiny" for="pw">Practice password</label><input id="pw" class="search" type="text" autocomplete="off" placeholder="e.g. ali123 or Blue-Mango-Tea-27!"><div class="meter" style="margin-top:10px"><i id="pm"></i></div><div class="result" id="pr">—</div><ul class="tiny" id="pl"></ul>`;
    s.append(w); const pw=w.querySelector('#pw'), pm=w.querySelector('#pm'), pr=w.querySelector('#pr'), pl=w.querySelector('#pl');
    pw.addEventListener('keydown',e=>e.stopPropagation());
    pw.addEventListener('input',()=>{ const v=pw.value; let sc=0; const tips=[];
      if(v.length>=12) sc+=2; else if(v.length>=8) sc+=1; else tips.push('Use at least 12 characters (a passphrase of 3–4 words is easy to remember).');
      if(/[a-z]/.test(v)&&/[A-Z]/.test(v)) sc++; else tips.push('Mix lowercase and UPPERCASE.');
      if(/\d/.test(v)) sc++; else tips.push('Add numbers.');
      if(/[^A-Za-z0-9]/.test(v)) sc++; else tips.push('Add a symbol like ! - #');
      if(/(123|password|qwerty|pakistan|786|abc)/i.test(v)){ sc=Math.min(sc,1); tips.unshift('Avoid common words and patterns (123, password, 786, your name).'); }
      const lv=v?['Very weak','Weak','Fair','Good','Strong','Very strong'][sc]:'—';
      pm.style.width=(v?(sc+1)/6*100:0)+'%'; pr.textContent=lv; pl.innerHTML=tips.map(t=>'<li>'+t+'</li>').join('') + (v?'<li>Use a different password for every account and turn on 2-step verification.</li>':''); });
    return {};
  }, show(){} };

D.netiquette = flow('Before you post: T.H.I.N.K.',
  [['✅','True?','checked facts'],['🤝','Helpful?','adds value'],['💡','Inspiring?','or constructive'],['⚖️','Necessary?','needed now'],['💛','Kind?','respectful tone']],
  ['A simple test before posting or replying online.',
   '<b>T</b> — Is it true? Have I verified it?',
   '<b>H</b> — Is it helpful to the reader or group?',
   '<b>I</b> — Is it inspiring or at least constructive?',
   '<b>N</b> — Is it necessary? Does the group chat need it at 2 a.m.?',
   '<b>K</b> — Is it kind? Would I say it face to face? If any answer is "no", reconsider.']);

/* ===== Sessions 21–22: cyberbullying ===== */
D.bullyrespond = flow('If you are cyberbullied: 5 steps',
  [['✋','Don\'t retaliate','stay calm'],['📸','Save evidence','screenshots, links, dates'],['🚫','Block & mute','limit contact'],['🚩','Report','platform + NCCIA'],['🗣️','Tell someone','trusted adult, counsellor']],
  ['A practical response plan. Step through it.',
   '<b>Do not reply in anger</b> — retaliation can escalate the situation.',
   '<b>Save evidence:</b> screenshots with usernames, dates and URLs before anything is deleted.',
   '<b>Block, mute or restrict</b> the person and tighten privacy settings.',
   '<b>Report</b> to the platform; serious cases can be reported to Pakistan\'s National Cyber Crime Investigation Agency (NCCIA, formerly the FIA Cyber Crime Wing) under PECA 2016.',
   '<b>Talk to someone</b> you trust — family, teacher, university counsellor. You are not alone.']);

D.bystander = { title:'The bystander in a group chat', caps:[
  'A hurtful meme about a classmate is posted in the class WhatsApp group.',
  'Option A — <b>Like or forward it:</b> you become part of the bullying. ❌',
  'Option B — <b>Stay silent:</b> the target feels everyone agrees (bystander effect). ⚠️',
  'Option C — <b>Upstander:</b> don\'t share, message the target privately with support, report to the admin/teacher. ✅'],
  build(s){ const r=h('div',{class:'row'}); r.innerHTML=['👍 Like / forward','🤐 Stay silent','🦸 Be an upstander'].map((t,k)=>`<div class="tile" id="by${k}"><span class="e">${t.split(' ')[0]}</span><b>${t.slice(t.indexOf(' ')+1)}</b></div>`).join(''); s.append(r); return {t:[0,1,2].map(k=>r.querySelector('#by'+k))}; },
  show(c,i){ c.t.forEach((t,k)=>t.className='tile '+(i===k+1?(k===2?'good':'bad'):(i>k+1?'dim':''))); }};

/* ===== Session 20/22: phishing ===== */
D.phishing = { title:'Spot the phishing message', caps:[
  'You receive this message. Is it real? Press <b>Step</b> to check the clues.',
  'Clue 1: the sender address is <b>not the official domain</b> (look-alike "jazzcash-reward.co").',
  'Clue 2: <b>urgency and fear</b> — "within 24 hours or your account will be blocked".',
  'Clue 3: asks for your <b>MPIN / OTP</b>. Real banks and wallets never ask for these.',
  'Clue 4: the link\'s real address differs from the text. Hover/long-press before clicking.',
  'Verdict: <b>PHISHING</b>. Do not click; report and delete. Call the official helpline from the app or card.'],
  build(s){
    const m=h('div',{class:'mail'});
    m.innerHTML=`<div class="f" id="p1"><b>From:</b> JazzCash Rewards &lt;alerts@jazzcash-reward.co&gt;</div>
      <div class="f" id="p2"><b>Subject:</b> URGENT!! Account will be BLOCKED in 24 hours</div>
      <div class="f" id="p3">Congratulations! You won Rs. 25,000. To claim, reply with your MPIN and the OTP sent to you.</div>
      <div class="f" id="p4">Claim now: <u style="color:var(--pri2)">www.jazzcash.com.pk</u> <span class="tiny" id="real" style="display:none">→ real link: http://bit-ly.click/xz91</span></div>`;
    s.append(m); return {f:[1,2,3,4].map(k=>m.querySelector('#p'+k)), real:m.querySelector('#real')};
  },
  show(c,i){ c.f.forEach((f,k)=>f.className='f '+(i>k?'flag':'')); c.real.style.display=i>=4?'inline':'none'; }};

/* ===== Sessions 23–24: IP & Creative Commons ===== */
D.ipTypes = flow('Four main types of intellectual property',
  [['©️','Copyright','books, music, photos, code'],['™️','Trademark','brand names, logos'],['💡','Patent','new inventions'],['🤫','Trade secret','secret recipes, methods']],
  ['Intellectual property (IP) = creations of the mind protected by law.',
   '<b>Copyright</b> protects original creative works automatically once fixed (written, recorded, saved).',
   '<b>Trademark</b> protects names, logos and slogans that identify a business (must be registered for full protection).',
   '<b>Patent</b> protects a new, useful invention for a limited time (usually 20 years) after registration.',
   '<b>Trade secret</b> protects valuable confidential business information. In Pakistan, IPO-Pakistan administers IP laws.']);

D.license = { title:'Try it: choose a Creative Commons licence', caps:['Choose what you allow others to do with your work.'],
  build(s){
    const w=h('div',{style:'width:100%;max-width:620px;text-align:center'});
    w.innerHTML=`<p class="tiny">Allow commercial use?</p><div class="row"><button class="opt on" data-c="1">Yes</button><button class="opt" data-c="0">No (NC)</button></div>
      <p class="tiny" style="margin-top:12px">Allow changes (adaptations)?</p><div class="row"><button class="opt on" data-d="y">Yes</button><button class="opt" data-d="sa">Yes, if shared alike (SA)</button><button class="opt" data-d="n">No (ND)</button></div>
      <div class="result" id="lr"></div><div class="tiny" id="lx"></div>`;
    s.append(w); let c='1', d='y';
    const upd=()=>{ const code='CC BY'+(c==='0'?'-NC':'')+(d==='sa'?'-SA':d==='n'?'-ND':'');
      w.querySelector('#lr').textContent='🅭 '+code;
      w.querySelector('#lx').innerHTML='Everyone must <b>give credit (BY)</b>'+(c==='0'?', may <b>not</b> use it commercially':'')+(d==='sa'?', and must share adaptations under the same licence':d==='n'?', and may not share modified versions':'')+'.'; };
    w.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{c=b.dataset.c; w.querySelectorAll('[data-c]').forEach(x=>x.classList.toggle('on',x===b)); upd();});
    w.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{d=b.dataset.d; w.querySelectorAll('[data-d]').forEach(x=>x.classList.toggle('on',x===b)); upd();});
    upd(); return {};
  }, show(){} };

/* ===== Sessions 25–26: plagiarism & APA ===== */
D.plag = { title:'Copying vs paraphrasing vs citing', caps:[
  '<b>Source:</b> "Regular physical activity reduces symptoms of anxiety and improves mood." (Khan, 2021)',
  '<b>Copy-paste without credit</b> → identical words, no citation = plagiarism ❌',
  '<b>Change a few words</b> ("patchwriting") → still plagiarism if not cited ❌',
  '<b>Real paraphrase + citation</b> → own words and sentence structure, with (Khan, 2021) ✅',
  '<b>Direct quote</b> → exact words in "quotation marks" with author, year and page ✅'],
  build(s){ const m=h('div',{class:'mail',style:'max-width:620px;font-size:16px'}); s.append(m); return {m}; },
  show(c,i){
    const t=['<i>Regular physical activity reduces symptoms of anxiety and improves mood.</i>',
      '<span class="f flag">Regular physical activity reduces symptoms of anxiety and improves mood.</span>',
      '<span class="f flag">Regular exercise lowers symptoms of anxiety and improves mood.</span>',
      '<span class="f okk">People who exercise often tend to feel less anxious and happier (Khan, 2021).</span>',
      '<span class="f okk">Khan (2021) states that "regular physical activity reduces symptoms of anxiety" (p. 14).</span>'];
    c.m.innerHTML=t[i] + (i>0?'<div class="tiny" style="margin-top:8px">Similarity checker: '+['','100% match','80% match','low match + cited','quoted + cited'][i]+'</div>':'');
  }};

D.apa = { title:'Building an APA 7th edition reference', caps:[
  'APA style is the standard for psychology. A journal article reference has 4 parts.',
  '<b>Author:</b> surname, initials. → Khan, S. A., & Ahmed, R.',
  '<b>Date:</b> year in brackets. → (2021).',
  '<b>Title:</b> sentence case, not italic. → Physical activity and anxiety among university students.',
  '<b>Source:</b> journal name and volume in italics, issue, pages, DOI.',
  'In-text citation: <b>(Khan & Ahmed, 2021)</b> or Khan and Ahmed (2021) found…'],
  build(s){ const m=h('div',{class:'mail',style:'max-width:680px;font-size:16px;line-height:1.7'}); s.append(m); return {m}; },
  show(c,i){
    const p=['<span style="color:var(--pri2)">Khan, S. A., &amp; Ahmed, R.</span>',' <span style="color:var(--cy)">(2021).</span>',' <span style="color:var(--ok)">Physical activity and anxiety among university students.</span>',' <span style="color:var(--warn)"><i>Pakistan Journal of Psychology, 52</i>(1), 10–24. https://doi.org/10.xxxx/xxxxx</span>'];
    c.m.innerHTML=(i===0?'<span class="tiny">Author. (Date). Title. <i>Source</i>.</span>':p.slice(0,Math.min(i,4)).join('')) + (i>=5?'<div class="tiny" style="margin-top:8px">(Example reference for practice — the DOI is a placeholder pattern.)</div>':'');
  }};

/* ===== Sessions 27–28: misinformation ===== */
D.sift = flow('Check a viral claim with SIFT',
  [['✋','Stop','pause before sharing'],['🕵️','Investigate source','who is behind it?'],['🔁','Find better coverage','what do others say?'],['🧭','Trace claims','to the original']],
  ['Viral post: <b>"Drinking hot water every hour cures viral infections — share with everyone!"</b>',
   '<b>S — Stop.</b> Strong emotion + "share with everyone" = warning sign. Don\'t forward yet.',
   '<b>I — Investigate the source.</b> An unnamed forwarded message, no doctor or organisation named.',
   '<b>F — Find better coverage.</b> Search the claim + "fact check". Health authorities (WHO, Ministry of Health) do not support it.',
   '<b>T — Trace to the original.</b> No study exists; the claim is a distortion. Verdict: <b>misinformation — do not share</b>.']);

D.misdis = { title:'Misinformation vs disinformation vs malinformation', caps:[
  'Not all false content is the same. The difference is <b>truth</b> and <b>intent</b>.',
  '<b>Misinformation:</b> false, but shared without intent to harm (an uncle forwards a fake remedy believing it).',
  '<b>Disinformation:</b> false and created <b>deliberately</b> to deceive (a fake news site, a deepfake of a politician).',
  '<b>Malinformation:</b> <b>true</b> information shared to harm (leaking someone\'s private photos or address).'],
  build(s){ const r=h('div',{class:'row'}); r.innerHTML=[['🤷','Misinformation','false · no harmful intent'],['🎭','Disinformation','false · intent to deceive'],['🗡️','Malinformation','true · intent to harm']].map((t,k)=>`<div class="tile" id="md${k}"><span class="e">${t[0]}</span><b>${t[1]}</b><small>${t[2]}</small></div>`).join(''); s.append(r); return {t:[0,1,2].map(k=>r.querySelector('#md'+k))}; },
  show(c,i){ c.t.forEach((t,k)=>t.className='tile '+(i===k+1?'on':i===0?'':'dim')); }};

D.deepfake = flow('Spotting a manipulated image or video',
  [['🔍','Reverse search','Google Lens, TinEye'],['👁️','Look closely','hands, eyes, lips, edges'],['🗓️','Check context','date, place, original post'],['📰','Cross-check','trusted news & fact-checkers']],
  ['AI tools can create realistic fake photos, voices and videos (deepfakes).',
   '<b>Reverse image search</b> finds where a picture first appeared — often an old, unrelated event.',
   'Look for odd details: extra fingers, blurred edges, lip-sync mismatch, strange lighting. (Detection is getting harder.)',
   'Check the context: is the date, place and original uploader real?',
   'Cross-check with trusted news outlets and fact-checking organisations before believing or sharing.']);

/* ===== Review / project ===== */
D.projectflow = flow('Your ICT project, step by step',
  [['🎯','Choose problem','daily / academic / health'],['🛠️','Pick ICT tools','Docs, Sheets, Forms, Canva'],['🧪','Build & test','collect data, refine'],['📊','Present','8–10 min + Q&A'],['📝','Reflect','ethics & limitations']],
  ['The final project shows you can apply ICT to a real need (LO3).',
   'Choose a real problem, e.g., "tracking sleep and mood of students for 2 weeks".',
   'Select suitable tools: Google Forms for a survey, Sheets for charts, Slides/Canva for the presentation.',
   'Collect data ethically (informed consent, no names), analyse it, improve the work.',
   'Present clearly: problem → tools → process → results → conclusion.',
   'Reflect on ethics, privacy, copyright of images used, and limitations.']);

D.cia = flow('Why online security matters: C-I-A',
  [['🔒','Confidentiality','only the right people see it'],['🧾','Integrity','data is not altered'],['🟢','Availability','there when needed']],
  ['Security professionals describe three goals.',
   '<b>Confidentiality:</b> your counselling notes or marks are seen only by authorised people (passwords, encryption).',
   '<b>Integrity:</b> data stays accurate — nobody changes your result or a medical record without permission.',
   '<b>Availability:</b> systems work when needed — backups and protection against attacks.']);

/* ---------- generic decision simulation: pick an option, get feedback ---------- */
function choice(title, prompt, options){
  return { title, caps:[prompt],
    build(s){
      const w=h('div',{style:'width:100%;max-width:640px'});
      w.innerHTML=`<div class="grid" style="gap:8px">${options.map((o,k)=>`<button class="opt" data-k="${k}" style="text-align:left;padding:12px 14px;font-size:15px">${String.fromCharCode(65+k)}. ${o[0]}</button>`).join('')}</div><div class="result" style="font-size:16px;text-align:left;font-family:var(--font)" aria-live="polite"></div>`;
      const r=w.querySelector('.result');
      w.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{ const o=options[+b.dataset.k];
        w.querySelectorAll('[data-k]').forEach(x=>{x.classList.remove('on'); x.style.borderColor='';});
        b.classList.add('on'); b.style.borderColor = o[1]==='good'?'var(--ok)':o[1]==='bad'?'var(--bad)':'var(--warn)';
        r.innerHTML = (o[1]==='good'?'✅ ':o[1]==='bad'?'❌ ':'⚠️ ')+o[2]; });
      s.append(w); return {w,r};
    },
    show(c){ c.r.innerHTML=''; c.w.querySelectorAll('[data-k]').forEach(x=>{x.classList.remove('on'); x.style.borderColor='';}); }};
}

/* ===== S1 extras ===== */
D.ecosystem = flow('The ICT ecosystem: components working together',
  [['👩‍🎓','People','users'],['💻','Hardware','devices'],['💿','Software','apps & OS'],['📶','Network','internet, Wi-Fi'],['☁️','Storage','local + cloud'],['📊','Information','useful result']],
  ['ICT is a system — every part depends on the others. Step through a real task: <b>sending a survey to research participants</b>.',
   '<b>People:</b> a psychology student designs the survey and participants answer it.',
   '<b>Hardware:</b> a laptop to create it; participants use phones.',
   '<b>Software:</b> Google Forms creates the survey; a browser opens it.',
   '<b>Network:</b> the link travels over the internet via WhatsApp or email.',
   '<b>Storage:</b> responses are saved in Google Sheets in the cloud and downloaded locally.',
   '<b>Information:</b> the student analyses the data and writes the report. All parts were needed!']);

D.hwsw = { title:'Hardware vs software', caps:[
  'A computer needs both. Step to sort each item.',
  '💻 Laptop, ⌨️ keyboard, 🖨️ printer → <b>hardware</b> (physical, you can touch it).',
  '🪟 Windows, 📝 MS Word, 📊 SPSS → <b>software</b> (instructions, you cannot touch it).',
  'Hardware without software = a box that does nothing. Software without hardware has nowhere to run. <b>They work together.</b>'],
  build(s){
    const r=h('div',{class:'row',style:'align-items:stretch'});
    r.innerHTML=`<div class="tile" id="hw" style="min-width:220px"><span class="e">🔩</span><b>Hardware</b><small id="hwl">physical parts</small></div><span class="arrow" id="hs">⇄</span><div class="tile" id="sw" style="min-width:220px"><span class="e">💿</span><b>Software</b><small id="swl">programs & instructions</small></div>`;
    s.append(r); return {hw:r.querySelector('#hw'),sw:r.querySelector('#sw'),hwl:r.querySelector('#hwl'),swl:r.querySelector('#swl'),a:r.querySelector('#hs')};
  },
  show(c,i){
    c.hwl.innerHTML = i>=1?'💻 Laptop · ⌨️ Keyboard · 🖨️ Printer':'physical parts';
    c.swl.innerHTML = i>=2?'🪟 Windows · 📝 Word · 📊 SPSS':'programs & instructions';
    c.hw.className='tile '+(i===1||i===3?'on':''); c.sw.className='tile '+(i===2||i===3?'on':''); c.a.classList.toggle('on',i===3);
  }};

D.dataflow = flow('Data flow: from questionnaire to report',
  [['📝','Raw data','answers 1–5'],['⌨️','Input','typed / online form'],['🧮','Processing','totals, averages'],['📈','Information','scores, charts'],['📄','Communication','report, slides']],
  ['How does raw data become knowledge you can share?',
   'Participants answer a stress questionnaire — raw numbers with no meaning yet.',
   'The answers are entered into a computer (or collected directly by Google Forms).',
   'Software such as Excel or SPSS calculates totals and averages.',
   'The results become information: "Average stress = 24 / 40", shown in a chart.',
   'Information is communicated through a report or presentation — the "C" in ICT.']);

/* ===== S2 extras ===== */
D.ailearn = flow('AI-assisted learning — used responsibly',
  [['❓','Ask','a clear question'],['🤖','AI explains','simple summary'],['🔎','Verify','textbook / Scholar'],['✍️','Write yourself','own words + citations'],['📤','Submit','honest work']],
  ['How can students use AI tools without cheating or being misled?',
   'Ask a focused question: "Explain classical conditioning with a classroom example."',
   'The AI tool gives a quick explanation. It may contain errors or invented references.',
   '<b>Verify</b> against your textbook, lecture notes or Google Scholar.',
   'Write the assignment in your own words and cite real sources. Follow your teacher\'s AI policy.',
   'Submit honest work. AI is a study helper, not a replacement for learning.']);

D.healthflow = flow('Digital healthcare workflow',
  [['📱','Book online','app / website'],['🗂️','Digital record','history, reports'],['🎥','Consult','in person or video'],['💊','e-Prescription','pharmacy'],['📊','Monitor','follow-up, apps']],
  ['How does ICT connect each step of modern health care?',
   'The patient books an appointment online instead of waiting in a queue.',
   'The clinic keeps an electronic health record (EHR) — history, lab results, allergies.',
   'The doctor or psychologist consults in person or by secure video call.',
   'Prescriptions and advice are shared digitally.',
   'Follow-up reminders and health apps track progress. Privacy of records is essential throughout.']);

/* ===== S4 extras ===== */
D.ccbcc = { title:'To vs CC vs BCC — who can see whom?', caps:[
  'Ayesha emails the class representative (To), copies her teacher (CC), and adds 3 classmates in BCC.',
  '<b>To:</b> Bilal (class rep) — he is expected to act or reply.',
  '<b>CC:</b> the teacher is informed. Bilal and the teacher can see each other\'s addresses.',
  '<b>BCC:</b> 3 classmates receive the email, but <b>nobody sees their addresses</b> — not even each other.',
  'If a BCC person clicks "Reply all", only the visible people get it — and the secret is revealed. Use BCC carefully!'],
  build(s){
    const r=h('div',{class:'row'});
    r.innerHTML=`<div class="tile on" id="cb0"><span class="e">👩</span><b>Ayesha</b><small>sender</small></div><span class="arrow on">➜</span>
      <div class="tile dim" id="cb1"><span class="e">🧑</span><b>To</b><small>Bilal</small></div>
      <div class="tile dim" id="cb2"><span class="e">👨‍🏫</span><b>CC</b><small>Teacher</small></div>
      <div class="tile dim" id="cb3"><span class="e">🕶️</span><b>BCC</b><small>3 classmates (hidden)</small></div>`;
    s.append(r); return {t:[1,2,3].map(k=>r.querySelector('#cb'+k))};
  },
  show(c,i){ c.t.forEach((t,k)=>t.className='tile '+(i===0?'dim':i===k+1?'on':(i>k+1?'good':'dim'))); if(i===4) c.t[2].className='tile bad'; }};

/* ===== S6: collaboration ===== */
D.coedit = { title:'Three students editing one Google Doc at the same time', caps:[
  'One shared document: "Group Report – Social Media & Sleep". Three cursors, one file.',
  '<b>Ali</b> types the Introduction — others see his text appear live.',
  '<b>Sara</b> adds a chart to Results at the same moment — no overwriting.',
  '<b>Hina</b> leaves a comment: "Add the APA reference here." Ali replies and resolves it.',
  'Everything is auto-saved. <b>Version history</b> shows who wrote what and when.'],
  build(s){ const m=h('div',{class:'mail',style:'max-width:600px;font-size:15px'}); s.append(m); return {m}; },
  show(c,i){
    const cur=(n,col)=>`<span style="display:inline-block;width:2px;height:1.1em;background:${col};vertical-align:middle;margin-left:2px"></span><span style="font-size:11px;background:${col};color:#fff;border-radius:4px;padding:0 4px;margin-left:2px">${n}</span>`;
    c.m.innerHTML=`<b>Group Report – Social Media & Sleep</b><div style="margin-top:8px"><b>Introduction</b><div>${i>=1?'Many students use social media late at night, which may reduce sleep quality.':''}${i>=1&&i<4?cur('Ali','#3b82f6'):''}</div></div>
     <div style="margin-top:8px"><b>Results</b><div>${i>=2?'📊 [Chart: average sleep by daily screen time]':''}${i>=2&&i<4?cur('Sara','#16a34a'):''}</div></div>
     ${i>=3?`<div class="f ${i>=4?'okk':'flag'}" style="margin-top:8px">💬 Hina: Add the APA reference here. ${i>=4?'— ✔ Resolved by Ali':''}</div>`:''}
     ${i>=4?'<div class="tiny" style="margin-top:8px">🕓 Version history: 10:02 Ali · 10:04 Sara · 10:05 Hina (comment) · 10:07 Ali</div>':''}`;
  }};

D.versions = flow('Version history — your safety net',
  [['📄','v1','10:00 draft'],['📝','v2','10:20 Sara edits'],['❌','v3','10:40 text deleted'],['↩️','Restore','back to v2']],
  ['Someone deleted half the report by mistake. Do not panic!',
   'Version 1 — the first draft is saved automatically.',
   'Version 2 — Sara improves the method section.',
   'Version 3 — a group member accidentally deletes a section.',
   'File → Version history → choose v2 → <b>Restore this version</b>. Nothing is lost.']);

/* ===== S7 extras ===== */
D.upload = flow('Upload, sync and download',
  [['💻','Your file','Report.docx'],['⬆️','Upload','to the cloud'],['☁️','Cloud copy','stored safely'],['⬇️','Download','to another PC'],['🔄','Sync','auto-update']],
  ['Moving a file between your computer and the cloud.',
   'Your report exists on your laptop.',
   '<b>Upload:</b> drag it into Drive / OneDrive / Dropbox (or use the New → File upload button).',
   'The provider stores a copy in its data centre.',
   '<b>Download:</b> on a lab PC, sign in and download the file to edit offline.',
   '<b>Sync:</b> with the desktop app, changes upload automatically — no manual upload needed.']);

/* ===== S9: video meetings ===== */
D.meetjoin = flow('Joining an online class meeting',
  [['🔗','Get link','calendar / LMS'],['🎧','Check devices','mic, camera, speaker'],['🚪','Join / lobby','host admits you'],['🔇','Mute','until you speak'],['✋','Participate','raise hand, chat']],
  ['How to join a Google Meet / Teams / Zoom class professionally.',
   'Open the link from the official calendar invite, Google Classroom or Teams — never from unknown sources.',
   'Preview your microphone, camera and speakers. Use earphones to avoid echo.',
   'Click <b>Join</b>. In some meetings you wait in a lobby/waiting room until the host admits you.',
   'Mute your microphone when you are not speaking.',
   'Use <b>Raise hand</b> and chat for questions. Leave politely when the meeting ends.']);

D.screenshare = { title:'Screen sharing: what others can see', caps:[
  'You are presenting your group\'s slides in a Teams/Zoom/Meet call.',
  'Option 1 — <b>Share entire screen:</b> everyone sees everything, including notifications and other open apps. ⚠️',
  'Option 2 — <b>Share a window / tab:</b> others see only the slides. ✅ Safer and more focused.',
  'Before sharing: close private tabs, mute notifications. Stop sharing when you finish.'],
  build(s){ const r=h('div',{class:'row'}); r.innerHTML=`<div class="tile" id="ss0" style="min-width:220px"><span class="e">🖥️</span><b>Entire screen</b><small>slides + WhatsApp + email…</small></div><div class="tile" id="ss1" style="min-width:220px"><span class="e">🪟</span><b>One window / tab</b><small>slides only</small></div>`; s.append(r); return {t:[r.querySelector('#ss0'),r.querySelector('#ss1')]}; },
  show(c,i){ c.t[0].className='tile '+(i===1?'bad':i>=2?'dim':''); c.t[1].className='tile '+(i>=2?'good':''); }};

D.meetetiquette = choice('Meeting etiquette — what would you do?','Your group meeting on Zoom has started. You are at home and your little brother is noisy. What should you do?',[
  ['Keep the microphone on and talk over the noise','bad','Background noise disturbs everyone. Mute when not speaking.'],
  ['Mute, use chat or raise hand, unmute only when speaking','good','Professional and considerate. Earphones also reduce echo.'],
  ['Leave the meeting without telling anyone','bad','Inform the group in chat if you must leave.'],
  ['Turn off the camera and say nothing for the whole meeting','warn','Camera off is fine if bandwidth is low, but you should still participate.']]);

/* ===== S10: social network ===== */
D.socialnet = { title:'How social networks connect people', caps:[
  'You join a platform. You are one node in a huge network.',
  'You connect with friends and classmates — <b>1st-degree</b> connections.',
  'Their connections are your <b>2nd-degree</b> network — on LinkedIn, a friend can introduce you to a psychologist they know.',
  'One post can travel through these links to thousands of people. Networks give <b>reach</b> — use it wisely.'],
  build(s){
    const pts=[[300,110],[180,60],[180,160],[420,60],[420,160],[80,30],[80,110],[90,190],[520,30],[530,110],[520,190]];
    const L=[[0,1],[0,2],[0,3],[0,4],[1,5],[1,6],[2,7],[3,8],[4,9],[4,10]];
    s.innerHTML=`<svg viewBox="0 0 600 220" role="img" aria-label="Network graph">${L.map((l,k)=>`<line class="ln" id="sl${k}" x1="${pts[l[0]][0]}" y1="${pts[l[0]][1]}" x2="${pts[l[1]][0]}" y2="${pts[l[1]][1]}"/>`).join('')}
      ${pts.map((p,k)=>`<g id="sn${k}"><circle class="box" cx="${p[0]}" cy="${p[1]}" r="${k?18:26}"/><text x="${p[0]}" y="${p[1]+6}" text-anchor="middle" font-size="${k?16:22}">${k?'👤':'🙋'}</text></g>`).join('')}</svg>`;
    return {n:pts.map((_,k)=>s.querySelector('#sn'+k)), l:L.map((_,k)=>s.querySelector('#sl'+k))};
  },
  show(c,i){
    c.n.forEach((n,k)=>{ const tier = k===0?0 : k<=4?1 : 2; n.style.opacity = tier===0||i>=tier ? 1 : .2; n.classList.toggle('on', (i===1&&tier===1)||(i===2&&tier===2)||(i===3)); });
    c.l.forEach((l,k)=>{ l.classList.toggle('on', i===3 || (i===1&&k<4) || (i===2&&k>=4)); l.style.opacity = (k<4?i>=1:i>=2)?1:.15; });
  }};

D.postcheck = choice('Professional or not?','You are a BS Psychology student with a LinkedIn profile. Which post is most appropriate?',[
  ['A photo of a classmate crying in class, with a funny caption','bad','Never post others without consent. This is harmful and unprofessional.'],
  ['"Completed a Coursera course on Psychological First Aid. Key lesson: listening without judgement." + certificate','good','Professional, positive and shows learning.'],
  ['Details of a case discussed in your counselling practicum','bad','Breaks confidentiality — a serious ethical violation even without names.'],
  ['A long angry post about your teacher\'s grading','bad','Public complaints damage your reputation. Use proper channels.']]);

/* ===== S12: online course ===== */
D.enroll = flow('Enrolling in an online course',
  [['🔎','Search','topic + level'],['📋','Check','syllabus, reviews, cost'],['📝','Enrol / audit','free or paid'],['📈','Progress','weekly modules'],['🏅','Certificate','share on LinkedIn']],
  ['Example: enrolling in a free psychology course on Coursera or edX.',
   'Search a topic such as "Introduction to Psychology" or "Mental Health First Aid".',
   'Check the syllabus, institution, duration, ratings and whether a certificate is paid.',
   'Enrol. Many courses can be <b>audited</b> (study for free without a certificate). Financial aid may be available.',
   'Complete weekly videos, readings and quizzes. The progress bar shows how far you are.',
   'Finish graded work to earn a certificate (where offered) and add it to your profile.']);

D.vclass = flow('Inside a virtual classroom',
  [['🎥','Live video','teacher + students'],['🖥️','Shared screen','slides, whiteboard'],['💬','Chat & polls','instant feedback'],['👥','Breakout rooms','small groups'],['⏺️','Recording','revise later']],
  ['A virtual classroom recreates class interaction online.',
   'Teacher and students meet live through Meet, Teams or Zoom.',
   'The teacher shares slides or an online whiteboard.',
   'Students answer polls and ask questions in chat.',
   'Breakout rooms let small groups discuss a case and return.',
   'Recordings (with consent and policy) let students revise later.']);

/* ===== S13: wellbeing ===== */
D.wellbeing = { title:'A digital well-being dashboard', caps:[
  'Android Digital Wellbeing / iOS Screen Time show how you use your phone.',
  'Screen time today: <b>6 h 40 m</b>. Most used: social media 3 h.',
  'Phone unlocked <b>92 times</b>; 210 notifications.',
  'Set limits: app timer 1 h for social media, Bedtime / Focus mode from 11 pm.',
  'After a week: screen time down to 4 h, sleep improved. Small changes help. <i>(Fictional example.)</i>'],
  build(s){
    const w=h('div',{style:'width:100%;max-width:520px'});
    w.innerHTML=`<div class="tiny">Screen time</div><div class="meter"><i id="w1"></i></div><div class="tiny" style="margin-top:8px">Unlocks</div><div class="meter"><i id="w2"></i></div><div class="tiny" style="margin-top:8px">Sleep quality</div><div class="meter"><i id="w3"></i></div><div class="result" id="wr"></div>`;
    s.append(w); return {a:w.querySelector('#w1'),b:w.querySelector('#w2'),c:w.querySelector('#w3'),r:w.querySelector('#wr')};
  },
  show(c,i){ const v=[[0,0,0],[83,0,40],[83,92,40],[83,92,40],[50,45,75]][i]; c.a.style.width=v[0]+'%'; c.b.style.width=v[1]+'%'; c.c.style.width=v[2]+'%'; c.r.textContent=['','6h 40m','92 unlocks','⏲ Limits ON','4h · better sleep'][i]; }};

/* ===== S15: banking ===== */
D.bankflow = flow('Online / mobile banking login and transfer',
  [['📲','Official app','from Play/App Store'],['🔑','Login','username + password'],['📩','OTP / biometric','second factor'],['💸','Transfer','IBAN / Raast ID'],['🧾','Receipt','save transaction ID']],
  ['How secure online banking works (simulated — never share real details).',
   'Install only the bank\'s official app; check the developer name.',
   'Log in with your own username and password — never on public or shared phones.',
   'A one-time password (OTP) or fingerprint confirms it is really you (two-factor authentication).',
   'Enter the receiver\'s IBAN, account number or Raast ID; double-check the name shown.',
   'Save the receipt / transaction ID. Check your SMS alerts for any transaction you did not make.']);

D.fraudcall = choice('Fraud awareness: what would you do?','You get a call: "I am from the bank. Your account will be blocked. Tell me the code we just sent by SMS." What should you do?',[
  ['Read out the code quickly to save the account','bad','This is a common scam. The code (OTP) gives the caller access to your account.'],
  ['Hang up, never share the code, call the official helpline printed on your card/app','good','Correct. Banks and wallets never ask for OTP, PIN or passwords.'],
  ['Give only half of the code','bad','Never share any part of a code or PIN.'],
  ['Ask the caller to prove their identity first, then share','bad','Fraudsters can sound very convincing and know some of your details. Never share.']]);

/* ===== S16: shopping ===== */
D.compare = { title:'Comparing two online offers', caps:[
  'Two sellers offer the same wireless earbuds.',
  'Seller A: Rs 2,499 · rating 4.7 ★ (1,250 reviews) · 7-day return · official store.',
  'Seller B: Rs 1,199 · rating 3.1 ★ (12 reviews) · no returns · new seller.',
  'Reviews mention "fake product" for Seller B. A very low price can be a red flag.',
  'Decision: Seller A is safer value. Compare <b>price + rating + reviews + return policy + seller history</b>. <i>(Fictional example.)</i>'],
  build(s){ const r=h('div',{class:'row',style:'align-items:stretch'}); r.innerHTML=`<div class="tile" id="sa" style="min-width:220px"><span class="e">🏬</span><b>Seller A</b><small id="sat">—</small></div><div class="tile" id="sb" style="min-width:220px"><span class="e">🏚️</span><b>Seller B</b><small id="sbt">—</small></div>`; s.append(r); return {a:r.querySelector('#sa'),b:r.querySelector('#sb'),at:r.querySelector('#sat'),bt:r.querySelector('#sbt')}; },
  show(c,i){ c.at.innerHTML=i>=1?'Rs 2,499 · 4.7★ (1,250) · 7-day return':'—'; c.bt.innerHTML=i>=2?'Rs 1,199 · 3.1★ (12) · no returns':'—';
    c.a.className='tile '+(i===1?'on':i>=4?'good':''); c.b.className='tile '+(i===2?'on':i>=3?'bad':''); }};

/* ===== S17: privacy settings ===== */
D.privacy = { title:'Privacy settings: who can see your post?', caps:[
  'You post a photo from your university event.',
  '<b>Public:</b> anyone on or off the platform — including strangers and future employers.',
  '<b>Friends / followers:</b> only people you accepted. Safer for personal posts.',
  '<b>Close friends / custom list:</b> a small trusted group.',
  '<b>Only me:</b> private. Also check: location tags, who can tag you, profile search visibility.'],
  build(s){
    const r=h('div',{class:'row'});
    r.innerHTML=[['🌍','Public','everyone'],['👥','Friends','accepted people'],['💚','Close friends','small list'],['🔒','Only me','private']].map((t,k)=>`<div class="tile" id="pv${k}"><span class="e">${t[0]}</span><b>${t[1]}</b><small>${t[2]}</small></div>`).join('');
    s.append(r); return {t:[0,1,2,3].map(k=>r.querySelector('#pv'+k))};
  },
  show(c,i){ c.t.forEach((t,k)=>t.className='tile '+(i===k+1?(k===0?'bad':'good'):'')); }};

D.identityform = flow('How an online identity forms',
  [['🙋','Profile','name, photo, bio'],['📝','Posts','what you share'],['💬','Interactions','comments, likes'],['🏷️','Others\' content','tags, mentions'],['🔎','Search result','what people find']],
  ['Your digital identity is built from many small pieces.',
   'The profile you create: name, photo, bio, username.',
   'What you post: photos, opinions, achievements.',
   'How you interact: tone of comments, groups you join, pages you like.',
   'What others post about you: tags, mentions, shared screenshots.',
   'Together these create the impression people get when they search your name.']);

D.reputation = choice('Digital reputation scenario','Sana (BS Psychology, 6th semester) is applying for an internship at a counselling centre. The supervisor searches her name. What will help her most?',[
  ['A public profile full of memes mocking people with mental illness','bad','Shows stigma and poor judgement — very damaging for a psychology career.'],
  ['A LinkedIn profile with education, volunteering at a mental-health awareness walk, and a blog post on exam stress','good','A positive, professional footprint supports her application.'],
  ['No online presence at all','warn','Not harmful, but a professional profile can show skills and interests.'],
  ['Old arguments in comment sections using abusive language','bad','Old posts can resurface. Review and clean up your footprint.']]);

/* ===== S18: netiquette decisions ===== */
D.respect = { title:'Respectful vs disrespectful replies', caps:[
  'In a class discussion forum, a classmate writes: "I think social media helps students more than it harms them."',
  'Reply A: <b>"This is the dumbest thing I\'ve read. LOL."</b> → personal attack, mocking. ❌',
  'Reply B: <b>"I see your point about support groups, but research also links heavy use to poorer sleep. What do you think?"</b> → respectful disagreement. ✅',
  'Disagree with the <b>idea</b>, not the <b>person</b>. Use evidence, ask questions, stay polite.'],
  build(s){ const r=h('div',{class:'feed',style:'max-width:600px'}); r.innerHTML=`<div class="post" id="rp0"><span>💬 Reply A</span></div><div class="post" id="rp1"><span>💬 Reply B</span></div>`; s.append(r); return {a:r.querySelector('#rp0'),b:r.querySelector('#rp1')}; },
  show(c,i){ c.a.innerHTML='<span>'+(i>=1?'"This is the dumbest thing I\'ve read. LOL."':'💬 Reply A')+'</span>'+(i>=1?'<b style="color:var(--bad)">❌</b>':''); c.b.innerHTML='<span>'+(i>=2?'"I see your point about support groups, but research also links heavy use to poorer sleep. What do you think?"':'💬 Reply B')+'</span>'+(i>=2?'<b style="color:var(--ok)">✅</b>':'');
    c.a.style.borderColor=i>=1?'var(--bad)':''; c.b.style.borderColor=i>=2?'var(--ok)':''; }};

D.netdecide = choice('Netiquette decision simulation','It is 1:30 a.m. You just remembered a question about tomorrow\'s assignment. What is the best action?',[
  ['Send 5 voice notes to the teacher on WhatsApp right now','bad','Late-night messages to teachers are inappropriate; many messages feel like pressure.'],
  ['Post "WHY IS THIS ASSIGNMENT SO HARD???" in the class group','bad','All caps reads as shouting and the tone is negative.'],
  ['Check the LMS and class group for answers; if still unclear, email the teacher politely in the morning','good','Respects time and boundaries, uses the right channel.'],
  ['Copy a friend\'s assignment instead','bad','That is academic dishonesty — and identical work gets zero.']]);

/* ===== S19–20: safety ===== */
D.bullyforms = flow('Common forms of cyberbullying',
  [['💬','Harassment','repeated hurtful messages'],['🗣️','Denigration','spreading rumours'],['🎭','Impersonation','fake account'],['🚪','Exclusion','deliberately leaving out'],['📤','Outing','sharing private info']],
  ['Cyberbullying = repeated, intentional harm using digital technology. (Educational, non-graphic examples.)',
   '<b>Harassment:</b> sending repeated insulting or threatening messages.',
   '<b>Denigration:</b> posting rumours or edited images to damage someone\'s reputation.',
   '<b>Impersonation:</b> creating a fake account in someone\'s name to embarrass them.',
   '<b>Exclusion:</b> deliberately removing someone from group chats or games to isolate them.',
   '<b>Outing / doxxing:</b> sharing someone\'s private messages, photos or address without consent.']);

D.safeunsafe = choice('Safe or unsafe?','A person you met in an online gaming group asks for your home address and a photo of your university ID card "to send you a gift". What do you do?',[
  ['Send it — they seem friendly','bad','Never share addresses or ID documents with online contacts. This can lead to fraud or stalking.'],
  ['Politely refuse, stop sharing personal details, block/report if they insist','good','Correct. Protect personal information and trust your discomfort.'],
  ['Send only the ID card photo','bad','ID cards contain your name, number and photo — useful for identity theft.'],
  ['Ask a friend to send their address instead','bad','That puts your friend at risk.']]);

D.reportflow = flow('Reporting abuse on a platform',
  [['📸','Evidence','screenshots, links'],['⋯','Report button','on post / profile'],['🏷️','Choose reason','harassment, fake…'],['🚫','Block','stop contact'],['🏛️','Escalate','institution / NCCIA']],
  ['How to report harmful content (most platforms work similarly).',
   'Save evidence first — screenshots showing username, date and content.',
   'Tap the ⋯ (three dots) menu on the post, message or profile → <b>Report</b>.',
   'Choose the closest reason: harassment, impersonation, hate speech, sharing private images…',
   'Block the account so they cannot contact you.',
   'If threats, blackmail or private images are involved, inform your university and report to Pakistan\'s cybercrime authority (NCCIA). Seek support.']);

/* ===== S21–22: copyright & ethics ===== */
D.ownership = flow('Who owns this content?',
  [['📸','You take a photo','you are the author'],['©️','Copyright','automatic'],['📤','You post it','still yours'],['🔁','Someone reuses','needs permission / licence'],['🏷️','Credit','attribution']],
  ['Ownership of creative work in the digital world.',
   'You take a photo at a seminar. You are its creator.',
   'Copyright protection starts automatically when the work is created — no registration needed (registration helps prove it).',
   'Posting it online does <b>not</b> give it away; platforms get a licence under their terms, but you keep ownership.',
   'Others need your permission or a licence (e.g., Creative Commons) to reuse it.',
   'Even with permission, give credit: "Photo: Ayesha Khan".']);

D.licensed = choice('Licensed vs unauthorised content','You need an image of the human brain for your presentation. Which choice is ethical?',[
  ['Download any image from Google Images and use it without credit','bad','Most images online are copyrighted; "found on Google" is not permission.'],
  ['Use a CC BY image from Wikimedia Commons and write the credit on the slide','good','Licensed for reuse with attribution — the ethical choice.'],
  ['Screenshot a textbook diagram and remove the publisher\'s watermark','bad','Removing watermarks and copying is unauthorised use.'],
  ['Create your own simple diagram in PowerPoint or Canva','good','Original work — also ethical. Cite the source of the information.']]);

D.ethicdecide = flow('Ethical decision-making in four questions',
  [['⚖️','Legal?','laws, policies'],['🤝','Fair?','respects others'],['🔒','Private?','consent, confidentiality'],['🪞','Public test','OK if everyone knew?']],
  ['Before an ICT action — sharing, recording, collecting data — ask four questions.',
   '<b>Is it legal?</b> PECA 2016, copyright law, university rules.',
   '<b>Is it fair?</b> Does it harm or deceive anyone?',
   '<b>Does it respect privacy?</b> Do I have consent? Is data kept confidential?',
   '<b>Would I be comfortable if it became public?</b> If not, don\'t do it.']);

D.datause = choice('Responsible data use — research scenario','You collected survey data from 40 students for a class project. A friend asks for the file "to see who is depressed". What should you do?',[
  ['Share it — it is just a class project','bad','Participants trusted you with confidential data. Sharing breaks research ethics.'],
  ['Refuse; keep data anonymous, password-protected, used only for the stated purpose','good','Confidentiality and purpose limitation are core research ethics principles.'],
  ['Share only names of students with high scores','bad','This is even more harmful — identifiable sensitive data.'],
  ['Post a summary chart with no names in the class group','warn','Aggregate anonymous results can be shared if participants were told; never individual data.']]);

/* ===== S24: content creation ===== */
D.research2content = flow('From research to original content',
  [['📚','Read sources','3–5 reliable'],['🗒️','Take notes','own words + citation'],['🧩','Synthesise','connect ideas'],['✍️','Create','article, poster, video'],['🔗','Cite','reference list / credits']],
  ['How to create original content from research — e.g., an awareness poster on exam stress.',
   'Read 3–5 reliable sources (journal articles, WHO, university counselling pages).',
   'Take notes in your own words and record the source of each idea.',
   'Synthesise: combine ideas into your own structure and message.',
   'Create the content using your own design and words (Canva, PowerPoint, video).',
   'Cite sources and credit images. Original + honest = ethical content.']);

D.citeflow = flow('Citation workflow',
  [['🔎','Find source','Scholar, library'],['🧾','Record details','author, year, title'],['❝','In-text','(Author, Year)'],['📚','Reference list','APA 7'],['✅','Check','every citation matched']],
  ['Citing correctly, step by step.',
   'Find a credible source and save it (Zotero or Mendeley can help).',
   'Record author(s), year, title, journal/website, volume, pages and DOI/URL.',
   'In your text, cite when you use the idea: (Khan & Ahmed, 2021).',
   'List the full reference alphabetically at the end in APA 7th edition format.',
   'Check: every in-text citation has a reference, and every reference is cited.']);

/* ===== S25–26: misinformation ===== */
D.spread = { title:'How misinformation spreads', caps:[
  'One person posts a shocking false claim. 😮',
  'Three friends share it within minutes — emotional content travels fast.',
  'Each share reaches more people: 1 → 3 → 9 → 27…',
  'A fact-check is published later, but reaches far fewer people. Stopping the first shares matters most.'],
  build(s){
    const N=[[300,30]]; [[150,100],[300,100],[450,100]].forEach(p=>N.push(p)); for(let k=0;k<9;k++) N.push([45+k*64,190]);
    const L=[]; for(let k=1;k<=3;k++) L.push([0,k]); for(let k=0;k<9;k++) L.push([1+Math.floor(k/3),4+k]);
    s.innerHTML=`<svg viewBox="0 0 600 220" role="img" aria-label="Spread network">${L.map((l,k)=>`<line class="ln" id="ml${k}" x1="${N[l[0]][0]}" y1="${N[l[0]][1]}" x2="${N[l[1]][0]}" y2="${N[l[1]][1]}"/>`).join('')}${N.map((p,k)=>`<g id="mn${k}"><circle class="box" cx="${p[0]}" cy="${p[1]}" r="17"/><text x="${p[0]}" y="${p[1]+6}" text-anchor="middle" font-size="16">${k?'👤':'📢'}</text></g>`).join('')}
      <g id="fcx" opacity="0"><rect x="470" y="10" width="125" height="40" rx="10" fill="var(--ok)" opacity=".2" stroke="var(--ok)"/><text x="532" y="36" text-anchor="middle" font-size="14">✅ Fact-check</text></g></svg>`;
    return {n:N.map((_,k)=>s.querySelector('#mn'+k)), l:L.map((_,k)=>s.querySelector('#ml'+k)), fc:s.querySelector('#fcx')};
  },
  show(c,i){
    c.n.forEach((n,k)=>{ const t=k===0?0:k<=3?1:2; n.style.opacity = i>=t?1:.15; n.querySelector('circle').style.stroke = i>=t&&i<3?'var(--bad)':''; });
    c.l.forEach((l,k)=>{ const t=k<3?1:2; l.classList.toggle('on', i===t); l.style.opacity = i>=t?1:.1; });
    c.fc.setAttribute('opacity', i>=3?1:0);
  }};

D.headline = { title:'Analysing a misleading headline', caps:[
  'Fictional headline: <b>"SHOCKING: Study PROVES Phones Cause Depression in ALL Teenagers!!!"</b>',
  '<b>Emotional words:</b> "SHOCKING", capital letters, "!!!" — designed for clicks.',
  '<b>Overclaiming:</b> "PROVES" and "cause" — most such studies show a <i>correlation</i>, not causation.',
  '<b>Overgeneralising:</b> "ALL teenagers" — studies report averages and differences between groups.',
  'Better headline: <b>"Study links heavy phone use with higher depression scores in some teenagers."</b> Read beyond the headline!'],
  build(s){ const m=h('div',{class:'mail',style:'max-width:620px;font-size:18px;text-align:center'}); s.append(m); return {m}; },
  show(c,i){
    const w=(t,on)=>`<span class="f ${on?'flag':''}" style="padding:2px 4px">${t}</span>`;
    c.m.innerHTML = i<4 ? `${w('SHOCKING:',i===1)} Study ${w('PROVES',i===2)} Phones ${w('Cause',i===2)} Depression in ${w('ALL',i===3)} Teenagers${w('!!!',i===1)}`
      : `<span class="f okk">Study links heavy phone use with higher depression scores in some teenagers.</span>`;
  }};

D.verify = flow('Claim verification workflow',
  [['📢','Claim','what exactly is said?'],['🧭','Original source','who said it first?'],['🔬','Evidence','data, study, quote?'],['⚖️','Cross-check','3 independent sources'],['🏁','Verdict','true / false / misleading']],
  ['A step-by-step process to verify any online claim.',
   'Write the claim precisely. Separate fact from opinion.',
   'Trace it to the original source — a study, an official statement, a video.',
   'Check the evidence: does the original really say this? Is the date and context correct?',
   'Compare with at least 3 independent reliable sources and fact-checkers.',
   'Decide: true, false, misleading or unproven — and share responsibly (or not at all).']);

D.sourcecmp = { title:'Comparing sources for the same claim', caps:[
  'Claim (fictional): "A new app can diagnose anxiety in 30 seconds."',
  'Source 1: the app company\'s advertisement → <b>biased</b>, wants to sell. ⚠️',
  'Source 2: anonymous blog with no references → <b>unreliable</b>. ❌',
  'Source 3: peer-reviewed study and professional guidelines → diagnosis requires assessment by a qualified professional. ✅',
  'Conclusion: the claim is <b>misleading</b>. Apps may screen or track, but do not replace clinical diagnosis.'],
  build(s){ const r=h('div',{class:'row'}); r.innerHTML=[['📣','Advert'],['📝','Anonymous blog'],['🔬','Peer-reviewed study']].map((t,k)=>`<div class="tile" id="sc${k}"><span class="e">${t[0]}</span><b>${t[1]}</b></div>`).join(''); s.append(r); return {t:[0,1,2].map(k=>r.querySelector('#sc'+k))}; },
  show(c,i){ c.t.forEach((t,k)=>t.className='tile '+(i===k+1?(k===2?'good':'bad'):(i>k+1&&i<4?(k===2?'good':'bad'):i>=4?(k===2?'good':'dim'):''))); }};

/* ===== Review ===== */
D.conceptmap = flow('ICT-1013 concept map',
  [['💻','Foundations','hardware, software, networks'],['🧰','Tools','search, email, Office, cloud, notes'],['🤝','Connect','meetings, social media'],['🏥','Domains','education, health, finance'],['🛡️','Citizenship','identity, netiquette, safety'],['⚖️','Ethics','copyright, plagiarism, accuracy']],
  ['The whole course in one map. Step through the six big ideas.',
   '<b>Foundations (W1):</b> ICT components, data flow, networks, storage, scope, emerging technology.',
   '<b>Productivity tools (W2–4):</b> search engines, email, Word/Excel/PowerPoint, Google Workspace, cloud, Evernote/OneNote.',
   '<b>Communication (W5):</b> video conferencing and social media.',
   '<b>ICT in domains (W6–8):</b> LMS & online learning, health apps & telemedicine, digital finance & e-commerce.',
   '<b>Digital citizenship (W10–11):</b> digital identity, netiquette, cyberbullying, online safety.',
   '<b>Ethics (W12–14):</b> intellectual property, ethical use, plagiarism, original content, misinformation & fact-checking.']);

D.presstructure = flow('Structure of a project presentation',
  [['👋','Opening','title, team, hook'],['❓','Problem','who needs it, why'],['🛠️','ICT tools','what & why chosen'],['🎬','Demo','show it working'],['📊','Results','what you found'],['🏁','Close','lessons, ethics, Q&A']],
  ['A clear structure for an 8–10 minute project presentation (adjust to the time your instructor gives).',
   '<b>Opening:</b> project title, team members, a short hook or question.',
   '<b>Problem:</b> the real need your project addresses and who benefits.',
   '<b>ICT tools:</b> which tools you used and why they fit.',
   '<b>Demonstration:</b> show the actual product — spreadsheet, portfolio, resource.',
   '<b>Results:</b> findings, feedback or impact (using fictional/anonymous data).',
   '<b>Close:</b> limitations, ethical points (privacy, copyright), then questions.']);

window.ICTDemos = { mount, list: D };
})();
