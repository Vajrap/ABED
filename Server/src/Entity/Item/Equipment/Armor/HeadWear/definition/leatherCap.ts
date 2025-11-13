import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { HeadWearId } from "../../type";
import { HeadWear } from "../HeadWear";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const leatherCap = new HeadWear(
  {
    id: HeadWearId.LeatherCap,
    name: { en: "Leather Cap", th: "" },
    description: {
      en: "",
      th: "",
    },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 220, bonusCost: 0 }),
    image: "leatherCap",
    isCraftable: true,
    weight: 5,
    blueprintId: BlueprintId.Armor_Head_LeatherCap,
  },
  {},
  {
    armorClass: ArmorClass.Light,
    pDef: { slash: 0, pierce: 0, blunt: 0 },
  },
);
