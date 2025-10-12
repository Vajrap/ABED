import type { Party } from "../Entity/Party/Party";
import type { PartyInterface } from "../InterFacesEnumsAndTypes/PartyInterface";
import { mapCharacterToInterface } from "./CharacterMapper";

export function mapPartyToInterface(party: Party): PartyInterface {
  // Map all 6 character slots to CharacterInterface or null
  const characters = party.characters.map(char => 
    char === "none" ? null : mapCharacterToInterface(char)
  );
  
  return {
    id: party.partyID,
    partyID: party.partyID,
    location: party.location,
    isTraveling: party.isTraveling,
    characters,
    playerCharacterId: party.leader.id,
  };
}

