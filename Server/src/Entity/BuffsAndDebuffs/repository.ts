import { BuffEnum, DebuffEnum } from "./enum";
import { haste } from "./definitions/buffs/haste";
import { slow } from "./definitions/debuffs/slow";
import type { BuffDef, DebuffDef } from "./type";
import { hiding } from "./definitions/buffs/hiding";
import { taunt } from "./definitions/buffs/taunt";
import { dazed } from "./definitions/debuffs/dazed";
import { fear } from "src/Entity/BuffsAndDebuffs/definitions/debuffs/fear.ts";
import { defenseUp } from "./definitions/buffs/defenseUp";
import { burn } from "./definitions/debuffs/burn";
import { arcaneShield } from "./definitions/buffs/arcaneShield";
import { retreat } from "./definitions/buffs/retreat";
import { hexed } from "./definitions/debuffs/hexed";
import { spiritRattle } from "./definitions/buffs/spiritRattle";
import { slaveDriver } from "./definitions/buffs/slaveDriver";
import { cowardlyCharge } from "./definitions/buffs/cowardlyCharge";
import { bless } from "./definitions/buffs/bless";
import { planarAbsorption } from "./definitions/buffs/planarAbsorption";
import { reversalPalm } from "./definitions/buffs/reversalPalm";
import { innerVeil } from "./definitions/buffs/innerVeil";
import { cursed } from "./definitions/debuffs/cursed";
import { exposed } from "./definitions/debuffs/exposed";
import { bleed } from "./definitions/debuffs/bleed";
import { stun } from "./definitions/debuffs/stun";
import { warCry } from "./definitions/buffs/warCry";
import { edgeCharge } from "./definitions/buffs/edgeCharge";
import { spellParry } from "./definitions/buffs/spellParry";
import { rage } from "./definitions/buffs/rage";
import { advancingPace } from "./definitions/buffs/advancingPace";
import { aegisShield } from "./definitions/buffs/aegisShield";
import { aegisPulse } from "./definitions/buffs/aegisPulse";
import { regen } from "./definitions/buffs/regen";
import { parry } from "./definitions/buffs/parry";
import { duelingStance } from "./definitions/buffs/duelingStance";
import { curseMarkActive } from "./definitions/buffs/curseMarkActive";
import { charm } from "./definitions/buffs/charm";
import { exposeWeaknessActive } from "./definitions/buffs/exposeWeaknessActive";
import { entangled } from "./definitions/debuffs/entangled";
import { hexMark } from "./definitions/debuffs/hexMark";
import { disruptPattern } from "./definitions/debuffs/disruptPattern";
import { analyze } from "./definitions/debuffs/analyze";
import { healCooldown } from "./definitions/debuffs/healCooldown";
import { massHealCooldown } from "./definitions/debuffs/massHealCooldown";
import { mendSpiritCooldown } from "./definitions/debuffs/mendSpiritCooldown";

export const buffsRepository: Record<BuffEnum, BuffDef> = {
  [BuffEnum.haste]: haste,
  [BuffEnum.hiding]: hiding,
  [BuffEnum.taunt]: taunt,
  [BuffEnum.defenseUp]: defenseUp,
  [BuffEnum.arcaneShield]: arcaneShield,
  [BuffEnum.retreat]: retreat,
  [BuffEnum.spiritRattle]: spiritRattle,
  [BuffEnum.slaveDriver]: slaveDriver,
  [BuffEnum.cowardlyCharge]: cowardlyCharge,
  [BuffEnum.bless]: bless,
  [BuffEnum.planarAbsorption]: planarAbsorption,
  [BuffEnum.reversalPalm]: reversalPalm,
  [BuffEnum.innerVeil]: innerVeil,
  [BuffEnum.advancingPace]: advancingPace,
  [BuffEnum.warCry]: warCry,
  [BuffEnum.edgeCharge]: edgeCharge,
  [BuffEnum.spellParry]: spellParry,
  [BuffEnum.rage]: rage,
  [BuffEnum.aegisShield]: aegisShield,
  [BuffEnum.aegisPulse]: aegisPulse,
  [BuffEnum.regen]: regen,
  [BuffEnum.parry]: parry,
  [BuffEnum.duelingStance]: duelingStance,
  [BuffEnum.curseMarkActive]: curseMarkActive,
  [BuffEnum.charm]: charm,
  [BuffEnum.exposeWeaknessActive]: exposeWeaknessActive,
};

export const debuffsRepository: Record<DebuffEnum, DebuffDef> = {
  [DebuffEnum.slow]: slow,
  [DebuffEnum.dazed]: dazed,
  [DebuffEnum.fear]: fear,
  [DebuffEnum.burn]: burn,
  [DebuffEnum.hexed]: hexed,
  [DebuffEnum.cursed]: cursed,
  [DebuffEnum.exposed]: exposed,
  [DebuffEnum.bleed]: bleed,
  [DebuffEnum.stun]: stun,
  [DebuffEnum.entangled]: entangled,
  [DebuffEnum.hexMark]: hexMark,

  // Cooldown
  [DebuffEnum.disruptPattern]: disruptPattern,
  [DebuffEnum.analyze]: analyze,
  [DebuffEnum.healCooldown]: healCooldown,
  [DebuffEnum.massHealCooldown]: massHealCooldown,
  [DebuffEnum.mendSpiritCooldown]: mendSpiritCooldown,
};

export const buffsAndDebuffsRepository = {
  ...buffsRepository,
  ...debuffsRepository,
};
