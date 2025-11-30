import type { Character } from "src/Entity/Character/Character";
import { DebuffDef, type AppenderOptions } from "../../type";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { DebuffEnum } from "../../enum";

export const slow = new DebuffDef({
  name: {
    en: "slow",
    th: "เชื่องช้า",
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
    
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.slow);
    if (!entry) {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.slow, {
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

    actor.attribute.mutateBattle("agility", -(value + permanentCounter));
    return {
      en: `${actor.name.en} got slow buff: agi goes down by ${value + permanentCounter}`,
      th: `${actor.name.th} ได้รับ "เชื่องช้า": agi ลดลง ${value + permanentCounter} หน่วย`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.slow);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
        actor.attribute.mutateBattle("agility", 1);
      }
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} slow decreased: agi goes up by 1`,
        th: `${actor.name.th} "เชื่องช้า" ลดลง: agi เพิ่มขึ้น 1 หน่วย`,
      },
    };
  },
});
