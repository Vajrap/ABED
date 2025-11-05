import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { StaffId } from "../../type";
import { Staff } from "../Staff";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { ItemCategoryType } from "src/Entity/Item";
import { ResourceType } from "src/InterFacesEnumsAndTypes/ResourceTypes";

export const staff = new Staff(
  {
    id: StaffId.Staff,
    name: { en: "Staff", th: "ไม้เท้า" },
    description: { en: "A basic staff.", th: "ไม้เท้าพื้นฐาน" },
    tier: TierEnum.common,
    cost: {
      baseCost: 115, // TEMP: wood: 2*5=10 + handicraft: 100 = 110
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
    image: "oakStaff",
    isCraftable: true,
    weight: 8,
    blueprintId: {
      resource: new Map<ResourceType, number>([["wood", 2]]),
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
      physicalDamageDice: { face: 4, dice: 1 },
      magicalDamageDice: { face: 3, dice: 2 },
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
