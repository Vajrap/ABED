/**
 * Rage Skill Tests
 * 
 * Tests for the Rage skill's exec() function, covering:
 * - Duration: 3 turns at level < 5, 4 turns at level >= 5
 * - Rage buff application
 * - Return value structure
 * 
 * Note: Cannot cast while Rage is active is tested in getPlayableSkill tests.
 * Equipment requirements and resource consumption are tested separately.
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { rage } from "../rage";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

// Setup mocks
setupSkillTestMocks();

describe("Rage Skill", () => {
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

  describe("Duration", () => {
    it("should apply Rage for 3 turns at skill level 1", () => {
      const rageAppenderSpy = jest.spyOn(buffsAndDebuffsRepository.rage, "appender");

      const result = rage.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(rageAppenderSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 3 },
      );

      expect(result.content.en).toContain("flies into a rage");
      expect(result.content.en).toContain("3 turn(s)");
    });

    it("should apply Rage for 3 turns at skill level 4", () => {
      const rageAppenderSpy = jest.spyOn(buffsAndDebuffsRepository.rage, "appender");

      rage.exec(
        actor,
        actorParty,
        targetParty,
        4,
        DEFAULT_TEST_LOCATION,
      );

      expect(rageAppenderSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 3 },
      );
    });

    it("should apply Rage for 4 turns at skill level 5", () => {
      const rageAppenderSpy = jest.spyOn(buffsAndDebuffsRepository.rage, "appender");

      const result = rage.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(rageAppenderSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 4 },
      );

      expect(result.content.en).toContain("flies into a rage");
      expect(result.content.en).toContain("4 turn(s)");
    });

    it("should apply Rage for 4 turns at skill level 6 (>= 5)", () => {
      const rageAppenderSpy = jest.spyOn(buffsAndDebuffsRepository.rage, "appender");

      rage.exec(
        actor,
        actorParty,
        targetParty,
        6,
        DEFAULT_TEST_LOCATION,
      );

      expect(rageAppenderSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 4 },
      );
    });
  });

  describe("Rage Buff Application", () => {
    it("should apply Rage buff to the actor", () => {
      const rageAppenderSpy = jest.spyOn(buffsAndDebuffsRepository.rage, "appender");

      rage.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(rageAppenderSpy).toHaveBeenCalledTimes(1);
      expect(rageAppenderSpy).toHaveBeenCalledWith(
        actor,
        expect.objectContaining({
          turnsAppending: 3,
        }),
      );
    });

    it("should apply Rage buff correctly (self-target)", () => {
      const rageAppenderSpy = jest.spyOn(buffsAndDebuffsRepository.rage, "appender");

      const result = rage.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Verify the buff is applied to the actor
      expect(rageAppenderSpy).toHaveBeenCalledWith(actor, expect.any(Object));

      // Verify actor is in targets (self-target)
      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]?.actorId).toBe(actor.id);
    });
  });

  describe("Return Structure", () => {
    it("should return correct TurnResult structure", () => {
      jest.spyOn(buffsAndDebuffsRepository.rage, "appender");

      const result = rage.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result).toHaveProperty("content");
      expect(result.content).toHaveProperty("en");
      expect(result.content).toHaveProperty("th");
      expect(result.content.en).toContain("flies into a rage");
      expect(result.actor).toHaveProperty("actorId", actor.id);
      expect(result.actor).toHaveProperty("effect");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]).toHaveProperty("actorId", actor.id);
      expect(result.targets[0]).toHaveProperty("effect");
      expect(result.targets[0]?.effect).toContain(TargetEffect.TestSkill);
    });
  });
});

