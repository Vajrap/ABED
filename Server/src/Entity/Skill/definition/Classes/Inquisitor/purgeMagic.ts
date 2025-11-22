import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { InquisitorSkillId } from "../../../enums";
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
import { InquisitorSkill } from "./index";

export const purgeMagic = new InquisitorSkill({
  id: InquisitorSkillId.PurgeMagic,
  name: {
    en: "Purge Magic",
    th: "ล้างเวทมนตร์",
  },
  description: {
    en: "Purge magical buffs from a target, dealing true holy damage that scales with their power. Deals 1d4 + target's planar mod + number of target's buffs true holy damage. Removes 1 random buff (2 at level 5). At level 5, also adds +2 raw damage.",
    th: "ลบบัฟเวทมนตร์จากเป้าหมาย สร้างความเสียหายศักดิ์สิทธิ์แท้ที่เพิ่มตามพลังของเป้าหมาย สร้างความเสียหาย 1d4 + ค่า planar ของเป้าหมาย + จำนวนบัฟของเป้าหมาย ลบบัฟแบบสุ่ม 1 ตัว (2 ตัวที่เลเวล 5) ที่เลเวล 5 จะเพิ่มความเสียหายดิบ +2",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 3,
    sp: 0,
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
        element: "order",
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
          en: `${actor.name.en} tried to cast Purge Magic but has no target`,
          th: `${actor.name.th} พยายามใช้ล้างเวทมนตร์แต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Get target's planar mod and number of buffs
    const targetPlanarMod = statMod(target.attribute.getTotal("planar"));
    const numBuffs = target.buffsAndDebuffs.buffs.entry.size;
    
    // Calculate damage: 1d4 + target's planar mod + number of buffs
    const baseDamage = roll(1).d(4).total;
    let damage = baseDamage + targetPlanarMod + numBuffs;
    
    // At level 5, add +2 raw damage
    if (skillLevel >= 5) {
      damage += 2;
    }
    
    damage = Math.max(0, damage);

    // Remove random buff(s)
    const numBuffsToRemove = skillLevel >= 5 ? 2 : 1;
    const buffEntries = Array.from(target.buffsAndDebuffs.buffs.entry.entries());
    const buffsRemoved: string[] = [];
    
    // Randomly select buffs to remove
    const shuffledBuffs = [...buffEntries].sort(() => Math.random() - 0.5);
    const buffsToRemove = shuffledBuffs.slice(0, Math.min(numBuffsToRemove, buffEntries.length));
    
    for (const [buffId] of buffsToRemove) {
      target.buffsAndDebuffs.buffs.entry.delete(buffId);
      buffsRemoved.push(buffId);
    }

    const damageOutput = {
      damage,
      hit: 999, // Auto-hit for true damage
      crit: 0,
      type: DamageType.holy,
      isMagic: true,
      trueDamage: true, // TRUE DAMAGE - bypasses all mitigation
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Purge Magic", th: "ล้างเวทมนตร์" },
      damageResult,
    );

    const buffsRemovedMessage = buffsRemoved.length > 0 
      ? ` ${buffsRemoved.length} buff(s) removed!`
      : " (no buffs to remove)";
    
    // Damage breakdown for clarity
    const damageBreakdown = ` [1d4=${baseDamage} + planar=${targetPlanarMod} + buffs=${numBuffs}${skillLevel >= 5 ? " + raw=2" : ""} = ${damage}]`;

    return {
      content: {
        en: `${message.en}${damageBreakdown}${buffsRemovedMessage}`,
        th: `${message.th}${damageBreakdown}${buffsRemoved.length > 0 ? ` ลบบัฟ ${buffsRemoved.length} ตัว!` : " (ไม่มีบัฟให้ลบ)"}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
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

