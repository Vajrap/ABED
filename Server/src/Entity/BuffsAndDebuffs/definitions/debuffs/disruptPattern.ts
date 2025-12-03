import { Character } from "src/Entity/Character/Character";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { DebuffDef, type AppenderOptions } from "../../type";
import { DebuffEnum } from "../../enum";

export const disruptPattern = new DebuffDef({
  name: {
    en: "disrupt pattern: cooldown",
    th: "disrupt pattern: cooldown",
  },
  description: {
    en: "Disrupt Pattern: cooldown",
    th: "Disrupt Pattern: cooldown",
  },
  appender: function (actor: Character, options: AppenderOptions): L10N {
    const { turnsAppending: value } = options;
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(
      DebuffEnum.disruptPattern,
    );
    if (!entry) {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.disruptPattern, {
        value: value,
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
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(
      DebuffEnum.disruptPattern,
    );
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      }
    }
    if (entry && entry.value === 0) {
      actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.disruptPattern);
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
