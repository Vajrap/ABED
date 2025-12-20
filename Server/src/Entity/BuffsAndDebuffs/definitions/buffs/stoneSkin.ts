import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const stoneSkin = new BuffDef({
  name: {
    en: "Stone Skin",
    th: "ผิวหิน",
  },
  description: {
    en: "Grants <FORMULA>.",
    th: "ให้ <FORMULA>",
  },
  formula: "pDEF +2",
  appender: function (actor: Character, options: AppenderOptions): L10N {
    const { turnsAppending: value } = options;
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.stoneSkin);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.stoneSkin, {
        value: value,
        counter: 0,
      });
      actor.battleStats.mutateBonus("pDEF", 2);
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} got Stone Skin buff: pDEF +2`,
      th: `${actor.name.th} ได้รับ "ผิวหิน": pDEF +2`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.stoneSkin);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      }
    }
    if (entry && entry.value === 0) {
      actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.stoneSkin);
      actor.battleStats.mutateBonus("pDEF", -2);
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} Stone Skin decreased: value goes down by 1`,
        th: `${actor.name.th} "ผิวหิน" ลดลง 1 หน่วย`,
      },
    };
  },
});

