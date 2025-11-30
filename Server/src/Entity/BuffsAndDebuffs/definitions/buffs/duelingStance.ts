import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const duelingStance = new BuffDef({
  name: {
    en: "Dueling Stance",
    th: "ท่าดวล",
  },
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const {
      turnsAppending: value,
      isPerm = options.isPerm || false,
      permanentCounter = 0,
      universalCounter = options.universalCounter || 0,
    } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.duelingStance);
    if (!entry) {
      actor.battleStats.mutateBattle('pHIT', 2);
      actor.battleStats.mutateBattle('mHIT', 2);
      actor.battleStats.mutateBattle('dodge', 2);
      actor.battleStats.mutateBattle('pCRT', universalCounter);
      actor.battleStats.mutateBattle('mCRT', universalCounter);
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.duelingStance, {
        value: value,
        isPerm: isPerm,
        permValue: permanentCounter,
        counter: universalCounter,
      });
    } else {
      // won't mutate the universal counter when applied new stack, even if it's higher.
      if (isPerm) {
        entry.isPerm = true;
      }
      entry.value += value;
    }

    return {
      en: `${actor.name.en} adopts a focused dueling stance!`,
      th: `${actor.name.th} ใช้ท่าดวลที่มุ่งเน้น!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.duelingStance);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      } else if (entry.value === 0) {
        if (!entry.isPerm) {
          actor.battleStats.mutateBattle('pHIT', -2);
          actor.battleStats.mutateBattle('mHIT', -2);
          actor.battleStats.mutateBattle('dodge', -2);
          actor.battleStats.mutateBattle('pCRT', -entry.counter);
          actor.battleStats.mutateBattle('mCRT', -entry.counter);
          actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.duelingStance);
        }
      }
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} Dueling Stance duration decreased`,
        th: `${actor.name.th} "ท่าดวล" ลดลง`,
      },
    };
  },
});

