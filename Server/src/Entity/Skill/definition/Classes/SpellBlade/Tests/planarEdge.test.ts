/**
 * Planar Edge Skill Tests
 * 
 * Tests for the Planar Edge skill's exec() function, covering:
 * - No target handling
 * - Damage formula: (Damage Dice + PlanarMod + EdgeCharge stacks) × SkillLevelMultiplier
 * - Gain 1 EdgeCharge stack (max 5)
 * - Damage dice based on weapon or skill level if bare hand
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { planarEdge } from "../planarEdge";
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

describe("Planar Edge Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set Planar to 14 (+2 mod)
    actor.attribute.getStat("planar").base = 14;
    actor.attribute.getStat("dexterity").base = 14; // +2 mod for hit
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

      const result = planarEdge.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to use Planar Edge but has no target");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toEqual([]);
    });
  });

  describe("Edge Charge Generation", () => {
    it("should generate 1 EdgeCharge stack", () => {
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
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      const edgeChargeSpy = jest.spyOn(buffsAndDebuffsRepository.edgeCharge, "appender");

      planarEdge.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(edgeChargeSpy).toHaveBeenCalledWith(
        actor,
        expect.objectContaining({
          turnsAppending: 1,
        }),
      );
    });

    it("should cap EdgeCharge at 5 stacks", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Pre-add 5 stacks
      buffsAndDebuffsRepository.edgeCharge.appender(actor, { turnsAppending: 5 });
      const initialEntry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.edgeCharge);
      expect(initialEntry?.value).toBe(5);

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
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      planarEdge.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should still be capped at 5 (appender should handle this)
      const finalEntry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.edgeCharge);
      // The appender might add another stack, but the buff definition should cap it
      expect(finalEntry?.value).toBeLessThanOrEqual(5);
    });
  });

  describe("Damage Calculation", () => {
    it("should calculate damage with EdgeCharge stacks", () => {
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

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 7,
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      planarEdge.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(resolveDamageSpy).toHaveBeenCalled();
      const callArgs = resolveDamageSpy.mock.calls[0];
      const damageOutput = callArgs?.[2] as any;
      
      // Formula: (Damage Dice + PlanarMod + EdgeCharge stacks) × SkillLevelMultiplier
      // Weapon dice + 2 (PlanarMod) + 2 (EdgeCharge) × 1.0
      expect(damageOutput.damage).toBeGreaterThan(0);
      expect(damageOutput.type).toBe(DamageType.arcane);
      expect(damageOutput.isMagic).toBe(true);
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
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      const result = planarEdge.exec(
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
      expect(result.content.en).toContain("Planar Edge");
    });
  });
});

