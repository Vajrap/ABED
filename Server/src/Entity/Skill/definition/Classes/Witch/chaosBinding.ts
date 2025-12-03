/**
 * TODO: LORE ALIGNMENT - Character Creation Level 1
 * 
 * Current: "Hex Doll" - Uses abstract "voodoo doll" and "sympathetic link" concepts.
 * Planar energy should manifest in tangible ways (fireballs, wind slashes), not abstract
 * mystical connections.
 * 
 * Suggested Changes:
 * - Rename to "Chaos Binding" or "Chaos Tether" or "Chaos Brand"
 * - Description: "Channel chaos energy into target, creating a visible tether/brand that
 *   causes ongoing chaos damage" instead of voodoo doll
 * - Frame as tangible chaos energy physically binding/marking the target (visible effect)
 * - The chaos consumption already exists, emphasize the tangible manifestation
 * - Consider: "Chaos Brand" - physically brand target with visible chaos energy that
 *   causes ongoing damage (like a burn but with chaos element)
 */
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
import { roll } from "src/Utils/Dice";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { WitchSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const chaosBinding = new WitchSkill({
  id: WitchSkillId.ChaosBinding,
  name: {
    en: "Chaos Binding",
    th: "ตุ๊กตาสาป",
  },
  description: {
    text: {
      en: "Channel chaos energy into your enemy, creating a visible binding that causes ongoing corruption.\nDeal <FORMULA> dark damage immediately.\nTarget must [r]roll DC10 + <ControlMod> WILsave[/r] or get <DebuffHexed> for {5}'3':'2'{/} turns.\n{5}\nAlso applies <DebuffCursed> for 2 turns.{/}",
      th: "ควบคุมพลังงาน chaos เข้าสู่ศัตรู สร้างพันธะที่มองเห็นได้ที่ทำให้เกิดการเสื่อมสลายต่อเนื่อง\nสร้างความเสียหายมืด <FORMULA> ทันที\nเป้าหมายต้องทอย [r]WILsave DC10 + <ControlMod>[/r] หรือถูก <DebuffHexed> {5}'3':'2'{/} เทิร์น\n{5}\nยังเพิ่ม <DebuffCursed> 2 เทิร์นด้วย{/}",
    },
    formula: {
      en: "(1d4 + <INTmod>) × <SkillLevelMultiplier>",
      th: "(1d4 + <INTmod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 3,
    sp: 0,
    elements: [
      {
        element: "chaos",
        value: 1,
      },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "neutral",
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
          en: `${actor.name.en} tried to use Hex Doll but has no target`,
          th: `${actor.name.th} พยายามใช้ตุ๊กตาสาปแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Calculate immediate damage: 1d4 + INT mod * (1 + 0.1 * skill level)
    const intMod = statMod(actor.attribute.getTotal("intelligence"));
    const controlMod = statMod(actor.attribute.getTotal("control"));
    const levelMultiplier = skillLevelMultiplier(skillLevel);
    
    const baseDiceDamage = roll(1).d(4).total;
    const totalDamage = Math.max(0, Math.floor((baseDiceDamage + intMod) * levelMultiplier));

    const damageOutput = {
      damage: totalDamage,
      hit: 999, // Auto-hit
      crit: 0,
      type: DamageType.dark,
      isMagic: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // Check for hexed debuff (DC10 + control mod willpower save)
    let hexedMessage = "";
    const willpowerDC = 10 + controlMod;
    const willpowerSave = target.rollSave("willpower");
    
    if (willpowerSave < willpowerDC) {
      const hexedDuration = skillLevel >= 5 ? 3 : 2;
      buffsAndDebuffsRepository.hexed.appender(target, { turnsAppending: hexedDuration });
      hexedMessage = ` ${target.name.en} is hexed!`;
      
      // At level 5, also apply cursed debuff
      if (skillLevel >= 5) {
        buffsAndDebuffsRepository.cursed.appender(target, { turnsAppending: 2 });
        hexedMessage += ` ${target.name.en} is also cursed!`;
      }
    }

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Hex Doll", th: "ตุ๊กตาสาป" },
      damageResult,
    );

    return {
      content: {
        en: `${message.en}${hexedMessage}`,
        th: `${message.th}${hexedMessage ? ` ${target.name.th} ถูกสาป!` : ""}`,
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

