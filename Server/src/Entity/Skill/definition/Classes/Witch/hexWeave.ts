import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { WitchSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { WitchSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const hexWeave = new WitchSkill({
  id: WitchSkillId.HexWeave,
  name: {
    en: "Hex Weave",
    th: "ถักทอคำสาป",
  },
  description: {
    text: {
      en: "Weave a hex into your attack, marking the target.\nDeal <FORMULA> true damage.\nApply <DebuffHexMark> to target for 2 turns.\nBonus: If target already has HexMark, also apply <DebuffCursed> for 1 turn.",
      th: "ถักทอคำสาปเข้าไปในการโจมตีของคุณ ทำเครื่องหมายเป้าหมาย\nสร้างความเสียหายแท้ <FORMULA>\nเพิ่ม <DebuffHexMark> ให้เป้าหมายเป็นเวลา 2 เทิร์น\nโบนัส: หากเป้าหมายมี HexMark อยู่แล้ว เพิ่ม <DebuffCursed> 1 เทิร์นด้วย",
    },
    formula: {
      en: "1d3 + <PlanarMod>",
      th: "1d3 + <PlanarMod>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  isFallback: true, // HexWeave: no elemental resources (produces chaos, but doesn't consume any), no buff requirement
  consume: {
    hp: 0,
    mp: 2,
    sp: 0,
    elements: [],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "chaos",
        min: 1,
        max: 1,
      },
    ],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    const target = getTarget(actor, actorParty, targetParty, "enemy").one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to use Hex Weave but has no target`,
          th: `${actor.name.th} พยายามใช้ถักทอคำสาปแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Calculate damage: 1d3 + planar mod true damage
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    // Damage dice - should not get bless/curse
    const baseDiceDamage = actor.roll({ amount: 1, face: 3, stat: "planar", applyBlessCurse: false });
    const totalDamage = Math.max(0, baseDiceDamage + planarMod);

    // True damage, but still use hit/crit rolls for consistency
    const damageOutput = {
      damage: totalDamage,
      hit: actor.rollTwenty({stat: 'willpower'}), // Curse/dark magic uses WIL for hit
      crit: actor.rollTwenty({stat: 'luck'}),
      type: DamageType.arcane,
      isMagic: true,
      trueDamage: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // Check if target already has HexMark BEFORE applying new one (for bonus)
    const hadHexMarkBefore = target.buffsAndDebuffs.debuffs.entry.has(DebuffEnum.hexMark);
    
    // Apply HexMark debuff for 2 turns
    buffsAndDebuffsRepository.hexMark.appender(target, { turnsAppending: 2 });
    let bonusMessage = "";

    // Bonus: If target already has HexMark, also apply Cursed debuff for 1 turn
    if (hadHexMarkBefore) {
      buffsAndDebuffsRepository.cursed.appender(target, { turnsAppending: 1 });
      bonusMessage = ` ${target.name.en} is also cursed!`;
    }

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Hex Weave", th: "ถักทอคำสาป" },
      damageResult,
    );

    return {
      content: {
        en: `${message.en} ${target.name.en} is marked with a hex!${bonusMessage}`,
        th: `${message.th} ${target.name.th} ถูกทำเครื่องหมายด้วยคำสาป!${bonusMessage ? ` ${target.name.th} ถูกสาปด้วย!` : ""}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: [
        {
          actorId: target.id,
          effect: [TargetEffect.TestSkill],
        },
      ],
    };
  },
});

