using VRageMath;
using System.Collections.Generic;
using static Scripts.Structure.WeaponDefinition;
using static Scripts.Structure.WeaponDefinition.AmmoDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EjectionDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EjectionDef.SpawnType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.ShapeDef.Shapes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.CustomScalesDef.SkipMode;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.FragmentDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.PatternDef.PatternModes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.FragmentDef.TimedSpawnDef.PointTypes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.Conditions;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.UpRelativeTo;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.FwdRelativeTo;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.ReInitCondition;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.RelativeTo;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.ConditionOperators;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.StageEvents;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.GuidanceType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.ShieldDef.ShieldType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.DeformDef.DeformTypes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.AreaOfDamageDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.AreaOfDamageDef.Falloff;
using static Scripts.Structure.WeaponDefinition.AmmoDef.AreaOfDamageDef.AoeShape;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef.EwarMode;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef.EwarType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef.PushPullDef.Force;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef.FactionColor;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef.TracerBaseDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef.Texture;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.DecalDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.DamageTypes.Damage;

namespace Scripts
{
	partial class Parts
	{

		private SynchronizeDef Common_Ammos_Synchronize_Full = new SynchronizeDef 
		{
			Full = true, // Be careful, do not use on high fire rate weapons or ammos with many simultaneous fragments. This will send position updates twice per second per projectile/fragment and sync target (grid/block) changes.
			PointDefense = true, // Server will inform clients of what projectiles have died by PD defense and will trigger destruction.
			OnHitDeath = true, // Server will inform clients when projectiles die due to them hitting something and will trigger destruction.
		};

		private CustomScalesDef Common_Ammos_DamageScales_Cockpits_BigNerf = new CustomScalesDef 
		{
            SkipOthers = NoSkip, // Controls how projectile interacts with other blocks in relation to those defined here, NoSkip, Exclusive, Inclusive.
			Types = new[]
			{
				new CustomBlocksDef
				{
					SubTypeId = "LargeBlockCockpit",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "LargeBlockCockpitSeat",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SmallBlockCockpit",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "DBSmallBlockFighterCockpit",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "CockpitOpen",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "RoverCockpit",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "OpenCockpitSmall",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "OpenCockpitLarge",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SmallBlockCockpitIndustrial",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "LargeBlockCockpitIndustrial",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "BuggyCockpit",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "RivalAIRemoteControlLarge",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "RivalAIRemoteControlSmall",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SmallBlockFlushCockpit",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SmallBlockCapCockpit",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "LargeBlockConsoleModuleInvertedCorner",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "LargeBlockConsoleModuleScreens",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "PassengerBench",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SmallBlockStandingCockpit",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "LargeBlockStandingCockpit",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "LargeBlockModularBridgeCockpit",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SpeederCockpit",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SpeederCockpitCompact",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "LargeBlockCaptainDesk",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "LargeBlockSuspendedControlSeat",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "LargeBlockSuspendedControlSeatB",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SmallBlockSuspendedControlSeat",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SmallBlockSuspendedControlSeatB",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "LargeBlockOpenSlopedCockpit",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "LargeBlockClosedSlopedCockpit",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SmallBlockOpenSlopedCockpit",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SmallBlockClosedSlopedCockpit",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "LargeBlockLabDeskSeat",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "PassengerSeatLarge",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "PassengerSeatSmall",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "PassengerSeatSmallNew",
					Modifier = 0.6f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "PassengerSeatSmallOffset",
					Modifier = 0.6f,
				},
			},
		};
	}
}