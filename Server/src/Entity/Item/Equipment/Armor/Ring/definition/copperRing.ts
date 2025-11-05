import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { RingId } from "../../type";
import { Ring } from "../Ring";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

export const copperRing = new Ring(
  {
    id: RingId.CopperRing,
    name: { en: "Copper Ring", th: "" },
    description: {
      en: "Simple copper ring, often used for sentimental value.",
      th: "",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 1,
      bonusCost: 0,
      cost: 1,
      marketCost: 1,
      numberOfSellThisWeek: 0,
      possibleDeviation: 0,
      seasonalDeviation: {
        [SeasonEnum.Seeding]: 0,
        [SeasonEnum.RainFall]: 0,
        [SeasonEnum.GreenTide]: 0,
        [SeasonEnum.HarvestMoon]: 0,
        [SeasonEnum.SunDry]: 0,
        [SeasonEnum.Frostveil]: 0,
        [SeasonEnum.LongDark]: 0,
      },
    },
    image: "copperRing",
    isCraftable: true,
    weight: 1,
    blueprintId: undefined,
  },
  {},
  { armorClass: ArmorClass.Cloth },
);

// Iron, Silver, Gold Rings same pattern, 0.1 kg, cost 2, 5, 10.
