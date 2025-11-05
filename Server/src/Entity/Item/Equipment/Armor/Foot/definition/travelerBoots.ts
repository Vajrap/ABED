import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { FootId } from "../../type";
import { Foot } from "../Foot";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

// 🥾 Light (Travel)
export const travelerBoots = new Foot(
  {
    id: FootId.TravelerBoots,
    name: { en: "Traveler Boots", th: "" },
    description: { en: "Comfortable boots suited for long journeys.", th: "" },
    tier: TierEnum.common,
    cost: {
      baseCost: 2,
      bonusCost: 0,
      cost: 2,
      marketCost: 2,
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
    image: "travelerBoots",
    isCraftable: true,
    weight: 4, // 0.4 kg
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Light,
  },
);
