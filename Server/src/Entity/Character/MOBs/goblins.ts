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
      rapier: scaleByDifficulty(6, difficulty),
      greatSword: scaleByDifficulty(2, difficulty),
      machete: scaleByDifficulty(6, difficulty),
      blade: scaleByDifficulty(7, difficulty),
      scimitar: scaleByDifficulty(5, difficulty),
      zanmadao: scaleByDifficulty(2, difficulty),
      axe: scaleByDifficulty(4, difficulty),
      warAxe: scaleByDifficulty(3, difficulty),
      halberd: scaleByDifficulty(2, difficulty),
      spear: scaleByDifficulty(4, difficulty),
      javelin: scaleByDifficulty(7, difficulty),
      mace: scaleByDifficulty(3, difficulty),
      flail: scaleByDifficulty(2, difficulty),
      warHammer: scaleByDifficulty(2, difficulty),
      throwingKnife: scaleByDifficulty(9, difficulty),
      crossbow: scaleByDifficulty(7, difficulty),
      bow: scaleByDifficulty(8, difficulty),
      gun: scaleByDifficulty(3, difficulty),
      magicWand: scaleByDifficulty(2, difficulty),
      staff: scaleByDifficulty(2, difficulty),
      tome: scaleByDifficulty(1, difficulty),
      orb: scaleByDifficulty(1, difficulty),
      relic: scaleByDifficulty(1, difficulty),
      shield: scaleByDifficulty(3, difficulty),
    }),
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
      rapier: scaleByDifficulty(3, difficulty),
      greatSword: scaleByDifficulty(8, difficulty),
      machete: scaleByDifficulty(7, difficulty),
      blade: scaleByDifficulty(7, difficulty),
      scimitar: scaleByDifficulty(6, difficulty),
      zanmadao: scaleByDifficulty(6, difficulty),
      axe: scaleByDifficulty(8, difficulty),
      warAxe: scaleByDifficulty(9, difficulty),
      halberd: scaleByDifficulty(6, difficulty),
      spear: scaleByDifficulty(7, difficulty),
      javelin: scaleByDifficulty(4, difficulty),
      mace: scaleByDifficulty(6, difficulty),
      flail: scaleByDifficulty(6, difficulty),
      warHammer: scaleByDifficulty(8, difficulty),
      throwingKnife: scaleByDifficulty(3, difficulty),
      crossbow: scaleByDifficulty(3, difficulty),
      bow: scaleByDifficulty(3, difficulty),
      gun: scaleByDifficulty(1, difficulty),
      magicWand: scaleByDifficulty(1, difficulty),
      staff: scaleByDifficulty(1, difficulty),
      tome: scaleByDifficulty(1, difficulty),
      orb: scaleByDifficulty(1, difficulty),
      relic: scaleByDifficulty(1, difficulty),
      shield: scaleByDifficulty(8, difficulty),
    }),
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
      rapier: scaleByDifficulty(2, difficulty),
      greatSword: scaleByDifficulty(1, difficulty),
      machete: scaleByDifficulty(1, difficulty),
      blade: scaleByDifficulty(2, difficulty),
      scimitar: scaleByDifficulty(1, difficulty),
      zanmadao: scaleByDifficulty(1, difficulty),
      axe: scaleByDifficulty(1, difficulty),
      warAxe: scaleByDifficulty(1, difficulty),
      halberd: scaleByDifficulty(1, difficulty),
      spear: scaleByDifficulty(2, difficulty),
      javelin: scaleByDifficulty(2, difficulty),
      mace: scaleByDifficulty(1, difficulty),
      flail: scaleByDifficulty(1, difficulty),
      warHammer: scaleByDifficulty(1, difficulty),
      throwingKnife: scaleByDifficulty(2, difficulty),
      crossbow: scaleByDifficulty(2, difficulty),
      bow: scaleByDifficulty(2, difficulty),
      gun: scaleByDifficulty(1, difficulty),
      magicWand: scaleByDifficulty(9, difficulty),
      staff: scaleByDifficulty(8, difficulty),
      tome: scaleByDifficulty(9, difficulty),
      orb: scaleByDifficulty(8, difficulty),
      relic: scaleByDifficulty(5, difficulty),
      shield: scaleByDifficulty(2, difficulty),
    }),
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
      rapier: scaleByDifficulty(2, difficulty),
      greatSword: scaleByDifficulty(1, difficulty),
      machete: scaleByDifficulty(3, difficulty),
      blade: scaleByDifficulty(3, difficulty),
      scimitar: scaleByDifficulty(2, difficulty),
      zanmadao: scaleByDifficulty(1, difficulty),
      axe: scaleByDifficulty(3, difficulty),
      warAxe: scaleByDifficulty(3, difficulty),
      halberd: scaleByDifficulty(2, difficulty),
      spear: scaleByDifficulty(3, difficulty),
      javelin: scaleByDifficulty(2, difficulty),
      mace: scaleByDifficulty(9, difficulty),
      flail: scaleByDifficulty(5, difficulty),
      warHammer: scaleByDifficulty(6, difficulty),
      throwingKnife: scaleByDifficulty(2, difficulty),
      crossbow: scaleByDifficulty(2, difficulty),
      bow: scaleByDifficulty(1, difficulty),
      gun: scaleByDifficulty(1, difficulty),
      magicWand: scaleByDifficulty(6, difficulty),
      staff: scaleByDifficulty(8, difficulty),
      tome: scaleByDifficulty(6, difficulty),
      orb: scaleByDifficulty(5, difficulty),
      relic: scaleByDifficulty(9, difficulty),
      shield: scaleByDifficulty(7, difficulty),
    }),
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
      rapier: scaleByDifficulty(5, difficulty),
      greatSword: scaleByDifficulty(7, difficulty),
      machete: scaleByDifficulty(7, difficulty),
      blade: scaleByDifficulty(7, difficulty),
      scimitar: scaleByDifficulty(8, difficulty),
      zanmadao: scaleByDifficulty(6, difficulty),
      axe: scaleByDifficulty(8, difficulty),
      warAxe: scaleByDifficulty(8, difficulty),
      halberd: scaleByDifficulty(7, difficulty),
      spear: scaleByDifficulty(6, difficulty),
      javelin: scaleByDifficulty(5, difficulty),
      mace: scaleByDifficulty(6, difficulty),
      flail: scaleByDifficulty(6, difficulty),
      warHammer: scaleByDifficulty(8, difficulty),
      throwingKnife: scaleByDifficulty(4, difficulty),
      crossbow: scaleByDifficulty(5, difficulty),
      bow: scaleByDifficulty(5, difficulty),
      gun: scaleByDifficulty(3, difficulty),
      magicWand: scaleByDifficulty(1, difficulty),
      staff: scaleByDifficulty(2, difficulty),
      tome: scaleByDifficulty(1, difficulty),
      orb: scaleByDifficulty(1, difficulty),
      relic: scaleByDifficulty(2, difficulty),
      shield: scaleByDifficulty(9, difficulty),
    }),
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
