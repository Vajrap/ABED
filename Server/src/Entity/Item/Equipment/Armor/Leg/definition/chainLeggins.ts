import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { LegId } from "../../type";
import { Leg } from "../Leg";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

// ⛓️ Medium
export const chainLeggings = new Leg(
  {
    id: LegId.ChainLeggings,
    name: { en: "Chain Leggings", th: "" },
    description: {
      en: "Chain-linked leggings for decent lower body protection.",
      th: "",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 8,
      bonusCost: 0,
      cost: 8,
      marketCost: 8,
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
    image: "chainLeggings",
    isCraftable: true,
    weight: 9, // 0.9 kg
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Medium,
    dodge: -1,
  },
);
