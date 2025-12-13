// === DOM ELEMENTS ===
const gameWindow = document.getElementById('game-window');
const windowTitle = document.getElementById('window-title');
const loadingScreen = document.getElementById('loading-screen');
const transitionOverlay = document.getElementById('transition-overlay');
const transitionMessage = document.getElementById('transition-message');

// Character Selection
const characterSelectScreen = document.getElementById('character-select-screen');
const characterSelectGrid = document.getElementById('character-select-grid');
const characterDetails = document.getElementById('character-details');
const selectedCharacterImg = document.getElementById('selected-character-img');
const selectedCharacterName = document.getElementById('selected-character-name');
const selectedCharacterAffinity = document.getElementById('selected-character-affinity');
const statHpValue = document.getElementById('stat-hp-value');
const statAttackValue = document.getElementById('stat-attack-value');
const statAffinityValue = document.getElementById('stat-affinity-value');
const skillDetails = document.getElementById('skill-details');
const confirmCharacterBtn = document.getElementById('confirm-character');
const backToSelectionBtn = document.getElementById('back-to-selection');

// Story
const storyScreen = document.getElementById('story-screen');
const textDisplay = document.getElementById('text-display');
const choicesDisplay = document.getElementById('choices-display');

// Combat
const combatScreen = document.getElementById('combat-screen');
const enemySprite = document.getElementById('enemy-sprite');
const enemyName = document.getElementById('enemy-name');
const enemyHpBar = document.getElementById('enemy-hp-bar');
const enemyHpText = document.getElementById('enemy-hp-text');
const playerActions = document.getElementById('player-actions');
const combatLog = document.getElementById('combat-log');

// Player Stats
const statName = document.getElementById('stat-name');
const statLevel = document.getElementById('stat-level');
const statHp = document.getElementById('stat-hp');
const statAttack = document.getElementById('stat-attack');
const statAffinity = document.getElementById('stat-affinity');
const playerXpBar = document.getElementById('player-xp-bar');
const xpText = document.getElementById('xp-text');
const playerAvatar = document.getElementById('player-avatar');

// === GAME STATE ===
let player = {};
let currentEnemy = {};
let enemyQueue = [];
let isPlayerTurn = true;
let gameState = 'loading'; // loading, character_select, story, combat, victory, game_over
let selectedCharacter = null;

// === CHARACTER & ENEMY DATA ===
const characters = {
    kael: {
        name: 'Kael Vortex',
        img: 'images/Kael_Vortex.png',
        affinity: 'Temporal',
        hp: 100,
        attack: 10,
        avatar: '⚡',
        skills: [
            { name: 'Time Strike', damageMultiplier: 1.5, description: 'A quick strike that warps time, dealing 150% damage.', cost: 0 },
            { name: 'Stasis Pulse', damageMultiplier: 1.2, description: 'A burst of energy that slows the enemy, dealing 120% damage.', cost: 0 },
            { name: 'Chrono Blast', damageMultiplier: 2.0, description: 'Unleash temporal energy for massive damage.', cost: 20 }
        ]
    },
    nyra: {
        name: 'Nyra Khaine',
        img: 'images/Nyra_Khaine.png',
        affinity: 'Redemption',
        hp: 120,
        attack: 8,
        avatar: '🗡️',
        skills: [
            { name: 'Blade of Judgment', damageMultiplier: 1.8, description: 'A powerful slash with a blessed blade, dealing 180% damage.', cost: 0 },
            { name: 'Vindicating Slash', damageMultiplier: 1.4, description: 'A swift cut that restores resolve, dealing 140% damage.', cost: 0 },
            { name: 'Divine Reckoning', damageMultiplier: 2.2, description: 'Channel divine power for devastating damage.', cost: 25 }
        ]
    },
    riko: {
        name: 'Riko Blaze',
        img: 'images/Riko_Blaze.png',
        affinity: 'Neon Fury',
        hp: 90,
        attack: 12,
        avatar: '🔥',
        skills: [
            { name: 'Neon Slash', damageMultiplier: 1.6, description: 'A blazing strike with neon energy, dealing 160% damage.', cost: 0 },
            { name: 'Cyber Rush', damageMultiplier: 1.3, description: 'A rapid multi-hit attack, dealing 130% damage.', cost: 0 },
            { name: 'Digital Inferno', damageMultiplier: 2.1, description: 'Unleash the full power of the digital realm.', cost: 22 }
        ]
    },
};

const enemies = {
    void_wretch: { name: 'Void Wretch', hp: 30, attack: 5, exp: 100, sprite: '👹' },
    soul_reaver: { name: 'Soul Reaver', hp: 35, attack: 7, exp: 120, sprite: '👤' },
    fractured_demon: { name: 'Fractured Demon', hp: 40, attack: 9, exp: 150, sprite: '😈' },
    void_titan_boss: { name: 'Void Titan', hp: 80, attack: 12, exp: 200, sprite: '👺' }
};

// === ENHANCED STORY SYSTEM ===
const story = {
    start: {
        text: `A blinding flash of temporal energy subsides... "Welcome, {playerName}. Your journey begins now."`,
        choices: [ { text: "Prepare for what's next.", destination: 'start_combat_intro' } ]
    },
    start_combat_intro: {
        text: `The Loremaster points to a shimmering rift in reality. "The Null Expanse bleeds into our world. Creatures are pouring through. You must be our first line of defense! Go!"`,
        choices: [ { text: "Enter the rift.", action: () => startCombatSequence() } ]
    },
    champion_selected: {
        text: `The Loremaster nods approvingly. "Excellent choice, {playerName}. Your affinity with {playerAffinity} will serve you well against the voidspawn."`,
        choices: [
            { text: "What must I do?", destination: 'start_combat_intro' }
        ]
    },
    victory: {
        text: `With the Void Titan defeated, the rift collapses. You have proven yourself a true champion of Celesthium. Your legend has just begun.`,
        choices: [ { text: "Restart", action: () => location.reload() } ]
    },
    game_over: {
        text: `You have fallen in battle. The darkness of the Void consumes you. But in the fractured timelines of Celesthium, death is not always the end.`,
        choices: [ { text: "Try Again", action: () => location.reload() } ]
    }
};

// === GAME INITIALIZATION ===
window.onload = () => {
    setTimeout(() => {
        hideLoadingScreen();
        gameState = 'character_select';
        showCharacterSelection();
        updatePlayerStatsUI();
    }, 3000);
};

function hideLoadingScreen() {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500);
}

function showTransition(message, callback) {
    transitionMessage.textContent = message;
    transitionOverlay.classList.add('active');
    setTimeout(() => {
        transitionOverlay.classList.remove('active');
        if (callback) callback();
    }, 1500);
}

// === ENHANCED CHARACTER SELECTION ===
function showCharacterSelection() {
    gameState = 'character_select';
    windowTitle.textContent = "Select Your Champion";
    characterSelectScreen.classList.remove('hidden');
    storyScreen.classList.add('hidden');
    combatScreen.classList.add('hidden');

    characterSelectGrid.innerHTML = '';

    // Only show Kael and Nyra for now (original functionality)
    ['kael', 'nyra'].forEach(key => {
        const char = characters[key];
        const card = document.createElement('div');
        card.className = 'character-card nes-container is-dark';
        card.innerHTML = `
            <div style="text-align: center; padding: 1rem;">
                <img src="${char.img}" alt="${char.name}" style="width: 80px; height: 80px; border-radius: 10px; margin-bottom: 1rem;">
                <h4 style="color: #00d9c0; margin-bottom: 0.5rem;">${char.name}</h4>
                <p style="font-size: 0.7rem; color: #f7d51d;">${char.affinity}</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 1rem; font-size: 0.6rem;">
                    <div>HP: ${char.hp}</div>
                    <div>ATK: ${char.attack}</div>
                </div>
            </div>
        `;
        card.addEventListener('click', () => showCharacterDetails(key));
        characterSelectGrid.appendChild(card);
    });
}

function showCharacterDetails(charKey) {
    selectedCharacter = charKey;
    const char = characters[charKey];

    selectedCharacterImg.src = char.img;
    selectedCharacterName.textContent = char.name;
    selectedCharacterAffinity.textContent = `Affinity: ${char.affinity}`;
    statHpValue.textContent = char.hp;
    statAttackValue.textContent = char.attack;
    statAffinityValue.textContent = char.affinity;

    skillDetails.innerHTML = '';
    char.skills.forEach(skill => {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill-item';
        skillDiv.innerHTML = `
            <strong style="color: #00d9c0;">${skill.name}</strong><br>
            <span style="font-size: 0.7rem;">${skill.description}</span>
        `;
        skillDetails.appendChild(skillDiv);
    });

    // Don't hide the grid yet - it gets hidden when confirm button is clicked
    characterDetails.classList.remove('hidden');
}

function confirmCharacterSelection() {
    if (!selectedCharacter) return;

    const charData = characters[selectedCharacter];
    player = {
        ...charData,
        level: 1,
        exp: 0,
        maxExp: 100,
        maxHp: charData.hp,
        currentHp: charData.hp,
        mp: 50, // Add mana system
        maxMp: 50
    };

    showTransition('Champion Selected! Preparing for adventure...', () => {
        characterSelectScreen.classList.add('hidden');
        storyScreen.classList.remove('hidden');
        gameState = 'story';
        playerAvatar.textContent = charData.avatar;
        updatePlayerStatsUI();
        showStoryNode('champion_selected');
    });
}

// === ORIGINAL CHARACTER SELECTION FUNCTION (for compatibility) ===
function selectCharacter(charKey) {
    const charData = characters[charKey];
    player = {
        ...charData,
        level: 1,
        exp: 0,
        maxExp: 100,
        maxHp: charData.hp,
        currentHp: charData.hp,
        mp: 50, // Add mana system
        maxMp: 50
    };

    // Use the character details flow instead of the original way
    showCharacterDetails(charKey);
    characterSelectGrid.classList.add('hidden');
    characterDetails.classList.remove('hidden');
}

// === ENHANCED STORY SYSTEM ===
function showStoryNode(nodeKey) {
    const storyNode = story[nodeKey];
    if (!storyNode) return;

    const storyText = storyNode.text
        .replace(/{playerName}/g, player.name || 'Champion')
        .replace(/{playerAffinity}/g, player.affinity || 'Unknown');

    textDisplay.innerHTML = `<p class="fade-in">${storyText}</p>`;
    choicesDisplay.innerHTML = '';

    if (storyNode.choices) {
        storyNode.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'nes-btn is-primary choice-button';
            button.innerText = choice.text;
            button.style.animationDelay = `${index * 0.2}s`;
            button.addEventListener('click', () => {
                if (choice.destination) {
                    showTransition('Loading story...', () => showStoryNode(choice.destination));
                }
                if (choice.action) choice.action();
            });
            choicesDisplay.appendChild(button);
        });
    }
}

// === ENHANCED COMBAT SYSTEM ===
function startCombatSequence() {
    enemyQueue = ['void_wretch', 'soul_reaver', 'fractured_demon', 'void_titan_boss'];

    showTransition('Entering the Void...', () => {
        storyScreen.classList.add('hidden');
        combatScreen.classList.remove('hidden');
        gameState = 'combat';
        windowTitle.textContent = "Combat";
        combatLog.innerHTML = '';
        logToCombat('The battle for Celesthium begins!', 'system');
        loadNextEnemy();
    });
}

function loadNextEnemy() {
    if (enemyQueue.length === 0) {
        gameWin();
        return;
    }

    const enemyKey = enemyQueue.shift();
    currentEnemy = { ...enemies[enemyKey], maxHp: enemies[enemyKey].hp };

    enemySprite.textContent = currentEnemy.sprite;
    enemyName.textContent = currentEnemy.name;
    enemyHpBar.max = currentEnemy.maxHp;
    enemyHpBar.value = currentEnemy.hp;
    updateEnemyHpText();

    logToCombat(`A ${currentEnemy.name} emerges from the void!`, 'enemy');
    setupPlayerActions();
    isPlayerTurn = true;
}

function updateEnemyHpText() {
    enemyHpText.textContent = `${currentEnemy.hp}/${currentEnemy.maxHp} HP`;
}

function setupPlayerActions() {
    playerActions.innerHTML = '';

    player.skills.forEach((skill, index) => {
        const button = document.createElement('button');
        button.className = 'nes-btn is-success action-button';
        button.innerHTML = `
            <div style="font-size: 0.8rem;">
                <div>${skill.name}</div>
                <div style="font-size: 0.6rem; color: #f7d51d;">Cost: ${skill.cost} MP</div>
            </div>
        `;
        button.addEventListener('click', () => {
            if(isPlayerTurn && player.mp >= skill.cost) {
                playerTurn(skill);
            } else if (player.mp < skill.cost) {
                logToCombat('Not enough mana!', 'system');
            }
        });
        playerActions.appendChild(button);
    });
}

function playerTurn(skill) {
    isPlayerTurn = false;

    // Check mana cost
    if (player.mp < skill.cost) {
        logToCombat('Not enough mana for this skill!', 'system');
        isPlayerTurn = true;
        return;
    }

    player.mp -= skill.cost;

    const damage = Math.floor(player.attack * skill.damageMultiplier);
    currentEnemy.hp = Math.max(0, currentEnemy.hp - damage);

    logToCombat(`${player.name} uses ${skill.name}! Deals ${damage} damage.`, 'player');
    gameWindow.classList.add('screen-shake');
    setTimeout(() => gameWindow.classList.remove('screen-shake'), 500);

    enemyHpBar.value = currentEnemy.hp;
    updateEnemyHpText();
    updatePlayerStatsUI();

    if (currentEnemy.hp <= 0) {
        handleEnemyDefeat();
    } else {
        setTimeout(enemyTurn, 1000);
    }
}

function enemyTurn() {
    const damage = Math.floor(currentEnemy.attack * (0.8 + Math.random() * 0.4)); // Add some randomness
    player.currentHp = Math.max(0, player.currentHp - damage);

    logToCombat(`${currentEnemy.name} attacks! You take ${damage} damage.`, 'enemy');
    updatePlayerStatsUI();

    if (player.currentHp <= 0) {
        gameOver();
    } else {
        isPlayerTurn = true;
    }
}

function handleEnemyDefeat() {
    logToCombat(`${currentEnemy.name} has been defeated!`, 'system');
    gainExp(currentEnemy.exp);

    // Small heal on enemy defeat
    const healAmount = Math.floor(player.maxHp * 0.1);
    player.currentHp = Math.min(player.maxHp, player.currentHp + healAmount);
    const mpRestore = Math.floor(player.maxMp * 0.15);
    player.mp = Math.min(player.maxMp, player.mp + mpRestore);

    logToCombat(`You feel renewed! +${healAmount} HP, +${mpRestore} MP`, 'system');
    updatePlayerStatsUI();

    setTimeout(loadNextEnemy, 2000);
}

function gainExp(amount) {
    player.exp += amount;
    logToCombat(`Gained ${amount} EXP!`, 'system');

    if (player.exp >= player.maxExp) {
        levelUp();
    }
    updatePlayerStatsUI();
}

function levelUp() {
    player.level++;
    player.exp -= player.maxExp;
    player.maxExp = Math.floor(player.maxExp * 1.5);
    player.maxHp += 15;
    player.maxMp += 10;
    player.currentHp = player.maxHp;
    player.mp = player.maxMp;
    player.attack += 3;

    logToCombat(`LEVEL UP! Reached Level ${player.level}!`, 'system');
    logToCombat('Stats increased!', 'system');
    updatePlayerStatsUI();
}

function gameWin() {
    gameState = 'victory';
    combatScreen.classList.add('hidden');
    storyScreen.classList.remove('hidden');
    windowTitle.textContent = "Victory!";
    showStoryNode('victory');
}

function gameOver() {
    gameState = 'game_over';
    combatScreen.classList.add('hidden');
    storyScreen.classList.remove('hidden');
    windowTitle.textContent = "Defeat...";
    showStoryNode('game_over');
}

function showCredits() {
    textDisplay.innerHTML = `
        <div style="text-align: center;">
            <h3 style="color: #f7d51d; margin-bottom: 2rem;">Chronicles of Celesthium</h3>
            <p style="font-size: 0.8rem; line-height: 1.6;">
                Thank you for playing!<br><br>
                Your journey through the Void has saved countless lives.<br>
                The realm of Celesthium is safe... for now.
            </p>
            <button class="nes-btn is-primary" onclick="resetGame()" style="margin-top: 2rem;">
                Play Again
            </button>
        </div>
    `;
    choicesDisplay.innerHTML = '';
}

function resetGame() {
    // Reset all game state
    player = {};
    currentEnemy = {};
    enemyQueue = [];
    isPlayerTurn = true;
    gameState = 'loading';
    selectedCharacter = null;

    // Show loading screen again
    location.reload();
}

// === UI HELPERS ===
function updatePlayerStatsUI() {
    if (!player.name) return;

    statName.textContent = `Name: ${player.name}`;
    statLevel.textContent = `Level: ${player.level}`;
    statHp.textContent = `HP: ${player.currentHp}/${player.maxHp}`;
    statAttack.textContent = `Attack: ${player.attack}`;
    statAffinity.textContent = `Affinity: ${player.affinity}`;

    playerXpBar.max = player.maxExp;
    playerXpBar.value = player.exp;
    xpText.textContent = `${player.exp}/${player.maxExp} EXP`;
}

// Original logToCombat function for compatibility, using the new enhanced version
function logToCombat(message, color = 'white') {
    // Convert original color parameter to new type parameter
    let type = 'system';
    if (color === '#209cee' || color === 'player') type = 'player';
    else if (color === '#e53935' || color === 'enemy') type = 'enemy';
    else if (color === '#92cc41' || color === '#f7d51d') type = 'system';

    const logEntry = document.createElement('div');
    logEntry.className = `log-entry log-${type}`;
    const timestamp = new Date().toLocaleTimeString();
    logEntry.innerHTML = `[${timestamp}] ${message}`;
    combatLog.appendChild(logEntry);
    combatLog.scrollTop = combatLog.scrollHeight;
}

// Enhanced logging function for new features
function logToCombatEnhanced(message, type = 'system') {
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry log-${type}`;
    const timestamp = new Date().toLocaleTimeString();
    logEntry.innerHTML = `[${timestamp}] ${message}`;
    combatLog.appendChild(logEntry);
    combatLog.scrollTop = combatLog.scrollHeight;
}

// === EVENT LISTENERS ===
confirmCharacterBtn.addEventListener('click', confirmCharacterSelection);
backToSelectionBtn.addEventListener('click', () => {
    characterDetails.classList.add('hidden');
    characterSelectGrid.classList.remove('hidden');
    selectedCharacter = null;
});

// Prevent context menu on right click for better game feel
document.addEventListener('contextmenu', e => e.preventDefault());

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (gameState === 'combat' && isPlayerTurn) {
        const buttons = playerActions.querySelectorAll('button');
        const currentIndex = Array.from(buttons).findIndex(btn => btn === document.activeElement);

        switch(e.key) {
            case '1':
            case '2':
            case '3':
                const index = parseInt(e.key) - 1;
                if (buttons[index]) buttons[index].click();
                break;
            case 'ArrowLeft':
                if (currentIndex > 0) buttons[currentIndex - 1].focus();
                break;
            case 'ArrowRight':
                if (currentIndex < buttons.length - 1) buttons[currentIndex + 1].focus();
                break;
        }
    }
});