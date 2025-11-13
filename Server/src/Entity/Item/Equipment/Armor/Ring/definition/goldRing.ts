import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { RingId } from "../../type";
import { Ring } from "../Ring";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const goldRing = new Ring(
  {
    id: RingId.GoldRing,
    name: { en: "Gold Ring", th: "" },
    description: {
      en: "Simple gold ring, often used for sentimental value.",
      th: "",
    },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 1500, bonusCost: 0 }),
    image: "goldRing",
    isCraftable: true,
    weight: 1,
    blueprintId: BlueprintId.Jewelry_Ring_Gold,
  },
  {},
  { armorClass: ArmorClass.Cloth },
);

// Iron, Silver, Gold Rings same pattern, 0.1 kg, cost 2, 5, 10.
