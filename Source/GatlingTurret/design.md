# Gatling Turret: design document

Status: draft for owner review. Concept art: owner image (three-quarter front view, beige capsule radome,
hex plate, A-frame legs, round base disc, front-mounted 6-barrel gatling).

## Intent

Alternative to the vanilla gatling turret, and a replacement model for the Sentinel turret. Missile-turret
style subpart chain, with a spinning barrel subpart attached to the elevation subpart.

## Block

| Item | Value |
|---|---|
| Grid | Large |
| Block size | 3 x 3 x 3 cells (7.5 m cube) |
| Body | 1 x 1 x 2 cells in the bottom centre column (2.5 m wide, 5 m tall); the base may flare a little past one cell |
| Mount point | Bottom face, centre cell only |
| Conveyor | One large conveyor port on that bottom face |

Heights below are measured from the mount face (the bottom of the block).

## Parts and heights

| Part | Height (m) | Moves with | Notes |
|---|---|---|---|
Settled in blockout v7 (`GatlingTurret.blend`, renders `blockout_*.png`):

| Part | Height (m) | Moves with | Notes |
|---|---|---|---|
| Mount slab | 0.00 to 0.18 | fixed | Square with cut corners, 2.7 m across (0.1 m overhang per side); yellow conveyor port set into it, surround blended into the slab |
| Yellow conveyor port | -0.01 to 0.29 | fixed | Vanilla port section, 1.36 m square; reaches up into a round recess under the coin |
| Azimuth coin | 0.18 to 0.30 | azimuth | Straight-sided disc, 2.7 m across (meets the slab's flat edges); azimuth pivot on its centre at 0.18 |
| A-frame legs | 0.30 to 1.50 | azimuth | x = +-0.74 to 0.96, feet y = +-0.85, narrowing to the bearing; no pistons |
| Bearings | 1.05 to 1.65 | azimuth | Round bosses at the leg tops, radius 0.3 |
| Elevation pivot axis | 1.35 | (axis) | Left to right through the bearings |
| Trunnion shaft | 1.19 to 1.51 | elevation | Between the bearings |
| Ammo can | 0.90 to 1.73 | elevation | Front of the housing hung from the plate, 1.24 m wide |
| Electronics box | 1.05 to 1.73 | elevation | Back of the housing |
| Gun receiver and mantlet | 1.35 to 2.25 | elevation | Mantlet ring cuts into the radome front |
| Barrel axis | 1.80 | spin | 6 barrels, cluster radius 0.13 m, y = -0.6 to -3.5 (muzzle 0.25 m inside the block face) |
| Muzzle dummy | 1.93 | elevation | Tip of the uppermost barrel |
| Plate | 1.73 to 1.88 | elevation | 8-sided (square with cut corners), 2.3 m across |
| Radome | 1.88 to 4.53 | elevation | Radius 1.05 m, cylinder plus hemisphere cap |
| Camera window and dummy | 2.42 | elevation | Radome front, above the mantlet |

Owner's minimum: barrel base at least 1.75 to 2 m above the mount, so it clears blocks in front.

## Subpart chain (WeaponCore)

The block is a WeaponCore `ConveyorSorter`. WeaponCore reads the subpart names from its `MountPoints` entry, so
the names are ours to pick. Checked in the WeaponCore source (`Coreparts/Definitions/Gatlings.cs`,
`WeaponState.cs`): the vanilla gatling example uses `AzimuthPartId` `GatlingTurretBase1`, `ElevationPartId`
`GatlingTurretBase2`, `SpinPartId` and `MuzzlePartId` `GatlingBarrel`, and `HardPoint.Other.RotateBarrelAxis = 3`
(spin about the spin part's own Z axis; 1 = X, 2 = Y). `Loading.SpinFree` keeps the barrel spinning when not firing.

1. Main scene: plinth, base disc, conveyor port, mountpoint, conveyor highlight.
2. Azimuth subpart `MissileTurretBase1`: turntable, A-frame legs, pistons. Pivot on the vertical axis through
   the block centre.
3. Elevation subpart `MissileTurretBarrels`: cradle, mantlet, hex plate, radome, camera window. Pivot on the
   leg bearing axis.
4. Spin subpart (proposed name `GatlingBarrel`): the 6-barrel cluster. Origin on the barrel axis, barrels along
   the axis WeaponCore spins (Z, value 3). Check the spin axis in game, since SEUT exports subparts facing the
   other way from main scenes.

WeaponCore does all the animation (azimuth, elevation, barrel spin); the model only supplies the subparts and
dummies. WeaponCore config (written after the model): `SpinPartId` = the spin subpart, `MuzzlePartId` =
`MissileTurretBarrels`, `AzimuthPartId` = `MissileTurretBase1`, `ElevationPartId` = `MissileTurretBarrels`,
`RotateBarrelAxis = 3`, `SpinFree` as wanted, elevation limits from below.

Dummies (owner):
- One muzzle dummy, `muzzle_projectile_001`, on the elevation subpart (not the spin part, so it does not
  spin), at the tip of the uppermost barrel, +Y pointing out along the barrel. With the cluster axis at about
  2.1 m and a cluster radius of about 0.15 m, the muzzle sits at about 2.25 m, which also helps the minimum
  height.
- Camera dummy behind the camera window on the elevation subpart.

## Materials (vanilla only, no baking)

| Part | Material | Colorable |
|---|---|---|
| Radome | `PaintedMetal_Colorable` (takes paint and skins) | yes |
| Barrels | dark non-colorable gun metal, chosen from the catalog at modelling time | no |
| Plinth, base, legs, cradle, hex plate | dark worn metal (candidate `PaintedMetalScratched_Darker`) | no |
| Camera window | glass or screen material from the catalog | no |
| Details | decals before geometry: vents, hazard stripes, panel lines | per decal |

## Limits and other plans

- Elevation range: -20 to +85 degrees (owner). Slight clipping between subparts at the extreme angles is
  acceptable.
- Collision: at most 10 shapes per model; plan per subpart at modelling time.
- LODs: LOD1 near-full, LOD2 simplified, every material of Main kept (lesson from the antenna crate).
- Build stages: BS1 to BS3 for the main scene.

## Open questions

1. Elevation range: settled, -20 to +85 degrees.
2. Muzzles: settled, one dummy on the elevation subpart at the uppermost barrel's tip.
3. Sentinel turret: settled, WeaponCore. Do you have its existing WeaponCore definition file, so the new
   model's subpart and dummy names can match it, or will the definition be written fresh?
