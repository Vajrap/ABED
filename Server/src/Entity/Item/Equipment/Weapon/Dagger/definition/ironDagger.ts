import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { DaggerId } from "../../type";
import { Dagger } from "../Dagger";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

export const ironDagger = new Dagger(
  {
    id: DaggerId.IronDagger,
    name: {
      en: "Iron Dagger",
      th: "มีดสั้นเหล็ก",
    },
    description: {
      en: "A sharp iron dagger, light and quick.",
      th: "มีดสั้นเหล็กที่คมกริบ เบาและรวดเร็ว",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 30,
      bonusCost: 0,
      cost: 30,
      marketCost: 30,
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
    image: "ironDagger",
    isCraftable: true,
    weight: 1,
    resource: new Map(),
  },
  {},
  {
    handle: 1,
    damage: {
      physicalDamageDice: {
        face: 6,
        dice: 1,
      },
      magicalDamageDice: {
        face: 4,
        dice: 1,
      },
      physicalDamageType: DamageType.pierce,
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

