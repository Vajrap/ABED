import { Character } from "src/Entity/Character/Character";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { DebuffDef } from "../../type";
import { DebuffEnum } from "../../enum";

export const healCooldown = new DebuffDef({
  name: {
    en: "heal: cooldown",
    th: "heal: cooldown",
  },
  appender: function (actor: Character, value: number): L10N {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(
      DebuffEnum.healCooldown,
    );
    if (!entry) {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.healCooldown, {
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
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(
      DebuffEnum.healCooldown,
    );
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      }
    }
    if (entry && entry.value === 0) {
      actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.healCooldown);
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

