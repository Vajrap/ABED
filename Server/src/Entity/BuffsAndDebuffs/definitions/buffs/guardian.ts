import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const guardian = new BuffDef({
  name: {
    en: "Guardian",
    th: "ผู้คุ้มกัน",
  },
  description: {
    en: "You are guarding your allies. If any ally in your party is targeted, you become the target instead and gain +1 earth resource.",
    th: "คุณกำลังคุ้มกันพันธมิตร หากพันธมิตรคนใดในทีมของคุณถูกกำหนดเป็นเป้าหมาย คุณจะกลายเป็นเป้าหมายแทนและได้รับ +1 earth resource",
  },
  formula: "Redirects attacks from guarded ally to you, grants +1 earth when triggered",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.guardian);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.guardian, {
        value,
        counter: 0,
      });
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} stands guard!`,
      th: `${actor.name.th} ยืนคุ้มกัน!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.guardian);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      }
      if (entry.value === 0) {
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.guardian);
        return {
          canAct: true,
          content: {
            en: `${actor.name.en}'s Guardian stance ended.`,
            th: `${actor.name.th} ท่าคุ้มกันสิ้นสุดลง`,
          },
        };
      }
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

