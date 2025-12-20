import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const foreseen = new BuffDef({
  name: {
    en: "Foreseen",
    th: "มองเห็นล่วงหน้า",
  },
  description: {
    en: "First attack or debuff that would hit you must roll a LUK save vs DC8 + caster's LUK mod. If failed, the effect misses. Remove Foreseen after triggering.",
    th: "การโจมตีหรือการลดสถานะครั้งแรกที่จะโดนคุณ ต้องทอย LUK save เทียบกับ DC8 + LUK mod ของผู้ใช้สกิล หากล้มเหลว ผลกระทบจะพลาด จะลบ Foreseen หลังจากการใช้",
  },
  formula: "LUK save vs DC8 + caster's LUK mod (stored in counter)",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value, universalCounter: luckMod } = options;

    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.foreseen);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.foreseen, {
        value: value,
        counter: luckMod || 0, // Store caster's LUK mod
      });
    } else {
      // If buff already exists, extend duration but keep the highest LUK mod
      entry.value += value;
      if (luckMod !== undefined && luckMod > (entry.counter || 0)) {
        entry.counter = luckMod;
      }
    }

    return {
      en: `${actor.name.en} is marked with Foreseen for ${value} turn(s)!`,
      th: `${actor.name.th} ถูกทำเครื่องหมายด้วย Foreseen เป็นเวลา ${value} เทิร์น!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    // Foreseen doesn't decrease automatically per turn
    // It only gets removed after being triggered in damage resolution
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.foreseen);
    if (entry && entry.value === 0) {
      actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.foreseen);
    }

    return {
      canAct: true,
      content: {
        en: ``,
        th: ``,
      },
    };
  },
});

