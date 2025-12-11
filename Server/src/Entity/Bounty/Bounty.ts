import type { L10N } from "../../InterFacesEnumsAndTypes/L10N";
import type { TierEnum } from "../../InterFacesEnumsAndTypes/Tiers";

/**
 * Bounty status
 */
export enum BountyStatus {
  Available = "available",
  Active = "active",
  Completed = "completed",
}

/**
 * Basic Bounty class (simpler than Quest)
 */
export class Bounty {
  id: string;
  name: L10N;
  description: L10N;
  target: string; // NPC/enemy type ID
  locationRequirement?: string; // Location where target can be found
  reward: number; // Gold reward
  tier: TierEnum;
  status: BountyStatus;
  giverId?: string; // NPC/character ID who posted the bounty
  locationId?: string; // Location where bounty can be accepted/turned in

  constructor(data: {
    id: string;
    name: L10N;
    description: L10N;
    target: string;
    reward: number;
    tier: TierEnum;
    status?: BountyStatus;
    locationRequirement?: string;
    giverId?: string;
    locationId?: string;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.target = data.target;
    this.reward = data.reward;
    this.tier = data.tier;
    this.status = data.status ?? BountyStatus.Available;
    this.locationRequirement = data.locationRequirement;
    this.giverId = data.giverId;
    this.locationId = data.locationId;
  }
}

