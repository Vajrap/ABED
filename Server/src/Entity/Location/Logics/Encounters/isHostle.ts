import type { Party } from "../../../Party/Party";
import { PartyType } from "../../../Party/PartyBehavior";

export function isHostile(party: Party): boolean {
  return [PartyType.bandit, PartyType.raider, PartyType.criminal].includes(
    party.behavior.type,
  );
}
