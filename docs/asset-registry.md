# Asset registry

The 12 original files in `images/` are unchanged, opaque 1024 × 1024 PNGs. The game uses 600 × 600 WebP derivatives in `images/portraits/`, named for their corresponding originals. Each is loaded on demand by the browser and displayed without changing its aspect ratio. No original file is overwritten. Original art has integrated backgrounds and is not a walking sprite sheet.

| Original | Episode role |
|---|---|
| `images/Echo_Rune.png` | Refuge NPC; resonance and containment quest. |
| `images/Hana_Kurei.png` | Remote mirage NPC; navigation clue. |
| `images/Kael_Vortex.png` | Playable champion or refuge ally. |
| `images/Kaen_Ryuji.png` | Refuge defender and rest advice. |
| `images/Korr_Dravahn.png` | Containment quest NPC. |
| `images/Lira_Valeska.png` | Fractured route reconnaissance. |
| `images/Mei_Soryana.png` | Refuge defender and civilian context. |
| `images/Nyra_Khaine.png` | Playable champion or refuge ally. |
| `images/Riko_Blaze.png` | Training encounter NPC. |
| `images/Shoryu_Hayabusa.png` | Playable champion or refuge ally. |
| `images/Thorn_Howl.png` | Fractured route guide. |
| `images/Yorikai.png` | Threshold guardian and boss introduction. |

All twelve can be reached in a single run: the selected champion is displayed in selection and status, the other two are refuge NPCs, and the other nine are distributed across locations. Champion portraits also appear during selection. Original image identity is mapped from filenames and lore-consistent visual motifs.

`images/verge-landscape.jpg`: AI-generated Episode I environment, used for the title and location backdrops. `images/void-guardian.jpg`: earlier AI-generated Episode I boss illustration retained as an unused backup. Neither modifies an original character asset. The music and effects are original synthesized tones in `scripts/audio.js`, not downloaded recordings.

## Enemy illustrations

Four original AI-generated, family-friendly 16-bit-inspired encounter illustrations are stored as 1024 × 1024 PNG source images in `images/enemies/source/`. Browser delivery uses 700 × 700 WebP derivatives generated from those sources. Each is presented in its corresponding battle, with descriptive alt text and a text fallback if the image fails.

| Encounter | Browser image | Source |
|---|---|---|
| Training Construct | `images/enemies/training-construct.webp` | `images/enemies/source/training-construct.png` |
| Temporal Anomaly | `images/enemies/temporal-anomaly.webp` | `images/enemies/source/temporal-anomaly.png` |
| Mirage Wisp | `images/enemies/mirage-wisp.webp` | `images/enemies/source/mirage-wisp.png` |
| Void Rift Guardian | `images/enemies/void-rift-guardian.webp` | `images/enemies/source/void-rift-guardian.png` |

The earlier AI-generated `images/void-guardian.jpg` remains unchanged as an unused backup; it is no longer displayed in combat. `images/verge-landscape.jpg` and the original character PNGs remain unchanged. The enemy WebPs total approximately 407 KiB; they are loaded when their encounters render, not preloaded at startup.
