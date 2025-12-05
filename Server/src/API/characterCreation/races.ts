import { AttributeKey, RaceEnum } from "src/InterFacesEnumsAndTypes/Enums";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { PlayableRaceEnum } from "./enums";
import { AttributeBonus } from "./types";

const raceDescription: Record<PlayableRaceEnum, L10N> = {
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
  [RaceEnum.Dwarf]: {
    en: "",
    th: "",
  },
  [RaceEnum.Halfling]: {
    en: "",
    th: "",
  },
  [RaceEnum.Vulpine]: {
    en: "",
    th: "",
  },
};

const racesBonus: Record<PlayableRaceEnum, AttributeBonus> = {
  [RaceEnum.Human]: {
    three: "leadership",
    two: "willpower",
    one: "control",
  },

  [RaceEnum.Elven]: {
    three: "planar",
    two: "intelligence",
    one: "charisma",
  },

  [RaceEnum.Orc]: {
    three: "strength",
    two: "vitality",
    one: "endurance",
  },

  [RaceEnum.Dwarf]: {
    three: "endurance",
    two: "intelligence",
    one: "willpower",
  },

  [RaceEnum.Halfling]: {
    three: "dexterity",
    two: "agility",
    one: "luck",
  },
  [RaceEnum.Vulpine]: {
    three: "intelligence",
    two: "agility",
    one: "planar",
  },
};

export default racesBonus;
