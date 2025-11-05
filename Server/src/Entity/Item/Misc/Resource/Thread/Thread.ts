import { ItemResource } from "../Resource";
import type { Item } from "../../../Item";
import type { ThreadId } from "../../index";

/**
 * Skin resource class
 */
export class Thread extends ItemResource {
  // Override to narrow type from ResourceId to SkinId
  declare id: ThreadId;

  constructor(data: Item) {
    super(data);
  }
}
