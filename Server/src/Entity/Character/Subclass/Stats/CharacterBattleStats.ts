import {
  BATTLE_STAT_KEYS,
  type BattleStatKey,
} from "../../../../InterFacesEnumsAndTypes/Enums";
import { CharacterStatArchetype, StatBlock } from "./CharacterStatArchetype";

export class CharacterBattleStats extends CharacterStatArchetype<BattleStatKey> {
  constructor(initial?: Partial<Record<BattleStatKey, Partial<StatBlock>>>) {
    super(BATTLE_STAT_KEYS, initial);
  }

  static fromJSON(data: any): CharacterBattleStats {
    return new CharacterBattleStats(data);
  }
}
