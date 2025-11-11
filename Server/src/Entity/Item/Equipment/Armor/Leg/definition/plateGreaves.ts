import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { LegId } from "../../type";
import { Leg } from "../Leg";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";

// 🦿 Heavy
export const plateGreaves = new Leg(
  {
    id: LegId.PlateGreaves,
    name: { en: "Plate Greaves", th: "" },
    description: {
      en: "Heavy metal greaves providing excellent leg protection.",
      th: "",
    },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 900, bonusCost: 0 }),
    image: "plateGreaves",
    isCraftable: true,
    weight: 12, // 1.2 kg
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Heavy,
    dodge: -2,
  },
);
