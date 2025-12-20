import type { Character } from "src/Entity/Character/Character";
import { SeerSkill } from ".";
import { SeerSkillId } from "../../../enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { getTarget } from "src/Entity/Battle/getTarget";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import type { ElementResourceKey } from "src/InterFacesEnumsAndTypes/Enums";

export const threadBacklash = new SeerSkill({
  id: SeerSkillId.ThreadBacklash,
  name: {
    en: "Thread Backlash",
    th: "แรงปะทุสายใย",
  },
  description: {
    text: {
      en: "Release the stored planar energy in a devastating backlash. Must have PlanarGrab buff. Consume ALL elemental resources you have. For each element consumed, deal 1d6 arcane damage to a random enemy. If total resources consumed ≤ 2: Gain 1 BadLuck stack. If total resources consumed ≥ 5: Gain 1 Lucky stack. Remove PlanarGrab buff after use.",
      th: "ปล่อยพลังงานระนาบที่เก็บไว้ในแรงปะทุที่ทำลายล้าง ต้องมีบัฟ PlanarGrab ใช้ทรัพยากรธาตุทั้งหมดที่คุณมี สำหรับแต่ละธาตุที่ใช้ สร้างความเสียหายอาร์เคน 1d6 ให้ศัตรูแบบสุ่ม หากทรัพยากรที่ใช้ทั้งหมด ≤ 2: ได้รับ 1 สแต็ก BadLuck หากทรัพยากรที่ใช้ทั้งหมด ≥ 5: ได้รับ 1 สแต็ก Lucky ลบบัฟ PlanarGrab หลังการใช้",
    },
  },
  requirement: {},
  existBuff: [BuffEnum.planarGrab],
  equipmentNeeded: [],
  tier: TierEnum.rare,
  consume: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [],
  },
  exec: (
    user: Character,
    userParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    // Check for PlanarGrab buff (should already be checked by requirement, but double-check)
    const planarGrabEntry = user.buffsAndDebuffs.buffs.entry.get(BuffEnum.planarGrab);
    if (!planarGrabEntry || planarGrabEntry.value === 0) {
      return {
        content: {
          en: `${user.name.en} tried to use Thread Backlash but doesn't have PlanarGrab buff!`,
          th: `${user.name.th} พยายามใช้ Thread Backlash แต่ไม่มีบัฟ PlanarGrab!`,
        },
        actor: {
          actorId: user.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Collect all elemental resources
    const elementKeys: ElementResourceKey[] = ["fire", "water", "earth", "wind", "order", "chaos", "neutral"];
    const resourceCounts: Record<ElementResourceKey, number> = {
      fire: user.resources.fire || 0,
      water: user.resources.water || 0,
      earth: user.resources.earth || 0,
      wind: user.resources.wind || 0,
      order: user.resources.order || 0,
      chaos: user.resources.chaos || 0,
      neutral: user.resources.neutral || 0,
    };

    // Calculate total resources
    const totalResources = elementKeys.reduce((sum, element) => sum + resourceCounts[element], 0);

    // Consume ALL elemental resources
    for (const element of elementKeys) {
      user.resources[element] = 0;
    }

    // Deal damage: For each element consumed, deal 1d6 arcane damage to a random enemy
    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    let totalDamageDealt = 0;

    for (let i = 0; i < totalResources; i++) {
      const damageTarget = getTarget(user, userParty, targetParty, "enemy").one();
      if (damageTarget) {
        const damageDice = user.roll({ amount: 1, face: 6 });
        const damageOutput = {
          damage: damageDice,
          hit: user.rollTwenty({}),
          crit: user.rollTwenty({}),
          type: DamageType.arcane,
          isMagic: true,
        };
        const damageResult = resolveDamage(user.id, damageTarget.id, damageOutput, location);
        totalDamageDealt += damageResult.actualDamage;
        
        // Add target to effects if not already added
        if (!targetEffects.find(t => t.actorId === damageTarget.id)) {
          targetEffects.push({ actorId: damageTarget.id, effect: [TargetEffect.TestSkill] });
        }
      }
    }

    // Consequences based on total resources consumed
    if (totalResources <= 2) {
      // Gain 1 BadLuck stack
      buffsAndDebuffsRepository.badLuck.appender(user, { turnsAppending: 1 });
    } else if (totalResources >= 5) {
      // Gain 1 Lucky stack
      buffsAndDebuffsRepository.lucky.appender(user, { turnsAppending: 1 });
    }

    // Remove PlanarGrab buff
    user.buffsAndDebuffs.buffs.entry.delete(BuffEnum.planarGrab);

    let consequenceText = "";
    if (totalResources <= 2) {
      consequenceText = " Gained 1 BadLuck stack!";
    } else if (totalResources >= 5) {
      consequenceText = " Gained 1 Lucky stack!";
    }

    return {
      content: {
        en: `${user.name.en} released Thread Backlash, consuming ${totalResources} elements and dealing ${totalDamageDealt} total arcane damage!${consequenceText}`,
        th: `${user.name.th} ปล่อยแรงปะทุสายใย ใช้ ${totalResources} ธาตุ และสร้างความเสียหายอาร์เคนรวม ${totalDamageDealt}!${consequenceText}`,
      },
      actor: {
        actorId: user.id,
        effect: [ActorEffect.Cast],
      },
      targets: targetEffects.length > 0 ? targetEffects : [
        {
          actorId: user.id,
          effect: [TargetEffect.TestSkill],
        },
      ],
    };
  },
});

