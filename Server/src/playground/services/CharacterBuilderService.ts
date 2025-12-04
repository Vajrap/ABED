import { Character } from "src/Entity/Character/Character";
import { activeCharacterRegistry } from "src/Entity/Character/repository";
import { mobRepository } from "src/Entity/Character/MOBs/repository";
import {
  RaceEnum,
  ClassEnum,
  CharacterEquipmentSlot,
  CharacterType,
} from "src/InterFacesEnumsAndTypes/Enums";
import type { SkillId } from "src/Entity/Skill/enums";
import type { EquipmentId } from "src/Entity/Item/Equipment/types";
import { equipDirect } from "src/Entity/Item/Equipment/equipDirect";
import {
  makeAttribute,
  makeProficiencies,
  scaleByDifficulty,
} from "src/Entity/Character/MOBs/helpers";
import { RACE_ATTRIBUTES } from "src/Entity/Character/RaceAttributes";
import type { CharacterConfig } from "../types/requests";
import { CharacterAlignment } from "src/Entity/Character/Subclass/Alignment/CharacterAlignment";
import { CharacterArtisans } from "src/Entity/Character/Subclass/Stats/CharacterArtisans";
import { CharacterBattleStats } from "src/Entity/Character/Subclass/Stats/CharacterBattleStats";
import { CharacterElements } from "src/Entity/Character/Subclass/Stats/CharacterElements";
import { CharacterFame } from "src/Entity/Character/Subclass/Fame/CharacterFame";
import { CharacterNeeds } from "src/Entity/Character/Subclass/Needs/CharacterNeeds";
import {
  CharacterVitals,
  Vital,
} from "src/Entity/Character/Subclass/Vitals/CharacterVitals";
import { defaultActionSequence } from "src/Entity/Character/Subclass/Action/CharacterAction";
import { DeckCondition } from "src/Entity/Character/Subclass/DeckCondition/DeckCondition";
import { defaultSaveRoll } from "src/Utils/CharacterDefaultSaveRoll";
import type { CharacterSkillObject } from "src/Entity/Character/Character";
import {
  MonkSkillId,
  DuelistSkillId,
  WitchSkillId,
  InquisitorSkillId,
  ScholarSkillId,
  SpellBladeSkillId,
  MysticSkillId,
  ShamanSkillId,
  KnightSkillId,
  GuardianSkillId,
  WarriorSkillId,
  ClericSkillId,
  PaladinSkillId,
  DruidSkillId,
  MageSkillId,
  RogueSkillId,
  BarbarianSkillId,
  WarlockSkillId,
} from "src/Entity/Skill/enums";
import { MOBEnum } from "src/Entity/Character/MOBs/enums";
import {
  AxeId,
  BladeId,
  BodyId,
  BookWId,
  DaggerId,
  HammerId,
  ShieldId,
  SpearId,
  StaffId,
  SwordId,
  WandId,
} from "src/Entity/Item";

export class CharacterBuilderService {
  /**
   * Map race + class combination to MOB factory function
   * TODO: Complete this mapping for all race/class combinations
   * Currently returns the MOB enum if available, otherwise null
   */
  private static getMOBIdForClass(
    className: ClassEnum,
    race: RaceEnum,
  ): MOBEnum | null {
    // Map race to lowercase prefix (Human -> human, Elven -> elven, etc.)
    const racePrefix =
      race.charAt(0).toLowerCase() + race.slice(1).toLowerCase();
    // Class name should match exactly (Warrior, Mage, Cleric, etc.)
    const classSuffix = className;
    const mobKey = `${racePrefix}${classSuffix}` as keyof typeof MOBEnum;

    // Check if this MOB exists in the enum and repository
    if (mobKey in MOBEnum) {
      const mobId = MOBEnum[mobKey as keyof typeof MOBEnum];
      if (mobId in mobRepository) {
        return mobId;
      }
    }

    return null;
  }

  /**
   * Create a custom character of a specific class and race
   * TODO: This should use the actual MOB factory functions from mobRepository
   * For now, it tries to use the MOB factory if available, otherwise falls back to manual creation
   */
  private static createCharacterOfClass(
    className: ClassEnum,
    race: RaceEnum,
    difficulty: 1 | 2 | 3 | 4 | 5,
    nameEn: string,
    nameTh: string,
  ): Character {
    // Try to get the MOB factory for this race/class combination
    const mobId = this.getMOBIdForClass(className, race);

    if (mobId && mobId in mobRepository) {
      // Use the predefined MOB factory
      const mobFactory = mobRepository[mobId];
      const character = mobFactory(difficulty);
      // Override name
      character.name = { en: nameEn, th: nameTh };
      return character;
    }

    // Fallback to manual creation (old implementation)
    // TODO: Remove this fallback once all race/class combinations are mapped to MOB factories
    const baseAttrs = RACE_ATTRIBUTES[race].attributes;

    // Default stats - will be customized per class
    let hp = scaleByDifficulty(20, difficulty);
    let mp = scaleByDifficulty(20, difficulty);
    let sp = scaleByDifficulty(20, difficulty);

    const attrMods: Record<string, number> = {};
    const proficiencies: Record<string, number> = {};
    const activeSkills: CharacterSkillObject[] = [];

    const equipments: { id: EquipmentId; slot: CharacterEquipmentSlot }[] = [];

    // Customize based on class
    switch (className) {
      case ClassEnum.Monk:
        hp = scaleByDifficulty(20, difficulty);
        mp = scaleByDifficulty(10, difficulty);
        sp = scaleByDifficulty(30, difficulty);
        Object.assign(attrMods, {
          strength: 2,
          dexterity: 3,
          agility: 2,
          endurance: 2,
          willpower: 1,
          control: 1,
        });
        Object.assign(proficiencies, {
          bareHand: 10,
          dagger: 3,
          sword: 4,
          blade: 5,
          staff: 3,
        });
        activeSkills.push({
          id: MonkSkillId.FlurryOfBlows as SkillId,
          level: difficulty,
          exp: 0,
        });
        activeSkills.push({
          id: MonkSkillId.PalmStrike as SkillId,
          level: difficulty,
          exp: 0,
        });
        equipments.push({
          id: BodyId.Tunic,
          slot: CharacterEquipmentSlot.body,
        });
        break;

      case ClassEnum.Duelist:
        hp = scaleByDifficulty(25, difficulty);
        mp = scaleByDifficulty(15, difficulty);
        sp = scaleByDifficulty(25, difficulty);
        Object.assign(attrMods, {
          dexterity: 3,
          control: 2,
          agility: 2,
          strength: 1,
          intelligence: 1,
        });
        Object.assign(proficiencies, {
          blade: 10,
          sword: 8,
          dagger: 6,
          bareHand: 4,
        });
        activeSkills.push({
          id: DuelistSkillId.DuelingStance as SkillId,
          level: difficulty,
          exp: 0,
        });
        activeSkills.push({
          id: DuelistSkillId.BladeFlurry as SkillId,
          level: difficulty,
          exp: 0,
        });
        activeSkills.push({
          id: DuelistSkillId.ParryRiposte as SkillId,
          level: difficulty,
          exp: 0,
        });
        activeSkills.push({
          id: DuelistSkillId.PreciseStrike as SkillId,
          level: difficulty,
          exp: 0,
        });
        equipments.push({
          id: BladeId.Scimitar,
          slot: CharacterEquipmentSlot.rightHand,
        });
        equipments.push({
          id: BodyId.LeatherArmor,
          slot: CharacterEquipmentSlot.body,
        });
        break;

      case ClassEnum.Witch:
        hp = scaleByDifficulty(20, difficulty);
        mp = scaleByDifficulty(30, difficulty);
        sp = scaleByDifficulty(10, difficulty);
        Object.assign(attrMods, {
          intelligence: 3,
          control: 3,
          planar: 2,
          willpower: 1,
        });
        Object.assign(proficiencies, {
          wand: 8,
          staff: 6,
          book: 5,
          orb: 4,
        });
        activeSkills.push({
          id: WitchSkillId.Bewitch as SkillId,
          level: difficulty,
          exp: 0,
        });
        activeSkills.push({
          id: WitchSkillId.ChaosBinding as SkillId,
          level: difficulty,
          exp: 0,
        });
        activeSkills.push({
          id: WitchSkillId.PoisonDart as SkillId,
          level: difficulty,
          exp: 0,
        });
        break;

      case ClassEnum.Inquisitor:
        hp = scaleByDifficulty(20, difficulty);
        mp = scaleByDifficulty(20, difficulty);
        sp = scaleByDifficulty(20, difficulty);
        Object.assign(attrMods, {
          willpower: 3,
          planar: 2,
          control: 2,
          strength: 1,
        });
        Object.assign(proficiencies, {
          sword: 7,
          blade: 6,
          staff: 5,
          book: 4,
          wand: 4,
        });
        activeSkills.push({
          id: InquisitorSkillId.JudgmentDay as SkillId,
          level: difficulty,
          exp: 0,
        });
        activeSkills.push({
          id: InquisitorSkillId.PurgeMagic as SkillId,
          level: difficulty,
          exp: 0,
        });
        activeSkills.push({
          id: InquisitorSkillId.ExposeWeakness as SkillId,
          level: difficulty,
          exp: 0,
        });
        activeSkills.push({
          id: InquisitorSkillId.RadiantSmite as SkillId,
          level: difficulty,
          exp: 0,
        });
        equipments.push({
          id: BookWId.Bible,
          slot: CharacterEquipmentSlot.rightHand,
        });
        equipments.push({
          id: BodyId.MageRobe,
          slot: CharacterEquipmentSlot.body,
        });
        break;

      case ClassEnum.Scholar:
        hp = scaleByDifficulty(20, difficulty);
        mp = scaleByDifficulty(25, difficulty);
        sp = scaleByDifficulty(15, difficulty);
        Object.assign(attrMods, {
          intelligence: 3,
          control: 2,
          planar: 1,
          dexterity: 1,
        });
        Object.assign(proficiencies, {
          book: 8,
          staff: 5,
          wand: 4,
          orb: 3,
        });
        activeSkills.push({
          id: ScholarSkillId.CognitiveOverload,
          level: difficulty,
          exp: 0,
        });
        activeSkills.push({
          id: ScholarSkillId.Analyze as SkillId,
          level: difficulty,
          exp: 0,
        });
        activeSkills.push({
          id: ScholarSkillId.DisruptPattern as SkillId,
          level: Math.max(1, difficulty - 1),
          exp: 0,
        });
        equipments.push({
          id: BookWId.Codex,
          slot: CharacterEquipmentSlot.rightHand,
        });
        equipments.push({
          id: BodyId.MageRobe,
          slot: CharacterEquipmentSlot.body,
        });
        break;

      case ClassEnum.SpellBlade:
        hp = scaleByDifficulty(20, difficulty);
        mp = scaleByDifficulty(25, difficulty);
        sp = scaleByDifficulty(15, difficulty);
        Object.assign(attrMods, {
          planar: 2,
          dexterity: 2,
          agility: 2,
        });
        Object.assign(proficiencies, {
          blade: 10,
          sword: 10,
          staff: 5,
          wand: 4,
        });
        activeSkills.push({
          id: SpellBladeSkillId.EdgeBurst,
          level: Math.max(1, difficulty - 1),
          exp: 0,
        });
        activeSkills.push({
          id: SpellBladeSkillId.SpellParry,
          level: Math.max(1, difficulty - 1),
          exp: 0,
        });
        activeSkills.push({
          id: SpellBladeSkillId.PlanarEdge,
          level: difficulty,
          exp: 0,
        });
        equipments.push({
          id: BodyId.LeatherArmor,
          slot: CharacterEquipmentSlot.body,
        });
        break;

      case ClassEnum.Mystic:
        hp = scaleByDifficulty(20, difficulty);
        mp = scaleByDifficulty(20, difficulty);
        sp = scaleByDifficulty(20, difficulty);
        Object.assign(attrMods, {
          planar: 2,
          control: 2,
          willpower: 3,
          intelligence: 1,
        });
        Object.assign(proficiencies, {
          staff: 7,
          bareHand: 10,
          wand: 6,
          orb: 5,
          book: 4,
        });
        activeSkills.push({
          id: MysticSkillId.InnerVeil as SkillId,
          level: difficulty,
          exp: 0,
        });
        activeSkills.push({
          id: MysticSkillId.MistStep as SkillId,
          level: difficulty,
          exp: 0,
        });
        activeSkills.push({
          id: MysticSkillId.ReversalPalm as SkillId,
          level: Math.max(1, difficulty - 1),
          exp: 0,
        });
        equipments.push({
          id: BodyId.MageRobe,
          slot: CharacterEquipmentSlot.body,
        });
        break;

      case ClassEnum.Shaman:
        hp = scaleByDifficulty(20, difficulty);
        mp = scaleByDifficulty(25, difficulty);
        sp = scaleByDifficulty(15, difficulty);
        Object.assign(attrMods, {
          willpower: 2,
          planar: 2,
          control: 2,
          vitality: 1,
        });
        Object.assign(proficiencies, {
          staff: 7,
          wand: 5,
          book: 4,
          orb: 3,
        });
        activeSkills.push({
          id: ShamanSkillId.ChaoticBlessing,
          level: difficulty,
          exp: 0,
        });
        activeSkills.push({
          id: ShamanSkillId.HolyRattle,
          level: Math.max(1, difficulty - 1),
          exp: 0,
        });
        activeSkills.push({
          id: ShamanSkillId.HexOfRot,
          level: Math.max(1, difficulty - 1),
          exp: 0,
        });
        activeSkills.push({
          id: ShamanSkillId.MendSpirit,
          level: Math.max(1, difficulty - 1),
          exp: 0,
        });
        equipments.push({
          id: StaffId.QuarterStaff,
          slot: CharacterEquipmentSlot.rightHand,
        });
        equipments.push({
          id: BodyId.Robe,
          slot: CharacterEquipmentSlot.body,
        });
        break;

      case ClassEnum.Knight:
        hp = scaleByDifficulty(25, difficulty);
        mp = scaleByDifficulty(10, difficulty);
        sp = scaleByDifficulty(25, difficulty);
        Object.assign(attrMods, {
          strength: 3,
          endurance: 2,
          vitality: 2,
          leadership: 1,
          willpower: 1,
        });
        Object.assign(proficiencies, {
          sword: 10,
          blade: 8,
          spear: 10,
          shield: 9,
          axe: 6,
          hammer: 6,
        });
        activeSkills.push({
          id: KnightSkillId.AdvancingPace,
          level: Math.max(1, difficulty - 1),
          exp: 0,
        });
        equipments.push({
          id: SwordId.LongSword,
          slot: CharacterEquipmentSlot.rightHand,
        });
        equipments.push({
          id: ShieldId.Buckler,
          slot: CharacterEquipmentSlot.leftHand,
        });
        equipments.push({
          id: BodyId.ChainShirt,
          slot: CharacterEquipmentSlot.body,
        });
        break;

      case ClassEnum.Guardian:
        hp = scaleByDifficulty(25, difficulty);
        mp = scaleByDifficulty(10, difficulty);
        sp = scaleByDifficulty(25, difficulty);
        Object.assign(attrMods, {
          endurance: 3,
          vitality: 3,
          strength: 2,
          willpower: 1,
        });
        Object.assign(proficiencies, {
          shield: 10,
          sword: 8,
          hammer: 7,
          axe: 6,
          spear: 5,
        });
        activeSkills.push({
          id: GuardianSkillId.Bash,
          level: Math.max(1, difficulty - 1),
          exp: 0,
        });
        activeSkills.push({
          id: GuardianSkillId.HerosPose,
          level: Math.max(1, difficulty - 1),
          exp: 0,
        });
        activeSkills.push({
          id: GuardianSkillId.ShieldUp,
          level: Math.max(1, difficulty - 1),
          exp: 0,
        });
        activeSkills.push({
          id: GuardianSkillId.Taunt,
          level: Math.max(1, difficulty - 1),
          exp: 0,
        });
        equipments.push({
          id: SwordId.ShortSword,
          slot: CharacterEquipmentSlot.rightHand,
        });
        equipments.push({
          id: ShieldId.Buckler,
          slot: CharacterEquipmentSlot.leftHand,
        });
        equipments.push({
          id: BodyId.ChainShirt,
          slot: CharacterEquipmentSlot.body,
        });
        break;

      case ClassEnum.Warrior:
        hp = scaleByDifficulty(25, difficulty);
        mp = scaleByDifficulty(10, difficulty);
        sp = scaleByDifficulty(25, difficulty);
        Object.assign(attrMods, {
          strength: 3,
          endurance: 2,
          vitality: 2,
          leadership: 1,
        });
        Object.assign(proficiencies, {
          sword: 9,
          axe: 8,
          hammer: 8,
          shield: 9,
          blade: 7,
        });
        // Order: Hardest first (WarCry needs 3 SP + 2 fire), easiest last (PowerStrike needs 2 neutral)
        activeSkills.push({
          id: WarriorSkillId.WarCry as SkillId,
          level: difficulty,
          exp: 0,
        });
        activeSkills.push({
          id: WarriorSkillId.PowerStrike as SkillId,
          level: Math.max(1, difficulty - 1),
          exp: 0,
        });
        equipments.push({
          id: SwordId.GreatSword,
          slot: CharacterEquipmentSlot.rightHand,
        });
        equipments.push({
          id: BodyId.PaddedArmor,
          slot: CharacterEquipmentSlot.body,
        });
        break;

      case ClassEnum.Cleric:
        hp = scaleByDifficulty(20, difficulty);
        mp = scaleByDifficulty(25, difficulty);
        sp = scaleByDifficulty(15, difficulty);
        Object.assign(attrMods, {
          willpower: 3,
          planar: 2,
          control: 2,
          vitality: 1,
        });
        Object.assign(proficiencies, {
          hammer: 10,
          staff: 11,
          shield: 10,
          orb: 9,
        });
        activeSkills.push({
          id: ClericSkillId.Bless as SkillId,
          level: Math.max(1, difficulty - 1),
          exp: 0,
        });
        activeSkills.push({
          id: ClericSkillId.Radiance as SkillId,
          level: Math.max(1, difficulty - 1),
          exp: 0,
        });
        activeSkills.push({
          id: ClericSkillId.Heal as SkillId,
          level: difficulty,
          exp: 0,
        });
        equipments.push({
          id: StaffId.QuarterStaff,
          slot: CharacterEquipmentSlot.rightHand,
        });
        equipments.push({ id: BodyId.Robe, slot: CharacterEquipmentSlot.body });
        break;

      case ClassEnum.Paladin:
        hp = scaleByDifficulty(25, difficulty);
        mp = scaleByDifficulty(15, difficulty);
        sp = scaleByDifficulty(20, difficulty);
        Object.assign(attrMods, {
          strength: 2,
          willpower: 3,
          planar: 2,
          endurance: 2,
        });
        Object.assign(proficiencies, {
          sword: 8,
          shield: 10,
          hammer: 10,
          blade: 7,
        });
        // Order: Hardest first (DivineStrike needs 2 SP + 2 order), easiest last (Radiance needs 2 MP)
        activeSkills.push({
          id: PaladinSkillId.AegisPulse as SkillId,
          level: Math.max(1, difficulty - 1),
          exp: 0,
        });
        activeSkills.push({
          id: PaladinSkillId.AegisShield as SkillId,
          level: Math.max(1, difficulty - 1),
          exp: 0,
        });
        activeSkills.push({
          id: PaladinSkillId.DivineStrike as SkillId,
          level: Math.max(1, difficulty - 1),
          exp: 0,
        });
        equipments.push({
          id: HammerId.Hammer,
          slot: CharacterEquipmentSlot.rightHand,
        });
        equipments.push({
          id: ShieldId.Buckler,
          slot: CharacterEquipmentSlot.leftHand,
        });
        equipments.push({
          id: BodyId.StuddedLeatherArmor,
          slot: CharacterEquipmentSlot.body,
        });
        break;

      case ClassEnum.Druid:
        hp = scaleByDifficulty(20, difficulty);
        mp = scaleByDifficulty(20, difficulty);
        sp = scaleByDifficulty(20, difficulty);
        Object.assign(attrMods, {
          willpower: 3,
          planar: 2,
          control: 2,
          vitality: 1,
        });
        Object.assign(proficiencies, { staff: 10, wand: 7, book: 6, orb: 5 });
        activeSkills.push({
          id: DruidSkillId.ThrowSpear as SkillId,
          level: difficulty,
          exp: 0,
        });
        activeSkills.push({
          id: DruidSkillId.VineWhip as SkillId,
          level: difficulty,
          exp: 0,
        });
        activeSkills.push({
          id: DruidSkillId.RejuvenatingMist as SkillId,
          level: difficulty,
          exp: 0,
        });
        equipments.push({
          id: SpearId.Javelin,
          slot: CharacterEquipmentSlot.rightHand,
        });
        equipments.push({
          id: BodyId.HideArmor,
          slot: CharacterEquipmentSlot.body,
        });
        break;

      case ClassEnum.Mage:
        hp = scaleByDifficulty(15, difficulty);
        mp = scaleByDifficulty(35, difficulty);
        sp = scaleByDifficulty(10, difficulty);
        Object.assign(attrMods, {
          intelligence: 3,
          planar: 3,
          control: 2,
          willpower: 1,
        });
        Object.assign(proficiencies, { wand: 10, staff: 9, book: 10, orb: 9 });
        // Order: Both are similar (2 MP, no elements), but FireBolt produces fire (more useful for chains)
        // So put ArcaneBolt first (less useful), FireBolt last (more useful, cantrip-like)
        activeSkills.push({
          id: MageSkillId.Backdraft as SkillId,
          level: Math.max(1, difficulty - 1),
          exp: 0,
        });
        activeSkills.push({
          id: MageSkillId.BurningHand as SkillId,
          level: Math.max(1, difficulty - 1),
          exp: 0,
        });
        activeSkills.push({
          id: MageSkillId.FireBolt as SkillId,
          level: Math.max(1, difficulty - 1),
          exp: 0,
        });
        equipments.push({
          id: WandId.Wand,
          slot: CharacterEquipmentSlot.rightHand,
        });
        equipments.push({
          id: BodyId.MageRobe,
          slot: CharacterEquipmentSlot.body,
        });
        break;

      case ClassEnum.Rogue:
        hp = scaleByDifficulty(20, difficulty);
        mp = scaleByDifficulty(10, difficulty);
        sp = scaleByDifficulty(30, difficulty);
        Object.assign(attrMods, {
          dexterity: 3,
          agility: 3,
          control: 2,
          strength: 1,
        });
        Object.assign(proficiencies, {
          dagger: 11,
          sword: 10,
          bow: 10,
          bareHand: 9,
        });
        activeSkills.push({
          id: RogueSkillId.Backstab as SkillId,
          level: difficulty,
          exp: 0,
        });
        activeSkills.push({
          id: RogueSkillId.Hiding as SkillId,
          level: Math.max(1, difficulty - 1),
          exp: 0,
        });
        activeSkills.push({
          id: RogueSkillId.ThrowingKnives as SkillId,
          level: difficulty,
          exp: 0,
        });
        equipments.push({
          id: DaggerId.Knife,
          slot: CharacterEquipmentSlot.rightHand,
        });
        equipments.push({
          id: BodyId.LeatherArmor,
          slot: CharacterEquipmentSlot.body,
        });
        break;

      case ClassEnum.Barbarian:
        hp = scaleByDifficulty(25, difficulty);
        mp = scaleByDifficulty(5, difficulty);
        sp = scaleByDifficulty(30, difficulty);
        Object.assign(attrMods, {
          strength: 3,
          endurance: 3,
          vitality: 2,
          willpower: 1,
        });
        Object.assign(proficiencies, {
          axe: 10,
          hammer: 9,
          sword: 8,
          bareHand: 8,
        });
        activeSkills.push({
          id: BarbarianSkillId.RecklessSwing as SkillId,
          level: difficulty,
          exp: 0,
        });
        activeSkills.push({
          id: BarbarianSkillId.Rage as SkillId,
          level: difficulty,
          exp: 0,
        });
        equipments.push({
          id: AxeId.BroadAxe,
          slot: CharacterEquipmentSlot.rightHand,
        });
        equipments.push({
          id: BodyId.LeatherArmor,
          slot: CharacterEquipmentSlot.body,
        });
        break;

      case ClassEnum.Warlock:
        hp = scaleByDifficulty(20, difficulty);
        mp = scaleByDifficulty(25, difficulty);
        sp = scaleByDifficulty(15, difficulty);
        Object.assign(attrMods, {
          intelligence: 2,
          planar: 3,
          control: 2,
          willpower: 2,
        });
        Object.assign(proficiencies, { wand: 9, staff: 8, book: 8, orb: 7 });
        activeSkills.push({
          id: WarlockSkillId.DarkPact as SkillId,
          level: difficulty,
          exp: 0,
        });
        activeSkills.push({
          id: WarlockSkillId.LifeDrain as SkillId,
          level: difficulty,
          exp: 0,
        });
        activeSkills.push({
          id: WarlockSkillId.Corruption as SkillId,
          level: difficulty,
          exp: 0,
        });
        activeSkills.push({
          id: WarlockSkillId.ChaosBolt as SkillId,
          level: difficulty,
          exp: 0,
        });
        equipments.push({
          id: WandId.Wand,
          slot: CharacterEquipmentSlot.rightHand,
        });
        equipments.push({
          id: BodyId.MageRobe,
          slot: CharacterEquipmentSlot.body,
        });
        break;

      default:
        // Fallback for unknown classes - use basic stats
        Object.assign(attrMods, { strength: 1, dexterity: 1 });
        Object.assign(proficiencies, { sword: 5, bareHand: 3 });
    }

    const character = new Character({
      actionSequence: defaultActionSequence(),
      alignment: new CharacterAlignment({}),
      artisans: new CharacterArtisans({}),
      attribute: makeAttribute({
        charisma: scaleByDifficulty(
          baseAttrs.charisma + (attrMods.charisma || 0),
          difficulty,
        ),
        luck: scaleByDifficulty(
          baseAttrs.luck + (attrMods.luck || 0),
          difficulty,
        ),
        intelligence: scaleByDifficulty(
          baseAttrs.intelligence + (attrMods.intelligence || 0),
          difficulty,
        ),
        leadership: scaleByDifficulty(
          baseAttrs.leadership + (attrMods.leadership || 0),
          difficulty,
        ),
        vitality: scaleByDifficulty(
          baseAttrs.vitality + (attrMods.vitality || 0),
          difficulty,
        ),
        willpower: scaleByDifficulty(
          baseAttrs.willpower + (attrMods.willpower || 0),
          difficulty,
        ),
        planar: scaleByDifficulty(
          baseAttrs.planar + (attrMods.planar || 0),
          difficulty,
        ),
        control: scaleByDifficulty(
          baseAttrs.control + (attrMods.control || 0),
          difficulty,
        ),
        dexterity: scaleByDifficulty(
          baseAttrs.dexterity + (attrMods.dexterity || 0),
          difficulty,
        ),
        agility: scaleByDifficulty(
          baseAttrs.agility + (attrMods.agility || 0),
          difficulty,
        ),
        strength: scaleByDifficulty(
          baseAttrs.strength + (attrMods.strength || 0),
          difficulty,
        ),
        endurance: scaleByDifficulty(
          baseAttrs.endurance + (attrMods.endurance || 0),
          difficulty,
        ),
      }),
      battleStats: new CharacterBattleStats(),
      elements: new CharacterElements(),
      fame: new CharacterFame(),
      id: `${className}_${race}_${Bun.randomUUIDv7()}`,
      level: difficulty,
      name: { en: nameEn, th: nameTh },
      needs: new CharacterNeeds(),
      proficiencies: makeProficiencies(proficiencies),
      saveRolls: defaultSaveRoll,
      type: CharacterType.humanoid,
      vitals: new CharacterVitals({
        hp: new Vital({ base: hp }),
        mp: new Vital({ base: mp }),
        sp: new Vital({ base: sp }),
      }),
    });

    character.race = race;
    character.activeSkills = activeSkills;
    character.conditionalSkills = [];
    character.conditionalSkillsCondition = new DeckCondition({});
    for (const equipment of equipments) {
      equipDirect(character, equipment.id, equipment.slot);
    }

    return character;
  }

  /**
   * Build a character from configuration
   */
  static buildCharacter(config: CharacterConfig): Character {
    let character: Character;

    if (config.type === "mob" && config.mobId) {
      // Use predefined MOB
      const mobFactory = mobRepository[config.mobId];
      if (!mobFactory) {
        throw new Error(`Unknown MOB: ${config.mobId}`);
      }
      character = mobFactory(config.level);
    } else if (config.type === "custom" && config.race && config.class) {
      // Create custom character
      character = this.createCharacterOfClass(
        config.class,
        config.race,
        config.level,
        config.name.en,
        config.name.th,
      );
    } else {
      throw new Error(
        "Invalid character configuration: must specify mobId for mob type or race+class for custom type",
      );
    }

    // Override name
    character.name = config.name;

    // Set position
    character.position = config.position;

    // Register character
    activeCharacterRegistry[character.id] = character;

    return character;
  }

  /**
   * Build multiple characters from configurations
   */
  static buildCharacters(configs: CharacterConfig[]): Character[] {
    return configs.map((config) => this.buildCharacter(config));
  }

  /**
   * Clean up characters from registry (call after battle)
   */
  static cleanupCharacters(characterIds: string[]): void {
    for (const id of characterIds) {
      delete activeCharacterRegistry[id];
    }
  }
}
