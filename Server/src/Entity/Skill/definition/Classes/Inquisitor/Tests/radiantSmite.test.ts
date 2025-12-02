/**
 * Radiant Smite Skill Tests
 * 
 * Tests for the Radiant Smite skill's exec() function, covering:
 * - No target handling
 * - Basic damage calculation ((WIL + PLANAR)/2 scaling)
 * - Level 5 dice scaling (1d6 -> 1d8)
 * - Undead/Fiend bonus (+1d4 damage)
 * - Evil alignment bonus (+1d4 damage)
 * - Combined bonuses
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { radiantSmite } from "../radiantSmite";
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
import { CharacterAlignmentEnum, CharacterType } from "src/InterFacesEnumsAndTypes/Enums";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

// Setup mocks
setupSkillTestMocks();

describe("Radiant Smite Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set stats for predictable mods
    // WIL 16 -> +3
    // PLANAR 12 -> +1
    // Total mod = (3 + 1) / 2 = 2
    actor.attribute.getStat("willpower").base = 16;
    actor.attribute.getStat("planar").base = 12;
    
    target = createTestTarget({ id: "target-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });
    // Default alignment neutral
    target.alignment.alignment = jest.fn(() => CharacterAlignmentEnum.Initiate);

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

      const result = radiantSmite.exec(
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
    it("should deal correct base damage at level 1", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock dice: 1d6 = 4
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
        actualDamage: 10,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      } as any);

      radiantSmite.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Calculation:
      // Base Dice (1d6) = 4
      // Mods (WIL+PLANAR)/2 = (3+1)/2 = 2
      // Skill Scalar (Lvl 1) = 1.1
      // Formula: (4 + 2) * 1.1 = 6.6 -> floor(6.6) = 6
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 6,
          type: DamageType.radiance,
          isMagic: true,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should use 1d8 dice at level 5", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock dice: 1d8 = 5
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
        actualDamage: 10,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      } as any);

      radiantSmite.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Calculation:
      // Base Dice (1d8) = 5
      // Mods = 2
      // Skill Scalar (Lvl 5) = 1.5
      // Formula: (5 + 2) * 1.5 = 10.5 -> floor(10.5) = 10
      
      expect(rollModule.roll).toHaveBeenCalledWith(1);
    });
  });

  describe("Bonus Damage Mechanics", () => {
    it("should deal +1d4 bonus damage against Undead", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      target.type = CharacterType.undead;

      // Mock dice: 
      // 1st call (base damage): 1d6 = 4
      // 2nd call (bonus damage): 1d4 = 3
      const rollMock = jest.spyOn(rollModule, "roll") as any;
      rollMock
        .mockReturnValueOnce({
          d: jest.fn(() => ({ total: 4, rolls: [4] })),
        })
        .mockReturnValueOnce({
          d: jest.fn(() => ({ total: 3, rolls: [3] })),
        });
      
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      } as any);

      const result = radiantSmite.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Base calc: 6
      // Bonus: 3
      // Total: 9
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 9,
        }),
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("vs undead/fiends");
    });

    it("should deal +1d4 bonus damage against Evil alignment", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      target.alignment.alignment = jest.fn(() => CharacterAlignmentEnum.Cruel);

      // Mock dice: 
      // 1st call (base damage): 1d6 = 4
      // 2nd call (bonus damage): 1d4 = 3
      const rollMock = jest.spyOn(rollModule, "roll") as any;
      rollMock
        .mockReturnValueOnce({
          d: jest.fn(() => ({ total: 4, rolls: [4] })),
        })
        .mockReturnValueOnce({
          d: jest.fn(() => ({ total: 3, rolls: [3] })),
        });
      
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      } as any);

      const result = radiantSmite.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Base calc: 6
      // Bonus: 3
      // Total: 9
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 9,
        }),
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("vs evil");
    });

    it("should stack bonuses for Evil Undead", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      target.type = CharacterType.undead;
      target.alignment.alignment = jest.fn(() => CharacterAlignmentEnum.Cruel);

      // Mock dice: 
      // 1st call (base damage): 1d6 = 4
      // 2nd call (undead bonus): 1d4 = 3
      // 3rd call (evil bonus): 1d4 = 2
      const rollMock = jest.spyOn(rollModule, "roll") as any;
      rollMock
        .mockReturnValueOnce({
          d: jest.fn(() => ({ total: 4, rolls: [4] })),
        })
        .mockReturnValueOnce({
          d: jest.fn(() => ({ total: 3, rolls: [3] })),
        })
        .mockReturnValueOnce({
          d: jest.fn(() => ({ total: 2, rolls: [2] })),
        });
      
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      } as any);

      const result = radiantSmite.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Base calc: 6
      // Undead Bonus: 3
      // Evil Bonus: 2
      // Total: 11
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 11,
        }),
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("vs evil");
      expect(result.content.en).toContain("vs undead/fiends");
    });
  });
});
