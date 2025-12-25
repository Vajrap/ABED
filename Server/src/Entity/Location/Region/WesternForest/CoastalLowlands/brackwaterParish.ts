import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { Location } from "../../../Location";
import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { ActionInput } from "../../../../Character/Subclass/Action/CharacterAction";
import { TimeOfDay } from "../../../../../InterFacesEnumsAndTypes/Time";
import { InnLevel, type LocationInns } from "../../../Config/Inn";

export const brackwaterParish = new Location(
  LocationsEnum.BrackwaterParish,
  {
    en: "Brackwater Parish",
    th: "",
  },
  SubRegionEnum.CoastalLowlands,
  [],
  {
    [TimeOfDay.morning]: [
      ActionInput.Rest,
      ActionInput.TrainAttribute,
      ActionInput.TrainProficiency,
      ActionInput.TrainArtisan,
      ActionInput.TrainSkill,
      ActionInput.LearnSkill,
      ActionInput.Read,
      ActionInput.Socialize,
      ActionInput.ChurchOfLaoh,
    ],
    [TimeOfDay.afternoon]: [
      ActionInput.Rest,
      ActionInput.Stroll,
      ActionInput.Foraging,
      ActionInput.Craft,
      ActionInput.TrainAttribute,
      ActionInput.TrainProficiency,
      ActionInput.TrainArtisan,
      ActionInput.TrainSkill,
      ActionInput.Read,
      ActionInput.Socialize,
      ActionInput.ChurchOfLaoh,
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
      ActionInput.ChurchOfLaoh,
    ],
    [TimeOfDay.night]: [
      ActionInput.Rest,
      ActionInput.Inn,
      ActionInput.Read,
      ActionInput.Socialize,
      ActionInput.ChurchOfLaoh,
    ],
  },
  "UNSTABLE",
  undefined,
  {
    [InnLevel.Poor]: { costPerRoom: 85, roomSize: 2 },
    [InnLevel.Comfortable]: { costPerRoom: 270, roomSize: 2 },
    [InnLevel.Luxury]: null,
    [InnLevel.Premium]: null,
  } as LocationInns,
);

