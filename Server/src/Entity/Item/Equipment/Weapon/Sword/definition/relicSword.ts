import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SwordId } from "../../type";
import { Sword } from "../Sword";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const relicSword = new Sword(
  {
    id: SwordId.RelicSword,
    name: { en: "Relic Sword", th: "ดาบโบราณ" },
    description: {
      en: "An ancient sword recovered from ruins. Though old, it still holds power.",
      th: "ดาบโบราณที่พบในซากปรักหักพัง แม้จะเก่าแต่ยังคงพลังอยู่",
    },
    tier: TierEnum.rare, // Not legendary, just rare
    cost: {
      baseCost: 1500, // Higher than common swords but not legendary-tier pricing
      bonusCost: 0,
      cost: 1500,
      marketCost: 1500,
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
    image: SwordId.RelicSword,
    isCraftable: false, // Quest reward only
    weight: 12,
    blueprintId: undefined, // Not craftable
  },
  {},
  {
    handle: 1,
    damage: {
      physicalDamageDice: { face: 10, dice: 1 }, // Better than LongSword (d8) but not legendary-tier
      magicalDamageDice: { face: 6, dice: 1 }, // Better magical damage
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

