import type { AttributeKey } from "../../InterFacesEnumsAndTypes/Enums";
import { RaceEnum } from "../../InterFacesEnumsAndTypes/Enums";

/**
 * Base race attributes for all races
 * Used by both player character creation and MOB creation
 */
export interface RaceAttributes {
  attributes: Record<AttributeKey, number>;
}

export const RACE_ATTRIBUTES: Record<RaceEnum, RaceAttributes> = {
  [RaceEnum.Human]: {
    attributes: {
      charisma: 10,
      luck: 9,
      intelligence: 8,
      leadership: 10,
      vitality: 8,
      willpower: 8,
      planar: 8,
      control: 9,
      dexterity: 8,
      agility: 8,
      strength: 8,
      endurance: 8,
    },
  },
  [RaceEnum.Elven]: {
    attributes: {
      charisma: 9,
      luck: 8,
      intelligence: 10,
      leadership: 8,
      vitality: 8,
      willpower: 9,
      planar: 10,
      control: 9,
      dexterity: 9,
      agility: 8,
      strength: 8,
      endurance: 8,
    },
  },
  [RaceEnum.Orc]: {
    attributes: {
      charisma: 8,
      luck: 8,
      intelligence: 8,
      leadership: 9,
      vitality: 10,
      willpower: 9,
      planar: 8,
      control: 8,
      dexterity: 9,
      agility: 8,
      strength: 11,
      endurance: 10,
    },
  },
  [RaceEnum.Goblin]: {
    attributes: {
      charisma: 4,
      luck: 8,
      intelligence: 6,
      leadership: 5,
      vitality: 8,
      willpower: 6,
      planar: 7,
      control: 4,
      dexterity: 10,
      agility: 10,
      strength: 6,
      endurance: 6,
    },
  }
};

