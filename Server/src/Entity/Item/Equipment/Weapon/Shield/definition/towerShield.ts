import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ShieldId } from "../../type";
import { Shield } from "../Shield";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { ItemCategoryType } from "src/Entity/Item";
import { ResourceType } from "src/InterFacesEnumsAndTypes/ResourceTypes";

export const towerShield = new Shield(
  {
    id: ShieldId.TowerShield,
    name: { en: "Tower Shield", th: "โล่หอ" },
    description: { en: "A large tower shield.", th: "โล่หอขนาดใหญ่" },
    tier: TierEnum.common,
    cost: {
      baseCost: 55, // TEMP: wood: 3*5=15 + handicraft: 100 = 115, but basic
      bonusCost: 0,
      cost: 55,
      marketCost: 55,
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
    image: "woodenTowerShield",
    isCraftable: true,
    weight: 14,
    blueprintId: {
      resource: new Map<ResourceType, number>([["wood", 3]]),
      item: new Map<ItemCategoryType, number>([
        // Shields will be updated based on guide - placeholder for now
      ]),
    },
  },
  {},
  {
    handle: 1,
    damage: {
      physicalDamageDice: { face: 4, dice: 1 },
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
