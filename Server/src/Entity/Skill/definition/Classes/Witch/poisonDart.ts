// TODO: Add Poison Debuff
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
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { WitchSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const poisonDart = new WitchSkill({
  id: WitchSkillId.PoisonDart,
  name: {
    en: "Poison Dart",
    th: "ลูกบอลคำสาป",
  },
  description: {
    text: {
      en: "Launch a small magical dart tipped with potent poison that seeps through all defenses.\nDeal <FORMULA> [r]true poison damage[/r] that bypasses all defenses.\nTarget must [r]roll DC6 + <ControlMod> ENDsave[/r] or get <DebuffPoisoned> for {5}'3':'2'{/} turns.",
      th: "ขว้างลูกดอกเวทมนตร์เล็กๆ ที่มีปลายอาบยาพิษที่ซึมผ่านการป้องกันทั้งหมด\nสร้างความเสียหายพิษแท้ <FORMULA> [r]ที่ผ่านการป้องกันทั้งหมด[/r]\nเป้าหมายต้องทอย [r]ENDsave DC6 + <ControlMod>[/r] หรือถูก <DebuffPoisoned> {5}'3':'2'{/} เทิร์น",
    },
    formula: {
      en: "({5}'1d4':'1d3'{/} + <INTmod>) × <SkillLevelMultiplier>",
      th: "({5}'1d4':'1d3'{/} + <INTmod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  isFallback: true, // PoisonDart: no elemental resources (produces chaos, but doesn't consume any), no buff requirement
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
          en: `${actor.name.en} tried to cast Curse Bolt but has no target`,
          th: `${actor.name.th} พยายามใช้ลูกบอลคำสาปแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Calculate damage: 1d3 + planar mod × skill level multiplier true arcane damage
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const controlMod = statMod(actor.attribute.getTotal("control"));
    const levelMultiplier = skillLevelMultiplier(skillLevel);
    
    // Damage dice - should not get bless/curse
    const baseDiceDamage = actor.roll({ amount: 1, face: 3, stat: "planar", applyBlessCurse: false });
    const totalDamage = Math.max(0, Math.floor((baseDiceDamage + planarMod) * levelMultiplier));

    // True damage still needs hit/crit rolls for consistency (though true damage bypasses mitigation)
    const damageOutput = {
      damage: totalDamage,
      hit: actor.rollTwenty({stat: 'willpower'}), // Curse/dark magic uses WIL for hit
      crit: actor.rollTwenty({stat: 'luck'}),
      type: DamageType.arcane,
      isMagic: true,
      trueDamage: true, // TRUE DAMAGE - bypasses all mitigation
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // Check for cursed debuff (DC8 + CONTROL mod WIL save)
    let cursedMessage = "";
    const willpowerDC = 8 + controlMod;
    const willpowerSave = target.rollSave("willpower");
    
    if (willpowerSave < willpowerDC) {
      // Enum says Cursed debuff for 2 turns (no level 5 upgrade mentioned)
      const cursedDuration = 2;
      buffsAndDebuffsRepository.cursed.appender(target, { turnsAppending: cursedDuration });
      cursedMessage = ` ${target.name.en} is cursed!`;
    }

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Curse Bolt", th: "ลูกบอลคำสาป" },
      damageResult,
    );

    return {
      content: {
        en: `${message.en}${cursedMessage}`,
        th: `${message.th}${cursedMessage ? ` ${target.name.th} ถูกสาป!` : ""}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: [
        {
          actorId: target.id,
          effect: [TargetEffect.ChaosOne],
        },
      ],
    };
  },
});

