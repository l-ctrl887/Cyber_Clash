/* EXPERT MODE: four different topics. No Inspect. Hints available. */
const EXPERT=[
{title:"Stage 1: The Infected Device (Ransomware)",
 intro:"A computer is behaving strangely. Files won't open and a message has appeared on the screen. Select every safe response.",
 hint:"Think containment and escalation: limit the spread, bring in the experts, and don't tamper with the machine yourself.",
 lesson:"Ransomware locks your files and demands payment. The safe response is to disconnect the device from the network to stop it spreading, report it to the IT/security team immediately, and avoid opening other suspicious files or links. Do not delete files, run 'fixes' or pay: that can destroy evidence, add malware and does not guarantee recovery.",
 tip:"If a device shows a ransom message, disconnect it from the network, report it to IT/security straight away, and don't delete, 'fix' or pay anything yourself.",
 update:"The device is isolated and reported. Now let's look at how people connect to networks.",
 render(el,res){
  const A=[["net","Disconnect the computer from Wi-Fi and the network cable",1],["rep","Report it to the IT/security team right away",1],["avoid","Avoid opening other suspicious files or links on it",1],
   ["del","Delete the ransom note and strange files yourself to clean up",0,"Deleting files can destroy evidence investigators need, and handling the infection without authorization can make it worse."],
   ["pay","Pay the ransom to get the files back quickly",0,"Paying does not guarantee recovery and encourages more attacks. Report it instead."],
   ["dec","Download a free “file decryptor” from a website and run it",0,"Unknown tools can add more malware. Leave recovery to the security team."]];
  el.innerHTML=`<div class="ransom"><b>⚠ YOUR FILES ARE ENCRYPTED</b><br>Pay 0.5 BTC within 24 hours or your files will be lost forever.<br><small>All documents now end in .locked. The computer is slow and nothing will open.</small></div>
  <p>Which actions are safe? Select all that apply.</p><div class="opts">${shuffle(A.slice()).map(a=>`<button class="opt" data-k="${a[0]}" aria-pressed="false">${a[1]}</button>`).join("")}</div><button class="btn" id="go">Confirm response</button>`;
  const sel=pickMulti(el);
  $("#go",el).onclick=()=>{const miss=A.filter(a=>a[2]&&!sel.has(a[0])).length,bad=A.filter(a=>!a[2]&&sel.has(a[0]));
   if(bad.length)return res(false,bad.map(a=>a[3]).join(" ")+(miss?` You also missed ${miss} safe action(s).`:""));
   if(miss)return res(false,`You chose only safe actions, but missed ${miss} safe one(s). Think about stopping the spread, alerting the right people and avoiding further risk.`);
   res(true)}}},
{title:"Stage 2: The Public Wi-Fi Trap",
 intro:"You're at a café and need the internet. Three questions will check that you can connect safely.",
 hint:"A similar name proves nothing. Who can actually confirm which network is official, and what could a stranger see on an open one?",
 lesson:"Public Wi-Fi is shared with strangers. Open networks do not protect what you send, and attackers can set up lookalike networks with names close to the real one. Join only the network the venue confirms is official, prefer https sites, avoid sensitive logins on public networks, and don't let your phone auto-join networks.",
 tip:"Join only the Wi-Fi the venue confirms is official, avoid sensitive logins on public networks, and don't auto-join networks.",
 update:"Safe connection confirmed. But a university platform may have leaked data.",
 render(el,res){
  const N=[["A","Cafe_Free_WiFi","Open network. No password required."],["B","Cafe_Secure","Password-protected. The café employee confirms this is the official network."],["C","Free_Cafe_WiFi","Name looks like the café's network. Café employees do not recognise it."]];
  const s1=()=>{el.innerHTML=`<p class="dim">Question 1 of 3</p><p>Which network is the safest to join?</p><div class="opts">${N.map(n=>`<button class="opt" data-v="${n[0]}"><b>${n[1]}</b><br><small>${n[2]}</small></button>`).join("")}</div><button class="btn" id="go" disabled>Join this network</button>`;
   const get=pickOne(el,".opt","#go");
   $("#go",el).onclick=()=>{const v=get();if(v==="B")return s2();res(false,v==="A"?"An open network has no password, so anyone nearby may be able to watch what you send.":"Café employees do not recognise it. A lookalike name can be a fake network set up to capture your data.")}};
  const T=[["a","Open networks usually don't protect what you send, so someone nearby may be able to see it.",1],["b","A lookalike name can be a fake network that captures what you do online.",1],["c","Free networks always infect your device with a virus the moment you connect.",0],["d","Password-protected networks are always slower, so people avoid them.",0]];
  const s2=()=>{el.innerHTML=`<div class="line ok">✔ Cafe_Secure is the network the café itself confirmed.</div><p class="dim">Question 2 of 3</p><p>Why might the other two networks be risky? Select all true statements.</p><div class="opts">${T.map(t=>`<button class="opt" data-k="${t[0]}" aria-pressed="false">${t[1]}</button>`).join("")}</div><button class="btn" id="go">Check answers</button>`;
   const sel=pickMulti(el);
   $("#go",el).onclick=()=>{const miss=T.filter(t=>t[2]&&!sel.has(t[0])).length,fp=T.filter(t=>!t[2]&&sel.has(t[0])).length;
    if(fp)return res(false,"Some selected statements are exaggerations or unrelated. Stick to the real risks of open and lookalike networks.");
    if(miss)return res(false,`You missed ${miss} real risk(s). Think about what an open network lacks and what a fake name could be hiding.`);
    s3()}};
  const Q=[["a","Turn on file sharing so friends can send you notes",0,"File sharing can expose your files to strangers on the same network."],["b","Let your phone auto-join this network from now on",0,"Auto-joining can later connect you to a fake network using the same or a similar name."],["c","Use https sites, avoid sensitive logins when you can, and disconnect when you're done",1],["d","Enter your passwords freely, since café networks are private",0,"Public networks are shared with strangers, so treat them as untrusted."]];
  const s3=()=>{el.innerHTML=`<div class="line ok">✔ Correct: open networks are unprotected and lookalike names can be fake.</div><p class="dim">Question 3 of 3</p><p>Which behaviour is safest while on public Wi-Fi?</p><div class="opts">${shuffle(Q.slice()).map(q=>`<button class="opt" data-v="${q[0]}">${q[1]}</button>`).join("")}</div><button class="btn" id="go" disabled>Confirm</button>`;
   const get=pickOne(el,".opt","#go");$("#go",el).onclick=()=>{const q=Q.find(x=>x[0]===get());q[2]?res(true):res(false,q[3])}};
  s1()}},
{title:"Stage 3: The Data Leak (Data Breach & Privacy)",
 intro:"A fictional incident report says a university platform may have exposed data. Work through the three questions.",
 hint:"Ask what an attacker could do with each item, especially when people reuse the same password in many places.",
 lesson:"A data breach exposes personal information, and even basic details can be misused. Names, emails and phone numbers make phishing and scam calls look convincing. Leaked passwords (even hashed ones) can be cracked, and tried on other accounts where the password is reused. Academic records are private. After a breach: change the password here and anywhere it was reused, turn on two-step verification, and watch for suspicious messages.",
 tip:"After a data breach, change the affected password (and any reused ones), enable two-step verification, and watch for suspicious messages.",
 update:"The leak is understood. One final alert needs a coordinated response.",
 render(el,res){
  const D=[["names","Student names",1],["emails","University email addresses",1],["phones","Phone numbers",1],["hashes","Password hashes",1],["records","Academic records",1],["events","Public campus event schedule",0]];
  const s1=()=>{el.innerHTML=`<div class="panel"><b>📄 INCIDENT REPORT #INC-0427 (fictional)</b><p>A misconfigured server on a learning platform exposed the records below. No real data is shown.</p></div><p class="dim">Question 1 of 3</p><p>Which exposed items are sensitive personal data? Select all that apply.</p><div class="opts">${D.map(d=>`<button class="opt" data-k="${d[0]}" aria-pressed="false">${d[1]}</button>`).join("")}</div><button class="btn" id="go">Check answers</button>`;
   const sel=pickMulti(el);
   $("#go",el).onclick=()=>{const miss=D.filter(d=>d[2]&&!sel.has(d[0])).length,fp=D.filter(d=>!d[2]&&sel.has(d[0])).length;
    if(fp)return res(false,"One item you selected is public information anyway. Sensitive data is personal and not meant to be shared openly.");
    if(miss)return res(false,`You missed ${miss} sensitive item(s). Remember that even basic details like names and phone numbers can be misused.`);
    s2()}};
  const C=[["a","Attackers could send convincing phishing messages using real names and details.",1],["b","Leaked passwords could be tried on other accounts where people reuse them.",1],["c","Academic records could be misused, causing privacy harm or fraud.",1],["d","The university's buildings will lose power.",0],["e","Every student's computer is automatically infected.",0]];
  const s2=()=>{el.innerHTML=`<div class="line ok">✔ Correct: five of these items are sensitive, and the public event schedule is not.</div><p class="dim">Question 2 of 3</p><p>Which are realistic consequences of this leak? Select all that apply.</p><div class="opts">${C.map(c=>`<button class="opt" data-k="${c[0]}" aria-pressed="false">${c[1]}</button>`).join("")}</div><button class="btn" id="go">Check answers</button>`;
   const sel=pickMulti(el);
   $("#go",el).onclick=()=>{const miss=C.filter(c=>c[2]&&!sel.has(c[0])).length,fp=C.filter(c=>!c[2]&&sel.has(c[0])).length;
    if(fp)return res(false,"A breach of data doesn't cut power or infect every computer. Focus on how leaked information can be misused.");
    if(miss)return res(false,`You missed ${miss} realistic consequence(s). Think about phishing, reused passwords and private records.`);
    s3()}};
  const R=[["a","Ignore it. Hashed passwords can't be cracked.",0,"Hashes can often be cracked, especially for weak passwords. Don't ignore a leak."],["b","Change your password here and anywhere you reused it, turn on two-step verification, and watch for suspicious messages.",1],["c","Reply to any “verify your account” message to check whether it's real.",0,"Replying to unexpected messages is exactly what phishers want. Use official channels instead."],["d","Delete your university account so nothing can be stolen.",0,"Deleting the account does not remove data already leaked, and you may lose access to services."]];
  const s3=()=>{el.innerHTML=`<div class="line ok">✔ Correct: leaks fuel phishing, password reuse attacks and privacy harm.</div><p class="dim">Question 3 of 3</p><p>What is the best immediate response?</p><div class="opts">${shuffle(R.slice()).map(r=>`<button class="opt" data-v="${r[0]}">${r[1]}</button>`).join("")}</div><button class="btn" id="go" disabled>Confirm</button>`;
   const get=pickOne(el,".opt","#go");$("#go",el).onclick=()=>{const r=R.find(x=>x[0]===get());r[2]?res(true):res(false,r[3])}};
  s1()}},
{title:"Stage 4: Critical Alert (Final Challenge)",
 intro:"Critical alert: unusual activity detected in a university system. Put the response in the correct order.",
 hint:"Understand what is happening before acting, stop it spreading before fixing it, and finish by learning from it.",
 lesson:"Incident response follows an order: identify and assess what is happening, contain the threat so it can't spread, remove the cause, recover the affected systems, then review the incident and improve security. Skipping ahead, for example recovering before the cause is removed, lets the problem return.",
 tip:"In an incident: identify and assess, contain, remove the cause, recover, then review and improve. Each step depends on the one before it.",
 update:"",
 render(el,res){
  const C=["Identify and assess the incident","Contain the threat","Remove the cause of the incident","Recover affected systems","Review the incident and improve security"];
  let order;do{order=shuffle(C.slice())}while(order.filter((x,i)=>x===C[i]).length>1);
  const draw=()=>{el.innerHTML=`<div class="ransom"><b>🚨 ALERT 03:12 (fictional)</b><br>Dozens of failed logins, then a successful login from an unknown country on the Student Records server.</div><p>Arrange the five response actions in the correct order. Use the arrows to move them.</p>
   <ol class="ord">${order.map((t,i)=>`<li><span>${i+1}. ${t}</span><span class="evb"><button class="mini" data-u="${i}" aria-label="Move up" ${i===0?"disabled":""}>▲</button><button class="mini" data-d="${i}" aria-label="Move down" ${i===4?"disabled":""}>▼</button></span></li>`).join("")}</ol><button class="btn" id="go">Check order</button>`;
   const sw=(a,b)=>{[order[a],order[b]]=[order[b],order[a]];draw()};
   $$("[data-u]",el).forEach(b=>b.onclick=()=>sw(+b.dataset.u,+b.dataset.u-1));$$("[data-d]",el).forEach(b=>b.onclick=()=>sw(+b.dataset.d,+b.dataset.d+1));
   $("#go",el).onclick=()=>{const n=order.filter((x,i)=>x===C[i]).length;n===5?res(true):res(false,`${n} of 5 steps are in the right place. Think about what must happen before each action.`)}};
  draw()}}
];
