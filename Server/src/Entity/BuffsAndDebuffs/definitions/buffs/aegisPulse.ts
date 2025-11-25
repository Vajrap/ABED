import type { Character } from "src/Entity/Character/Character";
import { BuffDef } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const aegisPulse = new BuffDef({
  name: {
    en: "Aegis Pulse",
    th: "คลื่นป้องกันศักดิ์สิทธิ์",
  },
  appender: function (
    actor: Character,
    value: number,
    isPerm: boolean,
    permValue: number,
  ): L10N {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.aegisPulse);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.aegisPulse, {
        value: value,
        isPerm: isPerm,
        permValue: permValue,
        counter: 0,
      });
    } else {
      if (!entry.isPerm && isPerm) {
        entry.isPerm = true;
      }
      entry.value += value;
      entry.permValue += permValue;
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
    // Only clean up if both value and permValue are 0
    if (entry && entry.value === 0 && entry.permValue === 0) {
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

