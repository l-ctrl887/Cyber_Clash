/* CYBER CLASH audio engine. Local MP3 files in assets/sounds/, plain HTMLAudio, no libraries.
   Original API kept: Sound.on, Sound.init(), Sound.play(name) with the old names
   (start, correct, wrong, warn, crit, stage, victory, lose) plus: alert, scan, keyboard.
   New: Sound.startMusic(), stopMusic(), stopAll(), toggle(), syncButton(). */
const Sound=(()=>{
 const BASE="assets/sounds/",KEY="cyberclash.sound",MUSIC_VOL=.18;
 const FX={startup:["startup.mp3",.6],keyboard:["keyboard.mp3",.9],alert:["alert.mp3",.5],scan:["scan.mp3",.6],correct:["correct.mp3",.6],wrong:["wrong.mp3",.55],stage:["stage-complete.mp3",.7],warning:["warning.mp3",.5],critical:["critical.mp3",.55],gameover:["game-over.mp3",.55],victory:["victory.mp3",.7]};
 const ALIAS={start:"startup",typing:"keyboard",warn:"warning",crit:"critical",lose:"gameover","game-over":"gameover","stage-complete":"stage"};
 const only=window.CYBER_AUDIO_ONLY; /* optional list of sounds to load (used by the QR page) */
 let on=true,unlocked=false,wantMusic=false,music=null,fadeId=null,ctx=null;
 try{on=localStorage.getItem(KEY)!=="off"}catch(e){}
 const els={},missing=new Set();
 /* iOS Safari ignores element.volume, so there the volume goes through a Web Audio gain node */
 const noVol=(()=>{try{const t=new Audio();t.volume=.5;return t.volume!==.5}catch(e){return false}})();
 const setVol=(a,v)=>{if(a._gain)a._gain.gain.value=v;else a.volume=v};
 const route=a=>{if(!noVol||a._gain)return;try{const AC=window.AudioContext||window.webkitAudioContext;ctx=ctx||new AC();const g=ctx.createGain();g.gain.value=a._vol;ctx.createMediaElementSource(a).connect(g);g.connect(ctx.destination);a._gain=g;a.volume=1}catch(e){}};
 const mk=(name,file,vol,loop)=>{if(typeof Audio==="undefined")return null;try{const a=new Audio(BASE+file);a.preload="auto";a.loop=!!loop;a._vol=vol;a.volume=vol;
  a.addEventListener("error",()=>missing.add(name));a.addEventListener("ended",()=>{a._busy=false});return a}catch(e){return null}};
 Object.keys(FX).forEach(k=>{if(only&&!only.includes(k))return;const e=mk(k,FX[k][0],FX[k][1]);if(e)els[k]=e});
 if(!only||only.includes("music"))music=mk("music","background.mp3",MUSIC_VOL,true);
 const quiet=a=>{try{a.pause();a.currentTime=0}catch(e){}a._busy=false};
 const fadeIn=(a,to,ms)=>{clearInterval(fadeId);setVol(a,0);let v=0;const step=to/(ms/60);fadeId=setInterval(()=>{v=Math.min(to,v+step);setVol(a,v);if(v>=to)clearInterval(fadeId)},60)};
 const unlock=()=>{if(unlocked)return;unlocked=true;
  try{if(noVol){Object.values(els).concat(music||[]).forEach(route);if(ctx&&ctx.resume)ctx.resume()}}catch(e){}
  /* prime every element once, muted, so later timer-driven plays (30s / 10s warnings) are allowed on mobile */
  Object.values(els).concat(music||[]).forEach(a=>{if(a._busy)return;a.muted=true;let p;try{p=a.play()}catch(e){}
   const done=()=>{if(!a._busy){try{a.pause();a.currentTime=0}catch(e){}}a.muted=false};
   if(p&&p.then)p.then(done).catch(()=>{a.muted=false});else done()});
  if(api.onunlock)api.onunlock()};
 const resumeMusic=()=>{if(!wantMusic||!on||!unlocked||!music||missing.has("music"))return;
  if(music._busy){const p=music.play();if(p&&p.catch)p.catch(()=>{})}else api.startMusic()};
 const api={
  get on(){return on},
  set on(v){v=!!v;if(v===on)return;on=v;try{localStorage.setItem(KEY,on?"on":"off")}catch(e){}
   if(!on){if(music)music.pause();api.stopFx()}else resumeMusic();api.syncButton()},
  get unlocked(){return unlocked},
  onunlock:null,
  init(){unlock()},
  toggle(){api.on=!on;return on},
  play(n){const k=ALIAS[n]||n,a=els[k];if(!a||!on||!unlocked||missing.has(k))return;
   try{a.muted=false;a._busy=true;a.currentTime=0}catch(e){}
   const p=a.play();if(p&&p.catch)p.catch(()=>{a._busy=false})},
  startMusic(){wantMusic=true;if(!music||!on||!unlocked||missing.has("music")||music._busy)return;
   music._busy=true;music.muted=false;fadeIn(music,MUSIC_VOL,1500);const p=music.play();if(p&&p.catch)p.catch(()=>{music._busy=false})},
  stopMusic(){wantMusic=false;clearInterval(fadeId);if(music)quiet(music)},
  stopFx(){Object.values(els).forEach(quiet)},
  stopAll(){api.stopMusic();api.stopFx()},
  syncButton(){const b=document.getElementById("sndBtn");if(!b||b.dataset.manual)return;
   b.textContent=on?"🔊 ON":"🔇 OFF";b.setAttribute("aria-pressed",String(on));b.setAttribute("aria-label",on?"Sound on":"Sound off");b.title=on?"Sound on":"Sound off"}
 };
 /* audio may only start after a user gesture: unlock on the first one */
 ["click","touchend","keydown"].forEach(ev=>document.addEventListener(ev,unlock,{once:true,passive:true}));
 document.addEventListener("visibilitychange",()=>{if(document.hidden){if(music)music.pause()}else resumeMusic()});
 api.syncButton();document.addEventListener("DOMContentLoaded",()=>api.syncButton());
 return api})();
