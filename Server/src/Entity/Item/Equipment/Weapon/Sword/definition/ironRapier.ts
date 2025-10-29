import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SwordId } from "../../type";
import { Sword } from "../Sword";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import {ItemId} from "src/Entity/Item";
import {ResourceType} from "src/InterFacesEnumsAndTypes/ResourceTypes.ts";

export const ironRapier = new Sword(
  {
    id: SwordId.IronRapier,
    name: {
      en: "Iron Rapier",
      th: "เรเปียร์เหล็ก",
    },
    description: {
      en: "An iron pointy rapier, use for stabbing",
      th: "เรเปียร์เหล็กปลายแหลม ใช้สำหรับแทงเป้าหมาย",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 70,
      bonusCost: 0,
      cost: 70,
      marketCost: 70,
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
    image: "ironRapier",
    isCraftable: true,
    weight: 10,
    craftingRecipe: {
        resource: new Map<ResourceType, number>([
            ['ore', 50],
            ['wood', 5]
        ]),
        item: new Map<ItemId, number>([
            // [ItemId.ironIngot, 5]
            // [ItemId.woodenGrip, 1]
        ]),
    }
  },
  {},
  {
    handle: 1,
    damage: {
      physicalDamageDice: {
        face: 8,
        dice: 1
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

