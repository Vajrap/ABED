/**
 * Burning Hand Skill Tests
 * 
 * Tests for the Burning Hand skill's exec() function, derived from description and formula:
 * - "engulfing all enemies in the front row"
 * - "Deal <FORMULA> fire damage" -> (Dice + PlanarMod) * Multiplier
 * - "target must roll DC10 + <PlanarMod> ENDsave or get <DebuffBurn>"
 * - Burn Stacks: 1-2 (Level < 5), 2-3 (Level >= 5)
 * - Level 5: "May also strike one additional target from another row"
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { burningHand } from "../burningHand";
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
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

// Setup mocks
setupSkillTestMocks();

describe("Burning Hand Skill", () => {
  let actor: any;
  let target1: any;
  let target2: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set Planar to 14 (+2 mod)
    actor.attribute.getStat("planar").base = 14;

    target1 = createTestTarget({ id: "target-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });
    target2 = createTestTarget({ id: "target-2", name: { en: "Enemy 2", th: "ศัตรู 2" } });

    actorParty = [actor];
    targetParty = [target1, target2];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Targeting", () => {
    it("should target all front row enemies", () => {
      const allSpy = jest.fn(() => [target1]);
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({
          all: allSpy,
        })),
      }) as any);

      burningHand.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(allSpy).toHaveBeenCalled();
    });

    it("should target additional enemy from another row at level 5", () => {
      const frontTargets = [target1];
      const backTargets = [target2];

      // Mock getTarget chain
      // First call: frontFirst().all() -> returns target1
      // Second call (inside exec for lvl 5): except(targets).one() -> returns target2
      const getTargetMock = jest.spyOn(getTargetModule, "getTarget") as any;
      
      getTargetMock.mockImplementation((actor, allies, enemies, type) => {
        return {
          from: () => ({
            all: () => frontTargets,
          }),
          except: () => ({
            one: () => target2,
          }),
        };
      });

      const result = burningHand.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.targets).toHaveLength(2);
      expect(result.targets.map(t => t.actorId)).toContain(target1.id);
      expect(result.targets.map(t => t.actorId)).toContain(target2.id);
    });
  });

  describe("Damage and Burn Application", () => {
    it("should deal damage and apply burn on failed save (Level 1)", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({
          all: jest.fn(() => [target1]),
        })),
      }) as any);

      // Mock dice: 1d6 = 4
      // Mock burn stacks: 1d2 = 2
      const rollMock = jest.spyOn(rollModule, "roll") as any;
      rollMock
        .mockReturnValueOnce({ d: jest.fn(() => ({ total: 4, rolls: [4] })) }) // Damage
        .mockReturnValueOnce({ d: jest.fn(() => ({ total: 2, rolls: [2] })) }); // Burn Stacks

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.fire,
        isHit: true,
        isCrit: false,
      });

      // Mock failed save (Roll < DC)
      // DC = 10 + Planar(2) = 12
      jest.spyOn(target1, "rollSave").mockReturnValue(5);

      const burnAppenderSpy = jest.spyOn(buffsAndDebuffsRepository.burn, "appender");

      burningHand.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Damage: (4 + 2) * 1.1 = 6.6 -> 6
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target1.id,
        expect.objectContaining({
          damage: 6,
          type: DamageType.fire,
        }),
        DEFAULT_TEST_LOCATION,
      );

      // Burn: 2 stacks
      expect(burnAppenderSpy).toHaveBeenCalledWith(
        target1,
        { turnsAppending: 2 }
      );
    });

    it("should apply enhanced burn stacks at level 5", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({
          all: jest.fn(() => [target1]),
        })),
        except: jest.fn(() => ({ one: jest.fn(() => null) })),
      }) as any);

      // Mock dice: 1d8 = 5 (Level 5 damage dice)
      // Mock burn stacks: 1d3 = 3 (Level 5 burn dice)
      const rollMock = jest.spyOn(rollModule, "roll") as any;
      rollMock
        .mockReturnValueOnce({ d: jest.fn(() => ({ total: 5, rolls: [5] })) }) // Damage
        .mockReturnValueOnce({ d: jest.fn(() => ({ total: 3, rolls: [3] })) }); // Burn Stacks

      mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.fire,
        isHit: true,
        isCrit: false,
      });

      // Mock failed save
      jest.spyOn(target1, "rollSave").mockReturnValue(5);

      const burnAppenderSpy = jest.spyOn(buffsAndDebuffsRepository.burn, "appender");

      burningHand.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Burn: 3 stacks
      expect(burnAppenderSpy).toHaveBeenCalledWith(
        target1,
        { turnsAppending: 3 }
      );
    });
  });
});
