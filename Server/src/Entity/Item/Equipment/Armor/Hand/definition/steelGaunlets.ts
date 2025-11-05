import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { HandId } from "../../type";
import { Hand } from "../Hand";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

export const steelGauntlets = new Hand(
  {
    id: HandId.SteelGauntlets,
    name: { en: "Steel Gauntlets", th: "" },
    description: {
      en: "Heavy gauntlets made of steel, more for intimidation than comfort.",
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
    image: "steelGauntlets",
    isCraftable: true,
    weight: 10, // 1.0 kg
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Heavy,
    pDef: { slash: 0, pierce: 0, blunt: 0 },
    mDef: { order: 0, chaos: 0, fire: 0, earth: 0, water: 0, air: 0 },
    dodge: 0,
  },
);
