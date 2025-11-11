import { ItemResource } from "../Resource";
import type { WoodId } from "../../index";

export class Wood extends ItemResource {
  declare id: WoodId;
}

