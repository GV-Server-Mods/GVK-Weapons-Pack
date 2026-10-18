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

		// Custom block damage. A group names blocks once, a rule pairs a group with a multiplier, and each ammo
		// lists its rules: Custom = BlockScales(CockpitNerf, PowerBuster). A block in two rules takes the later one.
		// Groups must stay above rules (static fields initialise in file order).
		private static readonly string[] Cockpits =
		{
			"LargeBlockCockpit",
			"LargeBlockCockpitSeat",
			"SmallBlockCockpit",
			"DBSmallBlockFighterCockpit",
			"CockpitOpen",
			"RoverCockpit",
			"OpenCockpitSmall",
			"OpenCockpitLarge",
			"SmallBlockCockpitIndustrial",
			"LargeBlockCockpitIndustrial",
			"BuggyCockpit",
			"RivalAIRemoteControlLarge",
			"RivalAIRemoteControlSmall",
			"SmallBlockFlushCockpit",
			"SmallBlockCapCockpit",
			"LargeBlockConsoleModuleInvertedCorner",
			"LargeBlockConsoleModuleScreens",
			"PassengerBench",
			"SmallBlockStandingCockpit",
			"LargeBlockStandingCockpit",
			"LargeBlockModularBridgeCockpit",
			"SpeederCockpit",
			"SpeederCockpitCompact",
			"LargeBlockCaptainDesk",
			"LargeBlockSuspendedControlSeat",
			"LargeBlockSuspendedControlSeatB",
			"SmallBlockSuspendedControlSeat",
			"SmallBlockSuspendedControlSeatB",
			"LargeBlockOpenSlopedCockpit",
			"LargeBlockClosedSlopedCockpit",
			"SmallBlockOpenSlopedCockpit",
			"SmallBlockClosedSlopedCockpit",
			"LargeBlockLabDeskSeat",
			"PassengerSeatLarge",
			"PassengerSeatSmall",
			"PassengerSeatSmallNew",
			"PassengerSeatSmallOffset",
		};

		private static readonly string[] PowerProducers =
		{
			// Reactors
			"LargeBlockLargeGenerator",
			"LargeBlockSmallGenerator",
			"SmallBlockLargeGenerator",
			"SmallBlockSmallGenerator",
			"LargeBlockLargeGeneratorWarfare2",
			"LargeBlockSmallGeneratorWarfare2",
			"SmallBlockLargeGeneratorWarfare2",
			"SmallBlockSmallGeneratorWarfare2",
			"ProprietaryLargeBlockLargeGenerator",
			"ProprietarySmallBlockLargeGenerator",
			// Hydrogen Engines
			"LargeHydrogenEngine",
			"SmallHydrogenEngine",
			"LargeHydrogenEngineReskin",
			"SmallHydrogenEngineReskin",
			// Batteries
			"LargeBlockBatteryBlock",
			"SmallBlockBatteryBlock",
			"SmallBlockSmallBatteryBlock",
			"LargeBlockBatteryBlockWarfare2",
			"SmallBlockBatteryBlockWarfare2",
			"LargeBlockBatteryReskin",
			"LargeBlockBatteryReskinOffset",
			"SmallBlockBatteryReskin",
			"LargeBlockPrototechBattery",
			"SmallBlockPrototechBattery",
			// Turbines & Solar
			"LargeBlockWindTurbine",
			"LargeBlockWindTurbineReskin",
			"LargeBlockSolarPanel",
			"SmallBlockSolarPanel",
			"LargeBlockColorableSolarPanel",
			"LargeBlockColorableSolarPanelCorner",
			"LargeBlockColorableSolarPanelCornerInverted",
			"SmallBlockColorableSolarPanel",
			"SmallBlockColorableSolarPanelCorner",
			"SmallBlockColorableSolarPanelCornerInverted",
		};

		private static readonly CustomBlocksDef[] CockpitNerf = Scale(Cockpits, 0.6f);
		private static readonly CustomBlocksDef[] PowerBuster = Scale(PowerProducers, 2.0f);

		private static CustomBlocksDef[] Scale(string[] subtypes, float modifier)
		{
			var rule = new CustomBlocksDef[subtypes.Length];
			for (int i = 0; i < subtypes.Length; i++)
				rule[i] = new CustomBlocksDef { SubTypeId = subtypes[i], Modifier = modifier };
			return rule;
		}

		// WC adds every entry to a dictionary, so a duplicate subtype would throw at load; later rules win instead.
		private static CustomScalesDef BlockScales(params CustomBlocksDef[][] rules)
		{
			var bySubtype = new Dictionary<string, CustomBlocksDef>();
			foreach (var rule in rules)
				foreach (var block in rule)
					bySubtype[block.SubTypeId] = block;
			var types = new CustomBlocksDef[bySubtype.Count];
			bySubtype.Values.CopyTo(types, 0);
			return new CustomScalesDef { SkipOthers = NoSkip, Types = types };
		}

		private DecalDef Common_Ammos_Decals_GunBullet = new DecalDef
		{
			MaxAge = 3600,
			Map = new[]
			{
				new TextureMapDef { HitMaterial = "Metal", DecalMaterial = "GunBullet", },
				new TextureMapDef { HitMaterial = "Glass", DecalMaterial = "GunBullet", },
				new TextureMapDef { HitMaterial = "Soil", DecalMaterial = "GunBullet", },
				new TextureMapDef { HitMaterial = "Wood", DecalMaterial = "GunBullet", },
				new TextureMapDef { HitMaterial = "GlassOpaque", DecalMaterial = "GunBullet", },
				new TextureMapDef { HitMaterial = "Stone", DecalMaterial = "GunBullet", },
				new TextureMapDef { HitMaterial = "Rock", DecalMaterial = "GunBullet", },
				new TextureMapDef { HitMaterial = "Ice", DecalMaterial = "GunBullet", },
			},
		};

		private DecalDef Common_Ammos_Decals_RifleBullet = new DecalDef
		{
			MaxAge = 3600,
			Map = new[]
			{
				new TextureMapDef { HitMaterial = "Metal", DecalMaterial = "RifleBullet", },
				new TextureMapDef { HitMaterial = "Glass", DecalMaterial = "RifleBullet", },
				new TextureMapDef { HitMaterial = "Soil", DecalMaterial = "RifleBullet", },
				new TextureMapDef { HitMaterial = "Wood", DecalMaterial = "RifleBullet", },
				new TextureMapDef { HitMaterial = "GlassOpaque", DecalMaterial = "RifleBullet", },
				new TextureMapDef { HitMaterial = "Stone", DecalMaterial = "RifleBullet", },
				new TextureMapDef { HitMaterial = "Rock", DecalMaterial = "RifleBullet", },
				new TextureMapDef { HitMaterial = "Ice", DecalMaterial = "RifleBullet", },
			},
		};
	}
}
