import { Character } from "src/Entity/Character/Character";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { DebuffDef, type AppenderOptions } from "../../type";
import { DebuffEnum } from "../../enum";

export const bearTrap = new DebuffDef({
  name: {
    en: "Bear Trap",
    th: "กับดักหมี",
  },
  description: {
    en: "Caught in a bear trap, taking, It Hurts!",
    th: "เป้าหมายติดกับดักหมี รับความเสียหายจากกับดัก",
  },
  appender: function (actor: Character, options: AppenderOptions): L10N {
    
    // This do nothing, the damage dealing is done on the target executing skill
    return {
      en: `${actor.name.en} is caught in a bear trap!`,
      th: `${actor.name.th} ติดกับดักหมี!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.bearTrap);
    if (entry) {
      // This do nothing, the damage dealing is done on the target executing skill
      actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.bearTrap);
    }

    return {
      canAct: true,
      content: {
        en: ``,
        th: ``,
      },
    };
  },
});

