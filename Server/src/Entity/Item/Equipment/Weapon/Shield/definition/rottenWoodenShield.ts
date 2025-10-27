import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ShieldId } from "../../type";
import { Shield } from "../Shield";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

export const rottenWoodenShield = new Shield(
  {
    id: ShieldId.RottenWoodenShield,
    name: { en: "Rotten Wooden Shield", th: "โล่ไม้ผุ" },
    description: { en: "A rotten wooden shield, barely holding together.", th: "โล่ไม้ที่ผุพัง แทบจะไม่เป็นรูปเป็นร่าง" },
    tier: TierEnum.common,
    cost: { baseCost: 3, bonusCost: 0, cost: 3, marketCost: 3, numberOfSellThisWeek: 0, possibleDeviation: 0, seasonalDeviation: { [SeasonEnum.Seeding]: 0, [SeasonEnum.RainFall]: 0, [SeasonEnum.GreenTide]: 0, [SeasonEnum.HarvestMoon]: 0, [SeasonEnum.SunDry]: 0, [SeasonEnum.Frostveil]: 0, [SeasonEnum.LongDark]: 0 } },
    image: "rottenWoodenShield",
    isCraftable: false,
    weight: 2,
    resource: new Map(),
  },
  {battleStatus: {pDEF: 2}},
  {
    handle: 1,
    damage: { physicalDamageDice: { face: 3, dice: 1 }, magicalDamageDice: { face: 1, dice: 1 }, physicalDamageType: DamageType.blunt, magicalDamageType: DamageType.arcane, physicalDamageStat: ["strength"], magicalDamageStat: ["planar"], physicalHitStat: ["dexterity"], magicalHitStat: ["control"], physicalCritStat: ["luck"], magicalCritStat: ["luck"] },
  },
);

