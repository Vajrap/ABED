import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const parry = new BuffDef({
  name: {
    en: "Parry",
    th: "ปัดป้อง",
  },
  description: {
    en: "When attacked by a non magical attack, roll DC13 CONsave, if passed, negate the attack and deal <Formula> damage back to the attacker. Remove once counter is used.",
    th: "เมื่อถูกโจมตีด้วยการโจมตีที่ไม่ใช่เวท ทอย save DC13 CON หากสำเร็จ จะยกเลิกการโจมตีและสร้างความเสียหาย <Formula> ต่อผู้โจมตี ลบออกเมื่อตอบโต้ถูกใช้",
  },
  formula: "<WeaponDamage> × <SkillLevelMultiplier>",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const {
      turnsAppending: value,
      
      universalCounter = 0,
    } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.parry);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.parry, {
        value: value,
        counter: universalCounter, // Store skill level in counter
      });
    } else {
      entry.value += value;
      entry.counter = Math.max(entry.counter, universalCounter);
    }

    return {
      en: `${actor.name.en} gained Parry: ready to parry and counter!`,
      th: `${actor.name.th} ได้รับ "ปัดป้อง": พร้อมปัดป้องและตอบโต้!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.parry);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      } else if (entry.value === 0 && entry.counter === 0) {
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.parry);
      }
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} Parry duration decreased`,
        th: `${actor.name.th} "ปัดป้อง" ลดลง`,
      },
    };
  },
});

