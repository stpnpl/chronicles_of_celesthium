// Chronicles of Celesthium - Core Game Engine
// Modular Architecture for Scalable Development

// === MODULE: Game State Management ===
class GameStateManager {
    constructor() {
        this.gameState = 'loading';
        this.player = null;
        this.currentEnemy = null;
        this.enemyQueue = [];
        this.isPlayerTurn = true;
        this.selectedCharacter = null;
    }

    setState(newState) {
        this.gameState = newState;
        console.log(`Game state changed to: ${newState}`);
    }
}

// === MODULE: Character & Enemy Data ===
class DataManager {
    static getCharacters() {
        return {
            kael: {
                name: 'Kael Vortex',
                img: 'images/Kael_Vortex.png',
                background: 'Elite Super-Soldier of Virelai',
                affinity: 'Temporal Regulator',
                realm: 'Virelai (Planet ABC, 3225)',
                temporalStability: 100,
                combatReadiness: 10,
                avatar: '⚡',
                abilities: [
                    { 
                        name: 'Time Strike', 
                        damageMultiplier: 1.5, 
                        description: 'A precise strike that warps temporal flow, dealing 150% damage to unstable entities.', 
                        cost: 0,
                        lore: 'Kael\'s temporal regulator allows him to strike at the perfect moment in an opponent\'s timeline.'
                    },
                    { 
                        name: 'Stasis Pulse', 
                        damageMultiplier: 1.2, 
                        description: 'Emits a temporal wave that slows enemy movement and deals 120% damage.', 
                        cost: 15,
                        lore: 'A defensive technique that creates localized time dilation fields.'
                    },
                    { 
                        name: 'Chrono Anchor', 
                        damageMultiplier: 2.0, 
                        description: 'Unleashes concentrated temporal energy for massive damage to reality anomalies.', 
                        cost: 25,
                        lore: 'Kael\'s signature ability - anchors enemies in unstable time loops.'
                    }
                ],
                storyPath: 'kael_path'
            },
            nyra: {
                name: 'Nyra Khaine',
                img: 'images/Nyra_Khaine.png',
                background: 'Rogue Assassin of Draelmoor',
                affinity: 'Redemption Blade',
                realm: 'Draelmoor (Planet ABC, 3225)',
                temporalStability: 120,
                combatReadiness: 8,
                avatar: '🗡️',
                abilities: [
                    { 
                        name: 'Blade of Judgment', 
                        damageMultiplier: 1.8, 
                        description: 'A precise slash with Vorpalis that deals 180% damage and silences enemy abilities.', 
                        cost: 0,
                        lore: 'Vorpalis, the sentient blade, hungers for justice against those who break oaths.'
                    },
                    { 
                        name: 'Vindicating Slash', 
                        damageMultiplier: 1.4, 
                        description: 'A swift cut that restores Nyra\'s resolve, dealing 140% damage and healing 10% HP.', 
                        cost: 10,
                        lore: 'Each strike against evil purifies Nyra\'s soul and strengthens her bond with Vorpalis.'
                    },
                    { 
                        name: 'Soulrend Riposte', 
                        damageMultiplier: 2.2, 
                        description: 'Channels Vorpalis\'s full power for devastating damage to corrupted entities.', 
                        cost: 30,
                        lore: 'The blade\'s ancient spirit guides Nyra\'s hand in moments of true need.'
                    }
                ],
                storyPath: 'nyra_path'
            }
        };
    }

    static getEnemies(characterPath) {
        if (characterPath === 'kael_path') {
            return {
                temporal_anomaly: { 
                    name: 'Temporal Anomaly', 
                    hp: 35, 
                    attack: 6, 
                    exp: 100, 
                    sprite: '🌀',
                    lore: 'A unstable rift in time, drawn to Kael\'s temporal signature.'
                },
                chronophage: { 
                    name: 'Chronophage', 
                    hp: 45, 
                    attack: 8, 
                    exp: 150, 
                    sprite: '⏳',
                    lore: 'A creature that feeds on temporal energy, weakening reality around it.'
                },
                void_rift_guardian: { 
                    name: 'Void Rift Guardian', 
                    hp: 60, 
                    attack: 10, 
                    exp: 200, 
                    sprite: '⚔️',
                    lore: 'A corrupted soldier from a collapsed timeline, guarding the rift.'
                },
                void_titan: { 
                    name: 'Void Titan', 
                    hp: 100, 
                    attack: 15, 
                    exp: 300, 
                    sprite: '👹',
                    lore: 'A massive entity formed from the convergence of multiple temporal fractures.'
                }
            };
        } else if (characterPath === 'nyra_path') {
            return {
                shadow_assassin: { 
                    name: 'Shadow Assassin', 
                    hp: 30, 
                    attack: 7, 
                    exp: 100, 
                    sprite: '👤',
                    lore: 'A fellow assassin corrupted by the Void, once Nyra\'s brother-in-arms.'
                },
                blood_cultist: { 
                    name: 'Blood Cultist', 
                    hp: 40, 
                    attack: 9, 
                    exp: 120, 
                    sprite: '🩸',
                    lore: 'A worshipper of the Void, seeking to corrupt Draelmoor\'s ancient traditions.'
                },
                corrupted_champion: { 
                    name: 'Corrupted Champion', 
                    hp: 55, 
                    attack: 11, 
                    exp: 180, 
                    sprite: '🛡️',
                    lore: 'A once-honorable warrior of Draelmoor, now twisted by Void energy.'
                },
                void_broodmother: { 
                    name: 'Void Broodmother', 
                    hp: 90, 
                    attack: 14, 
                    exp: 250, 
                    sprite: '🕷️',
                    lore: 'An ancient entity that births shadow creatures, dwelling in Draelmoor\'s frozen wastes.'
                }
            };
        }
        return {};
    }

    static getStoryNodes(characterPath) {
        if (characterPath === 'kael_path') {
            return {
                start: {
                    text: `The temporal regulator hums with unstable energy as you regain consciousness. "Welcome back, Lieutenant Vortex," says the holographic interface. "Virelai is under attack. Temporal fractures are appearing across the city. You must stabilize them before reality unravels."`,
                    choices: [
                        { text: "Check current status.", destination: 'kael_status_check' },
                        { text: "Deploy to the nearest fracture.", destination: 'kael_first_combat' }
                    ]
                },
                kael_status_check: {
                    text: `"Temporal stability at 87%. Combat readiness optimal," the AI reports. Kael Vortex was once the pinnacle of Virelai's military might, but the Cataclysm of Year 0 changed everything. Now, armed with a prototype temporal regulator, he fights to prevent the same fate from consuming other timelines. His very existence is a paradox - a soldier out of time.`,
                    choices: [
                        { text: "Deploy to the nearest fracture.", destination: 'kael_first_combat' }
                    ]
                },
                kael_first_combat: {
                    text: `The temporal rift shimmers violently before you. Through the distortion, you can see fragmented glimpses of Virelai's past and future. Time itself is bleeding through the fracture. "Reality integrity failing," warns your regulator. "Enemies detected: Temporal Anomalies."`,
                    choices: [
                        { text: "Engage the anomalies.", action: () => CombatSystem.startCombatSequence('kael_path', ['temporal_anomaly', 'temporal_anomaly']) }
                    ]
                },
                kael_victory_1: {
                    text: `The temporal anomalies dissipate as the rift stabilizes. Your regulator displays: "Temporal integrity restored to sector 7-G." But another alert flashes urgently: "Multiple fractures detected near Central Command. High-priority threat: Chronophage entities detected."`,
                    choices: [
                        { text: "Proceed to Central Command.", destination: 'kael_central_command' }
                    ]
                },
                kael_central_command: {
                    text: `Central Command is in chaos. Temporal energy crackles through the air, and soldiers phase in and out of existence. A massive Chronophage feeds on the temporal instability, growing stronger with each passing second. "Lieutenant Vortex! We need you to take it down before it consumes the entire base!" shouts Commander Rael over the comms.`,
                    choices: [
                        { text: "Engage the Chronophage.", action: () => CombatSystem.startCombatSequence('kael_path', ['chronophage', 'temporal_anomaly']) }
                    ]
                },
                kael_victory_2: {
                    text: `The Chronophage collapses into temporal dust. Central Command is secure, but the victory is short-lived. A massive rift tears open in the sky above Virelai, and through it emerges a Void Rift Guardian - a corrupted soldier from a timeline that no longer exists. "This is just the beginning, Lieutenant," the AI warns. "The Unmaker's influence grows stronger."`,
                    choices: [
                        { text: "Face the Void Rift Guardian.", action: () => CombatSystem.startCombatSequence('kael_path', ['void_rift_guardian']) }
                    ]
                },
                kael_victory_3: {
                    text: `The Void Rift Guardian falls, its corrupted armor scattering across the command center. The rift begins to close, but not before you glimpse something massive moving in the void beyond. "Warning: Temporal signatures indicate a Void Titan approaching Virelai's core timeline," the AI reports. "This is an extinction-level threat. All remaining forces are being deployed."`,
                    choices: [
                        { text: "Prepare for the final battle.", action: () => CombatSystem.startCombatSequence('kael_path', ['void_titan']) }
                    ]
                },
                kael_ending: {
                    text: `The Void Titan dissolves into temporal static as the rift seals completely. Virelai is saved, but at a cost. Your temporal regulator shows critical damage - you can feel time itself unraveling around you. "Mission accomplished," you whisper as your form begins to phase. But in the Celesthiumverse, heroes are never truly gone. Your sacrifice has bought time for others to continue the fight against the Unmaker. The chronicles of Kael Vortex will echo through the timelines forever.`,
                    choices: [
                        { text: "Return to Character Select", action: () => location.reload() }
                    ]
                },
                game_over: {
                    text: `Your temporal regulator overloads in a burst of energy. As reality fractures around you, you see glimpses of countless timelines collapsing. The Void consumes Virelai, and with it, the last bastion of temporal order in this sector. But even in defeat, your sacrifice is not forgotten. In another timeline, another version of you prepares to face the same threat, armed with the knowledge of your failure.`,
                    choices: [
                        { text: "Try Again", action: () => location.reload() }
                    ]
                }
            };
        } else if (characterPath === 'nyra_path') {
            return {
                start: {
                    text: `The frozen winds of Draelmoor howl as you stand atop the Bloodspire cliffs. Vorpalis, the sentient blade bound to your soul, hums with anticipation. "They have come," the blade whispers in your mind. "The Void cultists attack the Northern Stronghold. Innocents will die if you do not act." Nyra Khaine was once Draelmoor's most feared assassin, but the blood on her hands led her to seek redemption. Now, Vorpalis guides her path - a path of atonement through protecting the innocent.`,
                    choices: [
                        { text: "Assess the situation.", destination: 'nyra_assessment' },
                        { text: "Rush to the Stronghold.", destination: 'nyra_first_combat' }
                    ]
                },
                nyra_assessment: {
                    text: `"The cultists serve the Unmaker," Vorpalis whispers. "They seek to corrupt Draelmoor's ancient blood rituals for their own dark purposes. Your past sins can be washed away in this battle, Nyra. But beware - the blade hungers, and with each kill, it tests your resolve." You feel the familiar pull of Vorpalis's bloodthirst, but also the warmth of hope. Perhaps today, you can be the hero Draelmoor needs, not the assassin it fears.`,
                    choices: [
                        { text: "Rush to the Stronghold.", destination: 'nyra_first_combat' }
                    ]
                },
                nyra_first_combat: {
                    text: `The Northern Stronghold is under siege. Shadow Assassins - once your allies in the killing arts - now serve the Void, their eyes black with corruption. Vorpalis pulses in your hand. "These were our brothers and sisters," the blade murmurs. "End their suffering. Purge the corruption." The stronghold's defenders are being overwhelmed. You must act now.`,
                    choices: [
                        { text: "Engage the Shadow Assassins.", action: () => CombatSystem.startCombatSequence('nyra_path', ['shadow_assassin', 'shadow_assassin']) }
                    ]
                },
                nyra_victory_1: {
                    text: `The Shadow Assassins fall, their corrupted forms dissolving into shadow. The stronghold defenders cheer, but their celebration is cut short as blood-red energy erupts from the ritual chamber. "Blood Cultists!" shouts a guard. "They're performing a dark ritual in the sacred hall!" Vorpalis thrums with righteous anger. "The corruption runs deep. We must cleanse it at its source."`,
                    choices: [
                        { text: "Enter the ritual chamber.", destination: 'nyra_ritual_chamber' }
                    ]
                },
                nyra_ritual_chamber: {
                    text: `The ritual chamber is a nightmare of blood and shadow. Blood Cultists chant in a language that hurts your mind, while at the center stands a Corrupted Champion - once Draelmoor's greatest warrior, now twisted into a monstrous guardian. "Nyra Khaine," the corrupted champion rumbles. "Join us. The Void offers power beyond your wildest dreams. No more redemption - only dominion." Vorpalis burns in your hand. "This is not the path of honor. This is the path of monsters."`,
                    choices: [
                        { text: "Face the Corrupted Champion and cultists.", action: () => CombatSystem.startCombatSequence('nyra_path', ['corrupted_champion', 'blood_cultist']) }
                    ]
                },
                nyra_victory_2: {
                    text: `The Corrupted Champion collapses, the dark energy leaving its body as it returns to its true form - a respected elder of Draelmoor. "Thank you," he whispers with his last breath. "The Void's influence... it was too strong..." The ritual is broken, but Vorpalis warns of greater danger. "The source of this corruption lies deeper. In the Frozen Wastes, a Void Broodmother births these shadow creatures. It must be destroyed before Draelmoor falls completely."`,
                    choices: [
                        { text: "Journey to the Frozen Wastes.", destination: 'nyra_frozen_wastes' }
                    ]
                },
                nyra_frozen_wastes: {
                    text: `The Frozen Wastes live up to their name. Ice and shadow stretch endlessly, and the air itself seems to bleed darkness. Before you looms a massive cavern, from which pulses the stench of corruption. Vorpalis glows brighter. "The Broodmother senses us. It knows what we are. It fears what we carry." The blade's hunger grows stronger, but so does your resolve. "This ends here," you say. "For Draelmoor. For redemption."`,
                    choices: [
                        { text: "Enter the cavern and face the Broodmother.", action: () => CombatSystem.startCombatSequence('nyra_path', ['void_broodmother']) }
                    ]
                },
                nyra_ending: {
                    text: `The Void Broodmother's death scream echoes through the cavern as its form collapses into shadow and ice. The corruption begins to lift from the Wastes, and for the first time in years, the sun breaks through the clouds. Vorpalis goes silent, its bloodthirst finally sated. "You have done well, Nyra Khaine," the blade whispers. "The path to redemption is long, but today, you have saved Draelmoor." As you stand in the cleansing sunlight, you feel the weight of your past sins lift slightly. The blade is still bound to you, but today, it feels less like a curse and more like a purpose. Your journey continues, but Draelmoor is safe. For now.`,
                    choices: [
                        { text: "Return to Character Select", action: () => location.reload() }
                    ]
                },
                game_over: {
                    text: `Vorpalis's hunger overwhelms you. The blade takes control, and you slaughter not just the cultists, but the stronghold defenders as well. The Void's corruption spreads through you, and Draelmoor falls to darkness. Vorpalis whispers in triumph as you become exactly what you feared most - a monster. But even in this timeline, hope remains. In another reality, another Nyra Khaine makes a different choice. The cycle of redemption continues.`,
                    choices: [
                        { text: "Try Again", action: () => location.reload() }
                    ]
                }
            };
        }
        return {};
    }
}

// === MODULE: Combat System ===
class CombatSystem {
    static startCombatSequence(characterPath, enemyKeys) {
        const gameState = window.gameState;
        gameState.enemyQueue = enemyKeys.map(key => ({...DataManager.getEnemies(characterPath)[key], maxHp: DataManager.getEnemies(characterPath)[key].hp}));
        gameState.setState('combat');
        
        document.getElementById('story-screen').classList.add('hidden');
        document.getElementById('combat-screen').classList.remove('hidden');
        document.getElementById('window-title').textContent = "Temporal Combat";
        
        document.getElementById('combat-log').innerHTML = '';
        CombatSystem.logToCombat(`Combat initiated! Prepare for battle.`, 'system');
        
        CombatSystem.loadNextEnemy();
    }

    static loadNextEnemy() {
        const gameState = window.gameState;
        if (gameState.enemyQueue.length === 0) {
            CombatSystem.handleVictory();
            return;
        }

        gameState.currentEnemy = gameState.enemyQueue.shift();
        document.getElementById('enemy-sprite').textContent = gameState.currentEnemy.sprite;
        document.getElementById('enemy-name').textContent = gameState.currentEnemy.name;
        
        const enemyHpBar = document.getElementById('enemy-hp-bar');
        enemyHpBar.max = gameState.currentEnemy.maxHp;
        enemyHpBar.value = gameState.currentEnemy.hp;
        
        CombatSystem.updateEnemyHpText();
        CombatSystem.logToCombat(`A ${gameState.currentEnemy.name} appears! ${gameState.currentEnemy.lore}`, 'enemy');
        CombatSystem.setupPlayerActions();
        
        gameState.isPlayerTurn = true;
    }

    static setupPlayerActions() {
        const gameState = window.gameState;
        const playerActions = document.getElementById('player-actions');
        playerActions.innerHTML = '';

        gameState.player.abilities.forEach((ability, index) => {
            const button = document.createElement('button');
            button.className = 'nes-btn is-success action-button';
            button.innerHTML = `
                <div style="font-size: 0.8rem;">
                    <div>${ability.name}</div>
                    <div style="font-size: 0.6rem; color: #f7d51d;">Cost: ${ability.cost} Energy</div>
                </div>
            `;
            button.addEventListener('click', () => CombatSystem.playerTurn(ability));
            playerActions.appendChild(button);
        });
    }

    static playerTurn(ability) {
        const gameState = window.gameState;
        
        if (!gameState.isPlayerTurn || gameState.player.temporalEnergy < ability.cost) {
            if (gameState.player.temporalEnergy < ability.cost) {
                CombatSystem.logToCombat('Insufficient temporal energy!', 'system');
            }
            return;
        }

        gameState.isPlayerTurn = false;
        gameState.player.temporalEnergy -= ability.cost;

        const damage = Math.floor(gameState.player.combatReadiness * ability.damageMultiplier);
        gameState.currentEnemy.hp = Math.max(0, gameState.currentEnemy.hp - damage);
        
        CombatSystem.logToCombat(`${gameState.player.name} uses ${ability.name}! ${ability.lore} Deals ${damage} damage.`, 'player');
        
        const gameWindow = document.getElementById('game-window');
        gameWindow.classList.add('screen-shake');
        setTimeout(() => gameWindow.classList.remove('screen-shake'), 500);
        
        document.getElementById('enemy-hp-bar').value = gameState.currentEnemy.hp;
        CombatSystem.updateEnemyHpText();
        UISystem.updatePlayerStatsUI();
        
        if (gameState.currentEnemy.hp <= 0) {
            CombatSystem.handleEnemyDefeat();
        } else {
            setTimeout(() => CombatSystem.enemyTurn(), 1000);
        }
    }

    static enemyTurn() {
        const gameState = window.gameState;
        
        const damage = Math.floor(gameState.currentEnemy.attack * (0.8 + Math.random() * 0.4));
        gameState.player.temporalStability = Math.max(0, gameState.player.temporalStability - damage);
        
        CombatSystem.logToCombat(`${gameState.currentEnemy.name} attacks! ${gameState.currentEnemy.lore} You take ${damage} temporal damage.`, 'enemy');
        UISystem.updatePlayerStatsUI();
        
        if (gameState.player.temporalStability <= 0) {
            CombatSystem.handleGameOver();
        } else {
            gameState.isPlayerTurn = true;
        }
    }

    static handleEnemyDefeat() {
        const gameState = window.gameState;
        CombatSystem.logToCombat(`${gameState.currentEnemy.name} has been defeated! The temporal anomaly stabilizes.`, 'system');
        
        const expGained = gameState.currentEnemy.exp;
        gameState.player.exp += expGained;
        CombatSystem.logToCombat(`Gained ${expGained} experience points!`, 'system');
        
        if (gameState.player.exp >= gameState.player.maxExp) {
            CombatSystem.levelUp();
        }
        
        // Small heal on enemy defeat
        const healAmount = Math.floor(gameState.player.maxTemporalStability * 0.1);
        gameState.player.temporalStability = Math.min(gameState.player.maxTemporalStability, gameState.player.temporalStability + healAmount);
        const energyRestore = Math.floor(gameState.player.maxTemporalEnergy * 0.15);
        gameState.player.temporalEnergy = Math.min(gameState.player.maxTemporalEnergy, gameState.player.temporalEnergy + energyRestore);
        
        CombatSystem.logToCombat(`Temporal stability restored! +${healAmount} stability, +${energyRestore} energy`, 'system');
        UISystem.updatePlayerStatsUI();
        
        setTimeout(() => CombatSystem.loadNextEnemy(), 2000);
    }

    static handleVictory() {
        const gameState = window.gameState;
        gameState.setState('victory');
        
        document.getElementById('combat-screen').classList.add('hidden');
        document.getElementById('story-screen').classList.remove('hidden');
        document.getElementById('window-title').textContent = "Victory!";
        
        const storyNode = gameState.player.characterPath === 'kael_path' ? 'kael_ending' : 'nyra_ending';
        StorySystem.showStoryNode(storyNode);
    }

    static handleGameOver() {
        const gameState = window.gameState;
        gameState.setState('game_over');
        
        document.getElementById('combat-screen').classList.add('hidden');
        document.getElementById('story-screen').classList.remove('hidden');
        document.getElementById('window-title').textContent = "Defeat...";
        
        StorySystem.showStoryNode('game_over');
    }

    static levelUp() {
        const gameState = window.gameState;
        gameState.player.level++;
        gameState.player.exp -= gameState.player.maxExp;
        gameState.player.maxExp = Math.floor(gameState.player.maxExp * 1.5);
        
        gameState.player.maxTemporalStability += 15;
        gameState.player.maxTemporalEnergy += 10;
        gameState.player.temporalStability = gameState.player.maxTemporalStability;
        gameState.player.temporalEnergy = gameState.player.maxTemporalEnergy;
        gameState.player.combatReadiness += 3;
        
        CombatSystem.logToCombat(`TEMPORAL SYNCHRONIZATION ACHIEVED! Rank increased to ${gameState.player.level}!`, 'system');
        CombatSystem.logToCombat('Temporal stability and combat readiness enhanced!', 'system');
    }

    static updateEnemyHpText() {
        const gameState = window.gameState;
        document.getElementById('enemy-hp-text').textContent = `${gameState.currentEnemy.hp}/${gameState.currentEnemy.maxHp} Integrity`;
    }

    static logToCombat(message, type = 'system') {
        const combatLog = document.getElementById('combat-log');
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry log-${type}`;
        const timestamp = new Date().toLocaleTimeString();
        logEntry.innerHTML = `[${timestamp}] ${message}`;
        combatLog.appendChild(logEntry);
        combatLog.scrollTop = combatLog.scrollHeight;
    }
}

// === MODULE: Story System ===
class StorySystem {
    static showStoryNode(nodeKey) {
        const gameState = window.gameState;
        const storyData = DataManager.getStoryNodes(gameState.player.characterPath);
        const storyNode = storyData[nodeKey];
        
        if (!storyNode) {
            console.error(`Story node not found: ${nodeKey}`);
            return;
        }

        let storyText = storyNode.text;
        if (gameState.player) {
            storyText = storyText
                .replace(/{playerName}/g, gameState.player.name || 'Champion')
                .replace(/{playerBackground}/g, gameState.player.background || 'Unknown')
                .replace(/{playerAffinity}/g, gameState.player.affinity || 'Unknown');
        }

        document.getElementById('text-display').innerHTML = `<p class="fade-in">${storyText}</p>`;
        const choicesDisplay = document.getElementById('choices-display');
        choicesDisplay.innerHTML = '';

        if (storyNode.choices) {
            storyNode.choices.forEach((choice, index) => {
                const button = document.createElement('button');
                button.className = 'nes-btn is-primary choice-button';
                button.innerText = choice.text;
                button.style.animationDelay = `${index * 0.2}s`;
                
                button.addEventListener('click', () => {
                    if (choice.destination) {
                        UISystem.showTransition(`Proceeding to ${choice.text}...`, () => {
                            StorySystem.showStoryNode(choice.destination);
                        });
                    }
                    if (choice.action) choice.action();
                });
                
                choicesDisplay.appendChild(button);
            });
        }
    }
}

// === MODULE: UI System ===
class UISystem {
    static showTransition(message, callback) {
        const transitionOverlay = document.getElementById('transition-overlay');
        document.getElementById('transition-message').textContent = message;
        transitionOverlay.classList.add('active');
        
        setTimeout(() => {
            transitionOverlay.classList.remove('active');
            if (callback) callback();
        }, 1500);
    }

    static showCharacterSelection() {
        const gameState = window.gameState;
        gameState.setState('character_select');
        
        document.getElementById('window-title').textContent = "Select Your Champion";
        document.getElementById('character-select-screen').classList.remove('hidden');
        document.getElementById('story-screen').classList.add('hidden');
        document.getElementById('combat-screen').classList.add('hidden');
        
        const characterSelectGrid = document.getElementById('character-select-grid');
        characterSelectGrid.innerHTML = '';
        
        const characters = DataManager.getCharacters();
        Object.keys(characters).forEach(key => {
            const char = characters[key];
            const card = document.createElement('div');
            card.className = 'character-card nes-container is-dark';
            card.innerHTML = `
                <div style="text-align: center; padding: 1rem;">
                    <img src="${char.img}" alt="${char.name}" style="width: 80px; height: 80px; border-radius: 10px; margin-bottom: 1rem;">
                    <h4 style="color: #00d9c0; margin-bottom: 0.5rem;">${char.name}</h4>
                    <p style="font-size: 0.7rem; color: #f7d51d;">${char.background}</p>
                    <p style="font-size: 0.7rem; color: #00d9c0;">${char.realm}</p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 1rem; font-size: 0.6rem;">
                        <div>Stability: ${char.temporalStability}</div>
                        <div>Combat: ${char.combatReadiness}</div>
                    </div>
                </div>
            `;
            card.addEventListener('click', () => UISystem.showCharacterDetails(key));
            characterSelectGrid.appendChild(card);
        });
    }

    static showCharacterDetails(charKey) {
        const gameState = window.gameState;
        gameState.selectedCharacter = charKey;
        const char = DataManager.getCharacters()[charKey];
        
        document.getElementById('selected-character-img').src = char.img;
        document.getElementById('selected-character-name').textContent = char.name;
        document.getElementById('selected-character-background').textContent = char.background;
        document.getElementById('selected-character-affinity').textContent = char.affinity;
        document.getElementById('stat-temporal-value').textContent = char.temporalStability;
        document.getElementById('stat-combat-value').textContent = char.combatReadiness;
        document.getElementById('stat-realm-value').textContent = char.realm;
        
        const skillDetails = document.getElementById('skill-details');
        skillDetails.innerHTML = '';
        
        char.abilities.forEach(ability => {
            const skillDiv = document.createElement('div');
            skillDiv.className = 'skill-item';
            skillDiv.innerHTML = `
                <strong style="color: #00d9c0;">${ability.name}</strong><br>
                <span style="font-size: 0.7rem; color: #f7d51d;">${ability.description}</span><br>
                <span style="font-size: 0.6rem; color: #aaa;">${ability.lore}</span>
            `;
            skillDetails.appendChild(skillDiv);
        });
        
        document.getElementById('character-details').classList.remove('hidden');
    }

    static confirmCharacterSelection() {
        const gameState = window.gameState;
        if (!gameState.selectedCharacter) return;
        
        const charData = DataManager.getCharacters()[gameState.selectedCharacter];
        gameState.player = {
            ...charData,
            level: 1,
            exp: 0,
            maxExp: 100,
            maxTemporalStability: charData.temporalStability,
            temporalStability: charData.temporalStability,
            temporalEnergy: 50,
            maxTemporalEnergy: 50,
            characterPath: charData.storyPath
        };
        
        UISystem.showTransition('Champion Selected! Initializing temporal sync...', () => {
            document.getElementById('character-select-screen').classList.add('hidden');
            document.getElementById('story-screen').classList.remove('hidden');
            gameState.setState('story');
            document.getElementById('player-avatar').textContent = charData.avatar;
            UISystem.updatePlayerStatsUI();
            StorySystem.showStoryNode('start');
        });
    }

    static updatePlayerStatsUI() {
        const gameState = window.gameState;
        if (!gameState.player) return;
        
        document.getElementById('stat-name').textContent = `Name: ${gameState.player.name}`;
        document.getElementById('stat-level').textContent = `Temporal Rank: ${gameState.player.level}`;
        document.getElementById('stat-hp').textContent = `Stability: ${gameState.player.temporalStability}/${gameState.player.maxTemporalStability}`;
        document.getElementById('stat-attack').textContent = `Combat Power: ${gameState.player.combatReadiness}`;
        document.getElementById('stat-realm').textContent = `Realm: ${gameState.player.realm}`;
        
        document.getElementById('player-xp-bar').max = gameState.player.maxExp;
        document.getElementById('player-xp-bar').value = gameState.player.exp;
        document.getElementById('xp-text').textContent = `${gameState.player.exp}/${gameState.player.maxExp} Anchoring`;
    }
}

// === MODULE: Game Initialization ===
class GameInitializer {
    static init() {
        window.gameState = new GameStateManager();
        
        // Set up event listeners
        document.getElementById('confirm-character').addEventListener('click', UISystem.confirmCharacterSelection);
        document.getElementById('back-to-selection').addEventListener('click', () => {
            document.getElementById('character-details').classList.add('hidden');
            document.getElementById('character-select-grid').classList.remove('hidden');
            window.gameState.selectedCharacter = null;
        });
        
        // Prevent context menu for better game feel
        document.addEventListener('contextmenu', e => e.preventDefault());
        
        // Initialize game after loading
        setTimeout(() => {
            GameInitializer.hideLoadingScreen();
            UISystem.showCharacterSelection();
            UISystem.updatePlayerStatsUI();
        }, 3000);
    }

    static hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Initialize the game when page loads
window.onload = GameInitializer.init;