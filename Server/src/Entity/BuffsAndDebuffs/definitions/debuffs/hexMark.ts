import type { Character } from "src/Entity/Character/Character";
import { DebuffDef, type AppenderOptions } from "../../type";
import { DebuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const hexMark = new DebuffDef({
  name: {
    en: "Hex Mark",
    th: "เครื่องหมายสาป",
  },
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const {
      turnsAppending: value,
      isPerm = false,
      permanentCounter = 0,
    } = options;
    
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.hexMark);
    if (!entry) {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.hexMark, {
        value: value,
        isPerm: isPerm,
        permValue: permanentCounter,
        counter: 0,
      });
    } else {
      if (!entry.isPerm && isPerm) {
        entry.isPerm = true;
      }
      entry.value += value;
      entry.permValue = Math.max(entry.permValue, permanentCounter);
    }

    return {
      en: `${actor.name.en} is marked with a hex sigil!`,
      th: `${actor.name.th} ถูกทำเครื่องหมายด้วยเครื่องหมายสาป!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.hexMark);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      } else if (entry.value === 0 && entry.permValue === 0) {
        actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.hexMark);
      }
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} Hex Mark duration decreased`,
        th: `${actor.name.th} "เครื่องหมายสาป" ลดลง`,
      },
    };
  },
});

