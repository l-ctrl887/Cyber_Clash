const Board={key:"cyberclash.board.v1",mem:[],persisted:true,
 cmp:(a,b)=>b.score-a.score||a.elapsed-b.elapsed||a.ts-b.ts,
 load(){try{const a=JSON.parse(localStorage.getItem(this.key));return Array.isArray(a)?a:[]}catch(e){return this.mem.slice()}},
 save(entry){const a=this.load();a.push(entry);a.sort(this.cmp);const t=a.slice(0,50);this.mem=t;try{localStorage.setItem(this.key,JSON.stringify(t));this.persisted=true}catch(e){this.persisted=false}return t},
 top(){return this.load().sort(this.cmp).slice(0,10)}};
