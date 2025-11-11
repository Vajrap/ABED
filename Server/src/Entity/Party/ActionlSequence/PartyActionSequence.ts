import { DayOfWeek, TimeOfDay } from "../../../InterFacesEnumsAndTypes/Time";
import { ActionInput } from "../../Character/Subclass/Action/CharacterAction";

type PartyActionOption =
  | ActionInput.None
  | ActionInput.Travel
  | ActionInput.RailTravel
  | ActionInput.Inn
  | ActionInput.Camping
  | ActionInput.HouseRest;

export type PartyActionSequence = {
  [DayOfWeek.laoh]: {
    [TimeOfDay.morning]: PartyActionOption;
    [TimeOfDay.afternoon]: PartyActionOption;
    [TimeOfDay.evening]: PartyActionOption;
    [TimeOfDay.night]: PartyActionOption;
  };
  [DayOfWeek.rowana]: {
    [TimeOfDay.morning]: PartyActionOption;
    [TimeOfDay.afternoon]: PartyActionOption;
    [TimeOfDay.evening]: PartyActionOption;
    [TimeOfDay.night]: PartyActionOption;
  };
  [DayOfWeek.aftree]: {
    [TimeOfDay.morning]: PartyActionOption;
    [TimeOfDay.afternoon]: PartyActionOption;
    [TimeOfDay.evening]: PartyActionOption;
    [TimeOfDay.night]: PartyActionOption;
  };
  [DayOfWeek.udur]: {
    [TimeOfDay.morning]: PartyActionOption;
    [TimeOfDay.afternoon]: PartyActionOption;
    [TimeOfDay.evening]: PartyActionOption;
    [TimeOfDay.night]: PartyActionOption;
  };
  [DayOfWeek.matris]: {
    [TimeOfDay.morning]: PartyActionOption;
    [TimeOfDay.afternoon]: PartyActionOption;
    [TimeOfDay.evening]: PartyActionOption;
    [TimeOfDay.night]: PartyActionOption;
  };
  [DayOfWeek.seethar]: {
    [TimeOfDay.morning]: PartyActionOption;
    [TimeOfDay.afternoon]: PartyActionOption;
    [TimeOfDay.evening]: PartyActionOption;
    [TimeOfDay.night]: PartyActionOption;
  };
};

export const defaultPartyAction: PartyActionSequence = {
  [DayOfWeek.laoh]: {
    [TimeOfDay.morning]: ActionInput.None,
    [TimeOfDay.afternoon]: ActionInput.None,
    [TimeOfDay.evening]: ActionInput.None,
    [TimeOfDay.night]: ActionInput.None,
  },
  [DayOfWeek.rowana]: {
    [TimeOfDay.morning]: ActionInput.None,
    [TimeOfDay.afternoon]: ActionInput.None,
    [TimeOfDay.evening]: ActionInput.None,
    [TimeOfDay.night]: ActionInput.None,
  },
  [DayOfWeek.aftree]: {
    [TimeOfDay.morning]: ActionInput.None,
    [TimeOfDay.afternoon]: ActionInput.None,
    [TimeOfDay.evening]: ActionInput.None,
    [TimeOfDay.night]: ActionInput.None,
  },
  [DayOfWeek.udur]: {
    [TimeOfDay.morning]: ActionInput.None,
    [TimeOfDay.afternoon]: ActionInput.None,
    [TimeOfDay.evening]: ActionInput.None,
    [TimeOfDay.night]: ActionInput.None,
  },
  [DayOfWeek.matris]: {
    [TimeOfDay.morning]: ActionInput.None,
    [TimeOfDay.afternoon]: ActionInput.None,
    [TimeOfDay.evening]: ActionInput.None,
    [TimeOfDay.night]: ActionInput.None,
  },
  [DayOfWeek.seethar]: {
    [TimeOfDay.morning]: ActionInput.None,
    [TimeOfDay.afternoon]: ActionInput.None,
    [TimeOfDay.evening]: ActionInput.None,
    [TimeOfDay.night]: ActionInput.None,
  },
};
