import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SwordId } from "../../type";
import { Sword } from "../Sword";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

export const ironSword = new Sword(
  {
    id: SwordId.IronSword,
    name: {
      en: "Iron Sword",
      th: "ดาบเหล็ก",
    },
    description: {
      en: "A sturdy iron sword, reliable and sharp.",
      th: "ดาบเหล็กที่แข็งแกร่ง เชื่อถือได้และคมกริบ",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 50,
      bonusCost: 0,
      cost: 50,
      marketCost: 50,
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
    image: "ironSword",
    isCraftable: true,
    weight: 3,
    resource: new Map(),
  },
  {},
  {
    handle: 1,
    damage: {
      physicalDamageDice: {
        face: 8,
        dice: 1,
      },
      magicalDamageDice: {
        face: 4,
        dice: 1,
      },
      physicalDamageType: DamageType.slash,
      magicalDamageType: DamageType.arcane,
      physicalDamageStat: ["strength"],
      magicalDamageStat: ["planar"],
      physicalHitStat: ["dexterity"],
      magicalHitStat: ["control"],
      physicalCritStat: ["luck"],
      magicalCritStat: ["luck"],
    },
  },
);

