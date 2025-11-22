import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { PaladinSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { roll, rollTwenty } from "src/Utils/Dice";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { PaladinSkill } from "./index";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { getTarget } from "src/Entity/Battle/getTarget";
import { skillLevelMultiplier } from "src/Utils/skillScaling";

export const aegisPulse = new PaladinSkill({
  id: PaladinSkillId.AegisPulse,
  name: {
    en: "Aegis Pulse",
    th: "คลื่นป้องกันศักดิ์สิทธิ์",
  },
  description: {
    en: "Emit a wave of holy light. Healing allies for 1d4 + willpower mod * (1 + 0.1 * skill level) HP. Dealing small holy damage to all enemies for 1d4 + willpower mod * (1 + 0.1 * skill level) holy damage. Requires Aegis Pulse buff.",
    th: "ปล่อยคลื่นแสงศักดิ์สิทธิ์ รักษาพันธมิตร 1d4 + willpower mod * (1 + 0.1 * skill level) HP และสร้างความเสียหายศักดิ์สิทธิ์เล็กน้อยให้ศัตรูทั้งหมด 1d4 + willpower mod * (1 + 0.1 * skill level) ต้องมีบัฟ Aegis Pulse",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  existBuff: [BuffEnum.aegisPulse],
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
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    // Check if actor has Aegis Pulse buff
    const aegisPulseBuff = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.aegisPulse);
    if (!aegisPulseBuff || aegisPulseBuff.value <= 0) {
      return {
        content: {
          en: `${actor.name.en} tried to use Aegis Pulse but doesn't have the Aegis Pulse buff`,
          th: `${actor.name.th} พยายามใช้คลื่นป้องกันศักดิ์สิทธิ์แต่ไม่มีบัฟ Aegis Pulse`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const willMod = statMod(actor.attribute.getTotal("willpower"));
    const levelScalar = skillLevelMultiplier(skillLevel);
    const baseHeal = roll(1).d(4).total + willMod;
    const healAmount = Math.floor(baseHeal * levelScalar);
    const damageAmount = Math.floor(baseHeal * levelScalar);

    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    let combinedMessage = "";

    // Healing allies
    const livingAllies = actorParty.filter((ally) => !ally.vitals.isDead && ally.id !== actor.id);
    for (const ally of livingAllies) {
      const beforeHp = ally.vitals.hp.current;
      ally.vitals.incHp(healAmount);
      const actualHeal = ally.vitals.hp.current - beforeHp;
      combinedMessage += `${ally.name.en} healed for ${actualHeal} HP. `;
      targetEffects.push({
        actorId: ally.id,
        effect: [TargetEffect.OrderOne],
      });
    }

    // Dealing holy damage to all enemies
    const enemies = getTarget(actor, actorParty, targetParty, "enemy").all();
    for (const enemy of enemies) {
      const damageOutput = {
        damage: damageAmount,
        hit: rollTwenty().total + statMod(actor.attribute.getTotal("control")),
        crit: rollTwenty().total + statMod(actor.attribute.getTotal("luck")),
        type: DamageType.holy,
        isMagic: true,
      };

      const damageResult = resolveDamage(actor.id, enemy.id, damageOutput, location);
      combinedMessage += buildCombatMessage(
        actor,
        enemy,
        { en: "Aegis Pulse", th: "คลื่นป้องกันศักดิ์สิทธิ์" },
        damageResult,
      ).en + " ";

      targetEffects.push({
        actorId: enemy.id,
        effect: [TargetEffect.OrderOne],
      });
    }

    // Remove Aegis Pulse buff
    actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.aegisPulse);

    return {
      content: {
        en: `${actor.name.en} unleashed Aegis Pulse! ${combinedMessage.trim()}`,
        th: `${actor.name.th} ปล่อยคลื่นป้องกันศักดิ์สิทธิ์! ${combinedMessage.trim()}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: targetEffects,
    };
  },
});

