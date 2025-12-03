import type { Character } from "src/Entity/Character/Character";
import { DebuffDef, type AppenderOptions } from "../../type";
import { DebuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

/**
 * Generic stat debuff prototype for reducing critical defense.
 * Uses universalCounter to store the stat decrease value.
 * When applying new stacks, only adds to turn count, preserving the original universalCounter.
 */
export const critDef = new DebuffDef({
  name: {
    en: "Reduced Critical Defense",
    th: "การป้องกันคริติคอลลดลง",
  },
  description: {
    en: "Reduces critical defense <COUNTER>",
    th: "ลดการป้องกันคริติคอล <COUNTER>",
  },
  
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const value = options.turnsAppending;
    const counter = options.universalCounter || 0;
    
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.critDef);
    if (!entry) {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.critDef, {
        value: value,
        counter: counter,
      });
      
      return {
        en: `${actor.name.en}'s critical defense is reduced by ${counter}!`,
        th: `${actor.name.th} การป้องกันคริติคอลลดลง ${counter}!`,
      };
    } else {
      // Subsequent applications: only add to turn count, preserve original counter
      entry.value += value;
      // Do NOT modify entry.counter - preserve the original stat decrease value
      
      return {
        en: `${actor.name.en}'s critical defense reduction duration extended`,
        th: `${actor.name.th} ระยะเวลาการลดการป้องกันคริติคอลเพิ่มขึ้น`,
      };
    }
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.critDef);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      }
      if (entry.value === 0) {
        actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.critDef);
      }
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en}'s critical defense reduction duration decreased`,
        th: `${actor.name.th} ระยะเวลาการลดการป้องกันคริติคอลลดลง`,
      },
    };
  },
});

