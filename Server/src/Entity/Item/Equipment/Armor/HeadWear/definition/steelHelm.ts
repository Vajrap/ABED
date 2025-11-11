import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { HeadWearId } from "../../type";
import { HeadWear } from "../HeadWear";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";

export const steelHelm = new HeadWear(
  {
    id: HeadWearId.SteelHelm,
    name: { en: "Steel Helm", th: "" },
    description: {
      en: "",
      th: "",
    },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 600, bonusCost: 0 }),
    image: "steelHelm",
    isCraftable: true,
    weight: 1.2,
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Heavy,
    pDef: { slash: 0, pierce: 0, blunt: 1 },
    dodge: -1,
  },
);
