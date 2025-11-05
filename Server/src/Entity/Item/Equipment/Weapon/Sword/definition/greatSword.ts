import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SwordId } from "../../type";
import { Sword } from "../Sword";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const greatSword = new Sword(
  {
    id: SwordId.GreatSword,
    name: { en: "Great Sword", th: "กระบี่ใหญ่" },
    description: {
      en: "A great sword, need to hold with two hand, powerful but slow.",
      th: "กระบี่ขนาดใหญ่ที่ต้องใช้สองมือ ทรงพลังแต่เชื่องช้า",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 1110, // TEMP: Using resources as placeholder. Final cost = (iron ingots + long wooden haft) + 100 copper handicraft
      bonusCost: 0,
      cost: 1110,
      marketCost: 1110,
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
    image: "ironGreatSword",
    isCraftable: true,
    weight: 30,
    blueprintId: BlueprintId.Weapon_GreatSword,
  },
  { battleStatus: { pHIT: -2 } },
  {
    handle: 2,
    damage: {
      physicalDamageDice: { face: 6, dice: 2 },
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
