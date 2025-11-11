import {
  RailSegmentEnum,
  RailStationEnum,
} from "src/InterFacesEnumsAndTypes/Enums/RailStation";
import type { RailSegment, RailStation } from "./StationAndSegment";
import { waywardInn, midland } from "./definition/station";
import { segmentWaywardToMidland } from "./definition/segment";
import { segmentMidlandToWayward } from "./definition/segment";

export const railStationRepository: Record<RailStationEnum, RailStation> = {
  [RailStationEnum.WaywardInn]: waywardInn,
  [RailStationEnum.Midland]: midland,
};

export const railSegmentRepository: Record<RailSegmentEnum, RailSegment> = {
  [RailSegmentEnum.WaywardInnToMidland]: segmentWaywardToMidland,
  [RailSegmentEnum.MidlandToWaywardInn]: segmentMidlandToWayward,
};
