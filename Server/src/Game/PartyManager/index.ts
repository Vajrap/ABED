import type { Party } from "../../Entity/Party/Party";

class PartyManager {
    parties: Party[];
    constructor(parties: Party[]) {
        this.parties = [];
    }

    getPartyByID(id: string): Party {
        const party = this.parties.find(p => p.partyID === id);
        if (!party) { throw new Error(`Party with ID ${id} not found`)}
        return party
    }

    addParty(party: Party) {
        this.parties.push(party);
    }

    removeParty(id: string) {
        this.parties = this.parties.filter(p => p.partyID !== id);
    }
}

export const partyManager = new PartyManager([]);