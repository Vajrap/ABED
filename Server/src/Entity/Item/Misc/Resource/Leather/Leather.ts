import { ItemResource } from "../Resource";
import type { Item } from "../../../Item";
import type { LeatherId } from "../../index";

/**
 * Skin resource class
 */
export class Leather extends ItemResource {
  // Override to narrow type from ResourceId to SkinId
  declare id: LeatherId;

  constructor(data: Item) {
    super(data);
  }
}
