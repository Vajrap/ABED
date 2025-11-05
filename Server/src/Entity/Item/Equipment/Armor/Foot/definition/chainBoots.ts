import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { FootId } from "../../type";
import { Foot } from "../Foot";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

// ⛓️ Medium
export const chainBoots = new Foot(
  {
    id: FootId.ChainBoots,
    name: { en: "Chain Boots", th: "" },
    description: {
      en: "Metal-linked boots that protect the lower legs.",
      th: "",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 9,
      bonusCost: 0,
      cost: 9,
      marketCost: 9,
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
    image: "chainBoots",
    isCraftable: true,
    weight: 9, // 0.9 kg
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Medium,
    dodge: -1,
  },
);
