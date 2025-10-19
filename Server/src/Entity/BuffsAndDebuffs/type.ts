import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import type { Character } from "../Character/Character";

export type BuffsAndDebuffsDef = {
  name: L10N;
  appender: (
    actor: Character,
    value: number,
    isPerm: boolean,
    permValue: number,
  ) => L10N;
  resolver: (actor: Character) => { canAct: boolean; content: L10N };
};
