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
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { WarriorSkill } from ".";
import { statMod } from "src/Utils/statMod";

export const battlefieldDominance = new WarriorSkill({
  id: WarriorSkillId.BattlefieldDominance,
  name: {
    en: "Battlefield Dominance",
    th: "ครองสนามรบ",
  },
  description: {
    text: {
      en: "Dominate the battlefield with overwhelming presence, slowing enemies.\nDeal <FORMULA> damage to all enemies in the front row.\nEach enemy [r]rolls DC8 + <STRmod> ENDsave[/r] or get -10 AB gauge ({5}-15{/} at level 5).",
      th: "ครองสนามรบด้วยการปรากฏตัวที่ล้นหลาม ทำให้ศัตรูช้าลง\nสร้างความเสียหาย <FORMULA> ให้ศัตรูทั้งหมดในแถวหน้า\nศัตรูแต่ละคน [r]ทอย DC8 + <STRmod> ENDsave[/r] หรือได้รับ -10 AB gauge ({5}-15{/} ที่เลเวล 5)",
    },
    formula: {
      en: "({5}'0.9':'0.8'{/} × <WeaponDamage>) × <SkillLevelMultiplier>",
      th: "({5}'0.9':'0.8'{/} × <WeaponDamage>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 4,
    elements: [
      { element: "neutral", value: 2 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "earth", min: 1, max: 1 },
    ],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    const targets = getTarget(actor, actorParty, targetParty, "enemy").from("frontFirst").all();

    if (!targets || targets.length === 0) {
      return {
        content: {
          en: `${actor.name.en} tried to dominate the battlefield but has no targets`,
          th: `${actor.name.th} พยายามครองสนามรบแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    const strMod = statMod(actor.attribute.getTotal("strength"));
    const baseTimes = skillLevel >= 5 ? 0.9 : 0.8;
    const levelScalar = skillLevelMultiplier(skillLevel);
    const abGaugeReduction = skillLevel >= 5 ? 15 : 10;

    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    const messages: string[] = [];

    for (const target of targets) {
      const damageOutput = getWeaponDamageOutput(actor, weapon, "physical");
      const positionModifierValue = getPositionModifier(
        actor.position,
        target.position,
        weapon,
      );

      damageOutput.damage = Math.floor(
        (damageOutput.damage * baseTimes) *
        levelScalar *
        positionModifierValue
      );

      const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
      const message = buildCombatMessage(
        actor,
        target,
        { en: "Battlefield Dominance", th: "ครองสนามรบ" },
        damageResult,
      );
      messages.push(message.en);

      // Save: DC10 + STR mod END save or get -AB gauge
      if (damageResult.isHit) {
        const saveRoll = target.rollSave("endurance");
        const dc = 8 + strMod;
        if (saveRoll < dc) {
          // Save failed: reduce AB gauge
          const initialGauge = target.abGauge;
          target.abGauge = Math.max(0, target.abGauge - abGaugeReduction);
          const reduced = initialGauge - target.abGauge;
          messages.push(`${target.name.en} failed the save and lost ${reduced} AB gauge!`);
        }
      }

      targetEffects.push({
        actorId: target.id,
        effect: [TargetEffect.TestSkill],
      });
    }

    return {
      content: {
        en: `${actor.name.en} dominates the battlefield! ${messages.join(" ")}`,
        th: `${actor.name.th} ครองสนามรบ! ${messages.join(" ")}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: targetEffects,
    };
  },
});

