import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { HammerId } from "../../type";
import { Hammer } from "../Hammer";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { ItemCategoryType } from "src/Entity/Item";
import { ResourceType } from "src/InterFacesEnumsAndTypes/ResourceTypes";

export const hammer = new Hammer(
  {
    id: HammerId.Hammer,
    name: { en: "Hammer", th: "ค้อน" },
    description: { en: "A heavy hammer.", th: "ค้อนหนัก" },
    tier: TierEnum.common,
    cost: {
      baseCost: 705, // TEMP: ore: 60*10=600 + wood: 1*5=5 + handicraft: 100 = 705
      bonusCost: 0,
      cost: 705,
      marketCost: 705,
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
    image: "ironHammer",
    isCraftable: true,
    weight: 12,
    blueprintId: {
      resource: new Map<ResourceType, number>([
        ["ore", 60],
        ["wood", 1],
      ]),
      item: new Map<ItemCategoryType, number>([
        ["ingot", 3],
        ["plank", 1],
      ]),
    },
  },
  { battleStatus: { pHIT: -1 } },
  {
    handle: 1,
    damage: {
      physicalDamageDice: { face: 10, dice: 1 },
      magicalDamageDice: { face: 4, dice: 1 },
      physicalDamageType: DamageType.blunt,
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
