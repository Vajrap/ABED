import { ClericSkillId } from "src/Entity/Skill/enums";
import { ClericSkill } from ".";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { Character } from "src/Entity/Character/Character";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { ActorEffect, TargetEffect } from "src/Entity/Skill/effects";
import { getTarget } from "src/Entity/Battle/getTarget";

export const revive = new ClericSkill({
  id: ClericSkillId.Revive,
  name: {
    en: "Revive",
    th: "ฟื้นคืนชีพ",
  },
  description: {
    text: {
      en: "Attempt to bring a fallen ally back to life. \nRoll DC{5}'13':'15'{/} vs (WIL mod + Faith stacks). \nOn success: Target is revived with {5}'35':'25'{/}% HP. \nOn failure: Half of Faith stacks are returned (rounded down). \nAll Faith stacks are consumed after use.",
      th: "พยายามนำพันธมิตรที่ล้มลงกลับคืนชีพ \nทอย DC{5}'13':'15'{/} vs (WIL mod + ศรัทธา) \nหากสำเร็จ: เป้าหมายฟื้นคืนชีพด้วย HP {5}'35':'25'{/}% \nหากล้มเหลว: ได้รับศรัทธาคืนครึ่งหนึ่ง (ปัดลง) \nศรัทธาทั้งหมดจะถูกใช้หลังจากใช้แล้ว",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.rare,
  consume: {
    hp: 0,
    mp: 6,
    sp: 0,
    elements: [
      { element: "order", value: 2 },
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
    _targetParty: Character[],
    skillLevel: number,
    _location: LocationsEnum,
  ) => {
    // Get a random dead ally
    const target = getTarget(actor, actorParty, _targetParty, "ally")
      .dead("only")
      .one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to revive but has no fallen ally`,
          th: `${actor.name.th} พยายามฟื้นคืนชีพแต่ไม่มีพันธมิตรที่ล้มลง`,
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

    // Calculate save: DC15 (DC13 at level 5) vs (WIL mod + Faith stacks)
    const baseDC = skillLevel >= 5 ? 13 : 15;
    const saveRoll = actor.rollTwenty({stat: "willpower"}) + faithStacks;

    // Remove all Faith stacks (consumed regardless of success/failure)
    if (faithEntry && faithEntry.value > 0) {
      actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.faith);
    }

    if (saveRoll >= baseDC) {
      // Success: Revive with 25% HP (35% at level 5)
      const hpPercentage = skillLevel >= 5 ? 0.35 : 0.25;
      const reviveHp = Math.floor(target.vitals.hp.max * hpPercentage);
      target.vitals.hp.setCurrent(reviveHp);

      return {
        content: {
          en: `${actor.name.en} successfully revives ${target.name.en} with ${reviveHp} HP (${Math.floor(hpPercentage * 100)}% of max)!`,
          th: `${actor.name.th} ฟื้นคืนชีพ ${target.name.th} สำเร็จด้วย ${reviveHp} HP (${Math.floor(hpPercentage * 100)}% ของสูงสุด)!`,
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
      // Failure: Return half of Faith stacks (rounded down)
      const returnedStacks = Math.floor(faithStacks / 2);
      if (returnedStacks > 0) {
        buffsRepository[BuffEnum.faith].appender(actor, { turnsAppending: returnedStacks });
      }

      return {
        content: {
          en: `${actor.name.en} attempts to revive ${target.name.en}, but the attempt fails.${returnedStacks > 0 ? ` ${returnedStacks} Faith stack(s) returned.` : ""}`,
          th: `${actor.name.th} พยายามฟื้นคืนชีพ ${target.name.th} แต่ล้มเหลว${returnedStacks > 0 ? ` ได้รับ ${returnedStacks} ศรัทธาคืน` : ""}`,
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

