import { ProficiencyKey } from "src/InterFacesEnumsAndTypes/Enums";

export function getWeaponDamageType(
  weaponType: ProficiencyKey,
): "physical" | "magical" {
  const magicItems: ProficiencyKey[] = ["wand", "orb", "book"];
  if (magicItems.includes(weaponType)) {
    return "magical";
  } else {
    return "physical";
  }
}
