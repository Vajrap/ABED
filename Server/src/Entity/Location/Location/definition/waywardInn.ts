import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { Location } from "../../Location";
import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RailStationEnum } from "src/InterFacesEnumsAndTypes/Enums/RailStation";
import { ActionInput } from "../../../Character/Subclass/Action/CharacterAction";
import { InnLevel, type LocationInns } from "../../Config/Inn";

/**
 * Wayward Inn - A cozy roadside inn serving travelers
 * 
 * A comfortable resting place for adventurers and merchants
 * traveling through the Golden Plains. Offers various amenities
 * including rest, food, drink, and training facilities.
 */
export const waywardInn = new Location(
  LocationsEnum.WaywardInn,
  {
    en: "Wayward Inn",
    th: "โรงเตี๊ยมนักจร",
  },
  SubRegionEnum.GoldenPlains,
  [], // Connected locations - will be populated when more locations exist
  [
    // Rest actions
    ActionInput.Rest,
    ActionInput.Inn,
    
    // Training actions
    ActionInput.TrainAttribute,
    ActionInput.TrainProficiency,
    ActionInput.TrainArtisan,
    ActionInput.TrainSkill,
    
    // Learning
    ActionInput.LearnSkill,
    ActionInput.Read,
    
    // Social
    ActionInput.Socialize,
    ActionInput.Stroll,
    ActionInput.Tavern,
  ],
  "CALM", // Weather volatility
  undefined, // Random events - use defaults
  {
    // Inn configuration - Wayward Inn offers multiple quality levels
    [InnLevel.Poor]: {
      costPerRoom: 100, // 100 copper per room
      roomSize: 2, // Can fit 2 people per room
    },
    [InnLevel.Comfortable]: {
      costPerRoom: 300, // 300 copper per room
      roomSize: 2, // Can fit 2 people per room
    },
    [InnLevel.Luxury]: {
      costPerRoom: 2000, // 2000 copper per room
      roomSize: 4, // Spacious rooms for 4 people
    },
    [InnLevel.Premium]: null, // No premium rooms available
  } as LocationInns,
  undefined, // Weather scale - use default based on volatility
  undefined, // Resource generation - use default
);

waywardInn.setTrainStation(RailStationEnum.WaywardInn);
