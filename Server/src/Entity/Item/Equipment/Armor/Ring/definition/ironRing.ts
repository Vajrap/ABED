import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { RingId } from "../../type";
import { Ring } from "../Ring";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";

export const ironRing = new Ring(
  {
    id: RingId.IronRing,
    name: { en: "Iron Ring", th: "" },
    description: {
      en: "Simple iron ring, often used for sentimental value.",
      th: "",
    },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 220, bonusCost: 0 }),
    image: "ironRing",
    isCraftable: true,
    weight: 1,
    blueprintId: undefined,
  },
  {},
  { armorClass: ArmorClass.Cloth },
);

// Iron, Silver, Gold Rings same pattern, 0.1 kg, cost 2, 5, 10.
