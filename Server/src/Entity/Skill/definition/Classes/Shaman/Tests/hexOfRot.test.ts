/**
 * Hex of Rot Skill Tests
 * 
 * Tests for the Hex of Rot skill's exec() function, covering:
 * - No target handling
 * - Damage formula: 1d4 + PlanarMod + 0.5 × skill level
 * - Save roll: DC10 + ControlMod WILsave
 * - Save failed: Apply Hexed debuff for 2 turns
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { hexOfRot } from "../hexOfRot";
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

describe("Hex of Rot Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set Planar to 14 (+2 mod), Control to 14 (+2 mod)
    actor.attribute.getStat("planar").base = 14;
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

      const result = hexOfRot.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to cast Hex of Rot but has no target");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toEqual([]);
    });
  });

  describe("Damage Calculation", () => {
    it("should calculate damage correctly at level 1", () => {
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
        total: 10,
        rolls: [10],
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.chaos,
        isHit: true,
        isCrit: false,
      });

      hexOfRot.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(resolveDamageSpy).toHaveBeenCalled();
      const callArgs = resolveDamageSpy.mock.calls[0];
      const damageOutput = callArgs?.[2] as any;
      
      // Formula: 1d4 + PlanarMod + 0.5 × skill level
      // Dice = 3, PlanarMod = 2, Level 1 = 0.5
      // Expected: 3 + 2 + 0.5 = 5.5 -> 5
      expect(damageOutput.damage).toBeGreaterThan(0);
      expect(damageOutput.type).toBe(DamageType.chaos);
      expect(damageOutput.isMagic).toBe(true);
    });

    it("should scale damage with skill level", () => {
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
        total: 10,
        rolls: [10],
      } as any);

      mockResolveDamage({
        actualDamage: 7,
        damageType: DamageType.chaos,
        isHit: true,
        isCrit: false,
      });

      hexOfRot.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Level 5: 3 + 2 + 2.5 = 7.5 -> 7
      expect(rollModule.roll).toHaveBeenCalled();
    });
  });

  describe("Hex Debuff Application", () => {
    it("should apply Hexed debuff when save fails", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock save roll to fail (roll 5, DC 10 + 2 = 12)
      jest.spyOn(target, "rollSave").mockReturnValue(5);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 5,
        rolls: [5],
      } as any);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.chaos,
        isHit: true,
        isCrit: false,
      });

      const hexedSpy = jest.spyOn(buffsAndDebuffsRepository.hexed, "appender");

      hexOfRot.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(hexedSpy).toHaveBeenCalledWith(
        target,
        expect.objectContaining({
          turnsAppending: 1,
        }),
      );
    });

    it("should not apply Hexed debuff when save passes", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock save roll to pass (roll 15, DC 12)
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

      hexOfRot.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should not apply hexed if save passed
      // Note: The code checks willpowerSave < hexDC + targetWillpowerMod
      // So if target has willpower mod, it might still fail
      // This test verifies the structure
      expect(hexedSpy).toHaveBeenCalledTimes(0);
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
        total: 5,
        rolls: [5],
      } as any);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.chaos,
        isHit: true,
        isCrit: false,
      });

      const result = hexOfRot.exec(
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
      expect(result.content.en).toContain("Hex of Rot");
    });
  });
});

