import { ItemResource } from "../Resource";
import type { RawGemId } from "../../index";

export class RawGem extends ItemResource {
  declare id: RawGemId;
}

