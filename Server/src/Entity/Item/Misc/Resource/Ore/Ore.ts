import { ItemResource } from "../Resource";
import type { Item } from "../../../Item";
import type { OreId } from "../../index";

/**
 * Skin resource class
 */
export class Ore extends ItemResource {
  // Override to narrow type from ResourceId to SkinId
  declare id: OreId;

  constructor(data: Item) {
    super(data);
  }
}
