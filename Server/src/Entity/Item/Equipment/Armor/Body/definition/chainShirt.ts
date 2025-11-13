import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BodyId } from "../../type";
import { Body } from "../Body";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const chainShirt = new Body(
  {
    id: BodyId.ChainShirt,
    name: { en: "Chain Shirt", th: "" },
    description: { en: "", th: "" },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 900, bonusCost: 0 }),
    image: "chainShirt",
    isCraftable: true,
    weight: 60,
    blueprintId: BlueprintId.Armor_Body_ChainShirt,
  },
  {},
  {
    armorClass: ArmorClass.Medium,
    pDef: { slash: 3, pierce: 2, blunt: 1 },
    dodge: -2,
    requirement: { strength: 8 },
  },
);
