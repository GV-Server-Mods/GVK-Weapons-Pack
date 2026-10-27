# GVK-Weapons-Pack

> **Live Weapon Studio**: Explore, configure, and inspect all weapon stats, ammos, telemetry, and balance matrices live at:
> ### 🚀 [https://gv-server-mods.github.io/GVK-Weapons-Pack/](https://gv-server-mods.github.io/GVK-Weapons-Pack/)

Consolidated and rebalanced weapon pack designed specifically for the **GV: Deserts of Kharak (GVK)** Space Engineers server. Features custom WeaponCore ballistic, laser, missile, and drone weaponry with custom audio, visuals, and balance curves tailored for Kharak server mechanics.

---

## Quick Navigation
- [GVK Weapon Studio](#gvk-weapon-studio)
- [Server Load Order & Requirements](#server-load-order--requirements)
- [Development & MDK2 Build](#development--mdk2-build)
- [Testing & Validation](#testing--validation)
- [Repository Structure](#repository-structure)
- [Original Credits & Thank Yous](#thank-yous)
- [Technical Design Notes](#technical-design-notes)
  - [Drone Orbit Terrain Following](#design-notes-drone-orbit-terrain-following-weaponcore-approach-mechanics)
  - [Falcon Combat Drone Architecture](#falcon-combat-drone-architecture-aryxsmallfighterhangar)
  - [WeaponCore ModAPI Technical Discoveries & Engine Quirks](#weaponcore-modapi-technical-discoveries--engine-quirks)

---

## GVK Weapon Studio
The **GVK Weapon Studio** is an interactive, browser-based configurator and telemetry viewer hosted directly via GitHub Pages:
- **Live URL**: [https://gv-server-mods.github.io/GVK-Weapons-Pack/](https://gv-server-mods.github.io/GVK-Weapons-Pack/)
- **Live Source Pipeline**: In-browser parser reads `CoreParts/*.cs` and `Content/Data/*.sbc` directly—no static data files to hand-sync when tweaking weapon or ammo balance.
- **Local Development**: Run `run_studio.bat` or open `studio/index.html` locally via any local HTTP server (e.g. `python -m http.server 8080`).

---

## Server Load Order & Requirements

Must be loaded after the CoreParts / WeaponCore mod in the load order:
- **Dedicated Server / Torch**: Higher load ID (below WeaponCore in load list).
- **Client / Local World**: Above WeaponCore in mod list.
- **Testing in Local Offline World**: The local mod folder must have a `VanillaReplacement` prefix in its folder name.
- **Distribution**: No reuploads; please see the original mod links below for standalone or third-party server use.

---

## Development & MDK2 Build

This repository is built using **MDK2 (Mal's Development Kit 2)** targeting `.NET Framework 4.8` and Space Engineers ModAPI.

- **Prerequisites**: .NET SDK (supporting netframework48), Space Engineers installed via Steam.
- **Build & Deploy (Release)**:
  ```pwsh
  dotnet build -c Release
  ```
  `Mal.Mdk2.ModPackager` automatically packs and deploys the mod to `%APPDATA%\SpaceEngineers\Mods\GVK_Weapons`.
- **VS Code**: Use `Ctrl+Shift+B` (`Build (Release) + MDK Deploy`) defined in `.vscode/tasks.json`.

---

## Testing & Validation

All tests run zero-dependency Node.js suites validating the Studio pipeline, WeaponCore parity, and data consistency:

- **Run All Test Suites**:
  ```pwsh
  node tests/run_studio_tests.js
  ```
- **CI Data Gate Validation**:
  ```pwsh
  node tools/validate_studio_data.mjs
  ```
- **Regenerate Bundled Snapshots**:
  ```pwsh
  node tools/export_snapshots.js
  ```

---

## Repository Structure

```
├── .github/workflows/   # GitHub Actions (deploy-studio.yml for GitHub Pages)
├── Content/             # Space Engineers assets (Audio, Models, Textures, SBC definitions)
│   ├── Audio/           # Homeworld & Kharak sound effects
│   ├── Data/            # CubeBlocks, AmmoMagazines, Blueprints, etc.
│   └── Models/          # Weapon models and animations
├── CoreParts/           # WeaponCore C# definition classes (weapons, ammos, armor)
├── docs/                # Architecture Decision Records (ADRs) and design documentation
├── studio/              # GVK Weapon Studio web application (HTML/CSS/JS)
├── tests/               # Headless Node test suites and test harness
└── tools/               # Studio CI validation gate and snapshot export scripts
```

---

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

---

## Technical Design Notes

### Design Notes: Drone Orbit Terrain Following (WeaponCore Approach Mechanics)

#### The Challenge
WeaponCore (`CoreSystems.Projectiles.Projectile.cs`) approaches are designed primarily for direct-flight projectiles (cruise missiles). Orbit mode (`ApproachOrbits`) generates a flat 2D circle on a plane perpendicular to gravity centered on `desiredPos`. It does not natively sample or contour voxels along the orbit circumference.

#### Why Standard Settings Failed
1. **`Elevation = Surface` + `PositionB = Surface`**:
   In `Projectile.cs`, `case RelativeTo.Surface` computes `elOffset = surfacePos - (surfaceRefPos - heightOffset)`. When `surfaceRefPos = PositionB = Surface`, `surfacePos` and `surfaceRefPos` evaluate to the exact same point on the voxel mesh. They subtract to zero, completely erasing local terrain height and collapsing the orbit center to a static plane at `Target + DesiredElevation`.
2. **`LeadDistance > 0` in Orbit Mode**:
   When orbiting, `Forward = ForwardTargetDirection` points radially inward towards the target (perpendicular to flight). Any lead distance projects the terrain sampling point inward toward the orbit center rather than along the flight path. If the target sits in a valley or basin, this produces a large negative height offset, causing the drone to dive into cliff faces.
3. **`TrajectoryRelativeToB = true` with `Orbit = true`**:
   Sets `desiredPos = PositionB + elOffset` (the ground under the drone). `ApproachOrbits` then uses the drone's own location as `orbitCenter`, causing the drone to orbit itself in tight figure-8s.

#### The Proven Solution
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

---

### Falcon Combat Drone Architecture (`AryxSmallFighterHangar`)

#### 1. Falcon Strike (Offense Mode - `Others_Drone_Offense_Advanced`)
- **ProNav Flight Dynamics**: `AltNavigation = false`, `SteeringLimit = 150`, `MaxLateralThrust = 0.8f` for natural aerodynamic curved flight and banking rather than rigid ZeroEffort lines.
- **Combat Orbit**: 600m radius combat orbit with 200m terrain contouring clearance, delivering 250 fragment rounds (25 ten-round bursts) with velocity-lead prediction (`PointType = Lead`).
- **Autonomous Hunter AI (`OverideTarget = true`)**: Seamlessly acquires the nearest armed hostile within 2.5km when launched blind without an active HUD target lock.
- **3.5km Pursuit Leash**:
  - `NoTargetApproach = false`: Skips approach execution on Frame 1 when no target is locked, preventing `DistanceToTarget` from false-tripping against $(0,0,0)$.
  - `EndCondition2 = DistanceToTarget` (`3500m`): Actively leashes pursuit so the drone breaks orbit and dives/self-destructs if a fleeing target pulls $>3.5\text{km}$ away from the drone.
- **Single-Stage Kamikaze Finisher**:
  - `EndCondition1 = RelativeSpawns` (`End1Value = 250`), `EndEvent = DoNothing`.
  - When all 250 fragment rounds are spent, the orbit approach naturally concludes, and WeaponCore falls back to base `Guidance = Smart`, plunging directly into the target hull for **20,000 damage**.

#### 2. Falcon CAP (Defense Mode - `Others_Drone_Defense_Main`)
- **Carrier/Rover Defense Umbrella**: Orbits the launcher grid at a tight 300m radius (`PositionC = Shooter`, `Orbit = true`) with 150m terrain contouring clearance (`DesiredElevation = 150`).
- **Target-Free Hangar Launch**: `AllowNoTargetFiring = true` on `HardPoint.Other` enables blind launching from cockpit toolbar without requiring an active HUD/radar lock.
- **Deterministic Threat Prioritization**:
  - `OverideTarget = true` + `Targeting.ClosestFirst = true` + `Targeting.TopTargets = 0` (disables RNG shuffling for deterministic closest-target priority).
  - `MaxChaseTime = 180`: Re-evaluates active threats every 3 seconds to dynamically switch fire to closer hostiles.
- **Sustained Gunship Fire**: 10-round autocannon bursts with lead prediction (`PointType = Lead`, `Proximity = 2500`) and a 5,000 round ammunition reserve for a full 6-minute patrol (`MaxLifeTime = 21600`) before safely detonating with a 20,000 damage explosion.

---

### WeaponCore ModAPI Technical Discoveries & Engine Quirks

| Engine Feature / Quirk | Discovery & Solution |
| :--- | :--- |
| **`OffenseRating` Filter** | Unarmed test grids have `OffenseRating = 0`. WeaponCore's threat scanner (`AiTargeting.cs:971`) ignores non-focused targets with `OffenseRating <= 0`. Hostile grids must have functional weapons to be targeted autonomously. |
| **`AllowNoTargetFiring`** | Fixed launchers with `TrackTargets = true` block blind toolbar firing unless `AllowNoTargetFiring = true` is set on `HardPoint.Other`. |
| **`TargetLossDegree` in Orbits** | Non-zero `TargetLossDegree` evaluates the nose cone angle relative to flight vector. In a circular orbit, this causes the drone to reset/drop target every frame. Must remain `0` for orbiting drones. |
| **RNG Target Shuffling (`TopTargets`)** | `TopTargets > 0` enables `GetDeck` chunk randomization (`AiSupport.cs:230`), causing weapons to randomly target further hostiles. Setting `TopTargets = 0` disables shuffling for strict closest-first targeting. |
| **`NoTargetApproach` Leash Trips** | When `NoTargetApproach = true`, `ProcessApproach` runs on Frame 1 with `TargetPos == Zero`, causing `DistanceToTarget` to immediately trip against $(0,0,0)$. Setting `NoTargetApproach = false` delays approach execution until a real target is acquired. |
| **Direct vs Lead Pointing** | `PointType = Lead` calculates full relative velocity lead intercept in `TrajectoryEstimation`. `PointType = Direct` aims straight at the entity center with 0 lead. |