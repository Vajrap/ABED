import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BodyId } from "../../type";
import { Body } from "../Body";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

export const mageRobe = new Body(
  {
    id: BodyId.MageRobe,
    name: { en: "Mage Robe", th: "" },
    description: {
      en: "",
      th: "",
    },
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
    image: "mageRobes",
    isCraftable: true,
    weight: 5,
    blueprintId: undefined,
  },
  {},
  {
    armorClass: ArmorClass.Cloth,
    pDef: { slash: 0, pierce: 0, blunt: 0 },
    mAtk: { order: 1, chaos: 1, fire: 1, earth: 1, water: 1, air: 1 },
  },
);
