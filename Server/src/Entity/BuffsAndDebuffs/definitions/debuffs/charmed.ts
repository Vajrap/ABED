import type { Character } from "src/Entity/Character/Character";
import { DebuffDef, type AppenderOptions } from "../../type";
import { DebuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const charmed = new DebuffDef({
  name: {
    en: "Charmed",
    th: "สะกดจิต",
  },
  description: {
    en: "When attacking, this character confuse on who's the enemy, need to roll <Formula> if fail, the target will be of opposite group from their intention.",
    th: "เมื่อโจมตี ตัวละครจะสับสนว่าใครเป็นศัตรู ต้องทอย <Formula> หากล้มเหลว เป้าหมายจะอยู่ในกลุ่มตรงข้ามกับความตั้งใจของตัวละคร",
  },
  formula: "<WilSave> vs DC 15",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.charmed);
    if (!entry) {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.charmed, {
        value: value,
        counter: 0,
      });
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} is charmed!`,
      th: `${actor.name.th} ถูกสะกดจิต!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.charmed);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      } else if (entry.value === 0) {
        actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.charmed);
      }
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} Charmed duration decreased`,
        th: `${actor.name.th} "สะกดจิต" ลดลง`,
      },
    };
  },
});

