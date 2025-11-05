import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BodyId } from "../../type";
import { Body } from "../Body";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";
import { ItemCategoryType } from "src/Entity/Item";

export const paddedArmor = new Body(
  {
    id: BodyId.PaddedArmor,
    name: { en: "Padded Armor", th: "" },
    description: {
      en: "",
      th: "",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 8,
      bonusCost: 0,
      cost: 8,
      marketCost: 8,
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
    image: "paddedArmor",
    isCraftable: true,
    weight: 30,
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Light,
    pDef: { slash: 1, pierce: 0, blunt: 1 },
    dodge: 0,
    requirement: { strength: 4 },
  },
);
