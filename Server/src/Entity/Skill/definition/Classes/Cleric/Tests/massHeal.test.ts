/**
 * Mass Heal Skill Tests
 * 
 * Tests for the Mass Heal skill's exec() function, covering:
 * - No allies handling
 * - Healing formula: 1d6 + (WILmod + CHAmod) / 2 + skill level
 * - Debuff removal at level 4+ for each ally
 * - Healing all living allies
 * - Return value structure
 * 
 * Note: Equipment requirements and resource consumption are tested separately.
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { massHeal } from "../massHeal";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import * as rollModule from "src/Utils/Dice";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

// Setup mocks
setupSkillTestMocks();

describe("Mass Heal Skill", () => {
  let actor: any;
  let ally1: any;
  let ally2: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Setup actor with willpower and charisma for healing
    actor.attribute.getStat("willpower").base = 16; // +3 mod
    actor.attribute.getStat("charisma").base = 14; // +2 mod
    
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
    it("should return appropriate message when no living allies are found", () => {
      const emptyParty: any[] = [];
      
      const result = massHeal.exec(
        actor,
        emptyParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to cast Mass Heal");
      expect(result.content.en).toContain("no allies to heal");
      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(0);
    });
  });

  describe("Healing Formula", () => {
    it("should heal all allies for 1d6 + (WILmod + CHAmod) / 2 + skill level", () => {
      // Mock dice: 1d6 = 4, WILmod = +3, CHAmod = +2, totalMod = (3+2)/2 = 2.5, skill level = 1
      // Expected: 4 + 2.5 + 1 = 7.5 → 7 (Math.floor)
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      // Ensure allies have room to heal
      ally1.vitals.hp.setBase(200);
      ally2.vitals.hp.setBase(200);
      ally1.vitals.hp.setCurrent(50);
      ally2.vitals.hp.setCurrent(60);
      const beforeHp1 = ally1.vitals.hp.current;
      const beforeHp2 = ally2.vitals.hp.current;

      const result = massHeal.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Both allies should be healed
      const actualHeal1 = ally1.vitals.hp.current - beforeHp1;
      const actualHeal2 = ally2.vitals.hp.current - beforeHp2;
      
      // Expected: 4 + Math.floor((3+2)/2) + 1 = 4 + 2 + 1 = 7
      expect(actualHeal1).toBeGreaterThanOrEqual(7);
      expect(actualHeal2).toBeGreaterThanOrEqual(7);
      
      expect(result.content.en).toContain("Mass Heal");
      expect(result.content.en).toContain("restoring the party");
      expect(result.targets).toHaveLength(3); // actor, ally1, ally2
    });

    it("should scale healing with skill level", () => {
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      ally1.vitals.hp.setBase(200);
      ally1.vitals.hp.setCurrent(50);
      const beforeHp = ally1.vitals.hp.current;

      massHeal.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Expected at level 5: 4 + Math.floor((3+2)/2) + 5 = 4 + 2 + 5 = 11
      const actualHeal = ally1.vitals.hp.current - beforeHp;
      expect(actualHeal).toBeGreaterThanOrEqual(11);
    });
  });

  describe("Debuff Removal", () => {
    it("should not remove debuffs at level 1-3", () => {
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      // Add debuffs
      debuffsRepository.dazed.appender(ally1, { turnsAppending: 1 });
      const debuffCountBefore = ally1.buffsAndDebuffs.debuffs.entry.size;

      const result = massHeal.exec(
        actor,
        actorParty,
        targetParty,
        3,
        DEFAULT_TEST_LOCATION,
      );

      // Debuff should still be there
      expect(ally1.buffsAndDebuffs.debuffs.entry.size).toBe(debuffCountBefore);
      expect(result.content.en).not.toContain("cleansed");
    });

    it("should remove one random debuff from each ally at level 4+", () => {
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      // Add debuffs to both allies
      debuffsRepository.dazed.appender(ally1, { turnsAppending: 1 });
      debuffsRepository.exposed.appender(ally1, { turnsAppending: 1, universalCounter: 2 });
      debuffsRepository.dazed.appender(ally2, { turnsAppending: 1 });
      
      const debuffCountBefore1 = ally1.buffsAndDebuffs.debuffs.entry.size;
      const debuffCountBefore2 = ally2.buffsAndDebuffs.debuffs.entry.size;

      const result = massHeal.exec(
        actor,
        actorParty,
        targetParty,
        4,
        DEFAULT_TEST_LOCATION,
      );

      // Each ally should have one debuff removed
      expect(ally1.buffsAndDebuffs.debuffs.entry.size).toBe(debuffCountBefore1 - 1);
      expect(ally2.buffsAndDebuffs.debuffs.entry.size).toBe(debuffCountBefore2 - 1);
      expect(result.content.en).toContain("cleansed");
    });
  });

  describe("Cooldown Application", () => {
    it("should apply cooldown debuff after mass healing", () => {
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      const cooldownSpy = jest.spyOn(debuffsRepository.massHealCooldown, "appender");

      massHeal.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(cooldownSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 4 },
      );
    });
  });

  describe("Return Structure", () => {
    it("should return correct TurnResult structure", () => {
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      const result = massHeal.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result).toHaveProperty("content");
      expect(result.content).toHaveProperty("en");
      expect(result.content).toHaveProperty("th");
      expect(result.content.en).toContain("Mass Heal");
      expect(result.actor).toHaveProperty("actorId", actor.id);
      expect(result.actor).toHaveProperty("effect");
      expect(result.actor.effect).toContain(ActorEffect.Cast);
      expect(result.targets.length).toBeGreaterThan(0);
      result.targets.forEach(target => {
        expect(target).toHaveProperty("actorId");
        expect(target).toHaveProperty("effect");
        expect(target.effect).toContain(TargetEffect.TestSkill);
      });
    });
  });
});

