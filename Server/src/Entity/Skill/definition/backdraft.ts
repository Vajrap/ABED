import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SkillId } from "../enums";
import { Skill } from "../Skill";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { BuffsAndDebuffsEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { roll } from "src/Utils/Dice";

export const backdraft = new Skill({
  id: SkillId.Backdraft,
  name: {
    en: "Backdraft",
    th: "ไฟย้อนกลับ",
  },
  description: {
    en: "Targets all enemies with burn status. Deals damage equal to their burn stacks, removes all burn stacks, then heals yourself for total removed stacks × 10% per skill level. Damage dealth and Healing amount increased by 1d2 at skill level 5",
    th: "โจมตีศัตรูทั้งหมดที่มีสถานะเผาไหม้ สร้างความเสียหายเท่ากับจำนวนชั้นของเผาไหม้ที่แต่ละเป้าหมายมีและลบเผาไหม้ทั้งหมดออก จากนั้นฟื้นฟูตัวเองเท่ากับจำนวนชั้นของเผ้าไหม้ทั้งหมด x 10% ต่อเลเวลสกิล. ความเสียหายและการฟื้นฟูเพิ่มขึ้นพิเศษ 1d2 เมื่อสกิลเลเวล 5",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 3,
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
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ) => {
    // Find all targets with burn debuff
    // TODO: Filter targets by burn debuff
    const targetsWithBurn = getTarget(actor, targetParty)
      .witBuff(BuffsAndDebuffsEnum.burn)
      .all();

    if (targetsWithBurn.length === 0) {
      return {
        content: {
          en: `${actor.name.en} tried to use Backdraft but no enemies have burn status`,
          th: `${actor.name.th} พยายามใช้ไฟย้อนกลับแต่ไม่มีศัตรูมีสถานะเผาไหม้`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    let totalBurnStacks = 0;
    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    let combinedMessage = "";

    for (const target of targetsWithBurn) {
      const burnStacks =
        target.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.burn)?.value ?? 0;

      if (burnStacks > 0) {
        totalBurnStacks += burnStacks;

        // Deal damage equal to burn stacks
        const damageOutput = {
          damage: burnStacks + (skillLevel === 5 ? roll(1).d(2).total : 0),
          hit: 999,
          crit: 0,
          type: DamageType.fire,
        };

        const totalDamageResult = resolveDamage(
          actor.id,
          target.id,
          damageOutput,
          location,
        );

        combinedMessage +=
          buildCombatMessage(
            actor,
            target,
            { en: `Backdraft`, th: `ไฟย้อนกลับ` },
            totalDamageResult,
          ).en + " ";

        target.buffsAndDebuffs.entry.delete(BuffsAndDebuffsEnum.burn);

        targetEffects.push({
          actorId: target.id,
          effect: [TargetEffect.FireTwo],
        });
      }
    }

    // Heal self based on removed burn stacks
    const additionalHeal = skillLevel >= 5 ? roll(1).d(2).total : 0;
    const healAmount = Math.floor(
      totalBurnStacks * (0.1 * skillLevel) + additionalHeal,
    );

    actor.vitals.incHp(healAmount);

    combinedMessage += ` ${actor.name.en} healed for ${healAmount + additionalHeal} HP!`;

    let turnResult: TurnResult = {
      content: {
        en: combinedMessage.trim(),
        th: `${actor.name.en} used Backdraft on ${targetsWithBurn.length} targets`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: targetEffects,
    };

    return turnResult;
  },
});
