---
title: WeaponCore ModAPI discoveries and engine quirks
covers:
  - CoreParts/*.cs
  - VisualAmmo/*.cs
checked: 2026-11-28
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
| **Burst Count Resets on Reload** | A reload sets `ShotsFired` back to 0 (`WeaponReload.cs`). With `ReloadTime = 0` and `ShotsInBurst > 0`, a magazine that empties mid-burst swaps instantly and the next magazine fires a full burst straight on, so up to one burst plus the rest of the old magazine leaves without a `DelayAfterBurst` pause. The flare launchers rely on this (`Other_Flare_Weapons.cs`). |
| **Keen's Visual Ammo Stays Empty** | Keen's `VisualAmmoComponent` (the Torpedo Launcher's tube model) reads Keen's own gun, which WeaponCore never loads. A vanilla weapon definition with only the `Energy` magazine keeps Keen's gun from eating real ammo but leaves the tube empty. `VisualAmmo/TorpedoVisualAmmo.cs` copies WeaponCore's ready-to-fire state into Keen's gun as rounds of the display-only `GVK_TorpedoVisual` magazine. |
| **Fixed Weapon Terminal Shows Only Keen's Basics** | Prior to WeaponCore's 2026-11-27 Workshop update (`BDCarrillo/WeaponCore` `98e3bf7`), the first `SmallMissileLauncherReload` block of a session caused `Session.AlterControls` to hide WeaponCore's shared controls on `SmallMissileLauncher` blocks until a world reload (`session.CustomControls` is now skipped in `AlterControls`; hub GVK-Settings#814, #827). |
| **Fire Direction Comes From the Muzzle Dummy** | WeaponCore fires along the muzzle dummy's Forward (`Dummies.cs`), so a dummy turned in the model fires sideways whatever the definition says. Check dummy orientation after any model import or re-export. |
