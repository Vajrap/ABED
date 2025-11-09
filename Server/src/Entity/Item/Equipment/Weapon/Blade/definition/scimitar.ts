import { BladeId } from "../../type";
import { Blade } from "../Blade";
import {TierEnum} from "src/InterFacesEnumsAndTypes/Tiers.ts";
import {SeasonEnum} from "src/InterFacesEnumsAndTypes/Time.ts";
import {DamageType} from "src/InterFacesEnumsAndTypes/DamageTypes.ts";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const scimitar = new Blade(
    {
        cost: {
            baseCost: 605,
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

