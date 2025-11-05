import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { HandId } from "../../type";
import { Hand } from "../Hand";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

export const leatherGloves = new Hand(
  {
    id: HandId.LeatherGloves,
    name: { en: "Leather Gloves", th: "" },
    description: { en: "Durable gloves made from treated hide.", th: "" },
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
    image: "leatherGloves",
    isCraftable: true,
    weight: 4, // 0.4 kg
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Light,
    pDef: { slash: 0, pierce: 0, blunt: 0 },
    mDef: { order: 0, chaos: 0, fire: 0, earth: 0, water: 0, air: 0 },
    dodge: 0,
  },
);
