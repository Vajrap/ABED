import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MageSkillId } from "../../../enums";
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
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { MageSkill } from "./index";
import { skillLevelMultiplier } from "src/Utils/skillScaling";

export const fireBolt = new MageSkill({
  id: MageSkillId.FireBolt,
  name: {
    en: "Fire Bolt",
    th: "ลูกไฟ",
  },
  description: {
    text: {
      en: "Unleash a focused bolt of fire that streaks toward your enemy like a shooting star.\nDeal <FORMULA> fire damage.\nOn hit, target must [r]roll DC8 + <PlanarMod> ENDsave[/r] or get <DebuffBurn> 1–2 stacks.",
      th: "ปล่อยลูกไฟที่มุ่งเน้นพุ่งไปยังศัตรูเหมือนดาวตก\nสร้างความเสียหายไฟ <FORMULA>\nเมื่อโดน เป้าหมายต้องทอย [r]ENDsave DC8 + <PlanarMod>[/r] หรือถูก <DebuffBurn> 1–2 สแตค",
    },
    formula: {
      en: "(1d6 + <PlanarMod>) × <SkillLevelMultiplier>",
      th: "(1d6 + <PlanarMod>) × <SkillLevelMultiplier>",
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
          en: `${actor.name.en} tried to cast Fire Bolt but has no target`,
          th: `${actor.name.th} พยายามใช้ลูกไฟแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Magic damage calculation: 1d4 + planar mod + 0.5 per skill level
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const controlMod = statMod(actor.attribute.getTotal("control"));
    const luckMod = statMod(actor.attribute.getTotal("luck"));

    const burnDC = 8 + planarMod;

    // Calculate base damage
    const totalDamage = Math.max(
      0,
      (roll(1).d(6).total + planarMod) * skillLevelMultiplier(skillLevel),
    );

    // Hit comes from control mod
    const hitBonus = controlMod;

    // Crit from luck
    const critBonus = luckMod;

    // Create damage output
    const damageOutput = {
      damage: Math.floor(totalDamage),
      hit: rollTwenty().total + hitBonus, // DC 13 base
      crit: rollTwenty().total + critBonus,
      type: DamageType.fire,
      isMagic: true,
    };

    const totalDamageResult = resolveDamage(
      actor.id,
      target.id,
      damageOutput,
      location,
    );

    // Check for burn application (DC 13)
    let burnMessage = "";
    if (totalDamageResult.isHit) {
      const burnSave = target.rollSave('endurance')
      if (burnSave < burnDC) {
        const burnStacks = roll(2).d(1).total;
        const burnResult = buffsAndDebuffsRepository.burn.appender(
          target,
          {
            turnsAppending: burnStacks,
          },
        );
        burnMessage = burnResult.en;
      }
    }

    let turnResult: TurnResult = {
      content: {
        en: `${buildCombatMessage(actor, target, { en: `Fire Bolt`, th: `ลูกไฟ` }, totalDamageResult).en} ${burnMessage}`,
        th: `${buildCombatMessage(actor, target, { en: `Fire Bolt`, th: `ลูกไฟ` }, totalDamageResult).th} ${burnMessage}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.FireOne],
      },
      targets: [
        {
          actorId: target.id,
          effect: [TargetEffect.FireOne],
        },
      ],
    };

    return turnResult;
  },
});
