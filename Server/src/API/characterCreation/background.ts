import { PlayableBackgroundEnum } from "./enums";
import { BackgroundBonus } from "./types";
import { CharacterEpithetEnum } from "src/Entity/Character/Subclass/Title/Epithet/enum";

export const backgroundBonus: Record<PlayableBackgroundEnum, BackgroundBonus> = {
    [PlayableBackgroundEnum.Retainer]: {
        artisans: {
            three: 'carpentry',
            two: 'smithing',
            one: 'cooking',
        },
        startingItems: [],
        epithet: CharacterEpithetEnum.Retainer,
        alignment: { good: 5, evil: 0 },
    },
    [PlayableBackgroundEnum.Peasant]: {
        artisans: {
            three: 'agriculture',
            two: 'foraging',
            one: 'woodCutting',
        },
        startingItems: [],
        epithet: CharacterEpithetEnum.Peasant,
        alignment: { good: 5, evil: 0 },
    },
    [PlayableBackgroundEnum.Noble]: {
        artisans: {
            three: 'performance',
            two: 'jewelry',
            one: 'weaving',
        },
        startingItems: [],
        epithet: CharacterEpithetEnum.Noble,
        alignment: { good: 10, evil: 0 },
    },
    [PlayableBackgroundEnum.Merchant]: {
        artisans: {
            three: 'tinkering',
            two: 'jewelry',
            one: 'alchemy',
        },
        startingItems: [],
        epithet: CharacterEpithetEnum.Merchant,
        alignment: { good: 0, evil: 0 },
    },
    [PlayableBackgroundEnum.Adventurer]: {
        artisans: {
            three: 'foraging',
            two: 'smithing',
            one: 'skinning',
        },
        startingItems: [],
        epithet: CharacterEpithetEnum.Adventurer,
        alignment: { good: 8, evil: 0 },
    },
    [PlayableBackgroundEnum.Criminal]: {
        artisans: {
            three: 'tinkering',
            two: 'alchemy',
            one: 'skinning',
        },
        startingItems: [],
        epithet: CharacterEpithetEnum.Criminal,
        alignment: { good: 0, evil: 12 },
    },
    [PlayableBackgroundEnum.Hermit]: {
        artisans: {
            three: 'foraging',
            two: 'brewing',
            one: 'skinning',
        },
        startingItems: [],
        epithet: CharacterEpithetEnum.Hermit,
        alignment: { good: 7, evil: 0 },
    },
    [PlayableBackgroundEnum.FolkHero]: {
        artisans: {
            three: 'woodCutting',
            two: 'masonry',
            one: 'smithing',
        },
        startingItems: [],
        epithet: CharacterEpithetEnum.FolkHero,
        alignment: { good: 15, evil: 0 },
    },
    [PlayableBackgroundEnum.CityGuard]: {
        artisans: {
            three: 'smithing',
            two: 'tanning',
            one: 'alchemy',
        },
        startingItems: [],
        epithet: CharacterEpithetEnum.CityGuard,
        alignment: { good: 10, evil: 0 },
    },
} 