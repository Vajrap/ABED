import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { DaggerId } from "../../type";
import { Dagger } from "../Dagger";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const stiletto = new Dagger(
  {
    id: DaggerId.Stiletto,
    name: {
      en: "Stiletto",
      th: "มีดสั้น",
    },
    description: {
      en: "A sharp stiletto, use in stabbing",
      th: "มีดขนาดเล็ก ใช้สำหรับแทง",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 305, // TEMP: Using resources as placeholder. Final cost = (iron ingots + wooden grip) + 100 copper handicraft
      bonusCost: 0,
      cost: 305,
      marketCost: 305,
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
    image: "ironStiletto",
    isCraftable: true,
    weight: 1,
    blueprintId: BlueprintId.Weapon_Stiletto,
  },
  {},
  {
    handle: 1,
    damage: {
      physicalDamageDice: {
        face: 4,
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
