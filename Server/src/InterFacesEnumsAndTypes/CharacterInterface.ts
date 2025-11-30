import { ItemId } from "src/Entity/Item";
import type { CharacterActionSequence } from "../Entity/Character/Subclass/Action/CharacterAction";
import type { CharacterCraftingPreference } from "../Entity/Character/Subclass/Behavior/subclasses/CharacterCraftingPreference";
import type { DeckCondition } from "../Entity/Character/Subclass/DeckCondition/DeckCondition";
import type { CharacterEpithetEnum } from "../Entity/Character/Subclass/Title/Epithet/enum";
import type { CharacterRoleEnum } from "../Entity/Character/Subclass/Title/Role/enum";
import type { InnLevel } from "../Entity/Location/Config/Inn";
import type { TraitEnum } from "../Entity/Trait/enum";
import type { CharacterBreathingSkillInterface } from "./CharacterBreathingSkillInterface";
import type { CharacterSkillInterface } from "./CharacterSkillInterface";
import type { ArtisanKey, AttributeKey, BattleStatKey, CharacterAlignmentEnum, CharacterEquipmentSlot, CharacterType, ElementKey, ProficiencyKey, RelationStatusEnum } from "./Enums";
import type { SubRegionEnum } from "./Enums/SubRegion";

// Character interface for frontend - only includes fields needed for UI
export interface CharacterInterface {
  id: string;
  name: string;
  gender: "MALE" | "FEMALE" | "NONE";
  race: string;
  type: CharacterType;
  level: number;
  portrait: string;
  background: string;
  alignment: CharacterAlignmentEnum;
  artisans: {
    [key in ArtisanKey]: {
      base: number;
      bonus: number;
    };
  };
  attributes: {
    [key in AttributeKey]: {
      base: number;
      bonus: number;
    };
  };
  battleStats: {
    [key in BattleStatKey]: {
      base: number;
      bonus: number;
    };
  };
  elements: {
    [key in ElementKey]: {
      base: number;
      bonus: number;
    };
  };
  proficiencies: {
    [key in ProficiencyKey]: {
      base: number;
      bonus: number;
    };
  };
  needs: {
    mood: number;
    energy: number;
    satiety: number;
  };
  vitals: {
    hp: {current: number; max: number;};
    mp: {current: number; max: number;};
    sp: {current: number; max: number;};
  };
  fame: {
    [key in SubRegionEnum]: number;
  };
  behavior: {
    battlePolicy: "bold" | "measured" | "careful";
    tradePolicy: "trade" | "noTrade" ;
    craftingPreference: CharacterCraftingPreference;
    riskTaking: "bold" | "measured" | "careful";
    travelPace: "bold" | "measured" | "careful";
    eventResponse: "bold" | "measured" | "careful";
    preferredInnType: InnLevel;
    useCampSupplies: boolean;
  }
  title: string;
  possibleEpithets: CharacterEpithetEnum[];
  possibleRoles: CharacterRoleEnum[];
  actionSequence: CharacterActionSequence;
  informations: Record<string, number>;
  skills: CharacterSkillInterface;
  activeSkills: CharacterSkillInterface[];
  conditionalSkills: CharacterSkillInterface[];
  conditionalSkillsCondition: DeckCondition;
  breathingSkills: CharacterBreathingSkillInterface[];
  activeBreathingSkill: CharacterBreathingSkillInterface;
  planarAptitude: number;
  relations: Record<string, { value: number; status: RelationStatusEnum }>;
  traits: TraitEnum[];
  inventorySize: { base: number; bonus: number };
  inventory: Record<ItemId, number>;
  equipments: Record<CharacterEquipmentSlot, ItemId>;
}
