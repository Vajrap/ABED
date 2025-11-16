import {TraitEnum} from "src/Entity/Trait/enum";
import {Trait} from "src/Entity/Trait/index";
import {rollTwenty} from "src/Utils/Dice";

export const traitGoblinCunning = new Trait({
    id: TraitEnum.GoblinCunning,
    name: {
        en: "Goblin's Cunning",
        th: "ความฉลาดของก๊อบลิน"
    },
    description: {
        en: "The Goblins are fast thinking opportunist, believed that they're more clever than you: If Hp is less than 50% at the start of turn, roll a DC10, if passed gain +1 chaos.",
        th: "ก๊อบลินนักฉวยโอกาสพวกนี้ คิดว่ามันฉลาดกว่าคุณ: เมื่อเริ่มต้นเทิร์น หากพลังชีวิตต่ำกว่า 50% จะสามารถทอย DC10 หากสำเร็จ จะได้รับ chaos 1 แต้ม"
    },
    beforeTurn: (actor) => {
        if (actor.vitals.hp.current < (actor.vitals.hp.max * 0.5) && rollTwenty().total > 10) {
            actor.resources.chaos += 1
        }
    }
})