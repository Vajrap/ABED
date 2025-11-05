import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { HandId } from "../../type";
import { Hand } from "../Hand";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

export const clothGloves = new Hand(
  {
    id: HandId.ClothGloves,
    name: { en: "Cloth Gloves", th: "" },
    description: {
      en: "Simple gloves providing minimal warmth and grip.",
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
    image: "clothGloves",
    isCraftable: true,
    weight: 2, // 0.2 kg
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Cloth,
  },
);
