import { RaceEnum } from "src/InterFacesEnumsAndTypes/Enums";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { PlayableRaceEnum } from "./enums";
import { AttributeBonus } from "./types";

export type RaceBonus = {
  planarAptitude: number;
  baseHP: number;
  baseSP: number;
  baseMP: number;
  attributes: AttributeBonus;
};

export const raceDescription: Record<PlayableRaceEnum, L10N> = {
  [RaceEnum.Human]: {
    en: "",
    th: "",
  },
  [RaceEnum.Elven]: {
    en: "",
    th: "",
  },
  [RaceEnum.Orc]: {
    en: "",
    th: "",
  },
};

export const racesBonus: Record<PlayableRaceEnum, RaceBonus> = {
  [RaceEnum.Human]: {
    planarAptitude: 50,
    baseHP: 15,
    baseSP: 15,
    baseMP: 15,
    attributes: {
      three: "leadership",
      two: "willpower",
      one: "control",
    },
  },

  [RaceEnum.Elven]: {
    planarAptitude: 70,
    baseHP: 15,
    baseSP: 10,
    baseMP: 20,
    attributes: {
      three: "planar",
      two: "intelligence",
      one: "charisma",
    },
  },

  [RaceEnum.Orc]: {
    planarAptitude: 35,
    baseHP: 20,
    baseSP: 20,
    baseMP: 5,
    attributes: {
      three: "strength",
      two: "vitality",
      one: "endurance",
    },
  },
};
