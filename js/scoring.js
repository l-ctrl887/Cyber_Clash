const Score={s:[],init(){this.s=[0,1,2,3].map(()=>({pts:0,wrong:0,hint:false,done:false}))},
 wrong(i){this.s[i].wrong++},
 useHint(i){if(this.s[i].hint)return false;this.s[i].hint=true;return true},
 potential(i){const x=this.s[i];return Math.max(10,100-15*x.wrong-(x.hint?10:0))},
 finish(i){const x=this.s[i];if(x.done)return;x.done=true;x.pts=this.potential(i)},
 total(){return this.s.reduce((a,x)=>a+x.pts,0)},
 doneCount(){return this.s.filter(x=>x.done).length},
 hints(){return this.s.filter(x=>x.hint).length},
 rank(t){return t>=360?{name:"Cyber Guardian",icon:"🛡️",color:"#ffd166"}:t>=300?{name:"Security Expert",icon:"🔐",color:"#22e5ff"}:t>=200?{name:"Threat Detector",icon:"🎯",color:"#3b82ff"}:t>=100?{name:"Cyber Rookie",icon:"🔰",color:"#3dffa5"}:{name:"Needs Training",icon:"📘",color:"#ff6b81"}}};
Score.init();
