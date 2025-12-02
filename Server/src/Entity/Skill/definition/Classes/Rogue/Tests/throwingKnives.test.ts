/**
 * Throwing Knives Skill Tests
 * 
 * Tests for the Throwing Knives skill's exec() function, derived from description and formula:
 * - "Throw {5}'3':'2'{/} daggers at random targets" -> Hit count verification
 * - "each dealing <FORMULA> pierce damage" -> Formula verification
 * - Formula: (1d4 + DEXmod) * SkillLevelMultiplier
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { throwingKnives } from "../throwingKnives";
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

// Setup mocks
setupSkillTestMocks();

describe("Throwing Knives Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // DEX 16 (+3)
    actor.attribute.getStat("dexterity").base = 16;

    target = createTestTarget({ id: "target-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });

    actorParty = [actor];
    targetParty = [target];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Hit Count", () => {
    it("should throw 2 knives at level 1", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.pierce,
        isHit: true,
        isCrit: false,
      });

      throwingKnives.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(resolveDamageSpy).toHaveBeenCalledTimes(2);
    });

    it("should throw 3 knives at level 5", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.pierce,
        isHit: true,
        isCrit: false,
      });

      throwingKnives.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(resolveDamageSpy).toHaveBeenCalledTimes(3);
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

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.pierce,
        isHit: true,
        isCrit: false,
      });

      throwingKnives.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Formula: (1d4 + DEX) * Multiplier
      // 1d4 = 3
      // DEX = 3
      // Multiplier (Lvl 1) = 1.1
      // Total = (3 + 3) * 1.1 = 6.6 -> floor(6.6) = 6
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 6,
          type: DamageType.pierce,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });
  });
});
