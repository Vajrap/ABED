/**
 * Aegis Shield Skill Tests
 * 
 * Tests for the Aegis Shield skill's exec() function, derived from description and formula:
 * - "Activate <BuffAegisShield> with {5}'4':'3'{/} stacks" -> Stack verification
 * - Check if already active
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { aegisShield } from "../aegisShield";
import { ActorEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

// Setup mocks
setupSkillTestMocks();

describe("Aegis Shield Skill", () => {
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
    it("should fail if Aegis Shield is already active", () => {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.aegisShield, { value: 1 });

      const result = aegisShield.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("already has Aegis Shield active");
      expect(result.targets).toHaveLength(0);
    });
  });

  describe("Buff Application", () => {
    it("should apply 3 stacks at level 1", () => {
      const appenderSpy = jest.spyOn(buffsRepository[BuffEnum.aegisShield], "appender");

      const result = aegisShield.exec(
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
      expect(result.content.en).toContain("3 stack(s)");
    });

    it("should apply 4 stacks at level 5", () => {
      const appenderSpy = jest.spyOn(buffsRepository[BuffEnum.aegisShield], "appender");

      const result = aegisShield.exec(
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
      expect(result.content.en).toContain("4 stack(s)");
    });
  });
});
