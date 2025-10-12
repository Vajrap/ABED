import type { CharacterInterface } from "./CharacterInterface";

export interface PartyInterface {
  id: string;
  partyID: string;
  location: string;
  isTraveling: boolean;
  characters: (CharacterInterface | null)[]; // Full character data for all 6 slots
  playerCharacterId: string;
}

