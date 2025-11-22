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
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const shadowBolt = new WarlockSkill({
  id: WarlockSkillId.ShadowBolt,
  name: {
    en: "Shadow Bolt",
    th: "ลูกบอลเงา",
  },
  description: {
    en: "Launch a bolt of condensed shadow energy. Deals 1d6 + planar mod * (1 + 0.1 * skill level) dark damage. Target rolls DC8 (+planar mod) willpower save or gets cursed for 2 turns (3 at level 5).",
    th: "ปล่อยลูกบอลพลังงานเงา สร้างความเสียหายมืด 1d6 + ค่า planar * (1 + 0.1 * เลเวลสกิล) เป้าหมายทอย willpower save DC8 (+ค่า planar) หรือจะถูกสาป 2 เทิร์น (3 เทิร์นที่เลเวล 5)",
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
          en: `${actor.name.en} tried to cast Shadow Bolt but has no target`,
          th: `${actor.name.th} พยายามใช้ลูกบอลเงาแต่ไม่พบเป้าหมาย`,
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
      type: DamageType.dark,
      isMagic: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // Check for cursed debuff (DC8 + planar mod willpower save)
    let cursedMessage = "";
    if (damageResult.isHit) {
      const willpowerDC = 8 + statMod(actor.attribute.getTotal('intelligence'));
      const willpowerSave = target.rollSave("willpower");
      
      if (willpowerSave < willpowerDC) {
        const cursedDuration = skillLevel >= 5 ? 3 : 2;
        buffsAndDebuffsRepository.cursed.appender(target, cursedDuration, false, 0);
        cursedMessage = ` ${target.name.en} is cursed!`;
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

