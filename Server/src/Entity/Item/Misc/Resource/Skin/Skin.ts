import { ItemResource } from "../Resource";
import type { SkinId } from "../../index";

/**
 * Skin resource class
 */
export class Skin extends ItemResource {
  declare id: SkinId;
}

