import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { HammerId } from "../../type";
import { Hammer } from "../Hammer";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { ItemCategoryType } from "src/Entity/Item";
import { ResourceType } from "src/InterFacesEnumsAndTypes/ResourceTypes";

export const scepter = new Hammer(
  {
    id: HammerId.Scepter,
    name: { en: "Scepter", th: "คทา" },
    description: { en: "A magical hybrid weapon.", th: "คทา เป็นอาวุธเวทผสม" },
    tier: TierEnum.common,
    cost: {
      baseCost: 205, // TEMP: ore: 10*10=100 + wood: 1*5=5 + handicraft: 100 = 205
      bonusCost: 0,
      cost: 205,
      marketCost: 205,
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
    image: "ironScepter",
    isCraftable: true,
    weight: 5,
    blueprintId: {
      resource: new Map<ResourceType, number>([
        ["ore", 10],
        ["wood", 1],
      ]),
      item: new Map<ItemCategoryType, number>([
        ["ingot", 2],
        ["gem", 1],
      ]),
    },
  },
  {},
  {
    handle: 1,
    damage: {
      physicalDamageDice: { face: 8, dice: 1 },
      magicalDamageDice: { face: 4, dice: 2 },
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
