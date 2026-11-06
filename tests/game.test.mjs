import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import {characters} from '../scripts/data/characters.js';
import {npcs,companions,routes,locations,enemies,reactions} from '../scripts/data/world.js';
import {newRun,isReady,objective} from '../scripts/state.js';
import {beginBattle,act,intent,retry,resolveVictory} from '../scripts/combat.js';
import {questAction} from '../scripts/quests.js';

for(const [id,c] of Object.entries(characters)){
 const s=newRun(id);assert.equal(s.player.hp,c.hp);assert.equal(s.player.energy,c.energy);assert.equal(c.abilities.length,3);assert.ok(reactions[id].ending);
 for(const [nid,n] of Object.entries(npcs)){assert.ok(existsSync(`images/portraits/${n.image}.webp`));assert.ok(locations[n.location]);assert.ok(n.dialogue.length);if(nid!==id)assert.ok(n.name);}
 assert.match(objective(s),/Riko/);assert.equal(isReady(s),false);
 beginBattle(s,'training');const initial=s.player.hp;act(s,'guard');assert.ok(s.player.hp>initial-enemies.training.attack);assert.equal(s.player.energy,c.energy);
 while(!s.battle.over)act(s,'attack');assert.ok(s.player.hp>0,`${id} training victory`);resolveVictory(s);assert.ok(s.flags.training);
 questAction(s,'echo');assert.ok(s.flags.questStarted);s.flags.shard=true;const items=s.player.items;assert.match(questAction(s,'echo'),/dampeners/);assert.ok(s.flags.containment);assert.equal(s.player.items,items+1);questAction(s,'echo');assert.equal(s.player.items,items+1);
 for(const key of ['hound','boar','sentinel','stalker','marauder']){s.player.hp=c.hp;s.player.energy=c.energy;beginBattle(s,key);while(!s.battle.over){if(s.player.hp<40&&s.player.items)act(s,'item');else if(s.battle.turn%3===1 && ['boar','sentinel','stalker'].includes(s.battle.enemy.kind))act(s,'guard');else if(s.player.energy>=c.abilities[2].cost)act(s,'ability',c.abilities[2]);else act(s,'attack');}assert.ok(s.player.hp>0,`${id} ${key}`);resolveVictory(s);}
 assert.ok(isReady(s));assert.match(objective(s),/Yorikai/);
 s.player.hp=c.hp;s.player.energy=c.energy;beginBattle(s,'guardian');assert.match(intent(s.battle),/Rift Break/);
 // Use a predictable guard/attack loop, item as needed; all three champions can win.
 let turns=0;while(!s.battle.over && turns++<80){if(s.player.hp<55 && s.player.items)act(s,'item');else if(s.battle.turn%3===0)act(s,'guard');else if(s.player.energy>=c.abilities[2].cost)act(s,'ability',c.abilities[2]);else act(s,'attack');}
 assert.ok(s.battle.over && s.player.hp>0,`${id} boss victory`);resolveVictory(s);assert.equal(s.flags.boss,true);
}
// Every tactical effect and energy constraint.
let s=newRun('kael');beginBattle(s,'guardian');let hp=s.player.hp;act(s,'ability',characters.kael.abilities[0]);assert.equal(s.player.hp,hp);assert.match(s.battle.log.join(' '),/delays/);s.player.energy=0;let turn=s.battle.turn;assert.equal(act(s,'ability',characters.kael.abilities[0]),false);assert.equal(s.battle.turn,turn);act(s,'guard');assert.equal(s.player.energy,15);
s=newRun('kael');beginBattle(s,'training');act(s,'ability',characters.kael.abilities[1]);assert.match(s.battle.log.join(' '),/absorbs/);s.player.hp-=25;act(s,'ability',characters.kael.abilities[2]);assert.ok(s.player.hp>0);
s=newRun('nyra');beginBattle(s,'training');act(s,'ability',characters.nyra.abilities[0]);assert.match(s.battle.log.join(' '),/counters/);s.player.hp=50;act(s,'ability',characters.nyra.abilities[1]);assert.ok(s.player.hp>50);s.player.energy=55;const old=s.battle.enemy.hp;act(s,'ability',characters.nyra.abilities[2]);assert.ok(s.battle.enemy.hp<old);
s=newRun('shoryu');beginBattle(s,'guardian');act(s,'ability',characters.shoryu.abilities[0]);assert.equal(s.battle.charged,true);act(s,'ability',characters.shoryu.abilities[2]);assert.equal(s.battle.charged,false);assert.match(s.battle.log.join(' '),/48 damage/);s.player.energy=65;act(s,'ability',characters.shoryu.abilities[1]);assert.match(s.battle.log.join(' '),/Frost weakens/);
// Defeat and retry restore the exact encounter checkpoint, including items.
s=newRun('kael');s.player.hp=1;s.player.items=1;beginBattle(s,'guardian');act(s,'attack');assert.equal(s.player.hp,0);assert.ok(s.battle.over);retry(s);assert.equal(s.player.hp,1);assert.equal(s.player.items,1);assert.equal(s.battle.enemy.hp,enemies.guardian.hp);assert.equal(s.battle.turn,0);
s=newRun('kael');beginBattle(s,'training');s.player.hp=20;let before=s.player.items;act(s,'item');assert.equal(s.player.items,before-1);assert.ok(s.player.hp>20);
// Every champion can defeat the boss from full health without consumables, using their tactical tools.
for (const [id,c] of Object.entries(characters)) {
 const run=newRun(id);run.player.items=0;beginBattle(run,'guardian');
 for(let i=0;!run.battle.over&&i<60;i++){
  const tactical=id==='kael'?c.abilities[0]:c.abilities[1];
  if(run.battle.turn%3===0)act(run,'guard');
  else if(run.player.energy>=tactical.cost)act(run,'ability',tactical);
  else act(run,'attack');
 }
 assert.ok(run.player.hp>0&&run.battle.enemy.hp===0,`${id} can win without items`);
}
// New roster: telegraphed patterns, route gating, friendly shield and interruption.
assert.deepEqual(routes.fractured,['hound','boar','sentinel']);assert.deepEqual(routes.mirage,['stalker','marauder']);
assert.equal(enemies.anomaly,undefined);assert.equal(enemies.wisp,undefined);
for(const companion of Object.values(companions))assert.ok(existsSync(companion.image));
s=newRun('kael');s.flags.temporalAid=true;beginBattle(s,'hound');assert.equal(s.battle.barrier,8);assert.equal(s.flags.temporalAid,false);act(s,'attack');assert.equal(s.player.hp,104);retry(s);assert.equal(s.battle.barrier,8);
s=newRun('kael');beginBattle(s,'boar');act(s,'attack');assert.equal(s.player.hp,110);assert.match(intent(s.battle),/halved/);const beforeBoar=s.battle.enemy.hp;act(s,'attack');assert.equal(beforeBoar-s.battle.enemy.hp,7);assert.equal(s.player.hp,92);
s=newRun('kael');beginBattle(s,'sentinel');act(s,'attack');const beforeSentinel=s.battle.enemy.hp;act(s,'attack');assert.equal(beforeSentinel-s.battle.enemy.hp,7);assert.equal(s.player.hp,95);assert.match(s.battle.log.join(' '),/sentinel counters/);
s=newRun('kael');beginBattle(s,'stalker');act(s,'attack');const beforeStalker=s.battle.enemy.hp;act(s,'attack');assert.equal(beforeStalker-s.battle.enemy.hp,7);assert.match(s.battle.log.join(' '),/reduces/);
s=newRun('kael');beginBattle(s,'marauder');act(s,'attack');assert.match(intent(s.battle),/heavy blow/);const beforeMarauder=s.player.hp;act(s,'guard');assert.equal(beforeMarauder-s.player.hp,8);
s=newRun('kael');beginBattle(s,'boar');act(s,'ability',characters.kael.abilities[0]);assert.equal(s.battle.stance,false);assert.match(intent(s.battle),/interrupted/);
s=newRun('kael');for(const key of routes.fractured){beginBattle(s,key);s.battle.enemy.hp=0;resolveVictory(s);}assert.equal(s.flags.fractured,true);assert.equal(isReady(s),false);
// Inventory and local asset references.
assert.equal(Object.keys(npcs).length,12);for(const n of Object.values(npcs)){assert.ok(existsSync(`images/${n.image}.png`));assert.ok(existsSync(`images/portraits/${n.image}.webp`));}
for(const enemy of Object.values(enemies)){assert.ok(enemy.description && enemy.alt && enemy.image);assert.ok(existsSync(enemy.image));assert.doesNotMatch(enemy.image,/^https?:/);}
for(const f of ['images/verge-landscape.jpg','images/void-guardian.jpg','styles/game.css','scripts/app.js'])assert.ok(existsSync(f));
const html=readFileSync('index.html','utf8');assert.doesNotMatch(html,/https?:\/\//);for(const file of ['scripts/app.js','scripts/audio.js','scripts/state.js'])assert.doesNotMatch(readFileSync(file,'utf8'),/localStorage|indexedDB|https?:\/\//i);
console.log('All combat, progression, quest, roster and local-asset checks passed.');
