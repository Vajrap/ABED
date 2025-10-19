import { Item } from "../../Item";
import type { ResourceId } from "../index";

/**
 * Base class for resource items (crafting materials)
 */
export class ItemResource extends Item {
  // Override to narrow type from ItemId to ResourceId
  declare id: ResourceId;
}

