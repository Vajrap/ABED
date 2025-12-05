import { CharacterRoleEnum } from "./enum";
import { Role } from "./Role";

const role_none = new Role(
  CharacterRoleEnum.None,
    {en: "None", th: "None"},
);

const role_fighter = new Role(
  CharacterRoleEnum.Fighter,
    {en: "test", th: "test"},
);

const role_cleric = new Role(
  CharacterRoleEnum.Cleric,
    {en: "test", th: "test"},
);

const role_rogue = new Role(
  CharacterRoleEnum.Rogue,
    {en: "test", th: "test"},
);

const role_mage = new Role(
  CharacterRoleEnum.Mage,
    {en: "test", th: "test"},
);

export const roleRepository: Map<CharacterRoleEnum, Role> = new Map([
  [CharacterRoleEnum.None, role_none],
  [CharacterRoleEnum.Fighter, role_fighter],
  [CharacterRoleEnum.Cleric, role_cleric],
  [CharacterRoleEnum.Rogue, role_rogue],
  [CharacterRoleEnum.Mage, role_mage],
]);
