/**
 * Fireball Skill Tests
 * 
 * Tests for the Fireball skill's exec() function, derived from description and formula:
 * - "engulfing 1–6 enemies" -> Target count verification
 * - "Deal <FORMULA> fire damage" -> Formula verification
 * - Formula: Dice + PlanarMod + 0.5 * SkillLevel
 * - Dice: 1d10 (Level < 5), 1d12 (Level >= 5)
 * - "target must roll DC10 + <PlanarMod> ENDsave or get <DebuffBurn> 1–2 stacks"
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { fireBall } from "../fireBall";
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
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

// Setup mocks
setupSkillTestMocks();

describe("Fireball Skill", () => {
  let actor: any;
  let targets: any[];
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set Planar to 14 (+2 mod)
    actor.attribute.getStat("planar").base = 14;

    // Create 6 targets
    targets = Array.from({ length: 6 }, (_, i) => 
      createTestTarget({ id: `target-${i+1}`, name: { en: `Enemy ${i+1}`, th: `ศัตรู ${i+1}` } })
    );

    actorParty = [actor];
    targetParty = targets;

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Targeting", () => {
    it("should target multiple enemies based on roll", () => {
      // Mock roll for target count
      // Logic: roll(6).d(1) twice.
      // If either <= 3, use first roll. Else average.
      // Let's mock rolls to get 3 targets (Roll1=3, Roll2=anything)
      const rollMock = jest.spyOn(rollModule, "roll") as any;
      rollMock.mockReturnValue({ d: jest.fn(() => ({ total: 3, rolls: [3] })) });

      const manySpy = jest.fn(() => targets.slice(0, 3));
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        many: manySpy,
      }) as any);

      fireBall.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(manySpy).toHaveBeenCalledWith(3);
    });
  });

  describe("Damage and Burn Calculation", () => {
    it("should calculate damage correctly at level 1 (1d10)", () => {
      // Mock 1 target
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        many: jest.fn(() => [targets[0]]),
      }) as any);

      // Mock dice:
      // 1. Target count rolls (2 calls) - irrelevant for this test as we mocked getTarget
      // 2. Damage roll: 1d10 = 6
      // 3. Burn stacks roll: 2d1 = 2 (if hit)
      const rollMock = jest.spyOn(rollModule, "roll") as any;
      
      // We need to handle the target count rolls first if they happen before getTarget.many
      // In the code, roll() is called BEFORE getTarget().many()
      rollMock
        .mockReturnValueOnce({ d: jest.fn(() => ({ total: 1, rolls: [1] })) }) // Target count 1
        .mockReturnValueOnce({ d: jest.fn(() => ({ total: 1, rolls: [1] })) }) // Target count 2
        .mockReturnValueOnce({ d: jest.fn(() => ({ total: 6, rolls: [6] })) }) // Damage (1d10)
        .mockReturnValueOnce({ d: jest.fn(() => ({ total: 2, rolls: [1, 1] })) }); // Burn Stacks

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.fire,
        isHit: true,
        isCrit: false,
      });

      // Mock failed save
      jest.spyOn(targets[0], "rollSave").mockReturnValue(5);

      fireBall.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Formula: Dice + PlanarMod + 0.5 * Level
      // Dice = 6
      // PlanarMod = 2
      // Level = 1 -> 0.5
      // Total = 6 + 2 + 0.5 = 8.5 -> floor(8.5) = 8
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        targets[0].id,
        expect.objectContaining({
          damage: 8,
          type: DamageType.fire,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should calculate damage correctly at level 5 (1d12)", () => {
      // Mock 1 target
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        many: jest.fn(() => [targets[0]]),
      }) as any);

      // Mock dice:
      // 1. Target count rolls
      // 2. Damage roll: 1d12 = 8
      const rollMock = jest.spyOn(rollModule, "roll") as any;
      rollMock
        .mockReturnValueOnce({ d: jest.fn(() => ({ total: 1, rolls: [1] })) })
        .mockReturnValueOnce({ d: jest.fn(() => ({ total: 1, rolls: [1] })) })
        .mockReturnValueOnce({ d: jest.fn(() => ({ total: 8, rolls: [8] })) }); // Damage (1d12)

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.fire,
        isHit: true,
        isCrit: false,
      });

      fireBall.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Formula: Dice + PlanarMod + 0.5 * Level
      // Dice = 8
      // PlanarMod = 2
      // Level = 5 -> 2.5
      // Total = 8 + 2 + 2.5 = 12.5 -> floor(12.5) = 12
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        targets[0].id,
        expect.objectContaining({
          damage: 12,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should apply burn on failed save", () => {
      // Mock 1 target
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        many: jest.fn(() => [targets[0]]),
      }) as any);

      // Mock dice
      const rollMock = jest.spyOn(rollModule, "roll") as any;
      rollMock
        .mockReturnValueOnce({ d: jest.fn(() => ({ total: 1, rolls: [1] })) })
        .mockReturnValueOnce({ d: jest.fn(() => ({ total: 1, rolls: [1] })) })
        .mockReturnValueOnce({ d: jest.fn(() => ({ total: 6, rolls: [6] })) }) // Damage
        .mockReturnValueOnce({ d: jest.fn(() => ({ total: 2, rolls: [1, 1] })) }); // Burn Stacks

      mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.fire,
        isHit: true,
        isCrit: false,
      });

      // Mock failed save (DC 10 + 2 = 12)
      jest.spyOn(targets[0], "rollSave").mockReturnValue(5);

      const burnAppenderSpy = jest.spyOn(buffsAndDebuffsRepository.burn, "appender");

      fireBall.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(burnAppenderSpy).toHaveBeenCalledWith(
        targets[0],
        { turnsAppending: 2 }
      );
    });
  });
});
