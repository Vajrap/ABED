import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BodyId } from "../../type";
import { Body } from "../Body";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const studdedLeatherArmor = new Body(
  {
    id: BodyId.StuddedLeatherArmor,
    name: { en: "Studded Leather Armor", th: "" },
    description: { en: "", th: "" },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 600, bonusCost: 0 }),
    image: "studedLeatherArmor",
    isCraftable: true,
    weight: 60,
    blueprintId: BlueprintId.Armor_Body_StuddedLeatherArmor,
  },
  {},
  {
    armorClass: ArmorClass.Light,
    pDef: { slash: 2, pierce: 1, blunt: 1 },
    dodge: -1,
    requirement: { strength: 6 },
  },
);
