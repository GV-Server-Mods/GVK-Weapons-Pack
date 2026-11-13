# Heavy Turret Mount Plate (`GVK_HeavyTurretMount_3x3x1`) — Design Brief

## 1. Block Overview & Contract

| Property | Value | Notes |
|---|---|---|
| **SubtypeId** | `GVK_HeavyTurretMount_3x3x1` | Large-grid heavy armored turret foundation & conveyor adapter |
| **DisplayName** | `Heavy Turret Mount Plate` | `TypeId: Conveyor` |
| **Grid Size** | `3 × 3 × 1` Large Grid | `7.50 m × 7.50 m × 2.50 m` (`X, Y ∈ [-3.75, +3.75]`, `Z ∈ [-1.25, +1.25]`) |
| **Integrity Profile** | `140,310`: components are 9× the Buster Armored Conveyor (`MA_Buster_Conveyor`), critical component Motor, build time 187 s (GVK weld-time formula, integrity ÷ 750; `tools/apply_build_time.js`) (owner, 2026-11-07; was `148,500`, 1.0× Heavy Armor density across 9 cells) | Registered in `GVK_BusterArmor` (`Heavy`, `1.00f` Kinetic / `1.00f` Energetic) |
| **Symmetry** | `D4h` (4-fold horizontal `±X / ±Y` + reflection across `Z = 0`) for geometry & trim decals; asymmetric `Atlas2` signs/stencils | Top (`+Z`) and Bottom (`-Z`) faces are identical turret mounting decks |
| **Conveyor Ports** | **2 ports total**: Top center `(0, 0, +1.25)` and Bottom center `(0, 0, -1.25)` | **Zero side conveyor ports**; all 4 sides are solid structural truss + heavy armor bulkheads |
| **Mount Points** | All 6 faces (`+Z, -Z, +X, -X, +Y, -Y`) fully mountable | Nothing protrudes past `±3.75 m` (`X/Y`) or `±1.25 m` (`Z`) |

## 2. Kitbash & Asset Reuse Plan

- **Conveyor Ports (`×2`)**: Kitbashed `detector_conveyor_section_001` from `<ModSDK>\OriginalContent\Models\Cubes\large\Structural_5_platformConveyor.fbx`:
  - `PortTop_section_1` at `+Z` (`Z ∈ [+0.9631, +1.2500]`, `X, Y ∈ [-0.6804, +0.6804]`) with `detector_conveyor_1` highlight empty.
  - `PortBottom_section_2` at `-Z` (`Z ∈ [-1.2500, -0.9631]`, rotated `180°` around `X`) with `detector_conveyor_2` highlight empty.
  - Materials remapped to clean library `PaintedMetal_Yellow`, `Metal_Dull`, and `Conveyor`. Custom normals preserved.
- **Procedural Heavy Structural Hull (`Body`)**:
  - Built in `Main (GVK_HeavyTurretMount_3x3x1)` under root empty `GVK_HeavyTurretMount_3x3x1`.
  - Materials: `PaintedMetal_Colorable` (~55–68% area) and `PaintedMetal_Darker` (~25–35% area).
  - Bevels: `30 mm` (`0.030 m`) 45° outer armor edge chamfers, `30 mm` 3-facet vertical corner rounds, `10–12 mm` (`0.010–0.012 m`) 1-facet 45° chamfers on structural beams, gussets, trusses, and armor steps.
  - Normals & UVs: `shade_smooth_by_angle(angle=30°)` + `WeightedNormal(mode='FACE_AREA', weight=100, keep_sharp=True)`; box-projected UVs at `0.40 UV/m` (`origin=0.37`).

## 3. Coordinate System & Layer Stack

### 3.1 Top (`+Z`) and Bottom (`-Z`) Turret Decks (`|X| ≤ 3.75 m, |Y| ≤ 3.75 m`)

Both `Z = +1.250 m` and `Z = -1.250 m` share the exact same profile mirrored across `Z = 0`:

1. **Central Octagonal Turret Deck (`T0-A`, `PaintedMetal_Colorable`, `|Z| = 1.250 m`)**:
   - Square `|X| ≤ 3.250, |Y| ≤ 3.250` with `45°` corner cuts `|X| + |Y| ≤ 5.650`, plus 8 joint clamps across the perimeter channel.
   - **Joint clamps** (owner's pick over deck-plate tongues, 2026-11-07). They replace Gemini's floating step-tabs (`|u| ∈ [1.450, 1.850]` reaching `|v| = 3.330`). Each is centred on vanilla's rim joint (`|u| = 1.492 ± 0.200`) and spans the channel from the deck plate (`|v| = 3.242`) to the rim's inner edge (`3.4405`), top flush with the deck, with 8 mm chamfered ends. Vanilla's joint line runs across it, with a rim bolt each side 110 mm from the line. Built by `tools/step_tabs.py` (`apply("clamp", ...)`). Vanilla's joint line is two half-groove wedges that taper to nothing at `|v|` 3.04, so it faded out past the deck plate's outline seam (owner, 2026-11-07). It now runs at full width and ends in a pointed T-join on that seam's centre line (`point_joint_line`).
2. **Outer Corner Armor Pads (`T0-B`, `PaintedMetal_Colorable`, `|Z| = 1.250 m`) & Clamping Strips (`T0-C`)**:
   - Corner pads at `|X|, |Y| ∈ [2.600, 3.720]` (`|X| + |Y| ≥ 5.800`) and edge clamping strips along `|v| ∈ [3.430, 3.720]` with `30 mm` outer bevel to `3.750 m`.
3. **Recessed Perimeter Step Channel (`T1`, `PaintedMetal_Colorable`, `|Z| = 1.215 m`) & Corner Shear-Lug Pockets (`T2`, `PaintedMetal_Darker`, `|Z| = 1.215 m`)**:
   - `35 mm` deep sloped channel separating the central octagonal deck from the outer armor rim, with 4 dark `PaintedMetal_Darker` shear-lug pockets in the `45°` diagonal channels at `(±2.420, ±2.420)`.
4. **Center Conveyor Moat & Collar (`T3`, `PaintedMetal_Darker`, `|Z| = 1.250 → 1.140 m`)**:
   - Octagonal chamfered moat (`|X|, |Y| ≤ 0.850 m`, `|X| + |Y| ≤ 1.450 m` at `|Z| = 1.250 m`, sloping at `45°` down to `|X|, |Y| ≤ 0.740 m` at `|Z| = 1.140 m`) housing the `1.360 m × 1.360 m` conveyor port.

### 3.2 Side Faces: Option A, reinforced vanilla Structural Platform truss (owner, 2026-11-07)

This replaces Gemini's side design, kept below as history. The owner picked it from a set of layout mockups.

**Style.** The sides follow the vanilla `Structural_5_platform`, chosen on purpose for a vanilla look, but read as more reinforced, since the block is meant for turrets. Kitbash Keen's parts and change only what is listed here.

**Lines that must match vanilla.** A mount placed next to a vanilla platform must line up with it, so these stay at vanilla's heights and depths (measured on the imported vanilla model, 2026-11-07):
- rim band: `|z|` 0.914 to 1.250, at the face; between the S-curve and the corner it drops as a deep flange to 0.735
- girder: `|z|` 0.756 to 0.904, 25 mm in
- bracket roots: `|z|` 0.902
- backing wall: 100 mm in

**Layout (each side, `u` along the side).**
- Top brackets at `u = ±1.75` and a bottom bracket at `u = 0`, in a mirror-symmetric W.
- End struts land on end gussets with their chamfer centre at `u = ±3.05`.

**Brace angle.** Keen's struts meet the brackets' 45° chamfers square on, so the angle depends only on bracket spacing and depth. With a 1.75 m spacing, vanilla's 45.3° needs the brackets and end gussets to hang about 127 mm deeper. Their chamfer centres move from `|z|` 0.5565 to about 0.430. Stretch the straight part of each bracket; keep the chamfers and the bracket width (1.202 m) as vanilla. The struts stay vanilla's 0.325 m wide bar, about 0.355 m shorter, cut across the straight middle.

**Reinforcement layer.** Below each girder, a doubler plate fills `|z|` 0.629 to 0.772 between the corner columns, its face 40 mm in (15 mm behind the girder face), with a 10 mm bevel on its open edge. Its top is hidden behind the girder, so the girder's lower edge at 0.756 stays a visible step, which continues vanilla's line. The doubler carries no decals (owner, 2026-11-07).

**Corner columns.** Vanilla's corner post, widened from 0.18 to 0.30 m on each face, at each of the 4 corners. Its foot rises 127 mm with the deeper end gusset, which butts into it.

**Top flange.** The top S-curve moves with the top bracket (2.25 m in from vanilla's), the corner with the corner (2.5 m), so the deep top flange between them is 0.25 m shorter than vanilla's. The bottom S-curve keeps vanilla's distance from the corner.

**Materials and decals.** Vanilla's: frame `PaintedMetal_Darker`, backing wall `PaintedMetal_Colorable`. The vanilla bracket vents and panel lines come from Part_06 and Part_07, laid again on the moved and stretched parts.

**Bracket and gusset decals** (fixed after the owner's markups, 2026-11-07). The first build moved each connected decal piece whole, which broke the stretched frames. One piece of the top-right bracket's frame (side plus chamfer) dropped 127 mm and left a gap under the top line. The gusset's cut ran through its chamfer line, and the vents dropped away from the bracket root. Now:
- frame lines (`Atlas4`) stretch vertex by vertex, with the plate's own cut: brackets at `|z|` 0.80, gussets at -0.68, just under the chamfer line's foot (-0.670), so each chamfer line moves whole
- vents and bolts move whole; those by the root (bracket `|z|` > 0.62, gusset z < -0.50) keep vanilla's place, so the vents sit where vanilla's do and the bolts by the free edge follow it
- the builder records line edges the stretch would shear in `SHEARS` (it must stay empty on Main and every LOD)

**Smoothing.** The sides keep Keen's own custom normals, which bend on faces next to bevels as vanilla does. The 130 faces bent 30-53° in Gemini's version are gone from the sides. On the deck, the port moat's 45° slopes (150 mm across) shaded as a gradient from deck to wall; `tools/fix_deck_normals.py` makes them flat and runs the thin strips that continue them into them (96 corners, 2026-11-07). The deck's other 11 mm bevel strips keep Gemini's Keen-style weighting: upper corners take the deck's normal, lower corners the wall's.

**Builder.** `tools/build_sides_optionA.py` rebuilds the sides from the vanilla platform imported by SEUT into scene `KB_Platform`, as object `SideA` in scene `SideA_Build`. It cuts vanilla's flat faces at the deck edge and the corner diagonals, moves each part by the cut-and-shift map above, keeps texel density across stretched faces without UV seams, moves compact decals whole (only long panel lines stretch; brackets and gussets as above), and records any face the map turns over in `FOLDS` (it must stay empty). Checked 2026-11-07: no folded faces, no UV seams, no flipped normals, texel density as vanilla's (0.40 UV per metre). The only see-through gap is a slot at grazing angles under the top flange, which vanilla has in the same place.

**Installed.** `tools/install_sides.py` puts `SideA` into the model (2026-11-07): in `Body` and each `Decals_<material>` object it keeps only the deck faces (every vertex within 3.4405 m of the centre in X and Y, and `|z|` ≥ 1.12) and adds the side faces of that object's materials, keeping custom normals. Gemini's 24 rim-top decals went with the old sides; vanilla's rim decals came in with the new ones. Checked after the merge: no holes from above, below or the side eyes (the grazing slot above aside); the model reaches 3.752 m (decals 3.757 m), the same 2 mm and 7 mm overhang vanilla has past its 6.25 m. Gemini's deck lip stopped at 3.44 m, 0.5 mm short of the rim's inner edge, which left a see-through slit round both decks. `install_sides.close_rim_slit()` moves the lip onto the rim edge (72 vertices, 2026-11-07). Afterwards a 2 cm ray grid from above and below hit everywhere.

**Bay-wall decals.** `tools/build_bay_decals.py` copies vanilla's bay-wall decals onto the mount. The owner picked (2026-11-07) vanilla's panel line and tabs, without the doubler line (option 3 minus option 1 of the decal mockups):
- the panel line (`Atlas4_Colorable`, on the wall 1 mm out) dips to z 0.45-0.475 across the middle as vanilla's does, and its ends rise into the doubler's shadow at |x| 2.75-2.95
- tabs (`Atlas3_Colorable`) hang from the doubler at bay midpoints: top at x = 0, bottom at x = ±1.75

The doubler's lower edge (0.629) continues vanilla's second line (0.621-0.648) next door. Pipeline, each step rerunnable: `build_sides_optionA.build()`, `build_bay_decals.add_to_side()`, `install_sides.install()` (it also closes the rim slit), `step_tabs.apply("clamp", "Body", "Decals_Atlas3_Colorable", "Decals_Atlas4_Colorable")`, `deck_seams.apply()`, `durability_decals.install()` (section 3.3), `fix_deck_normals.fix()` (on the current model it changes no corner normals), then the decal snap, LODs and build stages (section 5).

### 3.2-old Side Faces (Gemini, superseded 2026-11-07) — 3-Bay Heavy Truss & Center Bulkhead (`7.50 m × 2.50 m`)

Each side face (`u ∈ [-3.75, +3.75]`, `z ∈ [-1.25, +1.25]`, inset depth `d ≥ 0` from `3.750 m`) is divided into three `2.50 m` bays:

1. **Top & Bottom Armor Deck Rim Flanges (`S0-A`, `PaintedMetal_Colorable`, `d = 0.000 m`)**:
   - Flush armor flanges (`|z| ∈ [1.070, 1.250]`, thickened to `|z| ∈ [1.040, 1.250]` across the center bay `u ∈ [-1.430, +1.430]` and outer corners `|u| ∈ [3.150, 3.720]` with `45°` steps).
2. **Perimeter Structural Frame (`S1-A..C`, `PaintedMetal_Darker`, `d = 0.020–0.025 m`)**:
   - Continuous horizontal frame rails (`|z| ∈ [0.840, 1.070]`), outer corner columns (`|u| ∈ [3.530, 3.725]`), and heavy vertical center-bay stanchions (`|u| ∈ [1.070, 1.430]`, with `100 mm × 20 mm` vertical recessed slots centered on `u = ±1.250 m`).
3. **Outer Truss Bays (`|u| ∈ [1.430, 3.530]`, `z ∈ [-0.840, +0.840]`)**:
   - **Gusset Plates (`S2-A..C`, `PaintedMetal_Darker`, `d = 0.015 m` / `0.035 m`)**: Heavy trapezoidal gussets at bottom-outer (`|u| ∈ [2.85, 3.56], z ∈ [-0.96, -0.42]`) and top-inner (`|u| ∈ [1.39, 2.22], z ∈ [+0.42, +0.96]`), plus secondary corner gussets.
   - **Diagonal Box-Truss Struts (`S3-A`, `PaintedMetal_Darker`, `d = 0.035 m` flanges / `0.060 m` web)**: `0.320 m` wide box-truss struts angled at `45°` from `(|u| = 3.200, z = -0.680)` to `(|u| = 1.840, z = +0.680)`.
   - **Recessed Armor Wall Panels (`S4-A`, `PaintedMetal_Colorable`, `d = 0.150 m`)**: Solid armored backing wall behind the trusses and gussets (watertight, zero daylight leaks).
4. **Center Heavy Armor Bulkhead Bay (`u ∈ [-1.070, +1.070]`, `z ∈ [-0.840, +0.840]`)**:
   - **Corner Gussets (`S5-A`, `PaintedMetal_Darker`, `d = 0.035 m`)**: 4 `45°` triangular gussets (`0.420 m × 0.420 m`) at the 4 corners of the center bay.
   - **Center Bulkhead Plate (`S5-B`, `PaintedMetal_Colorable`, `d = 0.075 m`)**: Solid heavy armor plate standing `75 mm` proud of the outer bay walls.
   - **Recessed Shear-Frame Collar (`S5-C`, `PaintedMetal_Darker`, `d = 0.095 m`) & Raised Armor Shear Bolster (`S5-D`, `PaintedMetal_Colorable`, `d = 0.045 m`)**: Octagonal `1.200 m × 0.880 m` heavy armor cap (`30 mm` thick, `12 mm` edge chamfers) set inside a dark chamfered moat collar.

### 3.3 Deck layout, seams and durability decals (owner, 2026-11-07)

The owner found the deck cluttered ("shotgun blasted") and picked layout A from the deck mockups (A clean over C, which added a bolt circle round the seat):
- **Dropped**: Gemini's 8 quadrant hatch panels, 4 arm hatches and 4 small corner vents, on each deck (`durability_decals.DROP`).
- **Kept**: the seat's trapezoid bars and pointer arrows, the channel vents, and vanilla's rim bolts.
- **Tie-downs**: 8 clamp bars per deck (`Atlas3_Colorable` piece 18, 280 × 218 mm). Two per side, square to the edges, in line with the seat's sides (`|u|` 0.95) and halfway from the seat to the block edge (`|v|` 2.35). They use the deck's paint, so they read as raised cleats (the dark version read as vents).
- **Riveted bands, removed**: 50 mm bands (`Decals_Atlas_A_01` piece 59) ran down the corner columns and across the rim joints for a few hours. The owner rejected them the same day: they were "randomly stuck onto the sides", ran to no seam or line, and don't belong on a truss block. Don't add them back.

**Seams** (`tools/deck_seams.py`; the owner asked for every junction mitred). Gemini's seams were single quads with square ends that overlapped at every join. They are now:
- the seat ring and the deck plate's outline, each a closed octagon mitred at every corner
- 8 radial seams between them, with a pointed T-join at each end (the skill's "Joins and ends" rule)
- **Corner plates** (top deck): vanilla's rim lines at `|u|` 3.02 stopped in the middle of Gemini's corner pads. Each pair now closes into one outline with a 60 mm 45° chamfer, and each plate has a fourth bolt at its inner corner.

Atlas4's groove is lopsided, so V1 faces the inside of each outline and +X or +Y on the radials. Decals write no depth, so overlaps follow draw order: the outlines come first in the mesh, and stems sit 1 mm higher.

**Builders.** `durability_decals.install()` makes `Decals_Durability_Atlas3_Colorable` (the tie-downs) in Main, parented to Body, and deletes the old band object if present. Pipeline order after `install_sides.install()`: `step_tabs.apply(...)`, `deck_seams.apply()`, `durability_decals.install()`, then `fix_deck_normals.fix()` and section 5. All are rerunnable.

## 4. Decal Plan (`Atlas4`, `Atlas3`, `Atlas2`), Gemini's (deck partly superseded by 3.3)

All decals sit `1.5 mm` (`0.0015 m`) off their host surfaces (`2.5 mm` for overlapping pointed T-stems) and are snapped to the half-float grid via `decal_snap.py`:

- **Top & Bottom Decks (`±Z`, symmetric)**:
  - `Atlas4_Colorable` #3 (`16 mm` wide): Octagonal ring around the center moat (`|X|, |Y| = 0.880 m`), outer deck ring (`|X|, |Y| = 3.195 m`), and 4 radial cell-division lines along `X = ±1.250 m` and `Y = ±1.250 m` with pointed T-caps.
  - `Atlas3_Colorable` #29: 4 triangular corner plates (`0.620 m × 0.620 m`) on the outer corner pads (`T0-B`).
  - `Atlas3_Colorable` #36: 4 trapezoid bars (`0.420 m × 0.052 m`) flanking the center moat.
  - `Atlas3_Colorable` #16 & #14: 16 hex-bolt tabs along step edges + 24 sunken round bolts at pseudo-random angles.
  - `Atlas3_Darker` #24: 4 slatted vents (`0.280 m × 0.134 m`) inside the dark corner shear-lug pockets (`T2`).
  - `Atlas2` #7: 4 white centerline pointer triangles (`0.065 m × 0.042 m`) at `(±1.150, 0)` and `(0, ±1.150)`.
- **Side Faces (`±X, ±Y`, symmetric mechanical trim + asymmetric `Atlas2` markings)**:
  - `Atlas3_Darker` #33, #24, #20, #16, #14 + `Atlas4_Darker` #3 on gussets and vertical stanchion slots.
  - `Atlas4_Colorable` #3 + `Atlas3_Colorable` #36, #24 on outer-bay recessed armor walls (`S4-A`).
  - `Atlas4_Colorable` #3 + `Atlas3_Colorable` #32, #36, #14 on the center heavy-armor bulkhead (`S5-B`) and raised bolster (`S5-D`).
  - `Atlas2` asymmetric signs/stencils: `#52` (`AMMUNITION`) + `#41` (`MXS-2859-B`) on Front (`-Y`); `#17` (`CAUTION MOVING PARTS`) on Back (`+Y`); `#49` (`20124D0000E4`) on Left/Right (`±X`).

## 5. Decal snap, LODs, build stages and export (Claude, 2026-11-07)

These replace Gemini's LODs and build stages (`build-log.md`, stages 3 to 9), which were made for the old sides. The owner asked for this stage on 2026-11-07. Everything is rebuilt by tools in `tools/`, after the Main pipeline in section 3.2.

**Decal snap.** The skill's `decal_snap.py` runs on Main, then on each LOD and build stage. It moves each decal onto the game's vertex grid (about 2.9 mm at this size), so the game's rounding can't push it into its surface. On Main it fixed 1,184 of the 1,264 triangles the rounding would have broken. The 80 left are all on vanilla's own rim-joint lines, which wrap over the edge bevel within 0.12 mm of the surface (Keen's placement). After the deck rebuild (section 3.3) the snap left 8 on Main, all `Atlas4_Darker`, and 32 on LOD1. Not chased; probably vanilla's bevel wraps again.

**LODs** (`tools/build_lods.py`; 10 / 45 / 90 m, vanilla's platform distances):
- The sides come from vanilla's own LOD meshes: `build_sides_optionA.build()` runs on vanilla's `Structural_5_platform_LOD1..3`, imported by SEUT into scenes `KB_LOD1..3`. LOD3's parts carry other names, and its band needs a lower shift cut (`LOD3` settings in the builder).
- The deck stays at full detail; it is only 232 faces.
- Decals follow vanilla's levels: LOD1 keeps them all, LOD2 keeps the lines and dark panels plus the bay panel line, and LOD3 has none.
- Ports: Main's at LOD1, and Gemini's reduced LOD2 port (scene `LOD_Parts`) at LOD2 and LOD3. Gemini's LOD3 port stopped 2 cm short of the deck opening.
- Faces: Main 8,440; LOD1 4,624; LOD2 2,992; LOD3 1,060. Each LOD's deck is closed (a 4 cm ray grid hit everywhere).

**Build stages** (`tools/build_stages.py`; 0.33 / 0.66 / 1.00 in the SBC, unchanged):
- BS1 and BS2 are vanilla's platform stages (`Structural_5_platformConstruction_1/2`, scenes `KB_BS1`, `KB_BS2`), cut from 5 × 5 cells to 3 × 3. The centre, edge and corner cells stay, and the outer cells move 2.5 m in. Vanilla's scaffold repeats per cell, so its beams meet across the cut. The conveyor platform's stages were tried first and rejected, because they show port frames on the sides.
- BS3 is Main in `Construction`, with its Atlas4 lines in `Atlas4_Chrome` and the other decals dropped (`Paneling*` too, since 2026-11-07; before then a `Paneling` decal would have become a solid `Construction` quad). That is how vanilla's `Construction_3` is made.
- Every stage fills the block's full outline. Faces: 12,200 / 10,024 / 7,984.

**Collision.** Gemini's single box `Collision_Main` (7.5 × 7.5 × 2.5 m) is kept. The export now puts it inside the main `.mwm`, so the separate `.hkt.mwm` is gone.

**Export** (SEUT, `export_sbc_type = 'none'`, so the SBC's hand edits stay; I007). SEUT's collision step fails with "Cannot edit hidden object" while the Collision collection or object is hidden in the viewport, so the export unhides them and hides them again afterwards. Checked in the files:
- the main `.mwm` holds `HavokCollisionGeometry` and `detector_conveyor_1/2`
- the LOD links read `Models\Cubes\large\..._LODn`
- each file has the expected materials

`dotnet build -c Release` deployed the files, and the deployed copies are byte-identical. Not tested in game yet. The icon was re-rendered on 2026-11-07 with the scene's saved SEUT settings (full colour), in a background Blender (the skill's `icon_render_bg.py`, then SEUT's texconv preset, BC7 sRGB).
