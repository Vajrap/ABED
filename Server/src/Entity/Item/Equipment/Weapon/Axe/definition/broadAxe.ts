import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { AxeId } from "../../type";
import { Axe } from "../Axe";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const broadAxe = new Axe(
  {
    id: AxeId.BroadAxe,
    name: { en: "Broad Axe", th: "ขวานกว้าง" },
    description: {
      en: "A broad axe for heavy chopping.",
      th: "ขวานหัวกว้าง สำหรับฟันที่หนักหน่วง",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 705, // TEMP: ore: 60*10=600 + wood: 1*5=5 + handicraft: 100 = 705
      bonusCost: 0,
      cost: 705,
      marketCost: 705,
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
    image: "ironBroadAxe",
    isCraftable: true,
    weight: 12,
    blueprintId: BlueprintId.Weapon_BroadAxe,
  },
  {},
  {
    handle: 1,
    damage: {
      physicalDamageDice: { face: 8, dice: 1 },
      magicalDamageDice: { face: 4, dice: 1 },
      physicalDamageType: DamageType.slash,
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
