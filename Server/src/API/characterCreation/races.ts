import { AttributeKey, RaceEnum } from "src/InterFacesEnumsAndTypes/Enums";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { PlayableRaceEnum } from "./enums";

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

type Bonus = { key: AttributeKey; value: number };

const racesBonus: Record<PlayableRaceEnum, Bonus[]> = {
  [RaceEnum.Human]: [
    { key: "leadership", value: +3 },
    { key: "willpower", value: +2 },
    { key: "control", value: +1 },
  ],

  [RaceEnum.Elven]: [
    { key: "planar", value: +3 },
    { key: "intelligence", value: +2 },
    { key: "charisma", value: +1 },
  ],

  [RaceEnum.Orc]: [
    { key: "strength", value: +3 },
    { key: "vitality", value: +2 },
    { key: "endurance", value: +1 },
  ],

  [RaceEnum.Dwarf]: [
    { key: "endurance", value: +3 },
    { key: "intelligence", value: +2 },
    { key: "willpower", value: +1 },
  ],

  [RaceEnum.Halfling]: [
    { key: "dexterity", value: +3 },
    { key: "agility", value: +2 },
    { key: "luck", value: +1 },
  ],
  [RaceEnum.Vulpine]: [
    { key: "intelligence", value: +3 },
    { key: "agility", value: +2 },
    { key: "planar", value: +1 },
  ],
};

export default racesBonus;
