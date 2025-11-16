import { Character } from "src/Entity/Character/Character.ts";
import { MOBs } from "src/Entity/Character/MOBs/enums.ts";
import { CharacterNeeds } from "src/Entity/Character/Subclass/Needs/CharacterNeeds.ts";
import { CharacterType } from "src/InterFacesEnumsAndTypes/Enums.ts";
import {
  CharacterVitals,
  Vital,
} from "src/Entity/Character/Subclass/Vitals/CharacterVitals.ts";
import { makeAttribute, makeProficiencies, scaleByDifficulty } from "../helpers";
import { CharacterBattleStats } from "../../Subclass/Stats/CharacterBattleStats";
import { CharacterElements } from "../../Subclass/Stats/CharacterElements";
import { CharacterFame } from "../../Subclass/Fame/CharacterFame";
import { defaultActionSequence } from "../../Subclass/Action/CharacterAction";
import { CharacterAlignment } from "../../Subclass/Alignment/CharacterAlignment";
import { CharacterArtisans } from "../../Subclass/Stats/CharacterArtisans";
import { DeckCondition } from "../../Subclass/DeckCondition/DeckCondition";
import { defaultSaveRoll } from "src/Utils/CharacterDefaultSaveRoll";
import { RaceEnum } from "src/InterFacesEnumsAndTypes/Enums";
import { RACE_ATTRIBUTES } from "../../RaceAttributes";
import { equipMOB } from "../equipmentHelpers";
import { SkillId } from "src/Entity/Skill/enums";

// Base Human attributes
const baseHumanAttrs = RACE_ATTRIBUTES[RaceEnum.Human].attributes;

export function humanWarrior(difficulty: 1 | 2 | 3 | 4 | 5) {
  const hp = scaleByDifficulty(25, difficulty);
  const mp = scaleByDifficulty(5, difficulty);
  const sp = scaleByDifficulty(35, difficulty);

  const character = new Character({
    actionSequence: defaultActionSequence(),
    alignment: new CharacterAlignment({}),
    artisans: new CharacterArtisans({}),
    attribute: makeAttribute({
      charisma: scaleByDifficulty(baseHumanAttrs.charisma + 1, difficulty),
      luck: scaleByDifficulty(baseHumanAttrs.luck, difficulty),
      intelligence: scaleByDifficulty(baseHumanAttrs.intelligence - 1, difficulty),
      leadership: scaleByDifficulty(baseHumanAttrs.leadership + 2, difficulty),
      vitality: scaleByDifficulty(baseHumanAttrs.vitality + 3, difficulty),
      willpower: scaleByDifficulty(baseHumanAttrs.willpower + 1, difficulty),
      planar: scaleByDifficulty(baseHumanAttrs.planar - 2, difficulty),
      control: scaleByDifficulty(baseHumanAttrs.control, difficulty),
      dexterity: scaleByDifficulty(baseHumanAttrs.dexterity + 1, difficulty),
      agility: scaleByDifficulty(baseHumanAttrs.agility, difficulty),
      strength: scaleByDifficulty(baseHumanAttrs.strength + 3, difficulty),
      endurance: scaleByDifficulty(baseHumanAttrs.endurance + 2, difficulty),
    }),
    battleStats: new CharacterBattleStats(),
    elements: new CharacterElements(),
    fame: new CharacterFame(),
    id: `${MOBs.humanWarrior}_${Bun.randomUUIDv7()}`,
    level: difficulty,
    name: {
      en: "Human Warrior",
      th: "นักรบมนุษย์",
    },
    needs: new CharacterNeeds(),
    proficiencies: makeProficiencies({
      bareHand: scaleByDifficulty(5, difficulty),
      dagger: scaleByDifficulty(4, difficulty),
      sword: scaleByDifficulty(9, difficulty),
      blade: scaleByDifficulty(7, difficulty),
      axe: scaleByDifficulty(8, difficulty),
      hammer: scaleByDifficulty(8, difficulty),
      spear: scaleByDifficulty(7, difficulty),
      bow: scaleByDifficulty(4, difficulty),
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

  character.race = RaceEnum.Human;

  // TODO: Active skills
  // - Cleave: Wide area melee attack, deals 1d8+STR to all enemies in front
  // - Taunt: Forces enemies to target this character for 2 turns
  // - Bash: Heavy strike, deals 1d10+STR damage, chance to stun
  character.activeSkills = [
    {id: SkillId.Taunt, level: 1, exp: 0} 
  ];

  // TODO: Conditional skills (when HP < 30%)
  // - Shield Up: Raises defense significantly for 3 turns
  // - Last Stand: When near death, gains damage reduction and counter-attack
  character.conditionalSkills = [];

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

  character.race = RaceEnum.Human;

  // Equip weapon and armor based on difficulty
  equipMOB(character, "Warrior", difficulty);

  return character;
}

export function humanRanger(difficulty: 1 | 2 | 3 | 4 | 5) {
  const hp = scaleByDifficulty(18, difficulty);
  const mp = scaleByDifficulty(8, difficulty);
  const sp = scaleByDifficulty(30, difficulty);

  const character = new Character({
    actionSequence: defaultActionSequence(),
    alignment: new CharacterAlignment({}),
    artisans: new CharacterArtisans({}),
    attribute: makeAttribute({
      charisma: scaleByDifficulty(baseHumanAttrs.charisma, difficulty),
      luck: scaleByDifficulty(baseHumanAttrs.luck + 2, difficulty),
      intelligence: scaleByDifficulty(baseHumanAttrs.intelligence + 1, difficulty),
      leadership: scaleByDifficulty(baseHumanAttrs.leadership, difficulty),
      vitality: scaleByDifficulty(baseHumanAttrs.vitality + 1, difficulty),
      willpower: scaleByDifficulty(baseHumanAttrs.willpower, difficulty),
      planar: scaleByDifficulty(baseHumanAttrs.planar, difficulty),
      control: scaleByDifficulty(baseHumanAttrs.control + 1, difficulty),
      dexterity: scaleByDifficulty(baseHumanAttrs.dexterity + 3, difficulty),
      agility: scaleByDifficulty(baseHumanAttrs.agility + 2, difficulty),
      strength: scaleByDifficulty(baseHumanAttrs.strength + 1, difficulty),
      endurance: scaleByDifficulty(baseHumanAttrs.endurance + 1, difficulty),
    }),
    battleStats: new CharacterBattleStats(),
    elements: new CharacterElements(),
    fame: new CharacterFame(),
    id: `${MOBs.humanRanger}_${Bun.randomUUIDv7()}`,
    level: difficulty,
    name: {
      en: "Human Ranger",
      th: "นักล่ามนุษย์",
    },
    needs: new CharacterNeeds(),
    proficiencies: makeProficiencies({
      bareHand: scaleByDifficulty(4, difficulty),
      dagger: scaleByDifficulty(8, difficulty),
      sword: scaleByDifficulty(7, difficulty),
      blade: scaleByDifficulty(6, difficulty),
      axe: scaleByDifficulty(5, difficulty),
      hammer: scaleByDifficulty(3, difficulty),
      spear: scaleByDifficulty(6, difficulty),
      bow: scaleByDifficulty(10, difficulty),
      wand: scaleByDifficulty(2, difficulty),
      staff: scaleByDifficulty(3, difficulty),
      book: scaleByDifficulty(2, difficulty),
      orb: scaleByDifficulty(2, difficulty),
      shield: scaleByDifficulty(5, difficulty),
    }),
    saveRolls: defaultSaveRoll,
    type: CharacterType.humanoid,
    vitals: new CharacterVitals({
      hp: new Vital({ base: hp }),
      mp: new Vital({ base: mp }),
      sp: new Vital({ base: sp }),
    }),
  });

  character.race = RaceEnum.Human;

  // TODO: Active skills
  // - Multi-Shot: Fires multiple arrows, deals 1d6+DEX to 2-3 random enemies
  // - Tracking Shot: Marks target, next attack has increased crit chance
  // - Nature's Call: Summons animal companion for 3 turns
  character.activeSkills = [];

  // TODO: Conditional skills (when enemy HP < 50%)
  // - Finish Shot: High damage single target, deals 2d8+DEX
  // - Escape: Disengages and moves to backline
  character.conditionalSkills = [];

  character.conditionalSkillsCondition = new DeckCondition({
    selectedCondition: "ENEMY",
    enemy: {
      hp: {
        min: 0,
        max: 100,
      },
      mp: {
        min: 0,
        max: 100,
      },
      sp: {
        min: 0,
        max: 100,
      },
    },
  });

  character.race = RaceEnum.Human;

  // Equip weapon and armor based on difficulty
  equipMOB(character, "Ranger", difficulty);

  return character;
}

export function humanMage(difficulty: 1 | 2 | 3 | 4 | 5) {
  const hp = scaleByDifficulty(14, difficulty);
  const mp = scaleByDifficulty(25, difficulty);
  const sp = scaleByDifficulty(8, difficulty);

  const character = new Character({
    actionSequence: defaultActionSequence(),
    alignment: new CharacterAlignment({}),
    artisans: new CharacterArtisans({}),
    attribute: makeAttribute({
      charisma: scaleByDifficulty(baseHumanAttrs.charisma + 1, difficulty),
      luck: scaleByDifficulty(baseHumanAttrs.luck, difficulty),
      intelligence: scaleByDifficulty(baseHumanAttrs.intelligence + 3, difficulty),
      leadership: scaleByDifficulty(baseHumanAttrs.leadership, difficulty),
      vitality: scaleByDifficulty(baseHumanAttrs.vitality - 1, difficulty),
      willpower: scaleByDifficulty(baseHumanAttrs.willpower + 1, difficulty),
      planar: scaleByDifficulty(baseHumanAttrs.planar + 3, difficulty),
      control: scaleByDifficulty(baseHumanAttrs.control + 2, difficulty),
      dexterity: scaleByDifficulty(baseHumanAttrs.dexterity, difficulty),
      agility: scaleByDifficulty(baseHumanAttrs.agility, difficulty),
      strength: scaleByDifficulty(baseHumanAttrs.strength - 2, difficulty),
      endurance: scaleByDifficulty(baseHumanAttrs.endurance - 1, difficulty),
    }),
    battleStats: new CharacterBattleStats(),
    elements: new CharacterElements(),
    fame: new CharacterFame(),
    id: `${MOBs.humanMage}_${Bun.randomUUIDv7()}`,
    level: difficulty,
    name: {
      en: "Human Mage",
      th: "นักเวทย์มนุษย์",
    },
    needs: new CharacterNeeds(),
    proficiencies: makeProficiencies({
      bareHand: scaleByDifficulty(2, difficulty),
      dagger: scaleByDifficulty(4, difficulty),
      sword: scaleByDifficulty(2, difficulty),
      blade: scaleByDifficulty(2, difficulty),
      axe: scaleByDifficulty(1, difficulty),
      hammer: scaleByDifficulty(1, difficulty),
      spear: scaleByDifficulty(2, difficulty),
      bow: scaleByDifficulty(2, difficulty),
      wand: scaleByDifficulty(10, difficulty),
      staff: scaleByDifficulty(9, difficulty),
      book: scaleByDifficulty(10, difficulty),
      orb: scaleByDifficulty(9, difficulty),
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

  character.race = RaceEnum.Human;

  // TODO: Active skills
  // - Fireball: Area attack, deals 1d12+INT fire damage to all enemies
  // - Magic Missile: Guaranteed hit, deals 1d6+INT damage to random target
  // - Shield: Creates barrier, reduces incoming damage by 50% for 2 turns
  character.activeSkills = [];

  // TODO: Conditional skills (when MP < 30%)
  // - Mana Surge: Consumes remaining MP to deal massive damage
  // - Teleport: Escapes to backline, restores some MP
  character.conditionalSkills = [];

  character.conditionalSkillsCondition = new DeckCondition({
    selectedCondition: "SELF",
    self: {
      hp: {
        min: 0,
        max: character.vitals.hp.max,
      },
      mp: {
        min: 0,
        max: character.vitals.mp.max * 0.3,
      },
      sp: {
        min: 0,
        max: character.vitals.sp.max,
      },
    },
  });

  character.race = RaceEnum.Human;

  // Equip weapon and armor based on difficulty
  equipMOB(character, "Mage", difficulty);

  return character;
}

export function humanCleric(difficulty: 1 | 2 | 3 | 4 | 5) {
  const hp = scaleByDifficulty(20, difficulty);
  const mp = scaleByDifficulty(22, difficulty);
  const sp = scaleByDifficulty(10, difficulty);

  const character = new Character({
    actionSequence: defaultActionSequence(),
    alignment: new CharacterAlignment({}),
    artisans: new CharacterArtisans({}),
    attribute: makeAttribute({
      charisma: scaleByDifficulty(baseHumanAttrs.charisma + 2, difficulty),
      luck: scaleByDifficulty(baseHumanAttrs.luck, difficulty),
      intelligence: scaleByDifficulty(baseHumanAttrs.intelligence + 2, difficulty),
      leadership: scaleByDifficulty(baseHumanAttrs.leadership + 1, difficulty),
      vitality: scaleByDifficulty(baseHumanAttrs.vitality + 2, difficulty),
      willpower: scaleByDifficulty(baseHumanAttrs.willpower + 3, difficulty),
      planar: scaleByDifficulty(baseHumanAttrs.planar + 2, difficulty),
      control: scaleByDifficulty(baseHumanAttrs.control + 1, difficulty),
      dexterity: scaleByDifficulty(baseHumanAttrs.dexterity, difficulty),
      agility: scaleByDifficulty(baseHumanAttrs.agility, difficulty),
      strength: scaleByDifficulty(baseHumanAttrs.strength, difficulty),
      endurance: scaleByDifficulty(baseHumanAttrs.endurance + 1, difficulty),
    }),
    battleStats: new CharacterBattleStats(),
    elements: new CharacterElements(),
    fame: new CharacterFame(),
    id: `${MOBs.humanCleric}_${Bun.randomUUIDv7()}`,
    level: difficulty,
    name: {
      en: "Human Cleric",
      th: "นักบวชมนุษย์",
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
      bow: scaleByDifficulty(2, difficulty),
      wand: scaleByDifficulty(6, difficulty),
      staff: scaleByDifficulty(8, difficulty),
      book: scaleByDifficulty(6, difficulty),
      orb: scaleByDifficulty(7, difficulty),
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

  character.race = RaceEnum.Human;

  // TODO: Active skills
  // - Heal: Restores 2d6+WIL HP to target ally
  // - Bless: Grants +2 to all stats for 3 turns to party
  // - Smite: Deals 1d8+WIL holy damage to enemy
  character.activeSkills = [];

  // TODO: Conditional skills (when ally HP < 50%)
  // - Mass Heal: Restores HP to all allies
  // - Revive: Brings fallen ally back with 25% HP
  character.conditionalSkills = [];

  character.conditionalSkillsCondition = new DeckCondition({
    selectedCondition: "TEAMMATE",
    teammate: {
      position: [0, 1, 2, 3, 4, 5],
      vital: {
        hp: {
          min: 0,
          max: 100,
        },
        mp: {
          min: 0,
          max: 100,
        },
        sp: {
          min: 0,
          max: 100,
        },
      },
    },
  });

  character.race = RaceEnum.Human;

  // Equip weapon and armor based on difficulty
  equipMOB(character, "Cleric", difficulty);

  return character;
}

export function humanPaladin(difficulty: 1 | 2 | 3 | 4 | 5) {
  const hp = scaleByDifficulty(28, difficulty);
  const mp = scaleByDifficulty(15, difficulty);
  const sp = scaleByDifficulty(25, difficulty);

  const character = new Character({
    actionSequence: defaultActionSequence(),
    alignment: new CharacterAlignment({}),
    artisans: new CharacterArtisans({}),
    attribute: makeAttribute({
      charisma: scaleByDifficulty(baseHumanAttrs.charisma + 2, difficulty),
      luck: scaleByDifficulty(baseHumanAttrs.luck, difficulty),
      intelligence: scaleByDifficulty(baseHumanAttrs.intelligence + 1, difficulty),
      leadership: scaleByDifficulty(baseHumanAttrs.leadership + 2, difficulty),
      vitality: scaleByDifficulty(baseHumanAttrs.vitality + 3, difficulty),
      willpower: scaleByDifficulty(baseHumanAttrs.willpower + 2, difficulty),
      planar: scaleByDifficulty(baseHumanAttrs.planar + 1, difficulty),
      control: scaleByDifficulty(baseHumanAttrs.control + 1, difficulty),
      dexterity: scaleByDifficulty(baseHumanAttrs.dexterity, difficulty),
      agility: scaleByDifficulty(baseHumanAttrs.agility, difficulty),
      strength: scaleByDifficulty(baseHumanAttrs.strength + 2, difficulty),
      endurance: scaleByDifficulty(baseHumanAttrs.endurance + 3, difficulty),
    }),
    battleStats: new CharacterBattleStats(),
    elements: new CharacterElements(),
    fame: new CharacterFame(),
    id: `${MOBs.humanPaladin}_${Bun.randomUUIDv7()}`,
    level: difficulty,
    name: {
      en: "Human Paladin",
      th: "พาลาดินมนุษย์",
    },
    needs: new CharacterNeeds(),
    proficiencies: makeProficiencies({
      bareHand: scaleByDifficulty(5, difficulty),
      dagger: scaleByDifficulty(4, difficulty),
      sword: scaleByDifficulty(9, difficulty),
      blade: scaleByDifficulty(7, difficulty),
      axe: scaleByDifficulty(6, difficulty),
      hammer: scaleByDifficulty(8, difficulty),
      spear: scaleByDifficulty(6, difficulty),
      bow: scaleByDifficulty(3, difficulty),
      wand: scaleByDifficulty(3, difficulty),
      staff: scaleByDifficulty(5, difficulty),
      book: scaleByDifficulty(4, difficulty),
      orb: scaleByDifficulty(5, difficulty),
      shield: scaleByDifficulty(10, difficulty),
    }),
    saveRolls: defaultSaveRoll,
    type: CharacterType.humanoid,
    vitals: new CharacterVitals({
      hp: new Vital({ base: hp }),
      mp: new Vital({ base: mp }),
      sp: new Vital({ base: sp }),
    }),
  });

  character.race = RaceEnum.Human;

  // TODO: Active skills
  // - Holy Strike: Deals 1d10+STR+WIL holy damage, heals self for 50% of damage
  // - Aura of Protection: Grants damage reduction to all allies for 3 turns
  // - Lay on Hands: Heals target ally for 2d8+WIL HP
  character.activeSkills = [];

  // TODO: Conditional skills (when HP < 40%)
  // - Divine Shield: Becomes invulnerable for 1 turn
  // - Retribution: Counter-attacks when hit, deals holy damage
  character.conditionalSkills = [];

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

  character.race = RaceEnum.Human;

  // Equip weapon and armor based on difficulty
  equipMOB(character, "Paladin", difficulty);

  return character;
}

export function humanWarlock(difficulty: 1 | 2 | 3 | 4 | 5) {
  const hp = scaleByDifficulty(16, difficulty);
  const mp = scaleByDifficulty(28, difficulty);
  const sp = scaleByDifficulty(6, difficulty);

  const character = new Character({
    actionSequence: defaultActionSequence(),
    alignment: new CharacterAlignment({}),
    artisans: new CharacterArtisans({}),
    attribute: makeAttribute({
      charisma: scaleByDifficulty(baseHumanAttrs.charisma + 3, difficulty),
      luck: scaleByDifficulty(baseHumanAttrs.luck - 1, difficulty),
      intelligence: scaleByDifficulty(baseHumanAttrs.intelligence + 2, difficulty),
      leadership: scaleByDifficulty(baseHumanAttrs.leadership, difficulty),
      vitality: scaleByDifficulty(baseHumanAttrs.vitality, difficulty),
      willpower: scaleByDifficulty(baseHumanAttrs.willpower + 2, difficulty),
      planar: scaleByDifficulty(baseHumanAttrs.planar + 3, difficulty),
      control: scaleByDifficulty(baseHumanAttrs.control + 1, difficulty),
      dexterity: scaleByDifficulty(baseHumanAttrs.dexterity, difficulty),
      agility: scaleByDifficulty(baseHumanAttrs.agility, difficulty),
      strength: scaleByDifficulty(baseHumanAttrs.strength - 2, difficulty),
      endurance: scaleByDifficulty(baseHumanAttrs.endurance - 1, difficulty),
    }),
    battleStats: new CharacterBattleStats(),
    elements: new CharacterElements(),
    fame: new CharacterFame(),
    id: `${MOBs.humanWarlock}_${Bun.randomUUIDv7()}`,
    level: difficulty,
    name: {
      en: "Human Warlock",
      th: "นักเวทย์มนตร์ดำมนุษย์",
    },
    needs: new CharacterNeeds(),
    proficiencies: makeProficiencies({
      bareHand: scaleByDifficulty(2, difficulty),
      dagger: scaleByDifficulty(5, difficulty),
      sword: scaleByDifficulty(2, difficulty),
      blade: scaleByDifficulty(2, difficulty),
      axe: scaleByDifficulty(1, difficulty),
      hammer: scaleByDifficulty(1, difficulty),
      spear: scaleByDifficulty(2, difficulty),
      bow: scaleByDifficulty(2, difficulty),
      wand: scaleByDifficulty(10, difficulty),
      staff: scaleByDifficulty(8, difficulty),
      book: scaleByDifficulty(10, difficulty),
      orb: scaleByDifficulty(9, difficulty),
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

  character.race = RaceEnum.Human;

  // TODO: Active skills
  // - Dark Bolt: Deals 1d10+CHA dark damage, drains 10% of damage as HP
  // - Curse: Applies debuff that deals 1d4 damage per turn for 3 turns
  // - Summon Imp: Summons weak demon companion for 4 turns
  character.activeSkills = [];

  // TODO: Conditional skills (when HP < 30%)
  // - Life Drain: Steals HP from enemy equal to 2d8+CHA
  // - Desperate Pact: Sacrifices HP to restore MP and gain power boost
  character.conditionalSkills = [];

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

  character.race = RaceEnum.Human;

  // Equip weapon and armor based on difficulty
  equipMOB(character, "Warlock", difficulty);

  return character;
}

export function humanBarbarian(difficulty: 1 | 2 | 3 | 4 | 5) {
  const hp = scaleByDifficulty(30, difficulty);
  const mp = scaleByDifficulty(3, difficulty);
  const sp = scaleByDifficulty(40, difficulty);

  const character = new Character({
    actionSequence: defaultActionSequence(),
    alignment: new CharacterAlignment({}),
    artisans: new CharacterArtisans({}),
    attribute: makeAttribute({
      charisma: scaleByDifficulty(baseHumanAttrs.charisma - 1, difficulty),
      luck: scaleByDifficulty(baseHumanAttrs.luck + 1, difficulty),
      intelligence: scaleByDifficulty(baseHumanAttrs.intelligence - 2, difficulty),
      leadership: scaleByDifficulty(baseHumanAttrs.leadership, difficulty),
      vitality: scaleByDifficulty(baseHumanAttrs.vitality + 4, difficulty),
      willpower: scaleByDifficulty(baseHumanAttrs.willpower + 1, difficulty),
      planar: scaleByDifficulty(baseHumanAttrs.planar - 3, difficulty),
      control: scaleByDifficulty(baseHumanAttrs.control - 1, difficulty),
      dexterity: scaleByDifficulty(baseHumanAttrs.dexterity + 1, difficulty),
      agility: scaleByDifficulty(baseHumanAttrs.agility + 1, difficulty),
      strength: scaleByDifficulty(baseHumanAttrs.strength + 4, difficulty),
      endurance: scaleByDifficulty(baseHumanAttrs.endurance + 3, difficulty),
    }),
    battleStats: new CharacterBattleStats(),
    elements: new CharacterElements(),
    fame: new CharacterFame(),
    id: `${MOBs.humanBarbarian}_${Bun.randomUUIDv7()}`,
    level: difficulty,
    name: {
      en: "Human Barbarian",
      th: "นักรบป่าเถื่อนมนุษย์",
    },
    needs: new CharacterNeeds(),
    proficiencies: makeProficiencies({
      bareHand: scaleByDifficulty(8, difficulty),
      dagger: scaleByDifficulty(5, difficulty),
      sword: scaleByDifficulty(7, difficulty),
      blade: scaleByDifficulty(6, difficulty),
      axe: scaleByDifficulty(10, difficulty),
      hammer: scaleByDifficulty(9, difficulty),
      spear: scaleByDifficulty(6, difficulty),
      bow: scaleByDifficulty(3, difficulty),
      wand: scaleByDifficulty(1, difficulty),
      staff: scaleByDifficulty(2, difficulty),
      book: scaleByDifficulty(1, difficulty),
      orb: scaleByDifficulty(1, difficulty),
      shield: scaleByDifficulty(4, difficulty),
    }),
    saveRolls: defaultSaveRoll,
    type: CharacterType.humanoid,
    vitals: new CharacterVitals({
      hp: new Vital({ base: hp }),
      mp: new Vital({ base: mp }),
      sp: new Vital({ base: sp }),
    }),
  });

  character.race = RaceEnum.Human;

  // TODO: Active skills
  // - Rage: Increases damage by 50% and reduces defense by 25% for 3 turns
  // - Reckless Attack: Deals 2d8+STR damage but takes 1d4 damage in return
  // - Intimidating Shout: Reduces enemy attack by 2 for 2 turns
  character.activeSkills = [];

  // TODO: Conditional skills (when HP < 50%)
  // - Berserker Rage: When enraged, deals 3d6+STR damage, ignores pain
  // - Last Breath: When near death, gains massive damage boost for 1 turn
  character.conditionalSkills = [];

  character.conditionalSkillsCondition = new DeckCondition({
    selectedCondition: "SELF",
    self: {
      hp: {
        min: 0,
        max: character.vitals.hp.max * 0.5,
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

  character.race = RaceEnum.Human;

  // Equip weapon and armor based on difficulty
  equipMOB(character, "Barbarian", difficulty);

  return character;
}

export function humanSorcerer(difficulty: 1 | 2 | 3 | 4 | 5) {
  const hp = scaleByDifficulty(15, difficulty);
  const mp = scaleByDifficulty(26, difficulty);
  const sp = scaleByDifficulty(7, difficulty);

  const character = new Character({
    actionSequence: defaultActionSequence(),
    alignment: new CharacterAlignment({}),
    artisans: new CharacterArtisans({}),
    attribute: makeAttribute({
      charisma: scaleByDifficulty(baseHumanAttrs.charisma + 3, difficulty),
      luck: scaleByDifficulty(baseHumanAttrs.luck + 1, difficulty),
      intelligence: scaleByDifficulty(baseHumanAttrs.intelligence + 2, difficulty),
      leadership: scaleByDifficulty(baseHumanAttrs.leadership, difficulty),
      vitality: scaleByDifficulty(baseHumanAttrs.vitality - 1, difficulty),
      willpower: scaleByDifficulty(baseHumanAttrs.willpower + 1, difficulty),
      planar: scaleByDifficulty(baseHumanAttrs.planar + 4, difficulty),
      control: scaleByDifficulty(baseHumanAttrs.control + 3, difficulty),
      dexterity: scaleByDifficulty(baseHumanAttrs.dexterity, difficulty),
      agility: scaleByDifficulty(baseHumanAttrs.agility, difficulty),
      strength: scaleByDifficulty(baseHumanAttrs.strength - 2, difficulty),
      endurance: scaleByDifficulty(baseHumanAttrs.endurance - 1, difficulty),
    }),
    battleStats: new CharacterBattleStats(),
    elements: new CharacterElements(),
    fame: new CharacterFame(),
    id: `${MOBs.humanSorcerer}_${Bun.randomUUIDv7()}`,
    level: difficulty,
    name: {
      en: "Human Sorcerer",
      th: "นักเวทย์มนตร์มนุษย์",
    },
    needs: new CharacterNeeds(),
    proficiencies: makeProficiencies({
      bareHand: scaleByDifficulty(2, difficulty),
      dagger: scaleByDifficulty(4, difficulty),
      sword: scaleByDifficulty(2, difficulty),
      blade: scaleByDifficulty(2, difficulty),
      axe: scaleByDifficulty(1, difficulty),
      hammer: scaleByDifficulty(1, difficulty),
      spear: scaleByDifficulty(2, difficulty),
      bow: scaleByDifficulty(2, difficulty),
      wand: scaleByDifficulty(11, difficulty),
      staff: scaleByDifficulty(10, difficulty),
      book: scaleByDifficulty(9, difficulty),
      orb: scaleByDifficulty(10, difficulty),
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

  character.race = RaceEnum.Human;

  // TODO: Active skills
  // - Chain Lightning: Deals 1d8+CHA lightning damage, jumps to 2 additional enemies
  // - Meteor Strike: Deals 2d10+CHA fire damage to single target after 1 turn delay
  // - Elemental Burst: Random element (fire/ice/lightning), deals 1d12+CHA damage
  character.activeSkills = [];

  // TODO: Conditional skills (when MP < 40%)
  // - Overload: Consumes all MP to deal massive area damage
  // - Quick Cast: Next spell costs no MP but deals 50% less damage
  character.conditionalSkills = [];

  character.conditionalSkillsCondition = new DeckCondition({
    selectedCondition: "SELF",
    self: {
      hp: {
        min: 0,
        max: character.vitals.hp.max,
      },
      mp: {
        min: 0,
        max: character.vitals.mp.max * 0.4,
      },
      sp: {
        min: 0,
        max: character.vitals.sp.max,
      },
    },
  });

  character.race = RaceEnum.Human;

  // Equip weapon and armor based on difficulty
  equipMOB(character, "Sorcerer", difficulty);

  return character;
}

export function humanRogue(difficulty: 1 | 2 | 3 | 4 | 5) {
  const hp = scaleByDifficulty(16, difficulty);
  const mp = scaleByDifficulty(6, difficulty);
  const sp = scaleByDifficulty(32, difficulty);

  const character = new Character({
    actionSequence: defaultActionSequence(),
    alignment: new CharacterAlignment({}),
    artisans: new CharacterArtisans({}),
    attribute: makeAttribute({
      charisma: scaleByDifficulty(baseHumanAttrs.charisma + 1, difficulty),
      luck: scaleByDifficulty(baseHumanAttrs.luck + 3, difficulty),
      intelligence: scaleByDifficulty(baseHumanAttrs.intelligence + 1, difficulty),
      leadership: scaleByDifficulty(baseHumanAttrs.leadership, difficulty),
      vitality: scaleByDifficulty(baseHumanAttrs.vitality, difficulty),
      willpower: scaleByDifficulty(baseHumanAttrs.willpower, difficulty),
      planar: scaleByDifficulty(baseHumanAttrs.planar, difficulty),
      control: scaleByDifficulty(baseHumanAttrs.control + 1, difficulty),
      dexterity: scaleByDifficulty(baseHumanAttrs.dexterity + 4, difficulty),
      agility: scaleByDifficulty(baseHumanAttrs.agility + 3, difficulty),
      strength: scaleByDifficulty(baseHumanAttrs.strength, difficulty),
      endurance: scaleByDifficulty(baseHumanAttrs.endurance, difficulty),
    }),
    battleStats: new CharacterBattleStats(),
    elements: new CharacterElements(),
    fame: new CharacterFame(),
    id: `${MOBs.humanRogue}_${Bun.randomUUIDv7()}`,
    level: difficulty,
    name: {
      en: "Human Rogue",
      th: "โจรมนุษย์",
    },
    needs: new CharacterNeeds(),
    proficiencies: makeProficiencies({
      bareHand: scaleByDifficulty(6, difficulty),
      dagger: scaleByDifficulty(11, difficulty),
      sword: scaleByDifficulty(9, difficulty),
      blade: scaleByDifficulty(8, difficulty),
      axe: scaleByDifficulty(4, difficulty),
      hammer: scaleByDifficulty(3, difficulty),
      spear: scaleByDifficulty(4, difficulty),
      bow: scaleByDifficulty(10, difficulty),
      wand: scaleByDifficulty(2, difficulty),
      staff: scaleByDifficulty(2, difficulty),
      book: scaleByDifficulty(2, difficulty),
      orb: scaleByDifficulty(2, difficulty),
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

  character.race = RaceEnum.Human;

  // TODO: Active skills
  // - Backstab: Deals 3d6+DEX damage if attacking from behind, guaranteed crit
  // - Poison Blade: Applies poison that deals 1d4 damage per turn for 4 turns
  // - Smoke Bomb: Reduces accuracy of all enemies for 2 turns
  character.activeSkills = [];

  // TODO: Conditional skills (when enemy HP < 30%)
  // - Assassinate: Instant kill if target HP below threshold, deals massive damage otherwise
  // - Vanish: Becomes untargetable for 1 turn, next attack is guaranteed crit
  character.conditionalSkills = [];

  character.conditionalSkillsCondition = new DeckCondition({
    selectedCondition: "ENEMY",
    enemy: {
      hp: {
        min: 0,
        max: 100,
      },
      mp: {
        min: 0,
        max: 100,
      },
      sp: {
        min: 0,
        max: 100,
      },
    },
  });

  character.race = RaceEnum.Human;

  // Equip weapon and armor based on difficulty
  equipMOB(character, "Rogue", difficulty);

  return character;
}

export function humanDruid(difficulty: 1 | 2 | 3 | 4 | 5) {
  const hp = scaleByDifficulty(19, difficulty);
  const mp = scaleByDifficulty(20, difficulty);
  const sp = scaleByDifficulty(18, difficulty);

  const character = new Character({
    actionSequence: defaultActionSequence(),
    alignment: new CharacterAlignment({}),
    artisans: new CharacterArtisans({}),
    attribute: makeAttribute({
      charisma: scaleByDifficulty(baseHumanAttrs.charisma + 1, difficulty),
      luck: scaleByDifficulty(baseHumanAttrs.luck + 1, difficulty),
      intelligence: scaleByDifficulty(baseHumanAttrs.intelligence + 2, difficulty),
      leadership: scaleByDifficulty(baseHumanAttrs.leadership, difficulty),
      vitality: scaleByDifficulty(baseHumanAttrs.vitality + 2, difficulty),
      willpower: scaleByDifficulty(baseHumanAttrs.willpower + 2, difficulty),
      planar: scaleByDifficulty(baseHumanAttrs.planar + 2, difficulty),
      control: scaleByDifficulty(baseHumanAttrs.control + 2, difficulty),
      dexterity: scaleByDifficulty(baseHumanAttrs.dexterity + 1, difficulty),
      agility: scaleByDifficulty(baseHumanAttrs.agility + 1, difficulty),
      strength: scaleByDifficulty(baseHumanAttrs.strength, difficulty),
      endurance: scaleByDifficulty(baseHumanAttrs.endurance + 1, difficulty),
    }),
    battleStats: new CharacterBattleStats(),
    elements: new CharacterElements(),
    fame: new CharacterFame(),
    id: `${MOBs.humanDruid}_${Bun.randomUUIDv7()}`,
    level: difficulty,
    name: {
      en: "Human Druid",
      th: "ดรูอิดมนุษย์",
    },
    needs: new CharacterNeeds(),
    proficiencies: makeProficiencies({
      bareHand: scaleByDifficulty(5, difficulty),
      dagger: scaleByDifficulty(5, difficulty),
      sword: scaleByDifficulty(4, difficulty),
      blade: scaleByDifficulty(4, difficulty),
      axe: scaleByDifficulty(6, difficulty),
      hammer: scaleByDifficulty(5, difficulty),
      spear: scaleByDifficulty(6, difficulty),
      bow: scaleByDifficulty(7, difficulty),
      wand: scaleByDifficulty(7, difficulty),
      staff: scaleByDifficulty(9, difficulty),
      book: scaleByDifficulty(6, difficulty),
      orb: scaleByDifficulty(6, difficulty),
      shield: scaleByDifficulty(5, difficulty),
    }),
    saveRolls: defaultSaveRoll,
    type: CharacterType.humanoid,
    vitals: new CharacterVitals({
      hp: new Vital({ base: hp }),
      mp: new Vital({ base: mp }),
      sp: new Vital({ base: sp }),
    }),
  });

  character.race = RaceEnum.Human;

  // TODO: Active skills
  // - Entangle: Roots enemy in place for 2 turns, deals 1d6 nature damage
  // - Healing Bloom: Restores 1d8+WIL HP to all allies over 3 turns
  // - Wild Shape: Transforms into bear, gains +3 STR and +2 END for 4 turns
  character.activeSkills = [];

  // TODO: Conditional skills (when ally HP < 50%)
  // - Nature's Embrace: Massive heal to lowest HP ally, 3d10+WIL
  // - Call of the Wild: Summons 2-3 animal companions to fight
  character.conditionalSkills = [];

  character.conditionalSkillsCondition = new DeckCondition({
    selectedCondition: "TEAMMATE",
    teammate: {
      position: [0, 1, 2, 3, 4, 5],
      vital: {
        hp: {
          min: 0,
          max: 100,
        },
        mp: {
          min: 0,
          max: 100,
        },
        sp: {
          min: 0,
          max: 100,
        },
      },
    },
  });

  character.race = RaceEnum.Human;

  // Equip weapon and armor based on difficulty
  equipMOB(character, "Druid", difficulty);

  return character;
}

