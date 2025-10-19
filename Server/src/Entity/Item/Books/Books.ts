import { Item } from "../Item";
import type { BookId } from "./index";

/**
 * Base class for all book items
 */
export class ItemBook extends Item {
  // Override to narrow type from ItemId to BookId
  declare id: BookId;
}

