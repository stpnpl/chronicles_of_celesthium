export const characters = {
 kael:{name:'Kael Vortex', title:'Temporal Drift', realm:'Virelai · Planet ABC', image:'Kael_Vortex', hp:110, energy:60, attack:13, style:'Control & precision', description:'A soldier out of time, fighting to anchor a fractured present. His regulator can interrupt an enemy’s rhythm.', abilities:[
  {id:'stasis',name:'Stasis Pulse',cost:15,description:'Deal damage and delay the next enemy attack.'},
  {id:'anchor',name:'Chrono Anchor',cost:20,description:'Deal damage and gain a protective barrier.'},
  {id:'rewind',name:'Rewind Cascade',cost:35,description:'Strike hard and restore some stability.'}]},
 nyra:{name:'Nyra Khaine',title:'Redemption Blade',realm:'Draelmoor · Planet ABC',image:'Nyra_Khaine',hp:120,energy:55,attack:12,style:'Risk & retaliation',description:'A rogue assassin seeking atonement, bound to Vorpalis. She turns an enemy’s aggression against them.',abilities:[
  {id:'riposte',name:'Soulrend Riposte',cost:15,description:'Brace for the next attack and counter it.'},
  {id:'slash',name:'Vindicating Slash',cost:20,description:'Strike and recover stability.'},
  {id:'cursed',name:'Cursed Redemption',cost:30,description:'A devastating strike; Vorpalis takes a toll on your stability.'}]},
 shoryu:{name:'Shoryu Hayabusa',title:'Elemental Ascension',realm:'Hayabusa Clan · Planet XYZ',image:'Shoryu_Hayabusa',hp:105,energy:65,attack:13,style:'Elemental momentum',description:'The Master of Storms and head of the Hayabusa Clan. His elemental techniques reward a measured offense.',abilities:[
  {id:'veil',name:'Thunder Veil',cost:15,description:'Raise a barrier and charge your next strike.'},
  {id:'frost',name:'Froststep',cost:20,description:'Strike and weaken the enemy’s next attack.'},
  {id:'primal',name:'Primal Convergence',cost:35,description:'Unleash a powerful elemental attack, amplified by Thunder Veil.'}]}
};
export const portrait = id => `images/portraits/${id}.webp`;
