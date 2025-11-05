import { ItemResource } from "../Resource";
import type { Item } from "../../../Item";
import type { PlankId } from "../../index";

/**
 * Skin resource class
 */
export class Plank extends ItemResource {
  // Override to narrow type from ResourceId to SkinId
  declare id: PlankId;

  constructor(data: Item) {
    super(data);
  }
}
