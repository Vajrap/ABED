import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { Location } from "../../../Location";
import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { ActionInput } from "../../../../Character/Subclass/Action/CharacterAction";
import { TimeOfDay } from "../../../../../InterFacesEnumsAndTypes/Time";

export const ironholdKeep = new Location(
  LocationsEnum.IronholdKeep,
  {
    en: "Ironhold Keep",
    th: "",
  },
  SubRegionEnum.ValgarthCapitalDistrict,
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
);

