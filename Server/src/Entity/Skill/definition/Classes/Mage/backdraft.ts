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
    text: {
      en: "Ignite the flames already burning on your enemies, causing them to explode in a violent backdraft.\nTargets all enemies with <DebuffBurn>.\nDeal <FORMULA> fire damage per burn stack, then remove all burn stacks.\n[b]Heal yourself[/b] for total damage × (0.1 × skill level) {5} + 1d2 per stack: + 1 per stack{/}",
      th: "จุดไฟที่กำลังลุกไหม้บนศัตรู ทำให้ระเบิดเป็นไฟย้อนกลับอย่างรุนแรง\nโจมตีศัตรูทั้งหมดที่มี <DebuffBurn>\nสร้างความเสียหายไฟ <FORMULA> ต่อสแตคเผาไหม้ จากนั้นลบสแตคเผาไหม้ทั้งหมด\n[b]ฟื้นฟูตัวเอง[/b] ความเสียหายทั้งหมด × (0.1 × เลเวลสกิล) {5} + 1d2 ต่อสแตค: + 1 ต่อสแตค{/}", 
    },
    formula: {
      en: "total damage × (0.1 × skill level) {5}+ 1d2 per stack:+ 1 per stack{/}",
      th: "ความเสียหายทั้งหมด × (0.1 × เลเวลสกิล) {5}+ 1d2 ต่อสแตค:+ 1 ต่อสแตค{/}",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 3,
    sp: 0,
    elements: [
      {element: "chaos", value: 2},
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {element: "fire", min: 1, max: 1},
    ],
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
    // At level < 5: totalBurnStacks * (0.1 * skillLevel) + 1 per stack
    // At level >= 5: totalBurnStacks * (0.1 * skillLevel) + 1d2 per stack
    let additionalHeal = 0;
    if (skillLevel >= 5) {
      // Roll 1d2 for each stack
      for (let i = 0; i < totalBurnStacks; i++) {
        additionalHeal += roll(1).d(2).total;
      }
    } else {
      // +1 per stack at level < 5
      additionalHeal = totalBurnStacks;
    }
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
