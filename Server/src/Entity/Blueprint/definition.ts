import { IngotBlueprint, MaterialType, WeaponBlueprint } from "./Blueprint";
import { OreId, IngotId } from "../Item";

export const blueprintSmeltingCopperIngot = new IngotBlueprint(
  {
    [OreId.CopperOre]: 3,
  },
  IngotId.CopperIngot,
  "smithing",
  10,
);

export const blueprintSmeltingTinIngot = new IngotBlueprint(
  {
    [OreId.TinOre]: 3,
  },
  IngotId.TinIngot,
  "smithing",
  10,
);

export const blueprintSmeltingIronIngot = new IngotBlueprint(
  {
    [OreId.IronOre]: 4,
  },
  IngotId.IronIngot,
  "smithing",
  10,
);

export const blueprintSmeltingSilverIngot = new IngotBlueprint(
  {
    [OreId.SilverOre]: 5,
  },
  IngotId.SilverIngot,
  "smithing",
  12,
);

export const blueprintSmeltingGoldIngot = new IngotBlueprint(
  {
    [OreId.GoldOre]: 6,
  },
  IngotId.GoldIngot,
  "smithing",
  12,
);

export const blueprintAlloyBronzeIngot = new IngotBlueprint(
  {
    [IngotId.CopperIngot]: 1,
    [IngotId.TinIngot]: 1,
  },
  IngotId.BronzeIngot,
  "smithing",
  12,
);

export const blueprintAlloySteelIngot = new IngotBlueprint(
  {
    [IngotId.IronIngot]: 2,
  },
  IngotId.SteelIngot,
  "smithing",
  13,
);

export const blueprintAlloyElectrumIngot = new IngotBlueprint(
  {
    [IngotId.GoldIngot]: 1,
    [IngotId.SilverIngot]: 1,
  },
  IngotId.ElectrumIngot,
  "smithing",
  15,
);

export const blueprintInfusionAethersteelIngot = new IngotBlueprint(
  {
    [IngotId.SteelIngot]: 1,
    [OreId.PlanariteOre]: 1,
  },
  IngotId.AethersteelIngot,
  "smithing",
  16,
);

export const blueprintInfusionVoidforgedIngot = new IngotBlueprint(
  {
    [IngotId.SteelIngot]: 2,
    [OreId.ErebiteOre]: 1,
  },
  IngotId.VoidforgedIngot,
  "smithing",
  17,
);

export const blueprintWeaponDagger = new WeaponBlueprint(
  {
    blade: {
      resource: [MaterialType.Ingot, MaterialType.Plank, MaterialType.Bone],
      amount: 1,
    },
    handle: {
      resource: [MaterialType.Plank],
      amount: 1,
    },
  },
  "smithing",
  10,
  0,
);
