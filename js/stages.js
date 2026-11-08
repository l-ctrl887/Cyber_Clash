const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const strength=p=>{let s=Math.min(48,p.length*4)+[/[a-z]/,/[A-Z]/,/\d/,/[^A-Za-z0-9]/].filter(r=>r.test(p)).length*10;if(/kau|jeddah|mohammed|pass|qwerty|1234|20\d\d/i.test(p))s-=35;if(/(.)\1\1/.test(p))s-=10;return Math.max(5,Math.min(100,s))};
const sLabel=v=>v<40?["WEAK","#ff6b81"]:v<70?["FAIR","#ffd166"]:["STRONG","#3dffa5"];
const STAGES=[
{title:"Stage 1: The Phishing Trap",
 intro:"New email flagged in the compromised account's inbox. Inspect the evidence, flag what looks suspicious, then give your verdict.",
 hint:"Check where the sender and the link really point. Does the domain truly belong to KAU (kau.edu.sa)?",
 lesson:"Phishing relies on urgency and lookalike domains. Check the sender's domain and the real link address before clicking. Even https does not prove a site is trustworthy. Never log in through an email link: open the official site yourself, or report the email to IT.",
 tip:"Inspect the sender and the real link address before clicking. When in doubt, report the email and go to the official site yourself.",
 update:"The suspicious email was only the beginning. Let's investigate the account's security.",
 render(el,res,ex){
  const E=ex?{f:"it-support@kau.edu.sa-secure.com",s:"Scheduled security verification",b:"Dear Student, as part of this term's security review, please confirm your account within 24 hours.",u:"https://portal.kau.edu.sa.verify-id.net/login",
   i:{sender:"The real domain is sa-secure.com. “kau.edu.sa” is only the start of a longer lookalike name.",subject:"Calm and routine. Not suspicious on its own.",body:"Personal tone and a reasonable deadline. Not suspicious on its own.",link:"The padlock (https) does not prove trust. The real domain is verify-id.net, not kau.edu.sa."},need:["sender","link"]}
  :{f:"kau-support@kau-edu-verify.top",s:"URGENT: account closes in 2 hours!",b:"Dear User, your KAU password has expired. Verify now to keep your account.",u:"http://kau-edu-verify.top/login",
   i:{sender:"kau-edu-verify.top is not a KAU domain (the real one is kau.edu.sa).",subject:"Urgent threats pressure you to act without thinking.",body:"A generic greeting (“Dear User”) plus an expired-password scare is a classic phishing sign.",link:"The link goes to http://kau-edu-verify.top/login: not secure and not a KAU domain."},need:["sender","subject","body","link"]};
  const rows=[["sender","From:",E.f],["subject","Subject:",E.s],["body","Message:",E.b],["link","Link:","Verify My Account"]];
  const on=new Set();let v=-1;
  el.innerHTML=`<div class="mail">${rows.map(r=>`<div class="ev"><span><b>${r[1]}</b> ${r[0]==="link"?`<span class="linkbtn">${r[2]}</span>`:r[2]}</span><span class="evb"><button class="mini" data-i="${r[0]}">Inspect</button><button class="mini" data-f="${r[0]}" aria-pressed="false">Flag</button></span></div>`).join("")}</div>
  <div class="linkbar" id="evlog">Tap Inspect on an item to examine it. Tap Flag if it looks suspicious.</div>
  <div class="opts"><button class="opt" data-v="0">This email is legitimate</button><button class="opt" data-v="1">This email is phishing</button></div><button class="btn" id="go" disabled>Submit verdict</button>`;
  $$("[data-i]",el).forEach(b=>b.onclick=()=>{$("#evlog",el).textContent=E.i[b.dataset.i]});
  $$("[data-f]",el).forEach(b=>b.onclick=()=>{const k=b.dataset.f;on.has(k)?on.delete(k):on.add(k);b.classList.toggle("on",on.has(k));b.setAttribute("aria-pressed",on.has(k));b.textContent=on.has(k)?"Flagged":"Flag"});
  $$("[data-v]",el).forEach(b=>b.onclick=()=>{v=+b.dataset.v;$$("[data-v]",el).forEach(x=>x.classList.toggle("sel",x===b));$("#go",el).disabled=false});
  $("#go",el).onclick=()=>{const miss=E.need.filter(k=>!on.has(k)),fp=[...on].filter(k=>!E.need.includes(k));
   if(miss.length)return res(false,`You missed ${miss.length} suspicious element(s). Inspect the evidence closely.`);
   if(fp.length)return res(false,"You flagged something that looks normal. Inspect each item and flag only what is really suspicious.");
   if(v!==1)return res(false,"The evidence you flagged points to phishing. A legitimate email would not use these tricks.");
   res(true)}}},
{title:"Stage 2: The Weak Password",
 intro:"Reviewing the account's password security.",
 hint:"Look for length and a mix of characters. Skip anything with names, places, years or common patterns.",
 lesson:"Strong passwords are long, random and unique. Names, places like Jeddah, years and common patterns are the first things attackers guess, even with symbols added. Use a password manager and never reuse a password.",
 tip:"Use long, random, unique passwords (12+ characters) with no personal info, and store them in a password manager.",
 update:"The password was not strong enough. But there may be other risks.",
 render(el,res,ex){
  const o=ex?[["Kau@Jeddah2026!","A university name, a city and a year, even with a symbol, are easy to guess."],["P@ssw0rd!2024","Swapping letters for symbols in a common word is a pattern attackers already try."],["Qwerty#12345!","Keyboard runs and number sequences are cracked in seconds."],["R7#mP9!vQ2@x"]]
   :[["Mohammed2003","This uses a name and a year. Attackers try personal details first."],["kau12345","This is short and uses a common sequence. It appears in every attacker's wordlist."],["R7#mP9!vQ2@x"],["Jeddah@KAU1!","A place and a university name with a predictable ending are easy to guess."]];
  let pick=-1;const cur=strength("kau12345"),cl=sLabel(cur);
  el.innerHTML=`<div class="panel"><b>🔒 Account security panel</b><p>Current password: <code>••••••••</code> <span style="color:${cl[1]}">${cl[0]}</span></p><div class="meter"><i style="width:${cur}%;background:${cl[1]}"></i></div></div>
  <p>Choose the replacement that would keep attackers out.${ex?" (No strength preview in Expert Mode.)":" Select an option to preview its strength."}</p><p class="dim" id="mtxt"></p><div class="meter"><i id="mtr" style="width:0"></i></div>
  <div class="opts">${o.map((x,i)=>`<button class="opt" style="font-family:var(--mono)" data-i="${i}">${x[0]}</button>`).join("")}</div><button class="btn" id="go" disabled>Lock it in</button>`;
  $$(".opt",el).forEach(b=>b.onclick=()=>{pick=+b.dataset.i;$$(".opt",el).forEach(x=>x.classList.toggle("sel",x===b));$("#go",el).disabled=false;
   if(!ex){const s=strength(o[pick][0]),l=sLabel(s);$("#mtr",el).style.width=s+"%";$("#mtr",el).style.background=l[1];$("#mtxt",el).textContent="Strength: "+l[0]}});
  $("#go",el).onclick=()=>o[pick].length===1?res(true):res(false,o[pick][1]+" Look for the longest, most random option.");}},
{title:"Stage 3: The Suspicious App",
 intro:"A suspicious calculator app was found installed on the account's device.",
 hint:"Ask what each permission has to do with the app's actual job.",
 lesson:"The Principle of Least Privilege: an app should get only the access it needs to do its job, nothing more and nothing less. A calculator needs no camera, microphone, contacts or location. If it asks, treat it as suspicious.",
 tip:"Review app permissions. Allow only what an app needs for its job, deny the rest, and remove apps that ask for too much.",
 update:"An application had access to more information than it needed. One final threat remains.",
 render(el,res,ex){
  const A=ex?{n:"ScanCalc",d:"A calculator that scans handwritten equations with your camera.",need:[0],dec:0}:{n:"QuickCalc Pro",d:"A simple calculator.",need:[],dec:1};
  const P=[["Camera","📷","Could take photos or video without you noticing."],["Microphone","🎤","Could record conversations around you."],["Contacts","👥","Could copy your whole contacts list."],["Location","📍","Could track where you go."]];
  if(ex)P[0][2]="Needed to scan equations, which matches the app's stated purpose.";
  const al=[1,1,1,1];let dec=-1;
  el.innerHTML=`<p><b>${A.n}</b>: ${A.d} It requests four permissions. Inspect each, set Allow or Deny, then decide.</p>${P.map((p,i)=>`<div class="perm"><span>${p[1]} ${p[0]}</span><span class="evb"><button class="mini" data-i="${i}">Inspect</button><button class="allow" data-t="${i}" aria-label="${p[0]} permission">Allow</button></span></div>`).join("")}
  <div class="linkbar" id="evlog">Tap Inspect to see what a permission could be used for.</div>
  <div class="opts"><button class="opt" data-d="0">Keep the app with my choices</button><button class="opt" data-d="1">Uninstall it and report it</button></div><button class="btn" id="go" disabled>Confirm decision</button>`;
  $$("[data-i]",el).forEach(b=>b.onclick=()=>{$("#evlog",el).textContent=P[+b.dataset.i][0]+": "+P[+b.dataset.i][2]});
  $$("[data-t]",el).forEach(b=>b.onclick=()=>{const i=+b.dataset.t;al[i]=al[i]?0:1;b.textContent=al[i]?"Allow":"Deny";b.className=al[i]?"allow":"deny"});
  $$("[data-d]",el).forEach(b=>b.onclick=()=>{dec=+b.dataset.d;$$("[data-d]",el).forEach(x=>x.classList.toggle("sel",x===b));$("#go",el).disabled=false});
  $("#go",el).onclick=()=>{const bad=[0,1,2,3].filter(i=>al[i]&&!A.need.includes(i)),miss=A.need.filter(i=>!al[i]);
   if(bad.length)return res(false,`You still allow ${bad.length} unnecessary permission(s). Give an app only what its job needs.`);
   if(miss.length)return res(false,"The Camera is needed for this app's scanning feature. Least privilege means only what is needed, no less.");
   if(dec!==A.dec)return res(false,ex?"Your permissions are right, so keep the app with just the Camera. Removing it is not necessary here.":"All permissions denied is a good start, but an app that demands this much is suspicious. Remove it and use the built-in calculator.");
   res(true)}}},
{title:"Stage 4: The Fake Call (Final Challenge)",
 intro:"Incoming call detected. Someone claims they can restore your account.",
 hint:"Real IT staff never need your one-time code. Urgency and pressure are warning signs. Hang up and use an official channel.",
 lesson:"This is social engineering: attackers manipulate people instead of hacking systems. They use urgency, fear, fake authority and small 'proofs' to rush you. A one-time password is for you alone. No real IT team will ever ask for it, by voice or text. Hang up and verify through an official channel.",
 tip:"Never share OTPs with anyone. If someone claims to be IT support, hang up and contact the university through its official channel.",
 update:"",
 render(el,res,ex){
  const R=ex?[
   {say:"“Hi, KAU IT Service Desk, ticket #48213. Your account was just used from another country. I've already confirmed your identity from our records. A code was sent to your phone. What are the digits?”",o:[
    ["Read them out. He already knows my details.",0,"Knowing your details proves nothing. Attackers collect them beforehand."],
    ["Give only the first three digits.",0,"Even a partial code helps an attacker. Never share any part of it."],
    ["I never read codes to anyone. I'll check this ticket myself.",1]]},
   {say:"“That's fine, but if I can't verify you in the next minute, you'll be locked out of exams and registration. Colleagues are waiting on this.”",o:[
    ["Share it so I don't miss my exams.",0,"Threats about exams are designed to create panic. Panic is the attacker's tool."],
    ["Ask them to confirm by emailing from an official KAU address.",0,"Email addresses can be spoofed, and the OTP stays private either way."],
    ["Real IT doesn't lock accounts by phone. I'm ending this now.",1]]},
   {say:"“Then confirm on the secure link I'm texting you right now. It only takes a second.”",o:[
    ["Open the link. It isn't the code.",0,"The link is another phishing attempt. Do not open links sent by a suspicious caller."],
    ["Stay on the line while I look into it.",0,"Staying on the line lets them keep pressuring you, and caller ID can be faked."],
    ["End the call, then contact KAU IT through its official website or number.",1]]}
  ]:[
   {say:"“Hello, this is KAU IT Support. We detected a suspicious login on your account. I just sent you a 6-digit code. Please read it to me so I can secure your account.”",o:[
    ["Read the code out. It sounds official.",0,"You gave an attacker the key to your account. A one-time code is only for you."],
    ["Ask for their name first, then read the code if it checks out.",0,"A name is easy to invent. Never read a code aloud, whoever is asking."],
    ["I won't share a code. Why do you need it?",1]]},
   {say:"“I understand, but we only have two minutes before your account is locked and your files are lost. Other students already lost theirs. Just read the six digits and this will be over.”",o:[
    ["OK, just this once, to save my account.",0,"Urgency is a pressure tactic designed to stop you thinking. Giving in once is all an attacker needs."],
    ["Prove you're IT: tell me my student ID.",0,"Attackers often already hold personal details. Knowing your ID does not prove who they are."],
    ["Urgency and pressure are red flags. I'm stopping this here.",1]]},
   {say:"“If you hang up, your account will be deleted and I can't help you. Last chance: just text me the code instead.”",o:[
    ["Fine, I'll text it. At least it's not out loud.",0,"Texting the code is still sharing it. The channel does not matter."],
    ["Stay on the line and look up KAU's website while they wait.",0,"Staying on the line lets them keep pressuring you, and caller ID can be faked. End the call first."],
    ["End the call, then verify through KAU's official IT channel.",1]]}];
  let r=0;const log=[];
  el.innerHTML=`<div class="call"><div class="ring">📞</div><p><b>Incoming call</b><br>Caller ID: “KAU IT Support” <button class="mini" id="cid">Inspect</button></p><div class="linkbar" id="evlog">Tap Inspect to examine the caller ID.</div><button class="btn" id="ans">Answer call</button><div id="talk"></div></div>`;
  $("#cid",el).onclick=()=>{$("#evlog",el).textContent="Caller ID can be faked. A name on the screen proves nothing."};
  const draw=()=>{const cur=R[r],opts=shuffle(cur.o.slice());
   $("#talk",el).innerHTML=`<div class="pressure"><span>Caller pressure</span><b><i style="width:${Math.min(100,(r+1)*34)}%"></i></b></div>${log.join("")}<div class="line">${cur.say}</div><div class="opts">${opts.map((o,i)=>`<button class="opt" data-i="${i}">${o[0]}</button>`).join("")}</div>`;
   $$("[data-i]",el).forEach(b=>b.onclick=()=>{const o=opts[+b.dataset.i];
    if(!o[1])return res(false,o[2]);
    log.push(`<div class="line">${cur.say}</div><div class="line me">You: ${o[0]}</div>`);
    if(r<2){r++;draw()}else{$("#talk",el).innerHTML=log.join("")+`<div class="line me">☎ Call ended.</div>`;res(true)}})};
  $("#ans",el).onclick=()=>{$("#ans",el).remove();draw()}}}
];
