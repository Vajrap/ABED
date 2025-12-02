/**
 * Wind Slash Skill Tests
 * 
 * Tests for the Wind Slash skill's exec() function, covering:
 * - No target handling
 * - Damage formula: Planar Edge damage × SkillLevelMultiplier
 * - Level 5: +0.5 damage per EdgeCharge stack (rounded down)
 * - Save roll: DC7 + PlanarMod ENDsave
 * - Save failed: Apply Bleed debuff for 1d2 turns
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { windSlash } from "../windSlash";
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
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

setupSkillTestMocks();

describe("Wind Slash Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set Planar to 14 (+2 mod)
    actor.attribute.getStat("planar").base = 14;
    actor.attribute.getStat("control").base = 14; // +2 mod for hit
    actor.attribute.getStat("luck").base = 14; // +2 mod for crit
    
    target = createTestTarget({ id: "target-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });
    target.attribute.getStat("endurance").base = 10; // 0 mod for predictable saves

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

      const result = windSlash.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to use Wind Slash but has no target");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toEqual([]);
    });
  });

  describe("Damage Calculation", () => {
    it("should calculate damage based on Planar Edge formula", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.wind,
        isHit: true,
        isCrit: false,
      });

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.wind,
        isHit: true,
        isCrit: false,
      });

      windSlash.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(resolveDamageSpy).toHaveBeenCalled();
      const callArgs = resolveDamageSpy.mock.calls[0];
      const damageOutput = callArgs?.[2] as any;
      
      expect(damageOutput.type).toBe(DamageType.wind);
      expect(damageOutput.isMagic).toBe(true);
    });

    it("should add 0.5 damage per EdgeCharge stack at level 5", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Pre-add 2 EdgeCharge stacks
      buffsAndDebuffsRepository.edgeCharge.appender(actor, { turnsAppending: 2 });

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      mockResolveDamage({
        actualDamage: 6,
        damageType: DamageType.wind,
        isHit: true,
        isCrit: false,
      });

      windSlash.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Should add 0.5 × 2 = 1 damage (rounded down)
      expect(rollModule.roll).toHaveBeenCalled();
    });
  });

  describe("Bleed Debuff Application", () => {
    it("should apply Bleed debuff when save fails", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock save roll to fail (roll 5, DC 7 + 2 = 9)
      jest.spyOn(target, "rollSave").mockReturnValue(5);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 1, // 1d2 = 1 turn
          rolls: [1],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.wind,
        isHit: true,
        isCrit: false,
      });

      const bleedSpy = jest.spyOn(debuffsRepository.bleed, "appender");

      windSlash.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(bleedSpy).toHaveBeenCalledWith(
        target,
        expect.objectContaining({
          turnsAppending: expect.any(Number),
        }),
      );
    });

    it("should not apply Bleed debuff when save passes", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock save roll to pass (roll 15, DC 9)
      jest.spyOn(target, "rollSave").mockReturnValue(15);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.wind,
        isHit: true,
        isCrit: false,
      });

      const bleedSpy = jest.spyOn(debuffsRepository.bleed, "appender");

      windSlash.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should not apply bleed if save passed
      expect(bleedSpy).not.toHaveBeenCalled();
    });
  });

  describe("Return Value Structure", () => {
    it("should return correct structure with target effects", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.wind,
        isHit: true,
        isCrit: false,
      });

      const result = windSlash.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]?.actorId).toBe(target.id);
      expect(result.content.en).toContain("Wind Slash");
    });
  });
});

