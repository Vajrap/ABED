import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { Location } from "../../../Location";
import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { ActionInput } from "../../../../Character/Subclass/Action/CharacterAction";
import { TimeOfDay } from "../../../../../InterFacesEnumsAndTypes/Time";
import { InnLevel, type LocationInns } from "../../../Config/Inn";

export const velgarthCity = new Location(
  LocationsEnum.VelgarthCity,
  {
    en: "Velgarth City",
    th: "",
  },
  SubRegionEnum.ValgarthCapitalDistrict,
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
      ActionInput.Craft,
    ],
    [TimeOfDay.afternoon]: [
      ActionInput.Rest,
      ActionInput.Stroll,
      ActionInput.Craft,
      ActionInput.TrainAttribute,
      ActionInput.TrainProficiency,
      ActionInput.TrainArtisan,
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
      ActionInput.Enchanting,
    ],
  },
  "STABLE",
  undefined,
  {
    [InnLevel.Poor]: { costPerRoom: 120, roomSize: 2 },
    [InnLevel.Comfortable]: { costPerRoom: 400, roomSize: 2 },
    [InnLevel.Luxury]: { costPerRoom: 2500, roomSize: 4 },
    [InnLevel.Premium]: null,
  } as LocationInns,
);

