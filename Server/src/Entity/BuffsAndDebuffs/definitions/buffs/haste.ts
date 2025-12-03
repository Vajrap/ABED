import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const haste = new BuffDef({
  name: {
    en: "haste",
    th: "เร่งความเร็ว",
  },
  description: {
    en: "Increases agility by the haste value. While the buff is active, Character's AB guage gain will be doubled.",
    th: "เพิ่มความคล่องแคล่วเท่ากับค่า haste ในขณะที่บัฟเปิดใช้งาน AB จะได้รับประโยชน์จากการทอยความสำเร็จการปกป้องทั้งหมด",
  },
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value,} = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.haste);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.haste, {
        value,
        counter: 0,
      });
    } else { 
      entry!.value += value;
    }
    
    // adding to the existing haste or new haste affect the same amount of agility
    actor.attribute.mutateBattle("agility", value );
    return {
      en: `${actor.name.en} got hasted buff: agi goes up by ${value }`,
      th: `${actor.name.th} ได้รับ "เร่งความเร็ว": agi เพิ่มขึ้น ${value } หน่วย`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.haste);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
        actor.attribute.mutateBattle("agility", -1);
      }
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} hasted decreased: agi goes down by 1`,
        th: `${actor.name.th} "เร่งความเร็ว" ลดลง: agi ลดลง 1 หน่วย`,
      },
    };
  },
});
