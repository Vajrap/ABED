import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { RingId } from "../../type";
import { Ring } from "../Ring";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";

export const silverRing = new Ring(
  {
    id: RingId.SilverRing,
    name: { en: "Silver Ring", th: "" },
    description: {
      en: "Simple silver ring, often used for sentimental value.",
      th: "",
    },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 600, bonusCost: 0 }),
    image: "silverRing",
    isCraftable: true,
    weight: 1,
    blueprintId: undefined,
  },
  {},
  { armorClass: ArmorClass.Cloth },
);

// Iron, Silver, Gold Rings same pattern, 0.1 kg, cost 2, 5, 10.
