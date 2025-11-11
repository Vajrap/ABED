import { ItemResource } from "../Resource";
import type { OreId } from "../../index";

export class Ore extends ItemResource {
  declare id: OreId;
}
