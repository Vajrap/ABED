import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BodyId } from "../../type";
import { Body } from "../Body";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

export const tatteredClothes = new Body(
  {
    id: BodyId.TatteredClothes,
    name: { en: "Tattered Clothes", th: "เสื้อผ้าขาดวิ่น" },
    description: { en: "Old and torn clothing.", th: "เสื้อผ้าเก่าและขาดวิ่น" },
    tier: TierEnum.common,
    cost: { baseCost: 1, bonusCost: 0, cost: 1, marketCost: 1, numberOfSellThisWeek: 0, possibleDeviation: 0, seasonalDeviation: { [SeasonEnum.Seeding]: 0, [SeasonEnum.RainFall]: 0, [SeasonEnum.GreenTide]: 0, [SeasonEnum.HarvestMoon]: 0, [SeasonEnum.SunDry]: 0, [SeasonEnum.Frostveil]: 0, [SeasonEnum.LongDark]: 0 } },
    image: "tatteredClothes",
    isCraftable: false,
    weight: 1,
    craftingRecipe: new Map(),
  },
  {},
  {
    armorClass: ArmorClass.Cloth,
    pDef: { slash: 0, pierce: 0, blunt: 0 },
    mDef: { order: 0, chaos: 0, fire: 0, earth: 0, water: 0, air: 0 },
    dodge: 0,
  },
);

