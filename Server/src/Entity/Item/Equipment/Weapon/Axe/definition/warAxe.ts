import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { AxeId } from "../../type";
import { Axe } from "../Axe";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const warAxe = new Axe(
  {
    id: AxeId.WarAxe,
    name: { en: "War Axe", th: "ขวานสงคราม" },
    description: {
      en: "A massive two-handed war axe.",
      th: "ขวานขนาดยักษ์ ต้องใช้สองมือ",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 1310, // TEMP: ore: 120*10=1200 + wood: 2*5=10 + handicraft: 100 = 1310
      bonusCost: 0,
      cost: 1310,
      marketCost: 1310,
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
    image: "ironGreatAxe",
    isCraftable: true,
    weight: 35,
    blueprintId: BlueprintId.Weapon_WarAxe,
  },
  { battleStatus: { pHIT: -2 } },
  {
    handle: 2,
    damage: {
      physicalDamageDice: { face: 12, dice: 1 },
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
