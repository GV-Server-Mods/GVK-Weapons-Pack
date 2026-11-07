# Heavy Turret Mount Plate (`GVK_HeavyTurretMount_3x3x1`) — Design Brief

## 1. Block Overview & Contract

| Property | Value | Notes |
|---|---|---|
| **SubtypeId** | `GVK_HeavyTurretMount_3x3x1` | Large-grid heavy armored turret foundation & conveyor adapter |
| **DisplayName** | `Heavy Turret Mount Plate` | `TypeId: Conveyor` |
| **Grid Size** | `3 × 3 × 1` Large Grid | `7.50 m × 7.50 m × 2.50 m` (`X, Y ∈ [-3.75, +3.75]`, `Z ∈ [-1.25, +1.25]`) |
| **Integrity Profile** | `148,500` (`1.0×` Heavy Armor density across 9 cells) | Registered in `GVK_BusterArmor` (`Heavy`, `1.00f` Kinetic / `1.00f` Energetic) |
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
   - Square `|X| ≤ 3.250, |Y| ≤ 3.250` with `45°` corner cuts `|X| + |Y| ≤ 5.650`, plus 8 outward step-tabs (`|u| ∈ [1.450, 1.850]` reaching `|v| = 3.330`).
2. **Outer Corner Armor Pads (`T0-B`, `PaintedMetal_Colorable`, `|Z| = 1.250 m`) & Clamping Strips (`T0-C`)**:
   - Corner pads at `|X|, |Y| ∈ [2.600, 3.720]` (`|X| + |Y| ≥ 5.800`) and edge clamping strips along `|v| ∈ [3.430, 3.720]` with `30 mm` outer bevel to `3.750 m`.
3. **Recessed Perimeter Step Channel (`T1`, `PaintedMetal_Colorable`, `|Z| = 1.215 m`) & Corner Shear-Lug Pockets (`T2`, `PaintedMetal_Darker`, `|Z| = 1.215 m`)**:
   - `35 mm` deep sloped channel separating the central octagonal deck from the outer armor rim, with 4 dark `PaintedMetal_Darker` shear-lug pockets in the `45°` diagonal channels at `(±2.420, ±2.420)`.
4. **Center Conveyor Moat & Collar (`T3`, `PaintedMetal_Darker`, `|Z| = 1.250 → 1.140 m`)**:
   - Octagonal chamfered moat (`|X|, |Y| ≤ 0.850 m`, `|X| + |Y| ≤ 1.450 m` at `|Z| = 1.250 m`, sloping at `45°` down to `|X|, |Y| ≤ 0.740 m` at `|Z| = 1.140 m`) housing the `1.360 m × 1.360 m` conveyor port.

### 3.2 Side Faces (`+X, -X, +Y, -Y`) — 3-Bay Heavy Truss & Center Bulkhead (`7.50 m × 2.50 m`)

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

## 4. Decal Plan (`Atlas4`, `Atlas3`, `Atlas2`)

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
