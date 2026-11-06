# Episode I — The Convergence

A self-contained, single-player, location-based retro RPG set during Phase III of Chronicles of Celesthium. Choose Kael Vortex, Nyra Khaine or Shoryu Hayabusa, aid the refuge in the Shattered Verge, secure two routes and face the Void Rift Guardian.

The original lore bible remains in the repository root `README.md`; the original timeline is `chronicles-celesthium-starting-timeline.md`. Episode events are additions, not retroactive changes to that lore.

## Run locally

From the repository root, run `python3 -m http.server 8000`, then open `http://localhost:8000/`. JavaScript modules require an HTTP server in many browsers; opening `index.html` directly as a file is not supported. The server only serves files; it is not a game backend. No install, build, account, API key, external service or internet connection is needed for gameplay once served locally. Modern browsers with ES modules, WebP and Web Audio support are targeted.

## Deploy

Publish the repository root as a static site (for example, select a branch and `/ (root)` in GitHub Pages settings). All game URLs are relative and work under a project subpath. The original images and documents can remain in the deployment; gameplay loads only the optimized portraits and two backgrounds. No server-side configuration or routing is required.

## Play

New Game → choose a champion → read the prologue → speak with Riko for training → visit both approaches → speak with Yorikai at the threshold → face the Guardian. Speak with Echo, find the shard at the fractured relay and return to her for the optional containment quest. Rest at the refuge to restore stability and energy. Talk to the other characters for clues and context. The location and action buttons work with mouse, touch, and keyboard (Tab and Enter/Space).

The game is memory-only: reload or close the tab and the run is gone. A battle retry restores the start of that encounter in memory. Settings are also session-only. Music and effects use locally synthesized tones and start following a click or keyboard activation; browser audio can be muted or adjusted in Settings.

## Tests and limitations

Run `node tests/game.test.mjs` and `node tests/flow.test.mjs`. The former exercises combat rules, quest flags and assets; the latter simulates UI events and completes all three routes. These do not replace a browser or human playtest. See [development notes](development-notes.md) for verification limits and [combat guide](gameplay.md) for mechanics.
