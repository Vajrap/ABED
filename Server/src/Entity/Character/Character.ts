import {
  AttributeKey,
  CharacterType,
  RelationStatusEnum,
  type ElementKey,
} from "../../InterFacesEnumsAndTypes/Enums";
import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import { CharacterAlignment } from "./Subclass/Alignment/CharacterAlignment";
import { CharacterAttributes } from "./Subclass/Stats/CharacterAttributes";
import { CharacterProficiencies } from "./Subclass/Stats/CharacterProficiencies";
import { CharacterArtisans } from "./Subclass/Stats/CharacterArtisans";
import { CharacterBattleStats } from "./Subclass/Stats/CharacterBattleStats";
import { CharacterElements } from "./Subclass/Stats/CharacterElements";
import { CharacterNeeds } from "./Subclass/Needs/CharacterNeeds";
import { CharacterVitals } from "./Subclass/Vitals/CharacterVitals";
import { CharacterFame } from "./Subclass/Fame/CharacterFame";
import { CharacterPlanarAptitude } from "./Subclass/PlanarAptitude/CharacterPlanarAptitude";
import type { TierEnum } from "../../InterFacesEnumsAndTypes/Tiers";
import { BuffEnum, DebuffEnum } from "../BuffsAndDebuffs/enum";
import type { TraitEnum } from "../Trait/enum";
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
import type { News } from "../News/News";
import type { CharacterRoleEnum } from "./Subclass/Title/Role/enum";
import type { CharacterEpithetEnum } from "./Subclass/Title/Epithet/enum";
import type { L10N } from "../../InterFacesEnumsAndTypes/L10N.ts";
import { roll, rollTwenty } from "src/Utils/Dice.ts";
import { statMod } from "src/Utils/statMod.ts";
import { Weapon } from "src/Entity/Item";
import type { ItemId } from "../Item/type.ts";
import type { ResourceType } from "../../InterFacesEnumsAndTypes/Enums/Resource";
import {
  ArmorClass,
  getEquipment,
  type WeaponId,
  BodyId,
  LegId,
  HandId,
  HeadWearId,
  FootId,
  UtilId,
  RingId,
  EarId,
  NeckId,
} from "../Item/index.ts";
import { bareHand } from "../Item/Equipment/Weapon/BareHand/definition/bareHand.ts";
import { bodyRepository } from "../Item/Equipment/Armor/Body/repository.ts";
import { RaceEnum } from "../../InterFacesEnumsAndTypes/Enums";
import type { PortraitData } from "../../InterFacesEnumsAndTypes/PortraitData";
import type { Quest } from "../Quest/Quest";
import type { QuestOffer } from "../Quest/QuestOffer";
import type { Bounty } from "../Bounty/Bounty";

export class Character {
  id: string = "";
  userId: string | null = null;
  partyID: string | null = null;
  location: LocationsEnum | null = null; // Current location - denormalized from party for quick access

  name: L10N;
  gender: "MALE" | "FEMALE" | "NONE" = "NONE";
  race: RaceEnum | string = ""; // Allow string for backwards compatibility, but prefer RaceEnum
  type: CharacterType = CharacterType.humanoid;
  level: number = 1;
  portrait: PortraitData | string | null = null; // Support both new PortraitData and legacy string format
  background: string | null = null;

  alignment: CharacterAlignment = new CharacterAlignment({});
  artisans: CharacterArtisans = new CharacterArtisans();
  attribute: CharacterAttributes = new CharacterAttributes();
  battleStats: CharacterBattleStats = new CharacterBattleStats();
  elements: CharacterElements = new CharacterElements();
  proficiencies: CharacterProficiencies = new CharacterProficiencies();
  saveRolls: CharacterAttributes = new CharacterAttributes();

  needs: CharacterNeeds = new CharacterNeeds();
  vitals: CharacterVitals = new CharacterVitals({});
  fame: CharacterFame = new CharacterFame();

  behavior: CharacterBehavior = new CharacterBehavior();

  title: CharacterTitle = new CharacterTitle();
  possibleEpithets: CharacterEpithetEnum[] = [];
  possibleRoles: CharacterRoleEnum[] = [];
  actionSequence: CharacterActionSequence = defaultActionSequence();
  information: Record<string, number> = {};
  // Skills
  // TODO: write condition, might be config setting
  skills: Map<SkillId, CharacterSkillObject> = new Map();
  activeSkills: CharacterSkillObject[] = [];
  conditionalSkills: CharacterSkillObject[] = [];
  conditionalSkillsCondition: DeckCondition = new DeckCondition({});
  skillLearningProgress: Map<SkillId, number> = new Map();
  cooldowns: Map<SkillId, number> = new Map(); // Skill cooldowns: Map<SkillId, turnsRemaining>
  // Internal
  // TODO: breathing skill ideas
  breathingSkills: Map<BreathingSkillId, CharacterBreathingSkillObject> =
    new Map();
  activeBreathingSkill: BreathingSkillId | null = null;
  breathingSkillsLearningProgress: Map<BreathingSkillId, number> = new Map();
  planarAptitude: CharacterPlanarAptitude = new CharacterPlanarAptitude();

  relations: Map<string, { value: number; status: RelationStatusEnum }> =
    new Map();
  traits: Map<TraitEnum, number> = new Map();
  
  // Quest tracking
  quests: {
    active: Map<string, Quest>;
    completed: Set<string>;
  } = {
    active: new Map(),
    completed: new Set(),
  };
  
  // Quest offers (pending quests that can be accepted)
  questOffers: Map<string, QuestOffer> = new Map();
  
  // Bounty tracking
  bounties: {
    active: Map<string, Bounty>;
    completed: Set<string>;
  } = {
    active: new Map(),
    completed: new Set(),
  };

  inventorySize: { base: number; bonus: number } = { base: 20, bonus: 0 };
  inventory: Map<ItemId | string, number> = new Map(); // Can be base ItemId or unique instance ID (UUID) for crafted items
  itemInstances: Map<string, ItemId> = new Map();
  materialResources: Map<ResourceType, number> = new Map(); // Resource storage (ore, wood, herbs, etc.)
  equipments: {
    headWear: HeadWearId | null;
    body: BodyId | null;
    leg: LegId | null;
    hand: HandId | null;
    foot: FootId | null;
    util: UtilId | null;
    ringL: RingId | null;
    ringR: RingId | null;
    earL: EarId | null;
    earR: EarId | null;
    neck: NeckId | null;
    rightHand: WeaponId | null;
    leftHand: WeaponId | null;
  } = {
    headWear: null,
    body: null,
    leg: null,
    hand: null,
    foot: null,
    util: null,
    ringL: null,
    ringR: null,
    earL: null,
    earR: null,
    neck: null,
    rightHand: null,
    leftHand: null,
  };

  buffsAndDebuffs: CharacterBuffsAndDebuffs = {
    buffs: { entry: new Map() },
    debuffs: { entry: new Map() },
  };

  statTracker: number;
  abGauge = 0;

  news: News[] = [];
  unseenNews: News[] = [];

  isPlayer: boolean = false;

  resources: {
    order: number;
    chaos: number;
    earth: number;
    water: number;
    wind: number;
    fire: number;
    neutral: number;
  } = {
    order: 0,
    chaos: 0,
    earth: 0,
    water: 0,
    wind: 0,
    fire: 0,
    neutral: 0,
  };

  position: 0 | 1 | 2 | 3 | 4 | 5 = 0;

  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;

  constructor(data: {
    id: string;
    name: L10N;
    type: CharacterType;
    gender?: "MALE" | "FEMALE" | "NONE";
    race?: RaceEnum;
    level: number;
    portrait?: PortraitData | string; // Support both new PortraitData and legacy string format
    background?: string;
    alignment: CharacterAlignment;
    artisans: CharacterArtisans;
    attribute: CharacterAttributes;
    battleStats: CharacterBattleStats;
    proficiencies: CharacterProficiencies;
    saveRolls: CharacterAttributes;
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
    this.race = data.race || "";
    this.level = data.level;
    this.portrait = data.portrait || null;
    this.background = data.background || null;
    this.alignment = data.alignment;
    this.artisans = data.artisans;
    this.attribute = data.attribute;
    this.battleStats = data.battleStats;
    this.saveRolls = data.saveRolls;
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
    for (const [key, value] of this.buffsAndDebuffs.debuffs.entry) {
      if (value.value > 0) {
        this.buffsAndDebuffs.debuffs.entry.delete(key);
      }
    }
    for (const [key, value] of this.buffsAndDebuffs.buffs.entry) {
      if (value.value > 0) {
        this.buffsAndDebuffs.buffs.entry.delete(key);
      }
    }
    return this;
  }

  addItemToInventory(item: ItemId | string, quantity: number) {
    // Can be base ItemId or unique instance ID (UUID) for crafted items
    this.inventory.set(item, (this.inventory.get(item) ?? 0) + quantity);
  }

  addItemInstance(instanceId: string, baseItemId: ItemId) {
    this.itemInstances.set(instanceId, baseItemId);
  }

  removeItemFromInventory(item: ItemId | string, quantity: number) {
    // Can be base ItemId or unique instance ID (UUID) for crafted items
    this.inventory.set(item, (this.inventory.get(item) ?? 0) - quantity);
    if (this.inventory.get(item) === 0) {
      this.inventory.delete(item);
    }
  }

  removeItemInstance(instanceId: string) {
    this.itemInstances.delete(instanceId);
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

  replenishResource() {
    this.replenishSpAndMp();
    this.replenishElement();
  }

  private replenishSpAndMp() {
    const staminaDice = roll(1).d(3).total;
    const manaDice = roll(1).d(3).total;
    const controlMod = statMod(this.attribute.getTotal("control"));
    const enduranceMod = statMod(this.attribute.getTotal("endurance"));

    const armorPenaltyMap: Record<ArmorClass, number> = {
      [ArmorClass.Cloth]: 0,
      [ArmorClass.Light]: 1,
      [ArmorClass.Medium]: 2,
      [ArmorClass.Heavy]: 3,
    };

    const armorPenalty = () => {
      let armor;
      if (this.equipments.body) {
        armor = bodyRepository[this.equipments.body];
      }
      if (!armor) return 0;
      return armorPenaltyMap[armor.armorData.armorClass];
    };

    this.vitals.incSp(staminaDice - armorPenalty() + enduranceMod);
    this.vitals.incMp(manaDice - armorPenalty() + controlMod);
  }

  private replenishElement() {
    const coreElement = [
      "wind",
      "water",
      "fire",
      "earth",
      "order",
      "chaos",
    ] as const;
    for (const element of coreElement) {
      const bonus = this.elements.getTotal(element);
      if (bonus != 0) {
        this.resources[element] += bonus;
      }
    }
  }

  getWeapon(expectedShield: boolean = false): Weapon {
    const rWeaponId = this.equipments.rightHand as WeaponId | string | null;
    const lWeaponId = this.equipments.leftHand as WeaponId | string | null;

    // Right hand first
    if (rWeaponId) {
      // Use getEquipment which handles both base EquipmentId and instance IDs (strings)
      const equipment = getEquipment(rWeaponId);
      if (equipment && equipment instanceof Weapon) {
        const weapon = equipment;
        if (expectedShield && weapon.weaponType === "shield") return weapon;
        if (!expectedShield && weapon.weaponType !== "shield") return weapon;
      }
    }

    // If right hand yields no result
    if (lWeaponId) {
      // Use getEquipment which handles both base EquipmentId and instance IDs (strings)
      const equipment = getEquipment(lWeaponId);
      if (equipment && equipment instanceof Weapon) {
        const weapon = equipment;
        if (expectedShield && weapon.weaponType === "shield") return weapon;
        if (!expectedShield && weapon.weaponType !== "shield") return weapon;
      }
    }

    // When both hands yields no result
    return bareHand;
  }

  receiveHeal({ healing }: { actor: Character; healing: number }): {
    heal: number;
  } {
    if (this.vitals.isDead) {
      return { heal: 0 };
    }
    const prior = this.vitals.hp.current;
    this.vitals.hp.inc(healing);
    const later = this.vitals.hp.current;

    return { heal: later - prior };
  }

  roll(data: {
    face: number,
    amount: number,
    mode?: "norm" | "adv" | "dis",
    stat?: AttributeKey,
    applyBlessCurse?: boolean, // NEW: default true
  }): number {
    let dice = roll(data.amount).d(data.face);
    const hasBless = this.buffsAndDebuffs.buffs.entry.has(BuffEnum.bless);
    const hasCursed = this.buffsAndDebuffs.debuffs.entry.has(DebuffEnum.cursed);
    
    // Apply bless/curse only if applyBlessCurse is true (default) AND mode is "norm"
    if (data.applyBlessCurse !== false && data.mode === "norm") {
      if (hasBless && !hasCursed) {
        dice = dice.adv();
      } else if (!hasBless && hasCursed) {
        dice = dice.dis();
      }
    }
    
    // Explicit mode overrides (for advantage/disadvantage from other sources)
    if (data.mode === "adv") dice = dice.adv();
    if (data.mode === "dis") dice = dice.dis();

    if (data.stat) {
      return statMod(this.attribute.getTotal(data.stat)) + dice.total;
    }

    return dice.total;
  }

  rollTwenty(data: {
    mode?: "norm" | "adv" | "dis",
    stat?: AttributeKey,
    applyBlessCurse?: boolean, // NEW: default true
  }): number {
    return this.roll({
      face: 20,
      amount: 1,
      mode: data.mode,
      stat: data.stat,
      applyBlessCurse: data.applyBlessCurse,
    });
  }

  rollSave(stat: AttributeKey, mode?: "norm" | "adv" | "dis"): number {
    return this.rollTwenty({
      mode: mode,
      stat: stat,
    });
  }

  /**
   * Add resources to character's resource storage
   */
  addMaterialResource(type: ResourceType, amount: number): void {
    const current = this.materialResources.get(type) || 0;
    this.materialResources.set(type, current + amount);
  }

  /**
   * Remove resources from character's resource storage
   * Returns true if successful, false if insufficient resources
   */
  removeMaterialResource(type: ResourceType, amount: number): boolean {
    const current = this.materialResources.get(type) || 0;
    if (current < amount) {
      return false;
    }
    this.materialResources.set(type, current - amount);
    return true;
  }

  /**
   * Get current amount of a resource type
   */
  getMaterialResource(type: ResourceType): number {
    return this.materialResources.get(type) || 0;
  }
}

export type CharacterSkillObject = {
  id: SkillId;
  level: TierEnum;
  exp: number;
};

export type CharacterBreathingSkillObject = {
  id: BreathingSkillId;
  level: TierEnum;
  exp: number;
  type: ElementKey;
};

type BuffAndDebuffRecord = {
  value: number;
  counter: number;
  isPerm?: boolean; // Permanent buff/debuff that decays over phases
  permValue?: number; // Number of phases remaining (decays each phase)
};

type CharacterBuffsAndDebuffs = {
  buffs: CharacterBuffs;
  debuffs: CharacterDebuffs;
};

type CharacterBuffs = {
  entry: Map<BuffEnum, BuffAndDebuffRecord>;
};

type CharacterDebuffs = {
  entry: Map<DebuffEnum, BuffAndDebuffRecord>;
};
