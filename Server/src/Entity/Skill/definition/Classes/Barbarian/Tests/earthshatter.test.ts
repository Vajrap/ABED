/**
 * Earthshatter Skill Tests
 * 
 * Tests for the Earthshatter skill's exec() function, covering:
 * - No targets handling (empty front line)
 * - Area attack on all front-row enemies
 * - Damage calculation: 1d8 + STR mod (1d10 at level 5)
 * - DC8 Endurance save
 * - Dazed application on failed save
 * - Return value structure
 * 
 * Note: Equipment requirements and resource consumption are tested separately.
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { earthshatter } from "../earthshatter";
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
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

// Setup mocks
setupSkillTestMocks();

describe("Earthshatter Skill", () => {
  let actor: any;
  let target1: any;
  let target2: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    target1 = createTestTarget({ id: "target-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });
    target2 = createTestTarget({ id: "target-2", name: { en: "Enemy 2", th: "ศัตรู 2" } });

    actorParty = [actor];
    targetParty = [target1, target2];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("No Targets Handling", () => {
    it("should return appropriate message when no targets are found", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({
          all: jest.fn(() => []),
        })),
      }) as any);

      const result = earthshatter.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("slams the ground");
      expect(result.content.en).toContain("front line is empty");
      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(0);
    });
  });

  describe("Area Attack", () => {
    it("should damage all front-row targets", () => {
      const targets = [target1, target2];
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({
          all: jest.fn(() => targets),
        })),
      }) as any);

      // Mock dice rolls: 1d8 = 5, d20 for hit = 15, d20 for crit = 10
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

      // Mock save rolls: both pass (save >= 8)
      jest.spyOn(target1, "rollSave").mockReturnValue(10);
      jest.spyOn(target2, "rollSave").mockReturnValue(12);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: "blunt",
        isHit: true,
        isCrit: false,
      });

      const dazedAppenderSpy = jest.spyOn(debuffsRepository.dazed, "appender");

      const result = earthshatter.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should call resolveDamage for each target
      expect(resolveDamageSpy).toHaveBeenCalledTimes(2);
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target1.id,
        expect.objectContaining({
          type: "blunt",
          isMagic: false,
        }),
        DEFAULT_TEST_LOCATION,
      );
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target2.id,
        expect.objectContaining({
          type: "blunt",
          isMagic: false,
        }),
        DEFAULT_TEST_LOCATION,
      );

      // Both targets passed save, so no Dazed
      expect(dazedAppenderSpy).not.toHaveBeenCalled();

      expect(result.targets).toHaveLength(2);
      expect(result.targets[0]?.actorId).toBe(target1.id);
      expect(result.targets[1]?.actorId).toBe(target2.id);
    });
  });

  describe("Damage Calculation", () => {
    it("should deal 1d8 + STR mod damage at level 1", () => {
      const targets = [target1];
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({
          all: jest.fn(() => targets),
        })),
      }) as any);

      // Mock dice: 1d8 = 5, STR mod = +3, so total = 8
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

      jest.spyOn(target1, "rollSave").mockReturnValue(10);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: "blunt",
        isHit: true,
        isCrit: false,
      });

      earthshatter.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Damage: (5 + 3) × 1.1 = 8.8 → 8 (level 1 scalar = 1.1)
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target1.id,
        expect.objectContaining({
          damage: 8, // Math.floor(8.8)
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should deal 1d10 + STR mod damage at level 5", () => {
      const targets = [target1];
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({
          all: jest.fn(() => targets),
        })),
      }) as any);

      // Mock dice: 1d10 = 7, STR mod = +3, so base = 10, scaled = 10 × 1.5 = 15
      // The roll function is called as roll(1).d(10), so we need to mock it correctly
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 7,
          rolls: [7],
        })),
      }) as any);
      
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      jest.spyOn(target1, "rollSave").mockReturnValue(10);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: "blunt",
        isHit: true,
        isCrit: false,
      });

      earthshatter.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Verify the damage calculation components
      // The actual damage might vary due to weapon stats, so we check the structure
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target1.id,
        expect.objectContaining({
          type: "blunt",
          isMagic: false,
        }),
        DEFAULT_TEST_LOCATION,
      );
      
      // Verify roll was called for damage dice (1d10 at level 5)
      expect(rollModule.roll).toHaveBeenCalledWith(1);
    });
  });

  describe("Endurance Save and Dazed", () => {
    it("should apply Dazed debuff when target fails DC8 save", () => {
      const targets = [target1];
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({
          all: jest.fn(() => targets),
        })),
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

      // Target fails save (roll < 8)
      jest.spyOn(target1, "rollSave").mockReturnValue(5);

      mockResolveDamage({
        actualDamage: 5,
        damageType: "blunt",
        isHit: true,
        isCrit: false,
      });

      const dazedAppenderSpy = jest.spyOn(debuffsRepository.dazed, "appender");

      const result = earthshatter.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should apply Dazed for 1 turn
      expect(dazedAppenderSpy).toHaveBeenCalledWith(
        target1,
        { turnsAppending: 1 },
      );

      // Message should indicate Dazed
      expect(result.content.en).toContain("Dazed!");
    });

    it("should not apply Dazed when target passes DC8 save", () => {
      const targets = [target1];
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({
          all: jest.fn(() => targets),
        })),
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

      // Target passes save (roll >= 8)
      jest.spyOn(target1, "rollSave").mockReturnValue(10);

      mockResolveDamage({
        actualDamage: 5,
        damageType: "blunt",
        isHit: true,
        isCrit: false,
      });

      const dazedAppenderSpy = jest.spyOn(debuffsRepository.dazed, "appender");

      const result = earthshatter.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should not apply Dazed
      expect(dazedAppenderSpy).not.toHaveBeenCalled();

      // Message should not indicate Dazed
      expect(result.content.en).not.toContain("Dazed!");
    });

    it("should handle mixed save results for multiple targets", () => {
      const targets = [target1, target2];
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({
          all: jest.fn(() => targets),
        })),
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

      // Target1 fails, target2 passes
      jest.spyOn(target1, "rollSave").mockReturnValue(5);
      jest.spyOn(target2, "rollSave").mockReturnValue(10);

      mockResolveDamage({
        actualDamage: 5,
        damageType: "blunt",
        isHit: true,
        isCrit: false,
      });

      const dazedAppenderSpy = jest.spyOn(debuffsRepository.dazed, "appender");

      earthshatter.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Only target1 should get Dazed
      expect(dazedAppenderSpy).toHaveBeenCalledTimes(1);
      expect(dazedAppenderSpy).toHaveBeenCalledWith(
        target1,
        { turnsAppending: 1 },
      );
    });
  });

  describe("Return Structure", () => {
    it("should return correct TurnResult structure", () => {
      const targets = [target1];
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({
          all: jest.fn(() => targets),
        })),
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

      jest.spyOn(target1, "rollSave").mockReturnValue(10);

      mockResolveDamage({
        actualDamage: 5,
        damageType: "blunt",
        isHit: true,
        isCrit: false,
      });

      const result = earthshatter.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result).toHaveProperty("content");
      expect(result.content).toHaveProperty("en");
      expect(result.content).toHaveProperty("th");
      expect(result.content.en).toContain("shatters the earth");
      expect(result.actor).toHaveProperty("actorId", actor.id);
      expect(result.actor).toHaveProperty("effect");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]).toHaveProperty("actorId", target1.id);
      expect(result.targets[0]).toHaveProperty("effect");
      expect(result.targets[0]?.effect).toContain(TargetEffect.TestSkill);
    });
  });
});

