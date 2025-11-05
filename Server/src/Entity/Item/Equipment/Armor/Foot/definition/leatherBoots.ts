import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { FootId } from "../../type";
import { Foot } from "../Foot";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

// 👢 Light (Combat)
export const leatherBoots = new Foot(
  {
    id: FootId.LeatherBoots,
    name: { en: "Leather Boots", th: "" },
    description: {
      en: "Sturdy leather boots offering minimal protection.",
      th: "",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 4,
      bonusCost: 0,
      cost: 4,
      marketCost: 4,
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
    image: "leatherBoots",
    isCraftable: true,
    weight: 6, // 0.6 kg
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Light,
  },
);
