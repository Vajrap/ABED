import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import { DayOfWeek, TimeOfDay } from "../../InterFacesEnumsAndTypes/Time";
import { Character } from "../Character/Character";
import type { ItemId } from "../Item/Item";
import type { PartyBehavior } from "./PartyBehavior";

type PartyCharacters = [
  Character | "none",
  Character | "none",
  Character | "none",
  Character | "none",
  Character | "none",
  Character | "none",
];

export class Party {
  partyID: string;
  // characters: (Character | "none")[];
  characters: PartyCharacters = [
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
  ];
  isTraveling: boolean = false;
  location: LocationsEnum;
  behavior: PartyBehavior;
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
  constructor(data: {
    leaderId: string;
    characters: PartyCharacters;
    location: LocationsEnum;
    behavior: PartyBehavior;
  }) {
    this.partyID = data.leaderId;
    this.location = data.location;
    this.characters = data.characters;
    this.behavior = data.behavior;
  }

  isAllDead(): boolean {
    return this.characters.every(
      (character) => character === "none" || character.vitals.isDead,
    );
  }
}

enum UserInputAction {
  none = "none",
}
