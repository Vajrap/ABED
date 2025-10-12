
import { statMod } from "../../../../Utils/statMod";
import type { Character } from "../../Character";

export function addBaseVitals(character: Character) {
    // At least 1
    character.vitals.hp.addBase(Math.max(1, statMod(character.attribute.getTotal("vitality"))))
    character.vitals.mp.addBase(Math.max(1, statMod(character.attribute.getTotal("planar"))))
    character.vitals.sp.addBase(Math.max(1, statMod(character.attribute.getTotal("endurance"))))

    return character
}