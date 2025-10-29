import {Blade, BladeId} from "src/Entity/Item";
import {TierEnum} from "src/InterFacesEnumsAndTypes/Tiers.ts";
import {SeasonEnum} from "src/InterFacesEnumsAndTypes/Time.ts";
import {DamageType} from "src/InterFacesEnumsAndTypes/DamageTypes.ts";

export const ironKatana = new Blade(
    {
        cost: {
            baseCost: 110,
            bonusCost: 0,
            cost: 110,
            marketCost: 110,
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
            item: new Map(), // 10 iron ingot, 1 long wood grip
            resource: new Map(),
        },
        description: {en: '', th: ''},
        id: BladeId.IronKatana,
        image: "ironKatana",
        isCraftable: true,
        name: {en: 'Iron Katana', th: 'คาตานะเหล็ก'},
        tier: TierEnum.common,
        weight: 27
    },
    {battleStatus: {pHIT: -2}},
    {damage: {
            physicalDamageDice: {
                face: 10,
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
        }, handle: 2}
)
