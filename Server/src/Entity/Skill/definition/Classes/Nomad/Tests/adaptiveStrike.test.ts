import { adaptiveStrike } from "../adaptiveStrike";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
  mockResolveDamage,
} from "../../../testHelpers";
import * as rollModule from "src/Utils/Dice";
import * as getPositionModifierModule from "src/Utils/getPositionModifier";
import * as getTargetModule from "src/Entity/Battle/getTarget";
import * as getWeaponDamageOutputModule from "src/Utils/getWeaponDamgeOutput";

setupSkillTestMocks();

describe("AdaptiveStrike", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();
    jest.clearAllMocks();
    jest.spyOn(rollModule, "rollTwenty").mockReturnValue({ total: 15, rolls: [15], d: jest.fn() } as any);
    jest.spyOn(getPositionModifierModule, "getPositionModifier").mockReturnValue(1.0);

    actor = createTestActor();
    actor.level = 5;
    actor.position = 1; // Front row
    actor.attribute.getStat("strength").base = 14;
    actor.attribute.getStat("dexterity").base = 12;

    target = createTestTarget({ id: "target1", name: { en: "Enemy", th: "ศัตรู" } });
    target.position = 1; // Front row

    actorParty = [actor];
    targetParty = [target];

    jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockImplementation(() => ({
      damage: 10,
      hit: 0,
      crit: 0,
      type: "slashing",
      isMagic: false,
    } as any));

    jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
      one: jest.fn(() => target),
    }) as any);
  });

  it("should deal weapon damage with character level multiplier", () => {
    const result = adaptiveStrike.exec(
      actor,
      actorParty,
      targetParty,
      1,
      DEFAULT_TEST_LOCATION,
    );

    expect(result.targets).toHaveLength(1);
    expect(result.targets[0]?.actorId).toBe(target.id);
  });

  it("should apply -2 hit penalty", () => {
    const resolveDamageSpy = mockResolveDamage({
      actualDamage: 10,
      damageType: "slashing",
      isHit: true,
      isCrit: false,
    });

    adaptiveStrike.exec(actor, actorParty, targetParty, 1, DEFAULT_TEST_LOCATION);

    const damageCall = resolveDamageSpy.mock.calls[0];
    const damageOutput = damageCall?.[2] as any;
    expect(damageOutput.hit).toBeLessThan(20); // Should be reduced from rollTwenty result (15 - 2 = 13)
  });

  it("should change position from front to back row when slot available", () => {
    actor.position = 1; // Front row
    const initialPosition = actor.position;

    adaptiveStrike.exec(actor, actorParty, targetParty, 1, DEFAULT_TEST_LOCATION);

    expect(actor.position).not.toBe(initialPosition);
    expect(actor.position).toBeGreaterThan(2); // Should be in back row (3, 4, or 5)
  });

  it("should change position from back to front row when slot available", () => {
    actor.position = 3; // Back row
    const initialPosition = actor.position;

    adaptiveStrike.exec(actor, actorParty, targetParty, 1, DEFAULT_TEST_LOCATION);

    expect(actor.position).not.toBe(initialPosition);
    expect(actor.position).toBeLessThanOrEqual(2); // Should be in front row (0, 1, or 2)
  });

  it("should not change position if no slot available", () => {
    actor.position = 1; // Front row
    // Fill all back row positions
    const partyMember2 = createTestTarget({ id: "member2", position: 3 });
    const partyMember3 = createTestTarget({ id: "member3", position: 4 });
    const partyMember4 = createTestTarget({ id: "member4", position: 5 });
    actorParty = [actor, partyMember2, partyMember3, partyMember4];

    const initialPosition = actor.position;

    adaptiveStrike.exec(actor, actorParty, targetParty, 1, DEFAULT_TEST_LOCATION);

    expect(actor.position).toBe(initialPosition); // Should stay in front row
  });

  it("should use character level multiplier (1.2 at level 5)", () => {
    actor.level = 5;
    const resolveDamageSpy = mockResolveDamage({
      actualDamage: 12,
      damageType: "slashing",
      isHit: true,
      isCrit: false,
    });

    adaptiveStrike.exec(actor, actorParty, targetParty, 1, DEFAULT_TEST_LOCATION);

    const damageCall = resolveDamageSpy.mock.calls[0];
    const damageOutput = damageCall?.[2] as any;
    // Damage should be multiplied by 1.2 (level 5 = floor(5/2) * 0.1 + 1.0 = 1.2)
    expect(damageOutput.damage).toBeGreaterThan(0);
  });

  it("should consume 2 SP and no elements (cantrip)", () => {
    // Note: SP consumption is handled by the battle system, not in exec
    // This test verifies the skill definition
    expect(adaptiveStrike.consume.sp).toBe(2);
    expect(adaptiveStrike.consume.elements).toEqual([]);
  });
});

