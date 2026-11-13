# Build Log: GVK_HeavyTurretMount_3x3x1 (`Heavy Turret Mount Plate`)

## Stage 1 — Blockout & Hull Geometry
- **Scene**: `GVK_HeavyTurretMount_3x3x1` (`mainScene`, `gridScale = 'large'`, `bBox = 3x3x1`, `7.50 m × 7.50 m × 2.50 m`)
- **Conveyor Ports**: Kitbashed `detector_conveyor_section_001` from `<ModSDK>\OriginalContent\Models\Cubes\large\Structural_5_platformConveyor.fbx` into `PortTop_section_1` (`+Z` deck center) and `PortBottom_section_2` (`-Z` deck center, rotated `180°` around `X`), preserving `PaintedMetal_Yellow` (`0.724 UV/m`), `Metal_Dull`, and `Conveyor` (`0.851 UV/m`) materials plus the two 3D `PaintedMetal_Yellow` crossbars and `Metal_Dull` end blocks.
- **Armored Hull (`Body`)**: `1,972` faces (`PaintedMetal_Colorable` `68%` visible, `PaintedMetal_Darker` `29%` visible, `100%` material border on a fold), featuring:
  - Top & Bottom symmetric turret mounting decks (`3x3`): raised outer heavy armor rim (`±3.75 m`) with corner landing pads, `35 mm` recessed dark step channel (`PaintedMetal_Darker`), central octagonal turret deck (`3.26 m` flat-to-flat), and `40 mm` recessed dark conveyor moat.
  - 4 Side Faces (`3x1`, zero side conveyor ports): 3-bay structural truss frame (`PaintedMetal_Darker`) with `45°` diagonal box-trusses and heavy corner gussets in the two outer bays, and a multi-tiered heavy armor bulkhead + dark shear collar + raised octagonal bolster cap in the center bay.
  - 3-facet `22.5°` outer armor rounds (`>20 mm`) and `8.0 mm` single-facet `45°` chamfers on all hard edges.

## Stage 2 — Surface Detailing, `seut-critic` Review & Fixes
- Applied all 9 fixes from `seut-critic`'s Stage 2 review:
  1. Preserved multi-material slot assignments on `PortTop_section_1` and `PortBottom_section_2` (`PaintedMetal_Yellow`, `Metal_Dull`, `Conveyor`) and added 3D yellow crossbars.
  2. Built all `Atlas3 #14` bolts as 8-gon circular discs (`38 mm` diameter) cropped to `k = 0.40` of the `#14` UV cell (`0` dark square halos) and placed `~40 mm` (`1.14` heads) from bevel folds.
  3. Simplified center bolster cap `S5-D` (removed inner seam ring and center stamp, leaving 8 perimeter `#14` bolts and unstretched `Atlas2` signs/codes inset `30 mm` from the bevel).
  4. Replaced diagonal deck spokes with 8 strictly orthogonal (`0° / 90°`) `Atlas4_Colorable #3` lines (`±0.680 m`) connecting the inner octagonal moat ring (`0.940 m`) to the outer octagonal deck ring (`3.190 m`) with exact vertex-to-vertex T-joins, and placed the 4 `#36` trapezoid bars outside the inner ring (`1.035 m`).
  5. Oriented all `Atlas3 #16` hex-bolt tabs (`41 × 61.5 mm`) with flat tab end (`v0 = 0.6924`) `4 mm` from the step/moat fold, perpendicular (`90°`) to the edge, and hex-bolt head (`v1 = 0.8076`) pointing inward.
  6. Assigned `PaintedMetal_Darker` to the entire recessed perimeter channel (`T1` + `T2`), achieving `100%` material border on a fold and `97%` decal-to-host variant match, and added 4 `Atlas3_Colorable #29` triangular corner plates (`0.50 m` legs) on `T0-B`.
  7. Replaced center-stamped `#32` decals on `S4-A` with a horizontal `Atlas4_Colorable #3` seam line (`Z = -0.32 m`), lower-corner `#31` hinge-notch panel, and upper-corner `#24` slatted vent.
  8. Rotated `A3_SLOT20` inside the `45°` diagonal strut web (`S3-A`) by `+90°` so its long axis runs parallel (`45°`) along the strut web.
  9. Ran `decal_snap.py`: `0` unsnapped decals, `0` design faults across all 438 decal pieces.
- **`keen_check.py --era newer`**: **`40 PASS, 0 WARN, 11 INFO`**.

## Stage 3 — Empties, Collision, LODs, Build Stages, Export & Integration
- **Highlight Empties**: `detector_conveyor_1` (`(0, 0, +1.05)`, highlighting `PortTop_section_1`) and `detector_conveyor_2` (`(0, 0, -1.05)`, rotated `180°` X, highlighting `PortBottom_section_2`), parented to root mesh `Body`.
- **Collision (`Collision - Main`)**: `Collision_Main` (`7.50 × 7.50 × 2.50 m`, `RigidBody` `BOX`, valid `UVMap`).
- **LODs (`15 / 45 / 100 m`)**:
  - `LOD1` (`15 m`): `1,946` faces, single joined mesh object, all 10 `Main` materials retained.
  - `LOD2` (`45 m`): `1,248` faces, single joined mesh object, all 10 `Main` materials retained.
  - `LOD3` (`100 m`): `600` faces, single joined mesh object, all 10 `Main` materials retained.
- **Build Stages (`BS1`, `BS2`, `BS3` at `0.33 / 0.66 / 1.00`)**:
  - `BS1`: `360` faces (`Construction` open steel girder frame + diagonal trusses + octagonal turret rings).
  - `BS2`: `492` faces (`Construction` + `PaintedMetal_Darker` inner sub-floor plates and center bulkheads).
  - `BS3`: `1,118` faces (`Construction` + `PaintedMetal_Darker` + `PaintedMetal_Yellow` pre-complete assembly).
- **SEUT Export (`I007`)**:
  - Exported `GVK_HeavyTurretMount_3x3x1.mwm` (`524,704` B), `_LOD1.mwm` (`262,560` B), `_LOD2.mwm` (`262,560` B), `_LOD3.mwm` (`131,488` B), `_BS1.mwm` (`65,952` B), `_BS2.mwm` (`131,488` B), `_BS3.mwm` (`262,560` B) with `0` warnings and `0` errors.
  - Verified binary `.mwm` tokens: `detector_conveyor_1`, `detector_conveyor_2`, `highlight`, `PortTop_section_1`, `PortBottom_section_2`, `HavokCollisionGeometry`.
- **Icon**: Rendered `128×128` BC7 sRGB `.dds` (`22,020` B) and `.png` via SEUT (`renderColorOverlay = True`).
- **SBC & C# Integration**:
  - `Content/Data/CubeBlocks/CubeBlocks_Other_Structural.sbc`: `Conveyor/GVK_HeavyTurretMount_3x3x1` (`148,500` integrity = `9 × 16,500`, `BuildTimeSeconds = 198`).
  - `Content/Data/BlockCategories.sbc`: Added `Conveyor/GVK_HeavyTurretMount_3x3x1` to `GVK`, `GVK_Weapons`, and `Section1_Position1_LargeBlocks`.
  - `CoreParts/Armor_Blocks.cs`: Registered `"GVK_HeavyTurretMount_3x3x1"` in `GVK_BusterArmor` (`Kind = Heavy`, `1.00f / 1.00f`).
  - `node tests/test_build_time.js`: `PASS 135 blocks follow the weld-time formula`.
  - `dotnet build -c Release`: `0 Warning(s), 0 Error(s)`, deployed to `%APPDATA%\SpaceEngineers\Mods\GVK_Weapons`.


## Stage 4 — Conveyor Port Refinement (Crossbars Removal)
- Removed the extraneous central 3D crossbars from `PortTop_section_1` and `PortBottom_section_2` (restoring the clean 286-polygon vanilla `Structural_5_platformConveyor` port profile: yellow frame + recessed conveyor shutter + two slim `Metal_Dull` grab rails along the frame's inner chamfer).
- Rebuilt `LOD1..3` (1,886 / 1,201 / 554 faces) and `BS3` (1,111 faces).
- `keen_check.py --era newer`: 40 PASS, 0 WARN, 11 INFO.
- Re-exported all `.mwm` files cleanly (SEUT `I007`), re-rendered `128x128` icon (`.dds` / `.png`), and deployed via `dotnet build -c Release`.

## Stage 5 — Structural Platform Framing, Shutter Material, Decals & Hole Fixes
- **Conveyor Door & Non-Cargo Policy**:
  - Assigned Conveyor_Yellow material to conveyor shutter face on PortTop_section_1 and PortBottom_section_2 (vanilla non-inventory conveyor style).
  - Removed conveyor highlight empties' highlight custom property and cleared empty.seut.highlight_objects (detector triggers conveyor connection without showing yellow mesh contour highlight).
  - Verified grab handles orientation and geometry aligned with vanilla Structural_5_platformConveyor.
  - Updated se-dev-seut documentation (SKILL.md, references/keen-style.md, references/interaction-highlights.md, references/kitbash.md) and pushed commit 2869042.
- **Port Corner Hole Fix**:
  - Extended opening collar in Body at Z = +-1.135 m from (0.678, 0.673) to matching 45 deg chamfers (0.504, 0.678) to (0.678, 0.504), creating a >30 mm overlap beneath the port frame chamfers on all corners and sealing the interior void.
- **Side Girder Geometry Overhaul (Keen Structural Platform Aesthetic)**:
  - Stripped 1,044 old flat stepped side faces from Body.
  - Rebuilt all 4 sides with authentic Keen structural platform geometry with 4-fold symmetry:
    - Symmetrical central bracket (PaintedMetal_Darker, width 1.585 m, depth 111 mm) with 2 recessed triangular pockets and louvers (extracted directly from vanilla Body.001).
    - Top & bottom girder beams (PaintedMetal_Darker) with 45 deg step-up across the bracket junction to the deck edge and smooth S-curves ((0.601, 0.902) down to (1.179, 0.744)) sweeping into deep 300 mm flanges in the outer bays.
    - 45 deg diagonal box-truss struts (160 mm width) extending from the central bracket to the outer flanges.
    - Recessed red armor hull shear wall (PaintedMetal_Colorable) at 80 mm depth behind the frame, with vertical seam decals (Atlas4_Colorable #3) at u = +-1.25 m.
- **Decals Rebuilt & Snapped**:
  - Converted 112 8-sided rivet decals in Decals_Atlas3_Colorable and Decals_Atlas3_Darker to clean 4-vertex quads (44 x 44 mm) with full round UV bounds (0.9399, 0.7520, 0.9990, 0.8105).
  - Corrected all 32 Atlas3 #16 hex-bolt tabs to full vanilla scale (65.5 x 97.4 mm), with flat edge (v0 = 0.6917) flush to the seam and rounded hex-bolt head (v1 = 0.8082) pointing outward away from seam into the plate.
  - Removed empty Decals_Atlas4_Darker mesh object.
  - Ran scripts/decal_snap.py: (0, 0, 0) across all decals (0 broken before, 0 broken after, 0 design faults).
- **LODs, Build Stages & Export**:
  - Rebuilt LOD1 (1,417 faces), LOD2 (956 faces), LOD3 (510 faces), single joined meshes with active materials. Fixed zero-UV coordinates preventing E042.
  - SEUT exported all 7 .mwm files with 0 Error(s), 0 Warning(s) (I007).
  - Verified binary tokens: highlight: NOT FOUND, Conveyor_Yellow: FOUND.
  - Re-rendered icon (.dds 22,020 B and .png 11,311 B) with s.renderToggle = 'on'.
  - Re-rendered 4 orthographic verification views (since deleted, 2026-11-13).
  - Deployed to %APPDATA%\SpaceEngineers\Mods\GVK_Weapons via dotnet build -c Release (0 Warning(s), 0 Error(s)).


## Stage 6 — Direct Vanilla Kitbash of Structural Platform Sides
- **Top and Bottom Decks Preserved**:
  - Retained all heavy turret mount deck geometry on Body (Z >= 1.13 and Z <= -1.13): central octagonal turret mounting ring, 35 mm recessed dark step channel (PaintedMetal_Darker), raised corner heavy armor pads, and sealed 45 deg conveyor opening collars (Z = +-1.135 m).
  - Retained PortTop_section_1 and PortBottom_section_2 with Conveyor_Yellow shutter material and grab rails.
  - Retained conveyor highlight empties (detector_conveyor_1, detector_conveyor_2).
  - Retained all top and bottom deck decals in Decals_Atlas3_Colorable (including round countersunk button heads), Decals_Atlas3_Darker, Decals_Atlas4_Colorable, and Decals_Atlas2.
- **Procedural Side Removal & Direct Vanilla Kitbash**:
  - Removed all 1,100 procedural side faces and custom decal lines from the 4 side faces.
  - Extracted genuine vanilla structural platform geometry directly from Structural_5_platform.fbx (Part_01, Part_05, Part_03, Structural_5_platform, Part_02, Part_04):
    - Authentic 45 deg step-up and smooth S-curve girder geometry (Part_01, PaintedMetal_Darker).
    - Authentic trapezoidal center bracket with two triangular louver pockets and rivets (Part_05, PaintedMetal_Darker).
    - Authentic diagonal truss struts (Part_01, PaintedMetal_Darker).
    - Authentic lower brackets and girder flanges (Part_05 / Part_01).
    - Authentic recessed red armor shear wall (Part_03, PaintedMetal_Colorable).
    - Authentic corner bracket caps (Part_02 & Part_04, PaintedMetal_Darker).
  - Applied 4-fold rotational symmetry across all 4 sides at Y = +-3.75 and X = +-3.75 and merged into Body (2,120 faces total).
- **Direct Vanilla Decals Transfer**:
  - Kitbashed vanilla side decals directly from Part_06 (Atlas3) and Part_07 (Atlas4):
    - Countersunk bolt tabs with correct scale, orientation, and extended bevels (Atlas3_Darker, 192 faces).
    - Authentic seam lines and vents (Atlas4_Colorable 368 faces, Atlas4_Darker 752 faces).
    - Colorable plate rivets (Atlas3_Colorable, 176 faces).
- **SEUT Export, LODs & Deployment**:
  - Rebuilt LOD1 (4,188 faces), LOD2 (4,188 faces), and LOD3 (2,692 faces, decals culled at 100m).
  - Clean export of all 7 .mwm files via SEUT I007 (0 warnings, 0 errors).
  - Rendered updated BC7 .dds (22,020 B) and .png (11,311 B) icons in SEUT icon preview mode.
  - Rendered verification views (kitbash_side_elevation.png, kitbash_iso_front_top.png, kitbash_bracket_closeup.png, kitbash_top_deck.png).
  - Deployed cleanly to %APPDATA%\SpaceEngineers\Mods\GVK_Weapons via dotnet build -c Release (0 warnings, 0 errors).


## Stage 7 — Deck Z-Fighting Fix & Cleanup
- **Root Cause Identified**:
  - In Stage 6, merging Structural_5_platform.fbx introduced redundant horizontal top and bottom deck plates (71 faces per side x 4) at Z = +-1.25 m, which overlapped the original turret mount decks (bloating Z = 1.25 m surface area to 72.88 m^2 vs 48.07 m^2 expected), causing severe surface Z-fighting and obscuring the octagonal turret ring, step channel, and conveyor collar.
  - Additionally, Part_06 and Part_07 included 76 deck border decal faces that sat directly on top of the original deck decals.
- **Decks & Decals Restored**:
  - Fully restored the original 816 deck faces (400 top, 416 bottom) from the pre-kitbash backup.
  - Discarded the redundant Structural_5_platform deck plates, keeping strictly vertical side components (Part_01, Part_05, Part_03, Part_02, Part_04 with |Z| < 0.95 m).
  - Restored the exact original deck decals: 64 Atlas4_Colorable, 72 Atlas3_Colorable (round button heads and corner triangles), 32 Atlas3_Darker (hex-bolt tabs), and 8 Atlas2 stencils.
  - Filtered all kitbashed side decals to strictly |Z| < 0.92 m, removing all 76 leaking deck decals.
- **Verification & Deployment**:
  - Measured coplanar area at Z = +-1.25 m: exactly 48.07 m^2 (0 overlapping faces, 0 Z-fighting).
  - Rebuilt LOD1 (4,024 faces), LOD2 (4,024 faces), and LOD3 (2,864 faces).
  - Exported all 7 .mwm files cleanly via SEUT I007 (0 warnings, 0 errors).
  - Re-rendered BC7 .dds and .png icons in SEUT preview mode.
  - Re-rendered verification views (kitbash_clean_top_deck.png, kitbash_clean_side.png, kitbash_clean_iso.png).
  - Re-deployed cleanly via dotnet build -c Release (0 warnings, 0 errors).

## Stage 8 — Watertight Backing Hull, Endcaps, Decal Realignment & UV Fixes
- **Deck Recessed Pockets Sealed**:
  - Identified 16 open boundary loops (8 at Z = 1.215 on top deck, 8 at Z = -1.215 on bottom deck) lacking floor faces.
  - Built 16 planar floor faces in `PaintedMetal_Darker` with box-projected UVs (`0.05` UV/m, origin `0.37`), eliminating interior void leaks and resolving SEUT `W002`.
- **Solid Armor Backing Hull**:
  - Replaced 4 partial floating sheets of `Part_03` with 44 watertight `PaintedMetal_Colorable` hull quads bridging the top deck outer rim (`Z = 1.045`) to bottom deck outer rim (`Z = -1.045`) at `Y = ±3.60 m`.
  - Mitered all 4 corners across 45° chamfers, completely enclosing the interior void behind trusses, brackets, and cutouts.
- **Girder Ends Capped**:
  - Capped all 8 open 12-vert loops where `Part_01` girder tubes bisect at `X = ±3.75 m` and `Y = ±3.75 m` with planar `PaintedMetal_Darker` endcap faces.
- **Decal Pruning, Realignment & Snapping**:
  - Pruned 112 broken side decal faces with out-of-range UVs and 400 micro-slivers.
  - Reoriented all 16 `Atlas3 #16` countersunk hex bolt tab decals: flat tab edge (`v = 0.6924`) flush with seam line at `|X| = 3.200` or `|Y| = 3.200`, rounded hex bolt socket head (`v = 0.8076`) pointing into deck plate away from seam.
  - Ran `scripts/decal_snap.py`: `0` unsnapped, `0` broken decals.
- **SEUT Export, LODs & Deployment**:
  - Rebuilt `LOD1` (2,396 faces), `LOD2` (1,521 faces), and `LOD3` (668 faces).
  - Exported all 7 `.mwm` files via SEUT `I007` with `0 Error(s), 0 Warning(s)`.
  - Re-rendered `128×128` BC7 `.dds` and `.png` icons in SEUT preview mode.
  - Deployed cleanly to `%APPDATA%\SpaceEngineers\Mods\GVK_Weapons` via `dotnet build -c Release` (`0 Warning(s), 0 Error(s)`).


## Stage 9 — Clean From-Scratch 3x3 Side Kitbash from Vanilla `Structural_5_platform`
- **Root Causes of Stage 6–8 Side Artifacts Diagnosed & Fixed**:
  1. Stages 6–8 had retained Stage 5 procedural side fragments in `Body` instead of kitbashing `Structural_5_platform`'s outer rim step and S-curve girder band, and had clipped `Part_01`/`Part_05` at `±3.75 m` without shifting `5x5` (`±6.25 m`) coordinates to `3x3` (`±3.75 m`), slicing outer brackets in half and colliding upward struts with `Part_04` lower corner gussets.
  2. Stage 8 placed the backing wall at `±3.600 m` (`150 mm` deep) instead of the vanilla `Part_03` depth `±3.650 m` (`100 mm` deep), exposing a `41 mm` gap behind brackets (`3.641 m`), gussets (`3.636 m`), and struts (`3.604 m`).
  3. On the top/bottom decks, 8 conveyor port corner floor faces (`faces 0, 2, 4, 6` and `176, 178, 180, 182`) and 16 extended-bevel bolt-tab decals had inverted face normals (`normal.z` pointing inward), causing backface-culled holes at the conveyor port corners and invisible bolt tabs.
- **Clean 5x5-to-3x3 Piecewise Side Kitbash (`Body`, `2,744` faces)**:
  - Preserved 100% of the top and bottom turret mounting decks (`|Z| > 1.13 m`, `|X|, |Y| <= 3.440 m`), central yellow conveyor ports (`PortTop_section_1`, `PortBottom_section_2`), and deck decals; flipped all 8 inverted conveyor port corner floor normals and 16 bolt-tab decal normals outward.
  - Kitbashed `Structural_5_platform`'s `888` side/bevel/S-curve girder faces and `80` corner/notch rim fan faces with piecewise coordinate mapping (`|t| > 5.45 -> ±2.50 m`, `|t| > 0.10 -> ±2.25 m`) and affine UV gradient preservation (`0.40` UV/m, zero UV shear), bridged cleanly to the `|X|, |Y| = 3.440 m` deck perimeter at `Z = ±1.250 m`.
  - Kitbashed `Part_03` recessed backing walls at the exact vanilla `±3.650 m` depth (`Z ∈ [-0.90, +0.90]`), sealing all bracket, gusset, post, and strut backs with zero air gaps.
  - Kitbashed `Part_02` corner posts (`4 × 98` faces), `Part_04` lower corner gussets (`4 × 35` faces), `Part_01` top/bottom chamfer trim rings (`2 × 33` faces), `Part_05` truss brackets (`3` per side: Left Upper at `-1.75 m`, Center Lower at `0.00 m`, Right Upper at `+1.75 m`, `100%` unscaled and uncut), and `Part_01` diagonal struts (`4` per side: `/ \ / \`, with top and bottom miter feet shifted in lockstep with their host brackets/gussets).
  - Kitbashed all side decals from `Part_06` (`Atlas3_Darker` louvers/rivets, `Atlas3_Colorable` backing-wall accents) and `Part_07` (`Atlas4_Darker` bracket/gusset borders, corner girder tips, and `124` girder step seam faces; `Atlas4_Colorable` wavy backing-wall seams) in exact lockstep with their host geometry.
- **SEUT Export, LODs & Deployment**:
  - Rebuilt `LOD1` (`3,411` faces), `LOD2` (`1,759` faces), and `LOD3` (`721` faces) with all 10 materials populated.
  - Exported all `.mwm` files via `bpy.ops.scene.export()` (`0 Errors, 0 Warnings`), re-rendered `128×128` BC7 sRGB `.dds` and `.png` icons, and deployed to `%APPDATA%\SpaceEngineers\Mods\GVK_Weapons` via `dotnet build -c Release`.
