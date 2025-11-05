import { ConsumableId, FoodId, PotionId, UsableId } from ".";
import { ItemConsumable } from "./Consumable";
import { bread } from "./food";
import { healingPotion } from "./potion";
import { campKit } from "./useable";

export const consumableRepository: Record<ConsumableId, ItemConsumable> = {
  [PotionId.healingPotion]: healingPotion,
  [FoodId.bread]: bread,
  [UsableId.campKit]: campKit,
};
