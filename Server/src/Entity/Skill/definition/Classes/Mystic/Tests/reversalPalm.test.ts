/**
 * Reversal Palm Skill Tests
 * 
 * Tests for the Reversal Palm skill's exec() function, derived from description and formula:
 * - "Gain <BuffReversalPalm> for 1 turn"
 * - Universal Counter = Skill Level (used for damage calculation later)
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { reversalPalm } from "../reversalPalm";
import { ActorEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

// Setup mocks
setupSkillTestMocks();

describe("Reversal Palm Skill", () => {
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
    it("should apply Reversal Palm buff for 1 turn with skill level as counter", () => {
      const appenderSpy = jest.spyOn(buffsAndDebuffsRepository.reversalPalm, "appender");

      const result = reversalPalm.exec(
        actor,
        actorParty,
        targetParty,
        5, // Level 5
        DEFAULT_TEST_LOCATION,
      );

      expect(appenderSpy).toHaveBeenCalledWith(
        actor,
        { 
          turnsAppending: 1,
          universalCounter: 5 
        }
      );

      expect(result.content.en).toContain("assumes the Reversal Palm stance");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
    });
  });
});
