import { Character } from "src/Entity/Character/Character.ts";
import { MOBs } from "src/Entity/Character/MOBs/enums.ts";
import { CharacterNeeds } from "src/Entity/Character/Subclass/Needs/CharacterNeeds.ts";
import { CharacterProficiencies } from "src/Entity/Character/Subclass/Stats/CharacterProficiencies.ts";
import { CharacterType } from "src/InterFacesEnumsAndTypes/Enums.ts";
import {
  CharacterVitals,
  Vital,
} from "src/Entity/Character/Subclass/Vitals/CharacterVitals.ts";
import { makeAttribute, scaleByDifficulty } from "./helpers";
import { CharacterBattleStats } from "../Subclass/Stats/CharacterBattleStats";
import { CharacterElements } from "../Subclass/Stats/CharacterElements";
import { CharacterFame } from "../Subclass/Fame/CharacterFame";
import { defaultActionSequence } from "../Subclass/Action/CharacterAction";
import { CharacterAlignment } from "../Subclass/Alignment/CharacterAlignment";
import { CharacterArtisans } from "../Subclass/Stats/CharacterArtisans";

export function goblinScout(difficulty: 1 | 2 | 3 | 4 | 5) {
  const hp = scaleByDifficulty(10, difficulty, 2.0);
  const mp = scaleByDifficulty(8, difficulty, 2.0);
  const sp = scaleByDifficulty(12, difficulty, 2.0);

  const character = new Character({
    actionSequence: defaultActionSequence(),
    alignment: new CharacterAlignment({}),
    artisans: new CharacterArtisans({}),
    attribute: makeAttribute({
      charisma: scaleByDifficulty(3, difficulty),
      luck: scaleByDifficulty(7, difficulty),
      intelligence: scaleByDifficulty(4, difficulty),
      leadership: scaleByDifficulty(3, difficulty),
      vitality: scaleByDifficulty(6, difficulty),
      willpower: scaleByDifficulty(6, difficulty),
      planar: scaleByDifficulty(5, difficulty),
      control: scaleByDifficulty(6, difficulty),
      dexterity: scaleByDifficulty(10, difficulty),
      agility: scaleByDifficulty(10, difficulty),
      strength: scaleByDifficulty(7, difficulty),
      endurance: scaleByDifficulty(2, difficulty),
    }),
    battleStats: new CharacterBattleStats(),
    elements: new CharacterElements(),
    fame: new CharacterFame(),
    id: MOBs.goblinScout,
    level: difficulty + 1 - 1,
    name: {
      en: "Goblin Scout",
      th: "ก๊อปลินสายลับ",
    },
    needs: new CharacterNeeds(),
    proficiencies: new CharacterProficiencies(),
    type: CharacterType.humanoid,
    vitals: new CharacterVitals({
      hp: new Vital({ base: hp }),
      mp: new Vital({ base: mp }),
      sp: new Vital({ base: sp }),
    }),
  });

  character.activeSkills = [];
  character.traits = new Map();
  character.equipments;

  return character;
}
