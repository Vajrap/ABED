import {TierEnum} from "src/InterFacesEnumsAndTypes/Tiers";
import {BowId} from "../../type";
import {SeasonEnum} from "src/InterFacesEnumsAndTypes/Time";
import {DamageType} from "src/InterFacesEnumsAndTypes/DamageTypes";
import {ResourceType} from "src/InterFacesEnumsAndTypes/ResourceTypes";
import {Bow, ItemId} from "src/Entity/Item";

export const oakLongBow = new Bow(
    {
        id: BowId.OakLongBow,
        name: {
            en: "Oak Long Bow",
            th: "",
        },
        description: {
            en: "",
            th: "",
        },
        tier: TierEnum.common,
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
                [SeasonEnum.LongDark]: 0,
            },
        },
        image: "oakLongBow",
        isCraftable: true,
        weight: 11,
        craftingRecipe: {
            resource: new Map<ResourceType, number>([
                ['wood', 20],
                ['silk', 5]
            ]),
            item: new Map<ItemId, number>([
                // wood 3
                // silk 2
            ])
        }
    },
    {},
    {
        handle: 2,
        damage: {
            physicalDamageDice: {
                face: 8,
                dice: 1,
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

