import { BookWId } from "../type";
import type { Weapon } from "../Weapon";
import { bible } from "./definition/bible";
import { codex } from "./definition/codex";
import { grimoire } from "./definition/grimoire";

export const tomeRepository: Record<BookWId, Weapon> = {
  [BookWId.Bible]: bible,
  [BookWId.Codex]: codex,
  [BookWId.Grimoire]: grimoire,
};

