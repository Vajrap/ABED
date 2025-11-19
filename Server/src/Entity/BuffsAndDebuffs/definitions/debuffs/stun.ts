import type { Character } from "src/Entity/Character/Character";
import { DebuffDef } from "../../type";
import { DebuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { rollTwenty } from "src/Utils/Dice";
import { statMod } from "src/Utils/statMod";

export const stun = new DebuffDef({
  name: {
    en: "Stun",
    th: "มึนงง",
  },
  appender: function (
    actor: Character,
    value: number,
    isPerm: boolean,
    permValue: number,
  ): L10N {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.stun);
    if (!entry) {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.stun, {
        value: value,
        isPerm: isPerm,
        permValue: permValue,
      });
    } else {
      if (!entry.isPerm && isPerm) {
        entry.isPerm = true;
      }
      entry.value += value;
      entry.permValue += permValue;
    }

    return {
      en: `${actor.name.en} is stunned!`,
      th: `${actor.name.th} ถูกทำให้มึนงง!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.stun);
    let canAct = true;
    if (entry) {
      if (entry.value > 0) {
        canAct = false;
        entry.value -= 1;
        const saveRoll = rollTwenty().total + statMod(actor.attribute.getTotal('endurance'));
        if (saveRoll >= 10 + entry.value) {
            canAct = true;
            entry.value = 0;
        }
      } else if (entry.value === 0 && entry.permValue === 0) {
        actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.stun);
      }
    }

    // Stun prevents actions
    return {
      canAct: !canAct,
      content: {
        en: canAct ? `${actor.name.en} is stunned and cannot act!` : `${actor.name.en} stun decreased`,
        th: canAct ? `${actor.name.th} ถูกทำให้มึนงงและไม่สามารถทำการได้!` : `${actor.name.th} "มึนงง" ลดลง`,
      },
    };
  },
});

