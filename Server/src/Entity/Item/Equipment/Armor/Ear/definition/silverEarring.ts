import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { EarId } from "../../type";
import { Ear } from "../Ear";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

export const silverEarring = new Ear(
  {
    id: EarId.SilverEarring,
    name: { en: "Silver Earring", th: "" },
    description: { en: "A polished silver earring with faint charm.", th: "" },
    tier: TierEnum.common,
    cost: {
      baseCost: 5,
      bonusCost: 0,
      cost: 5,
      marketCost: 5,
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
    image: "silverEarring",
    isCraftable: true,
    weight: 1,
    blueprintId: undefined,
  },
  {},
  { armorClass: ArmorClass.Cloth },
);
