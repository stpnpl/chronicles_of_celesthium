export function questAction(s,npc){
 if(npc==='echo' && s.flags.shard && !s.flags.containment){s.flags.containment=true;s.player.items++;return 'Together, Echo tunes the shard to Korr’s dampeners. The violent tremor subsides. Echo gives you a restorative for the road.';}
 if(npc==='echo' && s.flags.containment)return 'The dampeners are holding. Korr can breathe easier—and so can I.';
 if(npc==='echo'){s.flags.questStarted=true;return 'OPTIONAL QUEST: Find a resonance shard at the relay in the Fractured Approach, then return to Echo.';}
 if(npc==='korr' && s.flags.containment)return 'The noise in my thoughts has quieted. Thank you for seeing a person inside the armor.';
 return '';
}
