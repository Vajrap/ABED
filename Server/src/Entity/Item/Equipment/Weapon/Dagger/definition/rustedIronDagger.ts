import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { DaggerId } from "../../type";
import { Dagger } from "../Dagger";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

export const rustedIronDagger = new Dagger(
  {
    id: DaggerId.RustedIronDagger,
    name: { en: "Rusted Iron Dagger", th: "มีดสั้นเหล็กสนิม" },
    description: { en: "A rusted iron dagger, worn but still sharp.", th: "มีดสั้นเหล็กที่เป็นสนิม เก่าแต่ยังคม" },
    tier: TierEnum.common,
    cost: { baseCost: 5, bonusCost: 0, cost: 5, marketCost: 5, numberOfSellThisWeek: 0, possibleDeviation: 0, seasonalDeviation: { [SeasonEnum.Seeding]: 0, [SeasonEnum.RainFall]: 0, [SeasonEnum.GreenTide]: 0, [SeasonEnum.HarvestMoon]: 0, [SeasonEnum.SunDry]: 0, [SeasonEnum.Frostveil]: 0, [SeasonEnum.LongDark]: 0 } },
    image: "rustedIronDagger",
    isCraftable: true,
    weight: 1,
    resource: new Map(),
  },
  {battleStatus: {pCRT: 2}},
  {
    handle: 1,
    damage: { physicalDamageDice: { face: 4, dice: 1 }, magicalDamageDice: { face: 2, dice: 1 }, physicalDamageType: DamageType.pierce, magicalDamageType: DamageType.arcane, physicalDamageStat: ["strength"], magicalDamageStat: ["planar"], physicalHitStat: ["dexterity"], magicalHitStat: ["control"], physicalCritStat: ["luck"], magicalCritStat: ["luck"] },
    
  },
);

