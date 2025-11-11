import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BodyId } from "../../type";
import { Body } from "../Body";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";

export const chainMail = new Body(
  {
    id: BodyId.ChainMail,
    name: { en: "Chain Mail", th: "" },
    description: { en: "", th: "" },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 1200, bonusCost: 0 }),
    image: "chainMail",
    isCraftable: true,
    weight: 60,
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Heavy,
    pDef: { slash: 4, pierce: 3, blunt: 2 },
    dodge: -4,
    requirement: { strength: 10 },
  },
);
