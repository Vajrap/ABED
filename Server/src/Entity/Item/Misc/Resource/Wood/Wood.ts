import { ItemResource } from "../Resource";
import type { Item } from "../../../Item";
import type { WoodId } from "../../index";

/**
 * Wood resource class
 */
export class Wood extends ItemResource {
  // Override to narrow type from ResourceId to WoodId
  declare id: WoodId;
  
  constructor(data: Item) {
    super(data);
  }
}

