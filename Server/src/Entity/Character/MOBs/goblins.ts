import { Character } from "src/Entity/Character/Character.ts";
import { MOBEnum } from "src/Entity/Character/MOBs/enums.ts";
import { CharacterNeeds } from "src/Entity/Character/Subclass/Needs/CharacterNeeds.ts";
import {
  CharacterEquipmentSlot,
  CharacterType,
  RaceEnum,
} from "src/InterFacesEnumsAndTypes/Enums.ts";
import {
  CharacterVitals,
  Vital,
} from "src/Entity/Character/Subclass/Vitals/CharacterVitals.ts";
import { makeAttribute, makeProficiencies, scaleByDifficulty, registerMOB } from "./helpers";
import { CharacterBattleStats } from "../Subclass/Stats/CharacterBattleStats";
import { CharacterElements } from "../Subclass/Stats/CharacterElements";
import { CharacterFame } from "../Subclass/Fame/CharacterFame";
import { defaultActionSequence } from "../Subclass/Action/CharacterAction";
import { CharacterAlignment } from "../Subclass/Alignment/CharacterAlignment";
import { CharacterArtisans } from "../Subclass/Stats/CharacterArtisans";
import {
  RogueSkillId,
  MobSkillId,
  WarriorSkillId,
  GuardianSkillId,
  MageSkillId,
  ShamanSkillId,
} from "src/Entity/Skill/enums";
import { DeckCondition } from "../Subclass/DeckCondition/DeckCondition";
import { defaultSaveRoll } from "src/Utils/CharacterDefaultSaveRoll";
import { equipDirect } from "src/Entity/Item/Equipment/equipDirect";
import {
  BladeId,
  BodyId,
  BookWId,
  HeadWearId,
  ShieldId,
  StaffId,
  SwordId,
  WandId,
} from "src/Entity/Item";
import { TraitEnum } from "src/Entity/Trait/enum.ts";
import { rollTwenty } from "src/Utils/Dice";
import { MOB } from ".";

const goblinTraits: Map<TraitEnum, number> = new Map([
  [TraitEnum.GoblinCunning, 1],
  [TraitEnum.ScrapSurvivalist, 1],
  [TraitEnum.PackInstinct, 1],
]);

function randomSkillLevel(difficulty: number): number {
  return Math.min(
    Math.max(Math.floor(Math.random() * 3) + difficulty - 1, 1),
    5,
  );
}

export function goblinScout(difficulty: 1 | 2 | 3 | 4 | 5) {
  const hp = scaleByDifficulty(20, difficulty);
  const mp = scaleByDifficulty(20, difficulty);
  const sp = scaleByDifficulty(20, difficulty);

  const character = new MOB({
    actionSequence: defaultActionSequence(),
    alignment: new CharacterAlignment({}),
    artisans: new CharacterArtisans({}),
    attribute: makeAttribute({
      charisma: scaleByDifficulty(3, difficulty),
      luck: scaleByDifficulty(10, difficulty),
      intelligence: scaleByDifficulty(4, difficulty),
      leadership: scaleByDifficulty(3, difficulty),
      vitality: scaleByDifficulty(6, difficulty),
      willpower: scaleByDifficulty(6, difficulty),
      planar: scaleByDifficulty(5, difficulty),
      control: scaleByDifficulty(6, difficulty),
      dexterity: scaleByDifficulty(12, difficulty),
      agility: scaleByDifficulty(10, difficulty),
      strength: scaleByDifficulty(7, difficulty),
      endurance: scaleByDifficulty(5, difficulty),
    }),
    battleStats: new CharacterBattleStats(),
    elements: new CharacterElements(),
    fame: new CharacterFame(),
    id: `${MOBEnum.goblinScout}_${Bun.randomUUIDv7()}`,
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

  character.traits = goblinTraits;
  character.race = RaceEnum.Goblin;

  character.activeSkills = [
    {
      id: RogueSkillId.Backstab,
      level: Math.min(
        Math.max(Math.floor(Math.random() * 3) + difficulty - 1, 1),
        5,
      ),
      exp: 0,
    },
    {
      id: MobSkillId.PanicSlash,
      level: Math.min(
        Math.max(Math.floor(Math.random() * 3) + difficulty - 1, 1),
        5,
      ),
      exp: 0,
    },
    {
      id: MobSkillId.Shriek,
      level: Math.min(
        Math.max(Math.floor(Math.random() * 3) + difficulty - 1, 1),
        5,
      ),
      exp: 0,
    },
    {
      id: MobSkillId.ThrowPebble,
      level: Math.min(
        Math.max(Math.floor(Math.random() * 3) + difficulty - 1, 1),
        5,
      ),
      exp: 0,
    },
  ];

  character.conditionalSkills = [
    {
      id: RogueSkillId.RetreatDash,
      level: Math.min(
        Math.max(Math.floor(Math.random() * 3) + difficulty - 1, 1),
        5,
      ),
      exp: 0,
    },
    {
      id: MobSkillId.ThrowPebble,
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

  // Equip weapon and armor based on difficulty (direct equip for MOBs - no inventory needed)
  equipDirect(character, BladeId.Scimitar, CharacterEquipmentSlot.rightHand);
  equipDirect(character, BodyId.LeatherArmor, CharacterEquipmentSlot.body);

  // Register MOB in activeCharacterRegistry
  registerMOB(character);

  return character;
}

export function goblinWarrior(difficulty: 1 | 2 | 3 | 4 | 5) {
  const hp = scaleByDifficulty(30, difficulty);
  const mp = scaleByDifficulty(10, difficulty);
  const sp = scaleByDifficulty(20, difficulty);

  const character = new MOB({
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
    id: `${MOBEnum.goblinWarrior}_${Bun.randomUUIDv7()}`,
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

  character.traits = goblinTraits;
  character.race = RaceEnum.Goblin;

  character.activeSkills = [
    { id: WarriorSkillId.WarCry, level: randomSkillLevel(difficulty), exp: 0 },
    {
      id: WarriorSkillId.PowerStrike,
      level: randomSkillLevel(difficulty),
      exp: 0,
    },
  ];

  character.conditionalSkills = [
    {
      id: GuardianSkillId.ShieldUp,
      level: randomSkillLevel(difficulty),
      exp: 0,
    },
    {
      id: GuardianSkillId.HerosPose,
      level: randomSkillLevel(difficulty),
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

  // Equip weapon and armor based on difficulty (direct equip for MOBs - no inventory needed)
  const shieldId = difficulty > 3 ? ShieldId.Buckler : ShieldId.KiteShield;
  const swordId = difficulty > 3 ? SwordId.ShortSword : SwordId.LongSword;
  const armorId = difficulty > 3 ? BodyId.LeatherArmor : BodyId.ChainShirt;

  equipDirect(character, shieldId, CharacterEquipmentSlot.leftHand);
  equipDirect(character, swordId, CharacterEquipmentSlot.rightHand);
  equipDirect(character, armorId, CharacterEquipmentSlot.body);

  // Register MOB in activeCharacterRegistry
  registerMOB(character);

  return character;
}

export function goblinMage(difficulty: 1 | 2 | 3 | 4 | 5) {
  const hp = scaleByDifficulty(15, difficulty);
  const mp = scaleByDifficulty(35, difficulty);
  const sp = scaleByDifficulty(10, difficulty);

  const character = new MOB({
    actionSequence: defaultActionSequence(),
    alignment: new CharacterAlignment({}),
    artisans: new CharacterArtisans({}),
    attribute: makeAttribute({
      charisma: scaleByDifficulty(4, difficulty),
      luck: scaleByDifficulty(6, difficulty),
      intelligence: scaleByDifficulty(10, difficulty),
      leadership: scaleByDifficulty(3, difficulty),
      vitality: scaleByDifficulty(5, difficulty),
      willpower: scaleByDifficulty(7, difficulty),
      planar: scaleByDifficulty(10, difficulty),
      control: scaleByDifficulty(10, difficulty),
      dexterity: scaleByDifficulty(5, difficulty),
      agility: scaleByDifficulty(5, difficulty),
      strength: scaleByDifficulty(3, difficulty),
      endurance: scaleByDifficulty(4, difficulty),
    }),
    battleStats: new CharacterBattleStats(),
    elements: new CharacterElements(),
    fame: new CharacterFame(),
    id: `${MOBEnum.goblinMage}_${Bun.randomUUIDv7()}`,
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

  character.traits = goblinTraits;
  character.race = RaceEnum.Goblin;

  character.activeSkills = [
    {
      id:
        rollTwenty().total >= 10 ? MageSkillId.FireBall : MageSkillId.Backdraft,
      level: randomSkillLevel(difficulty),
      exp: 0,
    },
    {
      id: MageSkillId.BurningHand,
      level: randomSkillLevel(difficulty),
      exp: 0,
    },
    { id: MageSkillId.FireBolt, level: randomSkillLevel(difficulty), exp: 0 },
  ];

  character.conditionalSkills = [
    {
      id: MageSkillId.ArcaneShield,
      level: randomSkillLevel(difficulty),
      exp: 0,
    },
    { id: MageSkillId.ArcaneBolt, level: randomSkillLevel(difficulty), exp: 0 },
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

  equipDirect(
    character,
    rollTwenty().total >= 10 ? WandId.Wand : BookWId.Grimoire,
    CharacterEquipmentSlot.rightHand,
  );
  equipDirect(character, BodyId.MageRobe, CharacterEquipmentSlot.body);
  equipDirect(
    character,
    HeadWearId.ScholarCap,
    CharacterEquipmentSlot.headWear,
  );

  // Register MOB in activeCharacterRegistry
  registerMOB(character);

  return character;
}

export function goblinCleric(difficulty: 1 | 2 | 3 | 4 | 5) {
  const hp = scaleByDifficulty(20, difficulty);
  const mp = scaleByDifficulty(25, difficulty);
  const sp = scaleByDifficulty(15, difficulty);

  const character = new MOB({
    actionSequence: defaultActionSequence(),
    alignment: new CharacterAlignment({}),
    artisans: new CharacterArtisans({}),
    attribute: makeAttribute({
      charisma: scaleByDifficulty(6, difficulty),
      luck: scaleByDifficulty(5, difficulty),
      intelligence: scaleByDifficulty(7, difficulty),
      leadership: scaleByDifficulty(4, difficulty),
      vitality: scaleByDifficulty(7, difficulty),
      willpower: scaleByDifficulty(10, difficulty),
      planar: scaleByDifficulty(7, difficulty),
      control: scaleByDifficulty(6, difficulty),
      dexterity: scaleByDifficulty(4, difficulty),
      agility: scaleByDifficulty(4, difficulty),
      strength: scaleByDifficulty(5, difficulty),
      endurance: scaleByDifficulty(5, difficulty),
    }),
    battleStats: new CharacterBattleStats(),
    elements: new CharacterElements(),
    fame: new CharacterFame(),
    id: `${MOBEnum.goblinCleric}_${Bun.randomUUIDv7()}`,
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

  character.traits = goblinTraits;
  character.race = RaceEnum.Goblin;

  // Goblin Cleric skills - MendSpirit first (no cost, can always use to generate resources)
  character.activeSkills = [
    {
      id: ShamanSkillId.ChaoticBlessing,
      level: randomSkillLevel(difficulty),
      exp: 0,
    },
    {
      id: ShamanSkillId.HolyRattle,
      level: randomSkillLevel(difficulty),
      exp: 0,
    },
    { id: ShamanSkillId.HexOfRot, level: randomSkillLevel(difficulty), exp: 0 },
    {
      id: ShamanSkillId.MendSpirit,
      level: randomSkillLevel(difficulty),
      exp: 0,
    },
  ];

  // Equip weapon and armor based on difficulty
  equipDirect(
    character,
    rollTwenty().total >= 10 ? WandId.Wand : BookWId.Bible,
    CharacterEquipmentSlot.rightHand,
  );
  if (rollTwenty().total >= 10) {
    equipDirect(character, ShieldId.Buckler, CharacterEquipmentSlot.leftHand);
  }
  equipDirect(character, BodyId.LeatherArmor, CharacterEquipmentSlot.body);

  // Register MOB in activeCharacterRegistry
  registerMOB(character);

  return character;
}

export function goblinCaptain(difficulty: 1 | 2 | 3 | 4 | 5) {
  const hp = scaleByDifficulty(25, difficulty);
  const mp = scaleByDifficulty(10, difficulty);
  const sp = scaleByDifficulty(25, difficulty);

  const character = new MOB({
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
    id: `${MOBEnum.goblinCaptain}_${Bun.randomUUIDv7()}`,
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

  character.traits = goblinTraits;
  character.race = RaceEnum.Goblin;

  character.activeSkills = [
    {
      id: MobSkillId.Whip,
      level: randomSkillLevel(difficulty),
      exp: 0,
    },
    {
      id: MobSkillId.CommanderScream,
      level: randomSkillLevel(difficulty),
      exp: 0,
    },
    {
      id: MobSkillId.WorksYouMaggots,
      level: randomSkillLevel(difficulty),
      exp: 0,
    },
  ];

  // Equip weapon and armor based on difficulty
  equipDirect(
    character,
    StaffId.QuarterStaff,
    CharacterEquipmentSlot.rightHand,
  );
  equipDirect(character, BodyId.LeatherArmor, CharacterEquipmentSlot.body);
  equipDirect(
    character,
    HeadWearId.ScholarCap,
    CharacterEquipmentSlot.headWear,
  );

  // Skills will be added once commander and shout-type actions are defined
  
  // Register MOB in activeCharacterRegistry
  registerMOB(character);

  return character;
}
