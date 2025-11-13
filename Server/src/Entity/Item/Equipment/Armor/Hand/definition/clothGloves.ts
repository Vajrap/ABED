import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { HandId } from "../../type";
import { Hand } from "../Hand";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const clothGloves = new Hand(
  {
    id: HandId.ClothGloves,
    name: { en: "Cloth Gloves", th: "" },
    description: {
      en: "Simple gloves providing minimal warmth and grip.",
      th: "",
    },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 100, bonusCost: 0 }),
    image: "clothGloves",
    isCraftable: true,
    weight: 2, // 0.2 kg
    blueprintId: BlueprintId.Armor_Hand_ClothGloves,
  },
  {},
  {
    armorClass: ArmorClass.Cloth,
  },
);
