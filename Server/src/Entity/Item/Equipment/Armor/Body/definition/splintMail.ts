import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BodyId } from "../../type";
import { Body } from "../Body";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";

export const splintMail = new Body(
  {
    id: BodyId.SplintMail,
    name: { en: "Splint Mail", th: "" },
    description: { en: "", th: "" },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 2100, bonusCost: 0 }),
    image: "splintMail",
    isCraftable: true,
    weight: 60,
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Heavy,
    pDef: { slash: 4, pierce: 4, blunt: 3 },
    dodge: -5,
    requirement: { strength: 1 },
  },
);
