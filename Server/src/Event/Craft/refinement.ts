import {
  RefinementBlueprint,
} from "src/Entity/Blueprint/Blueprint";
import { Character } from "src/Entity/Character/Character";
import { itemRepository } from "src/Entity/Repository/Item";
import { rollTwenty } from "src/Utils/Dice";
import type { CraftResult } from "./types";

function validateResources(
  actor: Character,
  blueprint: RefinementBlueprint
): boolean {
  for (const [itemId, quantityNeeded] of blueprint.needed.entries()) {
    const actorItem = actor.inventory.get(itemId) || 0;
    if (actorItem < quantityNeeded) {
      return false;
    }
  }
  return true;
}

function consumeResources(
  actor: Character,
  blueprint: RefinementBlueprint
): void {
  for (const [itemId, quantityNeeded] of blueprint.needed.entries()) {
    const currentQuantity = actor.inventory.get(itemId) || 0;
    const newQuantity = currentQuantity - quantityNeeded;

    if (newQuantity <= 0) {
      actor.inventory.delete(itemId);
    } else {
      actor.inventory.set(itemId, newQuantity);
    }
  }
}

export function craftRefinement(
  actor: Character,
  blueprint: RefinementBlueprint,
): CraftResult {
  if (!validateResources(actor, blueprint)) {
    return { reason: "Not enough resources" };
  }

  consumeResources(actor, blueprint);

  const diceRoll = rollTwenty().total;
  if (diceRoll === 1) {
    return { reason: "Craft attempt failed" };
  }

  // Standard refinement (planks, leather, thread, cloth)
  if (diceRoll === 20) {
    const resultItem = blueprint.resultItemId
      ? itemRepository[blueprint.resultItemId]
      : undefined;
    if (!resultItem) {
      return { reason: "Invalid result item" };
    }
    return { item: resultItem, amount: 2 };
  }

  const resultItem = blueprint.resultItemId
    ? itemRepository[blueprint.resultItemId]
    : undefined;

  if (!resultItem) {
    return { reason: "Invalid result item" };
  }

  return { item: resultItem, amount: 1 };
}

