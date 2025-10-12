import { CharacterRoleEnum } from "./enum";
import { Role } from "./Role";

const role_test = new Role(
  CharacterRoleEnum.Tester,
  (char) => {
    char.title.role = CharacterRoleEnum.Tester;
    char.attribute.mutateBase("agility", 1);
  },
  (char) => {
    char.title.role = undefined;
    char.attribute.mutateBase("agility", -1);
  },
);

const role_testCombo = new Role(
  CharacterRoleEnum.TesterCombo,
  (char) => {
    char.title.role = CharacterRoleEnum.TesterCombo;
    char.attribute.mutateBase("agility", 1);
  },
  (char) => {
    char.title.role = undefined;
    char.attribute.mutateBase("agility", -1);
  },
);

const role_fighter = new Role(
  CharacterRoleEnum.Fighter,
);

const role_cleric = new Role(
  CharacterRoleEnum.Cleric,
);

const role_rogue = new Role(
  CharacterRoleEnum.Rogue,
);

const role_mage = new Role(
  CharacterRoleEnum.Mage,
);

export const roleRepository: Map<CharacterRoleEnum, Role> = new Map([
  [CharacterRoleEnum.Tester, role_test],
  [CharacterRoleEnum.TesterCombo, role_testCombo],
  [CharacterRoleEnum.Fighter, role_fighter],
  [CharacterRoleEnum.Cleric, role_cleric],
  [CharacterRoleEnum.Rogue, role_rogue],
  [CharacterRoleEnum.Mage, role_mage],
]);
