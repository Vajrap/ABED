import type { CharacterEpithetEnum } from "../Epithet/enum";
import type { CharacterRoleEnum } from "../Role/enum";

export type ComboKey = `${CharacterEpithetEnum}::${CharacterRoleEnum}`;

export function combineKey(
  epithet: CharacterEpithetEnum,
  role: CharacterRoleEnum,
): ComboKey {
  return `${role}::${epithet}` as ComboKey;
}
