import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SwordId } from "../../type";
import { Sword } from "../Sword";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const rapier = new Sword(
  {
    id: SwordId.Rapier,
    name: {
      en: "Rapier",
      th: "เรเปียร์",
    },
    description: {
      en: "A pointy rapier, use for stabbing",
      th: "เรเปียร์ปลายแหลม ใช้สำหรับแทงเป้าหมาย",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 605, // TEMP: Using resources as placeholder. Final cost = (iron ingots + wooden handle) + 100 copper handicraft
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
    image: "ironRapier",
    isCraftable: true,
    weight: 10,
    blueprintId: BlueprintId.Weapon_Rapier,
  },
  {},
  {
    handle: 1,
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
