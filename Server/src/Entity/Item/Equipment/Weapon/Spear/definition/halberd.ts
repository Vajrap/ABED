import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SpearId } from "../../type";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { Spear } from "../Spear";
import { ItemCategoryType } from "src/Entity/Item";
import { ResourceType } from "src/InterFacesEnumsAndTypes/ResourceTypes.ts";

export const halberd = new Spear(
  {
    id: SpearId.Halberd,
    name: {
      en: "Halberd",
      th: "",
    },
    description: {
      en: "",
      th: "",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 1110, // TEMP: ore: 100*10=1000 + wood: 2*5=10 + handicraft: 100 + hitmod -2 = 1110
      bonusCost: 0,
      cost: 1110,
      marketCost: 1110,
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
    image: "ironHalberd",
    isCraftable: true,
    weight: 35,
    blueprintId: {
      resource: new Map<ResourceType, number>([
        ["ore", 100],
        ["wood", 2],
      ]),
      item: new Map<ItemCategoryType, number>([
        ["ingot", 4],
        ["plank", 2],
      ]),
    },
  },
  { battleStatus: { pHIT: -2 } },
  {
    handle: 2,
    damage: {
      physicalDamageDice: {
        face: 6,
        dice: 2,
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
