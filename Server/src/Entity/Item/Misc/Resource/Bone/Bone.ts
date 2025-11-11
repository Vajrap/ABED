import { ItemResource } from "../Resource";
import type { BoneId } from "../../index";

/**
 * Bone resource class
 */
export class Bone extends ItemResource {
  declare id: BoneId;
}

