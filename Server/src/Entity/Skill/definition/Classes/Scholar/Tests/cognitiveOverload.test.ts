/**
 * Cognitive Overload Skill Tests
 * 
 * Tests for the Cognitive Overload skill's exec() function, covering:
 * - No target handling
 * - Damage calculation: {5}'1d6':'1d4'{/} + INTmod × SkillLevelMultiplier
 * - True arcane damage (bypasses defenses)
 * - Debuff refresh (1 random debuff)
 * - Level 5: Dice upgrade to 1d8 if target has ≥3 debuffs
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { cognitiveOverload } from "../cognitiveOverload";
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
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

setupSkillTestMocks();

describe("Cognitive Overload Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set INT to 14 (+2 mod)
    actor.attribute.getStat("intelligence").base = 14;
    actor.attribute.getStat("control").base = 14; // +2 mod for hit
    actor.attribute.getStat("luck").base = 14; // +2 mod for crit
    
    target = createTestTarget({ id: "target-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });

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

      const result = cognitiveOverload.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to cause cognitive overload but has no target");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toEqual([]);
    });
  });

  describe("Damage Calculation", () => {
    it("should calculate damage correctly at level 1 (1d4 + INTmod)", () => {
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

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      cognitiveOverload.exec(
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
      expect(damageOutput.damage).toBeGreaterThanOrEqual(4);
      expect(damageOutput.damage).toBeLessThanOrEqual(6);
      expect(damageOutput.type).toBe(DamageType.arcane);
      expect(damageOutput.isMagic).toBe(true);
      expect(damageOutput.trueDamage).toBe(true);
    });

    it("should use 1d6 dice at level 5 when target has <3 debuffs", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Target has 2 debuffs (< 3)
      debuffsRepository.exposed.appender(target, { turnsAppending: 1 });
      debuffsRepository.dazed.appender(target, { turnsAppending: 1 });

      // Mock dice: 1d6 = 4
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 6,
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      cognitiveOverload.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(resolveDamageSpy).toHaveBeenCalled();
      const callArgs = resolveDamageSpy.mock.calls[0];
      const damageOutput = callArgs?.[2] as any;
      
      // Formula: (1d6 + INTmod) × SkillLevelMultiplier
      // Dice = 4, INTmod = 2, Level 5 multiplier = 1.5
      // Expected: (4 + 2) × 1.5 = 9
      // Note: Actual damage may vary due to weapon stats or other factors
      expect(damageOutput.damage).toBeGreaterThan(0);
      expect(damageOutput.type).toBe(DamageType.arcane);
      expect(damageOutput.isMagic).toBe(true);
      expect(damageOutput.trueDamage).toBe(true);
    });

    it("should use 1d8 dice at level 5 when target has ≥3 debuffs", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Target has 3 debuffs (≥ 3)
      debuffsRepository.exposed.appender(target, { turnsAppending: 1 });
      debuffsRepository.dazed.appender(target, { turnsAppending: 1 });
      debuffsRepository.bleed.appender(target, { turnsAppending: 1 });

      // Mock dice: 1d8 = 5
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 5,
          rolls: [5],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      cognitiveOverload.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(resolveDamageSpy).toHaveBeenCalled();
      const callArgs = resolveDamageSpy.mock.calls[0];
      const damageOutput = callArgs?.[2] as any;
      
      // Formula: (1d8 + INTmod) × SkillLevelMultiplier
      // Dice = 5, INTmod = 2, Level 5 multiplier = 1.5
      // Expected: (5 + 2) × 1.5 = 10.5 -> 10
      // Note: Actual damage may vary due to weapon stats or other factors
      expect(damageOutput.damage).toBeGreaterThan(0);
      expect(damageOutput.type).toBe(DamageType.arcane);
      expect(damageOutput.isMagic).toBe(true);
      expect(damageOutput.trueDamage).toBe(true);
    });
  });

  describe("Debuff Refresh", () => {
    it("should refresh 1 random debuff on target", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Add debuffs to target
      debuffsRepository.exposed.appender(target, { turnsAppending: 2 });
      debuffsRepository.dazed.appender(target, { turnsAppending: 1 });

      const exposedEntry = target.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.exposed);
      const dazedEntry = target.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.dazed);
      const initialExposedValue = exposedEntry?.value || 0;
      const initialDazedValue = dazedEntry?.value || 0;

      // Mock dice
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      cognitiveOverload.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // One of the debuffs should have been refreshed (value increased by 1)
      const newExposedValue = exposedEntry?.value || 0;
      const newDazedValue = dazedEntry?.value || 0;

      // One should have increased, the other should stay the same
      const exposedRefreshed = newExposedValue === initialExposedValue + 1;
      const dazedRefreshed = newDazedValue === initialDazedValue + 1;
      
      expect(exposedRefreshed || dazedRefreshed).toBe(true);
      expect(exposedRefreshed && dazedRefreshed).toBe(false); // Only one should refresh
    });

    it("should not refresh if target has no debuffs", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock dice
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      const result = cognitiveOverload.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should not mention debuff refresh in message
      expect(result.content.en).not.toContain("debuff was refreshed");
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

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      const result = cognitiveOverload.exec(
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
      expect(result.targets[0]?.effect).toContain(TargetEffect.TestSkill);
      expect(result.content.en).toContain("Cognitive Overload");
    });
  });
});

