const Score={s:[],init(){this.s=[0,1,2,3].map(()=>({pts:0,wrong:0,hint:false,done:false}))},
 wrong(i){this.s[i].wrong++},
 useHint(i){if(this.s[i].hint)return false;this.s[i].hint=true;return true},
 finish(i){const x=this.s[i];if(x.done)return;x.done=true;x.pts=this.potential(i)},
 potential(i){const x=this.s[i];return Math.max(10,100-15*x.wrong-(x.hint?10:0))},
 total(){return this.s.reduce((a,x)=>a+x.pts,0)},
 doneCount(){return this.s.filter(x=>x.done).length}};
Score.init();
