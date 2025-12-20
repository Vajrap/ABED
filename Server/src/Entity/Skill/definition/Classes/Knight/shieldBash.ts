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
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { statMod } from "src/Utils/statMod";

export const shieldBash = new KnightSkill({
  id: KnightSkillId.ShieldBash,
  name: {
    en: "Shield Bash",
    th: "ทุบด้วยโล่",
  },
  description: {
    text: {
      en: "Bash your enemy with your shield, has chance to stun them for 1 turn.\nDeal <FORMULA> damage.\nTarget must roll DC7 + <STRmod> END save or become Stunned for 1 turn.\nIf you have <BuffDefenseUp>, DC becomes 10 + <STRmod>.",
      th: "ทุบศัตรูด้วยโล่ มีโอกาสทำให้มึนงง 1 เทิร์น\nสร้างความเสียหาย <FORMULA>\nเป้าหมายต้องทอย DC7 + <STRmod> END save หรือถูกทำให้มึนงง 1 เทิร์น\nหากคุณมี <BuffDefenseUp> DC กลายเป็น 10 + <STRmod>",
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
    sp: 3,
    elements: [
      {
        element: "earth",
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
  ): TurnResult => {
    const target = getTarget(actor, actorParty, targetParty, "enemy")
      .from("frontFirst")
      .one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to bash but has no target`,
          th: `${actor.name.th} พยายามทุบแต่ไม่พบเป้าหมาย`,
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
          en: `${actor.name.en} needs a shield to execute Shield Bash.`,
          th: `${actor.name.th} ต้องใช้โล่เพื่อใช้ท่า Shield Bash`,
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

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    const message = buildCombatMessage(
      actor,
      target,
      { en: "Shield Bash", th: "ทุบด้วยโล่" },
      damageResult,
    );

    // Stun save check
    const actorStrMod = statMod(actor.attribute.getTotal("strength"));
    const hasDefenseUp = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.defenseUp)?.value && actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.defenseUp)!.value > 0;
    const dc = hasDefenseUp ? 10 + actorStrMod : 7 + actorStrMod;
    const saveRoll = target.rollSave("endurance");
    let stunMessage = "";

    if (saveRoll < dc) {
      // Save failed: apply stun
      debuffsRepository.stun.appender(target, { turnsAppending: 1 });
      stunMessage = ` ${target.name.en} failed the save and is stunned!`;
    }

    return {
      content: {
        en: `${message.en}${stunMessage}`,
        th: `${message.th}${stunMessage ? ` ${target.name.th} ล้มเหลวในการทดสอบและถูกทำให้มึนงง!` : ""}`,
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

