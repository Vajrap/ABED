/**
 * Bless Skill Tests
 * 
 * Tests for the Bless skill's exec() function, covering:
 * - No allies handling
 * - Bless buff application to all allies for 2 turns
 * - Order gain at level 5+ (DC10 + WILmod)
 * - Return value structure
 * 
 * Note: Equipment requirements and resource consumption are tested separately.
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { bless } from "../bless";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import * as rollModule from "src/Utils/Dice";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

// Setup mocks
setupSkillTestMocks();

describe("Bless Skill", () => {
  let actor: any;
  let ally1: any;
  let ally2: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    actor.attribute.getStat("willpower").base = 16; // +3 mod
    actor.resources.order = 0; // Reset order
    
    ally1 = createTestTarget({ id: "ally-1", name: { en: "Ally 1", th: "พันธมิตร 1" } });
    ally2 = createTestTarget({ id: "ally-2", name: { en: "Ally 2", th: "พันธมิตร 2" } });

    actorParty = [actor, ally1, ally2];
    targetParty = [];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("No Allies Handling", () => {
    it("should still work with only the actor (no other allies)", () => {
      const soloParty = [actor];
      
      const result = bless.exec(
        actor,
        soloParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should bless the actor themselves
      expect(result.content.en).toContain("blessed");
      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]?.actorId).toBe(actor.id);
    });
  });

  describe("Bless Buff Application", () => {
    it("should apply Bless buff to all living allies for 2 turns", () => {
      const blessSpy = jest.spyOn(buffsRepository[BuffEnum.bless], "appender");

      const result = bless.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should bless all 3 allies (actor, ally1, ally2)
      expect(blessSpy).toHaveBeenCalledTimes(3);
      expect(blessSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 2 },
      );
      expect(blessSpy).toHaveBeenCalledWith(
        ally1,
        { turnsAppending: 2 },
      );
      expect(blessSpy).toHaveBeenCalledWith(
        ally2,
        { turnsAppending: 2 },
      );

      expect(result.content.en).toContain("blessed");
      expect(result.targets).toHaveLength(3);
    });

    it("should not bless dead allies", () => {
      // Set HP to 0 to make ally dead
      ally1.vitals.hp.setCurrent(0);
      const blessSpy = jest.spyOn(buffsRepository[BuffEnum.bless], "appender");

      bless.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should only bless actor and ally2 (ally1 is dead)
      expect(blessSpy).toHaveBeenCalledTimes(2);
      expect(blessSpy).not.toHaveBeenCalledWith(
        ally1,
        expect.anything(),
      );
    });
  });

  describe("Order Gain", () => {
    it("should not gain order at level 1-4", () => {
      const orderBefore = actor.resources.order;

      bless.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(actor.resources.order).toBe(orderBefore);
    });

    it("should gain +1 order at level 5+ if DC10 + WILmod roll succeeds", () => {
      // Mock roll: 15 + 3 (WILmod) = 18 >= 10, should succeed
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      const orderBefore = actor.resources.order;

      const result = bless.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Should gain +1 order
      expect(actor.resources.order).toBe(orderBefore + 1);
      expect(result.content.en).toContain("gained +1 order");
    });

    it("should not gain order at level 5+ if DC10 + WILmod roll fails", () => {
      // Mock roll: 5 + 3 (WILmod) = 8 < 10, should fail
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 5,
        rolls: [5],
      } as any);

      const orderBefore = actor.resources.order;

      const result = bless.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Should not gain order
      expect(actor.resources.order).toBe(orderBefore);
      expect(result.content.en).not.toContain("gained +1 order");
    });
  });

  describe("Return Structure", () => {
    it("should return correct TurnResult structure", () => {
      const result = bless.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result).toHaveProperty("content");
      expect(result.content).toHaveProperty("en");
      expect(result.content).toHaveProperty("th");
      expect(result.content.en).toContain("blessed");
      expect(result.actor).toHaveProperty("actorId", actor.id);
      expect(result.actor).toHaveProperty("effect");
      expect(result.actor.effect).toContain(ActorEffect.Cast);
      expect(result.targets.length).toBeGreaterThan(0);
      result.targets.forEach(target => {
        expect(target).toHaveProperty("actorId");
        expect(target).toHaveProperty("effect");
        expect(target.effect).toContain(TargetEffect.Bless);
      });
    });
  });
});

