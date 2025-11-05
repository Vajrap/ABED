import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { UtilId } from "../../type";
import { Util } from "../Util";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

export const idol = new Util(
  {
    id: UtilId.Idol,
    name: { en: "Idol", th: "" },
    description: { en: "A small carved idol of unknown origin.", th: "" },
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
    image: "idol",
    isCraftable: true,
    weight: 5, // 0.5 kg
    blueprintId: undefined,
  },
  {},
  { armorClass: ArmorClass.Cloth },
);
