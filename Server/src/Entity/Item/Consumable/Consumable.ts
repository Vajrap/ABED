import { Item } from "../Item";
import type { ConsumableId } from "./index";

export class ItemConsumable extends Item {
  declare id: ConsumableId;

  constructor(data: Item) {
    super(data);
  }
}
