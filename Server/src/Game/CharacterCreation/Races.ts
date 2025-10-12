import type { AttributeKey } from "../../InterFacesEnumsAndTypes/Enums";

export interface RaceDefinition {
  name: string;
  planarAptitude: number;
  baseHP: number;
  baseSP: number;
  baseMP: number;
  attributes: Record<AttributeKey, number>;
}

export const RACES: Record<string, RaceDefinition> = {
  human: {
    name: "Human",
    planarAptitude: 50,
    baseHP: 15,
    baseSP: 15,
    baseMP: 15,
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
  elven: {
    name: "Elven",
    planarAptitude: 70,
    baseHP: 15,
    baseSP: 10,
    baseMP: 20,
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
  orc: {
    name: "Orc",
    planarAptitude: 35,
    baseHP: 20,
    baseSP: 20,
    baseMP: 5,
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
  dwarf: {
    name: "Dwarf",
    planarAptitude: 35,
    baseHP: 15,
    baseSP: 20,
    baseMP: 10,
    attributes: {
      charisma: 8,
      luck: 8,
      intelligence: 8,
      leadership: 9,
      vitality: 9,
      willpower: 10,
      planar: 8,
      control: 8,
      dexterity: 8,
      agility: 8,
      strength: 10,
      endurance: 11,
    },
  },
  halfling: {
    name: "Halfling",
    planarAptitude: 50,
    baseHP: 15,
    baseSP: 15,
    baseMP: 15,
    attributes: {
      charisma: 9,
      luck: 11,
      intelligence: 8,
      leadership: 8,
      vitality: 8,
      willpower: 8,
      planar: 8,
      control: 9,
      dexterity: 9,
      agility: 9,
      strength: 8,
      endurance: 8,
    },
  },
};

export type RaceKey = keyof typeof RACES;
