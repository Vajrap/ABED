import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BowId } from "../../type";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { ResourceType } from "src/InterFacesEnumsAndTypes/ResourceTypes";
import { ItemCategoryType } from "src/Entity/Item";
import { Bow } from "../Bow";

export const shortBow = new Bow(
  {
    id: BowId.ShortBow,
    name: {
      en: "Short Bow",
      th: "",
    },
    description: {
      en: "",
      th: "",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 115, // TEMP: wood: 2*5=10 + silk: 1*5=5 + handicraft: 100 = 115
      bonusCost: 0,
      cost: 115,
      marketCost: 115,
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
    image: "oakLongBow",
    isCraftable: true,
    weight: 7,
    blueprintId: {
      resource: new Map<ResourceType, number>([
        ["wood", 2],
        ["silk", 1],
      ]),
      item: new Map<ItemCategoryType, number>([
        ["plank", 2],
        ["thread", 1],
      ]),
    },
  },
  {},
  {
    handle: 2,
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
      physicalDamageStat: ["dexterity"],
      magicalDamageStat: ["planar"],
      physicalHitStat: ["dexterity"],
      magicalHitStat: ["control"],
      physicalCritStat: ["luck"],
      magicalCritStat: ["luck"],
    },
  },
);
