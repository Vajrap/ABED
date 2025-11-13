import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SwordId } from "../../type";
import { Sword } from "../Sword";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const longSword = new Sword(
  {
    id: SwordId.LongSword,
    name: { en: "Long Sword", th: "กระบี่ยาว" },
    description: {
      en: "A long sword, useful in slashing.",
      th: "กระบี่ เน้นใช้งานในการฟัน",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 605, // TEMP: Using resources as placeholder. Final cost = (iron ingots + wooden handle) + 100 copper handicraft
      bonusCost: 0,
      cost: 605,
      marketCost: 605,
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
    image: SwordId.LongSword,
    isCraftable: true,
    weight: 15,
    blueprintId: BlueprintId.Weapon_LongSword,
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
