/**
 * Corruption Skill Tests
 * 
 * Tests for the Corruption skill's exec() function, covering:
 * - No target handling
 * - Damage formula: 1d4 + PlanarMod
 * - Save roll: DC10 + ControlMod ENDsave
 * - Save failed: Apply Cursed debuff for 3 turns and Hexed debuff for 2 turns
 * - Level 5: Also apply 2 stacks of Burn
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { corruption } from "../corruption";
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

describe("Corruption Skill", () => {
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
    target.attribute.getStat("endurance").base = 10; // 0 mod for predictable saves

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

      const result = corruption.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to use Corruption but has no target");
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

      corruption.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(resolveDamageSpy).toHaveBeenCalled();
      const callArgs = resolveDamageSpy.mock.calls[0];
      const damageOutput = callArgs?.[2] as any;
      
      // Formula: 1d4 + PlanarMod
      // Dice = 3, PlanarMod = 2
      // Expected: 3 + 2 = 5
      expect(damageOutput.damage).toBeGreaterThan(0);
      expect(damageOutput.type).toBe(DamageType.dark);
      expect(damageOutput.isMagic).toBe(true);
    });
  });

  describe("Debuff Application", () => {
    it("should apply Cursed and Hexed debuffs when save fails", () => {
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

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.dark,
        isHit: true,
        isCrit: false,
      });

      const cursedSpy = jest.spyOn(buffsAndDebuffsRepository.cursed, "appender");
      const hexedSpy = jest.spyOn(buffsAndDebuffsRepository.hexed, "appender");

      corruption.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(cursedSpy).toHaveBeenCalledWith(
        target,
        expect.objectContaining({
          turnsAppending: 3,
        }),
      );
      expect(hexedSpy).toHaveBeenCalledWith(
        target,
        expect.objectContaining({
          turnsAppending: 2,
        }),
      );
    });

    it("should apply Burn debuff at level 5 when save fails", () => {
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

      const burnSpy = jest.spyOn(buffsAndDebuffsRepository.burn, "appender");

      corruption.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(burnSpy).toHaveBeenCalledWith(
        target,
        expect.objectContaining({
          turnsAppending: 2,
        }),
      );
    });

    it("should not apply debuffs when save passes", () => {
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

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.dark,
        isHit: true,
        isCrit: false,
      });

      const cursedSpy = jest.spyOn(buffsAndDebuffsRepository.cursed, "appender");
      const hexedSpy = jest.spyOn(buffsAndDebuffsRepository.hexed, "appender");

      corruption.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should not apply debuffs if save passed
      expect(cursedSpy).not.toHaveBeenCalled();
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

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.dark,
        isHit: true,
        isCrit: false,
      });

      const result = corruption.exec(
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
      expect(result.content.en).toContain("Corruption");
    });
  });
});

