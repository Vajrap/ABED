import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { HeadWearId } from "../../type";
import { HeadWear } from "../HeadWear";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

export const chainCoif = new HeadWear(
  {
    id: HeadWearId.ChainCoif,
    name: { en: "Chain Coif", th: "" },
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
    image: "chainCoif",
    isCraftable: true,
    weight: 8,
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Medium,
    pDef: { slash: 0, pierce: 0, blunt: 1 },
    dodge: -1,
  },
);
