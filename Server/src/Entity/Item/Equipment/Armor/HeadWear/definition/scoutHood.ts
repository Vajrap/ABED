import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { HeadWearId } from "../../type";
import { HeadWear } from "../HeadWear";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";

export const scoutHood = new HeadWear(
  {
    id: HeadWearId.ScoutHood,
    name: { en: "Scout Hood", th: "" },
    description: {
      en: "",
      th: "",
    },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 180, bonusCost: 0 }),
    image: "scoutHood",
    isCraftable: true,
    weight: 5,
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Light,
    pDef: { slash: 0, pierce: 0, blunt: 0 },
  },
);
