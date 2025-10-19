import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import type { Character } from "../Character/Character";
import { BuffsAndDebuffsEnum } from "./enum";
import { haste } from "./definitions/haste";
import { slow } from "./definitions/slow";

export const buffsAndDebuffsRepository: Record<
  BuffsAndDebuffsEnum,
  {
    name: L10N;
    appender: (
      actor: Character,
      value: number,
      isPerm: boolean,
      permValue: number,
    ) => void;
    resolver: (actor: Character) => boolean;
  }
> = {
  [BuffsAndDebuffsEnum.haste]: haste,
  [BuffsAndDebuffsEnum.slow]: slow,
};
