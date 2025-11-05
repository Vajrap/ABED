import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { EarId } from "../../type";
import { Ear } from "../Ear";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

export const goldEarring = new Ear(
  {
    id: EarId.GoldEarring,
    name: { en: "Gold Earring", th: "" },
    description: {
      en: "A luxurious gold earring, gleaming with status.",
      th: "",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 10,
      bonusCost: 0,
      cost: 10,
      marketCost: 10,
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
    image: "goldEarring",
    isCraftable: true,
    weight: 1,
    blueprintId: undefined,
  },
  {},
  { armorClass: ArmorClass.Cloth },
);
