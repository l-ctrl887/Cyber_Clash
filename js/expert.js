/* EXPERT MODE: four different topics. No Inspect. Hints available. */
const EXPERT=[
{title:"Stage 1: The Infected Device (Ransomware)",
 intro:"A computer is behaving strangely. Files won't open and a message has appeared on the screen. Select every safe response.",
 hint:"Think containment and escalation: limit the spread, bring in the experts, and don't tamper with the machine yourself.",
lesson:"Ransomware locks your files and may spread across connected devices. Disconnect the infected device, report it to IT, and never attempt to fix it or pay the ransom yourself.",
 tip:"If a device shows a ransom message, disconnect it from the network, report it to IT/security straight away, and don't delete, 'fix' or pay anything yourself.",
 update:"The device is isolated and reported. Now let's look at how people connect to networks.",
 render(el,res){
  const A=[
   ["net","Disconnect the computer from Wi-Fi and the network cable",1],
   ["rep","Report it to the IT/security team right away",1],
   ["avoid","Avoid opening other suspicious files or links on it",1],
   ["del","Delete the ransom note and strange files yourself to clean up",0,"Deleting files can destroy evidence investigators need, and handling the infection without authorization can make it worse."],
   ["pay","Pay the ransom to get the files back quickly",0,"Paying does not guarantee recovery and encourages more attacks. Report it instead."],
   ["dec","Download a free “file decryptor” from a website and run it",0,"Unknown tools can add more malware. Leave recovery to the security team."]
  ];
  el.innerHTML=`<div class="ransom"><b>⚠ YOUR FILES ARE ENCRYPTED</b><br>Pay 0.5 BTC within 24 hours or your files will be lost forever.<br><small>All documents now end in .locked. The computer is slow and nothing will open.</small></div>
  <p>Which actions are safe? Select all that apply.</p><div class="opts">${shuffle(A.slice()).map(a=>`<button class="opt" data-k="${a[0]}" aria-pressed="false">${a[1]}</button>`).join("")}</div><button class="btn" id="go">Confirm response</button>`;
  const sel=pickMulti(el);
  $("#go",el).onclick=()=>{
   const miss=A.filter(a=>a[2]&&!sel.has(a[0])).length;
   const bad=A.filter(a=>!a[2]&&sel.has(a[0]));
   if(bad.length)return res(false,bad.map(a=>a[3]).join(" ")+(miss?` You also missed ${miss} safe action(s).`:""));
   if(miss)return res(false,`You chose only safe actions, but missed ${miss} safe one(s). Think about stopping the spread, alerting the right people and avoiding further risk.`);
   res(true)
  }
 }},
{title:"Stage 2: The Public Wi-Fi Trap",
 intro:"You're at a café and need the internet. Choose the safest network to connect to.",
 hint:"A similar name proves nothing. Who can actually confirm which network is official?",
lesson:"Only connect to networks confirmed by the venue. Avoid sensitive logins on public Wi-Fi and never trust a network just because its name looks familiar.",
 tip:"Join only the Wi-Fi the venue confirms is official, avoid sensitive logins on public networks, and don't auto-join networks.",
 update:"Safe connection confirmed. But a university platform may have leaked data.",
 render(el,res){
  const N=[
   ["A","Cafe_Free_WiFi","Open network. No password required."],
   ["B","Cafe_Secure","Password-protected. The café employee confirms this is the official network."],
   ["C","Free_Cafe_WiFi","Name looks like the café's network. Café employees do not recognise it."]
  ];
  el.innerHTML=`<p class="dim">Question 1 of 1</p><p>Which network is the safest to join?</p><div class="opts">${N.map(n=>`<button class="opt" data-v="${n[0]}"><b>${n[1]}</b><br><small>${n[2]}</small></button>`).join("")}</div><button class="btn" id="go" disabled>Join this network</button>`;
  const get=pickOne(el,".opt","#go");
  $("#go",el).onclick=()=>{
   const v=get();
   if(v==="B")return res(true);
   res(false,v==="A"
    ?"An open network has no password, so anyone nearby may be able to watch what you send."
    :"Café employees do not recognise it. A lookalike name can be a fake network set up to capture your data.")
  }
 }},
{title:"Stage 3: The Data Leak (Data Breach & Privacy)",
 intro:"A fictional incident report says a university platform may have exposed data. Identify which information is sensitive.",
 hint:"Ask what an attacker could do with each item, especially when people reuse the same password in many places.",
lesson:"Leaked personal data can be used for phishing, scams, and account attacks. Change affected and reused passwords, enable two-step verification, and watch for suspicious messages.",
 tip:"After a data breach, change the affected password (and any reused ones), enable two-step verification, and watch for suspicious messages.",
 update:"The leak is understood. One final alert needs a coordinated response.",

render(el,res){
  const D=[
   ["names","Student names",1],
   ["emails","University email addresses",1],
   ["phones","Phone numbers",1],
   ["hashes","Password hashes",1],
   ["records","Academic records",1],
   ["events","Public campus event schedule",0]
  ];

  const R=[
   ["a","Ignore it. Hashed passwords can't be cracked.",0,"Hashes can often be cracked, especially for weak passwords. Don't ignore a leak."],
   ["b","Change your password here and anywhere you reused it, turn on two-step verification, and watch for suspicious messages.",1],
   ["c","Reply to any “verify your account” message to check whether it's real.",0,"Replying to unexpected messages is exactly what phishers want. Use official channels instead."],
   ["d","Delete your university account so nothing can be stolen.",0,"Deleting the account does not remove data already leaked, and you may lose access to services."]
  ];

  const s1=()=>{
   el.innerHTML=`<div class="panel"><b>📄 INCIDENT REPORT #INC-0427 (fictional)</b><p>A misconfigured server on a learning platform exposed the records below. No real data is shown.</p></div><p class="dim">Question 1 of 2</p><p>Which exposed items are sensitive personal data? Select all that apply.</p><div class="opts">${D.map(d=>`<button class="opt" data-k="${d[0]}" aria-pressed="false">${d[1]}</button>`).join("")}</div><button class="btn" id="go">Check answers</button>`;

   const sel=pickMulti(el);

   $("#go",el).onclick=()=>{
    const miss=D.filter(d=>d[2]&&!sel.has(d[0])).length;
    const fp=D.filter(d=>!d[2]&&sel.has(d[0])).length;

    if(fp)return res(false,"One item you selected is public information anyway. Sensitive data is personal and not meant to be shared openly.");
    if(miss)return res(false,`You missed ${miss} sensitive item(s). Remember that even basic details like names and phone numbers can be misused.`);

    s2();
   };
  };

  const s2=()=>{
   el.innerHTML=`<div class="line ok">✔ Correct: five of these items are sensitive, and the public event schedule is not.</div><p class="dim">Question 2 of 2</p><p>What is the best immediate response after discovering a data breach?</p><div class="opts">${shuffle(R.slice()).map(r=>`<button class="opt" data-v="${r[0]}">${r[1]}</button>`).join("")}</div><button class="btn" id="go" disabled>Confirm</button>`;

   const get=pickOne(el,".opt","#go");

   $("#go",el).onclick=()=>{
    const r=R.find(x=>x[0]===get());
    r[2]?res(true):res(false,r[3]);
   };
  };

  s1();
 }},
{title:"Stage 4: Critical Alert (Final Challenge)",
 intro:"Critical alert: unusual activity detected in a university system. Put the response in the correct order.",
 hint:"Understand what is happening before acting, stop it spreading before fixing it, and finish by learning from it.",
lesson:"Handle security incidents in order: identify, contain, remove, recover, and review. Following these steps helps prevent the threat from spreading or returning.",
 tip:"In an incident: identify and assess, contain, remove the cause, recover, then review and improve. Each step depends on the one before it.",
 update:"",
 render(el,res){
  const C=[
   "Identify and assess the incident",
   "Contain the threat",
   "Remove the cause of the incident",
   "Recover affected systems",
   "Review the incident and improve security"
  ];
  let order;
  do{
   order=shuffle(C.slice())
  }while(order.filter((x,i)=>x===C[i]).length>1);
  const draw=()=>{
   el.innerHTML=`<div class="ransom"><b>🚨 ALERT 03:12 (fictional)</b><br>Dozens of failed logins, then a successful login from an unknown country on the Student Records server.</div><p>Arrange the five response actions in the correct order. Use the arrows to move them.</p>
   <ol class="ord">${order.map((t,i)=>`<li><span>${i+1}. ${t}</span><span class="evb"><button class="mini" data-u="${i}" aria-label="Move up" ${i===0?"disabled":""}>▲</button><button class="mini" data-d="${i}" aria-label="Move down" ${i===4?"disabled":""}>▼</button></span></li>`).join("")}</ol><button class="btn" id="go">Check order</button>`;
   const sw=(a,b)=>{[order[a],order[b]]=[order[b],order[a]];draw()};
   $$("[data-u]",el).forEach(b=>b.onclick=()=>sw(+b.dataset.u,+b.dataset.u-1));
   $$("[data-d]",el).forEach(b=>b.onclick=()=>sw(+b.dataset.d,+b.dataset.d+1));
   $("#go",el).onclick=()=>{
    const n=order.filter((x,i)=>x===C[i]).length;
    n===5?res(true):res(false,`${n} of 5 steps are in the right place. Think about what must happen before each action.`)
   }
  };
  draw()
 }}
]; 
