const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const STAGES=[
{title:"Stage 1: The Weak Password",
 hint:"Look for length and a mix of characters. Skip anything with names, places or simple sequences.",
 lesson:"Strong passwords are long, random and unique. Names, dates and places like Jeddah or KAU are the first things attackers guess. Use a password manager and never reuse a password.",
 tip:"Use long, random, unique passwords (12+ characters) with no personal info, and store them in a password manager.",
 render(el,res){
  const o=[["Mohammed2003","This uses a name and a year. Attackers try personal details first."],["kau12345","This is short and uses a common sequence. It appears in every attacker's wordlist."],["R7#mP9!vQ2@x"],["Jeddah@KAU1!","A place and a university name with a predictable ending are easy to guess."]];
  let pick=-1;
  el.innerHTML=`<p>The attacker got in with a guessable password. Which of these would have kept them out?</p><div class="opts">${o.map((x,i)=>`<button class="opt" style="font-family:var(--mono)" data-i="${i}">${x[0]}</button>`).join("")}</div><button class="btn" id="go" disabled>Lock it in</button>`;
  $$(".opt",el).forEach(b=>b.onclick=()=>{pick=+b.dataset.i;$$(".opt",el).forEach(x=>x.classList.toggle("sel",x===b));$("#go",el).disabled=false});
  $("#go",el).onclick=()=>pick===2?res(true):res(false,o[pick][1]+" Look for the longest, most random option.");}},
{title:"Stage 2: The Suspicious App",
 hint:"A calculator only does maths. Ask what each permission has to do with that.",
 lesson:"The Principle of Least Privilege: an app should get only the access it needs to do its job, nothing more. A calculator needs no camera, microphone, contacts or location. If it asks, treat it as suspicious.",
 tip:"Review app permissions. Deny anything an app does not need for its job, and remove apps that ask for too much.",
 render(el,res){
  const P=[["Camera","📷"],["Microphone","🎤"],["Contacts","👥"],["Location","📍"]];
  const allowed=[true,true,true,true];let dec=-1;
  el.innerHTML=`<p><b>QuickCalc Pro</b> (a calculator app) is asking for access. Tap each permission to switch it between Allow and Deny, then make your final decision.</p>${P.map((p,i)=>`<div class="perm"><span>${p[1]} ${p[0]}</span><button class="allow" data-i="${i}" aria-label="${p[0]} permission">Allow</button></div>`).join("")}
  <div class="opts"><button class="opt" data-d="0">Keep the app with my choices</button><button class="opt" data-d="1">Uninstall it and report it</button></div><button class="btn" id="go" disabled>Confirm decision</button>`;
  $$(".perm button",el).forEach(b=>b.onclick=()=>{const i=+b.dataset.i;allowed[i]=!allowed[i];b.textContent=allowed[i]?"Allow":"Deny";b.className=allowed[i]?"allow":"deny"});
  $$("[data-d]",el).forEach(b=>b.onclick=()=>{dec=+b.dataset.d;$$("[data-d]",el).forEach(x=>x.classList.toggle("sel",x===b));$("#go",el).disabled=false});
  $("#go",el).onclick=()=>{const n=allowed.filter(Boolean).length;
   if(n)return res(false,`You still allow ${n} permission(s). A calculator has no reason to use any of them.`);
   if(dec===0)return res(false,"All permissions denied is a good start, but an app that demands this much is suspicious. Remove it and use the built-in calculator.");
   res(true)}}},
{title:"Stage 3: The Fake Link",
 hint:"Check the sender's domain, the pressure in the message, the greeting, and where the link really goes.",
 lesson:"Phishing relies on urgency and lookalike addresses. Check the sender's domain, hover over or long-press links to see the real address, and never log in through an email link. Open the official site yourself, or report the email to IT.",
 tip:"Inspect the sender and link before clicking. When in doubt, report the email and go to the official site yourself.",
 render(el,res){
  const need=["sender","urgent","greet","link"];
  const on=new Set();let act=-1;
  const fb=(k,t)=>`<button class="flag" data-f="${k}">${t}</button>`;
  el.innerHTML=`<p>Tap the parts of this fictional email that look like phishing, then choose what to do. Flagging the link also inspects it (it never opens).</p>
  <div class="mail"><p>${fb("sender","From: kau-support@kau-edu-verify.top")}</p><p>${fb("date","Sent: Mon, 2 Nov 2026")}</p><p>${fb("urgent","URGENT: account closes in 2 hours!")}</p><p>${fb("greet","Dear User,")}</p><p>Your KAU password has expired. Verify now to keep your account: <button class="flag" data-f="link"><span class="linkbtn">https://sso.kau.edu.sa/verify</span></button></p><p>${fb("foot","Fictional training email")}</p></div>
  <div class="linkbar" id="lb">Link target: flag the link to inspect it</div>
  <div class="opts"><button class="opt" data-a="0">Click the link and log in quickly</button><button class="opt" data-a="1">Report it to IT and delete it</button><button class="opt" data-a="2">Reply with my student ID to confirm</button></div><button class="btn" id="go" disabled>Submit report</button>`;
  $$(".flag",el).forEach(b=>b.onclick=()=>{const k=b.dataset.f;on.has(k)?on.delete(k):on.add(k);b.classList.toggle("on",on.has(k));if(k==="link")$("#lb",el).textContent="Real target: http://kau-edu-verify.top/login (not a KAU address)"});
  $$("[data-a]",el).forEach(b=>b.onclick=()=>{act=+b.dataset.a;$$("[data-a]",el).forEach(x=>x.classList.toggle("sel",x===b));$("#go",el).disabled=false});
  $("#go",el).onclick=()=>{const miss=need.filter(k=>!on.has(k)),fp=[...on].filter(k=>!need.includes(k));
   if(miss.length)return res(false,"You missed "+miss.length+" warning sign(s). Check the sender domain, the urgent wording, the generic greeting and the real link address.");
   if(fp.length)return res(false,"Not everything you flagged is suspicious. The date and the footer are routine details.");
   if(act!==1)return res(false,"Right signs, wrong action. Never click, log in or reply with personal details. Report it and delete it.");
   res(true)}}},
{title:"Stage 4: The Fake Call",
 hint:"Real IT staff never need your one-time code. Hang up and call a number you looked up yourself.",
 lesson:"This is social engineering: attackers manipulate people instead of hacking systems. A one-time password is for you alone. No real IT team will ever ask for it, by voice or text. Hang up and verify through an official channel.",
 tip:"Never share OTPs with anyone. If someone claims to be IT support, hang up and contact the university through its official channel.",
 render(el,res){
  const C=[["Share the code. They sound official.","You gave an attacker the key to your account. Callers who create pressure and ask for an OTP are scammers."],null,["Send the code by text instead.","Texting it is still sharing it. The channel does not matter, the OTP is private."]];
  el.innerHTML=`<div class="call"><div class="ring">📞</div><p><b>Incoming: "KAU IT Support"</b></p><button class="btn" id="ans">Answer call</button><div id="talk"></div></div>`;
  $("#ans",el).onclick=()=>{$("#ans",el).remove();$("#talk",el).innerHTML=`<div class="line">"Hello, this is KAU IT Support. We detected suspicious activity on your account."</div><div class="line">"To secure it, read me the 6-digit code you just received. Quickly, before it locks!"</div><div class="opts"><button class="opt" data-c="0">${C[0][0]}</button><button class="opt" data-c="1">End the call and verify through an official channel.</button><button class="opt" data-c="2">${C[2][0]}</button></div>`;
   $$("[data-c]",el).forEach(b=>b.onclick=()=>{const c=+b.dataset.c;c===1?res(true):res(false,C[c][1])})}}}
];
