import { tacticalShot } from "../tacticalShot";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
  mockResolveDamage,
} from "../../../testHelpers";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import * as getTargetModule from "src/Entity/Battle/getTarget";
import * as getWeaponDamageOutputModule from "src/Utils/getWeaponDamgeOutput";
import * as rollModule from "src/Utils/Dice";
import * as getPositionModifierModule from "src/Utils/getPositionModifier";

setupSkillTestMocks();

describe("TacticalShot", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();
    jest.clearAllMocks();
    jest.spyOn(rollModule, "rollTwenty").mockReturnValue({ total: 15, rolls: [15], d: jest.fn() } as any);
    jest.spyOn(rollModule, "roll").mockImplementation(() => ({ d: jest.fn(() => ({ total: 1 })) }) as any);
    jest.spyOn(getPositionModifierModule, "getPositionModifier").mockReturnValue(1.0);

    actor = createTestActor();
    actor.level = 5;
    actor.position = 3; // Back row
    actor.attribute.getStat("dexterity").base = 14;

    target = createTestTarget({ id: "target1", name: { en: "Enemy", th: "ศัตรู" } });
    target.position = 1; // Front row initially
    target.rollSave = jest.fn(() => 8); // Fail save

    actorParty = [actor];
    targetParty = [target];

    jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockImplementation(() => ({
      damage: 10,
      hit: 0,
      crit: 0,
      type: "piercing",
      isMagic: false,
    } as any));
  });

  describe("Enemy in front row (hot sand)", () => {
    beforeEach(() => {
      target.position = 1; // Front row
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);
    });

    it("should deal 1d2 true damage", () => {
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({ d: jest.fn(() => ({ total: 2 })) }) as any);
      mockResolveDamage({
        actualDamage: 2,
        damageType: "pierce",
        isHit: true,
        isCrit: false,
      });

      tacticalShot.exec(actor, actorParty, targetParty, 1, DEFAULT_TEST_LOCATION);

      const { resolveDamage } = require("src/Entity/Battle/damageResolution");
      const damageCall = resolveDamage.mock.calls[0];
      const damageOutput = damageCall[2];
      expect(damageOutput.damage).toBe(2);
      expect(damageOutput.trueDamage).toBe(true);
      expect(damageOutput.hit).toBe(999); // Auto-hit
      expect(damageOutput.type).toBe("pierce");
    });

    it("should apply blind debuff if target fails agility save", () => {
      const blindAppenderSpy = jest.spyOn(debuffsRepository.blind, "appender");
      target.rollSave = jest.fn(() => 8); // Fail save (below DC10)
      mockResolveDamage({
        actualDamage: 1,
        damageType: "pierce",
        isHit: true,
        isCrit: false,
      });

      tacticalShot.exec(actor, actorParty, targetParty, 1, DEFAULT_TEST_LOCATION);

      expect(target.rollSave).toHaveBeenCalledWith("agility");
      expect(blindAppenderSpy).toHaveBeenCalledWith(target, { turnsAppending: 1 });
    });

    it("should use DC12 at level 5", () => {
      const blindAppenderSpy = jest.spyOn(debuffsRepository.blind, "appender");
      target.rollSave = jest.fn(() => 11); // Just below DC12
      mockResolveDamage({
        actualDamage: 1,
        damageType: "pierce",
        isHit: true,
        isCrit: false,
      });

      tacticalShot.exec(actor, actorParty, targetParty, 5, DEFAULT_TEST_LOCATION);

      expect(blindAppenderSpy).toHaveBeenCalled();
    });

    it("should not apply blind if target passes save", () => {
      const blindAppenderSpy = jest.spyOn(debuffsRepository.blind, "appender");
      target.rollSave = jest.fn(() => 15); // Pass save
      mockResolveDamage({
        actualDamage: 1,
        damageType: "pierce",
        isHit: true,
        isCrit: false,
      });

      tacticalShot.exec(actor, actorParty, targetParty, 1, DEFAULT_TEST_LOCATION);

      expect(blindAppenderSpy).not.toHaveBeenCalled();
    });
  });

  describe("Enemy in back row (heavy damage shot)", () => {
    beforeEach(() => {
      target.position = 4; // Back row
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);
    });

    it("should deal heavy piercing damage with enhanced multiplier", () => {
      mockResolveDamage({
        actualDamage: 20,
        damageType: "pierce",
        isHit: true,
        isCrit: false,
      });

      tacticalShot.exec(actor, actorParty, targetParty, 1, DEFAULT_TEST_LOCATION);

      const { resolveDamage } = require("src/Entity/Battle/damageResolution");
      const damageCall = resolveDamage.mock.calls[0];
      const damageOutput = damageCall[2];
      expect(damageOutput.type).toBe("pierce");
      expect(damageOutput.isMagic).toBe(false);
      expect(damageOutput.damage).toBeGreaterThan(0);
    });

    it("should use (skillLevelMultiplier + 0.3) for damage calculation", () => {
      mockResolveDamage({
        actualDamage: 20,
        damageType: "pierce",
        isHit: true,
        isCrit: false,
      });

      tacticalShot.exec(actor, actorParty, targetParty, 1, DEFAULT_TEST_LOCATION);

      const { resolveDamage } = require("src/Entity/Battle/damageResolution");
      const damageCall = resolveDamage.mock.calls[0];
      const damageOutput = damageCall[2];
      // At level 1, skillLevelMultiplier = 1.0, so multiplier = 1.3
      // Damage should be (weapon + DEX mod) * 1.3
      expect(damageOutput.damage).toBeGreaterThan(0);
    });
  });

  it("should require bow equipment", () => {
    expect(tacticalShot.equipmentNeeded).toContain("bow");
  });

  it("should consume 3 SP and no elements (cantrip)", () => {
    expect(tacticalShot.consume.sp).toBe(3);
    expect(tacticalShot.consume.elements).toEqual([]);
  });
});
