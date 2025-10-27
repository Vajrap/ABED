import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MaceId } from "../../type";
import { Mace } from "../Mace";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

export const rustedIronMace = new Mace(
  {
    id: MaceId.RustedIronMace,
    name: { en: "Rusted Iron Mace", th: "กระบองเหล็กสนิม" },
    description: { en: "A rusted iron mace, heavy and crude.", th: "กระบองเหล็กที่เป็นสนิม หนักและหยาบ" },
    tier: TierEnum.common,
    cost: { baseCost: 8, bonusCost: 0, cost: 8, marketCost: 8, numberOfSellThisWeek: 0, possibleDeviation: 0, seasonalDeviation: { [SeasonEnum.Seeding]: 0, [SeasonEnum.RainFall]: 0, [SeasonEnum.GreenTide]: 0, [SeasonEnum.HarvestMoon]: 0, [SeasonEnum.SunDry]: 0, [SeasonEnum.Frostveil]: 0, [SeasonEnum.LongDark]: 0 } },
    image: "rustedIronMace",
    isCraftable: true,
    weight: 2,
    resource: new Map(),
  },
  {},
  {
    handle: 1,
    damage: { physicalDamageDice: { face: 6, dice: 1 }, magicalDamageDice: { face: 2, dice: 1 }, physicalDamageType: DamageType.blunt, magicalDamageType: DamageType.arcane, physicalDamageStat: ["strength"], magicalDamageStat: ["planar"], physicalHitStat: ["dexterity"], magicalHitStat: ["control"], physicalCritStat: ["luck"], magicalCritStat: ["luck"] },
  },
);

