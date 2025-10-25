import { Character } from "../Character";
import { CharacterAlignment } from "../Subclass/Alignment/CharacterAlignment";
import { CharacterArtisans } from "../Subclass/Stats/CharacterArtisans";
import { CharacterAttributes } from "../Subclass/Stats/CharacterAttributes";
import { CharacterBattleStats } from "../Subclass/Stats/CharacterBattleStats";
import { CharacterProficiencies } from "../Subclass/Stats/CharacterProficiencies";
import { CharacterElements } from "../Subclass/Stats/CharacterElements";
import { CharacterNeeds } from "../Subclass/Needs/CharacterNeeds";
import { CharacterVitals } from "../Subclass/Vitals/CharacterVitals";
import { CharacterFame } from "../Subclass/Fame/CharacterFame";
import { defaultActionSequence } from "../Subclass/Action/CharacterAction";
import { CharacterType } from "src/InterFacesEnumsAndTypes/Enums";
import { NPCEnums } from "./enum";

export const nobody = new Character({
    id: NPCEnums.noBody,
    name: { en: "Nobody", th: "ไม่มีใคร" },
    type: CharacterType.humanoid,
    gender: "NONE",
    level: 1,
    portrait: "",
    background: "",
    alignment: new CharacterAlignment({ good: 0, evil: 0 }),
    artisans: new CharacterArtisans(),
    attribute: new CharacterAttributes(),
    battleStats: new CharacterBattleStats(),
    proficiencies: new CharacterProficiencies(),
    elements: new CharacterElements(),
    needs: new CharacterNeeds(),
    vitals: new CharacterVitals({}),
    fame: new CharacterFame(),
    actionSequence: defaultActionSequence(),
});