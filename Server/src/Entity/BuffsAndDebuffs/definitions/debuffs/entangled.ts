import type { Character } from "src/Entity/Character/Character";
import { DebuffDef, type AppenderOptions } from "../../type";
import { DebuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { rollTwenty } from "src/Utils/Dice";
import { statMod } from "src/Utils/statMod";

export const entangled = new DebuffDef({
  name: {
    en: "Entangled",
    th: "พันกัน",
  },
  description: {
    en: "The target is entangled. Each turn, the target must roll <FORMULA> or skip their turn. On success, they break free.",
    th: "เป้าหมายถูกพันกัน ในแต่ละเทิร์นเป้าหมายต้องทอย DC 10 Strength save หรือข้ามเทิร์น หากสำเร็จจะหลุดพ้น",
  },
  formula: "DC10 <STRsave>",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.entangled);
    if (!entry) {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.entangled, {
        value: value,
        counter: 0,
      });
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} is entangled!`,
      th: `${actor.name.th} ถูกพันกัน!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.entangled);
    let canAct = true;
    let skipped = false;
    if (entry && entry.value > 0) {
      // When take turns, must roll DC10 strength save or skip the turn
      const saveRoll = rollTwenty().total + statMod(actor.attribute.getTotal("strength"));
      if (saveRoll < 10) {
        canAct = false;
        skipped = true;
      }
      entry.value -= 1;
      if (entry.value === 0 ) {
        actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.entangled);
      }
    }

    return {
      canAct: canAct,
      content: {
        en: skipped ? `${actor.name.en} is entangled and cannot act!` : canAct ? `${actor.name.en} broke free from entanglement!` : ``,
        th: skipped ? `${actor.name.th} ถูกพันกันและไม่สามารถทำการได้!` : canAct ? `${actor.name.th} หลุดพ้นจากการพันกัน!` : ``,
      },
    };
  },
});

