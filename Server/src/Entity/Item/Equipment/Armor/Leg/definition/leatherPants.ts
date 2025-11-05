import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { LegId } from "../../type";
import { Leg } from "../Leg";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

// 👖 Light
export const leatherPants = new Leg(
  {
    id: LegId.LeatherPants,
    name: { en: "Leather Pants", th: "" },
    description: {
      en: "Treated leather pants offering minimal protection.",
      th: "",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 3,
      bonusCost: 0,
      cost: 3,
      marketCost: 3,
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
    image: "leatherPants",
    isCraftable: true,
    weight: 6, // 0.6 kg
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Light,
  },
);
