import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SwordId } from "../../type";
import { Sword } from "../Sword";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

export const ironLongSword = new Sword(
  {
    id: SwordId.IronLongSword,
    name: { en: "Iron Long Sword", th: "กระบี่เหล็กยาว" },
    description: {
        en: "An Iron Long sword, useful in slashing.",
        th: "กระบี่เหล็ก เน้นใช้งานในการฟัน"
    },
    tier: TierEnum.common,
    cost: {
        baseCost: 70,
        bonusCost: 0,
        cost: 70,
        marketCost: 80,
        numberOfSellThisWeek: 0,
        possibleDeviation: 0,
        seasonalDeviation: {
            [SeasonEnum.Seeding]: 0,
            [SeasonEnum.RainFall]: 0,
            [SeasonEnum.GreenTide]: 0,
            [SeasonEnum.HarvestMoon]: 0,
            [SeasonEnum.SunDry]: 0,
            [SeasonEnum.Frostveil]: 0,
            [SeasonEnum.LongDark]: 0
        }
        },
    image: "rustedIronSword",
    isCraftable: true,
    weight: 15,
    craftingRecipe: {
        item: new Map(), // 5 ingot, 1 wood handle
        resource: new Map([
            ['ore', 50],
            ['wood', 5]
        ]) // 50 ore, 5 wood
    }
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
        magicalCritStat: ["luck"]
    },
  },
);

