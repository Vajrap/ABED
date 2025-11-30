import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import type { Character } from "../Character/Character";

export interface AppenderOptions {
  /**
   * Number of turns to append (duration/stacks)
   */
  turnsAppending: number;
  /**
   * Whether this buff/debuff is permanent (e.g., from equipment)
   * Default: false
   */
  isPerm?: boolean;
  /**
   * Permanent counter value (for equipment-based counters)
   * Default: 0
   */
  permanentCounter?: number;
  /**
   * Universal counter value (for skill levels, mods, etc.)
   * Default: 0
   */
  universalCounter?: number;
}

export class BuffsAndDebuffsDef {
  constructor(
    public name: L10N, 
    public type: 'buff' | 'debuff', 
    public appender: (actor: Character, options: AppenderOptions) => L10N, 
    public resolver: (actor: Character) => { canAct: boolean; content: L10N }) {
  }
}

export class BuffDef extends BuffsAndDebuffsDef {
  constructor(data: {
    name: L10N, 
    appender: (actor: Character, options: AppenderOptions) => L10N, 
    resolver: (actor: Character) => { canAct: boolean; content: L10N }
  }) {
    super(data.name, 'buff', data.appender, data.resolver);
  }
}

export class DebuffDef extends BuffsAndDebuffsDef {
  constructor(data: {
    name: L10N, 
    appender: (actor: Character, options: AppenderOptions) => L10N, 
    resolver: (actor: Character) => { canAct: boolean; content: L10N }
  }) {
    super(data.name, 'debuff', data.appender, data.resolver);
  }
}