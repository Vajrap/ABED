import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SpearId } from "../../type";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import {ItemId, Spear} from "src/Entity/Item";
import {ResourceType} from "src/InterFacesEnumsAndTypes/ResourceTypes.ts";

export const ironHalberd = new Spear(
    {
        id: SpearId.IronHalberd,
        name: {
            en: "Iron Halberd",
            th: "",
        },
        description: {
            en: "",
            th: "",
        },
        tier: TierEnum.common,
        cost: {
            baseCost: 140,
            bonusCost: 0,
            cost: 140,
            marketCost: 140,
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
        image: "ironHalberd",
        isCraftable: true,
        weight: 35,
        craftingRecipe: {
            resource: new Map<ResourceType, number>([
                ['ore', 100],
                ['wood', 100]
            ]),
            item: new Map<ItemId, number>([
                // [ItemId.ironIngot, 10]
                // [ItemId.woodenGrip, 3]
            ]),
        }
    },
    {battleStatus: {pHIT: -2}},
    {
        handle: 2,
        damage: {
            physicalDamageDice: {
                face: 6,
                dice: 2
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

