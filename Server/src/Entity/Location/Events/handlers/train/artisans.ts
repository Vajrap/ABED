import type { ArtisanKey } from "../../../../../InterFacesEnumsAndTypes/Enums";
import type { Character } from "../../../../Character/Character";
import type { NewsContext, NewsWithScope } from "../../../../News/News";

export function handleTrainArtisans(
  characters: Character[],
  target: ArtisanKey,
  context: NewsContext,
): NewsWithScope {}

// export function handleTrainAction(
//   characters: Character[],
//   type: ActionInput,
//   context: NewsContext,
//   config?: LocationInns,
// ): NewsWithScope {
//   return {
//     scope: {
//       kind: "world",
//     },
//     news: createNews({
//       scope: {
//         kind: "world",
//       },
//       tokens: [],
//       context: {
//         region: RegionEnum.CentralPlain,
//         subRegion: SubRegionEnum.FyonarCapitalDistrict,
//         location: LocationsEnum.PlagueWaterCrossing,
//         partyId: "",
//         characterIds: [],
//       },
//     }),
//   };
// }
