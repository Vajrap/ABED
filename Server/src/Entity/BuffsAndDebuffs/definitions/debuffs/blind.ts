import { Character } from "src/Entity/Character/Character";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { DebuffDef, type AppenderOptions } from "../../type";
import { DebuffEnum } from "../../enum";

export const blind = new DebuffDef({
  name: {
    en: "Blind",
    th: "ตาบอด",
  },
  description: {
    en: "Lose <FORMULA>.",
    th: "สูญเสีย <FORMULA>",
  },
  formula: "-3 pHIT, -3 mHIT",
  appender: function (actor: Character, options: AppenderOptions): L10N {
    const { turnsAppending: value } = options;
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.blind);
    if (!entry) {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.blind, {
        value: value,
        counter: 0,
      });
      // Blind reduces hit roll by 3
      actor.battleStats.mutateBattle("pHIT", -3);
      actor.battleStats.mutateBattle("mHIT", -3);
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} is blinded!`,
      th: `${actor.name.th} ตาบอด!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.blind);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      }
    }
    if (entry && entry.value === 0) {
      // Restore hit roll when blind is removed
      actor.battleStats.mutateBattle("pHIT", 3);
      actor.battleStats.mutateBattle("mHIT", 3);
      actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.blind);
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

