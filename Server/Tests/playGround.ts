import { Battle } from "src/Entity/Battle/Battle";
import { BattleType } from "src/Entity/Battle/types";
import { MOBs } from "src/Entity/Character/MOBs/enums";
import {
  goblinCleric,
  goblinMage,
  goblinScout,
  goblinWarrior,
} from "src/Entity/Character/MOBs/goblins";
import { activeCharacterRegistry } from "src/Entity/Character/repository";
import { locationRepository } from "src/Entity/Location/Location/repository";
import { Party } from "src/Entity/Party/Party";
import { PartyBehavior } from "src/Entity/Party/PartyBehavior";
import { GameTime } from "src/Game/GameTime/GameTime";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import {
  SwordId,
  DaggerId,
  HammerId,
  ShieldId,
} from "src/Entity/Item/Equipment/Weapon/type";
import { BodyId, HeadWearId } from "src/Entity/Item/Equipment/Armor/type";

// Party A: Team with Warrior (with rusted gear) and Mage
const warrior_A = goblinWarrior(3);
warrior_A.name = { en: "Warrior A", th: "Warrior A" };
warrior_A.equipments.rightHand = SwordId.LongSword;
warrior_A.equipments.leftHand = ShieldId.IronBucker;
warrior_A.equipments.body = BodyId.PoorLeatherArmor;
warrior_A.equipments.headWear = HeadWearId.TatteredCap;
warrior_A.position = 1;

const mage_A = goblinMage(3);
mage_A.name = { en: "Mage A", th: "Mage A" };
mage_A.equipments.body = BodyId.TatteredClothes;
mage_A.position = 4;

const partyA = new Party({
  leader: warrior_A,
  leaderId: warrior_A.id,
  behavior: new PartyBehavior(),
  characters: [warrior_A, mage_A],
  location: LocationsEnum.WaywardInn,
});

// Party B: Team with Scout and Cleric (both with rusted gear)
const scout_B = goblinScout(3);
scout_B.name = { en: "Scout B", th: "Scout B" };
scout_B.equipments.rightHand = DaggerId.IronStiletto;
scout_B.equipments.body = BodyId.TatteredClothes;
scout_B.position = 2;

const cleric_B = goblinCleric(3);
cleric_B.name = { en: "Cleric B", th: "Cleric B" };
cleric_B.equipments.rightHand = HammerId.IronMorningStar;
cleric_B.equipments.body = BodyId.PoorLeatherArmor;
cleric_B.equipments.headWear = HeadWearId.TatteredCap;
cleric_B.position = 3;

const partyB = new Party({
  leader: scout_B,
  leaderId: scout_B.id,
  behavior: new PartyBehavior(),
  characters: [scout_B, cleric_B],
  location: LocationsEnum.WaywardInn,
});

// Register all characters in the active registry so they can be found during battle
// (This handles MOBs and other characters that aren't NPCs or players)
activeCharacterRegistry[warrior_A.id] = warrior_A;
activeCharacterRegistry[mage_A.id] = mage_A;
activeCharacterRegistry[scout_B.id] = scout_B;
activeCharacterRegistry[cleric_B.id] = cleric_B;

console.log("Setting up battle: Warrior & Mage vs Scout & Cleric");
console.log(
  `${warrior_A.name.en} equipped with Rusted Iron Sword, Shield & Leather Armor!`,
);
console.log(`${mage_A.name.en} equipped with Tattered Clothes`);
console.log(
  `${scout_B.name.en} equipped with Rusted Iron Dagger & Tattered Clothes!`,
);
console.log(
  `${cleric_B.name.en} equipped with Rusted Iron Mace, Leather Armor & Cap!`,
);

const battle = new Battle(
  partyA,
  partyB,
  locationRepository[LocationsEnum.WaywardInn],
  GameTime,
  BattleType.Normal,
);

await battle.startBattle();
