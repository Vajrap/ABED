import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { HeadWearId } from "../../type";
import { HeadWear } from "../HeadWear";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

export const leatherCap = new HeadWear(
  {
    id: HeadWearId.LeatherCap,
    name: { en: "Leather Cap", th: "" },
    description: {
      en: "",
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
    image: "leatherCap",
    isCraftable: true,
    weight: 5,
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Light,
    pDef: { slash: 0, pierce: 0, blunt: 0 },
  },
);
