import { MOBs } from "src/Entity/Character/MOBs/enums.ts";
import { Character } from "src/Entity/Character/Character.ts";
import { goblinScout, goblinWarrior, goblinMage, goblinCaptain, goblinCleric } from "./goblins";
import {
  humanWarrior,
  humanMage,
  humanCleric,
  humanPaladin,
  humanWarlock,
  humanBarbarian,
  humanSorcerer,
  humanRogue,
  humanDruid,
} from "./Humanoid/humans";
import {
  elvenWarrior,
  elvenRanger,
  elvenMage,
  elvenCleric,
  elvenPaladin,
  elvenWarlock,
  elvenBarbarian,
  elvenSorcerer,
  elvenRogue,
  elvenDruid,
} from "./Humanoid/elves";
import {
  orcWarrior,
  orcRanger,
  orcMage,
  orcCleric,
  orcPaladin,
  orcWarlock,
  orcBarbarian,
  orcSorcerer,
  orcRogue,
  orcDruid,
} from "./Humanoid/orcs";
import {
  halflingWarrior,
  halflingRanger,
  halflingMage,
  halflingCleric,
  halflingPaladin,
  halflingWarlock,
  halflingBarbarian,
  halflingSorcerer,
  halflingRogue,
  halflingDruid,
} from "./Humanoid/halflings";
import {
  dwarfWarrior,
  dwarfRanger,
  dwarfMage,
  dwarfCleric,
  dwarfPaladin,
  dwarfWarlock,
  dwarfBarbarian,
  dwarfSorcerer,
  dwarfRogue,
  dwarfDruid,
} from "./Humanoid/dwarfs";

export const mobRepository: Record<
  MOBs,
  (difficulty: 1 | 2 | 3 | 4 | 5) => Character
> = {
  // Goblins
  goblinScout: goblinScout,
  goblinWarrior: goblinWarrior,
  goblinMage: goblinMage,
  goblinCleric: goblinCleric,
  goblinCaptain: goblinCaptain,
  
  // Humans
  humanWarrior: humanWarrior,
  humanMage: humanMage,
  humanCleric: humanCleric,
  humanPaladin: humanPaladin,
  humanWarlock: humanWarlock,
  humanBarbarian: humanBarbarian,
  humanSorcerer: humanSorcerer,
  humanRogue: humanRogue,
  humanDruid: humanDruid,
  
  // Elves
  elvenWarrior: elvenWarrior,
  elvenRanger: elvenRanger,
  elvenMage: elvenMage,
  elvenCleric: elvenCleric,
  elvenPaladin: elvenPaladin,
  elvenWarlock: elvenWarlock,
  elvenBarbarian: elvenBarbarian,
  elvenSorcerer: elvenSorcerer,
  elvenRogue: elvenRogue,
  elvenDruid: elvenDruid,
  
  // Orcs
  orcWarrior: orcWarrior,
  orcRanger: orcRanger,
  orcMage: orcMage,
  orcCleric: orcCleric,
  orcPaladin: orcPaladin,
  orcWarlock: orcWarlock,
  orcBarbarian: orcBarbarian,
  orcSorcerer: orcSorcerer,
  orcRogue: orcRogue,
  orcDruid: orcDruid,
  
  // Halflings
  halflingWarrior: halflingWarrior,
  halflingRanger: halflingRanger,
  halflingMage: halflingMage,
  halflingCleric: halflingCleric,
  halflingPaladin: halflingPaladin,
  halflingWarlock: halflingWarlock,
  halflingBarbarian: halflingBarbarian,
  halflingSorcerer: halflingSorcerer,
  halflingRogue: halflingRogue,
  halflingDruid: halflingDruid,
  
  // Dwarfs
  dwarfWarrior: dwarfWarrior,
  dwarfRanger: dwarfRanger,
  dwarfMage: dwarfMage,
  dwarfCleric: dwarfCleric,
  dwarfPaladin: dwarfPaladin,
  dwarfWarlock: dwarfWarlock,
  dwarfBarbarian: dwarfBarbarian,
  dwarfSorcerer: dwarfSorcerer,
  dwarfRogue: dwarfRogue,
  dwarfDruid: dwarfDruid,
};
