import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { LegId } from "../../type";
import { Leg } from "../Leg";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

// 🦿 Heavy
export const plateGreaves = new Leg(
  {
    id: LegId.PlateGreaves,
    name: { en: "Plate Greaves", th: "" },
    description: {
      en: "Heavy metal greaves providing excellent leg protection.",
      th: "",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 15,
      bonusCost: 0,
      cost: 15,
      marketCost: 15,
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
    image: "plateGreaves",
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
