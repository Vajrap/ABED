/**
 * Arcane Shield Skill Tests
 * 
 * Tests for the Arcane Shield skill's exec() function, derived from description and formula:
 * - "Gain <FORMULA> stacks of <BuffArcaneShield>"
 * - Formula: 1d3 + floor(PlanarMod / 2) + floor(0.5 * skill level)
 * - Level 5 Bonus: +1d3
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { arcaneShield } from "../arcaneShield";
import { ActorEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import * as rollModule from "src/Utils/Dice";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

// Setup mocks
setupSkillTestMocks();

describe("Arcane Shield Skill", () => {
  let actor: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set Planar to 14 (+2 mod)
    actor.attribute.getStat("planar").base = 14;

    actorParty = [actor];
    targetParty = [];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Shield Stack Calculation", () => {
    it("should calculate stacks correctly at level 1", () => {
      const appenderSpy = jest.spyOn(buffsAndDebuffsRepository.arcaneShield, "appender");

      // Mock dice: 1d3 = 2
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 2,
          rolls: [2],
        })),
      }) as any);

      const result = arcaneShield.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Formula: 1d3 + floor(PlanarMod / 2) + floor(0.5 * SkillLevel)
      // 1d3 = 2
      // PlanarMod = 2 -> floor(2/2) = 1
      // SkillLevel = 1 -> floor(0.5) = 0
      // Total = 2 + 1 + 0 = 3
      
      expect(appenderSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 3 }
      );

      expect(result.content.en).toContain("got 3 stack");
      expect(result.actor.effect).toContain(ActorEffect.Focus);
    });

    it("should apply bonus dice at level 5", () => {
      const appenderSpy = jest.spyOn(buffsAndDebuffsRepository.arcaneShield, "appender");

      // Mock dice: 
      // 1st call (base): 1d3 = 2
      // 2nd call (bonus): 1d3 = 3
      const rollMock = jest.spyOn(rollModule, "roll") as any;
      rollMock
        .mockReturnValueOnce({
          d: jest.fn(() => ({ total: 2, rolls: [2] })),
        })
        .mockReturnValueOnce({
          d: jest.fn(() => ({ total: 3, rolls: [3] })),
        });

      const result = arcaneShield.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Formula: 1d3 + floor(PlanarMod / 2) + floor(0.5 * SkillLevel) + 1d3
      // 1d3 (base) = 2
      // PlanarMod = 2 -> floor(2/2) = 1
      // SkillLevel = 5 -> floor(2.5) = 2
      // 1d3 (bonus) = 3
      // Total = 2 + 1 + 2 + 3 = 8
      
      expect(appenderSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 8 }
      );

      expect(result.content.en).toContain("got 8 stack");
    });
  });
});
