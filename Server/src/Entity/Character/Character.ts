import {
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
import type { News } from "../News/News";
import type { CharacterRoleEnum } from "./Subclass/Title/Role/enum";
import type { CharacterEpithetEnum } from "./Subclass/Title/Epithet/enum";
import type { L10N } from "../../InterFacesEnumsAndTypes/L10N.ts";
import { roll } from "src/Utils/Dice.ts";
import { statMod } from "src/Utils/statMod.ts";
import type { Weapon } from "../Item/Equipment/Weapon/Weapon.ts";
import type { ItemId } from "../Item/type.ts";
import {
  ArmorClass,
  getWeaponFromRepository,
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
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes.ts";
import type { Location } from "../Location/Location.ts";
import { bodyRepository } from "../Item/Equipment/Armor/Body/repository.ts";

export class Character {
  id: string = "";
  userId: string | null = null;
  partyID: string | null = null;

  name: L10N;
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
  information: Record<string, number> = {};
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
  traits: Map<TraitEnum, number> = new Map();

  inventorySize: { base: number; bonus: number } = { base: 20, bonus: 0 };
  inventory: Map<ItemId, number> = new Map();
  equipments: {
    // TODO
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

  buffsAndDebuffs: CharacterBuffsAndDebuffs = { entry: new Map() };

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
    none: number;
  } = {
    order: 0,
    chaos: 0,
    earth: 0,
    water: 0,
    wind: 0,
    fire: 0,
    none: 0,
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
          // If permanent, only remove the kinetic value
          value.value = 0;
        }
      }
    }
    return this;
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
    }

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
    const rWeaponId = this.equipments.rightHand as WeaponId;
    const lWeaponId = this.equipments.leftHand as WeaponId;
    // Right hand first
    if (rWeaponId) {
      const weapon = getWeaponFromRepository(rWeaponId);
      if (weapon) {
        if (expectedShield && weapon.weaponType === "shield") return weapon;
        if (!expectedShield && weapon.weaponType !== "shield") return weapon;
      }
    }

    // If right hand yields no result
    if (lWeaponId) {
      const weapon = getWeaponFromRepository(lWeaponId);
      if (weapon) {
        if (expectedShield && weapon.weaponType === "shield") return weapon;
        if (!expectedShield && weapon.weaponType !== "shield") return weapon;
      }
    }

    // When both hands yields no result
    return bareHand;
  }

  receiveDamage(
    damageOutput: {
      damage: number;
      hit: number;
      crit: number /* consider: isNat20?: boolean */;
    },
    damageType: DamageType,
    location: Location,
    critModifier: number = 1.5,
  ): {
    actualDamage: number;
    damageType: DamageType;
    isHit: boolean;
    isCrit: boolean;
  } {
    // --- HIT / DODGE ---
    // If you mean "nat 20 can't be dodged", you need a raw die or a boolean flag.
    // Here we treat 20+ as "auto-hit" only if that's your rule; adjust as needed.
    const dodgeChance =
      this.battleStats.getTotal("dodge") +
      statMod(this.attribute.getTotal("agility"));

    // Attacker’s 'hit' already includes their bonuses
    const autoHit = damageOutput.crit >= 20; // ideally: damageOutput.isNat20 === true
    if (!autoHit && dodgeChance >= damageOutput.hit) {
      return {
        actualDamage: 0,
        damageType,
        isHit: false,
        isCrit: false,
      };
    }

    // --- MITIGATION ---
    const isPhysical =
      damageType === DamageType.pierce ||
      damageType === DamageType.slash ||
      damageType === DamageType.blunt;

    const mitigation = isPhysical
      ? this.battleStats.getTotal("pDEF") +
        statMod(this.attribute.getTotal("endurance"))
      : this.battleStats.getTotal("mDEF") +
        statMod(this.attribute.getTotal("planar"));

    let damage = Math.max(damageOutput.damage - Math.max(mitigation, 0), 0);

    // --- CRIT CHECK ---
    // Keep stat usage consistent: use statMod(endurance) if dodge used statMod(agility)
    const critDefense = statMod(this.attribute.getTotal("endurance"));
    let isCrit = false;
    if (damageOutput.crit - critDefense >= 20) {
      damage *= critModifier;
      isCrit = true;
    }

    // TODO
    // --- BUFFS/DEBUFFS/TRAITS (future hooks) ---
    // Example pattern:
    // damage = this.applyElementalInteractions(damage, damageType);
    // damage = this.applyShieldsAndAbsorbs(damage);

    // --- ROUND & APPLY ---
    const finalDamage = Math.max(Math.floor(damage), 0);
    this.vitals.decHp(finalDamage);

    return {
      actualDamage: finalDamage,
      damageType,
      isHit: true,
      isCrit,
    };
  }

  //MARK: RECEIVE HEAL
  // receiveHeal({ healing }: { actor: Character; healing: number }) {
  //   if (this.isDead === true) {
  //     return this.hpUp(healing);
  //   }
  //   this.currentHP = Math.min(
  //     this.currentHP + healing || this.maxHP(),
  //     this.maxHP(),
  //   );

  //   console.log(
  //     `${this.name} healed for ${healing}: ${this.currentHP}/${this.maxHP()}`,
  //   );
  //   return this.hpUp(healing);
  // }
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
