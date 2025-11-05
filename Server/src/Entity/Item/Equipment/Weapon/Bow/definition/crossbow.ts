import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BowId } from "../../type";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { ResourceType } from "src/InterFacesEnumsAndTypes/ResourceTypes";
import { ItemCategoryType } from "src/Entity/Item";
import { Bow } from "../Bow";

export const crossbow = new Bow(
  {
    id: BowId.Crossbow,
    name: {
      en: "Crossbow",
      th: "",
    },
    description: {
      en: "",
      th: "",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 405, // TEMP: ore: 30*10=300 + wood: 2*5=10 + silk: 1*5=5 + handicraft: 100 = 415
      bonusCost: 0,
      cost: 405,
      marketCost: 405,
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
    image: "oakCrossBow",
    isCraftable: true,
    weight: 30,
    blueprintId: {
      resource: new Map<ResourceType, number>([
        ["ore", 30],
        ["wood", 2],
        ["silk", 1],
      ]),
      item: new Map<ItemCategoryType, number>([
        ["plank", 2],
        ["ingot", 1],
        ["thread", 1],
      ]),
    },
  },
  {},
  {
    handle: 2,
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
      physicalDamageStat: ["dexterity"],
      magicalDamageStat: ["planar"],
      physicalHitStat: ["dexterity"],
      magicalHitStat: ["control"],
      physicalCritStat: ["luck"],
      magicalCritStat: ["luck"],
    },
  },
);
