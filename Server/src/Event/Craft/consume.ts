import { GemCuttingBlueprint, IngotBlueprint, RefinementBlueprint } from "src/Entity/Blueprint/Blueprint";
import { Character } from "src/Entity/Character/Character";

export function consumeResources(
    actor: Character,
    blueprint: IngotBlueprint | RefinementBlueprint | GemCuttingBlueprint,
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