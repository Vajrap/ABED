import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { OrbId } from "../../type";
import { Orb } from "../Orb";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { ItemCategoryType } from "src/Entity/Item";
import { ResourceType } from "src/InterFacesEnumsAndTypes/ResourceTypes";

export const orb = new Orb(
  {
    id: OrbId.Orb,
    name: { en: "Orb", th: "ลูกแก้ว" },
    description: { en: "An orb for magic.", th: "ลูกแก้วสำหรับเวทมนตร์" },
    tier: TierEnum.common,
    cost: {
      baseCost: 200, // TEMP: gemstone: 2*50=100 + handicraft: 100 = 200
      bonusCost: 0,
      cost: 200,
      marketCost: 200,
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
    image: "crystalOrb",
    isCraftable: true,
    weight: 2,
    blueprintId: {
      resource: new Map<ResourceType, number>([["gemstone", 2]]),
      item: new Map<ItemCategoryType, number>([
        ["gem", 1],
        ["ingot", 1],
      ]),
    },
  },
  {},
  {
    handle: 1,
    damage: {
      physicalDamageDice: { face: 4, dice: 1 },
      magicalDamageDice: { face: 5, dice: 2 },
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
