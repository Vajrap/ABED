import { ItemConsumable } from "../Consumable";
import type { Item } from "../../Item";
import type { FoodId } from "../index";
import type { Character } from "src/Database/Schema";

/**
 * Food base class
 */
export class Food extends ItemConsumable {
  // Override to narrow type from ConsumableId to FoodId
  declare id: FoodId;
  
  constructor(data: Item, consume: (actor: Character) => void) {
    super(data, consume);
  }
}

