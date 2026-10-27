---
title: WeaponCore ModAPI discoveries and engine quirks
covers:
  - CoreParts/*.cs
---

# WeaponCore ModAPI discoveries and engine quirks

| Engine Feature / Quirk | Discovery & Solution |
| :--- | :--- |
| **`OffenseRating` Filter** | Unarmed test grids have `OffenseRating = 0`. WeaponCore's threat scanner (`AiTargeting.cs:971`) ignores non-focused targets with `OffenseRating <= 0`. Hostile grids must have functional weapons to be targeted autonomously. |
| **`AllowNoTargetFiring`** | Fixed launchers with `TrackTargets = true` block blind toolbar firing unless `AllowNoTargetFiring = true` is set on `HardPoint.Other`. |
| **`TargetLossDegree` in Orbits** | Non-zero `TargetLossDegree` evaluates the nose cone angle relative to flight vector. In a circular orbit, this causes the drone to reset/drop target every frame. Must remain `0` for orbiting drones. |
| **RNG Target Shuffling (`TopTargets`)** | `TopTargets > 0` enables `GetDeck` chunk randomization (`AiSupport.cs:230`), causing weapons to randomly target further hostiles. Setting `TopTargets = 0` disables shuffling for strict closest-first targeting. |
| **`NoTargetApproach` Leash Trips** | When `NoTargetApproach = true`, `ProcessApproach` runs on Frame 1 with `TargetPos == Zero`, causing `DistanceToTarget` to immediately trip against $(0,0,0)$. Setting `NoTargetApproach = false` delays approach execution until a real target is acquired. |
| **Direct vs Lead Pointing** | `PointType = Lead` calculates full relative velocity lead intercept in `TrajectoryEstimation`. `PointType = Direct` aims straight at the entity center with 0 lead. |
