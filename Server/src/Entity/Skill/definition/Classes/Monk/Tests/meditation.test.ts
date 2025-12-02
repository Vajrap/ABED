/**
 * Meditation Skill Tests
 * 
 * Tests for the Meditation skill's exec() function, derived from description and formula:
 * - "Restore <FORMULA> to your lowest resource (HP, MP, or SP) as percentage of max"
 * - Formula: (1d4 + skill level + floor(ControlMod / 2))% of max
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { meditation } from "../meditation";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import * as rollModule from "src/Utils/Dice";

// Setup mocks
setupSkillTestMocks();

describe("Meditation Skill", () => {
  let actor: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set Control to 14 (+2 mod)
    actor.attribute.getStat("control").base = 14;
    
    // Set Max Vitals
    actor.vitals.hp.setBase(100);
    actor.vitals.mp.setBase(100);
    actor.vitals.sp.setBase(100);
    
    // Set Current Vitals (Full by default)
    actor.vitals.hp.current = 100;
    actor.vitals.mp.current = 100;
    actor.vitals.sp.current = 100;

    actorParty = [actor];
    targetParty = [];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Resource Selection", () => {
    it("should restore HP if it has the lowest percentage", () => {
      // HP: 50%, MP: 80%, SP: 80%
      actor.vitals.hp.current = 50;
      actor.vitals.mp.current = 80;
      actor.vitals.sp.current = 80;

      const incHpSpy = jest.spyOn(actor.vitals, "incHp");
      const incMpSpy = jest.spyOn(actor.vitals, "incMp");
      const incSpSpy = jest.spyOn(actor.vitals, "incSp");

      meditation.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(incHpSpy).toHaveBeenCalled();
      expect(incMpSpy).not.toHaveBeenCalled();
      expect(incSpSpy).not.toHaveBeenCalled();
    });

    it("should restore MP if it has the lowest percentage", () => {
      // HP: 80%, MP: 40%, SP: 80%
      actor.vitals.hp.current = 80;
      actor.vitals.mp.current = 40;
      actor.vitals.sp.current = 80;

      const incHpSpy = jest.spyOn(actor.vitals, "incHp");
      const incMpSpy = jest.spyOn(actor.vitals, "incMp");
      const incSpSpy = jest.spyOn(actor.vitals, "incSp");

      meditation.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(incMpSpy).toHaveBeenCalled();
      expect(incHpSpy).not.toHaveBeenCalled();
      expect(incSpSpy).not.toHaveBeenCalled();
    });

    it("should restore SP if it has the lowest percentage", () => {
      // HP: 80%, MP: 80%, SP: 30%
      actor.vitals.hp.current = 80;
      actor.vitals.mp.current = 80;
      actor.vitals.sp.current = 30;

      const incHpSpy = jest.spyOn(actor.vitals, "incHp");
      const incMpSpy = jest.spyOn(actor.vitals, "incMp");
      const incSpSpy = jest.spyOn(actor.vitals, "incSp");

      meditation.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(incSpSpy).toHaveBeenCalled();
      expect(incHpSpy).not.toHaveBeenCalled();
      expect(incMpSpy).not.toHaveBeenCalled();
    });
  });

  describe("Restore Amount Calculation", () => {
    it("should calculate restore amount correctly", () => {
      // HP Lowest
      actor.vitals.hp.current = 50;
      
      // Mock dice: 1d4 = 3
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      const incHpSpy = jest.spyOn(actor.vitals, "incHp");

      meditation.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Formula: (1d4 + Level + floor(ControlMod/2))%
      // 1d4 = 3
      // Level = 1
      // ControlMod = 2 -> floor(2/2) = 1
      // Total % = 3 + 1 + 1 = 5%
      // Max HP = 100 -> Restore 5 HP
      
      expect(incHpSpy).toHaveBeenCalledWith(5);
    });
  });
});
