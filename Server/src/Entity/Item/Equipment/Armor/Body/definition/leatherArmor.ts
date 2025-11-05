import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BodyId } from "../../type";
import { Body } from "../Body";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

export const leatherArmor = new Body(
  {
    id: BodyId.LeatherArmor,
    name: { en: "Leather Armor", th: "" },
    description: { en: "", th: "" },
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
    image: "leatherArmor",
    isCraftable: true,
    weight: 60,
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Light,
    pDef: { slash: 2, pierce: 1, blunt: 0 },
    dodge: 0,
    requirement: { strength: 5 },
  },
);
