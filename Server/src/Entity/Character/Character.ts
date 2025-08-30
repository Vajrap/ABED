import {
  CharacterEquipmentSlot,
  CharacterType,
  RelationStatusEnum,
  type ElementKey,
} from "../../InterFacesEnumsAndTypes/Enums";
import { CharacterAlignment } from "./Subclass/Alignment/CharacterAlignment";
import { CharacterAttributes } from "./Subclass/Stats/CharacterAttributes";
import { CharacterProficiencies } from "./Subclass/Stats/CharacterProficiencies";
import { CharacterArtisans } from "./Subclass/Stats/CharacterArtisans";
import { CharacterBattleStats } from "./Subclass/Stats/CharacterBattleStats";
import { CharacterElements } from "./Subclass/Stats/CharacterElements";
import { CharacterNeeds } from "./Subclass/Needs/CharacterNeeds";
import { CharacterVitals } from "./Subclass/Vitals/CharacterVitals";
import { CharacterFame } from "./Subclass/Fame/CharacterFame";
import type { ItemId } from "../Item/Item";
import { CharacterPlanarAptitude } from "./Subclass/PlanarAptitude/CharacterPlanarAptitude";
import type { TierEnum } from "../../InterFacesEnumsAndTypes/Tiers";
import type { BuffsAndDebuffsEnum } from "../BuffsAndDebuffs/enum";
import type { TraitEnum } from "../Trait.ts/enum";
import { DeckCondition } from "./Subclass/DeckCondition/DeckCondition";
import type { LightnessSkillId } from "../LightnessSkill/enum";
import type { SkillId } from "../Skill/enums";
import type { BreathingSkillId } from "../BreathingSkill/enum";
import { CharacterBehavior } from "./Subclass/Behavior/CharacterBehavior";

export class Character {
  id: string = "";
  partyID: string | null = null;
  name: string = "";
  type: CharacterType = CharacterType.humanoid;
  gender: "MALE" | "FEMALE" | "NONE" = "NONE";
  level: number = 1;
  portrait: string | null = null;
  background: string | null = null;
  alignment: CharacterAlignment = new CharacterAlignment({});
  artisans: CharacterArtisans = new CharacterArtisans();
  attribute: CharacterAttributes = new CharacterAttributes();
  battleStats: CharacterBattleStats = new CharacterBattleStats();
  elements: CharacterElements = new CharacterElements();
  proficiencies: CharacterProficiencies = new CharacterProficiencies();
  needs: CharacterNeeds = new CharacterNeeds();
  vitals: CharacterVitals = new CharacterVitals({});
  fame: CharacterFame = new CharacterFame();

  behavior: CharacterBehavior = new CharacterBehavior();

  // Skills
  // TODO: write condition, might be config setting
  skills: Map<SkillId, CharacterSkillObject> = new Map();
  activeSkills: CharacterSkillObject[] = [];
  conditionalSkills: CharacterSkillObject[] = [];
  conditionalSkillsCondition: DeckCondition = new DeckCondition({});
  skillLearningProgress: Map<SkillId, number> = new Map();
  // Internal
  // TODO: breathing skill ideas
  breathingSkills: Map<BreathingSkillId, CharacterInternalSkillObject> =
    new Map();
  activeBreathingSkill: BreathingSkillId | null = null;
  breathingSkillsLearningProgress: Map<BreathingSkillId, number> = new Map();
  planarAptitude: CharacterPlanarAptitude = new CharacterPlanarAptitude();

  relations: Map<number, { value: number; status: RelationStatusEnum }> =
    new Map();
  traits: TraitEnum[] = [];

  inventorySize: { base: number; bonus: number } = { base: 20, bonus: 0 };
  inventory: Map<ItemId, number> = new Map();
  equipments: Map<CharacterEquipmentSlot, ItemId> = new Map();

  buffsAndDebuffs: CharacterBuffsAndDebuffs = { entry: new Map() };

  statTracker: number;
  abGuage = 0;

  constructor(data: {
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
    elements: CharacterElements;
    proficiencies: CharacterProficiencies;
    needs: CharacterNeeds;
    vitals: CharacterVitals;
    fame: CharacterFame;
    statTracker?: number;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.gender = data.gender || "NONE";
    this.level = data.level;
    this.portrait = data.portrait || null;
    this.background = data.background || null;
    this.alignment = data.alignment;
    this.artisans = data.artisans;
    this.attribute = data.attribute;
    this.battleStats = data.battleStats;
    this.elements = data.elements;
    this.proficiencies = data.proficiencies;
    this.needs = data.needs;
    this.vitals = data.vitals;
    this.fame = data.fame;
    this.statTracker = data.statTracker || 0;
  }

  get levelUpStatNeeded(): number {
    return 5 + this.level * 2;
  }

  clearBuffAndDebuff(): Character {
    for (const [key, value] of this.buffsAndDebuffs.entry) {
      if (value.value > 0) {
        if (!value.isPerm) {
          // If not permanent, it means we should just remove it
          this.buffsAndDebuffs.entry.delete(key);
        } else {
          // If has permanent, only remove the kinetic value
          value.value = 0;
        }
      }
    }
    return this;
  }
}

type CharacterSkillObject = {
  id: SkillId;
  level: TierEnum;
  exp: number;
};

type CharacterInternalSkillObject = {
  id: BreathingSkillId;
  level: TierEnum;
  exp: number;
  type: ElementKey;
};

type CharacterLightnessSkillObject = {
  id: LightnessSkillId;
  level: TierEnum;
  exp: number;
};

type BuffAndDebuffRecord = {
  value: number;
  isPerm: boolean;
  permValue: number;
};

type CharacterBuffsAndDebuffs = {
  entry: Map<BuffsAndDebuffsEnum, BuffAndDebuffRecord>;
};
