import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { Location } from "../../../Location";
import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { ActionInput } from "../../../../Character/Subclass/Action/CharacterAction";
import { TimeOfDay } from "../../../../../InterFacesEnumsAndTypes/Time";

export const grandTempleOfLaoh = new Location(
  LocationsEnum.GrandTempleOfLaoh,
  {
    en: "Grand Temple of Laoh",
    th: "",
  },
  SubRegionEnum.FyonarCapitalDistrict,
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
      ActionInput.GreatTempleOfLaoh,
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
      ActionInput.GreatTempleOfLaoh,
    ],
    [TimeOfDay.evening]: [
      ActionInput.Rest,
      ActionInput.Socialize,
      ActionInput.TrainAttribute,
      ActionInput.TrainProficiency,
      ActionInput.Read,
      ActionInput.Stroll,
      ActionInput.GreatTempleOfLaoh,
    ],
    [TimeOfDay.night]: [
      ActionInput.Rest,
      ActionInput.Read,
      ActionInput.Socialize,
      ActionInput.GreatTempleOfLaoh,
    ],
  },
  "CALM",
);

