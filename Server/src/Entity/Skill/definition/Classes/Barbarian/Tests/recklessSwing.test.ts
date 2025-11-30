/**
 * Reckless Swing Skill Tests
 * 
 * Tests for the Reckless Swing skill's exec() function, covering:
 * - No target handling
 * - Multi-hit mechanics (2 hits at level < 5, 3 hits at level >= 5)
 * - Damage calculation: (0.7 × weapon damage + STR mod) × (1 + 0.1 × skill level) × positionModifier
 * - Hit penalty (-3)
 * - Return value structure
 * 
 * Note: Equipment requirements and resource consumption are tested separately.
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { recklessSwing } from "../recklessSwing";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
  mockGetTarget,
  mockResolveDamage,
} from "../../../testHelpers";
import * as getWeaponDamageOutputModule from "src/Utils/getWeaponDamgeOutput";
import * as getPositionModifierModule from "src/Utils/getPositionModifier";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

// Setup mocks
setupSkillTestMocks();

describe("Reckless Swing Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    target = createTestTarget();

    actorParty = [actor];
    targetParty = [target];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("No Target Handling", () => {
    it("should return appropriate message when no target is found", () => {
      mockGetTarget(null);

      const result = recklessSwing.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to unleash Reckless Swing");
      expect(result.content.en).toContain("no target");
      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(0);
    });
  });

  describe("Multi-hit Mechanics", () => {
    it("should perform 2 hits at skill level 1", () => {
      mockGetTarget(target);
      
      const mockWeaponDamage = {
        damage: 10,
        hit: 15,
        crit: 5,
        type: DamageType.slash,
      };
      
      jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockReturnValue(mockWeaponDamage);
      jest.spyOn(getPositionModifierModule, "getPositionModifier").mockReturnValue(1.0);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.slash,
        isHit: true,
        isCrit: false,
      });

      const result = recklessSwing.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should call resolveDamage 2 times (2 hits)
      expect(resolveDamageSpy).toHaveBeenCalledTimes(2);
      
      // Check that hit penalty is applied (-3)
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          hit: 12, // 15 - 3
        }),
        DEFAULT_TEST_LOCATION,
      );

      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]?.actorId).toBe(target.id);
      expect(result.targets[0]?.effect).toContain(TargetEffect.TestSkill);
    });

    it("should perform 3 hits at skill level 5", () => {
      mockGetTarget(target);
      
      const mockWeaponDamage = {
        damage: 10,
        hit: 15,
        crit: 5,
        type: DamageType.slash,
      };
      
      jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockReturnValue(mockWeaponDamage);
      jest.spyOn(getPositionModifierModule, "getPositionModifier").mockReturnValue(1.0);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.slash,
        isHit: true,
        isCrit: false,
      });

      const result = recklessSwing.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Should call resolveDamage 3 times (3 hits)
      expect(resolveDamageSpy).toHaveBeenCalledTimes(3);
      
      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]?.actorId).toBe(target.id);
    });

    it("should perform 3 hits at skill level 6 (>= 5)", () => {
      mockGetTarget(target);
      
      const mockWeaponDamage = {
        damage: 10,
        hit: 15,
        crit: 5,
        type: DamageType.slash,
      };
      
      jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockReturnValue(mockWeaponDamage);
      jest.spyOn(getPositionModifierModule, "getPositionModifier").mockReturnValue(1.0);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.slash,
        isHit: true,
        isCrit: false,
      });

      recklessSwing.exec(
        actor,
        actorParty,
        targetParty,
        6,
        DEFAULT_TEST_LOCATION,
      );

      expect(resolveDamageSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe("Damage Calculation", () => {
    it("should calculate damage correctly: (0.7 × weapon damage + STR mod) × (1 + 0.1 × skill level) × positionModifier", () => {
      mockGetTarget(target);
      
      // Setup: weapon damage = 10, STR mod = +3 (from createTestActor), skill level = 1, positionMod = 1.0
      // Expected: (0.7 × 10 + 3) × (1 + 0.1 × 1) × 1.0 = (7 + 3) × 1.1 × 1.0 = 10 × 1.1 = 11
      const mockWeaponDamage = {
        damage: 10,
        hit: 15,
        crit: 5,
        type: DamageType.slash,
      };
      
      jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockReturnValue(mockWeaponDamage);
      jest.spyOn(getPositionModifierModule, "getPositionModifier").mockReturnValue(1.0);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.slash,
        isHit: true,
        isCrit: false,
      });

      recklessSwing.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Check damage calculation: (0.7 × 10 + 3) × 1.1 × 1.0 = 11
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 11, // Math.floor(11.0)
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should apply position modifier correctly", () => {
      mockGetTarget(target);
      
      const mockWeaponDamage = {
        damage: 10,
        hit: 15,
        crit: 5,
        type: DamageType.slash,
      };
      
      jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockReturnValue(mockWeaponDamage);
      jest.spyOn(getPositionModifierModule, "getPositionModifier").mockReturnValue(1.5); // 50% bonus

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.slash,
        isHit: true,
        isCrit: false,
      });

      recklessSwing.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Check damage with position modifier: (0.7 × 10 + 3) × 1.1 × 1.5 = 11 × 1.5 = 16.5 → 16
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 16, // Math.floor(16.5)
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should scale damage with skill level", () => {
      mockGetTarget(target);
      
      const mockWeaponDamage = {
        damage: 10,
        hit: 15,
        crit: 5,
        type: DamageType.slash,
      };
      
      jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockReturnValue(mockWeaponDamage);
      jest.spyOn(getPositionModifierModule, "getPositionModifier").mockReturnValue(1.0);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.slash,
        isHit: true,
        isCrit: false,
      });

      recklessSwing.exec(
        actor,
        actorParty,
        targetParty,
        3,
        DEFAULT_TEST_LOCATION,
      );

      // Check damage at level 3: (0.7 × 10 + 3) × (1 + 0.1 × 3) × 1.0 = 10 × 1.3 = 13
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 13, // Math.floor(13.0)
        }),
        DEFAULT_TEST_LOCATION,
      );
    });
  });

  describe("Hit Penalty", () => {
    it("should apply -3 penalty to hit rolls", () => {
      mockGetTarget(target);
      
      const mockWeaponDamage = {
        damage: 10,
        hit: 20, // High hit value
        crit: 5,
        type: DamageType.slash,
      };
      
      jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockReturnValue(mockWeaponDamage);
      jest.spyOn(getPositionModifierModule, "getPositionModifier").mockReturnValue(1.0);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.slash,
        isHit: true,
        isCrit: false,
      });

      recklessSwing.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Both hits should have -3 penalty
      expect(resolveDamageSpy).toHaveBeenNthCalledWith(
        1,
        actor.id,
        target.id,
        expect.objectContaining({
          hit: 17, // 20 - 3
        }),
        DEFAULT_TEST_LOCATION,
      );
      
      expect(resolveDamageSpy).toHaveBeenNthCalledWith(
        2,
        actor.id,
        target.id,
        expect.objectContaining({
          hit: 17, // 20 - 3
        }),
        DEFAULT_TEST_LOCATION,
      );
    });
  });

  describe("Return Structure", () => {
    it("should return correct TurnResult structure", () => {
      mockGetTarget(target);
      
      const mockWeaponDamage = {
        damage: 10,
        hit: 15,
        crit: 5,
        type: DamageType.slash,
      };
      
      jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockReturnValue(mockWeaponDamage);
      jest.spyOn(getPositionModifierModule, "getPositionModifier").mockReturnValue(1.0);

      mockResolveDamage({
        actualDamage: 5,
        damageType: "slash",
        isHit: true,
        isCrit: false,
      });

      const result = recklessSwing.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result).toHaveProperty("content");
      expect(result.content).toHaveProperty("en");
      expect(result.content).toHaveProperty("th");
      expect(result.content.en).toContain("Reckless Swing");
      expect(result.actor).toHaveProperty("actorId", actor.id);
      expect(result.actor).toHaveProperty("effect");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]).toHaveProperty("actorId", target.id);
      expect(result.targets[0]).toHaveProperty("effect");
      expect(result.targets[0]?.effect).toContain(TargetEffect.TestSkill);
    });
  });
});

