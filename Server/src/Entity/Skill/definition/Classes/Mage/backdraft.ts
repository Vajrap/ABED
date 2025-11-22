import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MageSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { roll } from "src/Utils/Dice";
import { MageSkill } from "./index";

export const backdraft = new MageSkill({
  id: MageSkillId.Backdraft,
  name: {
    en: "Backdraft",
    th: "ไฟย้อนกลับ",
  },
  description: {
    en: "Targets all enemies with burn status. Deals damage equal to their burn stacks, removes all burn stacks * (1 + 0.1 * skill level), then heals yourself for total equal to all damages did. Damage dealth and Healing amount increased to 1d2 per stack instead of 1 at skill level 5",
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
    const targetsWithBurn = getTarget(actor, actorParty, targetParty, "enemy")
      .withDebuff(DebuffEnum.burn)
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
        target.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.burn)?.value ?? 0;

      if (burnStacks > 0) {
        totalBurnStacks += burnStacks;

        // Deal damage equal to burn stacks
        const damageOutput = {
          damage: burnStacks + (skillLevel === 5 ? roll(1).d(2).total : 0),
          hit: 999,
          crit: 0,
          type: DamageType.fire,
          isMagic: true,
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

        target.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.burn);

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
