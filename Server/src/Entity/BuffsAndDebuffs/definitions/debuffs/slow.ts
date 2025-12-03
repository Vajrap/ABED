import type { Character } from "src/Entity/Character/Character";
import { DebuffDef, type AppenderOptions } from "../../type";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { DebuffEnum } from "../../enum";

export const slow = new DebuffDef({
  name: {
    en: "slow",
    th: "เชื่องช้า",
  },
  description: {
    en: "Reduces agility equal to stack number. While the debuff is active, Character's AB guage gain will be halved.",
    th: "ลดความคล่องแคล่วเท่ากับจำนวนสแต็ก ในขณะที่บัฟเปิดใช้งาน ความเร็วของ AB จะลดลงครึ่งหนึ่ง",
  },
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.slow);
    if (!entry) {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.slow, {
        value,
        counter: 0,
      });
    } else {
      entry.value += value;
    }

    actor.attribute.mutateBattle("agility", -value);
    return {
      en: `${actor.name.en} got slow buff: agi goes down by ${value}`,
      th: `${actor.name.th} ได้รับ "เชื่องช้า": agi ลดลง ${value} หน่วย`,
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
