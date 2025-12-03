import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import {BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const arcaneShield = new BuffDef({
  name: {
    en: "arcaneShield",
    th: "โล่เวทมนตร์",
  },
  description: {
    en: "A magical shield that protects the character. Each stack absorbs 1 point of damage.",
    th: "โล่เวทมนตร์ที่ปกป้องตัวละคร สแต็กที่มีอยู่จะดูดซับ 1 หน่วยของความเสียหาย",
  },
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.arcaneShield);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.arcaneShield, {
        value: value,
        counter: 0,
      });
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} got arcane shield buff: value goes up by ${value}`,
      th: `${actor.name.th} ได้รับ "โล่เวทมนตร์" ${value} หน่วย`,
    };
  },
  // Arcane shield won't go down by itself,
  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.arcaneShield);
    if (entry && entry.value === 0) {
      actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.arcaneShield);
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
