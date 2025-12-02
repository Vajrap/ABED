/**
 * Retreat Dash Skill Tests
 * 
 * Tests for the Retreat Dash skill's exec() function, derived from description and formula:
 * - "Gain <BuffRetreat> for {5}'2':'1'{/} turn" -> Buff verification
 * - "Attempts to move to backline" -> Movement verification
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { retreatDash } from "../retreatDash";
import { ActorEffect, TargetEffect } from "../../../../effects";
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

describe("Retreat Dash Skill", () => {
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
    it("should apply Retreat buff for 1 turn at level 1", () => {
      const appenderSpy = jest.spyOn(buffsAndDebuffsRepository.retreat, "appender");

      retreatDash.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(appenderSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 2}
      );
    });

    it("should apply Retreat buff for 2 turns at level 5", () => {
      const appenderSpy = jest.spyOn(buffsAndDebuffsRepository.retreat, "appender");

      retreatDash.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(appenderSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 3 }
      );
    });
  });

  describe("Movement", () => {
    it("should move to backline if in front row", () => {
      actor.position = 1; // Front row

      const result = retreatDash.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Code logic: if (actor.position > 2) ... wait.
      // The description says "Attempts to move to backline".
      // Usually this means moving FROM front TO back.
      // Let's check the code:
      // `if (actor.position > 2) { ... move to 3,4,5 }`
      // Wait. `> 2` means Back Row (3, 4, 5).
      // So the code moves you to backline IF YOU ARE ALREADY IN BACKLINE?
      // Or maybe `> 2` is a typo in code and should be `<= 2` (Front Row)?
      // Or maybe `> 2` means "If position is greater than 2 (Back Row), do something"?
      // But the description says "Attempts to move to backline".
      // If I am in front (1), I want to go to back (3).
      // If the code says `if (actor.position > 2)`, then for pos 1, it does NOTHING.
      // This looks like a bug in the code: `if (actor.position > 2)` should probably be `if (actor.position <= 2)`.
      // BUT, I must test the code as is or flag it.
      // Actually, let's re-read the code snippet I saw earlier.
      /*
      62:     if (actor.position > 2) {
      63:       const allOccupiedPositions = actorParty.map((member) => member.position);
      64:       for (const position of [3, 4, 5] as const) {
      */
      // If actor.position is 3, 4, 5 (Back), it tries to move to 3, 4, 5.
      // This seems to shuffle position in backline?
      // But the description says "dash to safety... putting distance... Attempts to move to backline".
      // This strongly implies moving from Front to Back.
      // If the code is `> 2`, it effectively does nothing for front row actors.
      // I will write the test expecting it to move from Front to Back based on Description.
      // If it fails, it confirms the bug.
      
      // Wait, I might have misread the code or the logic.
      // If `actor.position > 2` is FALSE (i.e., 1 or 2), it skips the block.
      // So it does NOT move front row actors.
      // This is definitely a bug if the description is "Attempts to move to backline".
      // I will write the test to expect movement (Description is Truth).
      // If the test fails, I'll know.
      
      // Actually, I'll check if I can fix the code? No, I am writing tests.
      // I will write the test expecting the correct behavior.
      
      expect(actor.position).toBeGreaterThanOrEqual(3);
    });
  });
});
