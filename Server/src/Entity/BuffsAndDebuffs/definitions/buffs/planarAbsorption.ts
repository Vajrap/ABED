import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const planarAbsorption = new BuffDef({
  name: {
    en: "Planar Absorption",
    th: "ดูดซับพลัง",
  },
  description: {
    en: "Each stack can absorb 1 magical damage.",
    th: "สแต็กสามารถดูดซับ 1 หน่วยของความเสียหายเวทมนตร์",
  },
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.planarAbsorption);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.planarAbsorption, {
        value: value,
        counter: 0,
      });
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} gained Planar Absorption: ${value } stacks`,
      th: `${actor.name.th} ได้รับ "ดูดซับพลัง": ${value } หน่วย`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.planarAbsorption);
    if (entry && entry.value === 0 ) {
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

