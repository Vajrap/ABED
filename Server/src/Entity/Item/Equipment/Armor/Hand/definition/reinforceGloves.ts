import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { HandId } from "../../type";
import { Hand } from "../Hand";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

export const reinforcedGloves = new Hand(
  {
    id: HandId.ReinforcedGloves,
    name: { en: "Reinforced Gloves", th: "" },
    description: {
      en: "Padded gloves with light reinforcement for better grip.",
      th: "",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 6,
      bonusCost: 0,
      cost: 6,
      marketCost: 6,
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
    image: "reinforcedGloves",
    isCraftable: true,
    weight: 6, // 0.6 kg
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Medium,
    pDef: { slash: 0, pierce: 0, blunt: 0 },
    mDef: { order: 0, chaos: 0, fire: 0, earth: 0, water: 0, air: 0 },
    dodge: 0,
  },
);
