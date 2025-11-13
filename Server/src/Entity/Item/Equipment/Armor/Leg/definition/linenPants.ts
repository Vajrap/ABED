import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { LegId } from "../../type";
import { Leg } from "../Leg";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { BlueprintId } from "src/Entity/Blueprint/enum";

// 🩳 Cloth
export const linenPants = new Leg(
  {
    id: LegId.LinenPants,
    name: { en: "Linen Pants", th: "" },
    description: {
      en: "Light, breathable pants offering comfort over protection.",
      th: "",
    },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 180, bonusCost: 0 }),
    image: "linenPants",
    isCraftable: true,
    weight: 4, // 0.4 kg
    blueprintId: BlueprintId.Armor_Leg_LinenPants,
  },
  {},
  {
    armorClass: ArmorClass.Cloth,
  },
);
