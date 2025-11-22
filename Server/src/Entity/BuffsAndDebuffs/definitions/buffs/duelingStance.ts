import type { Character } from "src/Entity/Character/Character";
import { BuffDef } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const duelingStance = new BuffDef({
  name: {
    en: "Dueling Stance",
    th: "ท่าดวล",
  },
  appender: function (
    actor: Character,
    value: number,
    isPerm: boolean,
    permValue: number,
  ): L10N {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.duelingStance);
    if (!entry) {
      // Store skill level indicator in permValue (0 = not level 5, 1 = level 5+)
      // Mods will be recalculated in damageResolution
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.duelingStance, {
        value: value,
        isPerm: isPerm,
        permValue: permValue, // Store level 5 indicator
      });
    } else {
      if (!entry.isPerm && isPerm) {
        entry.isPerm = true;
      }
      entry.value += value;
      // Use higher level indicator
      entry.permValue = Math.max(entry.permValue, permValue);
    }

    return {
      en: `${actor.name.en} adopts a focused dueling stance!`,
      th: `${actor.name.th} ใช้ท่าดวลที่มุ่งเน้น!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.duelingStance);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      } else if (entry.value === 0 && entry.permValue === 0) {
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.duelingStance);
      }
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} Dueling Stance duration decreased`,
        th: `${actor.name.th} "ท่าดวล" ลดลง`,
      },
    };
  },
});

