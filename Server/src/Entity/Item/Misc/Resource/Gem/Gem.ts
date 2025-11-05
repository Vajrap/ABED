import { ItemResource } from "../Resource";
import type { Item } from "../../../Item";
import type { GemId } from "../../index";

/**
 * Skin resource class
 */
export class Gem extends ItemResource {
  // Override to narrow type from ResourceId to SkinId
  declare id: GemId;

  constructor(data: Item) {
    super(data);
  }
}
