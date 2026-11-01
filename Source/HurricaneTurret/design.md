# Hurricane Turret: design document

Status: draft for owner review. Concept art: `concept_art.webp` (three-quarter front view: yellow box gunhouse
with a dark rear bustle, twin long barrels with slotted muzzle brakes coming out of black mantlet cones on a
banded trunnion drum, round base disc, roof periscope, roof vent and sensor dome). Style references from the
owner's Griffin turret: `ref_griffin_base.webp` (plinth style) and `ref_griffin_xpanels.webp` (X-triangle
panels).

## Intent

New GVK model for the Hurricane 480 mm turret, replacing the AWE model. Both `ARYXHurricaneCannon` and
`ARYXHurricaneCannon_NPC` switch to it. SubtypeIds, block size, mount points, conveyor ports and every name
WeaponCore reads stay the same, so placed turrets and the CoreParts definition keep working.

## Fixed by the block it replaces

Read from `CubeBlocks_Ballistics_HeavyCannons.sbc`, `Ballistics_HeavyCannon_Weapons.cs`,
`Ballistics_HeavyCannon_Animations_Hurricane.cs` and the dummies in the old `.mwm` files.

| Item | Value |
|---|---|
| Grid, block type | Large, `LargeMissileTurret` under WeaponCore |
| Size | 5 x 3 x 5 cells (12.5 m wide, 7.5 m tall, 12.5 m deep). In SEUT: `bBox_X` 5, `bBox_Y` 5, `bBox_Z` 3 |
| Mount points | Whole bottom face, plus the bottom row (5 x 1) of front, back, left and right |
| Conveyors | 5 ports: bottom centre, and the bottom row centre cell of each side |
| Azimuth part | `subpart_MissileTurretBase1` |
| Elevation and muzzle part | `subpart_MissileTurretBarrels` |
| Recoil parts | `subpart_salvo_barrel_1` (left), `subpart_salvo_barrel_2` (right), on the elevation part. Firing animation: 2 m back in 5 ticks, back out over 70 ticks, along the part's +Z |
| Muzzles | `muzzle_projectile_1`, `muzzle_projectile_2` on the elevation part; `Scope` = `muzzle_projectile_1` |
| Camera | `camera` on the elevation part (manual-control view) |
| Elevation | -5 to +45 degrees (WeaponCore `HardWare`) |
| Old geometry | Elevation pivot 5.5 m above the mount face, barrels 2.54 m apart, muzzles 12.4 m ahead of the pivot (12.7 m ahead of the block centre, 6.5 m past the front face) |

## Owner decisions (settled)

1. Base: a 1-cell plinth in the style of a widened vanilla large cargo container, like the Griffin base
   (`ref_griffin_base.webp`): framed edges, corner posts, paintable bays, a yellow conveyor port with a keypad
   on each side. Keeps the old side mount points and all 5 conveyor ports.
2. Barrels: about the old reach. The azimuth axis sits forward on the gunhouse (the gunhouse sits behind the
   axis) so the long barrels from the art barely reach further than the old ones.
3. Mantlet lamps: vanilla `Emissive` material, state colours from the `Default` preset (green working, red
   off, dark damaged).
4. Paint: the gunhouse takes the player's paint (`PaintedMetal_Colorable`), with dark trim.
5. Debossed X-triangle panels (`ref_griffin_xpanels.webp`) on the plinth side bays and the rear bustle, as
   decals. Not on the gunhouse sides.
6. Decals for large and small features alike. Geometry only where it gives silhouette, grazing light,
   collision or glow, or comes from a vanilla part.
7. Gunhouse collision: one cylinder on the azimuth axis (see Collision).
8. SBC: `AiEnabled` false.
9. Dedicated build stages for this block. The MAC that also uses `XL_HalfBlock_BS1/2` gets its own stages
   after this weapon is done (see Follow-ups).
10. Check progress often: render and compare at every checkpoint below, not only at the end.
11. V-groove panel lines on the main painted gunhouse panels, and weld line decals around the big mechanical
    parts (see Panel lines and weld lines).
12. Description: drop "Manufactured by AWE."; this is the owner's turret now.
13. Elevation: -10 to +45 degrees (was -5 to +45).
14. Superfiring: a second Hurricane one block higher and directly behind fires forward over this one, better
    than the old model did (see Superfiring).

## Layout

Front is Blender -Y; the block's left is +X. Heights are above the mount face (Blender Z = height - 3.75).
"Ahead" is distance in front of the azimuth axis (the block centre). Every value is a blockout target, to
be iterated on silhouette renders before any detail.

| Part | Height (m) | Ahead (m) | Moves with | Notes |
|---|---|---|---|---|
| Plinth | 0.00 to 2.50 | -6.25 to 6.25 | fixed | Widened cargo container, see Plinth below |
| Base disc | 2.50 to 2.85 | | fixed | 10.5 m across, raised rim ring; azimuth pivot on its centre at 2.85 |
| Feed trunk | 2.85 to 3.20 | | fixed | Central armoured column inside the bearing ring, visible in the gap under the gunhouse (ammo path) |
| Bearing ring | 2.85 to 3.20 | | azimuth | 7.0 m across, dark, with roller posts (the art's dark ring under the gunhouse) |
| Gunhouse | 3.20 to 6.80 | -4.6 to 2.6 | azimuth | 7.0 m wide; sides lean in a little toward the roof; flat roof; side cheeks run forward past the embrasure with angled front edges |
| Rear bustle | 3.40 to 6.60 | -5.8 to -4.6 | azimuth | Dark, angled faces (the art's mark 1), rear face about 4 m wide; farthest corner 6.1 m from the axis |
| Embrasure | 4.10 to 6.80 | 1.0 to 2.6 | azimuth | Opening between the cheeks, 5.4 m wide, cut back into the roof's front edge so the gun shields clear at +45; dark sill below |
| Trunnion axis | 5.20 | 1.0 | (axis) | Left to right; elevation pivot. Higher than the art's (about 4.8) for superfiring |
| Trunnion drum | 4.30 to 6.10 | 0.1 to 1.9 | elevation | 1.8 m across, 5.4 m long; banded segments, paintable bands with dark rims; centred on the axis so it never clips |
| Mantlet cones | 4.40 to 6.00 | 1.9 to 3.4 | elevation | x = +-1.5; 1.6 m across at the drum, 0.85 m at the tip; dark |
| Gun shields | 5.50 to 6.30 | 1.0 to 2.6 | elevation | Dark wedge plate over each cone, reaching back over the drum |
| Mantlet lamps | about 6.05 | about 2.4 | elevation | One small lens on top of each cone, `Emissive` |
| Barrels | 5.20 axis | 3.4 to 13.5 | recoil part | x = +-1.5 (3.0 m apart, art ratio); 0.7 m across, a collar ring by the cone; each barrel mesh runs 2.3 m back into the cone so the 2 m recoil never shows its end |
| Muzzle brakes | 5.20 axis | 11.9 to 13.5 | recoil part | 0.9 m across, 1.6 m long, 4 slots per side cut as geometry (silhouette, and decals break on curved faces); shallow dark bore recess, no rifling. At -10 degrees their undersides sit 2.6 m above the mount face, clear of a one-block wall in front |
| Muzzle dummies | 5.20 | 13.5 | elevation | Barrel tips at rest, +Y along the barrel (0.8 m further than the old muzzles, 7.25 m past the front face) |
| Camera dummy | about 6.30 | about 1.9 | elevation | Centred between the cones on top of the drum, looking forward |
| Periscope | 6.80 to 7.10 | about 1.6 | azimuth | Roof front-left, centre x = +2.3 (outside the barrel lanes), small housing with an `Emissive` lens |
| Sensor dome | 6.80 to 7.20 | about -4.0 | azimuth | Roof rear-right, centre x = -2.6 (outside the barrel lanes), chrome cylinder with a dome cap and a dark glass lens |
| Side sensor boxes | about 5.0 | about 2.0 | azimuth | Small dark angled box on each side cheek, symmetric |

Sweep limits for the azimuth part: nothing farther than 6.2 m from the axis, so the gunhouse never leaves
the block's footprint.

## Superfiring

Target: a second Hurricane one block (2.5 m) higher and directly behind fires forward over this one.

- WeaponCore fires only while a physics ray from the scope (`muzzle_projectile_1`) to the target hits nothing
  on its own construct; a hit pauses firing (`RayCheckSelfHit`, read in WeaponCore `WeaponTracking.RayCheckTest`
  and `WeaponTypes.NormalShootRayCallBack`). The ray hits collision shapes, not block cells, so the twin has to
  clear this turret's collision. Roof gear without collision matters only to the eye.
- With the trunnion axis at 5.2 m, the twin's axis is at 7.7 m and its muzzle brakes' undersides at 7.25 m
  at 0 degrees.
- This turret's collision top is the roof (6.8 m), so the twin's scope ray clears it down to about -4 degrees.
- The barrel lanes are x = +-1.5 m, each 0.9 m wide at the brakes. Nothing in them rises above the roof, and
  the roof gear sits outside them (periscope at x = +2.3, sensor dome at x = -2.6) and below 7.2 m, so the
  twin's barrels never touch this turret when both face forward.
- The old model's axis was 5.5 m with a taller top; compare the two in game with a stacked pair.

## Plinth: a widened vanilla large cargo container

## Plinth: a widened vanilla large cargo container

Same idea as the Griffin base: the vanilla large cargo container's look, stretched to 5 x 5 x 1 cells.

- **Kitbash source**: `<ModSDK>\OriginalContent\Models\Cubes\large\CargoContainerLarge.FBX` (the vanilla
  `LargeBlockLargeContainer`), imported with SEUT's importer in a throwaway scene. Its parts: the root body,
  6 `LargeConveyorFrame` (grey outer port frames), 6 `detector_conveyor_section` (yellow port frame and door),
  6 `DoorTerminalFrame` and 6 `detector_terminal_section` (keypads), 8 `airtight_edge`, 3 `Line`,
  `Protection_Bars`, `metal_pipe`, plus the detector empties. Its materials are `PaintedMetal_Colorable`,
  `PaintedMetal_Yellow`, `Metal_Dull`, `Conveyor`, `Chrome`, `Doodads`, `Terminal`, `PaintedMetal_Darker`,
  `Decals` (scratched variants dropped, as SEUT's importer does). Same kind of reuse as the gatling turret's
  conveyor port.
- **Frame**: the container's edge beams and corner posts around the top and bottom outline and down the four
  vertical corners. To lengthen a beam to 12.5 m, cut it across its middle and move the vertices on one side
  of the cut; never scale it non-uniformly, which squashes its bevels and UVs.
- **Cell ribs**: a slim vertical frame member at each cell boundary on every side (x = +-1.25 and +-3.75 m),
  so each side reads as five bays like a row of containers.
- **Ports**: the centre cell of each side holds a vanilla port (`LargeConveyorFrame` plus
  `detector_conveyor_section`), centred in the cell so the connection point sits at the cell centre. The
  bottom face gets one more in its centre cell. The top has none (the disc covers it).
- **Keypads**: one vanilla keypad (`DoorTerminalFrame` plus `detector_terminal_section`) beside each side port,
  to its right seen from outside, as on the vanilla container and the Griffin, in the edge of the next bay.
- **All interaction points stay on the fixed plinth**: the game ignores terminal, inventory and conveyor
  detectors on moving subparts, so the gunhouse, drum and barrels carry none.
- **Bays**: the four bays per side are flat paintable faces, each carrying one debossed X panel (Decals). All 16
  X panels are the same size; the bay that holds a keypad centres its panel in the space left.
- **Top face**: frame border, the base disc in the middle, and the four corners outside the disc for vent
  plate decals.
- **Faces stay inside the cell**: the side faces sit about 5 cm inside the block boundary, so vanilla parts
  that stand proud (port frames, keypads) end flush with it. These faces are mount faces.

## Subpart chain

| Scene | SEUT type | Holds | Children |
|---|---|---|---|
| `GVK_HurricaneTurret` | main | plinth, disc, feed trunk, ports, keypads, collision, BS1-3 | `subpart_MissileTurretBase1` at the disc centre (2.85 m) |
| `GVK_HurricaneTurret_Az` | subpart | bearing ring, gunhouse, bustle, roof gear, side boxes | `subpart_MissileTurretBarrels` on the trunnion axis |
| `GVK_HurricaneTurret_El` | subpart | drum, cones, gun shields, lamps, `camera`, `muzzle_projectile_1/2` | `subpart_salvo_barrel_1` (x = +1.5, left) and `_2` (x = -1.5, right) at the cone tips |
| `GVK_HurricaneTurret_Barrel` | subpart | one barrel and muzzle brake, origin where it leaves the cone | none; linked by both recoil empties |

Left and right are the turret's own: `_1` / `muzzle_projectile_1` is the left barrel (+X in the one-scene
build), matching the old model's order (old `_1` at SE x = -1.27, the block's left in SE axes).

Built in one scene first with a `part` tag on every object, then split (`weapons-turrets.md`, "Splitting a
turret into subpart scenes"). The split turns each subpart scene's content 180 degrees about Z (muzzles toward
+Y, so the left barrel sits at x = -1.5 there) and leaves every empty unrotated, as the shipped gatling does:
on vanilla turret types the game drops the azimuth and elevation empties' rotation (se-dev-seut
`modeling-rules.md`, "Which way a subpart faces"). The barrel subparts keep their empties' matrices, so the old
recoil animation's `(0, 0, 2)` still moves them backward.

## Materials (vanilla only, no baking)

| Part | Material | Paint |
|---|---|---|
| Gunhouse shell, roof, cheeks | `PaintedMetal_Colorable` | yes |
| Plinth frame and bays | as imported from the vanilla container (`PaintedMetal_Colorable`), bays `PaintedMetal_Colorable` | yes |
| Ports and keypads | as imported (`PaintedMetal_Yellow`, `Metal_Dull`, `Conveyor`, `PaintedMetal_Darker`, `Terminal`) | no |
| Drum bands, base disc rim ring | `PaintedMetal_Colorable`, framed by dark trim | yes |
| Bustle, cones, gun shields, sill, side boxes, bearing ring, disc body | `PaintedMetal_Darker` | no |
| Barrels | dark gun metal, chosen from the catalog in the build | no |
| Muzzle brakes, sensor dome | `Chrome` or a dull metal, chosen in the build | no |
| Lamps, periscope lens | `Emissive` (real geometry, state colours) | no |
| Sensor dome lens | glass from the catalog | no |

The art's silver worn patches are not modelled. Edge wear, if any, only on bevels of small machinery; none on
the gunhouse or plinth outline unless the owner asks.

## Decals

Decals carry the large features as well as the small ones. Each surface group gets a contact sheet of
candidates at build time; the pieces below are the starting picks (ids from `atlas-regions.md`, looked up
again at build time).

Large features:

| Surface | Decal | Size and placement |
|---|---|---|
| Plinth side bays (16) | X panel: four copies of the debossed `Atlas3_Colorable` triangle (42), turned 90 degrees apart | About 1.5 m square, one per bay, all the same size |
| Rear bustle face | Same X panel on `Atlas3_Darker` (relief on the dark bustle) | About 1.6 m, centred |
| Plinth top corners (4) | `Atlas3_Darker` triangular corner plate with diagonal slots (29), as vents | Legs about 2.5 m, clear of the disc |
| Roof rear-left | `Atlas3_Colorable` slatted vent | The art's roof grille, about 1.4 x 0.4 m |
| Gunhouse sides, lower rear | `Atlas3_Colorable` louvre vents | Both sides (symmetric trim) |
| Bustle, one angled face | `Atlas3_Darker` access hatch | Asymmetric |

Small features:

| Surface | Decal | Note |
|---|---|---|
| Gunhouse painted panels | V-groove panel lines | See Panel lines and weld lines |
| Big mechanical joints | weld lines | See Panel lines and weld lines |
| Plate and seam edges | bolt decals at random angles | Only where a plate clamps something (the art's rivet rows) |
| Embrasure edges, top of the disc rim | `Atlas2` hazard marks, about 0.4 m | Where things move |
| By one or two side ports | `Atlas2` warning sign | Asymmetric |
| Plinth underside | `TextAtlas` unit stencil | Underneath, not on a front face |
| Gunhouse, one side | short `TextAtlas` label | Asymmetric |

### Panel lines and weld lines

One rule for every joint: a V-groove where a removable painted cover plate meets the next, a weld line where
two structural parts are joined for good, bolts where a plate clamps something.

**V-groove panel lines** (gunhouse, all main painted panels):

- `PanelingColorable` with the V-groove seam strip from `Decals_Atlas_A_01` (piece 54, the one on the gatling
  turret), about 2.5 to 3 cm wide, U along the seam (`u = length * 0.5`, wraps cleanly).
- Layout from the art: roof cut into plates by one cross seam and two long seams; each side wall into three
  plates by vertical seams; each cheek gets a seam offset about 0.25 m inside its angled front edge, parallel
  to it; the upper glacis one seam along its top edge.
- Mitred T-joins and pointed free ends (`atlas-regions.md`, "Panel lines"); every seam vertex ray-cast onto its
  face; seams stop short of and route round the roof vent, louvre vents, periscope, sensor dome and side boxes.

**Weld lines** (big mechanical parts):

- The weld bead is the full-width strip in `Decals_Atlas_A_01` at V 0.1392 to 0.1753 (the skill lists it as
  piece 55, "rolled-edge band"; its texture is a rippled weld bead with ragged edges). 2048 x 74 px.
- Material: `PanelingDarker` on dark parts (its `Decals_Atlas_A_02` colour map has the same bead at the same
  place) and `PanelingColorable` where a weld crosses painted plate (a painted-over weld). The first weld render
  shows both next to `Decals` (bare grey bead) so the owner can pick.
- Bead about 5 cm wide, so one full U span covers about 1.4 m. The outline tiles cleanly but the colour jumps
  at the wrap, so a longer run alternates direction (span 1 runs U 0 to 1, span 2 runs U 1 to 0) and the ends
  always match; the reversal reads as a weld restart.
- Round joints: rings of short flat quads following the surface, like the seam rings on the gatling radome.
  Inside corners (fillet welds): a strip at 45 degrees across the corner, both edges 1.5 mm off their faces.
- Where:

| Joint | Moves with |
|---|---|
| Mantlet cone base to drum (ring), gun shield to cone | elevation |
| Drum band rims and end caps (rings) | elevation |
| Muzzle brake to barrel (ring) | recoil part |
| Bustle to gunhouse (around the joint), cheeks to side walls (along the joint) | azimuth |
| Side sensor boxes, periscope housing and sensor dome to their faces (around the footprint) | azimuth |
| Bearing ring roller posts to ring | azimuth |
| Feed trunk to disc (ring), disc rim ring to disc | fixed |

The kitbashed plinth keeps the vanilla container's clean look: no welds or seams added there.

Geometry kept, and why: the gunhouse, bustle, drum, cones, shields, barrels and muzzle brakes (silhouette),
sensor dome, periscope and side boxes (silhouette from a distance), lamps and lenses (glow needs real
geometry), and the kitbashed frame, ports and keypads (vanilla parts).

## Collision (base model only)

Turret subparts get no physics, so all shapes go in the main scene, built in block space:

1. Plinth: a box, 12.5 x 12.5 x 2.5 m.
2. Disc: cylinder, 10.5 m across, 2.5 to 2.85 m.
3. Gunhouse: one cylinder on the azimuth axis, 4.5 m radius, 2.85 to 6.8 m. It covers the gunhouse at every
   angle about equally, between its sides (3.5 m) and its bustle (6.1 m). Its top stays at the roof and the roof
   gear gets no collision, so a superfiring twin's line of sight passes over (see Superfiring).

Barrels have no collision (they leave the box and move). `muzzle_projectile_1` (the scope) lies far outside
every shape at every elevation.

## LODs and build stages

- LODs for every scene: LOD1 at 40 m, LOD2 at 120 m, LOD3 at 300 m (twice the vanilla turret distances for a
  block about twice the size). Every material of Main kept in each LOD. The plinth's LODs can start from the
  vanilla `CargoContainerLarge_LOD1..3` parts, lengthened the same way as the frame.
- Dedicated build stages BS1 to BS3 at 0.33 / 0.66 / 1.00 in the main scene. Every stage shows the whole
  outline including the gunhouse, drum, cones and barrels in their rest pose, with the load path from plinth
  to gunhouse (bearing ring, feed trunk). The plinth part of each stage can start from the vanilla
  `CargoContainerLargeConstruction_1..3` frames, lengthened the same way.

## Review checkpoints

Render with `look` after every change, compare with the concept art (and the Griffin references for the
plinth), and fix the biggest difference before going on. Show the owner a render set at each of these, and
wait for a yes before the next:

1. Blockout: concept angle, orthographic side and top; silhouette and proportions only.
2. Plinth kitbash: the Griffin screenshot's low three-quarter angle, one side straight on.
3. Gunhouse and elevation group: concept angle, plus elevation at -10, 0 and +45 degrees, plus a stacked pair
   (superfire check).
4. Barrels and muzzle brakes, with one barrel shown in full recoil.
5. Each decal group: the contact sheet first, then renders of the placed decals and the ray-cast report.
6. Split into subpart scenes: the turret rebuilt from the split parts, next to the one-scene model.
7. LODs and build stages, each on its own.
8. Icon.

Numerical checks run after every change that touches them: sweep radius, elevation and recoil clearance, decal
offset and obstruction, and conveyor detectors in their cells.

Keep `build-log.md` beside this doc and update it at every checkpoint: decisions, final numbers, object and
scene names, what has been verified and what has not. A context compaction or a fresh session then picks up
from the log and the saved .blend without re-deriving anything. Keep `look` renders small (max_size 400 to 512)
except for owner review sets; renders are the biggest token cost of a build.

## Checks before export

- Elevation sweep (-10 to +45): every elevation vertex against the gunhouse, especially cones and gun shields
  against the roof's front edge, the cheeks and the sill.
- Recoil: each barrel moved 2 m back at -10, 0 and +45 degrees; its rear end stays hidden inside cone, drum or
  gunhouse.
- Superfire: a copy of the turret 2.5 m higher and 12.5 m behind, barrels lowered from 0 degrees; record the
  angle where they first touch this turret's model (target: about -1 or lower) and where its scope ray first
  hits this turret's collision (target: about -4).
- Azimuth sweep: farthest gunhouse vertex no more than 6.2 m from the axis.
- Decal offset and obstruction ray casts; conveyor and keypad detectors cover their meshes, conveyor detectors
  in their cells, facing out.

## SBC and WeaponCore changes

SBC (both `ARYXHurricaneCannon` and `ARYXHurricaneCannon_NPC`):

- `Model` = `Models\GVK_HurricaneTurret\GVK_HurricaneTurret.mwm`.
- `BuildProgressModels`: the three new stages at 0.33 / 0.66 / 1.00.
- `Icon` = `Textures\GUI\Icons\GVK_HurricaneTurret.png` (SEUT icon render, with manual subpart collection
  instancing and the preview window left open).
- Add `EmissiveColorPreset` `Default` (the lamps need it), `MinElevationDegrees` -10 and `MaxElevationDegrees`
  45 (equal to WeaponCore), `MinAzimuthDegrees` -180, `MaxAzimuthDegrees` 180, and `AiEnabled` false. The old
  entries have none of these.
- `Description`: remove "Manufactured by AWE."; the rest of the text stays.
- Size, mount points, mirroring, components, `BlockPairName` unchanged.

WeaponCore: no name changes. `MinElevation` goes from -5 to -10 in `AryxHurricaneTurret`
(`Ballistics_HeavyCannon_Weapons.cs`, shared by both subtypes). Check in game that the recoil still moves the
barrels back (old animation, +Z in the barrel part), and that the `MD_480_Muzzle_Hurricane` flash sits on the
new muzzle tips at offset 0.

Remove from the mod: `Content/Models/AWE_HeavyCannon/ARYX_HurricaneCannon*.mwm` (base, LODs, Azi, Elev,
Barrel, LODs) and `Textures\GUI\Icons\AryxHurricaneCannon.dds` (only the Hurricane uses them). Keep
`XL_HalfBlock_BS1/2` until the MAC has its own stages. Regenerate the studio snapshot and studio icons.

## Not settled in game

Subpart facing, recoil direction, which side `_1` is on, muzzle direction and flash offset, the cylinder
collision for the gunhouse, emissive lamps on the elevation part, the X panels' lighting with rotated UVs, the
weld bead decal (new to the skill, not yet seen in game), superfiring over a second turret, and LOD switch
distances.

## Follow-ups

- After this weapon: dedicated build stages for `Ballistics_MAC_Turret_NPC` ([NPC-MAC] Large 200mm Coilgun
  Turret, `R309_RailCannon.mwm`, also 5 x 3 x 5), then delete `XL_HalfBlock_BS1/2`.

## Open questions

None.
