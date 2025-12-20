import type { Character } from "src/Entity/Character/Character";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { getTarget } from "src/Entity/Battle/getTarget";
import { KnightSkillId } from "../../../enums";
import { KnightSkill } from "./index";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const shieldedStrike = new KnightSkill({
  id: KnightSkillId.ShieldedStrike,
  name: {
    en: "Shielded Strike",
    th: "โจมตีป้องกัน",
  },
  description: {
    text: {
      en: "Strike while maintaining your shield defense.\nDeal <FORMULA> damage.\nIf you have <BuffDefenseUp>, deal +25% damage and gain +5 AB gauge.\n{5}Also gain DefenseUp buff for 1 turn if you don't already have it.{/}",
      th: "โจมตีในขณะที่รักษาการป้องกันด้วยโล่\nสร้างความเสียหาย <FORMULA>\nหากคุณมี <BuffDefenseUp> สร้างความเสียหาย +25% และได้รับ +5 AB gauge\n{5}ยังได้รับ DefenseUp เป็นเวลา 1 เทิร์นหากคุณยังไม่มี{/}",
    },
    formula: {
      en: "<ShieldDamage> × <SkillLevelMultiplier>",
      th: "<ShieldDamage> × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 2,
    elements: [
      {
        element: "neutral",
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
        element: "earth",
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
          en: `${actor.name.en} tried to strike but has no target`,
          th: `${actor.name.th} พยายามโจมตีแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Get shield (not regular weapon)
    const shield = actor.getWeapon(true);
    if (shield.weaponType !== "shield") {
      return {
        content: {
          en: `${actor.name.en} needs a shield to execute Shielded Strike.`,
          th: `${actor.name.th} ต้องใช้โล่เพื่อใช้ท่า Shielded Strike`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Shield damage (physical)
    const damageOutput = getWeaponDamageOutput(actor, shield, "physical");
    const levelScalar = skillLevelMultiplier(skillLevel);

    // Base damage: Shield damage × skill level multiplier
    damageOutput.damage = Math.floor(damageOutput.damage * levelScalar);

    // DefenseUp Bonus: +25% damage and +5 AB gauge
    const hasDefenseUp = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.defenseUp)?.value && actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.defenseUp)!.value > 0;
    let bonusMessage = "";
    if (hasDefenseUp) {
      damageOutput.damage = Math.floor(damageOutput.damage * 1.25);
      actor.abGauge = Math.min(100, actor.abGauge + 5);
      bonusMessage = ` ${actor.name.en} gains +5 AB gauge!`;
    }

    // Level 5: Also gain DefenseUp buff for 1 turn if you don't already have it
    if (skillLevel >= 5 && !hasDefenseUp) {
      buffsRepository.defenseUp.appender(actor, { turnsAppending: 1 });
      bonusMessage += ` ${actor.name.en} gains DefenseUp for 1 turn!`;
    }

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    const message = buildCombatMessage(
      actor,
      target,
      { en: "Shielded Strike", th: "โจมตีป้องกัน" },
      damageResult,
    );

    return {
      content: {
        en: `${message.en}${bonusMessage}`,
        th: `${message.th}${bonusMessage ? ` ${actor.name.th} ได้รับโบนัส!` : ""}`,
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

