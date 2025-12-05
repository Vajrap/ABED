import { PlayableBackgroundEnum } from "./enums";
import { ArtisanBonus } from "./types";

export const backgroundBonus: Record<PlayableBackgroundEnum, ArtisanBonus> = {
    [PlayableBackgroundEnum.Retainer]: {
        three: 'carpentry',
        two: 'smithing',
        one: 'cooking',
    },
    [PlayableBackgroundEnum.Peasant]: {
        three: 'agriculture',
        two: 'foraging',
        one: 'woodCutting',
    },
    [PlayableBackgroundEnum.Noble]: {
        three: 'performance',
        two: 'jewelry',
        one: 'weaving',
    },
    [PlayableBackgroundEnum.Merchant]: {
        three: 'tinkering',
        two: 'jewelry',
        one: 'alchemy',
    },
    [PlayableBackgroundEnum.Adventurer]: {
        three: 'foraging',
        two: 'smithing',
        one: 'skinning',
    },
    [PlayableBackgroundEnum.Criminal]: {
        three: 'tinkering',
        two: 'alchemy',
        one: 'skinning',
    },
    [PlayableBackgroundEnum.Hermit]: {
        three: 'foraging',
        two: 'brewing',
        one: 'skinning',
    },
    [PlayableBackgroundEnum.FolkHero]: {
        three: 'woodCutting',
        two: 'masonry',
        one: 'smithing',
    },
    [PlayableBackgroundEnum.CityGuard]: {
        three: 'smithing',
        two: 'tanning',
        one: 'alchemy',
    },
} 