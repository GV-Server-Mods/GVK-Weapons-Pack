using static Scripts.Structure;
using static Scripts.Structure.ArmorDefinition;
using static Scripts.Structure.ArmorDefinition.ArmorType;

namespace Scripts {
    partial class Parts {
        // Don't edit above this line
        private ArmorDefinition GVK_BusterArmor => new ArmorDefinition
        {
            SubtypeIds = new[]
            {
                "MA_Buster_ArmorBlock",
                "MA_Buster_Window",
                "MA_Buster_Conveyor",
                "MA_Buster_Camera",
                "MA_Buster_Passage",
                "MA_Buster_Passage_Crossing",
            },
            EnergeticResistance = 1.00f, //Resistance to Energy damage. 0.5f = 200% damage, 2f = 50% damage
            KineticResistance = 1.00f, //Resistance to Kinetic damage. Leave these as 1 for no effect
            Kind = Heavy, //Heavy, Light, NonArmor - which ammo damage multipliers to apply
		};
        private ArmorDefinition GVK_AdditionalLightArmors => new ArmorDefinition
        {
            SubtypeIds = new[]
            {
                "LargeHeatVentBlock",
                "SmallHeatVentBlock",
                "LargeGridBeamBlock",
                "LargeGridBeamBlockSlope",
                "LargeGridBeamBlockRound",
                "LargeGridBeamBlockSlope2x1Base",
                "LargeGridBeamBlockSlope2x1Tip",
                "LargeGridBeamBlockHalf",
                "LargeGridBeamBlockHalfSlope",
                "LargeGridBeamBlockEnd",
                "LargeGridBeamBlockJunction",
                "LargeGridBeamBlockTJunction",
                "SmallGridBeamBlock",
                "SmallGridBeamBlockSlope",
                "SmallGridBeamBlockRound",
                "SmallGridBeamBlockSlope2x1Base",
                "SmallGridBeamBlockSlope2x1Tip",
                "SmallGridBeamBlockHalf",
                "SmallGridBeamBlockHalfSlope",
                "SmallGridBeamBlockEnd",
                "SmallGridBeamBlockJunction",
                "SmallGridBeamBlockTJunction"
            },
            EnergeticResistance = 1.00f, //Resistance to Energy damage. 0.5f = 200% damage, 2f = 50% damage
            KineticResistance = 1.00f, //Resistance to Kinetic damage. Leave these as 1 for no effect
            Kind = Light, //Heavy, Light, NonArmor - which ammo damage multipliers to apply
        };
        private ArmorDefinition GVK_MechanicalBlocks => new ArmorDefinition
        {
            SubtypeIds = new[]
            {
                "LargeStator",
                "SmallStator",
                "LargeAdvancedStator",
                "SmallAdvancedStator",
                "SmallAdvancedStatorSmall",
                "LargeHinge",
                "MediumHinge",
                "SmallHinge",
                "LargePistonBase",
                "SmallPistonBase",
                "LargePistonBaseReskin",
                "SmallPistonBaseReskin",
            },
            EnergeticResistance = 2.00f, //Resistance to Energy damage. 0.5f = 200% damage, 2f = 50% damage
            KineticResistance = 2.00f, //Resistance to Kinetic damage. Leave these as 1 for no effect
            Kind = Light, //Heavy, Light, NonArmor - which ammo damage multipliers to apply
        };
        private ArmorDefinition GVK_CockpitBuffs => new ArmorDefinition
        {
            SubtypeIds = new[]
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
            },
            EnergeticResistance = 5.00f, //Resistance to Energy damage. 0.5f = 200% damage, 2f = 50% damage
            KineticResistance = 5.00f, //Resistance to Kinetic damage. Leave these as 1 for no effect
            Kind = NonArmor, //Heavy, Light, NonArmor - which ammo damage multipliers to apply
        };
        // Don't edit below this line.
    }
}