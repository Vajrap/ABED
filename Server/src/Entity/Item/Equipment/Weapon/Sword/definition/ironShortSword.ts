import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SwordId } from "../../type";
import { Sword } from "../Sword";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import {ItemId} from "src/Entity/Item";
import {ResourceType} from "src/InterFacesEnumsAndTypes/ResourceTypes.ts";

export const ironShortSword = new Sword(
  {
    id: SwordId.IronShortSword,
    name: {
      en: "Iron Short Sword",
      th: "กระบี่เหล็กสั้น",
    },
    description: {
      en: "A sturdy iron short sword, reliable and sharp.",
      th: "กระบี่สั้นที่ทำจากเหล็ก เชื่อถือได้และคมกริบ",
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
    image: "ironShortSword",
    isCraftable: true,
    weight: 10,
    craftingRecipe: {
        resource: new Map<ResourceType, number>([
            ['ore', 30],
            ['wood', 5]
        ]),
        item: new Map<ItemId, number>([
            // [ItemId.ironIngot, 3]
            // [ItemId.woodenGrip, 1]
        ]),
    }
  },
  {},
  {
    handle: 1,
    damage: {
      physicalDamageDice: {
        face: 6,
        dice: 1
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

