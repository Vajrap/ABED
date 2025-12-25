import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { Location } from "../../../Location";
import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { ActionInput } from "../../../../Character/Subclass/Action/CharacterAction";
import { TimeOfDay } from "../../../../../InterFacesEnumsAndTypes/Time";

export const forstmarchsPost = new Location(
  LocationsEnum.ForstmarchsPost,
  {
    en: "Frostmarch's Post",
    th: "",
  },
  SubRegionEnum.FrostmarchTundra,
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
      ActionInput.KnightOrder,
    ],
    [TimeOfDay.afternoon]: [
      ActionInput.Rest,
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
      ActionInput.Socialize,
      ActionInput.TrainAttribute,
      ActionInput.TrainProficiency,
      ActionInput.Read,
      ActionInput.Stroll,
      ActionInput.KnightOrder,
    ],
    [TimeOfDay.night]: [
      ActionInput.Rest,
      ActionInput.Read,
      ActionInput.Socialize,
    ],
  },
  "UNSTABLE",
);

