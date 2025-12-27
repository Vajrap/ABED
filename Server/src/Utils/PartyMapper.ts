import type { Party } from "../Entity/Party/Party";
import type { PartyInterface } from "../InterFacesEnumsAndTypes/PartyInterface";
import { mapCharacterToInterface } from "./CharacterMapper";
import { travelManager } from "../Game/TravelManager";

export function mapPartyToInterface(party: Party): PartyInterface {
  // Map all 6 character slots to CharacterInterface or null
  const characters = party.characters.map(char => 
    char === "none" ? null : mapCharacterToInterface(char)
  );
  
  // Get travel destination from TravelingParty if party is traveling
  let travelDestination: string | undefined = undefined;
  if (party.isTraveling) {
    const travelingParty = travelManager.travelingParties.get(party.partyID);
    if (travelingParty && travelingParty.path.length > 0) {
      // Get the last location in the path (the destination)
      const destinationId = travelingParty.path[travelingParty.path.length - 1];
      if (destinationId) {
        travelDestination = destinationId;
      }
    }
  }
  
  return {
    id: party.partyID,
    partyID: party.partyID,
    location: party.location,
    isTraveling: party.isTraveling,
    travelDestination,
    characters,
    playerCharacterId: party.leader.id,
  };
}

