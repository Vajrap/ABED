import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MageSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { roll, rollTwenty } from "src/Utils/Dice";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { MageSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const arcaneBolt = new MageSkill({
  id: MageSkillId.ArcaneBolt,
  name: { en: "Arcane Bolt", th: "ลูกเวทมนตร์" },
  description: {
    text: {
      en: "Unleash a focused bolt of raw arcane energy.\nDeal <FORMULA> arcane damage.\n.Given self {5}1d2:1{/} <BuffArcaneCharge> stacks.",
      th: "ปล่อยลูกพลังงานเวทมนตร์ดิบ\nสร้างความเสียหายอาร์เคน <FORMULA>\nได้รับ <BuffArcaneCharge> สแตค {5}1d2:1{/}",
    },
    formula: {
      en: "({5}'1d8':'1d6'{/} + <PlanarMod>) × <SkillLevelMultiplier>",
      th: "({5}'1d8':'1d6'{/} + <PlanarMod>) × <SkillLevelMultiplier>",
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
    const baseDiceDamage = actor.roll({
      amount: 1,
      face: 6,
      stat: 'planar'
    })
    const totalDamage = Math.max(
      0,
      (baseDiceDamage) * skillLevelMultiplier(skillLevel),
    );
    const damageOutput = {
      damage: Math.floor(totalDamage),
      hit: actor.rollTwenty({ stat: 'control' }),
      crit: actor.rollTwenty({ stat: 'luck' }),
      type: DamageType.arcane,
      isMagic: true,
    };
    const totalDamageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    const arcaneCharge = skillLevel >= 5 ? actor.roll({ amount: 1, face: 2 }) : 1;

    buffsAndDebuffsRepository.arcaneCharge.appender(actor, { turnsAppending: arcaneCharge });

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


