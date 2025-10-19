import { Item } from "../Item";
import type { MiscItemId } from "./index";

/**
 * Base class for miscellaneous items
 */
export class ItemMisc extends Item {
  // Override to narrow type from ItemId to MiscItemId
  declare id: MiscItemId;
}
