import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const reversalPalm = new BuffDef({
  name: {
    en: "Reversal Palm",
    th: "ฝ่ามือพลิก",
  },
  description: {
    en: "Ready to counter attacks. The skill level is stored in universalCounter and remains constant throughout the buff's duration.",
    th: "พร้อมตอบโต้การโจมตี ระดับทักษะถูกเก็บใน universalCounter และคงที่ตลอดระยะเวลาของบัฟ",
  },
  formula: "Skill level stored in universalCounter (constant during buff duration)",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const {
      turnsAppending: value,
      universalCounter = 0,
    } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.reversalPalm);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.reversalPalm, {
        value: value,
        counter: universalCounter, // Store skill level in counter
      });
    } else {
      entry.value += value;
      entry.counter += universalCounter;
    }

    return {
      en: `${actor.name.en} gained Reversal Palm: ready to counter attacks`,
      th: `${actor.name.th} ได้รับ "ฝ่ามือพลิก": พร้อมตอบโต้การโจมตี`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.reversalPalm);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      } else if (entry.value === 0 && entry.counter === 0) {
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.reversalPalm);
      }
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} Reversal Palm duration decreased`,
        th: `${actor.name.th} "ฝ่ามือพลิก" ลดลง`,
      },
    };
  },
});

