/**
 * Mist Step Skill Tests
 * 
 * Tests for the Mist Step skill's exec() function, derived from description and formula:
 * - "If in front row: move to backline"
 * - "If in back row: gain <BuffRetreat> for {5}'2':'1'{/} turns"
 * - "Removes <DebuffSlow> if present"
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { mistStep } from "../mistStep";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

// Setup mocks
setupSkillTestMocks();

describe("Mist Step Skill", () => {
  let actor: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    actorParty = [actor];
    targetParty = [];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Front Row Behavior", () => {
    it("should move to backline if in front row", () => {
      // Set actor to front row (pos 1)
      actor.position = 1;
      
      // Ensure backline is empty (pos 3, 4, 5 available)
      // actorParty only has actor at pos 1

      const result = mistStep.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(actor.position).toBeGreaterThanOrEqual(3);
      expect(result.content.en).toContain("moved to backline");
    });
  });

  describe("Back Row Behavior", () => {
    it("should gain Retreat buff for 1 turn if in back row (Level 1)", () => {
      // Set actor to back row (pos 4)
      actor.position = 4;

      const appenderSpy = jest.spyOn(buffsAndDebuffsRepository.retreat, "appender");

      const result = mistStep.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(appenderSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 1 }
      );
      expect(result.content.en).toContain("gained evasion");
    });

    it("should gain Retreat buff for 2 turns if in back row (Level 5)", () => {
      // Set actor to back row (pos 4)
      actor.position = 4;

      const appenderSpy = jest.spyOn(buffsAndDebuffsRepository.retreat, "appender");

      mistStep.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(appenderSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 2 }
      );
    });
  });

  describe("Debuff Removal", () => {
    it("should remove Slow debuff if present", () => {
      // Set actor to front row
      actor.position = 1;
      
      // Add Slow debuff
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.slow, { value: 2, counter: 0 });

      const mutateBattleSpy = jest.spyOn(actor.attribute, "mutateBattle");

      const result = mistStep.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should restore agility (mutateBattle called)
      expect(mutateBattleSpy).toHaveBeenCalledWith("agility", 2);
      
      // Should remove debuff
      expect(actor.buffsAndDebuffs.debuffs.entry.has(DebuffEnum.slow)).toBe(false);
      expect(result.content.en).toContain("removed Slow");
    });
  });
});
