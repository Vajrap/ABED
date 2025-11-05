import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ShieldId } from "../../type";
import { Shield } from "../Shield";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { ItemCategoryType } from "src/Entity/Item";
import { ResourceType } from "src/InterFacesEnumsAndTypes/ResourceTypes";

export const buckler = new Shield(
  {
    id: ShieldId.Buckler,
    name: { en: "Buckler", th: "โล่นับ" },
    description: { en: "A round shield.", th: "โล่นับ" },
    tier: TierEnum.common,
    cost: {
      baseCost: 405, // TEMP: ore: 30*10=300 + wood: 2*5=10 + handicraft: 100 = 410
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
    image: "ironRoundShield",
    isCraftable: true,
    weight: 10,
    blueprintId: {
      resource: new Map<ResourceType, number>([
        ["ore", 30],
        ["wood", 2],
      ]),
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
