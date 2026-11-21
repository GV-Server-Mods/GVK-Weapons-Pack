# Flare Launcher (Type I) with a conveyor port

**What:** GVK copies of Keen's base-game Flare Launcher models, large and small, with a conveyor port on the back face. They replace TheSlaveOne's Conveyored Fireworks models (`LG_TSOFlareLauncherConveyorL2S`, `TSOFlareLauncherConveyorSG`), which used the old full yellow conveyor door with no grab handles (owner, 2026-11-17: "replace those old ones with new ones" following the Type II inset launchers). Hub #813.

**Source:** Keen's ModSDK FBX files, `OriginalContent\Models\Cubes\large|small\FlareLauncher*.fbx`, imported with SEUT's `import_complete`. Base-game content, so no DLC tag.

**Model swap only**, like the Type II inset launchers (`../InsetFlareLauncher/design.md`). Only `<Model>` changes in `CubeBlocks_Other_Flare.sbc`, on `LargeFlareLauncher`, `SmallFlareLauncher` and both `_NPC` copies. Subtypes, mountpoints and stats stay Keen's.

## Decisions

| Item | Large | Small |
|---|---|---|
| Port faces | back only, centred (owner, 2026-11-17) | back only, centred |
| Port part | Keen's stock large port, 1.36 m frame, from large `CargoContainerSmall.FBX` | Keen's stock small port, 340 mm frame, from small-grid `CargoContainerSmall.FBX` |
| Line type | large (`detector_conveyor_001`), as on the old model | small (`detector_conveyor_small_001`), as on the old model's back |
| Dummy | copied from the donor port, `highlight` set to the port's mesh section | same |
| Everything else | Keen's geometry, muzzles, barrels and `detector_inventory` unchanged (every dummy checked against Keen's `.mwm`) | same |

- **Front connection removed:** the old models also had a hidden conveyor line on the front, from a renamed inventory detector (`detector_conveyor_005`, a large line even on the small model). The new models connect through the back port only.
- **Port cut:** an exact boolean the size of the port's outline cuts the back plate. The cut's wall faces were then deleted, since they had no UVs and sit hidden behind the port.
- **Normals after the cut:** the Exact boolean welded every vertex of each mesh it cut, which threw Keen's normals off across the whole model (owner, 2026-11-21: odd trapezoids of light at the corners and smoothed bevels). Each cut mesh was rebuilt from the `_before_cut` checkpoint with se-dev-seut's `restore_cut_normals.py`, and the export checked with `mwm_normals_vs_vanilla.py`: no vertex more than 5 degrees off Keen's. Checked in game (owner, 2026-11-21: "looks good in game"). Run both again after any new cut.
- **Highlights:** the game outlines named mesh sections only: objects named `*_section*` (`ConveyorPort_section_1`, `ConveyorPortSmall_section_1`). Every LOD that has the port uses the same section name, and its detector points at the mesh in its own LOD.
- **LODs:** Keen's `_LOD1..3` with the port added to LOD1 and LOD2, from the cargo container's own LOD1 port. LOD3 has none, as Keen's cargo LODs drop it. Distances are Keen's: large 8 / 25 / 45 m, small 5 / 15 / 35 m.
- **Build stages:** Keen's construction models, unchanged in the SBC. The game reads conveyor lines from the main model only (`MyConveyorLine.GetBlockLinePositions` uses `BlockDefinition.Model`).
- **Collision:** Keen's own `.hkt` (the SEUT collision collection points at it).
- **Output:** `Content/Models/Cubes/Large/LG_FlareLauncherConveyor*.mwm` and `Content/Models/Cubes/Small/SG_FlareLauncherConveyor*.mwm`.

## Gates

1. Port layout, from a mock render. Approved 2026-11-17.
2. Built model: port cut in, LODs and collision, dummies checked against Keen's. Done 2026-11-17.
3. In-game test: a conveyor behind the launcher connects, flares flow in, the port and the flare bay both highlight, nothing connects on the front, and the LODs switch. **Waiting on the owner.**
