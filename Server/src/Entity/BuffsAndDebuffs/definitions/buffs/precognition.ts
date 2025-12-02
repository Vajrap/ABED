import { Character } from "src/Entity/Character/Character";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";

export const precognition = new BuffDef({
  name: {
    en: "Precognition",
    th: "การคาดการณ์",
  },
  appender: function (actor: Character, options: AppenderOptions): L10N {
    const { turnsAppending: value } = options;
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.precognition);
    let isFirst = false;
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.precognition, {
        value: value,
        isPerm: false,
        permValue: 0,
        counter: 0,
      });
      isFirst = true;
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} gained Precognition buff for ${value} turn(s)${isFirst ? "." : " (extended)."}`,
      th: `${actor.name.th} ได้รับการคาดการณ์ ${value} เทิร์น${isFirst ? "" : " (ขยายเวลา)"}`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    let isRemoved = false;
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.precognition);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      }
    }
    if (entry && entry.value === 0) {
      actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.precognition);
      isRemoved = true;
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en}'s Precognition ${isRemoved ? "expired" : "decreased by 1 turn"}.`,
        th: `${actor.name.th} การคาดการณ์${isRemoved ? "หมดอายุ" : "ลดลง 1 เทิร์น"}.`,
      },
    };
  },
});

