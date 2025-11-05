import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { UtilId } from "../../type";
import { Util } from "../Util";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

export const totem = new Util(
  {
    id: UtilId.Totem,
    name: { en: "Totem", th: "" },
    description: {
      en: "A carved totem symbolizing spirits of nature.",
      th: "",
    },
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
    image: "totem",
    isCraftable: true,
    weight: 6, // 0.6 kg
    blueprintId: undefined,
  },
  {},
  { armorClass: ArmorClass.Cloth },
);
