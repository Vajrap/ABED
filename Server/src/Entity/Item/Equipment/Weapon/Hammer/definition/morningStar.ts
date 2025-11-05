import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { HammerId } from "../../type";
import { Hammer } from "../Hammer";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { ItemCategoryType } from "src/Entity/Item";
import { ResourceType } from "src/InterFacesEnumsAndTypes/ResourceTypes";

export const morningStar = new Hammer(
  {
    id: HammerId.MorningStar,
    name: { en: "Morning Star", th: "กระบองผา" },
    description: { en: "A spiked flail.", th: "กระบองหนามแหลม" },
    tier: TierEnum.common,
    cost: {
      baseCost: 605, // TEMP: ore: 50*10=500 + wood: 1*5=5 + handicraft: 100 = 605
      bonusCost: 0,
      cost: 605,
      marketCost: 605,
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
    image: "ironMorningStar",
    isCraftable: true,
    weight: 8,
    blueprintId: {
      resource: new Map<ResourceType, number>([
        ["ore", 50],
        ["wood", 1],
      ]),
      item: new Map<ItemCategoryType, number>([
        ["ingot", 3],
        ["leather", 1],
      ]),
    },
  },
  {},
  {
    handle: 1,
    damage: {
      physicalDamageDice: { face: 8, dice: 1 },
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
