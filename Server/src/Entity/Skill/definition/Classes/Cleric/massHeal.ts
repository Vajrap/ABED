import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ClericSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { roll } from "src/Utils/Dice";
import { statMod } from "src/Utils/statMod";
import { ClericSkill } from "./index";

export const massHeal = new ClericSkill({
  id: ClericSkillId.MassHeal,
  name: {
    en: "Mass Heal",
    th: "รักษาหมู่",
  },
  description: {
    en: "Restore all living allies for 1d6 + willpower modifier + skill level HP. At level 4+, also removes one random debuff from each healed ally.",
    th: "ฟื้นฟูเพื่อนร่วมทีมทุกคนที่ยังมีชีวิต 1d6 + ค่าต้านทานจิต (willpower) + เลเวลสกิล และเมื่อเลเวลสกิล 4 ขึ้นไปจะชำระล้างดีบัฟแบบสุ่ม 1 ชนิดต่อพันธมิตรที่รักษาได้",
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
    const removedDebuffMessages: string[] = [];
    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];

    for (const ally of livingAllies) {
      const healAmount = Math.max(
        1,
        roll(1).d(6).total + willpowerMod + skillLevel,
      );
      const before = ally.vitals.hp.current;
      ally.vitals.incHp(healAmount);
      const actualHeal = ally.vitals.hp.current - before;

      if (skillLevel >= 4) {
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
