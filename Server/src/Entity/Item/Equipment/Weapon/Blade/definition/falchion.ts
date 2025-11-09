import { BladeId } from "../../type";
import { Blade } from "../Blade";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers.ts";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time.ts";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes.ts";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const falchion = new Blade(
  {
    cost: {
      baseCost: 910,
    },
    blueprintId: BlueprintId.Weapon_Falchion,
    description: { en: "", th: "" },
    id: BladeId.Falchion,
    image: "ironFalchion",
    isCraftable: true,
    name: { en: "Falchion", th: "ฟาลเชี่ยน" },
    tier: TierEnum.common,
    weight: 27,
  },
  { battleStatus: { pHIT: -2 } },
  {
    handle: 2,
    damage: {
      physicalDamageDice: {
        face: 6,
        dice: 2,
      },
      magicalDamageDice: {
        dice: 4,
        face: 1,
      },
      physicalDamageType: DamageType.slash,
      magicalDamageType: DamageType.slash,
      physicalDamageStat: ["strength"],
      magicalDamageStat: ["planar"],
      physicalHitStat: ["dexterity"],
      magicalHitStat: ["control"],
      physicalCritStat: ["luck"],
      magicalCritStat: ["luck"],
    },
  },
);
