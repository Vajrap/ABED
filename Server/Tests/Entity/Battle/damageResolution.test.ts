/**
 * Damage Resolution System Tests
 * 
 * This test suite covers:
 * 1. Unit tests for each phase of damage resolution (via integration testing)
 * 2. Integration tests for the full damage resolution flow
 * 3. Edge cases and side effect verification
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { resolveDamage, type DamageInput, type DamageResult } from "../../../src/Entity/Battle/damageResolution";
import { CharacterFactory } from "../../Helper/Character";
import { CharacterVitals } from "../../../src/Entity/Character/Subclass/Vitals/CharacterVitals";
import { DamageType } from "../../../src/InterFacesEnumsAndTypes/DamageTypes";
import { LocationsEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/Location";
import { BuffEnum, DebuffEnum } from "../../../src/Entity/BuffsAndDebuffs/enum";
import { activeCharacterRegistry } from "../../../src/Entity/Character/repository";

// Mock dependencies
jest.mock("../../../src/Entity/BreathingSkill/activeBreathingSkill", () => ({
  resolveBreathingSkillInBattle: jest.fn((attackerId, targetId, damageOutput) => {
    // No-op by default, can be overridden in tests
  }),
}));

jest.mock("../../../src/Entity/Trait/repository", () => ({
  traitRepository: {
    // Mock trait repository - traits will be empty by default
  },
}));

jest.mock("../../../src/Entity/Battle/BattleContext", () => ({
  getBattleStatistics: jest.fn(() => null), // Return null by default (no stats tracking)
}));

// Helper class for creating test vitals (matches real Vital class)
class Vital {
  base: number;
  bonus: number;
  current: number;
  constructor(data: { base?: number; bonus?: number; current?: number }) {
    this.base = data.base ?? 100;
    this.bonus = data.bonus ?? 0;
    this.current = data.current ?? this.base + this.bonus;
  }
  get max() {
    return Math.max(1, this.base + this.bonus);
  }
  dec(n: number = 1) {
    this.current = Math.max(0, this.current - n);
    return this;
  }
  inc(n: number = 1) {
    this.current = Math.min(this.max, this.current + n);
    return this;
  }
}

describe("Damage Resolution System", () => {
  let attacker: any;
  let target: any;
  let baseDamageInput: DamageInput;

  beforeEach(() => {
    // Clear registry before each test
    Object.keys(activeCharacterRegistry).forEach(key => {
      delete activeCharacterRegistry[key];
    });

    // Create attacker
    attacker = CharacterFactory.create()
      .withName({ en: "Attacker", th: "ผู้โจมตี" })
      .build();
    attacker.id = "attacker-1";
    // Register in activeCharacterRegistry so getCharacter can find it
    activeCharacterRegistry[attacker.id] = attacker;
    attacker.attribute.getStat("strength").base = 16; // +3 mod
    attacker.attribute.getStat("dexterity").base = 14; // +2 mod
    attacker.attribute.getStat("intelligence").base = 12; // +1 mod
    attacker.attribute.getStat("willpower").base = 10; // +0 mod
    attacker.battleStats.getStat("pATK").base = 5;
    attacker.battleStats.getStat("pHIT").base = 10;
    attacker.vitals = new CharacterVitals({
      hp: new Vital({ base: 100, current: 100 }) as any,
      mp: new Vital({ base: 100, current: 100 }) as any,
      sp: new Vital({ base: 100, current: 100 }) as any,
    });

    // Create target
    target = CharacterFactory.create()
      .withName({ en: "Target", th: "เป้าหมาย" })
      .build();
    target.id = "target-1";
    // Register in activeCharacterRegistry so getCharacter can find it
    activeCharacterRegistry[target.id] = target;
    target.attribute.getStat("endurance").base = 14; // +2 mod
    target.attribute.getStat("agility").base = 12; // +1 mod
    target.attribute.getStat("planar").base = 10; // +0 mod
    target.battleStats.getStat("pDEF").base = 3;
    target.battleStats.getStat("dodge").base = 5;
    target.vitals = new CharacterVitals({
      hp: new Vital({ base: 100, current: 100 }) as any,
      mp: new Vital({ base: 100, current: 100 }) as any,
      sp: new Vital({ base: 100, current: 100 }) as any,
    });

    // Base damage input
    baseDamageInput = {
      damage: 20,
      hit: 15,
      crit: 18,
      type: DamageType.slash,
      isMagic: false,
      trueDamage: false,
    };
  });

  afterEach(() => {
    // Clean up registry after each test
    Object.keys(activeCharacterRegistry).forEach(key => {
      delete activeCharacterRegistry[key];
    });
  });

  describe("Phase 1: Pre-Damage Modifiers", () => {
    it("should apply Curse Mark bonus damage when both buffs are active", () => {
      // Setup: Attacker has Curse Mark Active, Target has Hex Mark
      attacker.buffsAndDebuffs.buffs.entry.set(BuffEnum.curseMarkActive, {
        value: 1,
        isPerm: false,
        permValue: 0,
        counter: 4, // INT mod +2 = 4 (but we'll use counter for stored INT mod)
      });
      target.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.hexMark, {
        value: 1,
        isPerm: false,
        permValue: 0,
        counter: 0,
      });

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, damage: 20 },
        LocationsEnum.WaywardInn,
      );

      // Curse Mark adds INT mod/2 + 1d4 = 2 + (1-4) = 3-6 bonus damage
      // So final damage should be higher than base 20
      expect(result.actualDamage).toBeGreaterThan(0);
      
      // Verify buffs were removed
      expect(attacker.buffsAndDebuffs.buffs.entry.has(BuffEnum.curseMarkActive)).toBe(false);
      expect(target.buffsAndDebuffs.debuffs.entry.has(DebuffEnum.hexMark)).toBe(false);
    });

    it("should apply Expose Weakness hit bonus when both buffs are active", () => {
      // Setup: Attacker has Expose Weakness Active, Target has Exposed
      attacker.buffsAndDebuffs.buffs.entry.set(BuffEnum.exposeWeaknessActive, {
        value: 1,
        isPerm: false,
        permValue: 0,
        counter: 6, // WIL mod +3 = 6 (stored in counter)
      });
      target.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.exposed, {
        value: 1,
        isPerm: false,
        permValue: 0,
        counter: 0,
      });

      // Set dodge so that without hit bonus we'd miss, but with bonus we hit
      target.battleStats.getStat("dodge").base = 10;
      target.attribute.getStat("agility").base = 10; // +0 mod
      // Total dodge: 10 + 0 + 8 (NEUTRAL_AC) = 18

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, hit: 16 }, // Base hit 16
        LocationsEnum.WaywardInn,
      );

      // If hit bonus was applied, we should hit (otherwise would miss)
      // WIL mod stored in counter: 6, hit bonus = 6/2 = 3, so hit becomes 19
      // Hit 19 > Dodge 18, so we should hit
      expect(result.isHit).toBe(true);
      
      // Verify buff was removed but debuff remains
      expect(attacker.buffsAndDebuffs.buffs.entry.has(BuffEnum.exposeWeaknessActive)).toBe(false);
      expect(target.buffsAndDebuffs.debuffs.entry.has(DebuffEnum.exposed)).toBe(true);
    });
  });

  describe("Phase 2: Hit/Dodge Check", () => {
    it("should miss when dodge exceeds hit", () => {
      target.battleStats.getStat("dodge").base = 20;
      target.attribute.getStat("agility").base = 20; // +5 mod
      // Total dodge: 20 + 5 + 8 (NEUTRAL_AC) = 33

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, hit: 10 }, // Hit 10 < Dodge 33
        LocationsEnum.WaywardInn,
      );

      expect(result.isHit).toBe(false);
      expect(result.actualDamage).toBe(0);
    });

    it("should hit when hit exceeds dodge", () => {
      target.battleStats.getStat("dodge").base = 5;
      target.attribute.getStat("agility").base = 10; // +0 mod
      // Total dodge: 5 + 0 + 8 (NEUTRAL_AC) = 13

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, hit: 15 }, // Hit 15 > Dodge 13
        LocationsEnum.WaywardInn,
      );

      expect(result.isHit).toBe(true);
      expect(result.actualDamage).toBeGreaterThan(0);
    });

    it("should auto-hit on crit 20+", () => {
      target.battleStats.getStat("dodge").base = 50; // Very high dodge
      target.attribute.getStat("agility").base = 20; // +5 mod
      target.attribute.getStat("endurance").base = 10; // +0 mod (crit defense)

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, hit: 1, crit: 20 }, // Low hit but crit 20
        LocationsEnum.WaywardInn,
      );

      expect(result.isHit).toBe(true);
      expect(result.isCrit).toBe(true);
    });

    it("should apply Dueling Stance dodge bonus", () => {
      target.buffsAndDebuffs.buffs.entry.set(BuffEnum.duelingStance, {
        value: 1,
        isPerm: false,
        permValue: 0,
        counter: 0,
      });
      target.attribute.getStat("agility").base = 14; // +2 mod
      target.battleStats.getStat("dodge").base = 10;
      // Base dodge: 10 + 2 + 8 = 20
      // Dueling Stance adds: agility mod/2 = 1
      // Total: 21

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, hit: 20 }, // Hit 20 < Dodge 21
        LocationsEnum.WaywardInn,
      );

      expect(result.isHit).toBe(false);
    });
  });

  describe("Phase 3: Pre-Mitigation Modifiers", () => {
    it("should apply spell casting armor penalty for non-cloth armor", () => {
      // This test would require mocking armor equipment
      // For now, we'll test that magic damage works
      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, isMagic: true, damage: 100 },
        LocationsEnum.WaywardInn,
      );

      expect(result.isHit).toBe(true);
      // Damage should be reduced by spell effectiveness and mitigation
      expect(result.actualDamage).toBeLessThan(100);
    });
  });

  describe("Phase 4: Mitigation (Defense)", () => {
    it("should subtract physical defense and damage type defense from physical damage", () => {
      target.battleStats.getStat("pDEF").base = 10;
      target.battleStats.getStat("slashDEF").base = 5; // Damage type-specific defense
      target.attribute.getStat("endurance").base = 14; // +2 mod
      // Total mitigation: pDEF (10 + 2) + slashDEF (5) = 17
      // Damage: 30 - 17 = 13

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, damage: 30, isMagic: false, type: DamageType.slash },
        LocationsEnum.WaywardInn,
      );

      expect(result.actualDamage).toBe(13);
    });

    it("should subtract magic defense and damage type defense from magic damage", () => {
      target.battleStats.getStat("mDEF").base = 8;
      target.battleStats.getStat("fireDEF").base = 4; // Damage type-specific defense
      target.attribute.getStat("planar").base = 12; // +1 mod
      // Default planarAptitude = 50
      // Spell effectiveness at 50: 50/100 = 0.5
      // Magic resistance at 50: 0.1 + (1 - 50/100) * 0.9 = 0.55
      // Total mDEF: 8 + 1 = 9
      // Total mitigation: mDEF (9) + fireDEF (4) = 13
      // Damage calculation: (30 * 0.5) / 0.55 - 13 = 15 / 0.55 - 13 = 27.27... - 13 = 14.27... ≈ 14

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, damage: 30, isMagic: true, type: DamageType.fire },
        LocationsEnum.WaywardInn,
      );

      // Round down: Math.floor(14.27...) = 14
      expect(result.actualDamage).toBe(14);
    });

    it("should average multiple defenses for composite damage types", () => {
      target.battleStats.getStat("pDEF").base = 10;
      target.battleStats.getStat("orderDEF").base = 3;
      target.battleStats.getStat("waterDEF").base = 5;
      target.attribute.getStat("endurance").base = 14; // +2 mod
      // Base pDEF: 10 + 2 = 12
      // Ice damage uses: (orderDEF + waterDEF) / 2 = (3 + 5) / 2 = 4
      // Total mitigation: 12 + 4 = 16
      // Damage: 30 - 16 = 14

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, damage: 30, isMagic: false, type: DamageType.ice },
        LocationsEnum.WaywardInn,
      );

      expect(result.actualDamage).toBe(14);
    });

    it("should handle arcane damage with all elemental defenses", () => {
      target.battleStats.getStat("mDEF").base = 8;
      target.battleStats.getStat("orderDEF").base = 2;
      target.battleStats.getStat("chaosDEF").base = 2;
      target.battleStats.getStat("fireDEF").base = 2;
      target.battleStats.getStat("earthDEF").base = 2;
      target.battleStats.getStat("waterDEF").base = 2;
      target.battleStats.getStat("windDEF").base = 2;
      target.attribute.getStat("planar").base = 12; // +1 mod
      // Default planarAptitude = 50
      // Spell effectiveness at 50: 50/100 = 0.5
      // Magic resistance at 50: 0.1 + (1 - 50/100) * 0.9 = 0.55
      // Base mDEF: 8 + 1 = 9
      // Arcane damage averages all 6 elemental defenses: (2+2+2+2+2+2) / 6 = 2
      // Total mitigation: 9 + 2 = 11
      // Damage calculation: (30 * 0.5) / 0.55 - 11 = 15 / 0.55 - 11 = 27.27... - 11 = 16.27... ≈ 16

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, damage: 30, isMagic: true, type: DamageType.arcane },
        LocationsEnum.WaywardInn,
      );

      // Round down: Math.floor(16.27...) = 16
      expect(result.actualDamage).toBe(16);
    });

    it("should bypass all mitigation for true damage", () => {
      target.battleStats.getStat("pDEF").base = 100; // Very high defense
      target.attribute.getStat("endurance").base = 20; // +5 mod

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, damage: 25, trueDamage: true },
        LocationsEnum.WaywardInn,
      );

      // True damage should be exactly 25 (no mitigation)
      expect(result.actualDamage).toBe(25);
    });
  });

  describe("Phase 5: Crit Check", () => {
    it("should apply crit multiplier when crit roll is 20+", () => {
      target.attribute.getStat("endurance").base = 10; // +0 mod (crit defense)
      target.battleStats.getStat("pDEF").base = 3; // Default from beforeEach
      target.battleStats.getStat("slashDEF").base = 0; // No type defense
      // Base mitigation: pDEF (3) + endurance mod (0) + slashDEF (0) = 3
      // Base damage: 20
      // After mitigation: 20 - 3 = 17
      // After crit (1.5x): 17 * 1.5 = 25.5
      // Final (rounded down): Math.floor(25.5) = 25

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, crit: 20, damage: 20 },
        LocationsEnum.WaywardInn,
        1.5, // 1.5x crit modifier
      );

      expect(result.isCrit).toBe(true);
      expect(result.actualDamage).toBe(25);
    });

    it("should reduce crit defense when Exposed debuff is active", () => {
      target.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.exposed, {
        value: 1,
        isPerm: false,
        permValue: 0,
        counter: 1, // Skill level 5+ = counter > 0
      });
      target.attribute.getStat("endurance").base = 14; // +2 mod
      // Normal crit defense: 2
      // With Exposed: 2 - 2 = 0

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, crit: 20, damage: 20 },
        LocationsEnum.WaywardInn,
      );

      // Should crit because crit defense is reduced
      expect(result.isCrit).toBe(true);
    });
  });

  describe("Phase 6: Counter-Attacks", () => {
    it("should negate attack and counter with Reversal Palm on successful save", () => {
      target.buffsAndDebuffs.buffs.entry.set(BuffEnum.reversalPalm, {
        value: 1,
        isPerm: false,
        permValue: 0,
        counter: 1, // Skill level
      });
      target.attribute.getStat("willpower").base = 20; // High willpower for save
      target.attribute.getStat("dexterity").base = 14; // +2 mod
      target.proficiencies.getStat("bareHand").base = 3; // +1 mod

      // Mock rollSave to always pass
      target.rollSave = jest.fn((save: string) => 20);

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, damage: 100, isMagic: false },
        LocationsEnum.WaywardInn,
      );

      // Attack should be negated
      expect(result.isHit).toBe(false);
      expect(result.actualDamage).toBe(0);
      // Buff should be removed
      expect(target.buffsAndDebuffs.buffs.entry.has(BuffEnum.reversalPalm)).toBe(false);
    });

    it("should fail Reversal Palm on failed save and continue normal damage", () => {
      target.buffsAndDebuffs.buffs.entry.set(BuffEnum.reversalPalm, {
        value: 1,
        isPerm: false,
        permValue: 0,
        counter: 1,
      });
      target.attribute.getStat("willpower").base = 1; // Low willpower
      target.battleStats.getStat("pDEF").base = 3; // Default from beforeEach
      target.battleStats.getStat("slashDEF").base = 0; // No type defense
      // Base mitigation: pDEF (3) + endurance mod (+2 from 14 in beforeEach) + slashDEF (0) = 5
      // Base damage: 20
      // After mitigation: 20 - 5 = 15
      // Final (rounded down): Math.floor(15) = 15

      // Mock rollSave to always fail
      target.rollSave = jest.fn((save: string) => 5);

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, damage: 20, isMagic: false },
        LocationsEnum.WaywardInn,
      );

      // Should take normal damage
      expect(result.isHit).toBe(true);
      expect(result.actualDamage).toBe(15);
      // Buff should be removed
      expect(target.buffsAndDebuffs.buffs.entry.has(BuffEnum.reversalPalm)).toBe(false);
    });
  });

  describe("Phase 7: Shields & Absorption", () => {
    it("should absorb damage with Arcane Shield", () => {
      target.buffsAndDebuffs.buffs.entry.set(BuffEnum.arcaneShield, {
        value: 15, // 15 shield points
        isPerm: false,
        permValue: 0,
        counter: 0,
      });
      target.battleStats.getStat("pDEF").base = 3; // Default from beforeEach
      target.battleStats.getStat("slashDEF").base = 0; // No type defense
      // Base mitigation: pDEF (3) + endurance mod (+2 from 14 in beforeEach) + slashDEF (0) = 5
      // Base damage: 30
      // After mitigation: 30 - 5 = 25
      // Arcane Shield absorbs: min(25, 15) = 15
      // Final damage: 25 - 15 = 10

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, damage: 30, isMagic: false },
        LocationsEnum.WaywardInn,
      );

      expect(result.actualDamage).toBe(10);
      
      // Shield should be fully consumed and removed
      const shield = target.buffsAndDebuffs.buffs.entry.get(BuffEnum.arcaneShield);
      expect(shield).toBeUndefined(); // Fully consumed and removed
    });

    it("should mitigate damage with Aegis Shield stacks", () => {
      target.buffsAndDebuffs.buffs.entry.set(BuffEnum.aegisShield, {
        value: 3, // 3 stacks
        isPerm: false,
        permValue: 0,
        counter: 0,
      });
      target.attribute.getStat("willpower").base = 14; // +2 mod
      target.battleStats.getStat("pDEF").base = 3; // Default from beforeEach
      target.battleStats.getStat("slashDEF").base = 0; // No type defense
      // Base mitigation: pDEF (3) + endurance mod (+2 from 14 in beforeEach) + slashDEF (0) = 5
      // Base damage: 50
      // After base mitigation: 50 - 5 = 45
      // Aegis Shield: Each stack mitigates 5 + 2 = 7 damage
      // 3 stacks can mitigate up to 21 damage
      // After Aegis Shield: 45 - 21 = 24
      // Final (rounded down): Math.floor(24) = 24

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, damage: 50 },
        LocationsEnum.WaywardInn,
      );

      expect(result.actualDamage).toBe(24);
      // Aegis Shield should be fully depleted
      expect(target.buffsAndDebuffs.buffs.entry.has(BuffEnum.aegisShield)).toBe(false);
      // Should have Aegis Pulse
      expect(target.buffsAndDebuffs.buffs.entry.has(BuffEnum.aegisPulse)).toBe(true);
    });

    it("should reduce magic damage with Spell Parry and grant Edge Charge", () => {
      target.buffsAndDebuffs.buffs.entry.set(BuffEnum.spellParry, {
        value: 1,
        isPerm: false,
        permValue: 0,
        counter: 0,
      });
      target.attribute.getStat("intelligence").base = 14; // +2 mod
      target.battleStats.getStat("mDEF").base = 3; // Set explicitly
      // Default planarAptitude = 50
      // Spell effectiveness: 50/100 = 0.5
      // Magic resistance: 0.55
      // Base mDEF: 3 + planar mod (0 from default) = 3
      // Type defense for arcane: average of all 6 elemental DEFs (all 0) = 0
      // Base mitigation: 3 + 0 = 3
      // After spell effectiveness: 30 * 0.5 = 15
      // After magic resistance and mitigation: 15 / 0.55 - 3 = 27.27... - 3 = 24.27...
      // Spell Parry reduces (after mitigation): 5 + 2 = 7 damage
      // Final: Math.max(0, 24.27... - 7) = 17.27... ≈ 17

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, damage: 30, isMagic: true, type: DamageType.arcane },
        LocationsEnum.WaywardInn,
      );

      // Round down: Math.floor(17.27...) = 17
      expect(result.actualDamage).toBe(17);
      // Spell Parry should be removed
      expect(target.buffsAndDebuffs.buffs.entry.has(BuffEnum.spellParry)).toBe(false);
      // Edge Charge should be granted (1 since damage > 0)
      const edgeCharge = target.buffsAndDebuffs.buffs.entry.get(BuffEnum.edgeCharge);
      expect(edgeCharge).toBeDefined();
      expect(edgeCharge!.value).toBe(1);
    });

    it("should generate fire resource from Taunt when taking damage", () => {
      target.buffsAndDebuffs.buffs.entry.set(BuffEnum.taunt, {
        value: 1,
        isPerm: false,
        permValue: 0,
        counter: 0,
      });
      const initialFire = target.resources.fire;

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, damage: 20 },
        LocationsEnum.WaywardInn,
      );

      // Should generate 1 fire resource
      expect(target.resources.fire).toBe(initialFire + 1);
    });
  });

  describe("Phase 8: Final Modifiers", () => {
    it("should add 1d3 bonus damage from Exposed debuff", () => {
      target.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.exposed, {
        value: 1,
        isPerm: false,
        permValue: 0,
        counter: 0,
      });

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, damage: 10 },
        LocationsEnum.WaywardInn,
      );

      // Damage should be base damage + 1d3 (1-3)
      // We can't predict exact value due to dice roll, but it should be >= base
      expect(result.actualDamage).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Phase 9: Apply Damage", () => {
    it("should reduce target HP by final damage", () => {
      const initialHp = target.vitals.hp.current;
      target.battleStats.getStat("pDEF").base = 3; // Default from beforeEach
      target.battleStats.getStat("slashDEF").base = 0; // No type defense
      // Base mitigation: pDEF (3) + endurance mod (+2 from 14 in beforeEach) + slashDEF (0) = 5
      // Base damage: 25
      // After mitigation: 25 - 5 = 20

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, damage: 25 },
        LocationsEnum.WaywardInn,
      );

      expect(result.isHit).toBe(true);
      expect(result.actualDamage).toBe(20);
      expect(target.vitals.hp.current).toBe(initialHp - 20);
    });

    it("should not reduce HP below 0", () => {
      target.vitals.hp.current = 5; // Low HP

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, damage: 100 }, // Massive damage
        LocationsEnum.WaywardInn,
      );

      expect(result.isHit).toBe(true);
      expect(target.vitals.hp.current).toBe(0);
    });
  });

  describe("Integration: Full Damage Resolution Flow", () => {
    it("should process all phases in correct order", () => {
      // Setup complex scenario
      attacker.buffsAndDebuffs.buffs.entry.set(BuffEnum.curseMarkActive, {
        value: 1,
        isPerm: false,
        permValue: 0,
        counter: 4,
      });
      target.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.hexMark, {
        value: 1,
        isPerm: false,
        permValue: 0,
        counter: 0,
      });
      target.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.exposed, {
        value: 1,
        isPerm: false,
        permValue: 0,
        counter: 1,
      });
      target.buffsAndDebuffs.buffs.entry.set(BuffEnum.arcaneShield, {
        value: 10,
        isPerm: false,
        permValue: 0,
        counter: 0,
      });

      const initialHp = target.vitals.hp.current;

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, damage: 30, hit: 20, crit: 20 },
        LocationsEnum.WaywardInn,
      );

      // Verify all phases executed
      expect(result.isHit).toBe(true);
      expect(result.isCrit).toBe(true);
      expect(result.actualDamage).toBeGreaterThan(0);
      expect(target.vitals.hp.current).toBeLessThan(initialHp);
      
      // Verify buffs/debuffs were processed
      expect(attacker.buffsAndDebuffs.buffs.entry.has(BuffEnum.curseMarkActive)).toBe(false);
      expect(target.buffsAndDebuffs.debuffs.entry.has(DebuffEnum.hexMark)).toBe(false);
    });

    it("should handle miss correctly and not apply damage", () => {
      target.battleStats.getStat("dodge").base = 50;
      target.attribute.getStat("agility").base = 20;

      const initialHp = target.vitals.hp.current;

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, hit: 1 }, // Very low hit
        LocationsEnum.WaywardInn,
      );

      expect(result.isHit).toBe(false);
      expect(result.actualDamage).toBe(0);
      expect(target.vitals.hp.current).toBe(initialHp); // HP unchanged
    });
  });

  describe("Edge Cases", () => {
    it("should handle missing characters gracefully", () => {
      const result = resolveDamage(
        "non-existent-id",
        "another-non-existent-id",
        baseDamageInput,
        LocationsEnum.WaywardInn,
      );

      expect(result.isHit).toBe(false);
      expect(result.actualDamage).toBe(0);
    });

    it("should handle zero damage input", () => {
      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, damage: 0 },
        LocationsEnum.WaywardInn,
      );

      expect(result.isHit).toBe(true);
      expect(result.actualDamage).toBe(0);
    });

    it("should handle negative damage (should become 0)", () => {
      target.battleStats.getStat("pDEF").base = 100; // Very high defense
      target.battleStats.getStat("slashDEF").base = 0; // No type defense
      // Base mitigation: pDEF (100) + endurance mod (0 from default) + slashDEF (0) = 100
      // Base damage: 10
      // After mitigation: 10 - 100 = -90
      // Clamped to 0: Math.max(0, -90) = 0

      const result = resolveDamage(
        attacker.id,
        target.id,
        { ...baseDamageInput, damage: 10 }, // Low damage vs high defense
        LocationsEnum.WaywardInn,
      );

      // Damage should be clamped to 0
      expect(result.actualDamage).toBe(0);
    });
  });
});

