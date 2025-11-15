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
  humanRanger,
} from "src/Entity/Character/MOBs/Humanoid/humans";
import {
  elvenWarrior,
  elvenMage,
} from "src/Entity/Character/MOBs/Humanoid/elves";
import {
  orcWarrior,
  orcBarbarian,
} from "src/Entity/Character/MOBs/Humanoid/orcs";
import {
  halflingRogue,
  halflingCleric,
} from "src/Entity/Character/MOBs/Humanoid/halflings";
import {
  dwarfPaladin,
  dwarfWarrior,
} from "src/Entity/Character/MOBs/Humanoid/dwarfs";
import { activeCharacterRegistry } from "src/Entity/Character/repository";
import type { Character } from "src/Entity/Character/Character";
import { locationRepository } from "src/Entity/Location/Location/repository";
import { Party } from "src/Entity/Party/Party";
import { PartyBehavior } from "src/Entity/Party/PartyBehavior";
import { GameTime } from "src/Game/GameTime/GameTime";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";

// Party A: All Goblins
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

// Party B: Mixed Humanoid Races
const humanWarrior_B = humanWarrior(3);
humanWarrior_B.name = { en: "Human Warrior", th: "นักรบมนุษย์" };
humanWarrior_B.position = 0;

const orcBarbarian_B = orcBarbarian(3);
orcBarbarian_B.name = { en: "Orc Barbarian", th: "นักรบป่าเถื่อนออร์ค" };
orcBarbarian_B.position = 1;

const dwarfPaladin_B = dwarfPaladin(3);
dwarfPaladin_B.name = { en: "Dwarf Paladin", th: "พาลาดินคนแคระ" };
dwarfPaladin_B.position = 2;

const elvenMage_B = elvenMage(3);
elvenMage_B.name = { en: "Elven Mage", th: "นักเวทย์เอลฟ์" };
elvenMage_B.position = 3;

const halflingRogue_B = halflingRogue(3);
halflingRogue_B.name = { en: "Halfling Rogue", th: "โจรฮาล์ฟลิ่ง" };
halflingRogue_B.position = 4;

const humanRanger_B = humanRanger(3);
humanRanger_B.name = { en: "Human Ranger", th: "นักล่ามนุษย์" };
humanRanger_B.position = 5;

const partyB = new Party({
  leader: humanWarrior_B,
  leaderId: humanWarrior_B.id,
  behavior: new PartyBehavior(),
  characters: [
    humanWarrior_B,
    elvenMage_B,
    orcBarbarian_B,
    halflingRogue_B,
    dwarfPaladin_B,
    humanRanger_B,
  ],
  location: LocationsEnum.WaywardInn,
});

// Verify equipment is equipped (all humanoid MOBs should have equipment via equipMOB)
// This is just for verification - equipMOB should have already equipped items
const verifyEquipment = (char: Character, name: string) => {
  const weapon = char.getWeapon();
  const armor = char.equipments.body;
  if (!weapon || weapon.weaponType === "bareHand") {
    console.warn(`⚠️  ${name} has no weapon equipped (or bareHand)`);
  } else {
    console.log(`✅ ${name} equipped: ${weapon.name.en}`);
  }
  if (!armor) {
    console.warn(`⚠️  ${name} has no armor equipped`);
  } else {
    console.log(`✅ ${name} armored: ${armor}`);
  }
};


// Register all characters in the active registry so they can be found during battle
activeCharacterRegistry[goblinCaptain_A.id] = goblinCaptain_A;
activeCharacterRegistry[goblinWarrior_A.id] = goblinWarrior_A;
activeCharacterRegistry[goblinWarrior_B.id] = goblinWarrior_B;
activeCharacterRegistry[goblinScout_A.id] = goblinScout_A;
activeCharacterRegistry[goblinMage_A.id] = goblinMage_A;
activeCharacterRegistry[goblinCleric_A.id] = goblinCleric_A;

activeCharacterRegistry[humanWarrior_B.id] = humanWarrior_B;
activeCharacterRegistry[elvenMage_B.id] = elvenMage_B;
activeCharacterRegistry[orcBarbarian_B.id] = orcBarbarian_B;
activeCharacterRegistry[halflingRogue_B.id] = halflingRogue_B;
activeCharacterRegistry[dwarfPaladin_B.id] = dwarfPaladin_B;
activeCharacterRegistry[humanRanger_B.id] = humanRanger_B;

const battle = new Battle(
  partyA,
  partyB,
  locationRepository[LocationsEnum.WaywardInn],
  GameTime,
  BattleType.Normal,
);

await battle.startBattle();

// Access and display battle statistics
console.log("\n" + "=".repeat(50));
console.log("BATTLE STATISTICS SUMMARY");
console.log("=".repeat(50));
console.log(battle.battleStatistics.getSummary());
console.log("=".repeat(50) + "\n");

// // Verify Party A equipment
// verifyEquipment(goblinCaptain_A, "Goblin Captain");
// verifyEquipment(goblinWarrior_A, "Goblin Warrior A");
// verifyEquipment(goblinWarrior_B, "Goblin Warrior B");
// verifyEquipment(goblinScout_A, "Goblin Scout");
// verifyEquipment(goblinMage_A, "Goblin Mage");
// verifyEquipment(goblinCleric_A, "Goblin Cleric");

// // Verify Party B equipment
// verifyEquipment(humanWarrior_B, "Human Warrior");
// verifyEquipment(elvenMage_B, "Elven Mage");
// verifyEquipment(orcBarbarian_B, "Orc Barbarian");
// verifyEquipment(halflingRogue_B, "Halfling Rogue");
// verifyEquipment(dwarfPaladin_B, "Dwarf Paladin");
// verifyEquipment(humanRanger_B, "Human Ranger");
