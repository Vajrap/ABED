import { ItemResource } from "../Resource";
import type { ThreadId } from "../../index";

export class Thread extends ItemResource {
  declare id: ThreadId;
}
