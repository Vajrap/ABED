import { BladeId } from "../../type";
import { Blade } from "../Blade";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers.ts";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time.ts";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes.ts";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const falchion = new Blade(
  {
    cost: {
      baseCost: 910, // TEMP: ore: 80*10=800 + wood: 1*5=5 + handicraft: 100 + hitmod -2 = 905
      bonusCost: 0,
      cost: 910,
      marketCost: 910,
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
