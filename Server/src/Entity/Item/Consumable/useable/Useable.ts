import { ItemConsumable } from "../Consumable";
import type { Item } from "../../Item";
import type { UsableId } from "../index";
import type { Character } from "src/Database/Schema";

/**
 * Useable item base class (e.g., camp kits, tools)
 */
export class Useable extends ItemConsumable {
  // Override to narrow type from ConsumableId to UsableId
  declare id: UsableId;
  
  constructor(data: Item, consume: (actor: Character) => void) {
    super(data, consume);
  }
}

