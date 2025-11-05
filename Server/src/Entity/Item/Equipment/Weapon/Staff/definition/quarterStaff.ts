import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { StaffId } from "../../type";
import { Staff } from "../Staff";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { ItemCategoryType } from "src/Entity/Item";
import { ResourceType } from "src/InterFacesEnumsAndTypes/ResourceTypes";

export const quarterStaff = new Staff(
  {
    id: StaffId.QuarterStaff,
    name: { en: "Quarter Staff", th: "กระบอง" },
    description: { en: "A simple quarterstaff.", th: "กระบองธรรมดา" },
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
    image: "oakQuarterStaff",
    isCraftable: true,
    weight: 8,
    blueprintId: {
      resource: new Map<ResourceType, number>([["wood", 2]]),
      item: new Map<ItemCategoryType, number>([["plank", 2]]),
    },
  },
  {},
  {
    handle: 1,
    damage: {
      physicalDamageDice: { face: 6, dice: 1 },
      magicalDamageDice: { face: 2, dice: 2 },
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
