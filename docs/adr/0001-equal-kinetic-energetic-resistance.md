# Armor resists Kinetic and Energetic damage equally

Every GVK ArmorDefinition (`CoreParts/Armor_Blocks.cs`) keeps its Kinetic Resistance equal to its Energetic Resistance, so the Kinetic weapon / Energetic weapon split in the glossary describes a weapon but does not change the damage it deals.

We considered giving armor kinds different resistances so that the split mattered in-game, and decided against it for now:

- Vanilla light and heavy armor have no ArmorDefinition, so they take WeaponCore's default resistance of 1 to both types. A split on the existing definitions alone (Buster armor, beam blocks, mechanical blocks, cockpits) would not touch the armor most grids are built from.
- Splitting properly means adding ArmorDefinitions for the vanilla armor blocks and rebalancing every weapon against them, and the Weapon Studio would have to model resistance, which it does not today.

Revisit this if armor-type counterplay becomes a balance goal. Until then, keep the two resistances equal on any new ArmorDefinition.
