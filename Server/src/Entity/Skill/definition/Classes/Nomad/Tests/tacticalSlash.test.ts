import { tacticalSlash } from "../tacticalSlash";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
  mockResolveDamage,
} from "../../../testHelpers";
import { debuffsRepository, buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import * as getTargetModule from "src/Entity/Battle/getTarget";
import * as getWeaponDamageOutputModule from "src/Utils/getWeaponDamgeOutput";
import * as rollModule from "src/Utils/Dice";
import * as getPositionModifierModule from "src/Utils/getPositionModifier";

setupSkillTestMocks();

describe("TacticalSlash", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();
    jest.clearAllMocks();
    jest.spyOn(rollModule, "rollTwenty").mockReturnValue({ total: 15, rolls: [15], d: jest.fn() } as any);
    jest.spyOn(rollModule, "roll").mockImplementation(() => ({ d: jest.fn(() => ({ total: 2 })) }) as any);
    jest.spyOn(getPositionModifierModule, "getPositionModifier").mockReturnValue(1.0);

    actor = createTestActor();
    actor.level = 5;
    actor.position = 1; // Front row
    actor.attribute.getStat("strength").base = 14;
    actor.attribute.getStat("planar").base = 12;

    target = createTestTarget({ id: "target1", name: { en: "Enemy", th: "ศัตรู" } });
    target.position = 1; // Front row
    target.rollSave = jest.fn(() => 8); // Fail save

    actorParty = [actor];
    targetParty = [target];

    jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockImplementation(() => ({
      damage: 10,
      hit: 0,
      crit: 0,
      type: "slashing",
      isMagic: false,
    } as any));
  });

  describe("Front row (fire attack)", () => {
    beforeEach(() => {
      actor.position = 1; // Front row
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);
    });

    it("should deal fire damage with weapon + attribute + 1d4 × skillLevelMultiplier", () => {
      mockResolveDamage({
        actualDamage: 15,
        damageType: "fire",
        isHit: true,
        isCrit: false,
      });

      tacticalSlash.exec(actor, actorParty, targetParty, 1, DEFAULT_TEST_LOCATION);

      const { resolveDamage } = require("src/Entity/Battle/damageResolution");
      const damageCall = resolveDamage.mock.calls[0];
      const damageOutput = damageCall[2];
      expect(damageOutput.type).toBe("fire");
      expect(damageOutput.isMagic).toBe(true);
      expect(damageOutput.damage).toBeGreaterThan(0);
    });

    it("should apply burn debuff if target fails endurance save", () => {
      const burnAppenderSpy = jest.spyOn(debuffsRepository.burn, "appender");
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({ d: jest.fn(() => ({ total: 2 })) }) as any); // 1d3 = 2
      mockResolveDamage({
        actualDamage: 15,
        damageType: "fire",
        isHit: true,
        isCrit: false,
      });

      tacticalSlash.exec(actor, actorParty, targetParty, 1, DEFAULT_TEST_LOCATION);

      expect(target.rollSave).toHaveBeenCalledWith("endurance");
      expect(burnAppenderSpy).toHaveBeenCalledWith(target, { turnsAppending: 2 });
    });

    it("should use DC12 at level 5", () => {
      const burnAppenderSpy = jest.spyOn(debuffsRepository.burn, "appender");
      target.rollSave = jest.fn(() => 11); // Just below DC12
      mockResolveDamage({
        actualDamage: 15,
        damageType: "fire",
        isHit: true,
        isCrit: false,
      });

      tacticalSlash.exec(actor, actorParty, targetParty, 5, DEFAULT_TEST_LOCATION);

      expect(burnAppenderSpy).toHaveBeenCalled();
    });

    it("should not apply burn if target passes save", () => {
      const burnAppenderSpy = jest.spyOn(debuffsRepository.burn, "appender");
      target.rollSave = jest.fn(() => 15); // Pass save
      mockResolveDamage({
        actualDamage: 15,
        damageType: "fire",
        isHit: true,
        isCrit: false,
      });

      tacticalSlash.exec(actor, actorParty, targetParty, 1, DEFAULT_TEST_LOCATION);

      expect(burnAppenderSpy).not.toHaveBeenCalled();
    });

    it("should consume 3 SP and 1 fire element", () => {
      expect(tacticalSlash.consume.sp).toBe(3);
      expect(tacticalSlash.consume.elements).toEqual([{ element: "fire", value: 1 }]);
    });
  });

  describe("Back row (retreat buff)", () => {
    beforeEach(() => {
      actor.position = 3; // Back row
    });

    it("should apply retreat buff when in back row", () => {
      const retreatAppenderSpy = jest.spyOn(buffsAndDebuffsRepository.retreat, "appender");

      tacticalSlash.exec(actor, actorParty, targetParty, 1, DEFAULT_TEST_LOCATION);

      expect(retreatAppenderSpy).toHaveBeenCalledWith(actor, { turnsAppending: 1 });
    });

    it("should not require a target when in back row", () => {
      targetParty = [];

      const result = tacticalSlash.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.targets).toHaveLength(0);
      expect(result.content.en).toContain("tactical stance");
    });
  });

  it("should require dagger or blade equipment", () => {
    expect(tacticalSlash.equipmentNeeded).toContain("dagger");
    expect(tacticalSlash.equipmentNeeded).toContain("blade");
  });
});
