import type { LocationId } from "../../InterFacesEnumsAndTypes/Enums";
import { DayOfWeek, TimeOfDay } from "../../InterFacesEnumsAndTypes/Time";
import type { Character } from "../Character/Character";
import type { ItemId } from "../Item/Item";

export class Party {
  partyID: string;
  characters: Character[];
  isTraveling: boolean = false;
  location: LocationId;
  inventory: Partial<Record<ItemId, number>> = {};
  gold: number = 0;
  justArrived: boolean = false;
  informations: Record<string, number> = {};
  actionSequence: Record<DayOfWeek, Record<TimeOfDay, UserInputAction>> = {
    [DayOfWeek.laoh]: {
      [TimeOfDay.morning]: UserInputAction.none,
      [TimeOfDay.afternoon]: UserInputAction.none,
      [TimeOfDay.evening]: UserInputAction.none,
      [TimeOfDay.night]: UserInputAction.none,
    },
    [DayOfWeek.rowana]: {
      [TimeOfDay.morning]: UserInputAction.none,
      [TimeOfDay.afternoon]: UserInputAction.none,
      [TimeOfDay.evening]: UserInputAction.none,
      [TimeOfDay.night]: UserInputAction.none,
    },
    [DayOfWeek.aftree]: {
      [TimeOfDay.morning]: UserInputAction.none,
      [TimeOfDay.afternoon]: UserInputAction.none,
      [TimeOfDay.evening]: UserInputAction.none,
      [TimeOfDay.night]: UserInputAction.none,
    },
    [DayOfWeek.udur]: {
      [TimeOfDay.morning]: UserInputAction.none,
      [TimeOfDay.afternoon]: UserInputAction.none,
      [TimeOfDay.evening]: UserInputAction.none,
      [TimeOfDay.night]: UserInputAction.none,
    },
    [DayOfWeek.matris]: {
      [TimeOfDay.morning]: UserInputAction.none,
      [TimeOfDay.afternoon]: UserInputAction.none,
      [TimeOfDay.evening]: UserInputAction.none,
      [TimeOfDay.night]: UserInputAction.none,
    },
    [DayOfWeek.seethar]: {
      [TimeOfDay.morning]: UserInputAction.none,
      [TimeOfDay.afternoon]: UserInputAction.none,
      [TimeOfDay.evening]: UserInputAction.none,
      [TimeOfDay.night]: UserInputAction.none,
    },
  };
  constructor(data: { partyOwner: Character; location: LocationId }) {
    this.partyID = data.partyOwner.id;
    this.location = data.location;
    this.characters = [data.partyOwner];
  }

  isAllDead(): boolean {
    return this.characters.every((character) => character.vitals.isDead);
  }
}

enum UserInputAction {
  none = "none",
}
