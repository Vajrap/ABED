import type { Character } from "../../../Character/Character";
import { ActionInput } from "../../../Character/Subclass/Action/CharacterAction";
import { type NewsContext, type NewsWithScope } from "../../../News/News";
import { InnLevel, type LocationInns } from "../../Config/Inn";
import { campingRest } from "./rests/campingRest";
import { houseRest } from "./rests/houseRest";
import { getPreferredInnType, innRest } from "./rests/innRest";
import { normalRest } from "./rests/normalRest";

export function handleRestAction(
  characters: Character[],
  type:
    | ActionInput.Rest
    | ActionInput.Inn
    | ActionInput.Camping
    | ActionInput.HouseRest,
  context: NewsContext,
  config?: LocationInns,
): NewsWithScope | null {
  switch (type) {
    case ActionInput.Rest: {
      return normalRest(characters, context);
    }
    case ActionInput.Inn: {
      const innConfig = config ?? fallBackInnConfig;
      const innType = getPreferredInnType(characters, innConfig);
      if (!innType) {
        return normalRest(characters, context);
      }
      return innRest(
        characters,
        innConfig[innType.prefer]!,
        innType.numberOfRooms!,
        context,
      );
    }
    case ActionInput.Camping:
      return campingRest(characters, context);
    case ActionInput.HouseRest:
      return houseRest(characters, context);
    default:
      return null;
  }
}

// Shouldn't be used att all.
const fallBackInnConfig: LocationInns = {
  [InnLevel.Poor]: {
    costPerRoom: 300,
    roomSize: 2,
  },
  [InnLevel.Comfortable]: null,
  [InnLevel.Luxury]: null,
  [InnLevel.Premium]: null,
};

// This one, we need to find character house? maybe just a config in character, but needed to make sure that the house is available in that location, this might be done on other place?
