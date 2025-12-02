/**
 * Precision Thrust Skill Tests
 * 
 * Tests for the Precision Thrust skill's exec() function, derived from description and formula:
 * - "Lunge at a front-line foe" -> Targeting check
 * - "Deal <FORMULA> damage" -> Formula verification: (Weapon + STR) * (1 + 0.1 * Level)
 * - "with +3 hit" -> Hit bonus verification
 * - "Gains bonus crit if target has any debuff" -> Conditional crit verification
 * - Equipment requirement: Sword or Spear (from definition)
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { precisionThrust } from "../precisionThrust";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
  mockResolveDamage,
} from "../../../testHelpers";
import * as getTargetModule from "src/Entity/Battle/getTarget";
import * as getWeaponDamageOutputModule from "src/Utils/getWeaponDamgeOutput";
import * as getPositionModifierModule from "src/Utils/getPositionModifier";
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

// Setup mocks
setupSkillTestMocks();

describe("Precision Thrust Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Default to sword for valid execution
    actor.getWeapon = jest.fn(() => ({
      weaponType: "sword",
      physicalDamage: 10,
    }));
    // Set STR to 16 (+3 mod)
    actor.attribute.getStat("strength").base = 16;

    target = createTestTarget({ id: "target-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });

    actorParty = [actor];
    targetParty = [target];

    // Mock helpers
    jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockImplementation(() => ({
      damage: 10, // Base weapon damage
      hit: 0,
      crit: 0,
      type: "piercing",
      isMagic: false,
    } as any));

    jest.spyOn(getPositionModifierModule, "getPositionModifier").mockReturnValue(1);

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Equipment Requirements", () => {
    it("should fail if actor is not using a sword or spear", () => {
      // Mock actor using an axe
      actor.getWeapon = jest.fn(() => ({
        weaponType: "axe",
      }));

      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({
          one: jest.fn(() => target),
        })),
      }) as any);

      const result = precisionThrust.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("needs a sword or spear");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
    });
  });

  describe("Targeting", () => {
    it("should target a front-line foe", () => {
      const fromSpy = jest.fn(() => ({ one: jest.fn(() => target) }));
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: fromSpy,
      }) as any);

      precisionThrust.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(getTargetModule.getTarget).toHaveBeenCalledWith(actor, actorParty, targetParty, "enemy");
      expect(fromSpy).toHaveBeenCalledWith("frontFirst");
    });
  });

  describe("Damage and Hit Calculation", () => {
    it("should calculate damage correctly based on formula and apply +3 hit", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({
          one: jest.fn(() => target),
        })),
      }) as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: "piercing",
        isHit: true,
        isCrit: false,
      });

      precisionThrust.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Formula: (WeaponDamage + STRmod) * (1 + 0.1 * skill level) * RangePenalty
      // WeaponDamage = 10 (mocked)
      // STRmod = 3 (STR 16)
      // Skill Level = 1 -> Multiplier 1.1
      // RangePenalty = 1 (mocked)
      // Expected: (10 + 3) * 1.1 * 1 = 14.3
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 14.3, // or close to it
          hit: 3, // Base 0 + 3 bonus
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should scale damage with skill level", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({
          one: jest.fn(() => target),
        })),
      }) as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: "piercing",
        isHit: true,
        isCrit: false,
      });

      precisionThrust.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Level 5 -> Multiplier 1.5
      // Expected: (10 + 3) * 1.5 = 19.5
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 19.5,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });
  });

  describe("Conditional Crit Bonus", () => {
    it("should not apply bonus crit if target has no debuffs", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({
          one: jest.fn(() => target),
        })),
      }) as any);

      // Ensure target has no debuffs
      target.buffsAndDebuffs.debuffs.entry.clear();

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: "piercing",
        isHit: true,
        isCrit: false,
      });

      precisionThrust.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          crit: 0, // Base crit
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should apply bonus crit if target has a debuff", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({
          one: jest.fn(() => target),
        })),
      }) as any);

      // Add a debuff
      target.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.exposed, { value: 1 });

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: "piercing",
        isHit: true,
        isCrit: false,
      });

      precisionThrust.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should have > 0 crit
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          crit: expect.any(Number),
        }),
        DEFAULT_TEST_LOCATION,
      );
      
      // Verify it's greater than base (0)
      const callArgs = resolveDamageSpy.mock.calls[0];
      const damageOutput = callArgs![2] as any;
      expect(damageOutput.crit).toBeGreaterThan(0);
    });
  });
});
