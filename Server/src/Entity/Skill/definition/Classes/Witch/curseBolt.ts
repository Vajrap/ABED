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
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const curseBolt = new WitchSkill({
  id: WitchSkillId.CurseBolt,
  name: {
    en: "Curse Bolt",
    th: "ลูกบอลคำสาป",
  },
  description: {
    en: "Launch a bolt of cursed energy that bypasses defenses. Deals 1d3 + INT mod * (1 + 0.1 * skill level) true dark damage. Target rolls DC6 + control mod willpower save or gets cursed for 2 turns (3 at level 5). At level 5, damage increases to 1d4.",
    th: "ปล่อยลูกบอลพลังงานคำสาปที่ผ่านการป้องกัน สร้างความเสียหายมืดจริง 1d3 + ค่า INT * (1 + 0.1 * เลเวลสกิล) เป้าหมายทอย willpower save DC6 + control mod หรือจะถูกสาป 2 เทิร์น (3 เทิร์นที่เลเวล 5) ที่เลเวล 5 ความเสียหายเพิ่มเป็น 1d4",
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

    // Calculate damage: 1d3 (1d4 at level 5) + INT mod * (1 + 0.1 * skill level) as TRUE damage
    const intMod = statMod(actor.attribute.getTotal("intelligence"));
    const controlMod = statMod(actor.attribute.getTotal("control"));
    const levelMultiplier = skillLevelMultiplier(skillLevel);
    
    const baseDiceDamage = roll(1).d(skillLevel >= 5 ? 4 : 3).total;
    const totalDamage = Math.max(0, Math.floor((baseDiceDamage + intMod) * levelMultiplier));

    const damageOutput = {
      damage: totalDamage,
      hit: 999, // Auto-hit for true damage
      crit: 0,
      type: DamageType.dark,
      isMagic: true,
      trueDamage: true, // TRUE DAMAGE - bypasses all mitigation
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // Check for cursed debuff (DC6 + control mod willpower save) - LOW DC
    let cursedMessage = "";
    const willpowerDC = 6 + controlMod; // Low DC as requested
    const willpowerSave = target.rollSave("willpower");
    
    if (willpowerSave < willpowerDC) {
      const cursedDuration = skillLevel >= 5 ? 3 : 2;
      buffsAndDebuffsRepository.cursed.appender(target, cursedDuration, false, 0);
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

