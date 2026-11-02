const Timer={dur:300000,deadline:0,id:null,running:false,
 start(onTick,onEnd){this.stop();this.deadline=Date.now()+this.dur;this.running=true;
  const tick=()=>{if(!this.running)return;const r=Math.max(0,this.deadline-Date.now());onTick(r);if(r<=0){this.stop();onEnd()}};
  tick();this.id=setInterval(tick,200)},
 stop(){this.running=false;clearInterval(this.id);this.id=null},
 remaining(){return Math.max(0,this.deadline-Date.now())},
 fmt(ms){const s=Math.ceil(ms/1000);return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0")}};
