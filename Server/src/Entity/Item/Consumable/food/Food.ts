import { FoodId } from "../index";
import { ItemConsumable } from "../Consumable";
import type { Item } from "../../Item";
import { Party } from "src/Entity/Party/Party";

export class Food extends ItemConsumable {
  declare id: FoodId;
  constructor(data: Item, public consume: (party: Party) => void) {
    super(data);
  }
}