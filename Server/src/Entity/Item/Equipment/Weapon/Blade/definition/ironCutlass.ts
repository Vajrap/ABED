import {Blade, BladeId} from "src/Entity/Item";
import {TierEnum} from "src/InterFacesEnumsAndTypes/Tiers.ts";
import {SeasonEnum} from "src/InterFacesEnumsAndTypes/Time.ts";
import {DamageType} from "src/InterFacesEnumsAndTypes/DamageTypes.ts";

export const ironCutlass = new Blade(
    {
        cost: {
            baseCost: 60,
            bonusCost: 0,
            cost: 60,
            marketCost: 60,
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
        craftingRecipe: {
            item: new Map(), // 4 iron ingot, 1 long wood grip
            resource: new Map(),
        },
        description: {en: '', th: ''},
        id: BladeId.IronCutlass,
        image: "ironCutlass",
        isCraftable: true,
        name: {en: 'Iron Cutlass', th: 'คัตลาสเหล็ก'},
        tier: TierEnum.common,
        weight: 10
    },
    {},
    {damage: {
            physicalDamageDice: {
                face: 6,
                dice: 1
            },
            magicalDamageDice: {
                dice: 4,
                face: 1
            },
            physicalDamageType: DamageType.slash,
            magicalDamageType: DamageType.slash,
            physicalDamageStat: ['dexterity'],
            magicalDamageStat: ['planar'],
            physicalHitStat: ['dexterity'],
            magicalHitStat: ['control'],
            physicalCritStat: ['luck'],
            magicalCritStat: ['luck']
        }, handle: 1}
)
