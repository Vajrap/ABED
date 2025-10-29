import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { DaggerId } from "../../type";
import { Dagger } from "../Dagger";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { ResourceType} from "src/InterFacesEnumsAndTypes/ResourceTypes";
import { ItemId } from "src/Entity/Item";

export const ironStiletto = new Dagger(
  {
    id: DaggerId.IronStiletto,
    name: {
      en: "Iron Stiletto",
      th: "มีดสั้นเหล็ก",
    },
    description: {
      en: "A sharp stiletto, use in stabbing",
      th: "มีดขนาดเล็ก ใช้สำหรับแทง",
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
    image: "ironStiletto",
    isCraftable: true,
    weight: 1,
    craftingRecipe: {
        resource: new Map<ResourceType, number>([
           ['ore', 20],
            ['wood', 5]
        ]),
        item: new Map<ItemId, number>([
            // [ItemId.ironIngot, 2]
            // [ItemId.woodenGrip, 1]
        ])
    }
  },
  {},
  {
    handle: 1,
    damage: {
      physicalDamageDice: {
        face: 4,
        dice: 1,
      },
      magicalDamageDice: {
        face: 4,
        dice: 1,
      },
      physicalDamageType: DamageType.pierce,
      magicalDamageType: DamageType.arcane,
      physicalDamageStat: ["dexterity"],
      magicalDamageStat: ["planar"],
      physicalHitStat: ["dexterity"],
      magicalHitStat: ["control"],
      physicalCritStat: ["luck"],
      magicalCritStat: ["luck"],
    },
  },
);

