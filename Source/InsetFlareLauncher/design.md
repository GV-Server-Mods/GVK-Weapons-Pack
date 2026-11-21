# Inset Flare Launcher (Type II) with a conveyor port

**What:** GVK copies of Keen's Warfare 3 Inset Flare Launcher models, large and small, with a conveyor port on the back face. Keen's models have no conveyor dummies, so on GVK the launchers could only be hand-loaded (owner, 2026-11-17: "I can't leave them like that for this server"). Hub #813.

**Source:** Keen's ModSDK FBX files, `OriginalContent\Models\Cubes\large|small\Inset_FlareLauncher*.fbx` (2026-11-16), imported with SEUT's `import_complete`. A derivative of DLC content keeps the DLC's tag (ModSDK `OriginalContent\Models\readme.txt`), and all four definitions already carry `<DLC>Warfare3</DLC>`.

**Model swap only** (owner, 2026-11-17: "direct model swaps for the vanilla ones"). The Type I flare launchers got the same treatment the same day (`../FlareLauncher/design.md`). Only `<Model>` changes in `CubeBlocks_Other_Flare.sbc`, on `LargeInsetFlareLauncher`, `SmallInsetFlareLauncher` and both `_NPC` copies. Subtypes, mountpoints and stats stay Keen's.

## Decisions

| Item | Large | Small |
|---|---|---|
| Port faces | back only (owner, 2026-11-17) | back only |
| Port part | Keen's stock large port, 1.36 m frame, from large `CargoContainerSmall.FBX` | Keen's stock small port, 340 mm frame, from small-grid `CargoContainerSmall.FBX` |
| Line type | large (`detector_conveyor_001`), like the Type I flare launcher | small (`detector_conveyor_small_001`), like the Type I flare launcher |
| Port position | centred on the flush back plate, lip 13 mm proud as on the cargo container | in the back recess, replacing the grille, lip 12 mm proud as on the cargo container |
| Dummy | copied from the donor port, `highlight` set to the port's mesh section (`ConveyorPort_section_1`) | same (`ConveyorPortSmall_section_1`) |
| Everything else | Keen's geometry, muzzles, barrels and `detector_inventory` unchanged | same |

- **Port cut:** an exact boolean the size of the port's outline cuts the back plate, recess and decals. The cut's wall faces were then deleted, since they had no UVs and sit hidden behind the port.
- **Normals after the cut:** the Exact boolean welded every vertex of each mesh it cut, which threw Keen's normals off across the whole model (the same fault the owner saw on the Type I launcher, 2026-11-21). Each cut mesh was rebuilt from the latest `_before_*cut` checkpoint that still had all its vertices, with se-dev-seut's `restore_cut_normals.py`, and the export checked with `mwm_normals_vs_vanilla.py`: no vertex more than 5 degrees off Keen's. Checked in game (owner, 2026-11-21: "looks good in game"). Run both again after any new cut.
- **Highlights:** the game outlines named mesh sections only: objects named `*_section*`. The first build named the port meshes `ConveyorPort_Back`, so the port never lit up (owner, 2026-11-17). Every LOD that has the port uses the same section name, and its detector points at the mesh in its own LOD. SEUT 1.2.1 keeps Blender's `.001` suffix on LOD mesh names, so the export swapped each suffixed mesh to its base name for the export.
- **LODs:** Keen's `_LOD1..3` with the port added to LOD1 and LOD2, from the cargo container's own LOD1 port. LOD3 has none, as Keen's cargo LODs drop it. Distances are Keen's: large 8 / 25 / 45 m, small 5 / 15 / 35 m.
- **Build stages:** Keen's construction models, unchanged in the SBC (owner, 2026-11-17: "reuse vanilla build stages"). The game reads conveyor lines from the main model only (`MyConveyorLine.GetBlockLinePositions` uses `BlockDefinition.Model`).
- **Collision:** Keen's own `.hkt` (the SEUT collision collection points at it).
- **Output:** `Content/Models/Cubes/Large/LG_InsetFlareLauncherConveyor*.mwm` and `Content/Models/Cubes/Small/SG_InsetFlareLauncherConveyor*.mwm`, beside the Type I models.

## Gates

1. Port layout, from renders. Approved 2026-11-17.
2. Built model: port cut in, grille removed on the small, LODs and collision. Done 2026-11-17.
3. In-game test: a conveyor behind the launcher connects, flares flow in, the port highlights, and the LODs switch. **Waiting on the owner.**
