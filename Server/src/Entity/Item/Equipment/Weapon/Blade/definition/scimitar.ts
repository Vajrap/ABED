import { BladeId } from "../../type";
import { Blade } from "../Blade";
import {TierEnum} from "src/InterFacesEnumsAndTypes/Tiers.ts";
import {SeasonEnum} from "src/InterFacesEnumsAndTypes/Time.ts";
import {DamageType} from "src/InterFacesEnumsAndTypes/DamageTypes.ts";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const scimitar = new Blade(
    {
        cost: {
            baseCost: 605, // TEMP: ore: 50*10=500 + wood: 1*5=5 + handicraft: 100 = 605
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
                [SeasonEnum.LongDark]: 0
            }
        },
        blueprintId: BlueprintId.Weapon_Scimitar,
        description: {en: '', th: ''},
        id: BladeId.Scimitar,
        image: "ironScimitar",
        isCraftable: true,
        name: {en: 'Scimitar', th: 'ดาบโค้ง'},
        tier: TierEnum.common,
        weight: 12
    },
    {},
    {
        handle: 1,
        damage: {
            physicalDamageDice: {
                face: 8,
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
        }
    }
)

