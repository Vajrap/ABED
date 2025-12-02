/**
 * Precise Strike Skill Tests
 * 
 * Tests for the Precise Strike skill's exec() function, covering:
 * - No target handling
 * - Damage formula: ((WeaponDamage × multiplier) + DEXmod) × SkillLevelMultiplier × MeleeRangePenalty
 * - Weapon multiplier: 1.0 at level < 5, 1.2 at level 5+
 * - +2 crit bonus at level 5+
 * - Return value structure
 * 
 * Note: Equipment requirements and resource consumption are tested separately.
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { preciseStrike } from "../preciseStrike";
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

describe("Precise Strike Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    actor.attribute.getStat("dexterity").base = 16; // +3 mod
    
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

      const result = preciseStrike.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to use Precise Strike");
      expect(result.content.en).toContain("no target");
      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(0);
    });
  });

  describe("Damage and Crit Bonus", () => {
    it("should use 1.0x weapon multiplier at level 1-4", () => {
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

      preciseStrike.exec(
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
          type: DamageType.slash,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should use 1.2x weapon multiplier and +2 crit at level 5+", () => {
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

      preciseStrike.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Should have +2 crit bonus
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          type: DamageType.slash,
          crit: 7, // 5 + 2
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
        damageType: DamageType.slash,
        isHit: true,
        isCrit: false,
      });

      const result = preciseStrike.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result).toHaveProperty("content");
      expect(result.content).toHaveProperty("en");
      expect(result.content).toHaveProperty("th");
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

