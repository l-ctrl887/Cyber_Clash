const state={phase:"idle",idx:0,advanced:false,left:0,total:300,mode:"normal",saved:false,w30:false,w10:false,from:"welcome",toastId:null};
const cur=()=>state.mode==="expert"?EXPERT:STAGES;
const mm=s=>Timer.fmt(s*1000),modeName=()=>state.mode==="expert"?"Expert":"Normal";
function reveal(el){if(el.scrollIntoView)el.scrollIntoView({block:"nearest",behavior:"smooth"})}
function show(id){$$(".screen").forEach(s=>s.classList.toggle("active",s.id===id));window.scrollTo(0,0)}
function toast(t){const e=$("#toast");e.textContent=t;e.hidden=false;clearTimeout(state.toastId);state.toastId=setTimeout(()=>e.hidden=true,2500)}
function shake(el){el.classList.remove("shake");void el.offsetWidth;el.classList.add("shake")}
function hud(){const pct=Score.doneCount()*25,L=$("#secLabel");
 $("#hudScore").textContent=Score.total();$("#hudStage").textContent=Math.min(state.idx+1,4)+"/4";$("#bar").style.width=pct+"%";
 L.textContent=pct===100?"ACCOUNT FULLY SECURED!":"ACCOUNT SECURITY: "+pct+"%";L.classList.toggle("good",pct===100);
 $("#pot").textContent=state.phase==="playing"&&!state.advanced?"This stage is worth "+Score.potential(state.idx)+" points":""}
function loadStage(){const st=cur()[state.idx];state.advanced=false;
 $("#stTitle").textContent=st.title;const si=$("#stIntro");si.textContent=st.intro||"";si.hidden=!st.intro;
 $("#feedback").hidden=true;$("#btnNext").hidden=true;$("#hintBox").hidden=true;
 const h=$("#btnHint");h.disabled=false;h.hidden=false;hud();st.render($("#stBody"),onResult)}
function onResult(ok,msg){if(state.phase!=="playing"||state.advanced)return;const i=state.idx,fb=$("#feedback");fb.hidden=false;
 if(!ok){Score.wrong(i);fb.className="fb no";fb.innerHTML=`<b>Not quite.</b> ${msg} Try again. (−15 points)`;shake(fb);shake($("#stBody"));Sound.play("wrong");hud();reveal(fb);return}
 state.advanced=true;Score.finish(i);if(i===3){state.left=Math.round(Timer.remaining()/1000);Timer.stop()}hud();
fb.className="fb ok";
fb.innerHTML=`
  <b>✔ Correct! +${Score.s[i].pts} points.</b>
  <p class="lesson">${cur()[i].lesson}</p>
`; 
                          Sound.play("correct");setTimeout(()=>Sound.play("stage"),220);
 $$("#stBody button").forEach(b=>b.disabled=true);$("#btnHint").hidden=true;
 const n=$("#btnNext");n.hidden=false;n.textContent=i===3?"Complete investigation":"Next stage";reveal(fb)}
function onTick(r){const t=$("#hudTime"),s=Math.ceil(r/1000);t.textContent=Timer.fmt(r);
 t.classList.toggle("low",r<=60000);t.classList.toggle("warn",r<=30000);t.classList.toggle("crit",r<=10000);
 if(r<=30000&&r>10000&&!state.w30){state.w30=true;toast("⚠ 30 seconds remaining");Sound.play("warn")}
 if(r<=10000&&r>0&&!state.w10){state.w10=true;toast("🚨 CRITICAL: 10 seconds left!");Sound.play("crit")}}
function startGame(){Timer.dur=300000;state.total=Timer.dur/1000;Sound.init();Sound.play("start");Score.init();Object.assign(state,{idx:0,left:0,phase:"playing",saved:false,w30:false,w10:false});
 $("#nick").value="";$("#btnSave").disabled=false;$("#saveMsg").textContent="Saved only in this browser. Please do not enter personal information.";
 show("game");Timer.start(onTick,timeUp);loadStage()}
function timeUp(){if(state.phase!=="playing")return;state.phase="over";state.left=0;Sound.play("lose");
 $("#missed").innerHTML=cur().map((s,i)=>Score.s[i].done?"":`<div class="note"><b>${s.title}</b><br>${s.lesson}</div>`).join("<br>");
 show("timesup")}
function summary(won){const t=Score.total(),n=Score.doneCount();return{won,score:t,rank:Score.rank(t),completed:n,mode:modeName(),hints:Score.hints(),time:mm(won?state.left:0),taken:mm(won?state.total-state.left:state.total),pct:n*25,status:won?"INVESTIGATION COMPLETE":"TIME'S UP",nick:$("#nick").value.replace(/[^\w \-]/g,"").trim()}}
function results(won){const d=summary(won),L=cur().map(x=>x.title.replace(/^Stage \d: /,"").replace(/ \(.*\)$/,""));state.won=won;
 $("#banner").innerHTML=won?`<h2 class="good">INVESTIGATION COMPLETE</h2><p class="threat">ALL FOUR SECURITY THREATS IDENTIFIED</p><p class="secured">YOUR ACCOUNT IS NOW SECURED!</p>`:`<h2 class="bad">TIME'S UP</h2><p>The account is not fully secured. Review the correct practices below.</p>`;
 $("#rankBox").innerHTML=`<span class="ricon">${d.rank.icon}</span><span class="rname" style="color:${d.rank.color}">${d.rank.name.toUpperCase()}</span>`;$("#rankBox").style.borderColor=d.rank.color;
 $("#resScore").textContent=d.score;
 $("#stats").innerHTML=[["Mode",d.mode],["Completed stages",d.completed+" / 4"],["Time taken",d.taken],["Time remaining",d.time],["Hints used",d.hints],["Account security",d.pct+"%"]].map(x=>`<div><small>${x[0]}</small><b>${x[1]}</b></div>`).join("");
 $("#resStages").innerHTML=L.map((n,i)=>{const x=Score.s[i];return`<div class="stg"><span>${i+1}. ${n}</span><span>${x.done?"✔ Completed "+x.pts+"/100":"✖ Incomplete"}</span></div>`}).join("");
 const tips=won?cur().map(s=>s.tip):cur().filter((s,i)=>!Score.s[i].done).map(s=>s.tip);
 Sound.play(won?"victory":"lose");show("results")}
function showBoard(from){state.from=from;const rows=Board.top();
 $("#boardBody").innerHTML=rows.length?rows.map((e,i)=>`<tr><td>${i+1}</td><td>${e.nick.replace(/[<>&"]/g,"")}</td><td>${Score.rank(e.score).icon} ${Score.rank(e.score).name}</td><td>${e.score}</td><td>${e.mode}</td><td>${e.won?mm(e.elapsed):"Time up"}</td></tr>`).join(""):`<tr><td colspan="6">No results saved yet.</td></tr>`;
 show("board")}
$$(".mode").forEach(b=>b.onclick=()=>{state.mode=b.dataset.m;$("#hudTime").textContent=mm(300);$$(".mode").forEach(x=>{x.classList.toggle("sel",x===b);x.setAttribute("aria-pressed",x===b)})});
$("#btnStart").onclick=startGame;
$("#btnNext").onclick=()=>{if(state.phase!=="playing"||!state.advanced)return;if(state.idx===3){state.phase="won";return results(true)}state.idx++;loadStage()};
$("#btnHint").onclick=()=>{if(state.phase!=="playing")return;if(Score.useHint(state.idx))toast("Hint used: −10 points");hud();const b=$("#hintBox");b.textContent="Hint: "+cur()[state.idx].hint;b.hidden=false;reveal(b);$("#btnHint").disabled=true};
$("#btnToResults").onclick=()=>results(false);
$("#btnSave").onclick=()=>{if(state.saved)return;state.saved=true;const d=summary(state.won);
 Board.save({nick:d.nick||"Player",score:d.score,mode:d.mode,elapsed:state.won?state.total-state.left:state.total,won:!!state.won,ts:Date.now()});
 $("#btnSave").disabled=true;$("#saveMsg").textContent=Board.persisted?"Saved on this device only.":"Browser storage is blocked, so this result is kept for this session only."};
$("#btnCard").onclick=()=>Card.download(summary(state.won));
$("#btnBoard").onclick=()=>showBoard("welcome");$("#btnBoard2").onclick=()=>showBoard("results");$("#btnBack").onclick=()=>show(state.from);
$("#sndBtn").onclick=e=>{Sound.on=!Sound.on;Sound.init();e.currentTarget.textContent=Sound.on?"🔊":"🔇";e.currentTarget.setAttribute("aria-pressed",Sound.on);e.currentTarget.setAttribute("aria-label",Sound.on?"Sound on":"Sound off")};
$("#btnAgain").onclick=()=>{Timer.stop();Score.init();Object.assign(state,{phase:"idle",idx:0,left:0,saved:false,won:false,w30:false,w10:false});
 const t=$("#hudTime");t.textContent=mm(300);t.className="";$("#toast").hidden=true;hud();$("#nick").value="";$("#btnSave").disabled=false;show("welcome")};
