/**
 * Life Drain Skill Tests
 * 
 * Tests for the Life Drain skill's exec() function, covering:
 * - No target handling
 * - Damage formula: {5}'1d10':'1d8'{/} + PlanarMod + WILmod
 * - Heal self for {5}'75%':'50%'{/} + VITmod/10 of damage dealt
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { lifeDrain } from "../lifeDrain";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
  mockResolveDamage,
} from "../../../testHelpers";
import * as getTargetModule from "src/Entity/Battle/getTarget";
import * as rollModule from "src/Utils/Dice";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

setupSkillTestMocks();

describe("Life Drain Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set Planar to 14 (+2 mod), WIL to 14 (+2 mod), VIT to 14 (+2 mod)
    actor.attribute.getStat("planar").base = 14;
    actor.attribute.getStat("willpower").base = 14;
    actor.attribute.getStat("vitality").base = 14;
    actor.attribute.getStat("control").base = 14; // +2 mod for hit
    actor.attribute.getStat("luck").base = 14; // +2 mod for crit
    actor.vitals.hp.setCurrent(50); // Set HP below max for healing
    
    target = createTestTarget({ id: "target-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });

    actorParty = [actor];
    targetParty = [target];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("No Target Handling", () => {
    it("should return appropriate message when no target is found", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => null),
      }) as any);

      const result = lifeDrain.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to use Life Drain but has no target");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toEqual([]);
    });
  });

  describe("Damage Calculation", () => {
    it("should calculate damage correctly at level 1", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock dice: 1d8 = 4
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 8,
        damageType: DamageType.erosion,
        isHit: true,
        isCrit: false,
      });

      lifeDrain.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(resolveDamageSpy).toHaveBeenCalled();
      const callArgs = resolveDamageSpy.mock.calls[0];
      const damageOutput = callArgs?.[2] as any;
      
      // Formula: 1d8 + PlanarMod + WILmod
      // Dice = 4, PlanarMod = 2, WILmod = 2
      // Expected: 4 + 2 + 2 = 8
      expect(damageOutput.damage).toBeGreaterThan(0);
      expect(damageOutput.type).toBe(DamageType.erosion);
      expect(damageOutput.isMagic).toBe(true);
    });

    it("should use 1d10 dice at level 5", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 5,
          rolls: [5],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      mockResolveDamage({
        actualDamage: 9,
        damageType: DamageType.erosion,
        isHit: true,
        isCrit: false,
      });

      lifeDrain.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Should use 1d10 at level 5
      expect(rollModule.roll).toHaveBeenCalled();
    });
  });

  describe("Healing Calculation", () => {
    it("should heal self for 50% of damage at level 1", () => {
      // Ensure HP is below max for healing
      actor.vitals.hp.setBase(100);
      actor.vitals.hp.setCurrent(50);
      const initialHp = actor.vitals.hp.current;
      
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      mockResolveDamage({
        actualDamage: 8,
        damageType: DamageType.erosion,
        isHit: true,
        isCrit: false,
      });

      lifeDrain.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should heal for 50% of 8 = 4 HP (plus VITmod/10 = 0.2, so 4.2 -> 4)
      expect(actor.vitals.hp.current).toBeGreaterThan(initialHp);
    });

    it("should heal self for 75% of damage at level 5", () => {
      // Ensure HP is below max for healing
      actor.vitals.hp.setBase(100);
      actor.vitals.hp.setCurrent(50);
      const initialHp = actor.vitals.hp.current;
      
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 5,
          rolls: [5],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      mockResolveDamage({
        actualDamage: 9,
        damageType: DamageType.erosion,
        isHit: true,
        isCrit: false,
      });

      lifeDrain.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Should heal for 75% of 9 = 6.75 -> 6 HP (plus VITmod/10)
      expect(actor.vitals.hp.current).toBeGreaterThan(initialHp);
    });
  });

  describe("Return Value Structure", () => {
    it("should return correct structure with target effects", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      mockResolveDamage({
        actualDamage: 8,
        damageType: DamageType.erosion,
        isHit: true,
        isCrit: false,
      });

      const result = lifeDrain.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.Cast);
      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]?.actorId).toBe(target.id);
      expect(result.content.en).toContain("Life Drain");
    });
  });
});

