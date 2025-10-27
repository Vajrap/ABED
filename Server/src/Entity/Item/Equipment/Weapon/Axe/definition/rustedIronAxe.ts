import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { AxeId } from "../../type";
import { Axe } from "../Axe";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

export const rustedIronAxe = new Axe(
  {
    id: AxeId.RustedIronAxe,
    name: { en: "Rusted Iron Axe", th: "ขวานเหล็กสนิม" },
    description: { en: "A rusted iron axe, old but still deadly.", th: "ขวานเหล็กที่เป็นสนิม เก่าแต่ยังน่าสะพรึง" },
    tier: TierEnum.common,
    cost: { baseCost: 12, bonusCost: 0, cost: 12, marketCost: 12, numberOfSellThisWeek: 0, possibleDeviation: 0, seasonalDeviation: { [SeasonEnum.Seeding]: 0, [SeasonEnum.RainFall]: 0, [SeasonEnum.GreenTide]: 0, [SeasonEnum.HarvestMoon]: 0, [SeasonEnum.SunDry]: 0, [SeasonEnum.Frostveil]: 0, [SeasonEnum.LongDark]: 0 } },
    image: "rustedIronAxe",
    isCraftable: true,
    weight: 4,
    resource: new Map(),
  },
  {battleStatus: {pHIT: -2}},
  {
    handle: 1,
    damage: { physicalDamageDice: { face: 8, dice: 1 }, magicalDamageDice: { face: 2, dice: 1 }, physicalDamageType: DamageType.slash, magicalDamageType: DamageType.arcane, physicalDamageStat: ["strength"], magicalDamageStat: ["planar"], physicalHitStat: ["dexterity"], magicalHitStat: ["control"], physicalCritStat: ["luck"], magicalCritStat: ["luck"] },
  },
);

