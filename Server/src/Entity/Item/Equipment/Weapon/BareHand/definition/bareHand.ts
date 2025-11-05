import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BareHandId } from "../../type";
import { BareHand } from "../BareHand";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

export const bareHand = new BareHand(
  {
    id: BareHandId.BareHand,
    name: {
      en: "bare hand",
      th: "มือเป่า",
    },
    description: {
      en: "Your bare hand, actually a weapon and not a weapon at the same time.",
      th: "มือเปล่า ๆ ของคุณ บาทีก็เป็นอาวุธ บางทีก็ไม่ใช่",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 0,
      bonusCost: 0,
      cost: 0,
      marketCost: 0,
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
    image: "bareHand",
    isCraftable: false,
    weight: 0,
    blueprintId: undefined
  },
  {},
  {
    handle: 2,
    damage: {
      physicalDamageDice: {
        face: 4,
        dice: 1,
      },
      magicalDamageDice: {
        face: 4,
        dice: 1,
      },
      physicalDamageType: DamageType.blunt,
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
