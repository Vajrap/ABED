import { LocationsEnum } from "../../../../InterFacesEnumsAndTypes/Enums/Location";
import { RegionEnum } from "../../../../InterFacesEnumsAndTypes/Enums/Region";
import { SubRegionEnum } from "../../../../InterFacesEnumsAndTypes/Enums/SubRegion";
import { TierEnum } from "../../../../InterFacesEnumsAndTypes/Tiers";
import type { Character } from "../../../Character/Character";
import type { ActionInput } from "../../../Character/Subclass/Action/CharacterAction";
import {
  createNews,
  type NewsContext,
  type NewsWithScope,
} from "../../../News/News";
import type { LocationInns } from "../../Config/Inn";

export function handleTrainAction(
  characters: Character[],
  type: ActionInput,
  context: NewsContext,
  config?: LocationInns,
): NewsWithScope {
  
  return {
    scope: {
      kind: "worldScope",
    },
    news: createNews({
      scope: {
        kind: "worldScope",
      },
      tokens: [],
      context: {
        region: RegionEnum.CentralPlain,
        subRegion: SubRegionEnum.FyonarCapitalDistrict,
        location: LocationsEnum.PlagueWaterCrossing,
        partyId: "",
        characterIds: [],
      },
      secretTier: TierEnum.rare
    }),
  };
}
