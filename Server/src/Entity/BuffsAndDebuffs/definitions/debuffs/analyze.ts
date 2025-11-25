import { Character } from "src/Entity/Character/Character";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { DebuffDef } from "../../type";
import { DebuffEnum } from "../../enum";

export const analyze = new DebuffDef({
  name: {
    en: "disrupt pattern: cooldown",
    th: "disrupt pattern: cooldown",
  },
  appender: function (actor: Character, value: number): L10N {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.analyze);
    if (!entry) {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.analyze, {
        value: value,
        isPerm: false,
        permValue: 0,
        counter: 0,
      });
    } else {
      entry.value += value;
    }

    return {
      en: ``,
      th: ``,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.analyze);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      }
    }
    if (entry && entry.value === 0) {
      actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.analyze);
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
