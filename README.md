# GVK Weapons Pack

The weapons of the **GV: Deserts of Kharak (GVK)** server: custom WeaponCore ballistic, laser, missile and drone weapons, with their audio, visuals and balance curves, plus the **GVK Weapon Studio**, a web tool that reads this pack and shows every weapon's stats, ammo, telemetry and balance. Workshop item: GVK11 Weapons Pack (2652772270).

**Live Weapon Studio:** [gv-server-mods.github.io/GVK-Weapons-Pack](https://gv-server-mods.github.io/GVK-Weapons-Pack/)

## Philosophy
- **Balance by data, not by feel.** Weapons are defined in WeaponCore classes, and the Studio parses those same files in the browser, so what you see is what the server runs.
- **One vocabulary.** Classes, Roles, Kinetic and Energetic damage and the rest are defined once in `GLOSSARY.md` and used the same way in the code, the Studio and the docs.
- **Armor resists Kinetic and Energetic damage equally** until armor counterplay becomes a balance goal ([the decision](docs/adr/0001-equal-kinetic-energetic-resistance.md)).
- **NPC weapons are their own definitions.** Player and NPC versions are separate (`_NPC` subtypes) so one can be tuned without the other.

## Requirements
- **Load order:** after the CoreParts and WeaponCore mods. On a dedicated server or Torch, a higher load id (below WeaponCore in the list); in a client or local world, above WeaponCore in the mod list. A local test folder needs the `VanillaReplacement` prefix in its name.
- WeaponCore ([Ash-LikeSnow/WeaponCore](https://github.com/Ash-LikeSnow/WeaponCore)) and CoreParts ([Ash-LikeSnow/CoreParts](https://github.com/Ash-LikeSnow/CoreParts)).
- No re-uploads. For standalone or third-party use, see the original mods in the credits.

## Operator cheat sheet
| What | Where |
| --- | --- |
| Weapon, ammo and armor definitions | `CoreParts/*.cs` |
| Blocks, ammo magazines, blueprints | `Content/Data/*.sbc` |
| Explore and compare everything | the Weapon Studio (link above) |
| A WeaponCore server override | the server's WeaponCore config, not this repo (GVK sets none on other mods' weapons) |

## For other modders
Read these design docs in `docs/design/`: why standard approach settings failed for drone orbits and what worked ([drone orbit terrain following](docs/design/drone-orbit-terrain-following.md)); how a two-mode combat drone is built ([Falcon architecture](docs/design/falcon-drone-architecture.md)); and the WeaponCore ModAPI quirks found along the way ([WeaponCore quirks](docs/design/weaponcore-quirks.md)). The Studio's source pipeline (`studio/source_pipeline.js`) is a working example of parsing WeaponCore definitions outside the game.

## Folder map
| Path | What is in it |
| --- | --- |
| `CoreParts/` | WeaponCore definition classes: weapons, ammo, armor, drones |
| `Content/` | Audio, models, textures and the SBC data |
| `studio/` | The Weapon Studio web app |
| `tests/` | Headless Node test suites for the Studio and WeaponCore parity |
| `tools/` | The CI data gate, the snapshot exporter and `Update-Readme.ps1` |
| `docs/` | The Studio design document, architecture decisions, design docs and agent docs |
| `.github/workflows/` | Deploys the Studio to GitHub Pages |

## Build and test
An MDK2 mod project on .NET Framework 4.8. `dotnet build -c Release` (or Ctrl+Shift+B in VS Code) packs and deploys it to `%APPDATA%\SpaceEngineers\Mods\GVK_Weapons`.

```pwsh
node tests/run_studio_tests.js          # all Studio and parity test suites
node tools/validate_studio_data.mjs     # the CI data gate
node tools/export_snapshots.js          # regenerate the bundled snapshots
```

## Design docs
[docs/design/README.md](docs/design/README.md).

## Quick links
- Hub board and issues: [GV-Server-Mods/GVK-Settings](https://github.com/GV-Server-Mods/GVK-Settings)
- Weapon Studio: [live site](https://gv-server-mods.github.io/GVK-Weapons-Pack/)
- Steam guide: [players' rules and gameplay](https://steamcommunity.com/sharedfiles/filedetails/?id=2781522559); mod collection: [2650582206](https://steamcommunity.com/sharedfiles/filedetails/?id=2650582206)
- Skills: [se-dev-kharak](https://github.com/GV-Server-Mods/se-dev-kharak)

## Credits
Thank you to the following for letting me use their assets in this pack:
Thank you to the following for letting me utilize their assets in this pack:
- AutoMcD (MA Weapons) https://steamcommunity.com/sharedfiles/filedetails/?id=2023664724
- Camina (AWE Weapons) https://steamcommunity.com/sharedfiles/filedetails/?id=2530716039
- MajorXAce (UNSC Weapons) https://steamcommunity.com/sharedfiles/filedetails/?id=2286546132
- Chipstix & Ash Like Snow (Oki Reskin Weapons) https://steamcommunity.com/sharedfiles/filedetails/?id=2481720426
- Akiad (Akiad small grid Weapons) https://steamcommunity.com/sharedfiles/filedetails/?id=2408838606
- Substicious (Warfare II DLC addon Weapons) https://steamcommunity.com/sharedfiles/filedetails/?id=2773999189
- Ravenbolt (Compact Turrets) https://steamcommunity.com/sharedfiles/filedetails/?id=1705288123
- TheSlaveOne (Conveyored Fireworks) https://steamcommunity.com/sharedfiles/filedetails/?id=3063560692
- Takeshi (AutoGatling) https://steamcommunity.com/sharedfiles/filedetails/?id=1381114389
- L.Y.N.X (L.Y.N.X Industries - Weaponry) https://steamcommunity.com/sharedfiles/filedetails/?id=2410783458
- Consty (Commissioned Deserts of Kharak Weapons) included in mod
