import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BodyId } from "../../type";
import { Body } from "../Body";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { ArmorClass } from "../../Armor";

export const poorLeatherArmor = new Body(
  {
    id: BodyId.PoorLeatherArmor,
    name: { en: "Poor Leather Armor", th: "เสื้อเกราะหนังแบบแย่" },
    description: { en: "Worn and patched leather armor.", th: "เสื้อเกราะหนังที่สึกกร่อนและมีรอยปะ" },
    tier: TierEnum.common,
    cost: { baseCost: 8, bonusCost: 0, cost: 8, marketCost: 8, numberOfSellThisWeek: 0, possibleDeviation: 0, seasonalDeviation: { [SeasonEnum.Seeding]: 0, [SeasonEnum.RainFall]: 0, [SeasonEnum.GreenTide]: 0, [SeasonEnum.HarvestMoon]: 0, [SeasonEnum.SunDry]: 0, [SeasonEnum.Frostveil]: 0, [SeasonEnum.LongDark]: 0 } },
    image: "poorLeatherArmor",
    isCraftable: true,
    weight: 3,
    craftingRecipe: new Map(),
  },
  {},
  {
    armorClass: ArmorClass.Light,
    pDef: { slash: 1, pierce: 1, blunt: 2 },
    mDef: { order: 0, chaos: 0, fire: 0, earth: 0, water: 0, air: 0 },
    dodge: 0,
  },
);

