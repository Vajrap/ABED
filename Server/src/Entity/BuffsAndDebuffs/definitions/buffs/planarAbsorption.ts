import type { Character } from "src/Entity/Character/Character";
import { BuffDef } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const planarAbsorption = new BuffDef({
  name: {
    en: "Planar Absorption",
    th: "ดูดซับพลัง",
  },
  appender: function (
    actor: Character,
    value: number,
    isPerm: boolean,
    permValue: number,
  ): L10N {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.planarAbsorption);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.planarAbsorption, {
        value: value,
        isPerm: isPerm,
        permValue: permValue,
      });
    } else {
      if (!entry.isPerm && isPerm) {
        entry.isPerm = true;
      }
      entry.value += value;
      entry.permValue += permValue;
    }

    return {
      en: `${actor.name.en} gained Planar Absorption: ${value + permValue} stacks`,
      th: `${actor.name.th} ได้รับ "ดูดซับพลัง": ${value + permValue} หน่วย`,
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

