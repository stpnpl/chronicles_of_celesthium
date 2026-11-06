import assert from 'node:assert/strict';
import {npcs} from '../scripts/data/world.js';
const listeners={};const root={innerHTML:'',addEventListener:(name,fn)=>listeners[name]=fn};
globalThis.document={querySelector:()=>root,documentElement:{classList:{toggle(){}}}};globalThis.window={};
await import('../scripts/app.js');
const click=(action,extra={})=>listeners.click({target:{closest:()=>({dataset:{action,...extra},disabled:false})},preventDefault(){}});
function fight(){let count=0;while(!root.innerHTML.includes('ENCOUNTER COMPLETE')&&count++<100){let hp=Number(root.innerHTML.match(/STABILITY<\/span><b>(\d+)/)?.[1]);let turn=Number(root.innerHTML.match(/TURN (\d+)/)?.[1])-1;let boss=root.innerHTML.includes('BOSS ENCOUNTER');let items=Number(root.innerHTML.match(/Restorative × (\d+)/)?.[1]);let energy=Number(root.innerHTML.match(/ENERGY<\/span><b>(\d+)/)?.[1]);if(hp<50&&items>0)click('item');else if(boss&&turn%3===0)click('guard');else if(boss&&energy>=35)click('ability',{index:'2'});else click('attack');}assert.ok(root.innerHTML.includes('Victory'),`battle finished with victory: ${root.innerHTML.slice(-1000)}`);click('victory');}
for(const hero of ['kael','nyra','shoryu']){
 click('select');click('pick',{id:hero});click('begin');assert.match(root.innerHTML,/When the skies/);click('enter');
 for(const [id,n] of Object.entries(npcs).filter(([id,n])=>n.location==='refuge'&&id!==hero)) {click('talk',{id});assert.ok(root.innerHTML.includes(n.name));while(root.innerHTML.includes('data-action="next-dialog"'))click('next-dialog');if(id==='riko'){click('training');fight();}else click('close-dialog');}
 assert.ok(!root.innerHTML.includes(`data-action="talk" data-id="${hero}"`));
 click('travel',{id:'fractured'});for(const id of ['lira','thorn']){click('talk',{id});while(root.innerHTML.includes('data-action="next-dialog"'))click('next-dialog');click('close-dialog');}click('shard');click('fight',{id:'anomaly'});fight();
 click('travel',{id:'refuge'});click('talk',{id:'echo'});while(root.innerHTML.includes('data-action="next-dialog"'))click('next-dialog');click('close-dialog');click('rest');
 click('travel',{id:'mirage'});click('talk',{id:'hana'});while(root.innerHTML.includes('data-action="next-dialog"'))click('next-dialog');click('close-dialog');click('clue');click('fight',{id:'wisp'});fight();
 click('travel',{id:'refuge'});click('rest');click('travel',{id:'threshold'});click('talk',{id:'yorikai'});while(root.innerHTML.includes('data-action="next-dialog"'))click('next-dialog');click('close-dialog');click('fight',{id:'guardian'});fight();assert.match(root.innerHTML,/The passage is stable/i);assert.match(root.innerHTML,/repaired dampeners/);assert.ok(root.innerHTML.includes(hero==='kael'?'The signal is steady':hero==='nyra'?'Vorpalis still whispers':'The winds have quieted'));
}
console.log('UI event-flow simulation passed for all champions, NPCs, optional quest, boss and endings.');
