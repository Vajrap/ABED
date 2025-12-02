/**
 * Backdraft Skill Tests
 * 
 * Tests for the Backdraft skill's exec() function, derived from description and formula:
 * - "Targets all enemies with <DebuffBurn>"
 * - "Deal <FORMULA> fire damage per burn stack" (Assumed 1 damage per stack based on context, as formula describes heal)
 * - "Heal yourself for total damage × (0.1 × skill level) {5} + 1d2 per stack: + 1 per stack{/}"
 * - Remove burn stacks after damage
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { backdraft } from "../backdraft";
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
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

// Setup mocks
setupSkillTestMocks();

describe("Backdraft Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    target = createTestTarget({ id: "target-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });

    actorParty = [actor];
    targetParty = [target];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Targeting", () => {
    it("should target enemies with burn debuff", () => {
      // Mock target having burn
      target.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.burn, { value: 3 });

      const withDebuffSpy = jest.fn(() => ({ all: jest.fn(() => [target]) }));
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        withDebuff: withDebuffSpy,
      }) as any);

      backdraft.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(getTargetModule.getTarget).toHaveBeenCalledWith(actor, actorParty, targetParty, "enemy");
      expect(withDebuffSpy).toHaveBeenCalledWith(DebuffEnum.burn);
    });

    it("should return no target message if no enemies have burn", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        withDebuff: jest.fn(() => ({ all: jest.fn(() => []) })),
      }) as any);

      const result = backdraft.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("no enemies have burn status");
      expect(result.targets).toHaveLength(0);
    });
  });

  describe("Damage and Heal Calculation", () => {
    it("should deal damage equal to burn stacks and heal actor (Level 1)", () => {
      // Setup target with 5 burn stacks
      target.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.burn, { value: 5 });

      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        withDebuff: jest.fn(() => ({ all: jest.fn(() => [target]) })),
      }) as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5, // Assume 1 per stack
        damageType: DamageType.fire,
        isHit: true,
        isCrit: false,
      });

      const incHpSpy = jest.spyOn(actor.vitals, "incHp");

      backdraft.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Verify Damage: 5 stacks -> 5 damage
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 5,
          type: DamageType.fire,
        }),
        DEFAULT_TEST_LOCATION,
      );

      // Verify Heal:
      // Formula: Total Damage * (0.1 * Level) + 1 per stack (Level < 5)
      // Damage = 5
      // Level = 1
      // Stacks = 5
      // Heal = (5 * 0.1 * 1) + (1 * 5) = 0.5 + 5 = 5.5 -> floor(5.5) = 5
      
      // Note: The implementation might differ from description. 
      // If this test fails, it confirms the discrepancy.
      expect(incHpSpy).toHaveBeenCalledWith(5);

      // Verify burn removal
      expect(target.buffsAndDebuffs.debuffs.entry.has(DebuffEnum.burn)).toBe(false);
    });

    it("should deal damage and heal actor with bonus (Level 5)", () => {
      // Setup target with 5 burn stacks
      target.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.burn, { value: 5 });

      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        withDebuff: jest.fn(() => ({ all: jest.fn(() => [target]) })),
      }) as any);

      // Mock dice for heal bonus (1d2 per stack)
      // Wait, if the code implements 1d2 ONCE, this test will reveal it.
      // Description says "1d2 per stack".
      // Let's mock roll to return 2.
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 2,
          rolls: [2],
        })),
      }) as any);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.fire,
        isHit: true,
        isCrit: false,
      });

      const incHpSpy = jest.spyOn(actor.vitals, "incHp");

      backdraft.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Verify Heal:
      // Formula: Total Damage * (0.1 * Level) + 1d2 per stack (Level >= 5)
      // Damage = 5
      // Level = 5
      // Stacks = 5
      // Bonus Heal = 2 (rolled) * 5 = 10
      // Base Heal = 5 * 0.5 = 2.5
      // Total = 12.5 -> 12
      
      expect(incHpSpy).toHaveBeenCalledWith(12);
    });
  });
});
