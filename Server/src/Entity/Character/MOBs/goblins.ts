import { Character } from "src/Entity/Character/Character.ts";
import { MOBs } from "src/Entity/Character/MOBs/enums.ts";
import { CharacterNeeds } from "src/Entity/Character/Subclass/Needs/CharacterNeeds.ts";
import { CharacterProficiencies } from "src/Entity/Character/Subclass/Stats/CharacterProficiencies.ts";
import { CharacterType } from "src/InterFacesEnumsAndTypes/Enums.ts";
import {
  CharacterVitals,
  Vital,
} from "src/Entity/Character/Subclass/Vitals/CharacterVitals.ts";
import { makeAttribute, scaleByDifficulty } from "./helpers";
import { CharacterBattleStats } from "../Subclass/Stats/CharacterBattleStats";
import { CharacterElements } from "../Subclass/Stats/CharacterElements";
import { CharacterFame } from "../Subclass/Fame/CharacterFame";
import { defaultActionSequence } from "../Subclass/Action/CharacterAction";
import { CharacterAlignment } from "../Subclass/Alignment/CharacterAlignment";
import { CharacterArtisans } from "../Subclass/Stats/CharacterArtisans";
import { SkillId } from "src/Entity/Skill/enums";
import { DeckCondition } from "../Subclass/DeckCondition/DeckCondition";

function randomSkillLevel(difficulty: number): number {
  return Math.min(
    Math.max(Math.floor(Math.random() * 3) + difficulty - 1, 1),
    5,
  );
}

export function goblinScout(difficulty: 1 | 2 | 3 | 4 | 5) {
  const hp = scaleByDifficulty(15, difficulty);
  const mp = scaleByDifficulty(8, difficulty);
  const sp = scaleByDifficulty(12, difficulty);

  const character = new Character({
    actionSequence: defaultActionSequence(),
    alignment: new CharacterAlignment({}),
    artisans: new CharacterArtisans({}),
    attribute: makeAttribute({
      charisma: scaleByDifficulty(3, difficulty),
      luck: scaleByDifficulty(7, difficulty),
      intelligence: scaleByDifficulty(4, difficulty),
      leadership: scaleByDifficulty(3, difficulty),
      vitality: scaleByDifficulty(6, difficulty),
      willpower: scaleByDifficulty(6, difficulty),
      planar: scaleByDifficulty(5, difficulty),
      control: scaleByDifficulty(6, difficulty),
      dexterity: scaleByDifficulty(10, difficulty),
      agility: scaleByDifficulty(10, difficulty),
      strength: scaleByDifficulty(7, difficulty),
      endurance: scaleByDifficulty(5, difficulty),
    }),
    battleStats: new CharacterBattleStats(),
    elements: new CharacterElements(),
    fame: new CharacterFame(),
    id: MOBs.goblinScout,
    level: difficulty + 1 - 1,
    name: {
      en: "Goblin Scout",
      th: "ก๊อปลินสายลับ",
    },
    needs: new CharacterNeeds(),
    proficiencies: new CharacterProficiencies(),
    type: CharacterType.humanoid,
    vitals: new CharacterVitals({
      hp: new Vital({ base: hp }),
      mp: new Vital({ base: mp }),
      sp: new Vital({ base: sp }),
    }),
  });

  character.activeSkills = [
    {
      id: SkillId.Backstab,
      level: Math.min(
        Math.max(Math.floor(Math.random() * 3) + difficulty - 1, 1),
        5,
      ),
      exp: 0,
    },
    {
      id: SkillId.PanicSlash,
      level: Math.min(
        Math.max(Math.floor(Math.random() * 3) + difficulty - 1, 1),
        5,
      ),
      exp: 0,
    },
    {
      id: SkillId.Shriek,
      level: Math.min(
        Math.max(Math.floor(Math.random() * 3) + difficulty - 1, 1),
        5,
      ),
      exp: 0,
    },
    {
      id: SkillId.ThrowPebble,
      level: Math.min(
        Math.max(Math.floor(Math.random() * 3) + difficulty - 1, 1),
        5,
      ),
      exp: 0,
    },
  ];

  character.conditionalSkills = [
    {
      id: SkillId.RetreatDash,
      level: Math.min(
        Math.max(Math.floor(Math.random() * 3) + difficulty - 1, 1),
        5,
      ),
      exp: 0,
    },
    {
      id: SkillId.ThrowPebble,
      level: Math.min(
        Math.max(Math.floor(Math.random() * 3) + difficulty - 1, 1),
        5,
      ),
      exp: 0,
    },
  ];

  character.conditionalSkillsCondition = new DeckCondition({
    selectedCondition: "SELF",
    self: {
      hp: {
        min: 0,
        max: character.vitals.hp.max * 0.3,
      },
      mp: {
        min: 0,
        max: character.vitals.mp.max,
      },
      sp: {
        min: 0,
        max: character.vitals.sp.max,
      },
    },
  });

  return character;
}

export function goblinWarrior(difficulty: 1 | 2 | 3 | 4 | 5) {
  const hp = scaleByDifficulty(25, difficulty);
  const mp = scaleByDifficulty(5, difficulty);
  const sp = scaleByDifficulty(35, difficulty);

  const character = new Character({
    actionSequence: defaultActionSequence(),
    alignment: new CharacterAlignment({}),
    artisans: new CharacterArtisans({}),
    attribute: makeAttribute({
      charisma: scaleByDifficulty(4, difficulty, 1.8),
      luck: scaleByDifficulty(7, difficulty, 1.8),
      intelligence: scaleByDifficulty(5, difficulty, 1.8),
      leadership: scaleByDifficulty(6, difficulty, 1.8),
      vitality: scaleByDifficulty(10, difficulty, 1.8),
      willpower: scaleByDifficulty(6, difficulty, 1.8),
      planar: scaleByDifficulty(5, difficulty, 1.8),
      control: scaleByDifficulty(6, difficulty, 1.8),
      dexterity: scaleByDifficulty(8, difficulty, 1.8),
      agility: scaleByDifficulty(7, difficulty, 1.8),
      strength: scaleByDifficulty(11, difficulty, 1.8),
      endurance: scaleByDifficulty(9, difficulty, 1.8),
    }),
    battleStats: new CharacterBattleStats(),
    elements: new CharacterElements(),
    fame: new CharacterFame(),
    id: MOBs.goblinWarrior,
    level: difficulty,
    name: {
      en: "Goblin Warrior",
      th: "ก๊อปลินนักรบ",
    },
    needs: new CharacterNeeds(),
    proficiencies: new CharacterProficiencies(),
    type: CharacterType.humanoid,
    vitals: new CharacterVitals({
      hp: new Vital({ base: hp }),
      mp: new Vital({ base: mp }),
      sp: new Vital({ base: sp }),
    }),
  });

  character.activeSkills = [
    { id: SkillId.Cleave, level: randomSkillLevel(difficulty), exp: 0 },
    { id: SkillId.Taunt, level: randomSkillLevel(difficulty), exp: 0 },
    { id: SkillId.Bash, level: randomSkillLevel(difficulty), exp: 0 },
  ];

  character.conditionalSkills = [
    { id: SkillId.ShieldUp, level: randomSkillLevel(difficulty), exp: 0 },
    { id: SkillId.HerosPose, level: randomSkillLevel(difficulty), exp: 0 },
  ];

  character.conditionalSkillsCondition = new DeckCondition({
    selectedCondition: "SELF",
    self: {
      hp: {
        min: 0,
        max: character.vitals.hp.max * 0.3,
      },
      mp: {
        min: 0,
        max: character.vitals.mp.max,
      },
      sp: {
        min: 0,
        max: character.vitals.sp.max,
      },
    },
  });

  return character;
}
