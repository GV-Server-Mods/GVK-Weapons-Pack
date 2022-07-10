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
            },
            Kind = Heavy,
        };
        // Don't edit below this line.
    }
}