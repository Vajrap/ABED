/**
 * TODO: LORE ALIGNMENT - Character Creation Level 1
 * 
 * Current: "Hex of Rot" - Uses abstract "restless spirits" and "hex" concepts. Planar energy
 * should manifest in tangible ways, not abstract spirit summoning.
 * 
 * Suggested Changes:
 * - Rename to "Decay Strike" or "Rotting Touch" or "Chaos Decay"
 * - Description: "Channel chaos/earth energy to cause visible decay/rot on target" instead
 *   of abstract "restless spirits"
 * - Frame as tangible decay/rot effect (visible rotting, decay spreading) rather than
 *   spirit-based hex
 * - The chaos consumption already exists, emphasize tangible manifestation of decay
 * - Consider: "Decay Strike" - physically cause visible decay/rot on target with chaos/earth
 *   energy (like flesh rotting, armor rusting - tangible effects)
 */
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ShamanSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { ShamanSkill } from "./index";
import { skillLevelMultiplier } from "src/Utils/skillScaling";

export const hexOfRot = new ShamanSkill({
  id: ShamanSkillId.HexOfRot,
  name: {
    en: "Hex of Rot",
    th: "คำสาปเน่าเปื่อย",
  },
  description: {
    text: {
      en: "Channel chaos energy to cause visible decay and rot on your enemy.\nDeal <FORMULA> chaos damage.\nTarget must [r]roll DC10 + <ControlMod> WILsave[/r] or get <DebuffHexed> for 2 turns.",
        th: "ควบคุมพลังงาน chaos เพื่อทำให้เกิดการเน่าเปื่อยที่มองเห็นได้บนศัตรู\nสร้างความเสียหาย chaos <FORMULA>\nเป้าหมายต้องทอย [r]WILsave DC10 + <ControlMod>[/r] หรือถูก <DebuffHexed> เป็นเวลา 2 เทิร์น",
      },
    formula: {
      en: "1d4 + <PlanarMod> × <SkillLevelMultiplier>",
      th: "1d4 + <PlanarMod> × <SkillLevelMultiplier>",
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
  ) => {
    const target = getTarget(actor, actorParty, targetParty, "enemy").one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to cast Hex of Rot but has no target`,
          th: `${actor.name.th} พยายามใช้คำสาปเน่าเปื่อยแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Calculate damage
    const controlMod = statMod(actor.attribute.getTotal("control"));
    // Damage dice - should not get bless/curse
    const damageRoll = actor.roll({ amount: 1, face: 4, stat: "planar", applyBlessCurse: false });
    const totalDamage = damageRoll * skillLevelMultiplier(skillLevel);

    const damageOutput = {
      damage: Math.floor(totalDamage),
      hit: 999, // Auto-hit spell
      crit: 0,
      type: DamageType.chaos,
      isMagic: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // Check for hex debuff (DC10 + control mod willpower save)
    let hexMessage = "";
    const hexDC = 10 + controlMod;
    const willpowerSave = target.rollSave("willpower");
    if (willpowerSave < hexDC) {
      // Target fails save - apply Hexed debuff for 2 turns
      buffsAndDebuffsRepository.hexed.appender(target, { turnsAppending: 2 });
      hexMessage = ` ${target.name.en} was hexed!`;
    } else {
      hexMessage = ` ${target.name.en} resisted the hex!`;
    }

    const damageText = damageResult.isHit
      ? `dealing ${damageResult.actualDamage} ${damageResult.damageType} damage`
      : "but it was resisted";

    return {
      content: {
        en: `${actor.name.en} cast Hex of Rot on ${target.name.en}, ${damageText}.${hexMessage}`,
        th: `${actor.name.th} ใช้คำสาปเน่าเปื่อยกับ ${target.name.th}, ${damageResult.isHit ? `สร้างความเสียหาย ${damageResult.actualDamage} หน่วย` : "แต่ถูกต้านทาน"}.${hexMessage}`,
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

