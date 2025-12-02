/**
 * Shield Up Skill Tests
 * 
 * Tests for the Shield Up skill's exec() function, covering:
 * - Defense Up buff application
 * - Duration: 3 turns (4 at level 5+)
 * - Return value structure
 * 
 * Note: Equipment requirements and resource consumption are tested separately.
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { shieldUp } from "../shieldUp";
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

describe("Shield Up Skill", () => {
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
    it("should apply Defense Up buff for 3 turns at level 1-4", () => {
      const defenseUpSpy = jest.spyOn(buffsAndDebuffsRepository.defenseUp, "appender");

      const result = shieldUp.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(defenseUpSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 3 },
      );
      expect(result.content.en).toContain("raised their shield");
    });

    it("should apply Defense Up buff for 4 turns at level 5+", () => {
      const defenseUpSpy = jest.spyOn(buffsAndDebuffsRepository.defenseUp, "appender");

      const result = shieldUp.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(defenseUpSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 4 },
      );
      expect(result.content.en).toContain("raised their shield");
    });
  });

  describe("Return Structure", () => {
    it("should return correct TurnResult structure", () => {
      const result = shieldUp.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result).toHaveProperty("content");
      expect(result.content).toHaveProperty("en");
      expect(result.content).toHaveProperty("th");
      expect(result.content.en).toContain("raised their shield");
      expect(result.actor).toHaveProperty("actorId", actor.id);
      expect(result.actor).toHaveProperty("effect");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(0);
    });
  });
});

