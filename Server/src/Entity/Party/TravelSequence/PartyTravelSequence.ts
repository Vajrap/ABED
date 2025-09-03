import { DayOfWeek, TimeOfDay } from "../../../InterFacesEnumsAndTypes/Time";
import { ActionInput } from "../../Character/Subclass/Action/ActionInput";

export type PartyTravelSequence = {
  [DayOfWeek.laoh]: {
    [TimeOfDay.morning]: ActionInput.none | ActionInput.travel;
    [TimeOfDay.afternoon]: ActionInput.none | ActionInput.travel;
    [TimeOfDay.evening]: ActionInput.none | ActionInput.travel;
    [TimeOfDay.night]: ActionInput.none | ActionInput.travel;
  };
  [DayOfWeek.rowana]: {
    [TimeOfDay.morning]: ActionInput.none | ActionInput.travel;
    [TimeOfDay.afternoon]: ActionInput.none | ActionInput.travel;
    [TimeOfDay.evening]: ActionInput.none | ActionInput.travel;
    [TimeOfDay.night]: ActionInput.none | ActionInput.travel;
  };
  [DayOfWeek.aftree]: {
    [TimeOfDay.morning]: ActionInput.none | ActionInput.travel;
    [TimeOfDay.afternoon]: ActionInput.none | ActionInput.travel;
    [TimeOfDay.evening]: ActionInput.none | ActionInput.travel;
    [TimeOfDay.night]: ActionInput.none | ActionInput.travel;
  };
  [DayOfWeek.udur]: {
    [TimeOfDay.morning]: ActionInput.none | ActionInput.travel;
    [TimeOfDay.afternoon]: ActionInput.none | ActionInput.travel;
    [TimeOfDay.evening]: ActionInput.none | ActionInput.travel;
    [TimeOfDay.night]: ActionInput.none | ActionInput.travel;
  };
  [DayOfWeek.matris]: {
    [TimeOfDay.morning]: ActionInput.none | ActionInput.travel;
    [TimeOfDay.afternoon]: ActionInput.none | ActionInput.travel;
    [TimeOfDay.evening]: ActionInput.none | ActionInput.travel;
    [TimeOfDay.night]: ActionInput.none | ActionInput.travel;
  };
  [DayOfWeek.seethar]: {
    [TimeOfDay.morning]: ActionInput.none | ActionInput.travel;
    [TimeOfDay.afternoon]: ActionInput.none | ActionInput.travel;
    [TimeOfDay.evening]: ActionInput.none | ActionInput.travel;
    [TimeOfDay.night]: ActionInput.none | ActionInput.travel;
  };
};

export const defaultTravelSequence: PartyTravelSequence = {
  [DayOfWeek.laoh]: {
    [TimeOfDay.morning]: ActionInput.none,
    [TimeOfDay.afternoon]: ActionInput.none,
    [TimeOfDay.evening]: ActionInput.none,
    [TimeOfDay.night]: ActionInput.none,
  },
  [DayOfWeek.rowana]: {
    [TimeOfDay.morning]: ActionInput.none,
    [TimeOfDay.afternoon]: ActionInput.none,
    [TimeOfDay.evening]: ActionInput.none,
    [TimeOfDay.night]: ActionInput.none,
  },
  [DayOfWeek.aftree]: {
    [TimeOfDay.morning]: ActionInput.none,
    [TimeOfDay.afternoon]: ActionInput.none,
    [TimeOfDay.evening]: ActionInput.none,
    [TimeOfDay.night]: ActionInput.none,
  },
  [DayOfWeek.udur]: {
    [TimeOfDay.morning]: ActionInput.none,
    [TimeOfDay.afternoon]: ActionInput.none,
    [TimeOfDay.evening]: ActionInput.none,
    [TimeOfDay.night]: ActionInput.none,
  },
  [DayOfWeek.matris]: {
    [TimeOfDay.morning]: ActionInput.none,
    [TimeOfDay.afternoon]: ActionInput.none,
    [TimeOfDay.evening]: ActionInput.none,
    [TimeOfDay.night]: ActionInput.none,
  },
  [DayOfWeek.seethar]: {
    [TimeOfDay.morning]: ActionInput.none,
    [TimeOfDay.afternoon]: ActionInput.none,
    [TimeOfDay.evening]: ActionInput.none,
    [TimeOfDay.night]: ActionInput.none,
  },
};
