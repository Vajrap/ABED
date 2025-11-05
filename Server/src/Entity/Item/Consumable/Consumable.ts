import { Character } from "src/Entity/Character/Character";
import { Item } from "../Item";
import type { ConsumableId } from "./index";

export class ItemConsumable extends Item {
  consume: (actor: Character) => void;
  declare id: ConsumableId;

  constructor(data: Item, consume: (actor: Character) => void) {
    super(data);
    this.consume = consume;
  }
}
