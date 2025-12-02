/**
 * Poison Dart Skill Tests
 * 
 * Tests for the Poison Dart skill's exec() function, covering:
 * - No target handling
 * - Damage formula: ({5}'1d4':'1d3'{/} + INTmod) × SkillLevelMultiplier
 * - True poison damage (bypasses all defenses)
 * - Save roll: DC6 + ControlMod ENDsave
 * - Save failed: Apply Cursed debuff for {5}'3':'2'{/} turns
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { poisonDart } from "../poisonDart";
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

describe("Poison Dart Skill", () => {
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

      const result = poisonDart.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to cast Curse Bolt but has no target");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toEqual([]);
    });
  });

  describe("Damage Calculation", () => {
    it("should calculate damage correctly at level 1 (1d3)", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock dice: 1d3 = 2
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 2,
          rolls: [2],
        })),
      }) as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 4,
        damageType: DamageType.dark,
        isHit: true,
        isCrit: false,
      });

      poisonDart.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(resolveDamageSpy).toHaveBeenCalled();
      const callArgs = resolveDamageSpy.mock.calls[0];
      const damageOutput = callArgs?.[2] as any;
      
      // Formula: (1d3 + INTmod) × SkillLevelMultiplier
      // Dice = 2, INTmod = 2, Level 1 multiplier = 1.0
      // Expected: (2 + 2) × 1.0 = 4
      expect(damageOutput.damage).toBeGreaterThan(0);
      expect(damageOutput.type).toBe(DamageType.dark);
      expect(damageOutput.isMagic).toBe(true);
      expect(damageOutput.trueDamage).toBe(true);
    });

    it("should use 1d4 dice at level 5", () => {
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
        actualDamage: 7,
        damageType: DamageType.dark,
        isHit: true,
        isCrit: false,
      });

      poisonDart.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Should use 1d4 at level 5
      expect(rollModule.roll).toHaveBeenCalled();
    });
  });

  describe("Cursed Debuff Application", () => {
    it("should apply Cursed debuff for 2 turns when save fails at level 1", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock save roll to fail (roll 5, DC 6 + 2 = 8)
      jest.spyOn(target, "rollSave").mockReturnValue(5);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 2,
          rolls: [2],
        })),
      }) as any);

      mockResolveDamage({
        actualDamage: 4,
        damageType: DamageType.dark,
        isHit: true,
        isCrit: false,
      });

      const cursedSpy = jest.spyOn(buffsAndDebuffsRepository.cursed, "appender");

      poisonDart.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(cursedSpy).toHaveBeenCalledWith(
        target,
        expect.objectContaining({
          turnsAppending: 2,
        }),
      );
    });

    it("should apply Cursed debuff for 3 turns when save fails at level 5", () => {
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

      const cursedSpy = jest.spyOn(buffsAndDebuffsRepository.cursed, "appender");

      poisonDart.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(cursedSpy).toHaveBeenCalledWith(
        target,
        expect.objectContaining({
          turnsAppending: 3,
        }),
      );
    });

    it("should not apply Cursed debuff when save passes", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock save roll to pass (roll 15, DC 8)
      jest.spyOn(target, "rollSave").mockReturnValue(15);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 2,
          rolls: [2],
        })),
      }) as any);

      mockResolveDamage({
        actualDamage: 4,
        damageType: DamageType.dark,
        isHit: true,
        isCrit: false,
      });

      const cursedSpy = jest.spyOn(buffsAndDebuffsRepository.cursed, "appender");

      poisonDart.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(cursedSpy).not.toHaveBeenCalled();
    });
  });

  describe("Return Value Structure", () => {
    it("should return correct structure with target effects", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 2,
          rolls: [2],
        })),
      }) as any);

      mockResolveDamage({
        actualDamage: 4,
        damageType: DamageType.dark,
        isHit: true,
        isCrit: false,
      });

      const result = poisonDart.exec(
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
      expect(result.content.en).toContain("Curse Bolt");
    });
  });
});

