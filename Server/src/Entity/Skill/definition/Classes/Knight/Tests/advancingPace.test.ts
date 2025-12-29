/**
 * Advancing Pace Skill Tests
 * 
 * Tests for the Advancing Pace skill's exec() function, covering:
 * - Already active check
 * - Buff application (duration based on level)
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { advancingPaceSkill } from "../advancingPace";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

// Setup mocks
setupSkillTestMocks();

describe("Advancing Pace Skill", () => {
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

  describe("Already Active Check", () => {
    it("should return specific message if buff is already active", () => {
      // Mock buff already active
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.advancingPace, { value: 1 });

      const result = advancingPaceSkill.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("already maintaining an Advancing Pace");
      expect(result.actor.effect).toContain(ActorEffect.Focus);
    });
  });

  describe("Buff Application", () => {
    it("should apply buff for 3 turns at level 1", () => {
      const appenderSpy = jest.spyOn(buffsRepository[BuffEnum.advancingPace], "appender");

      const result = advancingPaceSkill.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(appenderSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 3 }
      );

      expect(result.content.en).toContain("advances their pace for 3 turns");
      expect(result.actor.effect).toContain(ActorEffect.Charge);
      expect(result.targets[0]!.effect).toContain(TargetEffect.Haste);
    });

    it("should apply buff for 4 turns at level 5", () => {
      const appenderSpy = jest.spyOn(buffsRepository[BuffEnum.advancingPace], "appender");

      const result = advancingPaceSkill.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(appenderSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 4 }
      );

      expect(result.content.en).toContain("advances their pace for 4 turns");
    });
  });
});
