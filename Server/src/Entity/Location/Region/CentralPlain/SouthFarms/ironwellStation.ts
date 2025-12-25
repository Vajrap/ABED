import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { Location } from "../../../Location";
import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RailStationEnum } from "src/InterFacesEnumsAndTypes/Enums/RailStation";
import { ActionInput } from "../../../../Character/Subclass/Action/CharacterAction";
import { TimeOfDay } from "../../../../../InterFacesEnumsAndTypes/Time";

export const ironwellStation = new Location(
  LocationsEnum.IronwellStation,
  {
    en: "Ironwell Station",
    th: "",
  },
  SubRegionEnum.SouthFarms,
  [],
  {
    [TimeOfDay.morning]: [
      ActionInput.Rest,
      ActionInput.TrainAttribute,
      ActionInput.TrainProficiency,
      ActionInput.TrainSkill,
      ActionInput.LearnSkill,
      ActionInput.Read,
      ActionInput.Socialize,
    ],
    [TimeOfDay.afternoon]: [
      ActionInput.Rest,
      ActionInput.Stroll,
      ActionInput.Foraging,
      ActionInput.Craft,
      ActionInput.TrainAttribute,
      ActionInput.TrainProficiency,
      ActionInput.TrainSkill,
      ActionInput.Read,
      ActionInput.Socialize,
    ],
    [TimeOfDay.evening]: [
      ActionInput.Rest,
      ActionInput.Inn,
      ActionInput.Tavern,
      ActionInput.Socialize,
      ActionInput.TrainAttribute,
      ActionInput.TrainProficiency,
      ActionInput.Read,
      ActionInput.Stroll,
    ],
    [TimeOfDay.night]: [
      ActionInput.Rest,
      ActionInput.Inn,
      ActionInput.Read,
      ActionInput.Socialize,
    ],
  },
  "BALANCE",
);

ironwellStation.setTrainStation(RailStationEnum.IronwellStation);

