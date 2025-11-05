import { BladeId } from "../../type";
import { Blade } from "../Blade";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers.ts";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time.ts";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes.ts";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const cutlass = new Blade(
  {
    cost: {
      baseCost: 505, // TEMP: Using resources as placeholder. Final cost = (iron ingots + wooden handle) + 100 copper handicraft
      bonusCost: 0,
      cost: 505,
      marketCost: 505,
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
    blueprintId: BlueprintId.Weapon_Cutlass,
    description: { en: "", th: "" },
    id: BladeId.Cutlass,
    image: "ironCutlass",
    isCraftable: true,
    name: { en: "Cutlass", th: "คัตลาส" },
    tier: TierEnum.common,
    weight: 10,
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
