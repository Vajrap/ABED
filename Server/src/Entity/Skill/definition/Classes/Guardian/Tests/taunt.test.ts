/**
 * Taunt Skill Tests
 * 
 * Tests for the Taunt skill's exec() function, covering:
 * - Taunt buff application
 * - Duration formula: 2 + floor(0.5 × skill level) + floor(CHAmod / 2)
 * - Return value structure
 * 
 * Note: Equipment requirements and resource consumption are tested separately.
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { taunt } from "../taunt";
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

describe("Taunt Skill", () => {
  let actor: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    actor.attribute.getStat("charisma").base = 14; // +2 mod

    actorParty = [actor];
    targetParty = [];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Taunt Duration Calculation", () => {
    it("should calculate duration correctly at level 1", () => {
      // CHAmod = +2, so floor(2/2) = 1
      // Duration = 2 + floor(0.5 × 1) + 1 = 2 + 0 + 1 = 3
      const tauntSpy = jest.spyOn(buffsAndDebuffsRepository.taunt, "appender");

      const result = taunt.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(tauntSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 3 },
      );
      expect(result.content.en).toContain("taunted enemies");
      expect(result.content.en).toContain("3 turns");
    });

    it("should calculate duration correctly at level 5", () => {
      // CHAmod = +2, so floor(2/2) = 1
      // Duration = 2 + floor(0.5 × 5) + 1 = 2 + 2 + 1 = 5
      const tauntSpy = jest.spyOn(buffsAndDebuffsRepository.taunt, "appender");

      const result = taunt.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(tauntSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 5 },
      );
      expect(result.content.en).toContain("5 turns");
    });

    it("should calculate duration with higher charisma", () => {
      actor.attribute.getStat("charisma").base = 18; // +4 mod
      // CHAmod = +4, so floor(4/2) = 2
      // Duration = 2 + floor(0.5 × 1) + 2 = 2 + 0 + 2 = 4
      const tauntSpy = jest.spyOn(buffsAndDebuffsRepository.taunt, "appender");

      taunt.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(tauntSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 4 },
      );
    });
  });

  describe("Return Structure", () => {
    it("should return correct TurnResult structure", () => {
      const result = taunt.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result).toHaveProperty("content");
      expect(result.content).toHaveProperty("en");
      expect(result.content).toHaveProperty("th");
      expect(result.content.en).toContain("taunted enemies");
      expect(result.actor).toHaveProperty("actorId", actor.id);
      expect(result.actor).toHaveProperty("effect");
      expect(result.actor.effect).toContain(ActorEffect.Taunt);
      expect(result.targets).toHaveLength(0);
    });
  });
});

