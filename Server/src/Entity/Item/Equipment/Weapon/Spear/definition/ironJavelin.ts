import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SpearId } from "../../type";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import {ItemId, Spear} from "src/Entity/Item";
import {ResourceType} from "src/InterFacesEnumsAndTypes/ResourceTypes.ts";

export const ironJavelin = new Spear(
    {
        id: SpearId.IronJavelin,
        name: {
            en: "Iron Javelin",
            th: "",
        },
        description: {
            en: "",
            th: "",
        },
        tier: TierEnum.common,
        cost: {
            baseCost: 50,
            bonusCost: 0,
            cost: 50,
            marketCost: 50,
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
        image: "ironJavelin",
        isCraftable: true,
        weight: 8,
        craftingRecipe: {
            resource: new Map<ResourceType, number>([
                ['ore', 50],
                ['wood', 5]
            ]),
            item: new Map<ItemId, number>([
                // [ItemId.ironIngot, 2]
                // [ItemId.woodenGrip, 2]
            ]),
        }
    },
    {},
    {
        handle: 1,
        damage: {
            physicalDamageDice: {
                face: 6,
                dice: 1
            },
            magicalDamageDice: {
                face: 4,
                dice: 1,
            },
            physicalDamageType: DamageType.pierce,
            magicalDamageType: DamageType.arcane,
            physicalDamageStat: ["dexterity"],
            magicalDamageStat: ["planar"],
            physicalHitStat: ["dexterity"],
            magicalHitStat: ["control"],
            physicalCritStat: ["luck"],
            magicalCritStat: ["luck"],
        },
    },
);

