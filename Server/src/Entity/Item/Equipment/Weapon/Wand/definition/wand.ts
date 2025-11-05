import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { WandId } from "../../type";
import { Wand } from "../Wand";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { ItemCategoryType } from "src/Entity/Item";
import { ResourceType } from "src/InterFacesEnumsAndTypes/ResourceTypes";

export const wand = new Wand(
  {
    id: WandId.Wand,
    name: { en: "Wand", th: "คทา" },
    description: { en: "A simple wand.", th: "คทาธรรมดา" },
    tier: TierEnum.common,
    cost: {
      baseCost: 105, // TEMP: wood: 1*5=5 + handicraft: 100 = 105
      bonusCost: 0,
      cost: 105,
      marketCost: 105,
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
    image: "oakWand",
    isCraftable: true,
    weight: 2,
    blueprintId: {
      resource: new Map<ResourceType, number>([["wood", 1]]),
      item: new Map<ItemCategoryType, number>([
        ["plank", 1],
        ["gem", 1],
      ]),
    },
  },
  {},
  {
    handle: 1,
    damage: {
      physicalDamageDice: { face: 6, dice: 1 },
      magicalDamageDice: { face: 3, dice: 2 },
      physicalDamageType: DamageType.blunt,
      magicalDamageType: DamageType.arcane,
      physicalDamageStat: ["planar"],
      magicalDamageStat: ["planar"],
      physicalHitStat: ["dexterity"],
      magicalHitStat: ["control"],
      physicalCritStat: ["luck"],
      magicalCritStat: ["luck"],
    },
  },
);
