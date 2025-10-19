import { ItemResource } from "../Resource";
import type { Item } from "../../../Item";
import type { SkinId } from "../../index";

/**
 * Skin resource class
 */
export class Skin extends ItemResource {
  // Override to narrow type from ResourceId to SkinId
  declare id: SkinId;
  
  constructor(data: Item) {
    super(data);
  }
}

