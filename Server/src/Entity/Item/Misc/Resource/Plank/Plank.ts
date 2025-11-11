import { ItemResource } from "../Resource";
import type { PlankId } from "../../index";

export class Plank extends ItemResource {
  declare id: PlankId;
}
