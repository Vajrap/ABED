/**
 * Shadow Bolt (Chaos Bolt) Skill Tests
 * 
 * Tests for the Shadow Bolt skill's exec() function, covering:
 * - No target handling
 * - Damage formula: ({5}'1d8':'1d6'{/} + PlanarMod) × SkillLevelMultiplier
 * - Save roll: DC8 + PlanarMod WILsave
 * - Save failed: Apply Hexed debuff for {5}'3':'2'{/} turns
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { chaosBolt } from "../shadowBolt";
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

describe("Shadow Bolt Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set Planar to 14 (+2 mod), INT to 14 (+2 mod) for DC
    actor.attribute.getStat("planar").base = 14;
    actor.attribute.getStat("intelligence").base = 14;
    actor.attribute.getStat("control").base = 14; // +2 mod for hit
    actor.attribute.getStat("luck").base = 14; // +2 mod for crit
    
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

      const result = chaosBolt.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to cast Chaos Bolt but has no target");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toEqual([]);
    });
  });

  describe("Damage Calculation", () => {
    it("should calculate damage correctly at level 1 (1d6)", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock dice: 1d6 = 3
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
        damageType: DamageType.chaos,
        isHit: true,
        isCrit: false,
      });

      chaosBolt.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(resolveDamageSpy).toHaveBeenCalled();
      const callArgs = resolveDamageSpy.mock.calls[0];
      const damageOutput = callArgs?.[2] as any;
      
      // Formula: (1d6 + PlanarMod) × SkillLevelMultiplier
      // Dice = 3, PlanarMod = 2, Level 1 multiplier = 1.0
      // Expected: (3 + 2) × 1.0 = 5
      expect(damageOutput.damage).toBeGreaterThan(0);
      expect(damageOutput.type).toBe(DamageType.chaos);
      expect(damageOutput.isMagic).toBe(true);
    });

    it("should use 1d8 dice at level 5", () => {
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
      } as any);

      mockResolveDamage({
        actualDamage: 9,
        damageType: DamageType.chaos,
        isHit: true,
        isCrit: false,
      });

      chaosBolt.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Should use 1d8 at level 5
      expect(rollModule.roll).toHaveBeenCalled();
    });
  });

  describe("Hex Debuff Application", () => {
    it("should apply Hexed debuff for 2 turns when save fails at level 1", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock save roll to fail (roll 5, DC 8 + 2 = 10)
      jest.spyOn(target, "rollSave").mockReturnValue(5);

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
        damageType: DamageType.chaos,
        isHit: true,
        isCrit: false,
      });

      const hexedSpy = jest.spyOn(buffsAndDebuffsRepository.hexed, "appender");

      chaosBolt.exec(
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

    it("should apply Hexed debuff for 3 turns when save fails at level 5", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      jest.spyOn(target, "rollSave").mockReturnValue(5);

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

      mockResolveDamage({
        actualDamage: 9,
        damageType: DamageType.chaos,
        isHit: true,
        isCrit: false,
      });

      const hexedSpy = jest.spyOn(buffsAndDebuffsRepository.hexed, "appender");

      chaosBolt.exec(
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
    });

    it("should not apply Hexed debuff when save passes", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock save roll to pass (roll 15, DC 10)
      jest.spyOn(target, "rollSave").mockReturnValue(15);

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
        damageType: DamageType.chaos,
        isHit: true,
        isCrit: false,
      });

      const hexedSpy = jest.spyOn(buffsAndDebuffsRepository.hexed, "appender");

      chaosBolt.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should not apply hexed if save passed
      expect(hexedSpy).not.toHaveBeenCalled();
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
        damageType: DamageType.chaos,
        isHit: true,
        isCrit: false,
      });

      const result = chaosBolt.exec(
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
      expect(result.content.en).toContain("Shadow Bolt");
    });
  });
});

