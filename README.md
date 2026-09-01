# GVK-Weapons-Pack

Consolidated and rebalanced weapon pack only for GV Deserts of Kharak server.  Must have "VanillaReplacement" prefix in the mod folder name if testing in a local offline world. No reuploads, please see the original mods below for all other uses.
Must be loaded after CoreParts mod in load order:
- Torch: higher load ID / below WeaponCore
- Local: above WeaponCore in mod list

# Thank Yous
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

## Design Notes: Drone Orbit Terrain Following (WeaponCore Approach Mechanics)

### The Challenge
WeaponCore (`CoreSystems.Projectiles.Projectile.cs`) approaches are designed primarily for direct-flight projectiles (cruise missiles). Orbit mode (`ApproachOrbits`) generates a flat 2D circle on a plane perpendicular to gravity centered on `desiredPos`. It does not natively sample or contour voxels along the orbit circumference.

### Why Standard Settings Failed
1. **`Elevation = Surface` + `PositionB = Surface`**:
   In `Projectile.cs`, `case RelativeTo.Surface` computes `elOffset = surfacePos - (surfaceRefPos - heightOffset)`. When `surfaceRefPos = PositionB = Surface`, `surfacePos` and `surfaceRefPos` evaluate to the exact same point on the voxel mesh. They subtract to zero, completely erasing local terrain height and collapsing the orbit center to a static plane at `Target + DesiredElevation`.
2. **`LeadDistance > 0` in Orbit Mode**:
   When orbiting, `Forward = ForwardTargetDirection` points radially inward towards the target (perpendicular to flight). Any lead distance projects the terrain sampling point inward toward the orbit center rather than along the flight path. If the target sits in a valley or basin, this produces a large negative height offset, causing the drone to dive into cliff faces.
3. **`TrajectoryRelativeToB = true` with `Orbit = true`**:
   Sets `desiredPos = PositionB + elOffset` (the ground under the drone). `ApproachOrbits` then uses the drone's own location as `orbitCenter`, causing the drone to orbit itself in tight figure-8s.

### The Proven Solution
To horizontally orbit the target while vertically following the terrain beneath the drone:
- **`PositionB = Surface`** + **`AdjustPositionB = true`**: Continuously updates `PositionB` to the terrain mesh directly under the drone.
- **`PositionC = Target`**: Keeps the horizontal orbit center anchored on the combat target.
- **`Elevation = Target`** with **`ElevationRelativeToC = false`**: Activates WeaponCore's geometric plane projection (`case RelativeTo.Target` in `Projectile.cs`):
  ```csharp
  var plane = new PlaneD(positionC - heightOffset, upDir);
  var distToPlane = plane.DistanceToPoint(positionB);
  elOffset = plane.Normal * distToPlane;
  ```
  This calculates the exact signed vertical distance between the target's elevation plane and the drone's local ground surface, and applies it along `upDir` to `desiredPos`:
  $$\text{desiredPos} = \text{Target} + \text{Up} \times (\text{Ground under Drone} - \text{Target}) + \text{DesiredElevation}$$
  The horizontal coordinates remain centered on the Target, while the vertical coordinate dynamically matches $\text{Ground under Drone} + \text{DesiredElevation}$.
- **`LeadDistance = 0`** and **`LeadRotateElevate = false`**: Eliminates radial vector distortion.
- **`TrajectoryRelativeToB = false`**: Ensures the drone orbits `PositionC` (Target) rather than itself.

