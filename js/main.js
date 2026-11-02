const state={phase:"idle",idx:0,advanced:false,left:0};
function reveal(el){if(el.scrollIntoView)el.scrollIntoView({block:"nearest",behavior:"smooth"})}
function show(id){$$(".screen").forEach(s=>s.classList.toggle("active",s.id===id));window.scrollTo(0,0)}
function hud(){$("#hudScore").textContent=Score.total();$("#hudStage").textContent=Math.min(state.idx+1,4)+"/4";$("#bar").style.width=(Score.doneCount()/4*100)+"%";$("#pot").textContent=state.phase==="playing"&&!state.advanced?"This stage is worth "+Score.potential(state.idx)+" points":""}
function loadStage(){const st=STAGES[state.idx];state.advanced=false;
 $("#stTitle").textContent=st.title;$("#feedback").hidden=true;$("#btnNext").hidden=true;$("#hintBox").hidden=true;
 $("#btnHint").disabled=false;$("#btnHint").hidden=false;hud();st.render($("#stBody"),onResult)}
function onResult(ok,msg){if(state.phase!=="playing"||state.advanced)return;const i=state.idx,fb=$("#feedback");fb.hidden=false;
 if(!ok){Score.wrong(i);fb.className="fb no";fb.innerHTML=`<b>Not quite.</b> ${msg} Try again. (−15 points)`;hud();reveal(fb);return}
 state.advanced=true;Score.finish(i);if(i===3){state.left=Timer.remaining();Timer.stop()}hud();
 fb.className="fb ok";fb.innerHTML=`<b>Correct! +${Score.s[i].pts} points.</b> ${STAGES[i].lesson}`;
 $$("#stBody button").forEach(b=>b.disabled=true);$("#btnHint").hidden=true;
 const n=$("#btnNext");n.hidden=false;n.textContent=i===3?"Recover account":"Next stage";reveal(fb)}
function startGame(){Score.init();state.idx=0;state.phase="playing";show("game");
 Timer.start(r=>{const t=$("#hudTime");t.textContent=Timer.fmt(r);t.classList.toggle("warn",r<=60000)},()=>timeUp());loadStage()}
function timeUp(){if(state.phase!=="playing")return;state.phase="over";
 $("#missed").innerHTML=STAGES.map((s,i)=>Score.s[i].done?"":`<div class="note"><b>${s.title}</b><br>${s.lesson}</div>`).join("<br>");
 show("timesup")}
function win(){const left=state.left;Timer.stop();state.phase="won";$("#recTime").textContent="Time remaining: "+Timer.fmt(left);show("recovered")}
function results(){const L=["Weak Password","Suspicious App","Fake Link","Fake Call"];
 $("#resScore").textContent=Score.total();
 $("#resStages").innerHTML=L.map((n,i)=>{const x=Score.s[i];return`<div class="stg"><span>${n}</span><span>${x.done?x.pts+"/100":"Not completed"}</span></div>`}).join("");
 const tips=STAGES.filter((s,i)=>!Score.s[i].done||Score.s[i].wrong>0||Score.s[i].hint).map(s=>s.tip);
 $("#resTips").innerHTML=(tips.length?tips:["Excellent work. Keep using strong passwords, minimal permissions, careful link checks and never share OTPs."]).map(t=>`<li>${t}</li>`).join("");
 show("results")}
$("#btnStart").onclick=()=>show("story");
$("#btnBegin").onclick=startGame;
$("#btnNext").onclick=()=>{if(state.phase!=="playing"||!state.advanced)return;if(state.idx===3)return win();state.idx++;loadStage()};
$("#btnHint").onclick=()=>{if(state.phase!=="playing")return;Score.useHint(state.idx);hud();const b=$("#hintBox");b.textContent="Hint: "+STAGES[state.idx].hint;b.hidden=false;reveal(b);$("#btnHint").disabled=true};
$("#btnToResults1").onclick=results;$("#btnToResults2").onclick=results;
$("#btnAgain").onclick=()=>{Timer.stop();Score.init();state.phase="idle";state.idx=0;$("#hudTime").textContent="05:00";$("#hudTime").classList.remove("warn");show("welcome")};
