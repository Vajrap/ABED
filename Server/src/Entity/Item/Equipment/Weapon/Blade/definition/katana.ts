import { BladeId } from "../../type";
import { Blade } from "../Blade";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers.ts";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time.ts";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes.ts";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const katana = new Blade(
  {
    cost: {
      baseCost: 100, // TEMP: No resources in JSON, but needs iron ingots + 100 handicraft
      bonusCost: 0,
      cost: 100,
      marketCost: 100,
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
    blueprintId: BlueprintId.Weapon_Katana,
    description: { en: "", th: "" },
    id: BladeId.Katana,
    image: "ironKatana",
    isCraftable: true,
    name: { en: "Katana", th: "คาตานะ" },
    tier: TierEnum.common,
    weight: 27,
  },
  { battleStatus: { pHIT: -2 } },
  {
    handle: 2,
    damage: {
      physicalDamageDice: {
        face: 10,
        dice: 1,
      },
      magicalDamageDice: {
        dice: 4,
        face: 1,
      },
      physicalDamageType: DamageType.slash,
      magicalDamageType: DamageType.slash,
      physicalDamageStat: ["dexterity"],
      magicalDamageStat: ["planar"],
      physicalHitStat: ["dexterity"],
      magicalHitStat: ["control"],
      physicalCritStat: ["luck"],
      magicalCritStat: ["luck"],
    },
  },
);
