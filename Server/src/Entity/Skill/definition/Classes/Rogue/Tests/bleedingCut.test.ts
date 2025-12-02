/**
 * Bleeding Cut Skill Tests
 * 
 * Tests for the Bleeding Cut skill's exec() function, derived from description and formula:
 * - "Deal <FORMULA> slash damage" -> Formula verification
 * - Formula: (WeaponDamage + DEXmod) * SkillLevelMultiplier * RangePenalty
 * - "Target must roll DC{5}'12':'10'{/} ENDsave or get <DebuffBleed> 1d3 stacks" -> Bleed verification
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { bleedingCut } from "../bleedingCut";
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
import * as getWeaponDamageOutputModule from "src/Utils/getWeaponDamgeOutput";
import * as getPositionModifierModule from "src/Utils/getPositionModifier";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

// Setup mocks
setupSkillTestMocks();

describe("Bleeding Cut Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Default sword
    actor.getWeapon = jest.fn(() => ({ weaponType: "sword", physicalDamage: 10 }));
    // DEX 16 (+3)
    actor.attribute.getStat("dexterity").base = 16;

    target = createTestTarget({ id: "target-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });

    actorParty = [actor];
    targetParty = [target];

    // Mock helpers
    // Note: getWeaponDamageOutput already includes attribute modifiers (DEX mod = +3)
    // So mock returns base weapon damage (10) + DEX mod (3) = 13
    jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockImplementation(() => ({
      damage: 13, // 10 (base) + 3 (DEX mod from getWeaponDamageOutput)
      hit: 0,
      crit: 0,
      type: "slashing",
      isMagic: false,
    } as any));

    jest.spyOn(getPositionModifierModule, "getPositionModifier").mockReturnValue(1);

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Damage Calculation", () => {
    it("should calculate damage correctly at level 1", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: "slash",
        isHit: true,
        isCrit: false,
      });

      bleedingCut.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Formula: WeaponDamage * Multiplier * Range
      // WeaponDamage (from getWeaponDamageOutput) = 13 (includes DEX mod already)
      // Multiplier (Lvl 1) = 1.1
      // Range = 1
      // Total = 13 * 1.1 * 1 = 14.3 -> 14
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: expect.any(Number),
          type: "slash",
        }),
        DEFAULT_TEST_LOCATION,
      );
      // Verify damage is approximately 14 (14.3, which rounds to 14)
      const callArgs = resolveDamageSpy.mock.calls[0];
      const damageOutput = callArgs?.[2] as any;
      expect(damageOutput.damage).toBeCloseTo(14, 0); // Allow 0.5 difference
    });
  });

  describe("Bleed Application", () => {
    it("should apply bleed on failed save (Level 1, DC 10)", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock bleed stacks: 1d3 = 2
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 2,
          rolls: [2],
        })),
      }) as any);

      mockResolveDamage({
        actualDamage: 10,
        damageType: "slash",
        isHit: true,
        isCrit: false,
      });

      // Mock failed save (Roll < DC 10)
      jest.spyOn(target, "rollSave").mockReturnValue(5);

      const appenderSpy = jest.spyOn(debuffsRepository.bleed, "appender");

      bleedingCut.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(appenderSpy).toHaveBeenCalledWith(
        target,
        { turnsAppending: 2 }
      );
    });

    it("should apply bleed on failed save (Level 5, DC 12)", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock bleed stacks: 1d3 = 3
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      mockResolveDamage({
        actualDamage: 10,
        damageType: "slash",
        isHit: true,
        isCrit: false,
      });

      // Mock failed save (Roll < DC 12)
      jest.spyOn(target, "rollSave").mockReturnValue(11); // 11 < 12

      const appenderSpy = jest.spyOn(debuffsRepository.bleed, "appender");

      bleedingCut.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(appenderSpy).toHaveBeenCalledWith(
        target,
        { turnsAppending: 3 }
      );
    });
  });
});
