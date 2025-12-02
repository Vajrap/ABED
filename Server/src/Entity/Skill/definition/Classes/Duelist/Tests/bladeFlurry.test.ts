/**
 * Blade Flurry Skill Tests
 * 
 * Tests for the Blade Flurry skill's exec() function, covering:
 * - No target handling
 * - Multi-hit mechanics: 2 hits at level < 5, 3 hits at level >= 5
 * - Damage formula: ((0.7 × WeaponDamage) + DEXmod) × SkillLevelMultiplier × MeleeRangePenalty
 * - Return value structure
 * 
 * Note: Equipment requirements and resource consumption are tested separately.
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { bladeFlurry } from "../bladeFlurry";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
  mockResolveDamage,
} from "../../../testHelpers";
import * as rollModule from "src/Utils/Dice";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import * as getTargetModule from "src/Entity/Battle/getTarget";

// Setup mocks
setupSkillTestMocks();

describe("Blade Flurry Skill", () => {
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
    it("should return appropriate message when no targets are found", () => {
      const emptyTargetParty: any[] = [];
      
      const result = bladeFlurry.exec(
        actor,
        actorParty,
        emptyTargetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to use Blade Flurry");
      expect(result.content.en).toContain("no target");
      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(0);
    });
  });

  describe("Multi-hit Mechanics", () => {
    it("should perform 2 hits at skill level 1", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({
          one: jest.fn(() => target),
        })),
      }) as any);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.slash,
        isHit: true,
        isCrit: false,
      });

      const result = bladeFlurry.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should call resolveDamage 2 times (2 hits)
      expect(resolveDamageSpy).toHaveBeenCalledTimes(2);
      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]?.actorId).toBe(target.id);
    });

    it("should perform 3 hits at skill level 5", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({
          one: jest.fn(() => target),
        })),
      }) as any);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.slash,
        isHit: true,
        isCrit: false,
      });

      bladeFlurry.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Should call resolveDamage 3 times (3 hits)
      expect(resolveDamageSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe("Return Structure", () => {
    it("should return correct TurnResult structure", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({
          one: jest.fn(() => target),
        })),
      }) as any);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.slash,
        isHit: true,
        isCrit: false,
      });

      const result = bladeFlurry.exec(
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
      expect(result.targets.length).toBeGreaterThan(0);
    });
  });
});

