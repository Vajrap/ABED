import { ItemResource } from "../Resource";
import type { Item } from "../../../Item";
import type { IngotId } from "../../index";

/**
 * Skin resource class
 */
export class Ingot extends ItemResource {
  // Override to narrow type from ResourceId to SkinId
  declare id: IngotId;

  constructor(data: Item) {
    super(data);
  }
}
