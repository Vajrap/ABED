import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { Location } from "../../../Location";
import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { ActionInput } from "../../../../Character/Subclass/Action/CharacterAction";
import { TimeOfDay } from "../../../../../InterFacesEnumsAndTypes/Time";
import { InnLevel, type LocationInns } from "../../../Config/Inn";

export const goldburgCastle = new Location(
  LocationsEnum.GoldburgCastle,
  {
    en: "Goldburg Castle",
    th: "",
  },
  SubRegionEnum.GoldburgCapitalDistrict,
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
  "STABLE",
  undefined,
  {
    [InnLevel.Poor]: null,
    [InnLevel.Comfortable]: null,
    [InnLevel.Luxury]: { costPerRoom: 2500, roomSize: 4 },
    [InnLevel.Premium]: { costPerRoom: 7000, roomSize: 6 },
  } as LocationInns,
);

