import { IngotBlueprint } from "src/Entity/Blueprint/Blueprint";
import { Character } from "src/Entity/Character/Character";
import type { CraftFail } from "./types";
import { rollTwenty } from "src/Utils/Dice";
import { difficultyTable } from "./difficultyTable";
import { validateResources } from "./validations";
import { itemRepository } from "src/Entity/Item/repository";
import { Ingot } from "src/Entity/Item";

export function craftIngot(actor: Character, blueprint: IngotBlueprint): {item: Ingot, amount: number} | CraftFail {
    if (!validateResources(actor, blueprint)) {
        return { reason: "Not enough resources" };
    }
    
    for (const [itemId, quantityNeeded] of blueprint.needed.entries()) {
        const currentQuantity = actor.inventory.get(itemId) || 0;
        const newQuantity = currentQuantity - quantityNeeded;
        if (newQuantity <= 0) {
            actor.inventory.delete(itemId);
        } else {
            actor.inventory.set(itemId, newQuantity);
        }
    }

    const diceRoll = rollTwenty().total;
    const diceWithModifier = diceRoll + actor.artisans.getTotal(blueprint.artisanType);
    const resultItem = itemRepository[blueprint.resultItemId];

    if (diceRoll === 1) {
        return { reason: "Craft attempt failed" };
    }

    if (diceRoll === 20) {
        return { item: resultItem as Ingot, amount: 2 };
    }

    if (diceWithModifier < difficultyTable[blueprint.tier]) {
        return { reason: "Craft attempt failed" };
    }

    return { item: resultItem as Ingot, amount: 1 };
}

