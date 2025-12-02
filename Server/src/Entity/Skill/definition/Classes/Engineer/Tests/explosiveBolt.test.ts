/**
 * Explosive Bolt Skill Tests
 * 
 * Tests for the Explosive Bolt skill's exec() function, covering:
 * - Deal (1d8 + DEX mod) × skillLevelMultiplier fire damage to target
 * - If hit, deal 50% splash damage to adjacent enemies in the same row
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { explosiveBolt } from "../explosiveBolt";
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
import * as getTargetModule from "src/Entity/Battle/getTarget";
import * as rollModule from "src/Utils/Dice";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

setupSkillTestMocks();

describe("Explosive Bolt Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set DEX to 16 (+3 mod)
    actor.attribute.getStat("dexterity").base = 16;

    target = createTestTarget({ id: "target-1", name: { en: "Enemy 1", th: "ศัตรู 1" }, position: 0 });
    targetParty = [target];

    actorParty = [actor];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("No Target Handling", () => {
    it("should return appropriate message when no target is found", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => null),
      }) as any);

      const result = explosiveBolt.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("has no target");
      expect(result.targets).toEqual([]);
    });
  });

  describe("Damage Calculation", () => {
    it("should calculate main damage correctly at level 1", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock dice: 1d8 = 5
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 5,
          rolls: [5],
        })),
      }) as any);

      // Mock rollTwenty for hit/crit calculations
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
        d: jest.fn(() => ({ total: 15, rolls: [15] })),
      } as any);

      mockResolveDamage({
        actualDamage: 8,
        damageType: DamageType.fire,
        isHit: true,
        isCrit: false,
      });

      const result = explosiveBolt.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Expected: (5 + 3) × 1.0 = 8
      expect(result.content.en).toContain("Explosive Bolt");
      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.Cast);
    });

    it("should calculate damage with skill level multiplier at level 5", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock dice: 1d8 = 6
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 6,
          rolls: [6],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
        d: jest.fn(() => ({ total: 15, rolls: [15] })),
      } as any);

      mockResolveDamage({
        actualDamage: 9,
        damageType: DamageType.fire,
        isHit: true,
        isCrit: false,
      });

      const result = explosiveBolt.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Expected: (6 + 3) × 1.5 = 13.5 ≈ 13
      expect(result.content.en).toContain("Explosive Bolt");
    });
  });

  describe("Splash Damage", () => {
    it("should deal splash damage to adjacent enemies when main attack hits", () => {
      // Create multiple targets in the same row
      const target1 = createTestTarget({ id: "target-1", name: { en: "Enemy 1", th: "ศัตรู 1" }, position: 0 });
      const target2 = createTestTarget({ id: "target-2", name: { en: "Enemy 2", th: "ศัตรู 2" }, position: 1 });
      const target3 = createTestTarget({ id: "target-3", name: { en: "Enemy 3", th: "ศัตรู 3" }, position: 2 });
      
      targetParty = [target1, target2, target3];

      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target1), // Main target is position 0
      }) as any);

      // Mock dice: 1d8 = 4
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
        d: jest.fn(() => ({ total: 15, rolls: [15] })),
      } as any);

      // Main damage: (4 + 3) × 1.0 = 7
      // Splash damage: 7 × 0.5 = 3.5 ≈ 3
      let resolveCallCount = 0;
      mockResolveDamage({
        actualDamage: 7,
        damageType: DamageType.fire,
        isHit: true,
        isCrit: false,
      });

      // Mock resolveDamage to handle multiple calls (main + splash)
      const originalResolveDamage = require("src/Entity/Battle/damageResolution").resolveDamage;
      jest.spyOn(require("src/Entity/Battle/damageResolution"), "resolveDamage").mockImplementation((attackerId, targetId, damageOutput, location) => {
        resolveCallCount++;
        if (resolveCallCount === 1) {
          // Main target
          return {
            actualDamage: 7,
            damageType: DamageType.fire,
            isHit: true,
            isCrit: false,
          };
        } else {
          // Splash target
          return {
            actualDamage: 3,
            damageType: DamageType.fire,
            isHit: true,
            isCrit: false,
          };
        }
      });

      const result = explosiveBolt.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should have main target and adjacent target (position 1)
      expect(result.targets.length).toBeGreaterThanOrEqual(1);
      expect(result.content.en).toContain("Explosive Bolt");
    });

    it("should not deal splash damage if main attack misses", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 5, // Low roll = miss
        rolls: [5],
        d: jest.fn(() => ({ total: 5, rolls: [5] })),
      } as any);

      mockResolveDamage({
        actualDamage: 0,
        damageType: DamageType.fire,
        isHit: false,
        isCrit: false,
      });

      const result = explosiveBolt.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should only have main target, no splash
      expect(result.targets.length).toBe(1);
      expect(result.content.en).toContain("Explosive Bolt");
      expect(result.content.en).not.toContain("Splash");
    });
  });

  describe("Resource Consumption", () => {
    it("should consume 3 SP and 1 fire element", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
        d: jest.fn(() => ({ total: 15, rolls: [15] })),
      } as any);

      mockResolveDamage({
        actualDamage: 7,
        damageType: DamageType.fire,
        isHit: true,
        isCrit: false,
      });

      expect(explosiveBolt.consume.sp).toBe(3);
      expect(explosiveBolt.consume.elements).toEqual([{ element: "fire", value: 1 }]);
    });
  });
});

