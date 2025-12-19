import { ClericSkillId } from "src/Entity/Skill/enums";
import { ClericSkill } from ".";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { Character } from "src/Entity/Character/Character";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { BuffEnum, DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { ActorEffect, TargetEffect } from "src/Entity/Skill/effects";
import { getTarget } from "src/Entity/Battle/getTarget";

export const bind = new ClericSkill({
  id: ClericSkillId.Bind,
  name: {
    en: "Bind",
    th: "พันธนาการ",
  },
  description: {
    text: {
      en: "Try to bind an enemy, causing them to become Stunned. \nEnemy must roll DC{5}'10':'8'{/} + 1 per Faith stack vs WIL save. \nOn failure: Target gains Stun debuff for 1 turn. \nConsumes 1 Faith stack after use.",
      th: "พยายามพันธนาการศัตรูทำให้เกิด Stun \nศัตรูต้องทอย DC{5}'10':'8'{/} + 1 ต่อศรัทธา vs WIL save \nหากล้มเหลว: เป้าหมายได้รับ Stun เป็นเวลา 1 เทิร์น \nใช้ศรัทธา 1 หลังจากใช้",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 5,
    sp: 0,
    elements: [
      { element: "order", value: 1 },
    ],
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
    _location: LocationsEnum,
  ) => {
    // Get target enemy
    const target = getTarget(actor, actorParty, targetParty, "enemy").one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to bind but has no target`,
          th: `${actor.name.th} พยายามพันธนาการแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Get Faith stacks
    const faithEntry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.faith);
    const faithStacks = faithEntry?.value || 0;

    // Calculate DC: DC8 (DC10 at level 5) + 1 per Faith stack
    const baseDC = skillLevel >= 5 ? 10 : 8;
    const dc = baseDC + faithStacks;

    // Target makes willpower save
    const saveRoll = target.rollSave("willpower");

    // Consume 1 Faith stack after use (regardless of success/failure)
    if (faithEntry && faithEntry.value > 0) {
      faithEntry.value -= 1;
      if (faithEntry.value === 0) {
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.faith);
      }
    }

    if (saveRoll < dc) {
      // Save failed: apply Stun debuff for 1 turn
      debuffsRepository[DebuffEnum.stun].appender(target, { turnsAppending: 1 });

      return {
        content: {
          en: `${actor.name.en} binds ${target.name.en}! ${target.name.en} failed the save (DC${dc}) and is stunned!`,
          th: `${actor.name.th} พันธนาการ ${target.name.th}! ${target.name.th} ล้มเหลวในการเซฟ (DC${dc}) และถูกทำให้มึนงง!`,
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
    } else {
      // Save succeeded: no effect
      return {
        content: {
          en: `${actor.name.en} attempts to bind ${target.name.en}, but ${target.name.en} resists (DC${dc}, rolled ${saveRoll})!`,
          th: `${actor.name.th} พยายามพันธนาการ ${target.name.th} แต่ ${target.name.th} ต้านทานได้ (DC${dc}, ทอยได้ ${saveRoll})!`,
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
    }
  },
});

