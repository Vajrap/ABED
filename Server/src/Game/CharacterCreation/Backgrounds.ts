import { CharacterEpithetEnum } from "../../Entity/Character/Subclass/Title/Epithet/enum";
import type { ItemId } from "../../Entity/Item/type";
import type { ArtisanKey } from "../../InterFacesEnumsAndTypes/Enums";

export interface BackgroundDefinition {
  artisanBonuses: Record<ArtisanKey, number>; // Starting artisan skill bonuses
  startingItems: {id:ItemId, quantity:number}[];
  epithet: CharacterEpithetEnum
}

export const BACKGROUNDS: Record<string, BackgroundDefinition> = {
  retainor: {
    artisanBonuses: {
      // Social skills
      performance: 11,
      // Some crafting
      jewelry: 10,
      tailoring: 10,
      // Others at 8
      agriculture: 8,
      mining: 8,
      smithing: 8,
      woodCutting: 8,
      carpentry: 8,
      foraging: 8,
      weaving: 8,
      skinning: 8,
      tanning: 8,
      cooking: 8,
      alchemy: 8,
      enchanting: 8,
      fishing: 8,
      masonry: 8,
      brewing: 8,
      tinkering: 8,
      electrics: 8,
    },
    startingItems: [],
    epithet: CharacterEpithetEnum.Retainer
  },
  peasant: {
    artisanBonuses: {
      // Farming and survival skills
      agriculture: 11,
      foraging: 10,
      woodCutting: 10,
      fishing: 10,
      cooking: 10,
      // Others at 8
      mining: 8,
      smithing: 8,
      carpentry: 8,
      weaving: 8,
      skinning: 8,
      tanning: 8,
      jewelry: 8,
      alchemy: 8,
      enchanting: 8,
      masonry: 8,
      tailoring: 8,
      brewing: 8,
      performance: 8,
      tinkering: 8,
      electrics: 8,
    },
    startingItems: [],
    epithet: CharacterEpithetEnum.Peasant
  },
  merchant: {
    artisanBonuses: {
      // Trading and crafting
      jewelry: 10,
      tailoring: 10,
      weaving: 10,
      cooking: 10,
      brewing: 10,
      // Others at 8
      agriculture: 8,
      mining: 8,
      smithing: 8,
      woodCutting: 8,
      carpentry: 8,
      foraging: 8,
      skinning: 8,
      tanning: 8,
      alchemy: 8,
      enchanting: 8,
      fishing: 8,
      masonry: 8,
      performance: 8,
      tinkering: 8,
      electrics: 8,
    },
    startingItems: [],
    epithet: CharacterEpithetEnum.Merchant
  },
  scholar: {
    artisanBonuses: {
      // Knowledge-based skills
      alchemy: 11,
      enchanting: 10,
      tinkering: 10,
      // Some practical
      cooking: 9,
      // Others at 8
      agriculture: 8,
      mining: 8,
      smithing: 8,
      woodCutting: 8,
      carpentry: 8,
      foraging: 8,
      weaving: 8,
      skinning: 8,
      tanning: 8,
      jewelry: 8,
      fishing: 8,
      masonry: 8,
      tailoring: 8,
      brewing: 8,
      performance: 8,
      electrics: 8,
    },
    startingItems: [],
    epithet: CharacterEpithetEnum.Scholar
  },
  artisan: {
    artisanBonuses: {
      // Crafting skills
      smithing: 11,
      carpentry: 11,
      masonry: 10,
      weaving: 10,
      tailoring: 10,
      jewelry: 10,
      // Others at 8
      agriculture: 8,
      mining: 8,
      woodCutting: 8,
      foraging: 8,
      skinning: 8,
      tanning: 8,
      cooking: 8,
      alchemy: 8,
      enchanting: 8,
      fishing: 8,
      brewing: 8,
      performance: 8,
      tinkering: 8,
      electrics: 8,
    },
    startingItems: [],
    epithet: CharacterEpithetEnum.Artisan
  },
  soldier: {
    artisanBonuses: {
      // Combat-related skills
      smithing: 10,
      carpentry: 10,
      cooking: 10,
      // Some survival
      foraging: 9,
      fishing: 9,
      // Others at 8
      agriculture: 8,
      mining: 8,
      woodCutting: 8,
      weaving: 8,
      skinning: 8,
      tanning: 8,
      jewelry: 8,
      alchemy: 8,
      enchanting: 8,
      masonry: 8,
      tailoring: 8,
      brewing: 8,
      performance: 8,
      tinkering: 8,
      electrics: 8,
    },
    startingItems: [],
    epithet: CharacterEpithetEnum.Soldier
  },
};

export type BackgroundKey = keyof typeof BACKGROUNDS;
