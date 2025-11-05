import { Character } from "src/Entity/Character/Character.ts";
import { MOBs } from "src/Entity/Character/MOBs/enums.ts";
import { CharacterNeeds } from "src/Entity/Character/Subclass/Needs/CharacterNeeds.ts";
import { CharacterProficiencies } from "src/Entity/Character/Subclass/Stats/CharacterProficiencies.ts";
import { CharacterType } from "src/InterFacesEnumsAndTypes/Enums.ts";
import {
  CharacterVitals,
  Vital,
} from "src/Entity/Character/Subclass/Vitals/CharacterVitals.ts";
import { makeAttribute, makeProficiencies, scaleByDifficulty } from "./helpers";
import { CharacterBattleStats } from "../Subclass/Stats/CharacterBattleStats";
import { CharacterElements } from "../Subclass/Stats/CharacterElements";
import { CharacterFame } from "../Subclass/Fame/CharacterFame";
import { defaultActionSequence } from "../Subclass/Action/CharacterAction";
import { CharacterAlignment } from "../Subclass/Alignment/CharacterAlignment";
import { CharacterArtisans } from "../Subclass/Stats/CharacterArtisans";
import { SkillId } from "src/Entity/Skill/enums";
import { DeckCondition } from "../Subclass/DeckCondition/DeckCondition";
import { defaultSaveRoll } from "src/Utils/CharacterDefaultSaveRoll";

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
    id: `${MOBs.goblinScout}_${Bun.randomUUIDv7()}`,
    level: difficulty + 1 - 1,
    name: {
      en: "Goblin Scout",
      th: "ก๊อปลินสายลับ",
    },
    needs: new CharacterNeeds(),
    proficiencies: makeProficiencies({
      bareHand: scaleByDifficulty(3, difficulty),
      dagger: scaleByDifficulty(9, difficulty),
      sword: scaleByDifficulty(5, difficulty),
      blade: scaleByDifficulty(7, difficulty),
      axe: scaleByDifficulty(4, difficulty),
      hammer: scaleByDifficulty(3, difficulty),
      spear: scaleByDifficulty(4, difficulty),
      bow: scaleByDifficulty(8, difficulty),
      wand: scaleByDifficulty(2, difficulty),
      staff: scaleByDifficulty(2, difficulty),
      book: scaleByDifficulty(1, difficulty),
      orb: scaleByDifficulty(1, difficulty),
      shield: scaleByDifficulty(3, difficulty),
    }),
    saveRolls: defaultSaveRoll,
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
      charisma: scaleByDifficulty(4, difficulty),
      luck: scaleByDifficulty(7, difficulty),
      intelligence: scaleByDifficulty(5, difficulty),
      leadership: scaleByDifficulty(6, difficulty),
      vitality: scaleByDifficulty(10, difficulty),
      willpower: scaleByDifficulty(6, difficulty),
      planar: scaleByDifficulty(5, difficulty),
      control: scaleByDifficulty(6, difficulty),
      dexterity: scaleByDifficulty(8, difficulty),
      agility: scaleByDifficulty(7, difficulty),
      strength: scaleByDifficulty(11, difficulty),
      endurance: scaleByDifficulty(9, difficulty),
    }),
    battleStats: new CharacterBattleStats(),
    elements: new CharacterElements(),
    fame: new CharacterFame(),
    id: `${MOBs.goblinWarrior}_${Bun.randomUUIDv7()}`,
    level: difficulty,
    name: {
      en: "Goblin Warrior",
      th: "ก๊อปลินนักรบ",
    },
    needs: new CharacterNeeds(),
    proficiencies: makeProficiencies({
      bareHand: scaleByDifficulty(5, difficulty),
      dagger: scaleByDifficulty(4, difficulty),
      sword: scaleByDifficulty(9, difficulty),
      blade: scaleByDifficulty(7, difficulty),
      axe: scaleByDifficulty(8, difficulty),
      hammer: scaleByDifficulty(9, difficulty),
      spear: scaleByDifficulty(7, difficulty),
      bow: scaleByDifficulty(3, difficulty),
      wand: scaleByDifficulty(1, difficulty),
      staff: scaleByDifficulty(1, difficulty),
      book: scaleByDifficulty(1, difficulty),
      orb: scaleByDifficulty(1, difficulty),
      shield: scaleByDifficulty(8, difficulty),
    }),
    saveRolls: defaultSaveRoll,
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

export function goblinMage(difficulty: 1 | 2 | 3 | 4 | 5) {
  const hp = scaleByDifficulty(14, difficulty);
  const mp = scaleByDifficulty(20, difficulty);
  const sp = scaleByDifficulty(8, difficulty);

  const character = new Character({
    actionSequence: defaultActionSequence(),
    alignment: new CharacterAlignment({}),
    artisans: new CharacterArtisans({}),
    attribute: makeAttribute({
      charisma: scaleByDifficulty(4, difficulty),
      luck: scaleByDifficulty(6, difficulty),
      intelligence: scaleByDifficulty(8, difficulty),
      leadership: scaleByDifficulty(3, difficulty),
      vitality: scaleByDifficulty(5, difficulty),
      willpower: scaleByDifficulty(7, difficulty),
      planar: scaleByDifficulty(8, difficulty),
      control: scaleByDifficulty(6, difficulty),
      dexterity: scaleByDifficulty(5, difficulty),
      agility: scaleByDifficulty(5, difficulty),
      strength: scaleByDifficulty(3, difficulty),
      endurance: scaleByDifficulty(4, difficulty),
    }),
    battleStats: new CharacterBattleStats(),
    elements: new CharacterElements(),
    fame: new CharacterFame(),
    id: `${MOBs.goblinMage}_${Bun.randomUUIDv7()}`,
    level: difficulty,
    name: {
      en: "Goblin Mage",
      th: "ก๊อปลินนักเวทย์",
    },
    needs: new CharacterNeeds(),
    proficiencies: makeProficiencies({
      bareHand: scaleByDifficulty(2, difficulty),
      dagger: scaleByDifficulty(3, difficulty),
      sword: scaleByDifficulty(2, difficulty),
      blade: scaleByDifficulty(2, difficulty),
      axe: scaleByDifficulty(1, difficulty),
      hammer: scaleByDifficulty(1, difficulty),
      spear: scaleByDifficulty(2, difficulty),
      bow: scaleByDifficulty(2, difficulty),
      wand: scaleByDifficulty(9, difficulty),
      staff: scaleByDifficulty(8, difficulty),
      book: scaleByDifficulty(9, difficulty),
      orb: scaleByDifficulty(8, difficulty),
      shield: scaleByDifficulty(2, difficulty),
    }),
    saveRolls: defaultSaveRoll,
    type: CharacterType.humanoid,
    vitals: new CharacterVitals({
      hp: new Vital({ base: hp }),
      mp: new Vital({ base: mp }),
      sp: new Vital({ base: sp }),
    }),
  });

  // TODO: Add fire mage skills when implemented
  character.activeSkills = [
    { id: SkillId.FireBall, level: randomSkillLevel(difficulty), exp: 0 },
    { id: SkillId.BurningHand, level: randomSkillLevel(difficulty), exp: 0 },
    { id: SkillId.FireBolt, level: randomSkillLevel(difficulty), exp: 0 },
  ];

  character.conditionalSkills = [
    { id: SkillId.Backdraft, level: randomSkillLevel(difficulty), exp: 0 },
    { id: SkillId.ArcaneShield, level: randomSkillLevel(difficulty), exp: 0 },
  ];

  character.conditionalSkillsCondition = new DeckCondition({
    selectedCondition: "SELF",
    self: {
      hp: {
        min: 0,
        max: character.vitals.hp.max * 0.4,
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

export function goblinCleric(difficulty: 1 | 2 | 3 | 4 | 5) {
  const hp = scaleByDifficulty(20, difficulty);
  const mp = scaleByDifficulty(25, difficulty);
  const sp = scaleByDifficulty(8, difficulty);

  const character = new Character({
    actionSequence: defaultActionSequence(),
    alignment: new CharacterAlignment({}),
    artisans: new CharacterArtisans({}),
    attribute: makeAttribute({
      charisma: scaleByDifficulty(6, difficulty),
      luck: scaleByDifficulty(5, difficulty),
      intelligence: scaleByDifficulty(7, difficulty),
      leadership: scaleByDifficulty(4, difficulty),
      vitality: scaleByDifficulty(7, difficulty),
      willpower: scaleByDifficulty(8, difficulty),
      planar: scaleByDifficulty(7, difficulty),
      control: scaleByDifficulty(6, difficulty),
      dexterity: scaleByDifficulty(4, difficulty),
      agility: scaleByDifficulty(4, difficulty),
      strength: scaleByDifficulty(5, difficulty),
      endurance: scaleByDifficulty(5, difficulty),
    }),
    battleStats: new CharacterBattleStats(),
    elements: new CharacterElements(), // left intentionally empty
    fame: new CharacterFame(),
    id: `${MOBs.goblinCleric}_${Bun.randomUUIDv7()}`,
    level: difficulty,
    name: {
      en: "Goblin Cleric",
      th: "ก๊อปลินนักบวช",
    },
    needs: new CharacterNeeds(),
    proficiencies: makeProficiencies({
      bareHand: scaleByDifficulty(3, difficulty),
      dagger: scaleByDifficulty(4, difficulty),
      sword: scaleByDifficulty(3, difficulty),
      blade: scaleByDifficulty(3, difficulty),
      axe: scaleByDifficulty(3, difficulty),
      hammer: scaleByDifficulty(9, difficulty),
      spear: scaleByDifficulty(3, difficulty),
      bow: scaleByDifficulty(1, difficulty),
      wand: scaleByDifficulty(6, difficulty),
      staff: scaleByDifficulty(8, difficulty),
      book: scaleByDifficulty(6, difficulty),
      orb: scaleByDifficulty(5, difficulty),
      shield: scaleByDifficulty(7, difficulty),
    }),
    saveRolls: defaultSaveRoll,
    type: CharacterType.humanoid,
    vitals: new CharacterVitals({
      hp: new Vital({ base: hp }),
      mp: new Vital({ base: mp }),
      sp: new Vital({ base: sp }),
    }),
  });

  // Goblin Cleric skills
  character.activeSkills = [
    { id: SkillId.ChaoticBlessing, level: randomSkillLevel(difficulty), exp: 0 },
    { id: SkillId.SpiritRattle, level: randomSkillLevel(difficulty), exp: 0 },
    { id: SkillId.HexOfRot, level: randomSkillLevel(difficulty), exp: 0 },
    { id: SkillId.MendSpirit, level: randomSkillLevel(difficulty), exp: 0 },
  ];

  return character;
}

export function goblinCaptain(difficulty: 1 | 2 | 3 | 4 | 5) {
  const hp = scaleByDifficulty(40, difficulty);
  const mp = scaleByDifficulty(10, difficulty);
  const sp = scaleByDifficulty(25, difficulty);

  const character = new Character({
    actionSequence: defaultActionSequence(),
    alignment: new CharacterAlignment({}),
    artisans: new CharacterArtisans({}),
    attribute: makeAttribute({
      charisma: scaleByDifficulty(8, difficulty, 1.5),
      luck: scaleByDifficulty(6, difficulty, 1.5),
      intelligence: scaleByDifficulty(6, difficulty, 1.5),
      leadership: scaleByDifficulty(9, difficulty, 1.5),
      vitality: scaleByDifficulty(10, difficulty, 1.5),
      willpower: scaleByDifficulty(6, difficulty, 1.5),
      planar: scaleByDifficulty(4, difficulty, 1.5),
      control: scaleByDifficulty(5, difficulty, 1.5),
      dexterity: scaleByDifficulty(7, difficulty, 1.5),
      agility: scaleByDifficulty(6, difficulty, 1.5),
      strength: scaleByDifficulty(10, difficulty, 1.5),
      endurance: scaleByDifficulty(9, difficulty, 1.5),
    }),
    battleStats: new CharacterBattleStats(),
    elements: new CharacterElements(), // left intentionally empty
    fame: new CharacterFame(),
    id: `${MOBs.goblinCaptain}_${Bun.randomUUIDv7()}`,
    level: difficulty + 2, // Slightly higher than standard mobs
    name: {
      en: "Goblin Captain",
      th: "ก๊อปลินหัวหน้า",
    },
    needs: new CharacterNeeds(),
    proficiencies: makeProficiencies({
      bareHand: scaleByDifficulty(6, difficulty),
      dagger: scaleByDifficulty(5, difficulty),
      sword: scaleByDifficulty(9, difficulty),
      blade: scaleByDifficulty(7, difficulty),
      axe: scaleByDifficulty(8, difficulty),
      hammer: scaleByDifficulty(8, difficulty),
      spear: scaleByDifficulty(6, difficulty),
      bow: scaleByDifficulty(5, difficulty),
      wand: scaleByDifficulty(1, difficulty),
      staff: scaleByDifficulty(2, difficulty),
      book: scaleByDifficulty(1, difficulty),
      orb: scaleByDifficulty(1, difficulty),
      shield: scaleByDifficulty(9, difficulty),
    }),
    saveRolls: defaultSaveRoll,
    type: CharacterType.humanoid,
    vitals: new CharacterVitals({
      hp: new Vital({ base: hp }),
      mp: new Vital({ base: mp }),
      sp: new Vital({ base: sp }),
    }),
  });

  // Skills will be added once commander and shout-type actions are defined
  return character;
}
