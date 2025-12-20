import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const windFury = new BuffDef({
  name: {
    en: "Wind Fury",
    th: "ความโกรธของลม",
  },
  description: {
    en: "During WindFury, Tailwind won't decrease.",
    th: "ในช่วง WindFury Tailwind จะไม่ลดลง",
  },
  formula: "Prevents Tailwind from decreasing",
  appender: function (actor: Character, options: AppenderOptions): L10N {
    const { turnsAppending: value } = options;
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.windFury);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.windFury, {
        value: value,
        counter: 0,
      });
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} entered Wind Fury! Tailwind won't decrease.`,
      th: `${actor.name.th} เข้าสู่ Wind Fury! Tailwind จะไม่ลดลง`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.windFury);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      }
    }
    if (entry && entry.value === 0) {
      actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.windFury);
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} Wind Fury duration decreased`,
        th: `${actor.name.th} Wind Fury ระยะเวลาลดลง`,
      },
    };
  },
});

