import type { Character } from "src/Database/Schema";
import { Item } from "../Item";
import type { ConsumableId } from "./index";

/**
 * Base class for all consumable items
 */
export class ItemConsumable extends Item {
  // Override to narrow type from ItemId to ConsumableId
  consume: (actor: Character) => void;
  declare id: ConsumableId;

  constructor(data: Item, consume: (actor: Character) => void) {
    super(data);
    this.consume = consume;
  }
}

