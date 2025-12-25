import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { Location } from "../../../Location";
import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { ActionInput } from "../../../../Character/Subclass/Action/CharacterAction";
import { TimeOfDay } from "../../../../../InterFacesEnumsAndTypes/Time";
import { InnLevel, type LocationInns } from "../../../Config/Inn";

export const stonecrossManor = new Location(
  LocationsEnum.StonecrossManor,
  {
    en: "Stonecross Manor",
    th: "",
  },
  SubRegionEnum.GoldenPlains,
  [],
  {
    [TimeOfDay.morning]: [
      ActionInput.Rest,
      ActionInput.HouseRest,
      ActionInput.TrainAttribute,
      ActionInput.TrainProficiency,
      ActionInput.TrainArtisan,
      ActionInput.TrainSkill,
      ActionInput.LearnSkill,
      ActionInput.Read,
      ActionInput.Socialize,
    ],
    [TimeOfDay.afternoon]: [
      ActionInput.Rest,
      ActionInput.HouseRest,
      ActionInput.Stroll,
      ActionInput.Foraging,
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
    [InnLevel.Comfortable]: { costPerRoom: 200, roomSize: 3 },
    [InnLevel.Luxury]: { costPerRoom: 1500, roomSize: 4 },
    [InnLevel.Premium]: { costPerRoom: 5000, roomSize: 6 },
  } as LocationInns,
);

