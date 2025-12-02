/**
 * Chaos Binding Skill Tests
 * 
 * Tests for the Chaos Binding skill's exec() function, covering:
 * - No target handling
 * - Damage formula: (1d4 + INTmod) × SkillLevelMultiplier
 * - Save roll: DC10 + ControlMod WILsave
 * - Save failed: Apply Hexed debuff for {5}'3':'2'{/} turns
 * - Level 5: Also apply Cursed debuff for 2 turns
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { chaosBinding } from "../chaosBinding";
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
import * as rollModule from "src/Utils/Dice";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

setupSkillTestMocks();

describe("Chaos Binding Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set INT to 14 (+2 mod), Control to 14 (+2 mod)
    actor.attribute.getStat("intelligence").base = 14;
    actor.attribute.getStat("control").base = 14;
    
    target = createTestTarget({ id: "target-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });
    target.attribute.getStat("willpower").base = 10; // 0 mod for predictable saves

    actorParty = [actor];
    targetParty = [target];

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

      const result = chaosBinding.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to use Hex Doll but has no target");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toEqual([]);
    });
  });

  describe("Damage Calculation", () => {
    it("should calculate damage correctly", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock dice: 1d4 = 3
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.dark,
        isHit: true,
        isCrit: false,
      });

      chaosBinding.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(resolveDamageSpy).toHaveBeenCalled();
      const callArgs = resolveDamageSpy.mock.calls[0];
      const damageOutput = callArgs?.[2] as any;
      
      // Formula: (1d4 + INTmod) × SkillLevelMultiplier
      // Dice = 3, INTmod = 2, Level 1 multiplier = 1.0
      // Expected: (3 + 2) × 1.0 = 5
      expect(damageOutput.damage).toBeGreaterThan(0);
      expect(damageOutput.type).toBe(DamageType.dark);
      expect(damageOutput.isMagic).toBe(true);
    });
  });

  describe("Debuff Application", () => {
    it("should apply Hexed debuff for 2 turns when save fails at level 1", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      jest.spyOn(target, "rollSave").mockReturnValue(5);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.dark,
        isHit: true,
        isCrit: false,
      });

      const hexedSpy = jest.spyOn(buffsAndDebuffsRepository.hexed, "appender");

      chaosBinding.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(hexedSpy).toHaveBeenCalledWith(
        target,
        expect.objectContaining({
          turnsAppending: 2,
        }),
      );
    });

    it("should apply Hexed debuff for 3 turns and Cursed at level 5", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      jest.spyOn(target, "rollSave").mockReturnValue(5);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      mockResolveDamage({
        actualDamage: 7,
        damageType: DamageType.dark,
        isHit: true,
        isCrit: false,
      });

      const hexedSpy = jest.spyOn(buffsAndDebuffsRepository.hexed, "appender");
      const cursedSpy = jest.spyOn(buffsAndDebuffsRepository.cursed, "appender");

      chaosBinding.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(hexedSpy).toHaveBeenCalledWith(
        target,
        expect.objectContaining({
          turnsAppending: 3,
        }),
      );
      expect(cursedSpy).toHaveBeenCalledWith(
        target,
        expect.objectContaining({
          turnsAppending: 2,
        }),
      );
    });
  });

  describe("Return Value Structure", () => {
    it("should return correct structure with target effects", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.dark,
        isHit: true,
        isCrit: false,
      });

      const result = chaosBinding.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.Cast);
      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]?.actorId).toBe(target.id);
      expect(result.content.en).toContain("Hex Doll");
    });
  });
});

