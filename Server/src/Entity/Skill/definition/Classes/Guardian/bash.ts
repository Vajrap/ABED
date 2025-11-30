import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { GuardianSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { getWeaponDamageType } from "src/Utils/getWeaponDamageType";
import { statMod } from "src/Utils/statMod";
import { GuardianSkill } from ".";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const bash = new GuardianSkill({
  id: GuardianSkillId.Bash,
  name: {
    en: "Bash",
    th: "ทุบสุดแรง",
  },
  description: {
    text: {
      en: "Slam your weapon with overwhelming force, crushing your enemy's defenses.\nDeal <FORMULA> damage.\nTarget must [r]roll DC8 + STRmod ENDsave[/r] or become <DebuffStun> for 1 turn.",
      th: "ฟาดอาวุธด้วยแรงมหาศาล ทำลายการป้องกันของศัตรู\nสร้างความเสียหาย <FORMULA>\nเป้าหมายต้องทอย [r]DC8 + STRmod ENDsave[/r] หรือถูก <DebuffStun> 1 เทิร์น",
    },
    formula: {
      en: "<WeaponDamage> + <STRmod> × <MeleeRangePenalty>",
      th: "<WeaponDamage> + <STRmod> × <MeleeRangePenalty>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "earth",
        value: 2,
      },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "fire",
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
          en: `${actor.name.en} tried to bash but has no target`,
          th: `${actor.name.th} พยายามทุบแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    const damageType = getWeaponDamageType(weapon.weaponType);
    const damageOutput = getWeaponDamageOutput(actor, weapon, damageType);

    // Add strength modifier
    const strengthMod = statMod(actor.attribute.getTotal("strength"));

    const positionModifierValue = getPositionModifier(
      actor.position,
      target.position,
      weapon,
    );

    damageOutput.damage =
      (damageOutput.damage + strengthMod) * positionModifierValue;

    const totalDamage = resolveDamage(
      actor.id,
      target.id,
      damageOutput,
      location,
    );

    // Check for stun application
    const actorStrMod = statMod(actor.attribute.getTotal("strength"));
    const dc = 8 + actorStrMod;
    const saveRoll = target.rollSave("endurance");
    let stunMessage = "";

    if (saveRoll < dc) {
      // Save failed: apply stun
      debuffsRepository.stun.appender(target, { turnsAppending: 1 });
      stunMessage = ` ${target.name.en} failed the save and is stunned!`;
    }

    const combatMsg = buildCombatMessage(
      actor,
      target,
      { en: "Bash", th: "ทุบสุดแรง" },
      totalDamage,
    );

    return {
      content: {
        en: `${combatMsg.en}${stunMessage}`,
        th: `${combatMsg.th}${stunMessage ? ` ${target.name.th} ล้มเหลวในการทดสอบและถูกทำให้มึนงง!` : ""}`,
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
