import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { HeadWearId } from "../../type";
import { HeadWear } from "../HeadWear";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

export const tatteredCap = new HeadWear(
  {
    id: HeadWearId.TatteredCap,
    name: { en: "Tattered Cap", th: "หมวกเสื่อมโทรม" },
    description: { en: "A worn and tattered cap.", th: "หมวกเก่าและเสื่อมโทรม" },
    tier: TierEnum.common,
    cost: { baseCost: 1, bonusCost: 0, cost: 1, marketCost: 1, numberOfSellThisWeek: 0, possibleDeviation: 0, seasonalDeviation: { [SeasonEnum.Seeding]: 0, [SeasonEnum.RainFall]: 0, [SeasonEnum.GreenTide]: 0, [SeasonEnum.HarvestMoon]: 0, [SeasonEnum.SunDry]: 0, [SeasonEnum.Frostveil]: 0, [SeasonEnum.LongDark]: 0 } },
    image: "tatteredCap",
    isCraftable: false,
    weight: 0,
    craftingRecipe: new Map(),
  },
  {},
  {
    armorClass: ArmorClass.Cloth,
    pDef: { slash: 0, pierce: 0, blunt: 1 },
    mDef: { order: 0, chaos: 0, fire: 0, earth: 0, water: 0, air: 0 },
    dodge: 0,
  },
);

