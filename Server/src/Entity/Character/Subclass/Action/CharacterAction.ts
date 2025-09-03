import { DayOfWeek, TimeOfDay } from "../../../../InterFacesEnumsAndTypes/Time";
import { ActionInput } from "./ActionInput";

export type CharacterActionSequence = {
  [DayOfWeek.laoh]: {
    [TimeOfDay.morning]: ActionInput;
    [TimeOfDay.afternoon]: ActionInput;
    [TimeOfDay.evening]: ActionInput;
    [TimeOfDay.night]: ActionInput;
  };
  [DayOfWeek.rowana]: {
    [TimeOfDay.morning]: ActionInput;
    [TimeOfDay.afternoon]: ActionInput;
    [TimeOfDay.evening]: ActionInput;
    [TimeOfDay.night]: ActionInput;
  };
  [DayOfWeek.aftree]: {
    [TimeOfDay.morning]: ActionInput;
    [TimeOfDay.afternoon]: ActionInput;
    [TimeOfDay.evening]: ActionInput;
    [TimeOfDay.night]: ActionInput;
  };
  [DayOfWeek.udur]: {
    [TimeOfDay.morning]: ActionInput;
    [TimeOfDay.afternoon]: ActionInput;
    [TimeOfDay.evening]: ActionInput;
    [TimeOfDay.night]: ActionInput;
  };
  [DayOfWeek.matris]: {
    [TimeOfDay.morning]: ActionInput;
    [TimeOfDay.afternoon]: ActionInput;
    [TimeOfDay.evening]: ActionInput;
    [TimeOfDay.night]: ActionInput;
  };
  [DayOfWeek.seethar]: {
    [TimeOfDay.morning]: ActionInput;
    [TimeOfDay.afternoon]: ActionInput;
    [TimeOfDay.evening]: ActionInput;
    [TimeOfDay.night]: ActionInput;
  };
};

export const defaultActionSequence: CharacterActionSequence = {
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
