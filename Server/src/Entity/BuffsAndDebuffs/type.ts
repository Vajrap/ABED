import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import type { Character } from "../Character/Character";

export interface AppenderOptions {
  turnsAppending: number;
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
    public resolver: (actor: Character) => { canAct: boolean; content: L10N },
    public description: L10N,
    public formula?: string
  ) {
  }
}

export class BuffDef extends BuffsAndDebuffsDef {
  constructor(data: {
    name: L10N, 
    appender: (actor: Character, options: AppenderOptions) => L10N, 
    resolver: (actor: Character) => { canAct: boolean; content: L10N },
    description: L10N,
    formula?: string
  }) {
    super(data.name, 'buff', data.appender, data.resolver, data.description, data.formula);
  }
}

export class DebuffDef extends BuffsAndDebuffsDef {
  constructor(data: {
    name: L10N, 
    appender: (actor: Character, options: AppenderOptions) => L10N, 
    resolver: (actor: Character) => { canAct: boolean; content: L10N },
    description: L10N,
    formula?: string
  }) {
    super(data.name, 'debuff', data.appender, data.resolver, data.description, data.formula);
  }
}