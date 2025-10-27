import { BuffsAndDebuffsEnum } from "./enum";
import { haste } from "./definitions/haste";
import { slow } from "./definitions/slow";
import type { BuffsAndDebuffsDef } from "./type";
import { hiding } from "./definitions/hiding";
import { taunt } from "./definitions/taunt";
import { dazed } from "./definitions/dazed";
import {fear} from "src/Entity/BuffsAndDebuffs/definitions/fear.ts";
import { defenseUp } from "./definitions/defenseUp";
import { burn } from "./definitions/burn";
import { arcaneShield } from "./definitions/arcaneShield";
import { retreat } from "./definitions/retreat";

export const buffsAndDebuffsRepository: Record<
  BuffsAndDebuffsEnum,
  BuffsAndDebuffsDef
> = {
  [BuffsAndDebuffsEnum.haste]: haste,
  [BuffsAndDebuffsEnum.slow]: slow,
  [BuffsAndDebuffsEnum.hiding]: hiding,
  [BuffsAndDebuffsEnum.taunt]: taunt,
  [BuffsAndDebuffsEnum.dazed]: dazed,
  [BuffsAndDebuffsEnum.fear]: fear,
  [BuffsAndDebuffsEnum.defenseUp]: defenseUp,
  [BuffsAndDebuffsEnum.burn]: burn,
  [BuffsAndDebuffsEnum.arcaneShield]: arcaneShield,
  [BuffsAndDebuffsEnum.retreat]: retreat,
};
