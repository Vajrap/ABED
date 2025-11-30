import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const planarAbsorption = new BuffDef({
  name: {
    en: "Planar Absorption",
    th: "ดูดซับพลัง",
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
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.planarAbsorption);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.planarAbsorption, {
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
      entry.permValue += permanentCounter;
    }

    return {
      en: `${actor.name.en} gained Planar Absorption: ${value + permanentCounter} stacks`,
      th: `${actor.name.th} ได้รับ "ดูดซับพลัง": ${value + permanentCounter} หน่วย`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.planarAbsorption);
    if (entry && entry.value === 0 && entry.permValue === 0) {
      actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.planarAbsorption);
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

