import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { UtilId } from "../../type";
import { Util } from "../Util";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

export const mechanic = new Util(
  {
    id: UtilId.Mechanic,
    name: { en: "Mechanic Device", th: "" },
    description: {
      en: "A small mechanical device of intricate design.",
      th: "",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 7,
      bonusCost: 0,
      cost: 7,
      marketCost: 7,
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
    image: "mechanic",
    isCraftable: true,
    weight: 7, // 0.7 kg
    blueprintId: undefined,
  },
  {},
  { armorClass: ArmorClass.Cloth },
);
