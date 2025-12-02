/**
 * Edge Burst Skill Tests
 * 
 * Tests for the Edge Burst skill's exec() function, covering:
 * - No target handling
 * - Consume ALL EdgeCharge stacks (min 1)
 * - Damage formula: (WeaponDamage or Planar Edge dice if no weapon) + PlanarMod + (1d2 per EdgeCharge stack) × SkillLevelMultiplier
 * - Damage increases with each edge charge consumed
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { edgeBurst } from "../edgeBurst";
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
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

setupSkillTestMocks();

describe("Edge Burst Skill", () => {
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

      const result = edgeBurst.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to use Edge Burst but has no target");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toEqual([]);
    });
  });

  describe("EdgeCharge Consumption", () => {
    it("should consume ALL EdgeCharge stacks", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Pre-add 3 EdgeCharge stacks
      buffsAndDebuffsRepository.edgeCharge.appender(actor, { turnsAppending: 3 });
      expect(actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.edgeCharge)?.value).toBe(3);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 1, // 1d2 per stack
          rolls: [1],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      edgeBurst.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // EdgeCharge should be consumed (deleted)
      expect(actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.edgeCharge)).toBeUndefined();
    });

    it("should use minimum 1 EdgeCharge if none exist", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // No EdgeCharge stacks
      expect(actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.edgeCharge)).toBeUndefined();

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 1,
          rolls: [1],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      edgeBurst.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should still deal damage (min 1 charge)
      expect(rollModule.roll).toHaveBeenCalled();
    });
  });

  describe("Damage Calculation", () => {
    it("should add 1d2 damage per EdgeCharge stack", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Pre-add 2 EdgeCharge stacks
      buffsAndDebuffsRepository.edgeCharge.appender(actor, { turnsAppending: 2 });

      // Mock 1d2 rolls: first = 1, second = 2
      let rollCount = 0;
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => {
          rollCount++;
          return {
            total: rollCount === 1 ? 1 : 2, // First roll = 1, second = 2
            rolls: [rollCount === 1 ? 1 : 2],
          };
        }),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 8,
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      edgeBurst.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(resolveDamageSpy).toHaveBeenCalled();
      // Should roll 1d2 twice (once per stack)
      expect(rollCount).toBeGreaterThanOrEqual(2);
    });
  });

  describe("Return Value Structure", () => {
    it("should return correct structure with target effects", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 1,
          rolls: [1],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      const result = edgeBurst.exec(
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
      expect(result.content.en).toContain("Edge Burst");
    });
  });
});

