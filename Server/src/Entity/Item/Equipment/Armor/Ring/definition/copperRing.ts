import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { RingId } from "../../type";
import { Ring } from "../Ring";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const copperRing = new Ring(
  {
    id: RingId.CopperRing,
    name: { en: "Copper Ring", th: "" },
    description: {
      en: "Simple copper ring, often used for sentimental value.",
      th: "",
    },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 150, bonusCost: 0 }),
    image: "copperRing",
    isCraftable: true,
    weight: 1,
    blueprintId: BlueprintId.Jewelry_Ring_Copper,
  },
  {},
  { armorClass: ArmorClass.Cloth },
);

// Iron, Silver, Gold rings keep similar structure with escalating costs.
