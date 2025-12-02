/**
 * Fire Bolt Skill Tests
 * 
 * Tests for the Fire Bolt skill's exec() function, derived from description and formula:
 * - "Unleash a focused bolt" -> Single target
 * - "Deal <FORMULA> fire damage" -> Formula verification
 * - Formula: 1d6 + PlanarMod + 0.5 * SkillLevel
 * - "target must roll DC8 + <PlanarMod> ENDsave or get <DebuffBurn> 1–2 stacks"
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { fireBolt } from "../fireBolt";
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

describe("Fire Bolt Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set Planar to 14 (+2 mod)
    actor.attribute.getStat("planar").base = 14;

    target = createTestTarget({ id: "target-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });

    actorParty = [actor];
    targetParty = [target];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Targeting", () => {
    it("should target a single enemy", () => {
      const oneSpy = jest.fn(() => target);
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: oneSpy,
      }) as any);

      fireBolt.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(getTargetModule.getTarget).toHaveBeenCalledWith(actor, actorParty, targetParty, "enemy");
      expect(oneSpy).toHaveBeenCalled();
    });
  });

  describe("Damage and Burn Calculation", () => {
    it("should calculate damage correctly at level 1", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock dice: 1d6 = 4
      const rollMock = jest.spyOn(rollModule, "roll") as any;
      rollMock
        .mockReturnValueOnce({ d: jest.fn(() => ({ total: 4, rolls: [4] })) }) // Damage
        .mockReturnValueOnce({ d: jest.fn(() => ({ total: 2, rolls: [2] })) }); // Burn Stacks (if hit)

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.fire,
        isHit: true,
        isCrit: false,
      });

      fireBolt.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Formula: 1d6 + PlanarMod + 0.5 * Level
      // Dice = 4
      // PlanarMod = 2
      // Level = 1 -> 0.5
      // Total = 4 + 2 + 0.5 = 6.5 -> floor(6.5) = 6
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 6,
          type: DamageType.fire,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should apply burn on failed save", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock dice
      const rollMock = jest.spyOn(rollModule, "roll") as any;
      rollMock
        .mockReturnValueOnce({ d: jest.fn(() => ({ total: 4, rolls: [4] })) }) // Damage
        .mockReturnValueOnce({ d: jest.fn(() => ({ total: 2, rolls: [2] })) }); // Burn Stacks

      mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.fire,
        isHit: true,
        isCrit: false,
      });

      // Mock failed save (DC 8 + 2 = 10)
      jest.spyOn(target, "rollSave").mockReturnValue(5);

      const burnAppenderSpy = jest.spyOn(buffsAndDebuffsRepository.burn, "appender");

      fireBolt.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(burnAppenderSpy).toHaveBeenCalledWith(
        target,
        { turnsAppending: 2 }
      );
    });
  });
});
