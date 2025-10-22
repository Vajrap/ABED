import type { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import type { GameTimeInterface } from "src/InterFacesEnumsAndTypes/Time";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import type { Party } from "../Party/Party";
import type { Character } from "../Character/Character";
import { GameTime } from "src/Game/GameTime/GameTime";
import type { BattleType } from "./types";
import type { TurnResult } from "../Skill/types";

export class BattleReport {
  id: string;

  // === BATTLE CONTEXT ===
  battleType: BattleType;
  location: LocationsEnum;
  gameTime: GameTimeInterface;

  // === PARTIES INFO (for list view) ===
  partyA: PartySnapshot;
  partyB: PartySnapshot;
  winnerPartyId: string = ""; // "partyA" or "partyB"

  // === REWARDS (for list view) ===
  // Indexed by character ID
  rewards: Record<string, BattleRewards> = {};

  // === TURN-BY-TURN DATA (for detail view) ===
  turnResults: TurnResult[] = [];

  // === SUMMARY ===
  outcome: L10N = { en: "", th: "" }; // "Victory!", "Defeat...", "Draw"
  duration: number = 0; // battle duration in turns

  constructor(
    partyA: Party,
    partyB: Party,
    location: LocationsEnum,
    battleType: BattleType,
  ) {
    this.id = Bun.randomUUIDv7();
    this.battleType = battleType;
    this.location = location;
    this.gameTime = GameTime.getCurrentGameDateTime();
    this.partyA = new PartySnapshot(partyA);
    this.partyB = new PartySnapshot(partyB);
  }

  addTurnResult(turnResult: TurnResult) {
    this.turnResults.push(turnResult);
    this.duration++;
  }

  setOutcome(
    winnerPartyId: string,
    outcome: L10N,
    rewards: Record<string, BattleRewards>,
  ) {
    this.winnerPartyId = winnerPartyId;
    this.outcome = outcome;
    this.rewards = rewards;
  }
}

export interface BattleRewards {
  characterId: string;
  characterName: L10N;
  expGained: number;
  itemsLooted: {
    itemId: string;
    quantity: number;
  }[];
}

// ===========================
// PARTY SNAPSHOT
// ===========================
// Lightweight party info for the report list
export class PartySnapshot {
  partyId: string;
  leaderName: L10N;

  // All characters in this party (for portraits in list)
  members: PartyMemberSnapshot[];

  // Is this party controlled by players?
  hasPlayers: boolean;
  playerIds: string[]; // Character IDs that are players
  constructor(party: Party) {
    this.partyId = party.partyID;
    this.leaderName = party.leader.name;
    this.members = party.characters.map(
      (character) =>
        new PartyMemberSnapshot(character as Character, party.leader.id),
    );
    this.hasPlayers = party.characters.some(
      (character) => character !== "none" && character.isPlayer,
    );
    this.playerIds = party.characters
      .filter(
        (character): character is Character =>
          character !== "none" && character.isPlayer,
      )
      .map((character) => character.id);
  }
}

export class PartyMemberSnapshot {
  characterId: string;
  name: L10N;
  portrait: string;
  level: number;
  isDead: boolean; // Did they die in this battle?
  isLeader: boolean;
  constructor(character: Character, partyLeaderId: string) {
    this.characterId = character.id;
    this.name = character.name;
    this.portrait = character.portrait || "";
    this.level = character.level;
    this.isDead = character.vitals.isDead;
    this.isLeader = character.id === partyLeaderId;
  }
}
