import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { LegId } from "../../type";
import { Leg } from "../Leg";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

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
    image: "linenPants",
    isCraftable: true,
    weight: 4, // 0.4 kg
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Cloth,
  },
);
