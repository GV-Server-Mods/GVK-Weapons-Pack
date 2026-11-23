---
title: G menu layout (Home tab, GVK tabs, variant groups)
covers:
  - Content/Data/BlockVariantGroups.sbc
  - Content/Data/BlockCategories.sbc
  - Content/Data/BlockPositions.sbc
checked: 2026-11-22
---

# G menu layout

Status: **applied and checked in game 2026-11-22** (owner: "E19 passes"). The pilot for the G menu cleanup across the GVK mods; GVK_Suspension was done first and is the worked example.

## How the game draws it (HARD, decompiled code)

- **Home tab** draws every public block pair. A pair in a variant group is drawn only if it is the group's primary. `GuiVisible` is never checked there, so an ungrouped public block always shows.
- **Primary** = the first listed block, except that the first pair with both a Large and a Small block moves to the front. The + mark needs more than one pair in the group.
- **Home position** comes from `<BlockPositions>`, keyed by the primary's `BlockPairName`. A block with no position fills the first empty slot from row 0. Mods can add or move positions. Items past the column count (8) wrap onto the next line.
- **Category tabs** draw every listed pair as its own icon, even with `GuiVisible` false. List only each group's primary, with `StrictSearch` true.

## What is wrong today

1. The 22 groups already exist and the GVK tabs already list one primary each. But only Gatlings (`GatlingTurret`, X 1) and Warheads (`Warhead`, X 2) have a Home position; the other 20 group icons land in the first empty slots from row 0.
2. **71 `_NPC` weapon copies** (53 pairs) are `Public` true and in no group, so each is a loose Home icon. They must stay public: MES's weapon randomizer skips non-public blocks (`WeaponRandomizer.cs:180`), and GVK spawns use it.
3. The Heavy Turret Mount (`Conveyor/GVK_HeavyTurretMount_3x3x1`) has no group and no position.
4. Keen's Large Blocks and Small Blocks tabs get every GVK group member (43 and 33 entries), so each shows as its own icon.

## Plan

### Variant groups (`BlockVariantGroups.sbc`)

- Player groups unchanged.
- **New group `GVK_NPC_Weapons`, "NPC Weapons"** (owner, 2026-11-22: one NPC group icon). All 71 `_NPC` blocks, in player-group order, with `LargeGatlingTurret/LargeGatlingTurret_NPC` first so the primary is the NPC Gatling Turret (pair `GatlingTurret_NPC`, both sizes). One + icon; admins cycle it to reach any NPC block. MES is unaffected (it never reads variant groups).

### Home positions (new `BlockPositions.sbc`)

All on Keen's weapons row, **Y 24** (Keen's: Rocket Launcher 0, Gatling Turret 1, Warhead 2, Decoy 3, Turret Controller 4). Keen's Decoy and Turret Controller move after the GVK groups. 25 icons wrap into four lines of 8:

| X | Group | Primary pair |
| --- | --- | --- |
| 0 | Gatlings | `GatlingTurret` |
| 1 | Autocannons | `AutoCannonTurret` |
| 2 | Light Cannons | `LargeCalibreTurret` |
| 3 | Heavy Cannons | `AryxHurricaneCannon` |
| 4 | Flak | `MediumCalibreTurret` |
| 5 | Railguns | `Railgun` |
| 6 | MACs | `LargeRailgun` |
| 7 | Interior Turrets | `InteriorTurret` |
| 8 | Rockets | `MissileTurret` |
| 9 | Light Missiles | `SmallRocketLauncherReload` |
| 10 | Heavy Missiles | `missileBattery01` |
| 11 | Torpedoes | `TorpedoLauncher` |
| 12 | SRBMs | `LG_ARYXMissileBattery_Base` |
| 13 | Heavy Lasers | `AryxSpartanCannon` |
| 14 | Light Lasers | `Lasers_Light_Turret` |
| 15 | Plasma | `lokiCannon1` |
| 16 | AMS | `MA_PDT` |
| 17 | Sensors | `Other_Radar` |
| 18 | Drones | `AWE_Small_Hangar_Bay` |
| 19 | Flares | `FlareLauncher` |
| 20 | Warheads | `Warhead` |
| 21 | Decoy (Keen's group) | `Decoy` |
| 22 | Turret Controller (Keen's single) | `TurretControlBlock` |
| 23 | Heavy Turret Mount (single icon) | `GVK_HeavyTurretMount_3x3x1` |
| 24 | NPC Weapons | `GatlingTurret_NPC` |

Keen's `RocketLauncher` position stays but no longer draws: that pair is a non-primary member of Rockets.

### Category tabs (`BlockCategories.sbc`)

- **GV Kharak Items (`GVK`) and Weapons (`GVK_Weapons`)**: unchanged; already one primary per group plus the mount (22), `StrictSearch` true. NPC Weapons stays out of them.
- **Keen's Large Blocks**: trimmed to the 21 group primaries plus the mount (22).
- **Keen's Small Blocks**: trimmed to the 13 primaries whose pair has a small block: Gatlings, Autocannons, Light Cannons, Flak, Railguns, Rockets, Light Missiles, Torpedoes, Light Lasers, AMS, Sensors, Flares, Warheads.
- Keen's own list in those two tabs still names some vanilla weapons (a mod cannot remove items from a vanilla category), so a few vanilla variants keep their own icons there.

### Shared `GVK` category

`StrictSearch` is decided by whichever GVK mod loads first. GVK_HoverEngines has it `false`; every other mod has `true`. Fix in GVK_HoverEngines (next mod in this cleanup).

## Check in game

Runbook E19 in gvk-wiki `wiki/seasons/season-11-test-runbook.md`; passed 2026-11-22.
