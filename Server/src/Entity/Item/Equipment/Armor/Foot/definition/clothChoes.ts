import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { FootId } from "../../type";
import { Foot } from "../Foot";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";

// 🩰 Cloth
export const clothShoes = new Foot(
  {
    id: FootId.ClothShoes,
    name: { en: "Cloth Shoes", th: "" },
    description: {
      en: "Soft cloth shoes for comfort, not for battle.",
      th: "",
    },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 120, bonusCost: 0 }),
    image: "clothShoes",
    isCraftable: true,
    weight: 2, // 0.2 kg
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Cloth,
  },
);
