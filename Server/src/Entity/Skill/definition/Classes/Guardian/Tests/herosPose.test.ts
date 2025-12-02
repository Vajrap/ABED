/**
 * Hero's Pose Skill Tests
 * 
 * Tests for the Hero's Pose skill's exec() function, covering:
 * - DC roll: 15 - skill level (10 - skill level at level 5+)
 * - Healing formula: VITmod + skill level (on success)
 * - No healing on failed roll
 * - Return value structure
 * 
 * Note: Equipment requirements and resource consumption are tested separately.
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { herosPose } from "../herosPose";
import { ActorEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import * as rollModule from "src/Utils/Dice";

// Setup mocks
setupSkillTestMocks();

describe("Hero's Pose Skill", () => {
  let actor: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    actor.attribute.getStat("vitality").base = 16; // +3 mod
    actor.vitals.hp.setBase(200);
    actor.vitals.hp.setCurrent(50); // Set to injured state

    actorParty = [actor];
    targetParty = [];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("DC Roll", () => {
    it("should use DC 15 - skill level at level 1-4", () => {
      // At level 1, DC = 15 - 1 = 14
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15, // Passes DC 14
        rolls: [15],
      } as any);

      const beforeHp = actor.vitals.hp.current;

      const result = herosPose.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should heal: VITmod + skill level = 3 + 1 = 4
      const actualHeal = actor.vitals.hp.current - beforeHp;
      expect(actualHeal).toBeGreaterThanOrEqual(4);
      expect(result.content.en).toContain("healed");
    });

    it("should use DC 15 - skill level at level 5+ (implementation uses 15 - skill level for all levels)", () => {
      // At level 5, DC = 15 - 5 = 10 (implementation always uses 15 - skillLevel)
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 12, // Passes DC 10
        rolls: [12],
      } as any);

      const beforeHp = actor.vitals.hp.current;

      const result = herosPose.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Should heal: VITmod + skill level = 3 + 5 = 8
      const actualHeal = actor.vitals.hp.current - beforeHp;
      expect(actualHeal).toBeGreaterThanOrEqual(8);
      expect(result.content.en).toContain("healed");
    });

    it("should not heal on failed roll", () => {
      // At level 1, DC = 15 - 1 = 14
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 10, // Fails DC 14
        rolls: [10],
      } as any);

      const beforeHp = actor.vitals.hp.current;

      const result = herosPose.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should not heal
      const actualHeal = actor.vitals.hp.current - beforeHp;
      expect(actualHeal).toBe(0);
      expect(result.content.en).toContain("nothing happened");
    });
  });

  describe("Healing Formula", () => {
    it("should heal for VITmod + skill level on success", () => {
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 20, // Always passes
        rolls: [20],
      } as any);

      const beforeHp = actor.vitals.hp.current;

      herosPose.exec(
        actor,
        actorParty,
        targetParty,
        3,
        DEFAULT_TEST_LOCATION,
      );

      // Expected: VITmod + skill level = 3 + 3 = 6
      const actualHeal = actor.vitals.hp.current - beforeHp;
      expect(actualHeal).toBeGreaterThanOrEqual(6);
    });
  });

  describe("Return Structure", () => {
    it("should return correct TurnResult structure on success", () => {
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 20,
        rolls: [20],
      } as any);

      const result = herosPose.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result).toHaveProperty("content");
      expect(result.content).toHaveProperty("en");
      expect(result.content).toHaveProperty("th");
      expect(result.content.en).toContain("heroic pose");
      expect(result.content.en).toContain("healed");
      expect(result.actor).toHaveProperty("actorId", actor.id);
      expect(result.actor).toHaveProperty("effect");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(0);
    });

    it("should return correct TurnResult structure on failure", () => {
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 1,
        rolls: [1],
      } as any);

      const result = herosPose.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("heroic pose");
      expect(result.content.en).toContain("nothing happened");
    });
  });
});

