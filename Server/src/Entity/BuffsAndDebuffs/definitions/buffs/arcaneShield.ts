import type { Character } from "src/Entity/Character/Character";
import { BuffDef } from "../../type";
import {BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const arcaneShield = new BuffDef({
  name: {
    en: "arcaneShield",
    th: "โล่เวทมนตร์",
  },
  appender: function (
    actor: Character,
    value: number,
  ): L10N {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.arcaneShield);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.arcaneShield, {
        value: value,
        isPerm: false,
        permValue: 0,
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
