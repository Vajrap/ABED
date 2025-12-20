import type { Character } from "src/Entity/Character/Character";
import { DebuffDef, type AppenderOptions } from "../../type";
import { DebuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

const DC = 7;

export const stoneBounded = new DebuffDef({
  name: {
    en: "Stone Bounded",
    th: "ถูกผูกด้วยหิน",
  },
  description: {
    en: "Grants <FORMULA>. Upon taking turn, must roll <FORMULA> or can't take turn. If save succeeds, remove StoneBounded debuff.",
    th: "ให้ <FORMULA> เมื่อเทิร์นของตัวเอง ต้องทอย <FORMULA> หรือไม่สามารถทำการได้ หากเซฟสำเร็จจะลบ StoneBounded debuff",
  },
  formula: "pDEF +2. DC12 <STRsave> each turn",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.stoneBounded);
    if (!entry) {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.stoneBounded, {
        value: value,
        counter: 0,
      });
      actor.battleStats.mutateBonus("pDEF", 2);
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} is Stone Bounded! (pDEF +2, but must pass STR save each turn)`,
      th: `${actor.name.th} ถูกผูกด้วยหิน! (pDEF +2 แต่ต้องผ่าน STR save ในแต่ละเทิร์น)`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.stoneBounded);
    let canAct = true;
    let skipped = false;
    let removed = false;
    
    if (entry && entry.value > 0) {
      // Must roll DC12 STR save or can't take turn
      const saveRoll = actor.rollSave("strength");
      if (saveRoll < DC + entry.value) {
        // Save fails - can't act, but debuff continues
        canAct = false;
        skipped = true;
        entry.value -= 1;
        // If duration runs out, remove it
        if (entry.value === 0) {
          actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.stoneBounded);
          actor.battleStats.mutateBonus("pDEF", -2);
          removed = true;
        }
      } else {
        // Save succeeds - remove the debuff immediately
        actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.stoneBounded);
        actor.battleStats.mutateBonus("pDEF", -2);
        removed = true;
      }
    }

    return {
      canAct: canAct,
      content: {
        en: skipped 
          ? `${actor.name.en} is Stone Bounded and cannot act!` 
          : removed 
            ? `${actor.name.en} broke free from Stone Bounded!`
            : ``,
        th: skipped 
          ? `${actor.name.th} ถูกผูกด้วยหินและไม่สามารถทำการได้!` 
          : removed 
            ? `${actor.name.th} หลุดพ้นจากการถูกผูกด้วยหิน!`
            : ``,
      },
    };
  },
});

