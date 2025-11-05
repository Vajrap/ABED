import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SpearId } from "../../type";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { Spear } from "../Spear";
import { ResourceType } from "src/InterFacesEnumsAndTypes/ResourceTypes.ts";
import { ItemCategoryType } from "src/Entity/Item";

export const javelin = new Spear(
  {
    id: SpearId.Javelin,
    name: {
      en: "Javelin",
      th: "",
    },
    description: {
      en: "",
      th: "",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 305, // TEMP: ore: 20*10=200 + wood: 1*5=5 + handicraft: 100 = 305
      bonusCost: 0,
      cost: 305,
      marketCost: 305,
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
    image: "ironJavelin",
    isCraftable: true,
    weight: 8,
    blueprintId: {
      resource: new Map<ResourceType, number>([
        ["ore", 20],
        ["wood", 1],
      ]),
      item: new Map<ItemCategoryType, number>([
        ["ingot", 2],
        ["plank", 1],
      ]),
    },
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
      physicalDamageStat: ["dexterity"],
      magicalDamageStat: ["planar"],
      physicalHitStat: ["dexterity"],
      magicalHitStat: ["control"],
      physicalCritStat: ["luck"],
      magicalCritStat: ["luck"],
    },
  },
);
