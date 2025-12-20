import type { Character } from "src/Entity/Character/Character";
import { MageSkill } from ".";
import { MageSkillId } from "../../../enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { getTarget } from "src/Entity/Battle/getTarget";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const planarEruption = new MageSkill({
  id: MageSkillId.PlanarEruption,
  name: {
    en: "Planar Eruption",
    th: "การปะทุระนาบ",
  },
  description: {
    text: {
      en: "Unleash all stored arcane energy in a devastating eruption. Consume all Arcane Charge stacks. Each stack deals <FORMULA> damage to random enemies.",
      th: "ปลดปล่อยพลังงานอาร์เคนที่เก็บไว้ทั้งหมดในการปะทุที่ทำลายล้าง ลบสแต็ก Arcane Charge ทั้งหมด แต่ละสแต็กสร้างความเสียหาย <FORMULA> ให้ศัตรูแบบสุ่ม",
    },
    formula: {
      en: "2d6 arcane damage per stack",
      th: "2d6 ความเสียหายอาร์เคนต่อสแต็ก",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.epic,
  consume: {
    hp: 0,
    mp: 6,
    sp: 0,
    elements: [
      { element: "chaos", value: 3 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "neutral", min: 1, max: 1 },
    ],
  },
  exec: (
    user: Character,
    userParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    // Get current Arcane Charge stacks
    const arcaneChargeEntry = user.buffsAndDebuffs.buffs.entry.get(BuffEnum.arcaneCharge);
    const chargeStacks = arcaneChargeEntry?.value || 0;

    if (chargeStacks === 0) {
      return {
        content: {
          en: `${user.name.en} tried to unleash a Planar Eruption but has no Arcane Charge stacks!`,
          th: `${user.name.th} พยายามปล่อยการปะทุระนาบแต่ไม่มีสแต็ก Arcane Charge!`,
        },
        actor: {
          actorId: user.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Each stack deals 2d6 damage to a random enemy
    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    let totalDamageDealt = 0;
    const damagePerTarget: Map<string, number> = new Map();
    let targets: Character[] = [];

    for (let i = 0; i < chargeStacks; i++) {
      // Select a random enemy for this stack
      const target = getTarget(user, userParty, targetParty, "enemy").except(targets).one();
      if (!target) continue;
      targets.push(target);

      // Calculate 2d6 damage for this stack
      const stackDamage = user.roll({ amount: 2, face: 6, applyBlessCurse: false });
      
      // Accumulate damage per target
      const currentDamage = damagePerTarget.get(target.id) || 0;
      damagePerTarget.set(target.id, currentDamage + stackDamage);
    }

    // Apply accumulated damage to each target
    for (const [targetId, totalDamage] of damagePerTarget.entries()) {
      const target = targets.find(e => e.id === targetId);
      if (!target) continue;

      const damageOutput = {
        damage: totalDamage,
        hit: user.rollTwenty({}),
        crit: user.rollTwenty({}),
        type: DamageType.arcane,
        isMagic: true,
      };
      const damageResult = resolveDamage(user.id, target.id, damageOutput, location);
      totalDamageDealt += damageResult.actualDamage;
      targetEffects.push({ actorId: target.id, effect: [TargetEffect.ArcaneOne] });
    }

    // Consume all Arcane Charge stacks
    if (arcaneChargeEntry) {
      arcaneChargeEntry.value = 0;
      user.buffsAndDebuffs.buffs.entry.delete(BuffEnum.arcaneCharge);
    }

    return {
      content: {
        en: `${user.name.en} unleashed a devastating Planar Eruption with ${chargeStacks} charge(s), dealing ${totalDamageDealt} total arcane damage to ${damagePerTarget.size} enemy(ies)!`,
        th: `${user.name.th} ปล่อยการปะทุระนาบที่ทำลายล้างด้วย ${chargeStacks} ประจุ สร้างความเสียหายอาร์เคนรวม ${totalDamageDealt} ให้ ${damagePerTarget.size} ศัตรู!`,
      },
      actor: {
        actorId: user.id,
        effect: [ActorEffect.Cast],
      },
      targets: targetEffects,
    };
  },
});

