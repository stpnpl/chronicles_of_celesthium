# Development and verification notes

## Milestones
1. Foundation: native-module shell, original-art derivatives, menu, selection, prologue and navigation.
2. Exploration: refuge, two approaches, threshold, conversations, route journal and optional quest.
3. Combat: separate deterministic rules, champion abilities, guard, items, telegraphed boss, victory and in-memory retry.
4. Narrative: all twelve character roles, character-specific prologue/boss/ending reactions, local resolution and credits.
5. Polish: responsive styling, focus indicators, reduced-motion setting, local procedural audio, asset derivatives and automated checks.

## Checks
`node tests/game.test.mjs` exercises every champion, each ability, enemy patterns, item use, guard, energy limits, victory, defeat and retry, quest state, local references and core completion. `node tests/flow.test.mjs` uses a minimal DOM event simulation to drive the application through the story for each champion, including all NPC conversations, optional quest and endings. These checks do not run a real browser and do not verify visual rendering, device compatibility, touch targets, screen-reader behavior, actual audio playback or human gameplay duration.

## Known limitations
- A timed human playtest is still needed to verify the 15–30 minute target and balance. The experience may be shorter or longer depending on reading and choices.
- No real browser or mobile-device test was available in the implementation environment. Responsive CSS and keyboard-accessible controls need manual testing on representative browsers and viewports.
- Procedural tones are lightweight original motifs rather than recorded or fully composed music; audio quality and balance need subjective review.
- The location-based exploration is intentionally compact and menu-driven, not a free-roaming tilemap. Side characters provide short interactions rather than complex branching storylines.
- The selected image is used via a WebP derivative; the originals remain in place. Backgrounds are AI-generated episode assets.
- The old `scripts/game.js` is retained but unused; its prototype story and combat are not part of the new episode.
