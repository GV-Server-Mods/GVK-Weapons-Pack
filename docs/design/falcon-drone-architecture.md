---
title: Falcon combat drone architecture (`AryxSmallFighterHangar`)
covers:
  - CoreParts/Other_Drones_Weapons.cs
  - CoreParts/Other_Drones_Ammos.cs
---

# Falcon combat drone architecture (`AryxSmallFighterHangar`)

#### 1. Falcon Strike (Offense Mode - `Others_Drone_Offense_Advanced`)
- **ProNav Flight Dynamics**: `AltNavigation = false`, `SteeringLimit = 150`, `MaxLateralThrust = 0.8f` for natural aerodynamic curved flight and banking rather than rigid ZeroEffort lines.
- **Combat Orbit**: 600m radius combat orbit with 200m terrain contouring clearance, delivering 250 fragment rounds (25 ten-round bursts) with velocity-lead prediction (`PointType = Lead`).
- **Autonomous Hunter AI (`OverideTarget = true`)**: Seamlessly acquires the nearest armed hostile within 3km when launched blind without an active HUD target lock.
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
- **Sustained Gunship Fire**: 10-round autocannon bursts with lead prediction (`PointType = Lead`, `Proximity = 3000`) and a 5,000 round ammunition reserve for a full 6-minute patrol (`MaxLifeTime = 21600`) before safely detonating with a 20,000 damage explosion.

---
