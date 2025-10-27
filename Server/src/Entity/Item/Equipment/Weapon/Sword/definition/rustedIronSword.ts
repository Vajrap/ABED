import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SwordId } from "../../type";
import { Sword } from "../Sword";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

export const rustedIronSword = new Sword(
  {
    id: SwordId.RustedIronSword,
    name: { en: "Rusted Iron Sword", th: "ดาบเหล็กสนิม" },
    description: { en: "A rusted iron sword, damaged but still usable.", th: "ดาบเหล็กที่เป็นสนิม เสียหายแต่ยังใช้ได้" },
    tier: TierEnum.common,
    cost: { baseCost: 10, bonusCost: 0, cost: 10, marketCost: 10, numberOfSellThisWeek: 0, possibleDeviation: 0, seasonalDeviation: { [SeasonEnum.Seeding]: 0, [SeasonEnum.RainFall]: 0, [SeasonEnum.GreenTide]: 0, [SeasonEnum.HarvestMoon]: 0, [SeasonEnum.SunDry]: 0, [SeasonEnum.Frostveil]: 0, [SeasonEnum.LongDark]: 0 } },
    image: "rustedIronSword",
    isCraftable: true,
    weight: 3,
    resource: new Map(),
  },
  {},
  {
    handle: 1,
    damage: { physicalDamageDice: { face: 6, dice: 1 }, magicalDamageDice: { face: 2, dice: 1 }, physicalDamageType: DamageType.slash, magicalDamageType: DamageType.arcane, physicalDamageStat: ["strength"], magicalDamageStat: ["planar"], physicalHitStat: ["dexterity"], magicalHitStat: ["control"], physicalCritStat: ["luck"], magicalCritStat: ["luck"] },
  },
);

