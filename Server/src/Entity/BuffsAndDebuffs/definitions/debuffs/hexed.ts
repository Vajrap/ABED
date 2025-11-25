import type { Character } from "src/Entity/Character/Character";
import { DebuffDef } from "../../type";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { DebuffEnum } from "../../enum";
import { roll } from "src/Utils/Dice";

export const hexed = new DebuffDef({
    name: {
        en: "hexed",
        th: "สาปเน่าเปื่อย",
    },
    appender: function (
        actor: Character,
        value: number,
        isPerm: boolean,
        permValue: number,
    ): L10N {
        const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.hexed);
        if (!entry) {
            actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.hexed, {
                value,
                isPerm,
                permValue,
            });
            actor.attribute.mutateBattle("endurance", -2);
        } else {
            if (!entry.isPerm && isPerm) {
                entry.isPerm = true;
            }
            entry.value += value;
            entry.permValue += permValue;
        }

        return {
            en: `${actor.name.en} got hexed buff: endurance goes down by 2`,
            th: `${actor.name.th} ได้รับ "สาปเน่าเปื่อย": endurance ลดลง 2 หน่วย`,
        };
    },

    resolver: function (actor: Character): { canAct: boolean; content: L10N } {
        let removed = false;
        const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.hexed);
        if (entry) {
            if (entry.value > 0) {
                const damageTaken = roll(1).d(2).total;
                actor.vitals.decHp(damageTaken);
                entry.value -= 1;

                if (entry.value === 0) {
                    actor.attribute.mutateBattle("endurance", 2);
                    actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.hexed);
                    removed = true;
                }
            }
        }

        return {
            canAct: actor.vitals.isDead,
            content: {
                en: `${actor.name.en} hexed decreased: ${removed ? "and removed, endurance goes up by 2" : ""}`,
                th: `${actor.name.th} "สาปเน่าเปื่อย" ลดลง: ${removed ? "และถูกลบออก, endurance เพิ่มขึ้น 2 หน่วย" : ""}`,
            },
        };
    },
});
