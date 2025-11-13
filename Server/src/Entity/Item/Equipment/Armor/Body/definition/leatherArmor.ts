import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BodyId } from "../../type";
import { Body } from "../Body";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const leatherArmor = new Body(
  {
    id: BodyId.LeatherArmor,
    name: { en: "Leather Armor", th: "" },
    description: { en: "", th: "" },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 480, bonusCost: 0 }),
    image: "leatherArmor",
    isCraftable: true,
    weight: 60,
    blueprintId: BlueprintId.Armor_Body_LeatherArmor,
  },
  {},
  {
    armorClass: ArmorClass.Light,
    pDef: { slash: 2, pierce: 1, blunt: 0 },
    dodge: 0,
    requirement: { strength: 5 },
  },
);
