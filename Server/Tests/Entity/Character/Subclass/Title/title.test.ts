import { expect, describe, it } from "@jest/globals";
import { CharacterFactory } from "../../../../Helper/Character";
import {
  activeEpithet,
  activeRole,
  deactiveEpithet,
  deactiveRole,
} from "../../../../../src/Entity/Character/Subclass/Title/logics/active";
import { CharacterRoleEnum } from "../../../../../src/Entity/Character/Subclass/Title/Role/enum";
import { CharacterEpithetEnum } from "../../../../../src/Entity/Character/Subclass/Title/Epithet/enum";

describe("test title", () => {
  it("should add role and add +1 to agi, then remove role and -1 to agi", () => {
    const char = CharacterFactory.create().build();
    activeRole(char, CharacterRoleEnum.Tester);
    expect(char.title.role).toBe(CharacterRoleEnum.Tester);
    expect(char.attribute.getStat("agility").total).toBe(7);

    deactiveRole(char);
    expect(char.title.role).toBeUndefined();
    expect(char.attribute.getStat("agility").total).toBe(6);
  });

  it("should add epithet and add +1 to agi, then remove epithet and -1 to agi", () => {
    const char = CharacterFactory.create().build();
    activeEpithet(char, CharacterEpithetEnum.Testing);
    expect(char.title.epithet).toBe(CharacterEpithetEnum.Testing);
    expect(char.attribute.getStat("agility").total).toBe(7);

    deactiveEpithet(char);
    expect(char.title.epithet).toBeUndefined();
    expect(char.attribute.getStat("agility").total).toBe(6);
  });

  it("should add epithet and role then add +2 to agi, then also add +1 to strength from the combination", () => {
    const char = CharacterFactory.create().build();
    activeRole(char, CharacterRoleEnum.TesterCombo);
    expect(char.title.role).toBe(CharacterRoleEnum.TesterCombo);
    expect(char.title.epithet).toBeUndefined();
    expect(char.attribute.getStat("agility").total).toBe(7);
    expect(char.attribute.getStat("strength").total).toBe(6);

    activeEpithet(char, CharacterEpithetEnum.TestingCombo);
    expect(char.title.role).toBe(CharacterRoleEnum.TesterCombo);
    expect(char.title.epithet).toBe(CharacterEpithetEnum.TestingCombo);
    expect(char.attribute.getStat("agility").total).toBe(8);
    expect(char.attribute.getStat("strength").total).toBe(7);

    deactiveRole(char);
    expect(char.title.role).toBeUndefined();
    expect(char.title.epithet).toBe(CharacterEpithetEnum.TestingCombo);
    expect(char.attribute.getStat("agility").total).toBe(7);
    expect(char.attribute.getStat("strength").total).toBe(6);

    deactiveEpithet(char);
    expect(char.title.role).toBeUndefined();
    expect(char.title.epithet).toBeUndefined();
    expect(char.attribute.getStat("agility").total).toBe(6);
    expect(char.attribute.getStat("strength").total).toBe(6);
  });

  it("re-applying the same role/epithet is a no-op", () => {
    const char = CharacterFactory.create().build();
    activeRole(char, CharacterRoleEnum.Tester);
    activeRole(char, CharacterRoleEnum.Tester); // same again
    expect(char.attribute.getStat("agility").total).toBe(7);

    activeEpithet(char, CharacterEpithetEnum.Testing);
    activeEpithet(char, CharacterEpithetEnum.Testing); // same again
    expect(char.attribute.getStat("agility").total).toBe(8);
  });

  it("switching role with same epithet turns old synergy off and new on (if any)", () => {
    const char = CharacterFactory.create().build();
    activeEpithet(char, CharacterEpithetEnum.TestingCombo);
    activeRole(char, CharacterRoleEnum.TesterCombo); // synergy on (+1 str)
    expect(char.attribute.getStat("strength").total).toBe(7);

    activeRole(char, CharacterRoleEnum.Tester); // different role, no combo
    expect(char.attribute.getStat("strength").total).toBe(6);
    expect(char.attribute.getStat("agility").total).toBe(8); // Tester(1) + TestingCombo(1)
  });

  it("deactivating epithet keeps role bonus but removes combo effect", () => {
    const char = CharacterFactory.create().build();
    activeRole(char, CharacterRoleEnum.TesterCombo);
    activeEpithet(char, CharacterEpithetEnum.TestingCombo); // synergy +1 str
    deactiveEpithet(char);
    expect(char.title.role).toBe(CharacterRoleEnum.TesterCombo);
    expect(char.title.epithet).toBeUndefined();
    expect(char.attribute.getStat("agility").total).toBe(7);
    expect(char.attribute.getStat("strength").total).toBe(6); // synergy cleared
  });

  it("effects never write to title fields (engine is source of truth)", () => {
    const char = CharacterFactory.create().build();
    activeRole(char, CharacterRoleEnum.Tester);
    expect(char.title.role).toBe(CharacterRoleEnum.Tester);
    expect(char.title.epithet).toBeUndefined();
  });

  it("non-matching pair does not trigger synergy", () => {
    const char = CharacterFactory.create().build();
    activeRole(char, CharacterRoleEnum.TesterCombo);
    activeEpithet(char, CharacterEpithetEnum.Testing); // not *TestingCombo*
    expect(char.attribute.getStat("strength").total).toBe(6);
  });

  it("deactivating role first in a combo clears synergy before stat revert", () => {
    const char = CharacterFactory.create().build();
    activeRole(char, CharacterRoleEnum.TesterCombo);
    activeEpithet(char, CharacterEpithetEnum.TestingCombo); // agi=2, str=1
    deactiveRole(char);
    expect(char.attribute.getStat("agility").total).toBe(7); // epithet remains
    expect(char.attribute.getStat("strength").total).toBe(6); // synergy cleared
  });
});
