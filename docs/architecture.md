# Technical architecture

Static HTML entry point loads `scripts/app.js` as a native ES module. `app.js` owns presentation, navigation, event delegation and dialogue display; `data/characters.js` and `data/world.js` supply champions, abilities, locations, NPC text, enemy definitions and reactions. `state.js` creates the in-memory run and computes objectives. `quests.js` updates the optional quest. `combat.js` owns turn rules, enemy intent, checkpoint, retry and victory flags independently of DOM rendering. `assets.js` renders portrait references and handles failures; `audio.js` synthesizes local audio after interaction. `styles/game.css` handles the responsive layout and reduced motion.

Explicit battle keys and victory flags connect encounters to progression. The threshold is locked until both routes are clear; the boss button is locked until Yorikai is consulted. No save or persistence APIs are used. All asset paths are relative to the page and no network calls are made by the application. Native modules need an HTTP static server. The prior prototype's `scripts/game.js` is preserved for historical reference but is not loaded.

Future work should split the relatively large view/controller module further if multiple episodes are added, introduce schema validation for data and add real-browser end-to-end tests before increasing complexity.
