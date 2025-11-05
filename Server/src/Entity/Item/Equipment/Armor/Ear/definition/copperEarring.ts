import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { EarId } from "../../type";
import { Ear } from "../Ear";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

export const copperEarring = new Ear(
  {
    id: EarId.CopperEarring,
    name: { en: "Copper Earring", th: "" },
    description: {
      en: "A simple copper earring with minor aesthetic appeal.",
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
    image: "copperEarring",
    isCraftable: true,
    weight: 1,
    blueprintId: undefined,
  },
  {},
  { armorClass: ArmorClass.Cloth },
);
