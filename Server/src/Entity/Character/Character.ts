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
import type { SkillId } from "../Skill/enums";
import type { BreathingSkillId } from "../BreathingSkill/enum";
import { CharacterBehavior } from "./Subclass/Behavior/CharacterBehavior";
import { CharacterTitle } from "./Subclass/Title/Title";
import {
  defaultActionSequence,
  type CharacterAction,
  type CharacterActionSequence,
} from "./Subclass/Action/CharacterAction";
import type { DayOfWeek, TimeOfDay } from "../../InterFacesEnumsAndTypes/Time";
import type { CharNewsInterface } from "../News/News";
import type { SubRegionEnum } from "../../InterFacesEnumsAndTypes/Enums/SubRegion";
import type { CharacterRoleEnum } from "./Subclass/Title/Role/enum";
import type { CharacterEpithetEnum } from "./Subclass/Title/Epithet/enum";

export class Character {
  id: string = "";
  userId: string | null = null;
  partyID: string | null = null;

  name: string = "";
  gender: "MALE" | "FEMALE" | "NONE" = "NONE";
  race: string = "";
  type: CharacterType = CharacterType.humanoid;
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

  title: CharacterTitle = new CharacterTitle();
  possibleEpithets: CharacterEpithetEnum[] = [];
  possibleRoles: CharacterRoleEnum[] = [];
  actionSequence: CharacterActionSequence = defaultActionSequence();
  informations: Record<string, number> = {};
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

  relations: Map<string, { value: number; status: RelationStatusEnum }> =
    new Map();
  traits: TraitEnum[] = [];

  inventorySize: { base: number; bonus: number } = { base: 20, bonus: 0 };
  inventory: Map<ItemId, number> = new Map();
  equipments: Map<CharacterEquipmentSlot, ItemId> = new Map();

  buffsAndDebuffs: CharacterBuffsAndDebuffs = { entry: new Map() };

  statTracker: number;
  abGuage = 0;

  news: string[] = [];
  unseenNews: string[] = [];

  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;

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
    this.actionSequence = data.actionSequence;
    this.statTracker = data.statTracker || 0;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
    this.createdBy = data.createdBy || "";
    this.updatedBy = data.updatedBy || "";
  }

  getActionFor(day: DayOfWeek, time: TimeOfDay): CharacterAction {
    return this.actionSequence[day][time];
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

  intoNewsInterface(subRegion: SubRegionEnum): CharNewsInterface {
    return {
      name: this.name,
      title: this.title.string(),
      fame: this.fame.getString(subRegion),
      portrait: this.portrait ?? "",
      level: this.level,
    };
  }

  addItemToInventory(item: ItemId, quantity: number) {
    this.inventory.set(item, (this.inventory.get(item) ?? 0) + quantity);
  }

  removeItemFromInventory(item: ItemId, quantity: number) {
    this.inventory.set(item, (this.inventory.get(item) ?? 0) - quantity);
    if (this.inventory.get(item) === 0) {
      this.inventory.delete(item);
    }
  }

  addEpithet(epithet: CharacterEpithetEnum) {
    if (!this.possibleEpithets.includes(epithet)) {
      this.possibleEpithets.push(epithet);
    }
  }
  addRole(role: CharacterRoleEnum) {
    if (!this.possibleRoles.includes(role)) {
      this.possibleRoles.push(role);
    }
  }
}

export type CharacterSkillObject = {
  id: SkillId;
  level: TierEnum;
  exp: number;
};

export type CharacterInternalSkillObject = {
  id: BreathingSkillId;
  level: TierEnum;
  exp: number;
  type: ElementKey;
};

type BuffAndDebuffRecord = {
  value: number;
  isPerm: boolean;
  permValue: number;
};

type CharacterBuffsAndDebuffs = {
  entry: Map<BuffsAndDebuffsEnum, BuffAndDebuffRecord>;
};
