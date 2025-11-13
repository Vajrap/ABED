import { GemCuttingBlueprint, IngotBlueprint, RefinementBlueprint } from "src/Entity/Blueprint/Blueprint";
import { Character } from "src/Entity/Character/Character";


export function validateResources(actor: Character, blueprint: IngotBlueprint | RefinementBlueprint | GemCuttingBlueprint): boolean {
    for (const [itemId, quantityNeeded] of blueprint.needed.entries()) {
        const actorItem = actor.inventory.get(itemId) || 0;
        if (actorItem < quantityNeeded) {
            return false;
        }
    }

    return true;
}

