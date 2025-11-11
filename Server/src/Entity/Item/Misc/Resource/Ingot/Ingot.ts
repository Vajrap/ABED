import { ItemResource } from "../Resource";
import type { IngotId } from "../../index";

export class Ingot extends ItemResource {
  declare id: IngotId;
}
