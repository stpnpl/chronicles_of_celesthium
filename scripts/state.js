import {characters} from './data/characters.js';
export function newRun(id){const c=characters[id];return {champion:id,player:{hp:c.hp,maxHp:c.hp,energy:c.energy,maxEnergy:c.energy,attack:c.attack,items:2},location:'refuge',flags:{},completed:[],log:[],battle:null,checkpoint:null};}
export const isReady = s => !!(s.flags.fractured && s.flags.mirage);
export function objective(s){if(!s.flags.training)return 'Speak with Riko and complete the training encounter.'; if(!isReady(s))return `Secure both approaches: ${s.flags.fractured?'✓':'○'} Fractured · ${s.flags.mirage?'✓':'○'} Mirage`;if(!s.flags.boss)return 'Meet Yorikai at the threshold and confront the Guardian.';return 'The local passage is safe.';}
