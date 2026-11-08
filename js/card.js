const Card={draw(d){const c=document.createElement("canvas");c.width=1080;c.height=1350;const x=c.getContext("2d");
 let g=x.createLinearGradient(0,0,0,1350);g.addColorStop(0,"#050b18");g.addColorStop(1,"#0a1a33");x.fillStyle=g;x.fillRect(0,0,1080,1350);
 x.strokeStyle="rgba(34,229,255,0.08)";x.lineWidth=1;for(let i=0;i<=1350;i+=45){x.beginPath();x.moveTo(i,0);x.lineTo(i,1350);x.stroke();x.beginPath();x.moveTo(0,i);x.lineTo(1080,i);x.stroke()}
 x.strokeStyle="#22e5ff";x.lineWidth=4;x.shadowColor="#22e5ff";x.shadowBlur=24;x.strokeRect(40,40,1000,1270);x.shadowBlur=0;x.textAlign="center";
 const T=(t,y,s,col)=>{x.fillStyle=col;x.font="700 "+s+"px Consolas,Menlo,monospace";x.fillText(t,540,y)};
 g=x.createLinearGradient(240,0,840,0);g.addColorStop(0,"#22e5ff");g.addColorStop(1,"#3b82ff");
 T("CYBER CLASH",190,120,g);T("4 Threats. 3 Minutes. Can You Win?",245,30,"#8fa6c0");T("MISSION RESULTS",330,44,"#d7e6f5");
 T(d.status,395,34,d.won?"#3dffa5":"#ff6b81");
 x.font="200px serif";x.fillStyle="#fff";x.fillText(d.rank.icon,540,640);T(d.rank.name.toUpperCase(),725,64,d.rank.color);
 T(d.score+" / 400",850,120,"#22e5ff");
 [["Stages completed",d.completed+" / 4"],["Mode",d.mode],["Hints used",String(d.hints)],["Time remaining",d.time],["Account security",d.pct+"%"]].forEach((r,i)=>{const y=930+i*62;x.textAlign="left";x.fillStyle="#8fa6c0";x.font="30px Consolas,Menlo,monospace";x.fillText(r[0],150,y);x.textAlign="right";x.fillStyle="#d7e6f5";x.font="700 30px Consolas,Menlo,monospace";x.fillText(r[1],930,y)});
 x.textAlign="center";if(d.nick)T("Player: "+d.nick,1275,28,"#d7e6f5");else T("Cybersecurity awareness simulation",1275,26,"#8fa6c0");
 return c},
 download(d){const c=this.draw(d);c.toBlob(b=>{const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="cyber-clash-result.png";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1500)},"image/png")}};
