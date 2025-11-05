import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { FootId } from "../../type";
import { Foot } from "../Foot";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

// 🦿 Heavy
export const plateSabatons = new Foot(
  {
    id: FootId.PlateSabatons,
    name: { en: "Plate Sabatons", th: "" },
    description: {
      en: "Heavy steel sabatons for maximum protection and stability.",
      th: "",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 14,
      bonusCost: 0,
      cost: 14,
      marketCost: 14,
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
    image: "plateSabatons",
    isCraftable: true,
    weight: 12, // 1.2 kg
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Heavy,
    dodge: -2,
  },
);
