// Original procedural tones, synthesized locally; starts only after a user gesture.
export class AudioManager {
 constructor(){this.music=.22;this.effects=.3;this.muted=false;this.ctx=null;this.timer=null;this.theme='menu';this.step=0;}
 init(){try{this.ctx ||= new (window.AudioContext||window.webkitAudioContext)();this.ctx.resume();if(!this.timer)this.timer=setInterval(()=>this.tick(),400);}catch{}}
 tone(freq,duration,volume,type='triangle'){if(!this.ctx||this.muted||!volume)return;const o=this.ctx.createOscillator(),g=this.ctx.createGain(),t=this.ctx.currentTime;o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(volume*.08,t);g.gain.exponentialRampToValueAtTime(.0001,t+duration);o.connect(g).connect(this.ctx.destination);o.start(t);o.stop(t+duration);}
 tick(){const themes={menu:[220,277,330,415,330,277,247,196],explore:[196,247,294,370,294,247,220,165],combat:[220,220,330,294,247,247,370,330],boss:[165,196,233,220,165,196,262,247]};let a=themes[this.theme]||themes.menu;this.tone(a[this.step++%a.length],.34,this.music);}
 sound(kind='select'){this.tone(kind==='victory'?660:kind==='hit'?110:440,.12,this.effects,kind==='hit'?'square':'triangle');}
}
