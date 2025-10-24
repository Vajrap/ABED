import { Weapon, WeaponPosition } from "src/Entity/Item";

export function getPositionModifier(
  actorPosition: number,
  targetPosition: number,
  weapon: Weapon,
): number {
  const actorFront = actorPosition <= 2;
  const targetFront = targetPosition <= 2;

  switch (weapon.preferredPosition) {
    case WeaponPosition.Melee:
      if (actorFront && targetFront) return 1;
      if (actorFront || targetFront) return 0.7;
      return 0.4;

    case WeaponPosition.Ranged:
      if (!actorFront && !targetFront) return 1;
      if (actorFront && targetFront) return 0.7;
      return 0.4;

    case WeaponPosition.Versatile:
      if (actorFront && !targetFront) return 1;
      if (!actorFront && targetFront) return 1;
      return 0.7;
  }
}
