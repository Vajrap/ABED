/**
 * Inner Veil Skill Tests
 * 
 * Tests for the Inner Veil skill's exec() function, derived from description and formula:
 * - "around a frontline ally" -> Target verification
 * - "Give <BuffInnerVeil> for {5}'3':'2'{/} turns" -> Duration verification
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { innerVeil } from "../innerVeil";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import * as getTargetModule from "src/Entity/Battle/getTarget";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

// Setup mocks
setupSkillTestMocks();

describe("Inner Veil Skill", () => {
  let actor: any;
  let ally: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    ally = createTestActor({ id: "ally-1", name: { en: "Ally 1", th: "พันธมิตร 1" } });

    actorParty = [actor, ally];
    targetParty = [];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Targeting", () => {
    it("should target a frontline ally", () => {
      // Mock getTarget chain
      const oneSpy = jest.fn(() => ally);
      const withSpy = jest.fn(() => ({ one: oneSpy }));
      const fromSpy = jest.fn(() => ({ with: withSpy }));
      
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: fromSpy,
      }) as any);

      innerVeil.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(getTargetModule.getTarget).toHaveBeenCalledWith(actor, actorParty, targetParty, "ally");
      expect(fromSpy).toHaveBeenCalledWith("frontOnly");
      expect(oneSpy).toHaveBeenCalled();
    });
  });

  describe("Buff Application", () => {
    it("should apply buff for 2 turns at level 1", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({ with: jest.fn(() => ({ one: jest.fn(() => ally) })) })),
      }) as any);

      const appenderSpy = jest.spyOn(buffsAndDebuffsRepository.innerVeil, "appender");

      innerVeil.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(appenderSpy).toHaveBeenCalledWith(
        ally,
        { turnsAppending: 2 }
      );
    });

    it("should apply buff for 3 turns at level 5", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({ with: jest.fn(() => ({ one: jest.fn(() => ally) })) })),
      }) as any);

      const appenderSpy = jest.spyOn(buffsAndDebuffsRepository.innerVeil, "appender");

      innerVeil.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(appenderSpy).toHaveBeenCalledWith(
        ally,
        { turnsAppending: 3 }
      );
    });
  });
});
