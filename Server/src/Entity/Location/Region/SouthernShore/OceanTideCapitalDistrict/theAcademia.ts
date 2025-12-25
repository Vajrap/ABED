import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { Location } from "../../../Location";
import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { ActionInput } from "../../../../Character/Subclass/Action/CharacterAction";
import { TimeOfDay } from "../../../../../InterFacesEnumsAndTypes/Time";

export const theAcademia = new Location(
  LocationsEnum.TheAcademia,
  {
    en: "The Academia",
    th: "",
  },
  SubRegionEnum.OceanTideCapitalDistrict,
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
      ActionInput.ArcaneAcademia,
    ],
    [TimeOfDay.afternoon]: [
      ActionInput.Rest,
      ActionInput.Stroll,
      ActionInput.Craft,
      ActionInput.TrainAttribute,
      ActionInput.TrainProficiency,
      ActionInput.TrainSkill,
      ActionInput.LearnSkill,
      ActionInput.Read,
      ActionInput.Socialize,
      ActionInput.ArcaneAcademia,
    ],
    [TimeOfDay.evening]: [
      ActionInput.Rest,
      ActionInput.Socialize,
      ActionInput.TrainAttribute,
      ActionInput.TrainProficiency,
      ActionInput.Read,
      ActionInput.Stroll,
      ActionInput.ArcaneAcademia,
    ],
    [TimeOfDay.night]: [
      ActionInput.Rest,
      ActionInput.Read,
      ActionInput.Socialize,
      ActionInput.Enchanting,
      ActionInput.ArcaneAcademia,
    ],
  },
  "CALM",
);

