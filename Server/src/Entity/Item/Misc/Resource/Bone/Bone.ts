import { ItemResource } from "../Resource";
import type { Item } from "../../../Item";
import type { BoneId } from "../../index";

/**
 * Bone resource class
 */
export class Bone extends ItemResource {
  // Override to narrow type from ResourceId to BoneId
  declare id: BoneId;
  
  constructor(data: Item) {
    super(data);
  }
}

