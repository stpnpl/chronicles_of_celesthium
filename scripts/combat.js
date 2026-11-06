import {enemies,routes} from './data/world.js';
export function beginBattle(state,key){
 const enemy=enemies[key];if(!enemy)throw new Error(`Unknown encounter: ${key}`);
 state.checkpoint=structuredClone({player:state.player,flags:state.flags});
 const aid=state.flags.temporalAid && routes.fractured.includes(key);
 state.battle={key,enemy:{...enemy,maxHp:enemy.hp},turn:0,guard:false,barrier:aid?8:0,counter:false,charged:false,weak:false,delay:false,stance:false,log:[enemy.intro,...(aid?['The temporal companion lends an 8-point barrier.']:[])],over:false};
 if(aid)state.flags.temporalAid=false;
}
export function intent(b){
 const t=b.turn,k=b.enemy.kind;
 if(k==='boss')return t%3===0?'The Guardian gathers a crushing Rift Break. Guard or interrupt it.':t%3===1?'The Guardian is exposed after its surge.':'The Guardian prepares a measured strike.';
 if(k==='hound')return t%2===0?'The hound prepares a swift double strike.':'The hound circles for a single strike.';
 if(k==='boar')return t%3===0?'The boar braces its crystal hide; a heavy charge follows.':t%3===1?(b.stance?'The boar is braced: your damage is halved. Guard against its charge.':'The interrupted boar prepares a normal attack.'):'The boar prepares a normal attack.';
 if(k==='sentinel')return t%3===0?'The sentinel raises its shield; a guarded counter follows.':t%3===1?(b.stance?'The sentinel is guarding. Strikes are halved and met with a counter.':'The interrupted sentinel prepares a normal attack.'):'The sentinel prepares a normal attack.';
 if(k==='stalker')return t%3===0?'The stalker gathers a shimmering veil.':'The stalker prepares to strike.'+(t%3===1&&b.stance?' Its veil halves incoming damage.':'');
 if(k==='marauder')return t%2===0?'The marauder tests your guard. A heavy blow follows.':'The marauder winds up a heavy blow. Guard now.';
 return t%2===0?'Enemy prepares to strike.':'Enemy gathers a heavier strike.';
}
export function act(state,action,ability){const b=state.battle,p=state.player;if(!b||b.over)return false;let damage=0;
 if(action==='ability' && p.energy<ability.cost){b.log.push('Not enough energy. Guard to recover energy.');return false;}
 if(action==='item' && (p.items<1 || p.hp===p.maxHp)){b.log.push(p.items<1?'No restoratives remain.':'Stability is already full.');return false;}
 if(action==='attack'){damage=p.attack+(b.charged?8:0);b.charged=false;b.log.push(`Attack deals ${damage} damage.`);}
 if(action==='guard'){b.guard=true;p.energy=Math.min(p.maxEnergy,p.energy+15);b.log.push('Guard raised. Restored up to 15 energy.');}
 if(action==='item'){p.items--;let h=Math.min(45,p.maxHp-p.hp);p.hp+=h;b.log.push(`Restorative recovers ${h} stability.`);}
 if(action==='ability'){p.energy-=ability.cost;switch(ability.id){
 case 'stasis':damage=15;b.delay=true;break;case 'anchor':damage=19;b.barrier=10;break;case 'rewind':damage=34;p.hp=Math.min(p.maxHp,p.hp+18);break;
 case 'riposte':b.counter=true;break;case 'slash':damage=18;p.hp=Math.min(p.maxHp,p.hp+16);break;case 'cursed':damage=43;p.hp=Math.max(1,p.hp-10);break;
 case 'veil':b.barrier=14;b.charged=true;break;case 'frost':damage=19;b.weak=true;break;case 'primal':damage=36+(b.charged?12:0);b.charged=false;break;
 }b.log.push(`${ability.name}${damage?` deals ${damage} damage`: ' is ready'}.`);}
 const k=b.enemy.kind,t=b.turn;
 if(damage&&k==='boss'&&t%3===1){damage+=8;b.log.push('Exposed! +8 damage.');}
 if(damage&&['boar','sentinel','stalker'].includes(k)&&t%3===1&&b.stance){damage=Math.ceil(damage/2);b.log.push(`${b.enemy.name} reduces the strike to ${damage} damage.`);}
 b.enemy.hp=Math.max(0,b.enemy.hp-damage);if(!b.enemy.hp){b.over=true;b.log.push(`${b.enemy.name} is defeated!`);return true;}
 if(b.delay){b.delay=false;b.log.push('Stasis delays the enemy.');b.turn++;return true;}
 if(k==='sentinel'&&t%3===1&&b.stance&&damage){p.hp=Math.max(0,p.hp-6);b.log.push('The sentinel counters for 6 stability.');if(!p.hp){b.over=true;b.log.push('Your stability is depleted.');return true;}}
 if((k==='boar'||k==='sentinel')&&t%3===0){b.stance=true;b.log.push(`${b.enemy.name} braces instead of attacking.`);b.turn++;return true;}
 let enemyDamage=b.enemy.attack;
 if(k==='boss'&&t%3===0)enemyDamage+=12;
 else if(k==='hound'&&t%2===0)enemyDamage+=5;
 else if(k==='boar'&&t%3===1&&b.stance)enemyDamage+=9;
 else if(k==='marauder'&&t%2===1)enemyDamage+=6;
 else if(k==='training'&&t%2===1)enemyDamage+=4;
 if(b.weak){enemyDamage=Math.max(1,enemyDamage-7);b.weak=false;b.log.push('Frost weakens the attack.');}
 if(b.guard){enemyDamage=Math.ceil(enemyDamage/2);b.guard=false;}
 if(b.barrier){let blocked=Math.min(b.barrier,enemyDamage);enemyDamage-=blocked;b.barrier=0;b.log.push(`Barrier absorbs ${blocked} damage.`);}
 if(k==='stalker'&&t%3===0)b.stance=true;else if(t%3===1)b.stance=false;
 p.hp=Math.max(0,p.hp-enemyDamage);b.log.push(k==='hound'&&t%2===0?`${b.enemy.name} lands a swift double strike for ${enemyDamage} stability.`:`${b.enemy.name} hits for ${enemyDamage} stability.`);
 if(b.counter&&p.hp>0){b.counter=false;b.enemy.hp=Math.max(0,b.enemy.hp-24);b.log.push('Soulrend Riposte counters for 24 damage.');}
 b.turn++;if(!p.hp){b.over=true;b.log.push('Your stability is depleted.');}else if(!b.enemy.hp){b.over=true;b.log.push(`${b.enemy.name} is defeated!`);}return true;
}
export function retry(state){state.player=structuredClone(state.checkpoint.player);state.flags=structuredClone(state.checkpoint.flags);beginBattle(state,state.battle.key);}
export function resolveVictory(state){let key=state.battle.key;if(key==='training')state.flags.training=true;if(key==='guardian')state.flags.boss=true;
 for(const [route,keys] of Object.entries(routes)){if(keys.includes(key)){state.flags[`defeated_${key}`]=true;state.flags[route]=keys.every(k=>state.flags[`defeated_${k}`]);}}
 state.player.hp=Math.min(state.player.maxHp,state.player.hp+20);state.player.energy=Math.min(state.player.maxEnergy,state.player.energy+20);state.battle=null;}
