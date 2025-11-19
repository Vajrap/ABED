import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import type { Character } from "../Character/Character";

export class BuffsAndDebuffsDef {
  constructor(
    public name: L10N, 
    public type: 'buff' | 'debuff', 
    public appender: (actor: Character, value: number, isPerm: boolean, permValue: number) => L10N, 
    public resolver: (actor: Character) => { canAct: boolean; content: L10N }) {
  }
}

export class BuffDef extends BuffsAndDebuffsDef {
  constructor(data: {
    name: L10N, 
    appender: (actor: Character, value: number, isPerm: boolean, permValue: number) => L10N, 
    resolver: (actor: Character) => { canAct: boolean; content: L10N }
  }) {
    super(data.name, 'buff', data.appender, data.resolver);
  }
}

export class DebuffDef extends BuffsAndDebuffsDef {
  constructor(data: {
    name: L10N, 
    appender: (actor: Character, value: number, isPerm: boolean, permValue: number) => L10N, 
    resolver: (actor: Character) => { canAct: boolean; content: L10N }
  }) {
    super(data.name, 'debuff', data.appender, data.resolver);
  }
}