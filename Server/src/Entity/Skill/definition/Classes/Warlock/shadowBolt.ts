/**
 * TODO: LORE ALIGNMENT - Character Creation Level 1
 * 
 * Current: "Shadow Bolt" - Uses "shadow energy" and "dark damage" which doesn't align with
 * the elemental system (order, chaos, fire, earth, water, wind).
 * 
 * Suggested Changes:
 * - Rename to "Chaos Bolt" or "Chaos Strike"
 * - Change damage type from "dark" to "chaos" (or keep as arcane but describe as chaos energy)
 * - Description: "Hurl a bolt of chaotic energy" instead of "condensed shadow energy"
 * - Keep the chaos element production, but make it more explicit that this is elemental chaos
 * - Consider: "Unstable Bolt" - a bolt of unstable chaos energy that can corrupt
 */
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { WarlockSkillId } from "../../../enums";
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
import { WarlockSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const chaosBolt = new WarlockSkill({
  id: WarlockSkillId.ChaosBolt,
  name: {
    en: "Chaos Bolt",
    th: "ลูกบอลวินาศ",
  },
  description: {
    text: {
      en: "Hurl a bolt of pure chaotic energy that corrupts everything it touches.\nDeal <FORMULA> chaos damage.\nTarget must [r]roll DC8 + <PlanarMod> WILsave[/r] or get <DebuffHexed> for {5}'3':'2'{/} turns.",
      th: "ขว้างลูกบอลพลังงาน chaos บริสุทธิ์ที่ทำให้ทุกสิ่งที่สัมผัสเสื่อมสลาย\nสร้างความเสียหาย chaos <FORMULA>\nเป้าหมายต้องทอย [r]WILsave DC8 + <PlanarMod>[/r] หรือถูก <DebuffHexed> {5}'3':'2'{/} เทิร์น",
    },
    formula: {
      en: "({5}'1d8':'1d6'{/} + <PlanarMod>) × <SkillLevelMultiplier>",
      th: "({5}'1d8':'1d6'{/} + <PlanarMod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
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
          en: `${actor.name.en} tried to cast Chaos Bolt but has no target`,
          th: `${actor.name.th} พยายามใช้ลูกบอลวินาศแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Calculate damage: 1d6 + planar mod * (1 + 0.1 * skill level)
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const controlMod = statMod(actor.attribute.getTotal("control"));
    const luckMod = statMod(actor.attribute.getTotal("luck"));
    
    const baseDiceDamage = roll(1).d(skillLevel >= 5 ? 8 : 6).total;
    const levelMultiplier = skillLevelMultiplier(skillLevel);
    const totalDamage = Math.max(0, Math.floor((baseDiceDamage + planarMod) * levelMultiplier));

    const damageOutput = {
      damage: totalDamage,
      hit: rollTwenty().total + controlMod,
      crit: rollTwenty().total + luckMod,
      type: DamageType.chaos,
      isMagic: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // Check for cursed debuff (DC8 + planar mod willpower save)
    let hexedMessage = "";
    if (damageResult.isHit) {
      const willpowerDC = 8 + statMod(actor.attribute.getTotal('intelligence'));
      const willpowerSave = target.rollSave("willpower");
      
      if (willpowerSave < willpowerDC) {
        const hexedDuration = skillLevel >= 5 ? 3 : 2;
        buffsAndDebuffsRepository.hexed.appender(target, { turnsAppending: hexedDuration });
        hexedMessage = ` ${target.name.en} is hexed!`;
      }
    }

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Shadow Bolt", th: "ลูกบอลเงา" },
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
          effect: [TargetEffect.ChaosOne],
        },
      ],
    };
  },
});

