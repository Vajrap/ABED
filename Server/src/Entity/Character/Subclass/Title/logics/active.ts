import type { Character } from "../../../Character";
import type { TitleCombination } from "../Combination/Combination";
import { titleCombination } from "../Combination/repository";
import type { CharacterEpithetEnum } from "../Epithet/enum";
import { epithetRepository } from "../Epithet/repository";
import type { CharacterRoleEnum } from "../Role/enum";
import { roleRepository } from "../Role/repository";
import { combineKey } from "../Combination/combineKey";
import Report from "src/Utils/Reporter";


type PartKind = "role" | "epithet";

function getCombo(char: Character): TitleCombination | null {
  const e = char.title.epithet;
  const r = char.title.role;
  if (!r || !e) return null;
  Report.debug(`NEXT: ${combineKey(e, r)}`);
  return titleCombination.get(combineKey(e, r)) ?? null;
}

function swapPart<K extends PartKind>(
  char: Character,
  kind: K,
  nextId: K extends "role"
    ? CharacterRoleEnum | undefined
    : CharacterEpithetEnum | undefined,
): void {
  // quick accessors so the logic is shared
  const getCurrent = () =>
    (kind === "role" ? char.title.role : char.title.epithet) as any;
  const setCurrent = (id: any) => {
    if (kind === "role") char.title.role = id as CharacterRoleEnum | undefined;
    else char.title.epithet = id as CharacterEpithetEnum | undefined;
  };
  const repoGet = (id: any) =>
    kind === "role"
      ? roleRepository.get(id as CharacterRoleEnum)
      : epithetRepository.get(id as CharacterEpithetEnum);

  const currentId = getCurrent();

  // no-op if identical
  if (currentId === nextId) return;

  // 1) synergy OFF (if both parts currently set)
  const prevCombo = getCombo(char);
  if (prevCombo) prevCombo.deactivate(char);

  // 2) turn OFF the old part if it exists
  if (currentId) repoGet(currentId)?.deactivate(char);

  // 3) write new id
  setCurrent(nextId);

  // 4) turn ON the new part if provided
  if (nextId) repoGet(nextId)?.active(char);

  // 5) synergy ON (if now both parts set)
  const nextCombo = getCombo(char);
  Report.debug(`NEXT: ${nextCombo}`);
  if (nextCombo) nextCombo.active(char);
}

// Thin, readable API
export function activeRole(char: Character, role: CharacterRoleEnum): void {
  swapPart(char, "role", role);
}
export function deactiveRole(char: Character): void {
  swapPart(char, "role", undefined);
}
export function activeEpithet(
  char: Character,
  epithet: CharacterEpithetEnum,
): void {
  swapPart(char, "epithet", epithet);
}
export function deactiveEpithet(char: Character): void {
  swapPart(char, "epithet", undefined);
}
