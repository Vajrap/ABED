import type { Weapon } from "./Weapon";
import type { WeaponId } from "./type";
import { bareHandRepository } from "./BareHand/repository";
import { swordRepository } from "./Sword/repository";
import { bladeRepository } from "./Blade/repository";
import { daggerRepository } from "./Dagger/repository";
import { axeRepository } from "./Axe/repository";
import { spearRepository } from "./Spear/repository";
import { hammerRepository } from "./Hammer/repository";
import { bowRepository } from "./Bow/repository";
import { shieldRepository } from "./Shield/repository";
import { staffRepository } from "./Staff/repository";
import { wandRepository } from "./Wand/repository";
import { tomeRepository } from "./Tome/repository";
import { orbRepository } from "./Orb/repository";

/**
 * Weapon Repository
 * Central Map for fast runtime lookup: WeaponId -> Weapon instance
 * Combines all weapon type repositories
 */
export const weaponRepository: Record<WeaponId, Weapon> = {
  ...bareHandRepository,
  ...swordRepository,
  ...bladeRepository,
  ...daggerRepository,
  ...axeRepository,
  ...spearRepository,
  ...hammerRepository,
  ...bowRepository,
  ...shieldRepository,
  ...staffRepository,
  ...wandRepository,
  ...tomeRepository,
  ...orbRepository,
};

