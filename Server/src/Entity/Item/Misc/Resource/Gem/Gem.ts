import { ItemResource } from "../Resource";
import type { GemId } from "../../index";

export class Gem extends ItemResource {
  declare id: GemId;
}
