import { ItemResource } from "../Resource";
import type { ClothId } from "../../index";

export class Cloth extends ItemResource {
  declare id: ClothId;
}

