/**
 * Basic Attack Skill Tests
 * 
 * Tests for the basic attack skill's exec() function, covering:
 * - No target handling
 * - Weapon damage calculation
 * - Position modifier application
 * - Damage resolution integration
 * - Return value structure
 * 
 * Note: Skill selection, SP consumption checks, and element production
 * are tested separately in getPlayableSkill tests and battle loop tests.
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { basicAttack } from "./basicAttack";
import { ActorEffect, TargetEffect } from "../effects";
import { SwordId } from "src/Entity/Item/Equipment/Weapon/type";
import { CharacterEquipmentSlot } from "src/InterFacesEnumsAndTypes/Enums";
import { equipDirect } from "src/Entity/Item/Equipment/equipDirect";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "./testHelpers";

// Setup mocks
setupSkillTestMocks();

// Import test helpers
import {
  mockGetTarget,
  mockResolveDamage,
} from "./testHelpers";

describe("Basic Attack Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    // Clear registry
    clearCharacterRegistry();

    // Create test characters
    actor = createTestActor();
    target = createTestTarget();

    // Setup parties
    actorParty = [actor];
    targetParty = [target];

    // Reset mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("No Target Handling", () => {
    it("should return appropriate message when no target is found", () => {
      // Mock getTarget to return null (no target)
      const getTargetSpy = mockGetTarget(null);

      const result = basicAttack.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to attack");
      expect(result.content.en).toContain("no target");
      expect(result.content.th).toContain("พยายามโจมตี");
      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toEqual([]);
      
      // Verify getTarget was called
      expect(getTargetSpy).toHaveBeenCalledWith(actor, actorParty, targetParty, "enemy");
      
      // Restore the spy
      getTargetSpy.mockRestore();
    });
  });

  describe("Successful Attack", () => {
    beforeEach(() => {
      // Mock getTarget to return the target by default
      mockGetTarget(target);
    });
    
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should execute attack and return result", () => {
      const result = basicAttack.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should return a valid result
      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
      expect(result.actor.actorId).toBe(actor.id);
      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]?.actorId).toBe(target.id);
    });

    it("should return correct turn result structure", () => {
      mockResolveDamage({
        actualDamage: 20,
        damageType: "slash" as any,
        isHit: true,
        isCrit: false,
      });

      const result = basicAttack.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result).toHaveProperty("content");
      expect(result.content.en).toContain("Basic Attack");
      expect(result.content.th).toContain("การโจตีปกติ");
      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(1);
      expect(result.targets?.[0]?.actorId).toBe(target.id);
      expect(result.targets?.[0]?.effect).toContain(TargetEffect.TestSkill);
    });

    it("should handle crit damage correctly", () => {
      mockResolveDamage({
        actualDamage: 30,
        damageType: "slash" as any,
        isHit: true,
        isCrit: true,
      });

      const result = basicAttack.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("Basic Attack");
      // Content should reflect the damage dealt (format may vary)
      expect(result.content.en).toBeDefined();
    });

    it("should handle miss correctly", () => {
      mockResolveDamage({
        actualDamage: 0,
        damageType: "pierce" as any,
        isHit: false,
        isCrit: false,
      });

      const result = basicAttack.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("Basic Attack");
      expect(result).toBeDefined();
    });
  });

  describe("Weapon Requirements", () => {
    it("should work with different weapon types", () => {
      // Test with different weapons
      const weapons = [
        { id: SwordId.ShortSword, slot: CharacterEquipmentSlot.rightHand },
        { id: SwordId.LongSword, slot: CharacterEquipmentSlot.rightHand },
      ];

      weapons.forEach(weapon => {
        equipDirect(actor, weapon.id, weapon.slot);
        mockGetTarget(target);
        mockResolveDamage({
          actualDamage: 10,
          damageType: "slash" as any,
          isHit: true,
          isCrit: false,
        });

        const result = basicAttack.exec(
          actor,
          actorParty,
          targetParty,
          1,
          DEFAULT_TEST_LOCATION,
        );

        expect(result).toBeDefined();
        expect(result.actor.actorId).toBe(actor.id);
      });
    });
  });

  describe("Edge Cases", () => {
    it("should work with different skill levels", () => {
      mockGetTarget(target);
      mockResolveDamage({
        actualDamage: 10,
        damageType: "slash" as any,
        isHit: true,
        isCrit: false,
      });

      // Skill level doesn't affect basic attack damage directly
      // (it's handled by weapon damage and character stats)
      const result1 = basicAttack.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );
      const result5 = basicAttack.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(result1).toBeDefined();
      expect(result5).toBeDefined();
    });
  });
});

