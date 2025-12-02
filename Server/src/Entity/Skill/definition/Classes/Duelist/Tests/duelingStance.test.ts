/**
 * Dueling Stance Skill Tests
 * 
 * Tests for the Dueling Stance skill's exec() function, covering:
 * - Dueling Stance buff application
 * - Duration: 2 turns (3 at level 5+)
 * - +2 crit bonus at level 5+ (stored in universalCounter)
 * - Return value structure
 * 
 * Note: Equipment requirements and resource consumption are tested separately.
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { duelingStance } from "../duelingStance";
import { ActorEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

// Setup mocks
setupSkillTestMocks();

describe("Dueling Stance Skill", () => {
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

  describe("Buff Application", () => {
    it("should apply Dueling Stance buff for 2 turns at level 1-4", () => {
      const duelingStanceSpy = jest.spyOn(buffsAndDebuffsRepository.duelingStance, "appender");

      const result = duelingStance.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(duelingStanceSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 2, universalCounter: 0 }, // No crit bonus at level < 5
      );
      expect(result.content.en).toContain("dueling stance");
      expect(result.content.en).not.toContain("+2 crit");
    });

    it("should apply Dueling Stance buff for 3 turns at level 5+", () => {
      const duelingStanceSpy = jest.spyOn(buffsAndDebuffsRepository.duelingStance, "appender");

      const result = duelingStance.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(duelingStanceSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 3, universalCounter: 2 }, // +2 crit bonus at level 5+
      );
      expect(result.content.en).toContain("+2 crit");
    });
  });

  describe("Return Structure", () => {
    it("should return correct TurnResult structure", () => {
      const result = duelingStance.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result).toHaveProperty("content");
      expect(result.content).toHaveProperty("en");
      expect(result.content).toHaveProperty("th");
      expect(result.content.en).toContain("dueling stance");
      expect(result.actor).toHaveProperty("actorId", actor.id);
      expect(result.actor).toHaveProperty("effect");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(0);
    });
  });
});

