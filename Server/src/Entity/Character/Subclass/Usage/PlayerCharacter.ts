import type { CharacterType } from "../../../../InterFacesEnumsAndTypes/Enums";
import { Character } from "../../Character";
import type { CharacterActionSequence } from "../Action/CharacterAction";
import type { CharacterAlignment } from "../Alignment/CharacterAlignment";
import type { CharacterFame } from "../Fame/CharacterFame";
import type { CharacterNeeds } from "../Needs/CharacterNeeds";
import type { CharacterArtisans } from "../Stats/CharacterArtisans";
import type { CharacterAttributes } from "../Stats/CharacterAttributes";
import type { CharacterBattleStats } from "../Stats/CharacterBattleStats";
import type { CharacterElements } from "../Stats/CharacterElements";
import type { CharacterProficiencies } from "../Stats/CharacterProficiencies";
import type { CharacterVitals } from "../Vitals/CharacterVitals";

export class PlayerCharacter extends Character {
    userId: string
    constructor(
        userId: string,
        data: {
        id: string;
        name: string;
        type: CharacterType;
        gender?: "MALE" | "FEMALE" | "NONE";
        level: number;
        portrait?: string;
        background?: string;
        alignment: CharacterAlignment;
        artisans: CharacterArtisans;
        attribute: CharacterAttributes;
        battleStats: CharacterBattleStats;
        proficiencies: CharacterProficiencies;
        elements: CharacterElements;
        needs: CharacterNeeds;
        vitals: CharacterVitals;
        fame: CharacterFame;
        actionSequence: CharacterActionSequence;
        statTracker?: number;
        createdAt?: Date;
        updatedAt?: Date;
        createdBy?: string;
        updatedBy?: string;
    }
    ) {
        super(data)
        this.userId = userId
    }
}