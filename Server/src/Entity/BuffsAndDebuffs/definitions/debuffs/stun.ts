import type { Character } from "src/Entity/Character/Character";
import { DebuffDef, type AppenderOptions } from "../../type";
import { DebuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { rollTwenty } from "src/Utils/Dice";
import { statMod } from "src/Utils/statMod";

export const stun = new DebuffDef({
  name: {
    en: "Stun",
    th: "มึนงง",
  },
  description: {
    en: "Prevents the target from acting. Each turn, the target can attempt a save: d20 + Endurance modifier vs DC 10 + stun value. On success, the stun is removed.",
    th: "ป้องกันไม่ให้เป้าหมายทำการได้ ในแต่ละเทิร์นเป้าหมายสามารถพยายามเซฟ: d20 + โมดิไฟเออร์ความอดทน กับ DC 10 + ค่า stun หากสำเร็จ stun จะถูกลบ",
  },
  formula: "<EndSave> vs DC (10 + stun value)",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.stun);
    if (!entry) {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.stun, {
        value: value,
        counter: 0,
      });
    } else {
      entry.value += value;
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
      } else if (entry.value === 0 ) {
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

