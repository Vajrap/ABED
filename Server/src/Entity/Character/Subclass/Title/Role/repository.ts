import { CharacterRoleEnum } from "./enum";
import { Role } from "./Role";

const role_test = new Role(
  CharacterRoleEnum.Tester,
  "Tester",
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
  "Tester",
  (char) => {
    char.title.role = CharacterRoleEnum.TesterCombo;
    char.attribute.mutateBase("agility", 1);
  },
  (char) => {
    char.title.role = undefined;
    char.attribute.mutateBase("agility", -1);
  },
);

export const roleRepository: Map<CharacterRoleEnum, Role> = new Map([
  [CharacterRoleEnum.Tester, role_test],
  [CharacterRoleEnum.TesterCombo, role_testCombo],
]);
