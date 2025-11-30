import { Battle } from "src/Entity/Battle/Battle";
import { BattleType } from "src/Entity/Battle/types";
import {
  goblinCleric,
  goblinMage,
  goblinScout,
  goblinWarrior,
  goblinCaptain,
} from "src/Entity/Character/MOBs/goblins";
import {
  humanWarrior,
  humanMage,
  humanCleric,
  humanPaladin,
  humanWarlock,
  humanBarbarian,
  humanSorcerer,
  humanRogue,
  humanDruid,
  humanGuardian,
} from "src/Entity/Character/MOBs/Humanoid/humans";
import {
  elvenWarrior,
  elvenMage,
  elvenCleric,
  elvenPaladin,
  elvenWarlock,
  elvenBarbarian,
  elvenSorcerer,
  elvenRogue,
  elvenDruid,
} from "src/Entity/Character/MOBs/Humanoid/elves";
import {
  orcWarrior,
  orcBarbarian,
  orcPaladin,
  orcWarlock,
} from "src/Entity/Character/MOBs/Humanoid/orcs";
import {
  halflingRogue,
  halflingCleric,
  halflingPaladin,
} from "src/Entity/Character/MOBs/Humanoid/halflings";
import {
  dwarfPaladin,
  dwarfWarrior,
  dwarfCleric,
  dwarfBarbarian,
} from "src/Entity/Character/MOBs/Humanoid/dwarfs";
import { activeCharacterRegistry } from "src/Entity/Character/repository";
import { Character } from "src/Entity/Character/Character";
import { locationRepository } from "src/Entity/Location/Location/repository";
import { Party } from "src/Entity/Party/Party";
import { PartyBehavior } from "src/Entity/Party/PartyBehavior";
import { GameTime } from "src/Game/GameTime/GameTime";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import type { SkillId } from "src/Entity/Skill/enums";
import type { CharacterSkillObject } from "src/Entity/Character/Character";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { makeAttribute, makeProficiencies, scaleByDifficulty } from "src/Entity/Character/MOBs/helpers";
import { equipMOB } from "src/Entity/Character/MOBs/equipmentHelpers";
import { RACE_ATTRIBUTES } from "src/Entity/Character/RaceAttributes";
import { RaceEnum, CharacterType, ClassEnum } from "src/InterFacesEnumsAndTypes/Enums";
import { CharacterAlignment } from "src/Entity/Character/Subclass/Alignment/CharacterAlignment";
import { CharacterArtisans } from "src/Entity/Character/Subclass/Stats/CharacterArtisans";
import { CharacterBattleStats } from "src/Entity/Character/Subclass/Stats/CharacterBattleStats";
import { CharacterElements } from "src/Entity/Character/Subclass/Stats/CharacterElements";
import { CharacterFame } from "src/Entity/Character/Subclass/Fame/CharacterFame";
import { CharacterNeeds } from "src/Entity/Character/Subclass/Needs/CharacterNeeds";
import { CharacterVitals, Vital } from "src/Entity/Character/Subclass/Vitals/CharacterVitals";
import { defaultActionSequence } from "src/Entity/Character/Subclass/Action/CharacterAction";
import { DeckCondition } from "src/Entity/Character/Subclass/DeckCondition/DeckCondition";
import { defaultSaveRoll } from "src/Utils/CharacterDefaultSaveRoll";
import {
  MonkSkillId,
  DuelistSkillId,
  WitchSkillId,
  InquisitorSkillId,
  ScholarSkillId,
  SpellBladeSkillId,
  MysticSkillId,
  ShamanSkillId,
  KnightSkillId,
  GuardianSkillId,
} from "src/Entity/Skill/enums";

// Helper function to create a character of any class
function createCharacterOfClass(
  className: ClassEnum,
  race: RaceEnum,
  difficulty: 1 | 2 | 3 | 4 | 5 = 3,
  nameEn: string,
  nameTh: string,
): Character {
  const baseAttrs = RACE_ATTRIBUTES[race].attributes;
  
  // Default stats - will be customized per class
  let hp = scaleByDifficulty(20, difficulty);
  let mp = scaleByDifficulty(10, difficulty);
  let sp = scaleByDifficulty(30, difficulty);
  
  const attrMods: Record<string, number> = {};
  const proficiencies: Record<string, number> = {};
  const activeSkills: CharacterSkillObject[] = [];
  
  // Customize based on class
  switch (className) {
    case ClassEnum.Monk:
      hp = scaleByDifficulty(22, difficulty);
      mp = scaleByDifficulty(8, difficulty);
      sp = scaleByDifficulty(35, difficulty);
      Object.assign(attrMods, {
        strength: 2, dexterity: 3, agility: 2, endurance: 2, willpower: 1, control: 1
      });
      Object.assign(proficiencies, {
        bareHand: 10, dagger: 3, sword: 4, blade: 5, staff: 3
      });
      activeSkills.push({ id: MonkSkillId.PalmStrike as SkillId, level: difficulty as any, exp: 0 });
      activeSkills.push({ id: MonkSkillId.FlurryOfBlows as SkillId, level: Math.max(1, difficulty - 1) as any, exp: 0 });
      break;
      
    case ClassEnum.Duelist:
      hp = scaleByDifficulty(20, difficulty);
      mp = scaleByDifficulty(8, difficulty);
      sp = scaleByDifficulty(35, difficulty);
      Object.assign(attrMods, {
        dexterity: 3, control: 2, agility: 2, strength: 1, intelligence: 1
      });
      Object.assign(proficiencies, {
        blade: 10, sword: 8, dagger: 6, bareHand: 4
      });
      activeSkills.push({ id: DuelistSkillId.PreciseStrike as SkillId, level: difficulty as any, exp: 0 });
      activeSkills.push({ id: DuelistSkillId.DuelingStance as SkillId, level: Math.max(1, difficulty - 1) as any, exp: 0 });
      break;
      
    case ClassEnum.Witch:
      hp = scaleByDifficulty(18, difficulty);
      mp = scaleByDifficulty(25, difficulty);
      sp = scaleByDifficulty(15, difficulty);
      Object.assign(attrMods, {
        intelligence: 3, control: 3, planar: 2, willpower: 1
      });
      Object.assign(proficiencies, {
        wand: 8, staff: 6, book: 5, orb: 4
      });
      activeSkills.push({ id: WitchSkillId.PoisonDart as SkillId, level: difficulty as any, exp: 0 });
      activeSkills.push({ id: WitchSkillId.ChaosBrand as SkillId, level: Math.max(1, difficulty - 1) as any, exp: 0 });
      break;
      
    case ClassEnum.Inquisitor:
      hp = scaleByDifficulty(20, difficulty);
      mp = scaleByDifficulty(20, difficulty);
      sp = scaleByDifficulty(20, difficulty);
      Object.assign(attrMods, {
        willpower: 3, planar: 2, control: 2, strength: 1
      });
      Object.assign(proficiencies, {
        sword: 7, blade: 6, staff: 5, book: 4, wand: 4
      });
      activeSkills.push({ id: InquisitorSkillId.RadiantSmite as SkillId, level: difficulty as any, exp: 0 });
      activeSkills.push({ id: InquisitorSkillId.ExposeWeakness as SkillId, level: Math.max(1, difficulty - 1) as any, exp: 0 });
      break;
      
    case ClassEnum.Scholar:
      hp = scaleByDifficulty(18, difficulty);
      mp = scaleByDifficulty(15, difficulty);
      sp = scaleByDifficulty(25, difficulty);
      Object.assign(attrMods, {
        intelligence: 3, control: 2, planar: 1, dexterity: 1
      });
      Object.assign(proficiencies, {
        book: 8, staff: 5, wand: 4, orb: 3
      });
      activeSkills.push({ id: ScholarSkillId.Analyze as SkillId, level: difficulty as any, exp: 0 });
      activeSkills.push({ id: ScholarSkillId.DisruptPattern as SkillId, level: Math.max(1, difficulty - 1) as any, exp: 0 });
      break;
      
    case ClassEnum.SpellBlade:
      hp = scaleByDifficulty(20, difficulty);
      mp = scaleByDifficulty(18, difficulty);
      sp = scaleByDifficulty(25, difficulty);
      Object.assign(attrMods, {
        planar: 2, dexterity: 2, control: 2, strength: 1, intelligence: 1
      });
      Object.assign(proficiencies, {
        blade: 8, sword: 7, staff: 5, wand: 4
      });
      activeSkills.push({ id: SpellBladeSkillId.PlanarEdge as SkillId, level: difficulty as any, exp: 0 });
      activeSkills.push({ id: SpellBladeSkillId.WindSlash as SkillId, level: Math.max(1, difficulty - 1) as any, exp: 0 });
      break;
      
    case ClassEnum.Mystic:
      hp = scaleByDifficulty(18, difficulty);
      mp = scaleByDifficulty(22, difficulty);
      sp = scaleByDifficulty(20, difficulty);
      Object.assign(attrMods, {
        planar: 3, control: 2, willpower: 2, intelligence: 1
      });
      Object.assign(proficiencies, {
        staff: 7, wand: 6, orb: 5, book: 4
      });
      activeSkills.push({ id: MysticSkillId.MistStep as SkillId, level: difficulty as any, exp: 0 });
      activeSkills.push({ id: MysticSkillId.InnerVeil as SkillId, level: Math.max(1, difficulty - 1) as any, exp: 0 });
      break;
      
    case ClassEnum.Shaman:
      hp = scaleByDifficulty(20, difficulty);
      mp = scaleByDifficulty(20, difficulty);
      sp = scaleByDifficulty(20, difficulty);
      Object.assign(attrMods, {
        willpower: 2, planar: 2, control: 2, vitality: 1
      });
      Object.assign(proficiencies, {
        staff: 7, wand: 5, book: 4, orb: 3
      });
      activeSkills.push({ id: ShamanSkillId.ChaoticBlessing as SkillId, level: difficulty as any, exp: 0 });
      activeSkills.push({ id: ShamanSkillId.HexOfRot as SkillId, level: Math.max(1, difficulty - 1) as any, exp: 0 });
      break;
      
    case ClassEnum.Knight:
      hp = scaleByDifficulty(25, difficulty);
      mp = scaleByDifficulty(5, difficulty);
      sp = scaleByDifficulty(35, difficulty);
      Object.assign(attrMods, {
        strength: 3, endurance: 2, vitality: 2, leadership: 1, willpower: 1
      });
      Object.assign(proficiencies, {
        sword: 10, blade: 8, spear: 7, shield: 9, axe: 6, hammer: 6
      });
      activeSkills.push({ id: KnightSkillId.PrecisionThrust as SkillId, level: difficulty as any, exp: 0 });
      activeSkills.push({ id: KnightSkillId.AdvancingPace as SkillId, level: Math.max(1, difficulty - 1) as any, exp: 0 });
      break;
      
    case ClassEnum.Guardian:
      hp = scaleByDifficulty(28, difficulty);
      mp = scaleByDifficulty(5, difficulty);
      sp = scaleByDifficulty(30, difficulty);
      Object.assign(attrMods, {
        endurance: 3, vitality: 3, strength: 2, willpower: 1
      });
      Object.assign(proficiencies, {
        shield: 10, sword: 8, hammer: 7, axe: 6, spear: 5
      });
      activeSkills.push({ id: GuardianSkillId.Taunt as SkillId, level: difficulty as any, exp: 0 });
      activeSkills.push({ id: GuardianSkillId.ShieldUp as SkillId, level: Math.max(1, difficulty - 1) as any, exp: 0 });
      break;
      
    default:
      // Fallback for unknown classes
      Object.assign(attrMods, { strength: 1, dexterity: 1 });
      Object.assign(proficiencies, { sword: 5, bareHand: 3 });
  }
  
  const character = new Character({
    actionSequence: defaultActionSequence(),
    alignment: new CharacterAlignment({}),
    artisans: new CharacterArtisans({}),
    attribute: makeAttribute({
      charisma: scaleByDifficulty(baseAttrs.charisma + (attrMods.charisma || 0), difficulty),
      luck: scaleByDifficulty(baseAttrs.luck + (attrMods.luck || 0), difficulty),
      intelligence: scaleByDifficulty(baseAttrs.intelligence + (attrMods.intelligence || 0), difficulty),
      leadership: scaleByDifficulty(baseAttrs.leadership + (attrMods.leadership || 0), difficulty),
      vitality: scaleByDifficulty(baseAttrs.vitality + (attrMods.vitality || 0), difficulty),
      willpower: scaleByDifficulty(baseAttrs.willpower + (attrMods.willpower || 0), difficulty),
      planar: scaleByDifficulty(baseAttrs.planar + (attrMods.planar || 0), difficulty),
      control: scaleByDifficulty(baseAttrs.control + (attrMods.control || 0), difficulty),
      dexterity: scaleByDifficulty(baseAttrs.dexterity + (attrMods.dexterity || 0), difficulty),
      agility: scaleByDifficulty(baseAttrs.agility + (attrMods.agility || 0), difficulty),
      strength: scaleByDifficulty(baseAttrs.strength + (attrMods.strength || 0), difficulty),
      endurance: scaleByDifficulty(baseAttrs.endurance + (attrMods.endurance || 0), difficulty),
    }),
    battleStats: new CharacterBattleStats(),
    elements: new CharacterElements(),
    fame: new CharacterFame(),
    id: `${className}_${race}_${Bun.randomUUIDv7()}`,
    level: difficulty,
    name: { en: nameEn, th: nameTh },
    needs: new CharacterNeeds(),
    proficiencies: makeProficiencies(proficiencies),
    saveRolls: defaultSaveRoll,
    type: CharacterType.humanoid,
    vitals: new CharacterVitals({
      hp: new Vital({ base: hp }),
      mp: new Vital({ base: mp }),
      sp: new Vital({ base: sp }),
    }),
  });
  
  character.race = race;
  character.activeSkills = activeSkills;
  character.conditionalSkills = [];
  character.conditionalSkillsCondition = new DeckCondition({});
  
  // Equip based on class
  equipMOB(character, className, difficulty);
  
  return character;
}

// ============================================================================
// PARTY A: Goblins (Enemy Party)
// ============================================================================
const goblinCaptain_A = goblinCaptain(3);
goblinCaptain_A.name = { en: "Goblin Captain", th: "ก๊อปลินกัปตัน" };
goblinCaptain_A.position = 0;

const goblinWarrior_A = goblinWarrior(3);
goblinWarrior_A.name = { en: "Goblin Warrior A", th: "ก๊อปลินนักรบ" };
goblinWarrior_A.position = 1;

const goblinWarrior_B = goblinWarrior(3);
goblinWarrior_B.name = { en: "Goblin Warrior B", th: "ก๊อปลินนักรบ" };
goblinWarrior_B.position = 2;

const goblinScout_A = goblinScout(3);
goblinScout_A.name = { en: "Goblin Scout", th: "ก๊อปลินสายลับ" };
goblinScout_A.position = 3;

const goblinMage_A = goblinMage(3);
goblinMage_A.name = { en: "Goblin Mage", th: "ก๊อปลินนักเวทย์" };
goblinMage_A.position = 4;

const goblinCleric_A = goblinCleric(3);
goblinCleric_A.name = { en: "Goblin Cleric", th: "ก๊อปลินนักบวช" };
goblinCleric_A.position = 5;

const partyA = new Party({
  leader: goblinCaptain_A,
  leaderId: goblinCaptain_A.id,
  behavior: new PartyBehavior(),
  characters: [
    goblinCaptain_A,
    goblinWarrior_A,
    goblinWarrior_B,
    goblinScout_A,
    goblinMage_A,
    goblinCleric_A
  ],
  location: LocationsEnum.WaywardInn,
});

// ============================================================================
// PARTY B: Melee & Support Focus (6 classes)
// ============================================================================
const warrior_B = humanWarrior(3);
warrior_B.name = { en: "Human Warrior", th: "นักรบมนุษย์" };
warrior_B.position = 0;

const paladin_B = humanPaladin(3);
paladin_B.name = { en: "Human Paladin", th: "พาลาดินมนุษย์" };
paladin_B.position = 1;

const knight_B = createCharacterOfClass(ClassEnum.Knight, RaceEnum.Dwarf, 3, "Dwarf Knight", "อัศวินคนแคระ");
knight_B.position = 2;

const guardian_B = humanGuardian(3)
guardian_B.name = { en: "Human Guardian", th: "ผู้พิทักษ์มนุษย์" };
guardian_B.position = 3;

const cleric_B = humanCleric(3);
cleric_B.name = { en: "Human Cleric", th: "นักบวชมนุษย์" };
cleric_B.position = 4;
cleric_B.planarAptitude.inc(100);

const druid_B = humanDruid(3);
druid_B.name = { en: "Human Druid", th: "ดรูอิดมนุษย์" };
druid_B.position = 5;

const partyB = new Party({
  leader: warrior_B,
  leaderId: warrior_B.id,
  behavior: new PartyBehavior(),
  characters: [warrior_B, paladin_B, knight_B, guardian_B, cleric_B, druid_B],
  location: LocationsEnum.WaywardInn,
});

// ============================================================================
// PARTY C: Magic & Hybrid Focus (6 classes)
// ============================================================================
const mage_C = humanMage(3);
mage_C.name = { en: "Human Mage", th: "นักเวทย์มนุษย์" };
mage_C.position = 0;

const warlock_C = humanWarlock(3);
warlock_C.name = { en: "Human Warlock", th: "วาร์ล็อคมนุษย์" };
warlock_C.position = 1;

const witch_C = createCharacterOfClass(ClassEnum.Witch, RaceEnum.Elven, 3, "Elven Witch", "แม่มดเอลฟ์");
witch_C.position = 2;

const inquisitor_C = createCharacterOfClass(ClassEnum.Inquisitor, RaceEnum.Human, 3, "Human Inquisitor", "นักสืบมนุษย์");
inquisitor_C.position = 3;

const spellBlade_C = createCharacterOfClass(ClassEnum.SpellBlade, RaceEnum.Elven, 3, "Elven SpellBlade", "ดาบเวทย์เอลฟ์");
spellBlade_C.position = 4;

const mystic_C = createCharacterOfClass(ClassEnum.Mystic, RaceEnum.Halfling, 3, "Halfling Mystic", "นักลึกลับฮาล์ฟลิ่ง");
mystic_C.position = 5;

const partyC = new Party({
  leader: mage_C,
  leaderId: mage_C.id,
  behavior: new PartyBehavior(),
  characters: [mage_C, warlock_C, witch_C, inquisitor_C, spellBlade_C, mystic_C],
  location: LocationsEnum.WaywardInn,
});

// ============================================================================
// PARTY D: Agile & Utility Focus (6 classes)
// ============================================================================
const rogue_D = humanRogue(3);
rogue_D.name = { en: "Human Rogue", th: "โจรมนุษย์" };
rogue_D.position = 0;

const duelist_D = createCharacterOfClass(ClassEnum.Duelist, RaceEnum.Elven, 3, "Elven Duelist", "นักดวลเอลฟ์");
duelist_D.position = 1;

const monk_D = createCharacterOfClass(ClassEnum.Monk, RaceEnum.Halfling, 3, "Halfling Monk", "นักพรตฮาล์ฟลิ่ง");
monk_D.position = 2;

const barbarian_D = humanBarbarian(3);
barbarian_D.name = { en: "Human Barbarian", th: "นักรบป่าเถื่อนมนุษย์" };
barbarian_D.position = 3;

const shaman_D = createCharacterOfClass(ClassEnum.Shaman, RaceEnum.Orc, 3, "Orc Shaman", "ชามานออร์ค");
shaman_D.position = 4;

const scholar_D = createCharacterOfClass(ClassEnum.Scholar, RaceEnum.Human, 3, "Human Scholar", "นักวิชาการมนุษย์");
scholar_D.position = 5;

const partyD = new Party({
  leader: rogue_D,
  leaderId: rogue_D.id,
  behavior: new PartyBehavior(),
  characters: [rogue_D, duelist_D, monk_D, barbarian_D, shaman_D, scholar_D],
  location: LocationsEnum.WaywardInn,
});

// Register all characters
const allCharacters = [
  // Party A (Goblins)
  goblinCaptain_A, goblinWarrior_A, goblinWarrior_B, goblinScout_A, goblinMage_A, goblinCleric_A,
  // Party B
  warrior_B, paladin_B, knight_B, guardian_B, cleric_B, druid_B,
  // Party C
  mage_C, warlock_C, witch_C, inquisitor_C, spellBlade_C, mystic_C,
  // Party D
  rogue_D, duelist_D, monk_D, barbarian_D, shaman_D, scholar_D,
];

allCharacters.forEach(char => {
  activeCharacterRegistry[char.id] = char;
});

// ============================================================================
// BATTLE SETUP - Uncomment the party you want to test against goblins
// ============================================================================
// To test different parties, comment/uncomment the battle lines below:

// Test Party B (Melee & Support) against Goblins
const battle = new Battle(
  partyA,  // Goblins (enemy)
  partyB,  // Melee & Support: Warrior, Paladin, Knight, Guardian, Cleric, Druid
  locationRepository[LocationsEnum.WaywardInn],
  GameTime,
  BattleType.Normal,
);

// Uncomment to test Party C (Magic & Hybrid) instead:
// const battle = new Battle(
//   partyA,  // Goblins (enemy)
//   partyC,  // Magic & Hybrid: Mage, Warlock, Witch, Inquisitor, SpellBlade, Mystic
//   locationRepository[LocationsEnum.WaywardInn],
//   GameTime,
//   BattleType.Normal,
// );

// Uncomment to test Party D (Agile & Utility) instead:
// const battle = new Battle(
//   partyA,  // Goblins (enemy)
//   partyD,  // Agile & Utility: Rogue, Duelist, Monk, Barbarian, Shaman, Scholar
//   locationRepository[LocationsEnum.WaywardInn],
//   GameTime,
//   BattleType.Normal,
// );

console.log("\n" + "=".repeat(60));
console.log("BATTLE: Goblins vs Selected Party");
console.log("=".repeat(60));
console.log("Party A (Goblins): Captain, 2x Warrior, Scout, Mage, Cleric");
console.log("Testing Party:", battle.partyB.getCharacters().map(c => c.name.en).join(", "));
console.log("=".repeat(60) + "\n");

await battle.startBattle();

// Display battle statistics
console.log("\n" + "=".repeat(60));
console.log("BATTLE STATISTICS SUMMARY");
console.log("=".repeat(60));
console.log(battle.battleStatistics.getSummary());
console.log("=".repeat(60) + "\n");
