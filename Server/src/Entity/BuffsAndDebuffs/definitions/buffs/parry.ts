import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const parry = new BuffDef({
  name: {
    en: "Parry",
    th: "ปัดป้อง",
  },
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const {
      turnsAppending: value,
      isPerm = false,
      universalCounter = 0,
    } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.parry);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.parry, {
        value: value,
        isPerm: isPerm,
        permValue: 0,
        counter: universalCounter, // Store skill level in counter
      });
    } else {
      if (!entry.isPerm && isPerm) {
        entry.isPerm = true;
      }
      entry.value += value;
      // Use higher skill level
      entry.counter = Math.max(entry.counter, universalCounter);
    }

    return {
      en: `${actor.name.en} assumes a defensive stance, ready to parry and counter!`,
      th: `${actor.name.th} ใช้ท่าป้องกัน พร้อมปัดป้องและตอบโต้!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.parry);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      } else if (entry.value === 0 && entry.counter === 0) {
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.parry);
      }
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} Parry duration decreased`,
        th: `${actor.name.th} "ปัดป้อง" ลดลง`,
      },
    };
  },
});

