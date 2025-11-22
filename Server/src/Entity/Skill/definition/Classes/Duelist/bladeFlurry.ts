import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { DuelistSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { roll } from "src/Utils/Dice";
import { DuelistSkill } from "./index";
import { skillLevelMultiplier } from "src/Utils/skillScaling";

export const bladeFlurry = new DuelistSkill({
  id: DuelistSkillId.BladeFlurry,
  name: {
    en: "Blade Flurry",
    th: "ชุดการโจมตีดาบ",
  },
  description: {
    en: "Unleash a rapid flurry of blade strikes. Deal 2 hits (3 at level 5) of (70% weapon damage) + DEX mod * (1 + 0.1 * skill level) slash damage. Each hit benefits from position modifier. Targets can be the same or different.",
    th: "ปล่อยชุดการโจมตีดาบอย่างรวดเร็ว สร้างความเสียหาย 2 ครั้ง (3 ครั้งที่เลเวล 5) แต่ละครั้ง (70% อาวุธ) + DEX mod * (1 + 0.1 * เลเวลสกิล) เป็นความเสียหายตัด แต่ละครั้งได้รับประโยชน์จาก position modifier เป้าหมายสามารถเป็นคนเดียวกันหรือต่างกัน",
  },
  requirement: {},
  equipmentNeeded: ["blade"],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 2,
    elements: [
      {
        element: "fire",
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
    const weapon = actor.getWeapon();
    if (weapon.weaponType !== "blade") {
      return {
        content: {
          en: `${actor.name.en} must equip a blade to use Blade Flurry`,
          th: `${actor.name.th} ต้องใช้อาวุธประเภทดาบเพื่อใช้ชุดการโจมตีดาบ`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const aliveTargets = targetParty.filter(t => !t.vitals.isDead);
    if (aliveTargets.length === 0) {
      return {
        content: {
          en: `${actor.name.en} tried to use Blade Flurry but has no target`,
          th: `${actor.name.th} พยายามใช้ชุดการโจมตีดาบแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Deal 2 hits (3 at level 5)
    const numHits = skillLevel >= 5 ? 3 : 2;
    const dexMod = statMod(actor.attribute.getTotal("dexterity"));
    const levelScalar = skillLevelMultiplier(skillLevel);

    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    const messages: string[] = [];
    const messagesTh: string[] = [];
    let totalDamageDealt = 0;

    const weaponDamage = weapon.weaponData.damage.physicalDamageDice;
    const weaponDamagePercentage = 0.7;


    for (let i = 0; i < numHits; i++) {
      // Select target randomly, can repeat
      const randomIndex = Math.floor(Math.random() * aliveTargets.length);
      const target = getTarget(actor, actorParty, targetParty, "enemy").from('frontFirst').one();
      if (!target) {
        continue;
      }
      
      const positionModifier = getPositionModifier(actor.position, target.position, weapon);
      
      // Damage per hit: 1d4 + DEX mod * skillScalar
      const baseDamage = (roll(weaponDamage.dice).d(weaponDamage.face).total * weaponDamagePercentage) + dexMod * levelScalar;
      const hitDamage = Math.floor((baseDamage + dexMod * levelScalar) * positionModifier);

      const damageOutput = {
        damage: hitDamage,
        hit: 999, // Auto-hit
        crit: 0,
        type: DamageType.slash,
        isMagic: false,
      };

      const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
      totalDamageDealt += damageResult.actualDamage;

      const message = buildCombatMessage(actor, target, { en: "Blade Flurry", th: "ชุดการโจมตีดาบ" }, damageResult);
      messages.push(message.en);
      messagesTh.push(message.th);

      // Add target effect if not already added
      const existingTarget = targetEffects.find(t => t.actorId === target.id);
      if (!existingTarget) {
        targetEffects.push({
          actorId: target.id,
          effect: [TargetEffect.TestSkill],
        });
      }
    }

    return {
      content: {
        en: messages.join(" "),
        th: messagesTh.join(" "),
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: targetEffects,
    };
  },
});

