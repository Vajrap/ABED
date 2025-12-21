import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ClericSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { roll } from "src/Utils/Dice";
import { statMod } from "src/Utils/statMod";
import { ClericSkill } from "./index";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const massHeal = new ClericSkill({
  id: ClericSkillId.MassHeal,
  name: {
    en: "Mass Heal",
    th: "รักษาหมู่",
  },
  description: {
    text: {
      en: "Cast a mass healing spell, restore all living allies. \nHeals for <FORMULA>. \n{5}\nThen [b]removes one random debuff[/b] from each healed ally.{/}",
      th: "ร่ายเวทย์มนต์รักษาหมู่ ฟื้นฟูเพื่อนร่วมทีมทุกคนที่ยังมีชีวิต \nรักษา <FORMULA> \n{5}\nจากนั้น[b]ลบหนึ่งดีบัฟแบบสุ่ม[/b]จากพันธมิตรที่ได้รับการรักษาแต่ละคน{/}",
    },
    formula: {
      en: "1d6 + (<WILmod> + <CHAmod>) / 2 + skill level",
      th: "1d6 + (<WILmod> + <CHAmod>) / 2 + เลเวลสกิล",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  cooldown: 4,
  consume: {
    hp: 0,
    mp: 6,
    sp: 0,
    elements: [
      { element: "order", value: 2 },
      { element: "water", value: 1 },
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
    const livingAllies = actorParty.filter((ally) => !ally.vitals.isDead);

    if (livingAllies.length === 0) {
      return {
        content: {
          en: `${actor.name.en} tried to cast Mass Heal but has no allies to heal`,
          th: `${actor.name.th} พยายามใช้รักษาหมู่แต่ไม่มีพันธมิตรให้รักษา`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const willpowerMod = statMod(actor.attribute.getTotal("willpower"));
    const charismaMod = statMod(actor.attribute.getTotal("charisma"));
    const totalMod = (willpowerMod + charismaMod)/2;
    const removedDebuffMessages: string[] = [];
    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];

    for (const ally of livingAllies) {
      // Healing effectiveness enhanced by charisma (inspiring presence)
      // Healing dice - should not get bless/curse
      const healAmount = actor.roll({
        amount: 1,
        face: 6,
        applyBlessCurse: false,
      }) + totalMod + skillLevel;
      ally.vitals.incHp(healAmount);

      if (skillLevel >= 5) {
        const debuffs = Array.from(ally.buffsAndDebuffs.debuffs.entry.keys());
        if (debuffs.length > 0) {
          const randomId = debuffs[Math.floor(Math.random() * debuffs.length)]!;
          ally.buffsAndDebuffs.debuffs.entry.delete(randomId);
          removedDebuffMessages.push(`${ally.name.en} was cleansed of a debuff.`);
        }
      }

      targetEffects.push({
        actorId: ally.id,
        effect: [TargetEffect.TestSkill],
      });
    }

    // Apply cooldown debuff
    debuffsRepository.massHealCooldown.appender(actor, { turnsAppending: 4 });

    const summary = livingAllies
      .map((ally) => ally.name.en)
      .join(", ");

    return {
      content: {
        en: `${actor.name.en} unleashed Mass Heal, restoring the party (${summary}). ${removedDebuffMessages.join(" ")}`.trim(),
        th: `${actor.name.th} ใช้รักษาหมู่กับทุกคน (${summary}).${removedDebuffMessages.length ? " ชำระล้างดีบัฟเรียบร้อย" : ""}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: targetEffects,
    };
  },
});
