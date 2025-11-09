import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { DaggerId } from "../../type";
import { Dagger } from "../Dagger";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const knife = new Dagger(
  {
    id: DaggerId.Knife,
    name: {
      en: "Knife",
      th: "มีดสั้น",
    },
    description: {
      en: "A sharp knife, use in cutting",
      th: "มีดขนาดเล็ก ใช้สำหรับเฉือน",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 305, // TEMP: Using resources as placeholder. Final cost = (iron ingots + wooden grip) + 100 copper handicraft
      bonusCost: 0,
      cost: 305,
      marketCost: 305,
    },
    image: "ironStiletto",
    isCraftable: true,
    weight: 1,
    blueprintId: BlueprintId.Weapon_Knife,
  },
  {},
  {
    handle: 1,
    damage: {
      physicalDamageDice: {
        face: 6,
        dice: 1,
      },
      magicalDamageDice: {
        face: 4,
        dice: 1,
      },
      physicalDamageType: DamageType.slash,
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
