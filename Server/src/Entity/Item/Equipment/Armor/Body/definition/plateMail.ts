import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BodyId } from "../../type";
import { Body } from "../Body";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";

export const plateArmor = new Body(
  {
    id: BodyId.PlateArmor,
    name: { en: "Plate Armor", th: "" },
    description: { en: "", th: "" },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 3600, bonusCost: 0 }),
    image: "plateArmor",
    isCraftable: true,
    weight: 60,
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Heavy,
    pDef: { slash: 5, pierce: 5, blunt: 4 },
    dodge: -6,
    requirement: { strength: 12 },
  },
);
