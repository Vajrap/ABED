import { ConsumableId, FoodId, PotionId, UsableId } from ".";
import { ItemConsumable } from "./Consumable";
import { bread, coffee, driedFish, feast, fruit, herbSoup, honey, jerky, spicedTea, stew, wine } from "./food/definition";
import { healingPotion, manaPotion, staminaPotion } from "./potion/definition";
import { campKit } from "./useable";

export const consumableRepository: Record<ConsumableId, ItemConsumable> = {
  [FoodId.bread]: bread,
  [FoodId.jerky]: jerky,
  [FoodId.stew]: stew,
  [FoodId.wine]: wine,
  [FoodId.fruit]: fruit,
  [FoodId.feast]: feast,
  [FoodId.herbSoup]: herbSoup,
  [FoodId.driedFish]: driedFish,
  [FoodId.honey]: honey,
  [FoodId.spicedTea]: spicedTea,
  [FoodId.coffee]: coffee,
  [UsableId.campKit]: campKit,
  [PotionId.healingPotion]: healingPotion,
  [PotionId.manaPotion]: manaPotion,
  [PotionId.staminaPotion]: staminaPotion,
};
