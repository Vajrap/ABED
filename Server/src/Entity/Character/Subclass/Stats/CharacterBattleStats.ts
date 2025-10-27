import {
  BATTLE_STAT_KEYS,
  type BattleStatKey,
} from "src/InterFacesEnumsAndTypes/Enums.ts";
import { CharacterStatArchetype, StatBlock } from "./CharacterStatArchetype";

export class CharacterBattleStats extends CharacterStatArchetype<BattleStatKey> {
  constructor(initial?: Partial<Record<BattleStatKey, Partial<StatBlock>>>) {
    super(BATTLE_STAT_KEYS, initial, 0);
  }
}
