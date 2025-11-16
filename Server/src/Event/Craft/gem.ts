import { GemCuttingBlueprint } from "src/Entity/Blueprint/Blueprint";
import { Character } from "src/Entity/Character/Character";
import { rollTwenty } from "src/Utils/Dice";
import { validateResources } from "./validations";
import { consumeResources } from "./consume";
import { statMod } from "src/Utils/statMod";
import { Gem, GemId } from "src/Entity/Item";
import { itemRepository } from "src/Entity/Item/repository";

export function craftGem(
    actor: Character,
    blueprint: GemCuttingBlueprint
  ) {
    if (!validateResources(actor, blueprint)) {
      return { reason: "Not enough resources" };
    }
  
    consumeResources(actor, blueprint);
  
    const diceRoll = rollTwenty().total;
    if (diceRoll === 1) {
      return { reason: "Craft attempt failed" };
    }
    
    const diceWithModifier = diceRoll + statMod(actor.artisans.getTotal('jewelry'));
    let gemFamily = gemFamilyPools[Math.floor(Math.random() * gemFamilyPools.length)];
    if (!gemFamily) { gemFamily = 'Quartz'; }
    let gemQuality = 'Flawed';
  
    if (diceWithModifier < 10) {
      return { reason: "Craft attempt failed" };
    } else if (diceRoll <= 12) {
      gemQuality = 'Flawed';
    } else if (diceRoll <= 14) {
      gemQuality = 'Polished';
    } else if (diceRoll <= 18) {
      gemQuality = 'Brilliant';
    } else {
      gemQuality = 'Perfect';
    }
  
    const gemId = (GemId as any)[gemQuality + gemFamily] as GemId;
  
    return { item: itemRepository[gemId] as Gem, amount: 1 };
  }
  
  const gemFamilyPools = [
    'Quartz',
    'Diamond',
    'Amethyst',
    'Ruby',
    'Onyx',
    'Sapphire',
    'Topaz',
  ];