import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import type { Character } from "../Character/Character";
import { BuffsAndDebuffsEnum } from "./enum";
import { haste } from "./definitions/haste";
import { slow } from "./definitions/slow";
import type { BuffsAndDebuffsDef } from "./type";
import { hiding } from "./definitions/hiding";
import { taunt } from "./definitions/taunt";
import { dazed } from "./definitions/dazed";

export const buffsAndDebuffsRepository: Record<
  BuffsAndDebuffsEnum,
  BuffsAndDebuffsDef
> = {
  [BuffsAndDebuffsEnum.haste]: haste,
  [BuffsAndDebuffsEnum.slow]: slow,
  [BuffsAndDebuffsEnum.hiding]: hiding,
  [BuffsAndDebuffsEnum.taunt]: taunt,
  [BuffsAndDebuffsEnum.dazed]: dazed,
};
