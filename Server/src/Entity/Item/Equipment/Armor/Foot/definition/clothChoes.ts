import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { FootId } from "../../type";
import { Foot } from "../Foot";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

// 🩰 Cloth
export const clothShoes = new Foot(
  {
    id: FootId.ClothShoes,
    name: { en: "Cloth Shoes", th: "" },
    description: {
      en: "Soft cloth shoes for comfort, not for battle.",
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
    image: "clothShoes",
    isCraftable: true,
    weight: 2, // 0.2 kg
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Cloth,
  },
);
