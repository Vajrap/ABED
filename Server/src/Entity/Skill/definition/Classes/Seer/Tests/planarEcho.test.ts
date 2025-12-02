/**
 * Planar Echo Skill Tests
 * 
 * Tests for the Planar Echo skill's exec() function, covering:
 * - Deal 1d6 + CHA mod * (1 + 0.1 * skill level) arcane damage to a target
 * - If hit, target must roll DC10 LUK save or decrease AB gauge by 10
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { planarEcho } from "../planarEcho";
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

setupSkillTestMocks();

describe("Planar Echo Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set CHA to 14 (+2 mod)
    actor.attribute.getStat("charisma").base = 14;

    target = createTestTarget({ id: "target-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });
    // Set LUK to 10 (0 mod) for predictable saves
    target.attribute.getStat("luck").base = 10;
    target.abGauge = 50; // Set initial AB gauge

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

      const result = planarEcho.exec(
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
    it("should calculate damage correctly at level 1", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock dice: 1d6 = 4
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      // Mock rollTwenty for hit/crit calculations
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
        d: jest.fn(() => ({ total: 15, rolls: [15] })),
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 6,
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      planarEcho.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Formula: 1d6 + CHA mod * (1 + 0.1 * skill level)
      // Dice = 4
      // CHA mod = 2
      // Multiplier (Lvl 1) = 1.1
      // Expected: 4 + (2 * 1.1) = 4 + 2.2 = 6.2 -> floor(6.2) = 6
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 6,
          type: DamageType.arcane,
          isMagic: true,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should calculate damage correctly at level 5", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

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
        d: jest.fn(() => ({ total: 15, rolls: [15] })),
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 7,
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      planarEcho.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Formula: 1d6 + CHA mod * (1 + 0.1 * skill level)
      // Dice = 4
      // CHA mod = 2
      // Multiplier (Lvl 5) = 1.5
      // Expected: 4 + (2 * 1.5) = 4 + 3 = 7
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 7,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });
  });

  describe("AB Gauge Reduction - LUK Save", () => {
    it("should reduce AB gauge by 10 if LUK save fails (DC10)", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      const initialGauge = 50;
      target.abGauge = initialGauge;

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

      // Mock resolveDamage to return isHit: true
      mockResolveDamage({
        actualDamage: 6,
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      // Mock save roll to fail (roll 5, DC 10)
      jest.spyOn(target, "rollSave").mockReturnValue(5);

      const result = planarEcho.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(target.abGauge).toBe(initialGauge - 10);
      expect(result.content.en).toContain("AB gauge");
    });

    it("should not reduce AB gauge if LUK save passes (DC10)", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      const initialGauge = 50;
      target.abGauge = initialGauge;

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
        actualDamage: 6,
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      // Mock save roll to pass (roll 15, DC 10)
      jest.spyOn(target, "rollSave").mockReturnValue(15);

      planarEcho.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(target.abGauge).toBe(initialGauge); // Should remain unchanged
    });

    it("should not reduce AB gauge if attack misses", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      const initialGauge = 50;
      target.abGauge = initialGauge;

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

      // Mock resolveDamage to return isHit: false
      mockResolveDamage({
        actualDamage: 0,
        damageType: DamageType.arcane,
        isHit: false,
        isCrit: false,
      });

      planarEcho.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(target.abGauge).toBe(initialGauge); // Should remain unchanged
      // rollSave should not be called if attack misses
    });

    it("should not reduce AB gauge below 0", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      target.abGauge = 5; // Low gauge

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
        actualDamage: 6,
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      jest.spyOn(target, "rollSave").mockReturnValue(5); // Fail

      planarEcho.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(target.abGauge).toBe(0); // Should be capped at 0
    });
  });

  describe("Return Value Structure", () => {
    it("should return correct structure", () => {
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
        actualDamage: 6,
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      jest.spyOn(target, "rollSave").mockReturnValue(5); // Fail

      const result = planarEcho.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.actor.actorId).toBe(actor.id);
      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]?.actorId).toBe(target.id);
    });
  });
});

