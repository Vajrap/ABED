import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BodyId } from "../../type";
import { Body } from "../Body";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const scaleMail = new Body(
  {
    id: BodyId.ScaleMail,
    name: { en: "Scale Mail", th: "" },
    description: { en: "", th: "" },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 1500, bonusCost: 0 }),
    image: "scaleMail",
    isCraftable: true,
    weight: 60,
    blueprintId: BlueprintId.Armor_Body_ScaleMail,
  },
  {},
  {
    armorClass: ArmorClass.Medium,
    pDef: { slash: 3, pierce: 3, blunt: 2 },
    dodge: -3,
    requirement: { strength: 9 },
  },
);
