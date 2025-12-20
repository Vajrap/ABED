import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { WarriorSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import type { TurnResult } from "../../../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { WarriorSkill } from ".";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const challengeStrike = new WarriorSkill({
  id: WarriorSkillId.ChallengeStrike,
  name: {
    en: "Challenge Strike",
    th: "โจมตีท้าทาย",
  },
  description: {
    text: {
      en: "Challenge an enemy to single combat, exposing their weaknesses.\nDeal <FORMULA> damage.\nMark target with <DebuffChallenged> debuff and self with <BuffChallenger> buff for 3 turns.\n<BuffChallenger>: +2 hit roll, +2 crit chance against <DebuffChallenged> target.",
      th: "ท้าทายศัตรูให้ต่อสู้แบบตัวต่อตัว เปิดเผยจุดอ่อนของพวกเขา\nสร้างความเสียหาย <FORMULA>\nทำเครื่องหมายเป้าหมายด้วย <DebuffChallenged> debuff และตัวเองด้วย <BuffChallenger> buff เป็นเวลา 3 เทิร์น\n<BuffChallenger>: +2 hit roll, +2 crit chance ต่อเป้าหมาย <DebuffChallenged>",
    },
    formula: {
      en: "<WeaponDamage> × <SkillLevelMultiplier>",
      th: "<WeaponDamage> × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  notExistBuff: [BuffEnum.challenger],
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
    elements: [
      { element: "neutral", value: 2 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "fire", min: 1, max: 1 },
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
          en: `${actor.name.en} tried to use Challenge Strike but has no target`,
          th: `${actor.name.th} พยายามใช้โจมตีท้าทายแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    const damageOutput = getWeaponDamageOutput(actor, weapon, "physical");
    const levelScalar = skillLevelMultiplier(skillLevel);

    // Base damage: Weapon damage × skill level multiplier
    damageOutput.damage = Math.floor(damageOutput.damage * levelScalar);

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    const message = buildCombatMessage(
      actor,
      target,
      { en: "Challenge Strike", th: "โจมตีท้าทาย" },
      damageResult,
    );

    // Apply Challenger buff to self and Challenged debuff to target for 3 turns
    buffsAndDebuffsRepository.challenger.appender(actor, { turnsAppending: 3 });
    buffsAndDebuffsRepository.challenged.appender(target, { turnsAppending: 3 });

    return {
      content: {
        en: `${message.en} ${actor.name.en} challenges ${target.name.en} to single combat!`,
        th: `${message.th} ${actor.name.th} ท้าทาย ${target.name.th} ให้ต่อสู้แบบตัวต่อตัว!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
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

