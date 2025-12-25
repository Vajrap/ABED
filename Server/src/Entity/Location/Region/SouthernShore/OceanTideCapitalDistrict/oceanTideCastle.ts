import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { Location } from "../../../Location";
import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { ActionInput } from "../../../../Character/Subclass/Action/CharacterAction";
import { TimeOfDay } from "../../../../../InterFacesEnumsAndTypes/Time";
import { InnLevel, type LocationInns } from "../../../Config/Inn";

export const oceanTideCastle = new Location(
  LocationsEnum.OceanTideCastle,
  {
    en: "Ocean Tide Castle",
    th: "",
  },
  SubRegionEnum.OceanTideCapitalDistrict,
  [],
  {
    [TimeOfDay.morning]: [
      ActionInput.Rest,
      ActionInput.HouseRest,
      ActionInput.TrainAttribute,
      ActionInput.TrainProficiency,
      ActionInput.TrainSkill,
      ActionInput.LearnSkill,
      ActionInput.Read,
      ActionInput.Socialize,
      ActionInput.KnightOrder,
    ],
    [TimeOfDay.afternoon]: [
      ActionInput.Rest,
      ActionInput.HouseRest,
      ActionInput.Stroll,
      ActionInput.Craft,
      ActionInput.TrainAttribute,
      ActionInput.TrainProficiency,
      ActionInput.TrainSkill,
      ActionInput.Read,
      ActionInput.Socialize,
      ActionInput.KnightOrder,
    ],
    [TimeOfDay.evening]: [
      ActionInput.Rest,
      ActionInput.HouseRest,
      ActionInput.Socialize,
      ActionInput.TrainAttribute,
      ActionInput.TrainProficiency,
      ActionInput.Read,
      ActionInput.Stroll,
    ],
    [TimeOfDay.night]: [
      ActionInput.Rest,
      ActionInput.HouseRest,
      ActionInput.Read,
      ActionInput.Socialize,
      ActionInput.Enchanting,
    ],
  },
  "CALM",
  undefined,
  {
    [InnLevel.Poor]: null,
    [InnLevel.Comfortable]: null,
    [InnLevel.Luxury]: { costPerRoom: 3000, roomSize: 4 },
    [InnLevel.Premium]: { costPerRoom: 8000, roomSize: 6 },
  } as LocationInns,
);

