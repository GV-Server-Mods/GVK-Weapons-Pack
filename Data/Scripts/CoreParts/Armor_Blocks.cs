using static Scripts.Structure;
using static Scripts.Structure.ArmorDefinition;
using static Scripts.Structure.ArmorDefinition.ArmorType;

namespace Scripts {
    partial class Parts {
        // Don't edit above this line
        private ArmorDefinition BusterArmor => new ArmorDefinition
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
            Kind = Heavy,
        };
        private ArmorDefinition AdditionalLightArmors => new ArmorDefinition
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
            Kind = Light,
        };
        // Don't edit below this line.
    }
}