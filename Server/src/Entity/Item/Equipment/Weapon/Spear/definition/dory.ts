import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SpearId } from "../../type";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { Spear } from "../Spear";
import { ResourceType } from "src/InterFacesEnumsAndTypes/ResourceTypes.ts";
import { ItemCategoryType } from "src/Entity/Item";

export const dory = new Spear(
  {
    id: SpearId.Dory,
    name: {
      en: "Dory",
      th: "หอก",
    },
    description: {
      en: "",
      th: "",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 505, // TEMP: ore: 40*10=400 + wood: 1*5=5 + handicraft: 100 = 505
      bonusCost: 0,
      cost: 505,
      marketCost: 505,
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
    weight: 20,
    blueprintId: {
      resource: new Map<ResourceType, number>([
        ["ore", 40],
        ["wood", 1],
      ]),
      item: new Map<ItemCategoryType, number>([
        ["ingot", 3],
        ["plank", 1],
      ]),
    },
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
