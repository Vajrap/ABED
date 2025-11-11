import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BodyId } from "../../type";
import { Body } from "../Body";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";

export const hideArmor = new Body(
  {
    id: BodyId.HideArmor,
    name: { en: "Hide Armor", th: "" },
    description: { en: "", th: "" },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 360, bonusCost: 0 }),
    image: "hideArmor",
    isCraftable: true,
    weight: 60,
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Medium,
    pDef: { slash: 2, pierce: 2, blunt: 1 },
    dodge: -2,
    requirement: { strength: 7 },
  },
);
