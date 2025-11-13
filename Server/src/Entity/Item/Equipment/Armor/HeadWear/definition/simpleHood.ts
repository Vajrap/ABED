import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { HeadWearId } from "../../type";
import { HeadWear } from "../HeadWear";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const simpleHood = new HeadWear(
  {
    id: HeadWearId.SimpleHood,
    name: { en: "Simple Hood", th: "" },
    description: {
      en: "",
      th: "",
    },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 120, bonusCost: 0 }),
    image: "simpleHood",
    isCraftable: true,
    weight: 3,
    blueprintId: BlueprintId.Armor_Head_SimpleHood,
  },
  {},
  {
    armorClass: ArmorClass.Cloth,
    pDef: { slash: 0, pierce: 0, blunt: 0 },
  },
);
