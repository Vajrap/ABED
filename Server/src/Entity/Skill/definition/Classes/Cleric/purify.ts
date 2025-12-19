import { ClericSkillId } from "src/Entity/Skill/enums";
import { ClericSkill } from ".";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { Character } from "src/Entity/Character/Character";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { ActorEffect, TargetEffect } from "src/Entity/Skill/effects";
import { getTarget } from "src/Entity/Battle/getTarget";

export const purify = new ClericSkill({
  id: ClericSkillId.Purify,
  name: {
    en: "Purify",
    th: "ชำระล้าง",
  },
  description: {
    text: {
      en: "Randomly remove debuff from {5}'2':'1'{/} ally. Gain 1 Faith stack when successfully removing a debuff.",
      th: "ลบดีบัฟสุ่มจากพันธมิตร {5}'2':'1'{/} คน. ได้รับ 1 ศรัทธาเมื่อลบดีบัฟสำเร็จ",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 4,
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
    _targetParty: Character[],
    skillLevel: number,
    _location: LocationsEnum,
  ) => {
    // Get targets: 1 ally at base, 2 allies at level 5
    const targetCount = skillLevel >= 5 ? 2 : 1;
    const targets = getTarget(actor, actorParty, _targetParty, "ally")
      .many(targetCount);

    if (targets.length === 0) {
      return {
        content: {
          en: `${actor.name.en} tried to purify but has no ally to cleanse`,
          th: `${actor.name.th} พยายามชำระล้างแต่ไม่มีพันธมิตรให้ชำระล้าง`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const cleansedAllies: Character[] = [];
    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    let faithGained = 0;

    for (const target of targets) {
      // Check if target has debuffs
      if (target.buffsAndDebuffs.debuffs.entry.size > 0) {
        // Get all debuff entries
        const debuffEntries = Array.from(
          target.buffsAndDebuffs.debuffs.entry.entries(),
        );
        // Pick random debuff
        const randomIndex = Math.floor(Math.random() * debuffEntries.length);
        const [randomDebuffId] = debuffEntries[randomIndex]!;
        // Remove the debuff
        target.buffsAndDebuffs.debuffs.entry.delete(randomDebuffId);
        cleansedAllies.push(target);
        // Gain 1 Faith stack for successful removal
        buffsRepository[BuffEnum.faith].appender(actor, { turnsAppending: 1 });
        faithGained++;
      }

      targetEffects.push({
        actorId: target.id,
        effect: [TargetEffect.TestSkill],
      });
    }

    // Build response message
    let message = "";
    if (cleansedAllies.length > 0) {
      const cleansedNames = cleansedAllies.map(ally => ally.name.en).join(", ");
      message = `${actor.name.en} purified ${cleansedNames}, removing debuffs.`;
      if (faithGained > 0) {
        message += ` Gained ${faithGained} Faith stack(s).`;
      }
    } else {
      message = `${actor.name.en} attempted to purify allies, but no debuffs were found.`;
    }

    const cleansedNamesTh = cleansedAllies.map(ally => ally.name.th).join(", ");

    return {
      content: {
        en: message,
        th: cleansedAllies.length > 0
          ? `${actor.name.th} ชำระล้าง ${cleansedNamesTh}, ลบดีบัฟเรียบร้อย${faithGained > 0 ? `. ได้รับ ${faithGained} ศรัทธา` : ""}`
          : `${actor.name.th} พยายามชำระล้างพันธมิตรแต่ไม่พบดีบัฟ`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: targetEffects,
    };
  },
});

