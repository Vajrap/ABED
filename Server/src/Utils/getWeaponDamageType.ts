import { ProficiencyKey } from "src/InterFacesEnumsAndTypes/Enums";

export function getWeaponDamageType(
  weaponType: ProficiencyKey,
): "physical" | "magical" {
  const magicItems: ProficiencyKey[] = ["magicWand", "orb", "tome"];
  if (magicItems.includes(weaponType)) {
    return "magical";
  } else {
    return "physical";
  }
}
