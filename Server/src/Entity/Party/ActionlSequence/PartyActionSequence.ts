import { DayOfWeek, TimeOfDay } from "../../../InterFacesEnumsAndTypes/Time";
import { ActionInput } from "../../Character/Subclass/Action/ActionInput";

export type PartyActionSequence = {
  [DayOfWeek.laoh]: {
    [TimeOfDay.morning]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
    [TimeOfDay.afternoon]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
    [TimeOfDay.evening]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
    [TimeOfDay.night]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
  };
  [DayOfWeek.rowana]: {
    [TimeOfDay.morning]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
    [TimeOfDay.afternoon]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
    [TimeOfDay.evening]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
    [TimeOfDay.night]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
  };
  [DayOfWeek.aftree]: {
    [TimeOfDay.morning]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
    [TimeOfDay.afternoon]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
    [TimeOfDay.evening]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
    [TimeOfDay.night]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
  };
  [DayOfWeek.udur]: {
    [TimeOfDay.morning]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
    [TimeOfDay.afternoon]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
    [TimeOfDay.evening]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
    [TimeOfDay.night]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
  };
  [DayOfWeek.matris]: {
    [TimeOfDay.morning]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
    [TimeOfDay.afternoon]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
    [TimeOfDay.evening]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
    [TimeOfDay.night]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
  };
  [DayOfWeek.seethar]: {
    [TimeOfDay.morning]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
    [TimeOfDay.afternoon]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
    [TimeOfDay.evening]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
    [TimeOfDay.night]:
      | ActionInput.None
      | ActionInput.Travel
      | ActionInput.Inn
      | ActionInput.Camping
      | ActionInput.HouseRest;
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
