/**
 * Parry & Riposte Skill Tests
 * 
 * Tests for the Parry & Riposte skill's exec() function, covering:
 * - Parry buff application
 * - Duration: 1 turn (2 at level 5+)
 * - Skill level stored in universalCounter for damage calculation
 * - Return value structure
 * 
 * Note: Equipment requirements and resource consumption are tested separately.
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { parryRiposte } from "../parryRiposte";
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

describe("Parry & Riposte Skill", () => {
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
    it("should apply Parry buff for 1 turn at level 1-4", () => {
      const parrySpy = jest.spyOn(buffsAndDebuffsRepository.parry, "appender");

      const result = parryRiposte.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(parrySpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 1, universalCounter: 1 }, // Skill level stored in universalCounter
      );
      expect(result.content.en).toContain("defensive stance");
      expect(result.content.en).toContain("parry and counter");
    });

    it("should apply Parry buff for 2 turns at level 5+", () => {
      const parrySpy = jest.spyOn(buffsAndDebuffsRepository.parry, "appender");

      const result = parryRiposte.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(parrySpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 2, universalCounter: 5 }, // Skill level stored in universalCounter
      );
      expect(result.content.en).toContain("2 turns");
    });
  });

  describe("Return Structure", () => {
    it("should return correct TurnResult structure", () => {
      const result = parryRiposte.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result).toHaveProperty("content");
      expect(result.content).toHaveProperty("en");
      expect(result.content).toHaveProperty("th");
      expect(result.content.en).toContain("defensive stance");
      expect(result.actor).toHaveProperty("actorId", actor.id);
      expect(result.actor).toHaveProperty("effect");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(0);
    });
  });
});

