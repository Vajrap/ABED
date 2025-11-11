import { ItemConsumable } from "../Consumable";
import type { Item } from "../../Item";
import { PotionId } from "../index";
import { Character } from "src/Entity/Character/Character";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";

/**
 * Potion base class
 */
export class Potion extends ItemConsumable {
  // Override to narrow type from ConsumableId to PotionId
  declare id: PotionId;
  constructor(data: Item, public consume: (actor: Character) => void) {
    super(data);
  }
}
