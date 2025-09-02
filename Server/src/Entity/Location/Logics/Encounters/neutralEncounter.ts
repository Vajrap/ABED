import type { Party } from "../../../Party/Party";
import { PartyType } from "../../../Party/PartyBehavior";
import { isHostile } from "./isHostle";

export function handleNeutralEncounter(partyA: Party, partyB: Party) {
  const typeA = partyA.behavior.type;
  const typeB = partyB.behavior.type;

  const isScholar = (type: PartyType) =>
    [PartyType.scholar, PartyType.hermit].includes(type);
  const isMilitary = (type: PartyType) =>
    [PartyType.knight, PartyType.soldier, PartyType.nobleRetinue].includes(
      type,
    );
  const isMerchant = (type: PartyType) => type === PartyType.merchant;
  const isRogue = (type: PartyType) =>
    [
      PartyType.rogue,
      PartyType.bandit,
      PartyType.criminal,
      PartyType.raider,
    ].includes(type);
  const isNoble = (type: PartyType) => type === PartyType.nobleRetinue;
  const isReligious = (type: PartyType) =>
    [PartyType.pilgrim, PartyType.hermit].includes(type);
  const isLabor = (type: PartyType) =>
    [PartyType.peasant, PartyType.artisan].includes(type);

  if (
    (isMerchant(typeA) && !isHostile(partyB)) ||
    (isMerchant(typeB) && !isHostile(partyA))
  ) {
    // executeTradeEvent(partyA, partyB);
    // exchangeKnowledge(partyA, partyB);
  }

  if (isScholar(typeA) && isScholar(typeB)) {
    // exchangeKnowledge(partyA, partyB, "scholarly");
  }

  if (isMilitary(typeA) && isMilitary(typeB)) {
    // exchangeKnowledge(partyA, partyB, "military");
  }

  if (isNoble(typeA) && isMilitary(typeB)) {
    // exchangeKnowledge(partyA, partyB, "military");
  }

  if (isMilitary(typeA) && isNoble(typeB)) {
    // exchangeKnowledge(partyA, partyB, "military");
  }

  if (isRogue(typeA) && isRogue(typeB)) {
    // exchangeKnowledge(partyA, partyB, "underworld");
  }

  if (isReligious(typeA) && isReligious(typeB)) {
    // exchangeKnowledge(partyA, partyB, "religious");
  }

  if (isLabor(typeA) && isLabor(typeB)) {
    // exchangeKnowledge(partyA, partyB, "folk");
  }

  // updateRelation(partyA, partyB, Dice.roll(DiceEnum.OneD2).sum);
  return;
}
