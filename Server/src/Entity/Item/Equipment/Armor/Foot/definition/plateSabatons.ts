import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { FootId } from "../../type";
import { Foot } from "../Foot";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { BlueprintId } from "src/Entity/Blueprint/enum";

// 🦿 Heavy
export const plateSabatons = new Foot(
  {
    id: FootId.PlateSabatons,
    name: { en: "Plate Sabatons", th: "" },
    description: {
      en: "Heavy steel sabatons for maximum protection and stability.",
      th: "",
    },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 750, bonusCost: 0 }),
    image: "plateSabatons",
    isCraftable: true,
    weight: 12, // 1.2 kg
    blueprintId: BlueprintId.Armor_Foot_PlateSabatons,
  },
  {},
  {
    armorClass: ArmorClass.Heavy,
    dodge: -2,
  },
);
