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

`images/verge-landscape.jpg`: AI-generated Episode I environment, used for the title and location backdrops. `images/void-guardian.jpg`: AI-generated Episode I boss illustration. Neither modifies an original character asset. The music and effects are original synthesized tones in `scripts/audio.js`, not downloaded recordings.
