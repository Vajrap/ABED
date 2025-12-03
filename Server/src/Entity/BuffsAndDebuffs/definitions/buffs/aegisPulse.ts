import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const aegisPulse = new BuffDef({
  name: {
    en: "Aegis Pulse",
    th: "คลื่นป้องกันศักดิ์สิทธิ์",
  },
  description: {
    en: "Lingering Aegis shield pulsing after Aegis Shield is depleted by damage.",
    th: "คลื่นป้องกันศักดิ์สิทธิ์ที่คงอยู่หลังจากโล่ป้องกันศักดิ์สิทธิ์ถูกลดลงจากความเสียหาย",
  },
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.aegisPulse);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.aegisPulse, {
        value: value,
        counter: 0,
      });
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} gained Aegis Pulse!`,
      th: `${actor.name.th} ได้รับคลื่นป้องกันศักดิ์สิทธิ์!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    // Aegis Pulse should be removed when it is used. Not depleted by itself.
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.aegisPulse);
    // Don't decrease value by itself - it's removed when the skill is used
    // Only clean up if value is 0
    if (entry && entry.value === 0 ) {
      actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.aegisPulse);
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

