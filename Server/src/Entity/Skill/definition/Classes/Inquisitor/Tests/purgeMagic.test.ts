/**
 * Purge Magic Skill Tests
 * 
 * Tests for the Purge Magic skill's exec() function, covering:
 * - No target handling
 * - Damage calculation (1d4 + Target Planar + Buff Count)
 * - Level 5 bonus damage (+2)
 * - True damage application (hit: 999, trueDamage: true)
 * - Buff removal (1 buff at level 1, 2 buffs at level 5)
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { purgeMagic } from "../purgeMagic";
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
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

// Setup mocks
setupSkillTestMocks();

describe("Purge Magic Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    target = createTestTarget({ id: "target-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });
    
    // Set target Planar to 14 -> +2 mod
    target.attribute.getStat("planar").base = 14;

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

      const result = purgeMagic.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("has no target");
      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(0);
    });
  });

  describe("Damage Calculation", () => {
    it("should deal correct damage based on target stats and buffs", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Add 2 buffs to target
      target.buffsAndDebuffs.buffs.entry.set(BuffEnum.bless, { value: 1 });
      target.buffsAndDebuffs.buffs.entry.set(BuffEnum.duelingStance, { value: 1 });

      // Mock dice: 1d4 = 3
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      });

      purgeMagic.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Calculation:
      // Base Dice (1d4) = 3
      // Target Planar Mod = 2
      // Buff Count = 2
      // Total = 3 + 2 + 2 = 7
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 7,
          type: DamageType.radiance,
          isMagic: true,
          trueDamage: true,
          hit: 999,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should add +2 damage at level 5", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // No buffs
      // Target Planar Mod = 2

      // Mock dice: 1d4 = 3
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      });

      purgeMagic.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Calculation:
      // Base Dice (1d4) = 3
      // Target Planar Mod = 2
      // Buff Count = 0
      // Level 5 Bonus = 2
      // Total = 3 + 2 + 0 + 2 = 7
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 7,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });
  });

  describe("Buff Removal", () => {
    it("should remove 1 buff at level 1", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Add 2 buffs
      target.buffsAndDebuffs.buffs.entry.set(BuffEnum.bless, { value: 1 });
      target.buffsAndDebuffs.buffs.entry.set(BuffEnum.duelingStance, { value: 1 });

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({ total: 3, rolls: [3] })),
      }) as any);

      mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      });

      const result = purgeMagic.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should have 1 buff left
      expect(target.buffsAndDebuffs.buffs.entry.size).toBe(1);
      expect(result.content.en).toContain("1 buff(s) removed");
    });

    it("should remove 2 buffs at level 5", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Add 3 buffs
      target.buffsAndDebuffs.buffs.entry.set(BuffEnum.bless, { value: 1 });
      target.buffsAndDebuffs.buffs.entry.set(BuffEnum.duelingStance, { value: 1 });
      target.buffsAndDebuffs.buffs.entry.set(BuffEnum.edgeCharge, { value: 1 });

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({ total: 3, rolls: [3] })),
      }) as any);

      mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      });

      const result = purgeMagic.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Should have 1 buff left (3 - 2 = 1)
      expect(target.buffsAndDebuffs.buffs.entry.size).toBe(1);
      expect(result.content.en).toContain("2 buff(s) removed");
    });
  });
});
