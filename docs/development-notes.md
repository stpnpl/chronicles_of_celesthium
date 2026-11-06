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
- Headless Chromium automation covered responsive viewports and touch emulation, not physical devices, screen readers or other browser engines. Manual cross-browser, device and accessibility review is still needed.
- Procedural tones are lightweight original motifs rather than recorded or fully composed music; audio quality and balance need subjective review.
- The location-based exploration is intentionally compact and menu-driven, not a free-roaming tilemap. Side characters provide short interactions rather than complex branching storylines.
- The selected image is used via a WebP derivative; the originals remain in place. Backgrounds are AI-generated episode assets.
- The old unreferenced `scripts/game.js` was removed; the prototype remains available in Git history.

## Final polish QA

The original two Node tests pass. A headless Chromium browser run (`tests/browser.test.mjs`) completed all three champion journeys, including all NPC dialogue, optional quest, four encounters, gate checks, endings and refresh reset; it also checked a keyboard modal focus cycle, defeat/retry and return to refuge. Automated viewport checks covered 1440×900, 1024×768, 768×1024, 390×844 and 844×390, with touch emulation on the last three. They checked no horizontal page overflow and loaded battle art; they are not a substitute for visual review on physical devices. The tested complete journeys produced no page errors, failed requests or external requests. Sound output was not audibly assessed, and a timed human playtest has not been conducted.

To rerun browser automation, serve the repository at `http://127.0.0.1:8000/`, install Playwright and Chromium **as development tools**, and run `node tests/browser.test.mjs`. Alternatively set `PLAYWRIGHT_MODULE` to the Playwright module URL and `CHROMIUM_PATH` to a compatible Chromium executable. These tools are not runtime dependencies.

Metadata update was attempted but the GitHub integration returned HTTP 403; the repository description remains unchanged. No deployment was made by this polish branch.
