import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MageSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { MageSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const arcaneBolt = new MageSkill({
  id: MageSkillId.ArcaneBolt,
  name: { en: "Arcane Bolt", th: "ลูกเวทมนตร์" },
  description: {
    text: {
      en: "Launch a bolt of arcane energy. Deal <FORMULA> arcane damage to a target. Gain 1 Arcane Charge stack.",
      th: "ยิงลูกพลังงานอาร์เคน สร้างความเสียหายอาร์เคน <FORMULA> ให้เป้าหมาย ได้รับ 1 สแต็ก Arcane Charge",
    },
    formula: {
      en: "(1d6 + <PlanarMod>) × <SkillLevelMultiplier>",
      th: "(1d6 + <PlanarMod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: { hp: 0, mp: 2, sp: 0, elements: [] },
  produce: {
    hp: 0, mp: 0, sp: 0,
    elements: [{ element: "neutral", min: 1, max: 1 }],
  },
  exec: (actor: Character, _ally: Character[], enemies: Character[], skillLevel: number, location: LocationsEnum) => {
    const target = getTarget(actor, _ally, enemies, "enemy").one();
    if (!target) {
      return {
        content: { en: `${actor.name.en} tried to cast Arcane Bolt but has no target`, th: `${actor.name.th} พยายามใช้ลูกเวทมนตร์แต่ไม่พบเป้าหมาย` },
        actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
        targets: [],
      };
    }
    // Calculate damage: (1d6 + planar mod) × skill level multiplier
    const levelScalar = skillLevelMultiplier(skillLevel);
    const totalDamage = Math.max(0, actor.roll({ amount: 1, face: 6, stat: "planar" }) * levelScalar);
    
    const damageOutput = {
      damage: totalDamage,
      hit: actor.rollTwenty({}),
      crit: actor.rollTwenty({}),
      type: DamageType.arcane,
      isMagic: true,
    };
    const totalDamageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    
    // Always gain 1 Arcane Charge stack
    buffsAndDebuffsRepository.arcaneCharge.appender(actor, { turnsAppending: 1 });

    const turnResult: TurnResult = {
      content: {
        en: `${buildCombatMessage(actor, target, { en: `Arcane Bolt`, th: `ลูกเวทมนตร์` }, totalDamageResult).en}`,
        th: `${buildCombatMessage(actor, target, { en: `Arcane Bolt`, th: `ลูกเวทมนตร์` }, totalDamageResult).th}`,
      },
      actor: { actorId: actor.id, effect: [ActorEffect.ArcaneOne] },
      targets: [{ actorId: target.id, effect: [TargetEffect.ArcaneOne] }],
    };
    return turnResult;
  },
});


