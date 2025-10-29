import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SwordId } from "../../type";
import { Sword } from "../Sword";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

export const ironGreatSword = new Sword(
  {
    id: SwordId.IronGreatSword,
    name: { en: "Iron Great Sword", th: "กระบี่เหล็กใหญ่" },
    description: {
        en: "An Iron Great sword, need to hold with two hand, powerful but slow.",
        th: "กระบี่เหล็กขนาดใหญ่ที่ต้องใช้สองมือ ทรงพลังแต่เชื่องช้า"
    },
    tier: TierEnum.common,
    cost: {
        baseCost: 120,
        bonusCost: 0,
        cost: 120,
        marketCost: 120,
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
    image: "ironGreatSword",
    isCraftable: true,
    weight: 30,
    craftingRecipe: {
        item: new Map(), // 10 iron ingot, 1 long wooden handle
        resource: new Map([
            ['ore', 100],
            ['wood', 10]
        ]) // 100 ore, 10 wood
    }
  },
  {battleStatus: {pHIT: -2}},
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
        magicalCritStat: ["luck"]
    },
  },
);

