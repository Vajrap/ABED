import { IngotId, OreId } from "src/Entity/Item/Misc";
import { IngotBlueprint } from "../Blueprint";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";

export const blueprintSmeltingCopperIngot = new IngotBlueprint(
    new Map([
      [OreId.CopperOre, 3],
    ]),
    IngotId.CopperIngot,
    "smithing",
    10,
    TierEnum.common,
  );
  
  export const blueprintSmeltingTinIngot = new IngotBlueprint(
    new Map([
      [OreId.TinOre, 3],
    ]),
    IngotId.TinIngot,
    "smithing",
    10,
    TierEnum.common,
  );
  
  export const blueprintSmeltingIronIngot = new IngotBlueprint(
    new Map([
      [OreId.IronOre, 4],
    ]),
    IngotId.IronIngot,
    "smithing",
    10,
    TierEnum.common,
  );
  
  export const blueprintSmeltingSilverIngot = new IngotBlueprint(
    new Map([
      [OreId.SilverOre, 5],
    ]),
    IngotId.SilverIngot,
    "smithing",
    12,
    TierEnum.uncommon,
  );
  
  export const blueprintSmeltingGoldIngot = new IngotBlueprint(
    new Map([
      [OreId.GoldOre, 6],
    ]),
    IngotId.GoldIngot,
    "smithing",
    12,
    TierEnum.rare,
  );
  
  export const blueprintAlloyBronzeIngot = new IngotBlueprint(
    new Map([
      [IngotId.CopperIngot, 1],
      [IngotId.TinIngot, 1],
    ]),
    IngotId.BronzeIngot,
    "smithing",
    12,
    TierEnum.common,
  );
  
  export const blueprintAlloySteelIngot = new IngotBlueprint(
    new Map([
      [IngotId.IronIngot, 2],
    ]),
    IngotId.SteelIngot,
    "smithing",
    13,
    TierEnum.uncommon,
  );
  
  export const blueprintAlloyElectrumIngot = new IngotBlueprint(
    new Map([
      [IngotId.GoldIngot, 1],
      [IngotId.SilverIngot, 1],
    ]),
    IngotId.ElectrumIngot,
    "smithing",
    15,
    TierEnum.rare,
  );
  
  export const blueprintInfusionAethersteelIngot = new IngotBlueprint(
    new Map([
      [OreId.IronOre, 5],
      [OreId.PlanariteOre, 1],
    ]),
    IngotId.AethersteelIngot,
    "smithing",
    16,
    TierEnum.epic,
  );
  
  export const blueprintInfusionVoidforgedIngot = new IngotBlueprint(
    new Map([
      [OreId.IronOre, 5],
      [OreId.ErebiteOre, 1],  
    ]),
    IngotId.VoidforgedIngot,
    "smithing",
    17,
    TierEnum.legendary,
  );