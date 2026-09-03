window.GVK_WC_SCHEMA = {
  "version": "v0.75",
  "structureHash": "d76a0920b279",
  "fileSize": 83729,
  "totalEnums": 31,
  "totalStructs": 53,
  "enums": {
    "HardwareType": [
      "BlockWeapon",
      "HandWeapon",
      "Phantom"
    ],
    "AffectedBlocks": [
      "Armor",
      "ArmorPlus",
      "PlusFunctional",
      "All"
    ],
    "Protections": [
      "KineticProt",
      "EnergeticProt",
      "GenericProt",
      "Regenerate",
      "Structural"
    ],
    "Threat": [
      "Projectiles",
      "Characters",
      "Grids",
      "Neutrals",
      "Meteors",
      "Other",
      "ScanNeutralGrid",
      "ScanFriendlyGrid",
      "ScanFriendlyCharacter",
      "ScanRoid",
      "ScanPlanet",
      "ScanEnemyCharacter",
      "ScanEnemyGrid",
      "ScanNeutralCharacter",
      "ScanUnOwnedGrid",
      "ScanOwnersGrid"
    ],
    "BlockTypes": [
      "Any",
      "Offense",
      "Utility",
      "Power",
      "Production",
      "Thrust",
      "Jumping",
      "Steering"
    ],
    "WhitelistSystem": [
      "BlacklistOr",
      "BlacklistAnd",
      "WhitelistOr",
      "WhitelistAnd"
    ],
    "Comms": [
      "NoComms",
      "LocalNetwork",
      "BroadCast",
      "Relay",
      "Repeat",
      "Jamming"
    ],
    "SecurityMode": [
      "Public",
      "Private",
      "Secure"
    ],
    "EventTriggers": [
      "Reloading",
      "Firing",
      "Tracking",
      "Overheated",
      "TurnOn",
      "TurnOff",
      "BurstReload",
      "NoMagsToLoad",
      "PreFire",
      "EmptyOnGameLoad",
      "StopFiring",
      "StopTracking",
      "LockDelay",
      "Init",
      "Homing",
      "TargetAligned",
      "WhileOn",
      "TargetRanged100",
      "TargetRanged75",
      "TargetRanged50",
      "TargetRanged25"
    ],
    "ResetConditions": [
      "None",
      "Home",
      "Off",
      "On",
      "Reloaded"
    ],
    "MoveType": [
      "Linear",
      "ExpoDecay",
      "ExpoGrowth",
      "Delay",
      "Show",
      "Hide"
    ],
    "Prediction": [
      "Off",
      "Basic",
      "Accurate",
      "Advanced"
    ],
    "Shapes": [
      "LineShape",
      "SphereShape"
    ],
    "FactionColor": [
      "DontUse",
      "Foreground",
      "Background"
    ],
    "PointTypes": [
      "Direct",
      "Lead",
      "Predict"
    ],
    "PatternModes": [
      "Never",
      "Weapon",
      "Fragment",
      "Both"
    ],
    "SpawnType": [
      "Item",
      "Particle"
    ],
    "Falloff": [
      "Legacy",
      "NoFalloff",
      "Linear",
      "Curve",
      "InvCurve",
      "Squeeze",
      "Pooled",
      "Exponential"
    ],
    "AoeShape": [
      "Round",
      "Diamond"
    ],
    "EwarType": [
      "AntiSmart",
      "JumpNull",
      "EnergySink",
      "Anchor",
      "Emp",
      "Offense",
      "Nav",
      "Dot",
      "Push",
      "Pull",
      "Tractor",
      "AntiSmartv2"
    ],
    "EwarMode": [
      "Effect",
      "Field"
    ],
    "Force": [
      "ProjectileLastPosition",
      "ProjectileOrigin",
      "HitPosition",
      "TargetCenter",
      "TargetCenterOfMass"
    ],
    "AreaEffectType": [
      "Disabled",
      "Explosive",
      "Radiant",
      "AntiSmart",
      "JumpNullField",
      "EnergySinkField",
      "AnchorField",
      "EmpField",
      "OffenseField",
      "NavField",
      "DotField",
      "PushField",
      "PullField",
      "TractorField"
    ],
    "ReInitCondition": [
      "Wait",
      "MoveToPrevious",
      "MoveToNext",
      "ForceRestart"
    ],
    "Conditions": [
      "Ignore",
      "Spawn",
      "DistanceFromPositionC",
      "Lifetime",
      "DesiredElevation",
      "MinTravelRequired",
      "MaxTravelRequired",
      "Deadtime",
      "DistanceToPositionC",
      "NextTimedSpawn",
      "RelativeLifetime",
      "RelativeDeadtime",
      "SinceTimedSpawn",
      "RelativeSpawns",
      "EnemyTargetLoss",
      "RelativeHealthLost",
      "HealthRemaining",
      "DistanceFromPositionB",
      "DistanceToPositionB",
      "DistanceFromTarget",
      "DistanceToTarget",
      "DistanceFromEndTrajectory",
      "DistanceToEndTrajectory",
      "ReaquiredTarget",
      "EnemySeekersGreaterThanEqualTo",
      "EnemySeekersLessThanEqualTo"
    ],
    "UpRelativeTo": [
      "UpRelativeToBlock",
      "UpRelativeToGravity",
      "UpTargetDirection",
      "UpTargetVelocity",
      "UpStoredStartDontUse",
      "UpStoredEndDontUse",
      "UpStoredStartPosition",
      "UpStoredEndPosition",
      "UpStoredStartLocalPosition",
      "UpStoredEndLocalPosition",
      "UpRelativeToShooter",
      "UpOriginDirection",
      "UpElevationDirection"
    ],
    "FwdRelativeTo": [
      "ForwardElevationDirection",
      "ForwardRelativeToBlock",
      "ForwardRelativeToGravity",
      "ForwardTargetDirection",
      "ForwardTargetVelocity",
      "ForwardStoredStartDontUse",
      "ForwardStoredEndDontUse",
      "ForwardStoredStartPosition",
      "ForwardStoredEndPosition",
      "ForwardStoredStartLocalPosition",
      "ForwardStoredEndLocalPosition",
      "ForwardRelativeToShooter",
      "ForwardOriginDirection"
    ],
    "RelativeTo": [
      "Origin",
      "Shooter",
      "Target",
      "Surface",
      "MidPoint",
      "PositionA",
      "Nothing",
      "StoredStartDontUse",
      "StoredEndDontUse",
      "StoredStartPosition",
      "StoredEndPosition",
      "StoredStartLocalPosition",
      "StoredEndLocalPosition"
    ],
    "ModelRelativeTo": [
      "ModelNone",
      "ModelRelativeToGravity",
      "ModelTargetDirection",
      "ModelTargetPredictedDirection",
      "ModelTargetVelocity",
      "ModelStoredStartPosition",
      "ModelStoredEndPosition",
      "ModelStoredStartLocalPosition",
      "ModelStoredEndLocalPosition",
      "ModelRelativeToShooterForwards",
      "ModelRelativeToShooterUp",
      "ModelRelativeToOriginDirection",
      "ModelOriginForwards",
      "ModelOriginUp",
      "ModelAcceleration"
    ],
    "ConditionOperators": [
      "StartEnd_And",
      "StartEnd_Or",
      "StartAnd_EndOr",
      "StartOr_EndAnd"
    ],
    "StageEvents": [
      "DoNothing",
      "EndProjectile",
      "EndProjectileOnRestart",
      "StoreDontUse",
      "StorePositionDontUse",
      "Refund",
      "StorePositionA",
      "StorePositionB",
      "StorePositionC",
      "ForceRetarget"
    ]
  },
  "structs": {
    "ProjectileTagDefinition": {
      "Namespace": "Tag",
      "DefinitionPriority": "int",
      "Tags": "Tag[]"
    },
    "ProjectileTagAssignment": {
      "Tag": "string",
      "ProjectileAmmoNames": "string[]"
    },
    "ConsumeableDef": {
      "ItemName": "string",
      "InventoryItem": "string",
      "ItemsNeeded": "int",
      "Hybrid": "bool",
      "EnergyCost": "float",
      "Strength": "float"
    },
    "UpgradeDefinition": {
      "Assignments": "ModelAssignmentsDef",
      "HardPoint": "HardPointDef",
      "Animations": "WeaponDefinition.AnimationDef",
      "ModPath": "string",
      "Consumable": "ConsumeableDef[]"
    },
    "MountPointDef": {
      "SubtypeId": "string",
      "SpinPartId": "string",
      "MuzzlePartId": "string",
      "AzimuthPartId": "string",
      "ElevationPartId": "string",
      "DurabilityMod": "float",
      "IconName": "string",
      "PhantomModel": "string"
    },
    "HardPointDef": {
      "PartName": "string",
      "HardWare": "HardwareDef",
      "Ui": "UiDef",
      "Other": "OtherDef",
      "DefinitionPriority": "int"
    },
    "OtherDef": {
      "ConstructPartCap": "int",
      "EnergyPriority": "int",
      "RotateBarrelAxis": "int",
      "MuzzleCheck": "bool",
      "Debug": "bool",
      "RestrictionRadius": "double",
      "CheckInflatedBox": "bool",
      "CheckForAnyWeapon": "bool",
      "DisableLosCheck": "bool",
      "NoVoxelLosCheck": "bool",
      "AllowScopeOutsideObb": "bool",
      "ProhibitLGTargeting": "bool",
      "ProhibitSGTargeting": "bool",
      "ProhibitSubsystemChanges": "bool",
      "DisableOwnGridLosCheck": "bool",
      "AllowNoTargetFiring": "bool"
    },
    "SupportDefinition": {
      "Assignments": "ModelAssignmentsDef",
      "HardPoint": "HardPointDef",
      "Animations": "WeaponDefinition.AnimationDef",
      "ModPath": "string",
      "Consumable": "ConsumeableDef[]",
      "Effect": "SupportEffect"
    },
    "HardwareDef": {
      "InventorySize": "float",
      "IdlePower": "float"
    },
    "WeaponDefinition": {
      "Assignments": "ModelAssignmentsDef",
      "Targeting": "TargetingDef",
      "Animations": "AnimationDef",
      "HardPoint": "HardPointDef",
      "Ammos": "AmmoDef[]",
      "ModPath": "string"
    },
    "AnimationDef": {
      "AnimationSets": "PartAnimationSetDef[]",
      "Emissives": "PartEmissive[]",
      "HeatingEmissiveParts": "string[]"
    },
    "PartEmissive": {
      "EmissiveName": "string",
      "EmissivePartNames": "string[]",
      "CycleEmissivesParts": "bool",
      "LeavePreviousOn": "bool",
      "Colors": "Vector4[]",
      "IntensityRange": "float[]"
    },
    "EventParticle": {
      "EmptyNames": "string[]",
      "MuzzleNames": "string[]",
      "Particle": "ParticleDef",
      "StartDelay": "uint",
      "LoopDelay": "uint",
      "ForceStop": "bool"
    },
    "UpgradeValues": {
      "Ammo": "string[]",
      "Dependencies": "Dependency[]",
      "RateOfFireMod": "int",
      "BarrelsPerShotMod": "int",
      "ReloadMod": "int",
      "MaxHeatMod": "int",
      "HeatSinkRateMod": "int",
      "ShotsInBurstMod": "int",
      "DelayAfterBurstMod": "int",
      "AmmoPriority": "int"
    },
    "LoadingDef": {
      "ReloadTime": "int",
      "RateOfFire": "int",
      "BarrelsPerShot": "int",
      "SkipBarrels": "int",
      "TrajectilesPerBarrel": "int",
      "HeatPerShot": "int",
      "MaxHeat": "int",
      "HeatSinkRate": "int",
      "Cooldown": "float",
      "DelayUntilFire": "int",
      "ShotsInBurst": "int",
      "DelayAfterBurst": "int",
      "DegradeRof": "bool",
      "BarrelSpinRate": "int",
      "FireFull": "bool",
      "GiveUpAfter": "bool",
      "DeterministicSpin": "bool",
      "SpinFree": "bool",
      "StayCharged": "bool",
      "MagsToLoad": "int",
      "MaxActiveProjectiles": "int",
      "MaxReloads": "int",
      "GoHomeToReload": "bool",
      "DropTargetUntilLoaded": "bool",
      "ProhibitCoolingWhenOff": "bool",
      "InventoryFillAmount": "float",
      "InventoryLowAmount": "float",
      "UseWorldInventoryVolumeMultiplier": "bool",
      "AllowOverheatShooting": "bool",
      "DegradeRofSettings": "DegradeSettingsDef",
      "HeatSinkRateOverheatMult": "float"
    },
    "UiDef": {
      "RateOfFire": "bool",
      "DamageModifier": "bool",
      "ToggleGuidance": "bool",
      "EnableOverload": "bool",
      "AlternateUi": "bool",
      "DisableStatus": "bool",
      "RateOfFireMin": "float",
      "DisableSupportingPD": "bool",
      "ProhibitShotDelay": "bool",
      "ProhibitBurstCount": "bool",
      "UiSetTags": "UiSetTagsDef"
    },
    "AiDef": {
      "TrackTargets": "bool",
      "TurretAttached": "bool",
      "TurretController": "bool",
      "PrimaryTracking": "bool",
      "LockOnFocus": "bool",
      "SuppressFire": "bool",
      "OverrideLeads": "bool",
      "DefaultLeadGroup": "int",
      "TargetGridCenter": "bool",
      "PainterUseMaxTargeting": "bool",
      "UseLimitlessPDSolver": "bool"
    },
    "CriticalDef": {
      "Enable": "bool",
      "DefaultArmedTimer": "int",
      "PreArmed": "bool",
      "TerminalControls": "bool",
      "AmmoRound": "string"
    },
    "HardPointAudioDef": {
      "ReloadSound": "string",
      "NoAmmoSound": "string",
      "HardPointRotationSound": "string",
      "BarrelRotationSound": "string",
      "FiringSound": "string",
      "FiringSoundPerShot": "bool",
      "PreFiringSound": "string",
      "FireSoundEndDelay": "uint",
      "FireSoundNoBurst": "bool"
    },
    "HardPointParticleDef": {
      "Effect1": "ParticleDef",
      "Effect2": "ParticleDef"
    },
    "AmmoDef": {
      "AmmoMagazine": "string",
      "AmmoRound": "string",
      "HybridRound": "bool",
      "EnergyCost": "float",
      "BaseDamage": "float",
      "Mass": "float",
      "Health": "float",
      "BackKickForce": "float",
      "DamageScales": "DamageScaleDef",
      "Shape": "ShapeDef",
      "ObjectsHit": "ObjectsHitDef",
      "Trajectory": "TrajectoryDef",
      "AreaEffect": "AreaDamageDef",
      "Beams": "BeamDef",
      "Fragment": "FragmentDef",
      "AmmoGraphics": "GraphicDef",
      "AmmoAudio": "AmmoAudioDef",
      "HardPointUsable": "bool",
      "Pattern": "PatternDef",
      "EnergyMagazineSize": "int",
      "DecayPerShot": "float",
      "Ejection": "EjectionDef",
      "IgnoreWater": "bool",
      "AreaOfDamage": "AreaOfDamageDef",
      "Ewar": "EwarDef",
      "IgnoreVoxels": "bool",
      "Synchronize": "bool",
      "HeatModifier": "double",
      "NpcSafe": "bool",
      "Sync": "SynchronizeDef",
      "NoGridOrArmorScaling": "bool",
      "TerminalName": "string",
      "BaseDamageCutoff": "float",
      "IgnoreGrids": "bool",
      "AllowNegativeHeatModifier": "bool",
      "HeatNeededToFire": "int",
      "GridsTargetSeekersTargetingThis": "bool"
    },
    "DamageScaleDef": {
      "MaxIntegrity": "float",
      "DamageVoxels": "bool",
      "Characters": "float",
      "SelfDamage": "bool",
      "Grids": "GridSizeDef",
      "Armor": "ArmorDef",
      "Custom": "CustomScalesDef",
      "Shields": "ShieldDef",
      "FallOff": "FallOffDef",
      "HealthHitModifier": "double",
      "VoxelHitModifier": "double",
      "DamageType": "DamageTypes",
      "Deform": "DeformDef"
    },
    "GridSizeDef": {
      "Large": "float",
      "Small": "float"
    },
    "ArmorDef": {
      "Armor": "float",
      "Heavy": "float",
      "Light": "float",
      "NonArmor": "float"
    },
    "ObjectsHitDef": {
      "MaxObjectsHit": "int",
      "CountBlocks": "bool",
      "SkipBlocksForAOE": "bool"
    },
    "CustomBlocksDef": {
      "SubTypeId": "string",
      "Modifier": "float"
    },
    "GraphicDef": {
      "ShieldHitDraw": "bool",
      "VisualProbability": "float",
      "ModelName": "string",
      "Particles": "AmmoParticleDef",
      "Lines": "LineDef",
      "Decals": "DecalDef",
      "AdvancedLines": "AdvBillboardsDef"
    },
    "OffsetEffectDef": {
      "MaxOffset": "double",
      "MinLength": "double",
      "MaxLength": "double"
    },
    "TracerBaseDef": {
      "Enable": "bool",
      "Length": "float",
      "Width": "float",
      "Color": "Vector4",
      "VisualFadeStart": "uint",
      "VisualFadeEnd": "uint",
      "Segmentation": "SegmentDef",
      "Textures": "string[]",
      "TextureMode": "Texture",
      "AlwaysDraw": "bool",
      "FactionColor": "FactionColor"
    },
    "TrailDef": {
      "Enable": "bool",
      "Material": "string",
      "DecayTime": "int",
      "Color": "Vector4",
      "Back": "bool",
      "CustomWidth": "float",
      "UseWidthVariance": "bool",
      "UseColorFade": "bool",
      "Textures": "string[]",
      "TextureMode": "Texture",
      "AlwaysDraw": "bool",
      "FactionColor": "FactionColor"
    },
    "DecalDef": {
      "MaxAge": "int",
      "Map": "TextureMapDef[]"
    },
    "AdvBillboardsDef": {
      "Enable": "bool",
      "UseModelRotation": "bool",
      "AdvLines": "Line[]",
      "AdvTrails": "Trail[]",
      "Billboards": "Billboard[]"
    },
    "Trail": {
      "WidthFade": "bool",
      "ColorFade": "bool",
      "AlwaysDraw": "bool",
      "TimeRendered": "uint",
      "DelayBetweenSpawns": "uint",
      "RotateSpeed": "float",
      "P0RandomOffset": "float",
      "Width": "float",
      "MinViewDistance": "float",
      "MaxViewDistance": "float",
      "FactionColor": "LineDef.FactionColor",
      "BlendType": "VRageRender.MyBillboard.BlendTypeEnum",
      "Materials": "string[]",
      "P0": "Vector3",
      "Color": "Vector4",
      "DelayBetweenSpawnsOffset": "uint"
    },
    "Billboard": {
      "RotateSpeed": "float",
      "MinViewDistance": "float",
      "MaxViewDistance": "float",
      "FactionColor": "LineDef.FactionColor",
      "BlendType": "VRageRender.MyBillboard.BlendTypeEnum",
      "Materials": "string[]",
      "P0": "Vector3",
      "P1": "Vector3",
      "P2": "Vector3",
      "P3": "Vector3",
      "Color": "Vector4",
      "DelayBetweenSpawns": "uint",
      "DelayBetweenSpawnsOffset": "uint"
    },
    "BeamDef": {
      "Enable": "bool",
      "ConvergeBeams": "bool",
      "VirtualBeams": "bool",
      "RotateRealBeam": "bool",
      "OneParticle": "bool",
      "FakeVoxelHitTicks": "int"
    },
    "FragmentDef": {
      "AmmoRound": "string",
      "Fragments": "int",
      "Radial": "float",
      "BackwardDegrees": "float",
      "Degrees": "float",
      "Reverse": "bool",
      "IgnoreArming": "bool",
      "DropVelocity": "bool",
      "Offset": "float",
      "MaxChildren": "int",
      "TimedSpawns": "TimedSpawnDef",
      "FireSound": "bool",
      "AdvOffset": "Vector3D",
      "ArmWhenHit": "bool",
      "AdvRotationOffset": "Vector2D"
    },
    "ComponentDef": {
      "ItemName": "string",
      "ItemLifeTime": "int",
      "Delay": "int"
    },
    "ByBlockHitDef": {
      "Enable": "bool",
      "Radius": "double",
      "Damage": "float",
      "Depth": "float",
      "MaxAbsorb": "float",
      "Falloff": "Falloff",
      "Shape": "AoeShape"
    },
    "EndOfLifeDef": {
      "Enable": "bool",
      "Radius": "double",
      "Damage": "float",
      "Depth": "float",
      "MaxAbsorb": "float",
      "Falloff": "Falloff",
      "ArmOnlyOnHit": "bool",
      "MinArmingTime": "int",
      "NoVisuals": "bool",
      "NoSound": "bool",
      "ParticleScale": "float",
      "CustomParticle": "string",
      "CustomSound": "string",
      "Shape": "AoeShape"
    },
    "FieldDef": {
      "Interval": "int",
      "PulseChance": "int",
      "GrowTime": "int",
      "HideModel": "bool",
      "ShowParticle": "bool",
      "TriggerRange": "double",
      "Particle": "ParticleDef"
    },
    "AreaInfluence": {
      "Radius": "double",
      "EffectStrength": "float"
    },
    "PulseDef": {
      "Interval": "int",
      "PulseChance": "int",
      "GrowTime": "int",
      "HideModel": "bool",
      "ShowParticle": "bool",
      "Particle": "ParticleDef"
    },
    "EwarFieldsDef": {
      "Duration": "int",
      "StackDuration": "bool",
      "Depletable": "bool",
      "TriggerRange": "double",
      "MaxStacks": "int",
      "Force": "PushPullDef",
      "DisableParticleEffect": "bool"
    },
    "DetonateDef": {
      "DetonateOnEnd": "bool",
      "ArmOnlyOnHit": "bool",
      "DetonationRadius": "float",
      "DetonationDamage": "float",
      "MinArmingTime": "int"
    },
    "ExplosionDef": {
      "NoVisuals": "bool",
      "NoSound": "bool",
      "Scale": "float",
      "CustomParticle": "string",
      "CustomSound": "string",
      "NoShrapnel": "bool",
      "NoDeformation": "bool"
    },
    "AmmoAudioDef": {
      "TravelSound": "string",
      "HitSound": "string",
      "HitPlayChance": "float",
      "HitPlayShield": "bool",
      "VoxelHitSound": "string",
      "PlayerHitSound": "string",
      "FloatingHitSound": "string",
      "ShieldHitSound": "string",
      "ShotSound": "string",
      "WaterHitSound": "string",
      "OverrideShotSound": "bool"
    },
    "SmartsDef": {
      "Inaccuracy": "double",
      "Aggressiveness": "double",
      "MaxLateralThrust": "double",
      "TrackingDelay": "double",
      "MaxChaseTime": "int",
      "OverideTarget": "bool",
      "MaxTargets": "int",
      "NoTargetExpire": "bool",
      "Roam": "bool",
      "KeepAliveAfterTargetLoss": "bool",
      "OffsetRatio": "float",
      "OffsetTime": "int",
      "CheckFutureIntersection": "bool",
      "NavAcceleration": "double",
      "AccelClearance": "bool",
      "SteeringLimit": "double",
      "FocusOnly": "bool",
      "OffsetMinRange": "double",
      "FocusEviction": "bool",
      "ScanRange": "double",
      "NoSteering": "bool",
      "FutureIntersectionRange": "double",
      "MinTurnSpeed": "double",
      "NoTargetApproach": "bool",
      "AltNavigation": "bool",
      "IgnoreAntiSmarts": "bool"
    },
    "WeightedIdListDef": {
      "ApproachId": "int",
      "Weight": "Randomize",
      "End1WeightMod": "double",
      "End2WeightMod": "double",
      "MaxRuns": "int",
      "End3WeightMod": "double",
      "End4WeightMod": "double",
      "End5WeightMod": "double"
    },
    "MinesDef": {
      "DetectRadius": "double",
      "DeCloakRadius": "double",
      "FieldTime": "int",
      "Cloak": "bool",
      "Persist": "bool"
    },
    "OnHitDef": {
      "Duration": "int",
      "ProcInterval": "int",
      "ProcAmount": "double",
      "ProcOnVoxels": "bool",
      "FragOnProc": "bool",
      "DieOnEnd": "bool",
      "StickOnHit": "bool",
      "AlignFragtoImpactAngle": "bool"
    },
    "Randomize": {
      "Start": "float",
      "End": "float"
    },
    "ParticleOptionDef": {
      "Scale": "float",
      "MaxDistance": "float",
      "MaxDuration": "float",
      "Loop": "bool",
      "Restart": "bool",
      "HitPlayChance": "float"
    },
    "ParticleDef": {
      "Name": "string",
      "Color": "Vector4",
      "Offset": "Vector3D",
      "Extras": "ParticleOptionDef",
      "ApplyToShield": "bool",
      "DisableCameraCulling": "bool"
    }
  }
};
