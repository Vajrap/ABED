import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const rage = new BuffDef({
  name: {
    en: "Rage",
    th: "เดือดดาล",
  },
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const {
      turnsAppending: value,
      isPerm = false,
      permanentCounter = 0,
    } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.rage);
    if (!entry) {
      actor.battleStats.mutateBattle("pATK", 2);
      actor.battleStats.mutateBattle("pDEF", -2);
      actor.battleStats.mutateBattle("mDEF", -2);

      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.rage, {
        value,
        isPerm,
        permValue: permanentCounter,
        counter: 0,
      });
    } else {
      if (!entry.isPerm && isPerm) {
        entry.isPerm = true;
      }
      entry.value += value;
      entry.permValue += permanentCounter;
    }

    return {
      en: `${actor.name.en} is consumed by Rage! (+2 pATK, -2 pDEF/mDEF)`,
      th: `${actor.name.th} ถูกโทสะครอบงำ! (+2 pATK, -2 pDEF/mDEF)`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.rage);
    let removed = false;
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      } else if (entry.value === 0 && entry.permValue === 0) {
        actor.battleStats.mutateBattle("pATK", -2);
        actor.battleStats.mutateBattle("pDEF", 2);
        actor.battleStats.mutateBattle("mDEF", 2);
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.rage);
        removed = true;
      }
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en}'s Rage ${removed ? "fades" : "ticks down"}`,
        th: `${actor.name.th} ความเดือดดาล${removed ? "จางหาย" : "ลดลง"}`,
      },
    };
  },
});


