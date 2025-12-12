import { MOBEnum } from "./enums";
import type { ItemId } from "../../Item/type";
import type { ResourceId } from "../../Item/Misc";
import type { ArtisanKey } from "../../../InterFacesEnumsAndTypes/Enums";
import { OreId, SkinId, BoneId, WoodId } from "../../Item/Misc";

/**
 * Drop table unit - defines a single item that can drop from a MOB
 */
export type DropTableUnit = {
  item: ItemId | ResourceId;
  dc: number; // Difficulty Check needed to get this item
  amount: number; // Fixed quantity (doubled on nat 20)
  bonusArtisan: ArtisanKey; // Which artisan skill provides bonus for this drop
};

/**
 * Drop table for a MOB - contains all possible drops
 */
export type MOBDropTable = {
  mobId: MOBEnum;
  drops: DropTableUnit[];
};

/**
 * Drop tables for all MOBs
 * Each MOB must have an entry (can be empty array)
 */
export const mobDropTables: Record<MOBEnum, MOBDropTable> = {
  // Goblins
  [MOBEnum.goblinScout]: {
    mobId: MOBEnum.goblinScout,
    drops: [
      {
        item: SkinId.WolfPelt,
        dc: 10,
        amount: 1,
        bonusArtisan: "skinning",
      },
      {
        item: BoneId.Bone,
        dc: 8,
        amount: 1,
        bonusArtisan: "skinning",
      },
    ],
  },
  [MOBEnum.goblinWarrior]: {
    mobId: MOBEnum.goblinWarrior,
    drops: [
      {
        item: SkinId.WolfPelt,
        dc: 10,
        amount: 1,
        bonusArtisan: "skinning",
      },
      {
        item: BoneId.Fang,
        dc: 12,
        amount: 1,
        bonusArtisan: "skinning",
      },
    ],
  },
  [MOBEnum.goblinMage]: {
    mobId: MOBEnum.goblinMage,
    drops: [
      {
        item: SkinId.WolfPelt,
        dc: 10,
        amount: 1,
        bonusArtisan: "skinning",
      },
    ],
  },
  [MOBEnum.goblinCleric]: {
    mobId: MOBEnum.goblinCleric,
    drops: [
      {
        item: SkinId.WolfPelt,
        dc: 10,
        amount: 1,
        bonusArtisan: "skinning",
      },
    ],
  },
  [MOBEnum.goblinCaptain]: {
    mobId: MOBEnum.goblinCaptain,
    drops: [
      {
        item: SkinId.DirewolfPelt,
        dc: 14,
        amount: 1,
        bonusArtisan: "skinning",
      },
      {
        item: BoneId.Fang,
        dc: 12,
        amount: 2,
        bonusArtisan: "skinning",
      },
    ],
  },
  [MOBEnum.humanWarrior]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.humanMage]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.humanCleric]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.humanPaladin]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.humanWarlock]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.humanBarbarian]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.humanSorcerer]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.humanRogue]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.humanDruid]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.elvenWarrior]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.elvenRanger]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.elvenMage]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.elvenCleric]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.elvenPaladin]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.elvenWarlock]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.elvenBarbarian]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.elvenSorcerer]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.elvenRogue]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.elvenDruid]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.orcWarrior]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.orcRanger]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.orcMage]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.orcCleric]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.orcPaladin]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.orcWarlock]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.orcBarbarian]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.orcSorcerer]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.orcRogue]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  },
  [MOBEnum.orcDruid]: {
    mobId: MOBEnum.goblinScout,
    drops: []
  }
};

