import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MageSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect } from "../../../effects";
import { MageSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const windFury = new MageSkill({
  id: MageSkillId.WindFury,
  name: { en: "Wind Fury", th: "ความโกรธของลม" },
  description: {
    text: {
      en: "Enter a heightened flow state with wind energy. Gain 2 stacks of Tailwind (3 stacks at level 7) and WindFury buff for 3 turns (4 turns at level 5). WindFury: During WindFury, Tailwind won't decrease.",
      th: "เข้าสู่สถานะการไหลที่สูงขึ้นด้วยพลังงานลม ได้รับ Tailwind 2 สแต็ก (3 สแต็กที่ระดับ 7) และบัฟ WindFury 3 เทิร์น (4 เทิร์นที่ระดับ 5) WindFury: ในช่วง WindFury Tailwind จะไม่ลดลง",
    },
    formula: {
      en: "Tailwind stacks: 2 (3 at level 7). WindFury duration: 3 turns (4 at level 5)",
      th: "สแต็ก Tailwind: 2 (3 ที่ระดับ 7) ระยะเวลา WindFury: 3 เทิร์น (4 ที่ระดับ 5)",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.rare,
  consume: { hp: 0, mp: 5, sp: 0, elements: [{ element: "wind", value: 2 }] },
  produce: {
    hp: 0, mp: 0, sp: 0,
    elements: [{ element: "neutral", min: 1, max: 1 }],
  },
  exec: (actor: Character, _ally: Character[], _enemies: Character[], skillLevel: number, _location) => {
    // Check if WindFury buff is already active - can't use if it is
    const windFuryEntry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.windFury);
    if (windFuryEntry && windFuryEntry.value > 0) {
      return {
        content: {
          en: `${actor.name.en} tried to use Wind Fury but is already in a Wind Fury state!`,
          th: `${actor.name.th} พยายามใช้ Wind Fury แต่อยู่ในสถานะ Wind Fury อยู่แล้ว!`,
        },
        actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
        targets: [],
      };
    }
    
    // Gain Tailwind stacks: 2 stacks (3 at level 7)
    const tailwindStacks = skillLevel >= 7 ? 3 : 2;
    const tailwindResult = buffsAndDebuffsRepository.tailwind.appender(actor, { turnsAppending: tailwindStacks });
    
    // Gain WindFury buff: 3 turns (4 turns at level 5)
    const windFuryDuration = skillLevel >= 5 ? 4 : 3;
    const windFuryResult = buffsAndDebuffsRepository.windFury.appender(actor, { turnsAppending: windFuryDuration });

    const turnResult: TurnResult = {
      content: {
        en: `${tailwindResult.en} ${windFuryResult.en}`,
        th: `${tailwindResult.th} ${windFuryResult.th}`,
      },
      actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
      targets: [],
    };
    return turnResult;
  },
});

