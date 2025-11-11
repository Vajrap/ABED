import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { HeadWearId } from "../../type";
import { HeadWear } from "../HeadWear";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";

export const chainCoif = new HeadWear(
  {
    id: HeadWearId.ChainCoif,
    name: { en: "Chain Coif", th: "" },
    description: {
      en: "",
      th: "",
    },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 420, bonusCost: 0 }),
    image: "chainCoif",
    isCraftable: true,
    weight: 8,
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Medium,
    pDef: { slash: 0, pierce: 0, blunt: 1 },
    dodge: -1,
  },
);
