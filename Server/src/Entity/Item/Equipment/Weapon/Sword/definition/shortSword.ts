import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SwordId } from "../../type";
import { Sword } from "../Sword";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const shortSword = new Sword(
  {
    id: SwordId.ShortSword,
    name: {
      en: "Short Sword",
      th: "กระบี่สั้น",
    },
    description: {
      en: "A sturdy short sword, reliable and sharp.",
      th: "กระบี่สั้น เชื่อถือได้และคมกริบ",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 400, // TEMP: Using resources as placeholder. Final cost = (iron ingots + wooden handle) + 100 copper handicraft
      bonusCost: 0,
      cost: 400,
      marketCost: 400,
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
    image: "ironShortSword",
    isCraftable: true,
    weight: 10,
    blueprintId: BlueprintId.Weapon_ShortSword,
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
      physicalDamageType: DamageType.pierce,
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
