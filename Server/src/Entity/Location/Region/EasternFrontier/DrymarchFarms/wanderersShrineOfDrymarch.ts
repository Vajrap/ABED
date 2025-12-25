import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { Location } from "../../../Location";
import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { ActionInput } from "../../../../Character/Subclass/Action/CharacterAction";
import { TimeOfDay } from "../../../../../InterFacesEnumsAndTypes/Time";

export const wanderersShrineOfDrymarch = new Location(
  LocationsEnum.WanderersShrineOfDrymarch,
  {
    en: "Wanderer's Shrine of Drymarch",
    th: "",
  },
  SubRegionEnum.DrymarchFarms,
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
      ActionInput.ChurchOfLaoh,
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
      ActionInput.ChurchOfLaoh,
    ],
    [TimeOfDay.evening]: [
      ActionInput.Rest,
      ActionInput.Camping,
      ActionInput.Socialize,
      ActionInput.TrainAttribute,
      ActionInput.TrainProficiency,
      ActionInput.Read,
      ActionInput.Stroll,
      ActionInput.ChurchOfLaoh,
    ],
    [TimeOfDay.night]: [
      ActionInput.Rest,
      ActionInput.Camping,
      ActionInput.Read,
      ActionInput.Socialize,
      ActionInput.ChurchOfLaoh,
    ],
  },
  "STABLE",
);

