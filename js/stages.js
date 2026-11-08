const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const pickOne=(el,sel,btn)=>{let v=null;$$(sel,el).forEach(b=>b.onclick=()=>{v=b.dataset.v;$$(sel,el).forEach(x=>x.classList.toggle("sel",x===b));if(btn)$(btn,el).disabled=false});return()=>v};
const pickMulti=el=>{const s=new Set();$$("[data-k]",el).forEach(b=>b.onclick=()=>{const k=b.dataset.k;s.has(k)?s.delete(k):s.add(k);b.classList.toggle("sel",s.has(k));b.setAttribute("aria-pressed",s.has(k))});return s};
const strength=p=>{let s=Math.min(48,p.length*4)+[/[a-z]/,/[A-Z]/,/\d/,/[^A-Za-z0-9]/].filter(r=>r.test(p)).length*10;if(/kau|jeddah|mohammed|pass|qwerty|1234|20\d\d/i.test(p))s-=35;if(/(.)\1\1/.test(p))s-=10;return Math.max(5,Math.min(100,s))};
const sLabel=v=>v<40?["WEAK","#ff6b81"]:v<70?["FAIR","#ffd166"]:["STRONG","#3dffa5"];
/* NORMAL MODE: cybersecurity fundamentals (Inspect + hints) */
const STAGES=[
{title:"Stage 1: The Phishing Trap",
 intro:"New email flagged in the compromised account's inbox. Inspect the evidence, flag only what is genuinely suspicious, then give your verdict.",
 hint:"Check where the sender's domain and the link really point, and look for pressure. Routine details such as greetings and footers are often normal.",
 lesson:"Phishing relies on pressure and lookalike domains. Check the sender's domain, the real link address and any threats or tight deadlines. A general greeting or an automated footer is normal on real emails, so focus on the signs that matter. Never log in through an email link: open the official site yourself, or report the email to IT.",
 tip:"Check the sender's domain, the real link address and any pressure before clicking. Not every odd detail is a red flag. When in doubt, report the email and go to the official site yourself.",
 update:"The suspicious email was only the beginning. Let's investigate the account's security.",
 render(el,res){
  const D={rows:[["sender","From (address and domain)","noreply@kau-edu-services.com"],["subject","Subject","Action required: password expiry notice"],["greet","Greeting","Dear Student,"],["body","Message","Verify within 2 hours or your account will be permanently deleted."],["link","Link","Verify My Account"],["foot","Footer","© King Abdulaziz University. Automated message, please do not reply."]],need:["sender","body","link"],
   i:{sender:"The domain is kau-edu-services.com. KAU's real domain is kau.edu.sa, so this is a lookalike.",subject:"Password expiry notices are common. Nothing unusual in the subject alone.",greet:"A general greeting is normal on mass notices. Nothing unusual here.",body:"A two-hour deadline plus a threat of permanent deletion is urgent, threatening language. Real IT does not work this way.",link:"The button points to https://sso.kau.edu.sa.account-check.net/verify. The real domain is account-check.net, not kau.edu.sa.",foot:"Automated, no-reply footers are routine. Nothing unusual here."}};
  const on=new Set();let v=-1;
  el.innerHTML=`<div class="mail">${D.rows.map(r=>`<div class="ev"><span><b>${r[1]}:</b> ${r[0]==="link"?`<span class="linkbtn" >${r[2]}</span>`:r[2]}</span><span class="evb"><button class="mini" data-i="${r[0]}">Inspect</button><button class="mini" data-f="${r[0]}" aria-pressed="false">Flag</button></span></div>`).join("")}</div>
  <div class="linkbar" id="evlog">Tap Inspect on an item to examine it. Tap Flag only if it looks suspicious.</div>
  <div class="opts"><button class="opt" data-v="0">This email is legitimate</button><button class="opt" data-v="1">This email is phishing</button></div><button class="btn" id="go" disabled>Submit verdict</button>`;
  $$("[data-i]",el).forEach(b=>b.onclick=()=>{$("#evlog",el).textContent=D.i[b.dataset.i]});
  $$("[data-f]",el).forEach(b=>b.onclick=()=>{const k=b.dataset.f;on.has(k)?on.delete(k):on.add(k);b.classList.toggle("on",on.has(k));b.setAttribute("aria-pressed",on.has(k));b.textContent=on.has(k)?"Flagged":"Flag"});
  $$("[data-v]",el).forEach(b=>b.onclick=()=>{v=+b.dataset.v;$$("[data-v]",el).forEach(x=>x.classList.toggle("sel",x===b));$("#go",el).disabled=false});
  $("#go",el).onclick=()=>{const miss=D.need.filter(k=>!on.has(k)),fp=[...on].filter(k=>!D.need.includes(k));
   if(miss.length&&fp.length)return res(false,`You missed ${miss.length} real warning sign(s) and flagged ${fp.length} normal detail(s). Separate the real red flags from routine email elements.`);
   if(miss.length)return res(false,`You missed ${miss.length} real warning sign(s). Look closely at where things really point and at any pressure.`);
   if(fp.length)return res(false,`${fp.length} of the items you flagged are normal parts of a real email. Flag only what is genuinely suspicious.`);
   if(v!==1)return res(false,"The warning signs you flagged add up to phishing, even though some details look routine.");
   res(true)}}},
{title:"Stage 2: The Weak Password",
 intro:"Reviewing the account's password security.",
 hint:"Look for length, a mix of characters and nothing guessable. Skip names, places, years and common patterns.",
 lesson:"A strong password is long, complex, unpredictable and unique. R7#mP9!vQ2@x is 12 random characters with no words or personal details, so it is hard to guess and not reused anywhere. Names, places like Jeddah, years and simple sequences are the first things attackers try. Use a password manager and never reuse a password.",
 tip:"Use long, random, unique passwords (12+ characters) with no personal info, and store them in a password manager.",
 update:"The password was not strong enough. But there may be other risks.",
 render(el,res){
  const o=[["Mohammed2003","This uses a name and a year. Attackers try personal details first."],["kau12345","This is short and uses a common sequence. It appears in every attacker's wordlist."],["R7#mP9!vQ2@x"],["Jeddah@KAU1!","A place and a university name with a predictable ending are easy to guess."]];
  let pick=-1;const cur=strength("kau12345"),cl=sLabel(cur);
  el.innerHTML=`<div class="panel"><b>🔒 Account security panel</b><p>Current password: <code>••••••••</code> <span style="color:${cl[1]}">${cl[0]}</span></p><div class="meter"><i style="width:${cur}%;background:${cl[1]}"></i></div></div>
  <p>Choose the replacement that would keep attackers out. Select an option to preview its strength.</p><p class="dim" id="mtxt"></p><div class="meter"><i id="mtr" style="width:0"></i></div>
  <div class="opts">${o.map((x,i)=>`<button class="opt" style="font-family:var(--mono)" data-i="${i}">${x[0]}</button>`).join("")}</div><button class="btn" id="go" disabled>Lock it in</button>`;
  $$(".opt",el).forEach(b=>b.onclick=()=>{pick=+b.dataset.i;$$(".opt",el).forEach(x=>x.classList.toggle("sel",x===b));$("#go",el).disabled=false;
   const s=strength(o[pick][0]),l=sLabel(s);$("#mtr",el).style.width=s+"%";$("#mtr",el).style.background=l[1];$("#mtxt",el).textContent="Strength: "+l[0]});
  $("#go",el).onclick=()=>o[pick].length===1?res(true):res(false,o[pick][1]+" Look for the longest, most random option.");}},
{title:"Stage 3: The Suspicious App",
 intro:"A university events app on the account's device is asking for permissions. Decide what it really needs.",
 hint:"Match each permission to what an events app actually does. Some permissions can be limited to when the app is open.",
 lesson:"The Principle of Least Privilege: give an app only the access its features need. Notifications: allowed, because event reminders are the app's purpose. Location (While Using): allowed, because nearby events only need your position while the app is open, and 'Always' would track you in the background. Contacts, Microphone and Camera: denied, because browsing events never needs your contacts, sound or photos.",
 tip:"Match permissions to what the app really does. Allow what its features need (limited to 'While Using' when possible) and deny the rest.",
 update:"An application had access to more information than it needed. One final threat remains.",
 render(el,res){
  const P=[{n:"Camera",ic:"📷",o:["Allow","Deny"],ok:"Deny",i:"Lets the app take photos or video.",r:"The events app has no photo or scanning feature."},
   {n:"Notifications",ic:"🔔",o:["Allow","Deny"],ok:"Allow",i:"Lets the app send alerts, for example reminders before events start.",r:"Event reminders are the app's main feature, and notifications reveal no personal data."},
   {n:"Contacts",ic:"👥",o:["Allow","Deny"],ok:"Deny",i:"Lets the app read your whole contact list.",r:"Browsing events never needs your contacts."},
   {n:"Location",ic:"📍",o:["Always","While Using","Deny"],ok:"While Using",i:"Lets the app see where you are. It can be limited to times when the app is open.",r:"Showing nearby events needs your position only while the app is open. 'Always' would track you in the background."},
   {n:"Microphone",ic:"🎤",o:["Allow","Deny"],ok:"Deny",i:"Lets the app record sound around you.",r:"Nothing in an events app needs to record audio."}];
  const ch=P.map(()=>null);
  el.innerHTML=`<p><b>KAU Events</b> shows campus events near you and reminds you before they start. It requests ${P.length} permissions. Inspect them, then choose a setting for every one.</p>${P.map((p,i)=>`<div class="perm"><span>${p.ic} ${p.n}</span><span class="evb"><button class="mini" data-i="${i}">Inspect</button>${p.o.map(o=>`<button class="ch" data-p="${i}" data-v="${o}" aria-pressed="false" aria-label="${o} ${p.n}">${o}</button>`).join("")}</span></div>`).join("")}
  <div class="linkbar" id="evlog">Tap Inspect to see what a permission allows.</div><button class="btn" id="go" disabled>Apply permissions</button>`;
  $$("[data-i]",el).forEach(b=>{const p=P[+b.dataset.i];b.onclick=()=>{$("#evlog",el).textContent=p.n+": "+p.i}});
  $$(".ch",el).forEach(b=>b.onclick=()=>{const i=+b.dataset.p;ch[i]=b.dataset.v;$$(`[data-p="${i}"]`,el).forEach(x=>{const on=x.dataset.v===ch[i];x.className="ch"+(on?(ch[i]==="Deny"?" d":" a"):"");x.setAttribute("aria-pressed",on)});$("#go",el).disabled=ch.some(c=>c===null)});
  $("#go",el).onclick=()=>{const bad=P.filter((p,i)=>ch[i]!==p.ok);
   if(bad.length)return res(false,`${bad.length} setting(s) need another look. `+bad.map(p=>`${p.n}: ${p.r}`).join(" "));
   res(true)}}},
{title:"Stage 4: The Fake Call (Final Challenge)",
 intro:"Incoming call detected. Someone claims they can restore your account.",
 hint:"Real IT staff never need your one-time code. Urgency and threats are warning signs. Hang up and use an official channel.",
 lesson:"This is social engineering: attackers manipulate people instead of hacking systems. They claim to see a problem, ask for an OTP to 'verify' you, then threaten you to rush your decision. A one-time password is for you alone, and no real IT team will ever ask for it. Hang up and contact KAU through its official channel.",
 tip:"Never share OTPs with anyone. If someone claims to be IT support, hang up and contact the university through its official channel.",
 update:"",
 render(el,res){
  const R=[
   {say:"“Hello, this is KAU IT Support. We've detected unusual activity on your account.”",o:[
    ["Oh no! Tell me what to do, I'll follow your instructions.",0,"Following instructions from an unverified caller hands them control of the conversation."],
    ["Give my student ID so they know who I am.",0,"Never hand personal details to a caller you haven't verified. They could be collecting information."],
    ["I can't confirm who you are, so I'll check through KAU's official channels.",1,"Good call. A claim of 'unusual activity' is a classic way to scare people, so verify independently."]]},
   {say:"“To verify it's really you, please read me the 6-digit code we just sent to your phone.”",o:[
    ["Read the whole code out. It sounds official.",0,"You gave an attacker the key to your account. A one-time code is only for you."],
    ["Read just the first three digits.",0,"Even part of a code helps an attacker. Never share any of it."],
    ["No. I never share OTPs with anyone.",1,"Correct. Real IT staff never ask for your OTP."]]},
   {say:"“If you don't give me the code right now, your account will be suspended today!”",o:[
    ["Give in. I can't lose my account.",0,"Threats are a pressure tactic to stop you thinking. Giving in once is all an attacker needs."],
    ["Stay on the line and argue until they back down.",0,"Staying on the line lets them keep pressuring you, and caller ID can be faked. End the call."],
    ["End the call and contact KAU IT support through the official website or number.",1,"Correct. Hanging up and using an official channel is the safe move."]]}];
  let r=0;const log=[];
  el.innerHTML=`<div class="call"><div class="ring">📞</div><p><b>Incoming call</b><br>Caller ID: “KAU IT Support” <button class="mini" id="cid">Inspect</button></p><div class="linkbar" id="evlog">Tap Inspect to examine the caller ID.</div><button class="btn" id="ans">Answer call</button><div id="talk"></div></div>`;
  $("#cid",el).onclick=()=>{$("#evlog",el).textContent="Caller ID can be faked. A name on the screen proves nothing."};
  const draw=()=>{const cur=R[r],opts=shuffle(cur.o.slice());
   $("#talk",el).innerHTML=`<div class="pressure"><span>Caller pressure</span><b><i style="width:${Math.min(100,(r+1)*34)}%"></i></b></div>${log.join("")}<p class="dim">Decision ${r+1} of 3</p><div class="line">${cur.say}</div><div class="opts">${opts.map((o,i)=>`<button class="opt" data-i="${i}">${o[0]}</button>`).join("")}</div>`;
   $$("[data-i]",el).forEach(b=>b.onclick=()=>{const o=opts[+b.dataset.i];
    if(!o[1])return res(false,o[2]);
    log.push(`<div class="line">${cur.say}</div><div class="line me">You: ${o[0]}</div><div class="line ok">✔ ${o[2]}</div>`);
    if(r<2){r++;draw()}else{$("#talk",el).innerHTML=log.join("")+`<div class="line me">☎ Call ended.</div>`;res(true)}})};
  $("#ans",el).onclick=()=>{$("#ans",el).remove();draw()}}}
];
