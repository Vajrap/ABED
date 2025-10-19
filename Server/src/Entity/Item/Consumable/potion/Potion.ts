import { ItemConsumable } from "../Consumable";
import type { Item } from "../../Item";
import type { PotionId } from "../index";
import type { Character } from "src/Database/Schema";

/**
 * Potion base class
 */
export class Potion extends ItemConsumable {
  // Override to narrow type from ConsumableId to PotionId
  declare id: PotionId;
  
  constructor(data: Item, consume: (actor: Character) => void) {
    super(data, consume);
  }
}

