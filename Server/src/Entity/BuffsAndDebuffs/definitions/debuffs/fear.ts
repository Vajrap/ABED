import type { Character } from "src/Entity/Character/Character";
import { DebuffDef, type AppenderOptions } from "../../type";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { DebuffEnum } from "../../enum";

export const fear = new DebuffDef({
    name: {
        en: "fear",
        th: "หวาดกลัว",
    },
    description: {
        en: "Reduces agility by the fear value. Each turn, the fear value decreases by 1 and agility is restored by 1.",
        th: "ลดความคล่องแคล่วตามค่า fear ในแต่ละเทิร์นค่า fear ลดลง 1 และความคล่องแคล่วฟื้นฟู 1",
    },
    appender: function (
        actor: Character,
        options: AppenderOptions,
    ): L10N {
        const { turnsAppending: value } = options;
        
        const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.fear);
        if (!entry) {
            actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.fear, {
                value,
                counter: 0,
            });
        } else {
            entry.value += value;
        }

        actor.attribute.mutateBattle("agility", -value);
        return {
            en: `${actor.name.en} got fear debuff: agi goes down by ${value}`,
            th: `${actor.name.th} ได้รับ "หวาดกลัว": agi ลดลง ${value} หน่วย`,
        };
    },

    resolver: function (actor: Character): { canAct: boolean; content: L10N } {
        const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.fear);
        if (entry) {
            if (entry.value > 0) {
                entry.value -= 1;
                actor.attribute.mutateBattle("agility", -1);
            }
        }

        return {
            canAct: true,
            content: {
                en: `${actor.name.en} fear decreased: agi goes up by 1`,
                th: `${actor.name.th} "หวาดกลัว" ลดลง: agi เพิ่มขึ้น 1 หน่วย`,
            },
        };
    },
});
