import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { EarId } from "../../type";
import { Ear } from "../Ear";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

export const ironEarring = new Ear(
  {
    id: EarId.IronEarring,
    name: { en: "Iron Earring", th: "" },
    description: { en: "Plain iron earring. Slightly more durable.", th: "" },
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
    image: "ironEarring",
    isCraftable: true,
    weight: 1,
    blueprintId: undefined,
  },
  {},
  { armorClass: ArmorClass.Cloth },
);
