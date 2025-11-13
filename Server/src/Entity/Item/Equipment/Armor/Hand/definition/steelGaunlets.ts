import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { HandId } from "../../type";
import { Hand } from "../Hand";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const steelGauntlets = new Hand(
  {
    id: HandId.SteelGauntlets,
    name: { en: "Steel Gauntlets", th: "" },
    description: {
      en: "Heavy gauntlets made of steel, more for intimidation than comfort.",
      th: "",
    },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 420, bonusCost: 0 }),
    image: "steelGauntlets",
    isCraftable: true,
    weight: 10, // 1.0 kg
    blueprintId: BlueprintId.Armor_Hand_SteelGauntlets,
  },
  {},
  {
    armorClass: ArmorClass.Heavy,
    pDef: { slash: 0, pierce: 0, blunt: 0 },
    mDef: { order: 0, chaos: 0, fire: 0, earth: 0, water: 0, air: 0 },
    dodge: 0,
  },
);
