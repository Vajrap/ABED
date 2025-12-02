import { Character } from "src/Entity/Character/Character";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { DebuffDef, type AppenderOptions } from "../../type";
import { DebuffEnum } from "../../enum";

export const bearTrap = new DebuffDef({
  name: {
    en: "Bear Trap",
    th: "กับดักหมี",
  },
  appender: function (actor: Character, options: AppenderOptions): L10N {
    const { turnsAppending: value, permanentCounter: trapDamage } = options;
    // permanentCounter stores the trap damage (repurposed for this use case)
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.bearTrap);
    if (!entry) {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.bearTrap, {
        value: value,
        isPerm: false,
        permValue: trapDamage || 0, // Store trap damage
        counter: 0,
      });
    } else {
      entry.value += value;
      if (trapDamage !== undefined) {
        entry.permValue = trapDamage; // Update trap damage if provided
      }
    }

    return {
      en: `${actor.name.en} is caught in a bear trap!`,
      th: `${actor.name.th} ติดกับดักหมี!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.bearTrap);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      }
    }
    if (entry && entry.value === 0) {
      actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.bearTrap);
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

