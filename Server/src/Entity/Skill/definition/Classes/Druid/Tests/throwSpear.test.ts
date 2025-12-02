/**
 * Throw Spear Skill Tests
 * 
 * Tests for the Throw Spear skill's exec() function, covering:
 * - No target handling
 * - Damage formula: (0.8 × WeaponDamage + skill level) × range multiplier
 * - Range multipliers: front-front 0.8 (1.0 at level 5+), front-back 1.2 (1.4 at level 5+), back-back 1.6 (1.8 at level 5+)
 * - Return value structure
 * 
 * Note: Equipment requirements and resource consumption are tested separately.
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { throwSpear } from "../throwSpear";
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
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

// Setup mocks
setupSkillTestMocks();

describe("Throw Spear Skill", () => {
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

      const result = throwSpear.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to throw spear");
      expect(result.content.en).toContain("no target");
      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(0);
    });
  });

  describe("Range Multipliers", () => {
    it("should use 0.8x multiplier for front-front at level 1-4", () => {
      mockGetTarget(target);
      actor.position = 0; // Front row
      target.position = 1; // Front row

      const mockWeaponDamage = {
        damage: 10,
        hit: 15,
        crit: 5,
        type: DamageType.pierce,
      };
      
      jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockReturnValue(mockWeaponDamage);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.pierce,
        isHit: true,
        isCrit: false,
      });

      throwSpear.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Expected: (10 * 0.8) + 1 = 8 + 1 = 9
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 9,
          type: DamageType.pierce,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should use 1.0x multiplier for front-front at level 5+", () => {
      mockGetTarget(target);
      actor.position = 0; // Front row
      target.position = 1; // Front row

      const mockWeaponDamage = {
        damage: 10,
        hit: 15,
        crit: 5,
        type: DamageType.pierce,
      };
      
      jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockReturnValue(mockWeaponDamage);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.pierce,
        isHit: true,
        isCrit: false,
      });

      throwSpear.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Expected: (10 * 1.0) + 5 = 10 + 5 = 15
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 15,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should use 1.2x multiplier for front-back at level 1-4", () => {
      mockGetTarget(target);
      actor.position = 0; // Front row
      target.position = 4; // Back row

      const mockWeaponDamage = {
        damage: 10,
        hit: 15,
        crit: 5,
        type: DamageType.pierce,
      };
      
      jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockReturnValue(mockWeaponDamage);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.pierce,
        isHit: true,
        isCrit: false,
      });

      throwSpear.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Expected: (10 * 1.2) + 1 = 12 + 1 = 13
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 13,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should use 1.6x multiplier for back-back at level 1-4", () => {
      mockGetTarget(target);
      actor.position = 4; // Back row
      target.position = 5; // Back row

      const mockWeaponDamage = {
        damage: 10,
        hit: 15,
        crit: 5,
        type: DamageType.pierce,
      };
      
      jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockReturnValue(mockWeaponDamage);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.pierce,
        isHit: true,
        isCrit: false,
      });

      throwSpear.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Expected: (10 * 1.6) + 1 = 16 + 1 = 17
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 17,
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
        type: DamageType.pierce,
      };
      
      jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockReturnValue(mockWeaponDamage);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.pierce,
        isHit: true,
        isCrit: false,
      });

      const result = throwSpear.exec(
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

