import {enemies} from './data/world.js';
export function beginBattle(state,key){state.checkpoint=structuredClone({player:state.player,flags:state.flags});state.battle={key,enemy:{...enemies[key],maxHp:enemies[key].hp},turn:0,guard:false,barrier:0,counter:false,charged:false,weak:false,delay:false,log:[enemies[key].intro],over:false};}
export function intent(b){if(b.enemy.kind==='boss'){return b.turn%3===0?'The Guardian gathers a crushing Rift Break. Guard or interrupt it.':b.turn%3===1?'The Guardian is exposed after its surge.':'The Guardian prepares a measured strike.';}return b.turn%2===0?'Enemy prepares to strike.':'Enemy gathers a heavier strike.';}
export function act(state,action,ability){const b=state.battle,p=state.player;if(!b||b.over)return false; let damage=0;
 if(action==='ability' && p.energy<ability.cost){b.log.push('Not enough energy. Guard to recover energy.');return false;}
 if(action==='item' && (p.items<1 || p.hp===p.maxHp)){b.log.push(p.items<1?'No restoratives remain.':'Stability is already full.');return false;}
 if(action==='attack'){damage=p.attack+(b.charged?8:0);b.charged=false;b.log.push(`Attack deals ${damage} damage.`);}
 if(action==='guard'){b.guard=true;p.energy=Math.min(p.maxEnergy,p.energy+15);b.log.push('Guard raised. Restored 15 energy.');}
 if(action==='item'){p.items--;let h=Math.min(45,p.maxHp-p.hp);p.hp+=h;b.log.push(`Restorative recovers ${h} stability.`);}
 if(action==='ability'){p.energy-=ability.cost;switch(ability.id){
 case 'stasis':damage=15;b.delay=true;break; case 'anchor':damage=19;b.barrier=10;break;case 'rewind':damage=34;p.hp=Math.min(p.maxHp,p.hp+18);break;
 case 'riposte':b.counter=true;break;case 'slash':damage=18;p.hp=Math.min(p.maxHp,p.hp+16);break;case 'cursed':damage=43;p.hp=Math.max(1,p.hp-10);break;
 case 'veil':b.barrier=14;b.charged=true;break;case 'frost':damage=19;b.weak=true;break;case 'primal':damage=36+(b.charged?12:0);b.charged=false;break;
 }b.log.push(`${ability.name}${damage?` deals ${damage} damage`: ' is ready'}.`);}
 if(damage && b.enemy.kind==='boss' && b.turn%3===1){damage+=8;b.log.push('Exposed! +8 damage.');}
 b.enemy.hp=Math.max(0,b.enemy.hp-damage);if(!b.enemy.hp){b.over=true;b.log.push(`${b.enemy.name} is defeated!`);return true;}
 if(b.delay){b.delay=false;b.log.push('Stasis delays the enemy.');b.turn++;return true;}
 let enemyDamage=b.enemy.attack+(b.enemy.kind==='boss'&&b.turn%3===0?12:b.enemy.kind!=='boss'&&b.turn%2===1?4:0);
 if(b.weak){enemyDamage=Math.max(1,enemyDamage-7);b.weak=false;b.log.push('Frost weakens the attack.');}
 if(b.guard){enemyDamage=Math.ceil(enemyDamage/2);b.guard=false;}
 if(b.barrier){let blocked=Math.min(b.barrier,enemyDamage);enemyDamage-=blocked;b.barrier=0;b.log.push(`Barrier absorbs ${blocked} damage.`);}
 p.hp=Math.max(0,p.hp-enemyDamage);b.log.push(`${b.enemy.name} hits for ${enemyDamage} stability.`);
 if(b.counter&&p.hp>0){b.counter=false;b.enemy.hp=Math.max(0,b.enemy.hp-24);b.log.push('Soulrend Riposte counters for 24 damage.');}
 b.turn++;if(!p.hp){b.over=true;b.log.push('Your stability is depleted.');}else if(!b.enemy.hp){b.over=true;b.log.push(`${b.enemy.name} is defeated!`);}return true;
}
export function retry(state){state.player=structuredClone(state.checkpoint.player);state.flags=structuredClone(state.checkpoint.flags);beginBattle(state,state.battle.key);}
export function resolveVictory(state){let key=state.battle.key;if(key==='training')state.flags.training=true;if(key==='anomaly')state.flags.fractured=true;if(key==='wisp')state.flags.mirage=true;if(key==='guardian')state.flags.boss=true;state.player.hp=Math.min(state.player.maxHp,state.player.hp+20);state.player.energy=Math.min(state.player.maxEnergy,state.player.energy+20);state.battle=null;}
