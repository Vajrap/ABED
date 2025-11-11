import { Party } from "src/Entity/Party/Party";
import {
  RailStationEnum,
  type RailSegmentEnum,
} from "src/InterFacesEnumsAndTypes/Enums/RailStation";
import type { DayOfWeek, TimeOfDay } from "src/InterFacesEnumsAndTypes/Time";
import {
  emptyNewsDistribution,
  type NewsDistribution,
} from "src/Entity/News/News";
import {
  railSegmentRepository,
  railStationRepository,
} from "./repository";
import type { RailSegment } from "./StationAndSegment";

export class RailTravelingParty {
    route: RailSegment[];
    currentSegmentIndex: number = 0;
    completed: boolean = false;
    phrasesTraveldInCurrentSegment: number = 0;
    distanceCovered: number = 0;
    currentLocation: RailStationEnum | RailSegmentEnum;

  constructor(
    public party: Party,
    public from: RailStationEnum,
    public to: RailStationEnum,
  ) {
    this.currentLocation = from;
    this.route = this.makeRoute(from, to);
    if (this.route.length === 0) {
      this.completed = true;
    }
  }

  makeRoute(start: RailStationEnum, destination: RailStationEnum) {
    const route: RailSegment[] = [];
    let station = railStationRepository[start];
    if (!station) {
      throw new Error(`Rail station not found for start: ${start}`);
    }

    const maxSteps = Object.keys(railStationRepository).length + 1;
    let steps = 0;

    while (station.id !== destination && steps < maxSteps) {
      const segment = railSegmentRepository[station.connections.forward];
      if (!segment) {
        throw new Error(
          `Rail segment not found from station: ${station.id} (forward)`,
        );
      }
      route.push(segment);

      station = railStationRepository[segment.to];
      if (!station) {
        throw new Error(
          `Rail station not found for segment destination: ${segment.to}`,
        );
      }

      steps += 1;
    }

    if (station.id !== destination) {
      throw new Error(
        `Unable to resolve rail route from ${start} to ${destination}`,
      );
    }

    return route;
  }

  get phrasesToNextLocation(): number {
    const segment = this.route[this.currentSegmentIndex];
    if (!segment) return 0;
    return segment.travelTimePhases - this.phrasesTraveldInCurrentSegment;
  }

  isAtStation(): boolean {
    return Object.values(RailStationEnum).includes(this.currentLocation as RailStationEnum);
  }

  travel() {
    if (this.completed) return;

    const segment = this.route[this.currentSegmentIndex];
    if (!segment) {
      this.completed = true;
      return;
    }

    this.phrasesTraveldInCurrentSegment += 1;

    if (this.phrasesTraveldInCurrentSegment < segment.travelTimePhases) {
      return;
    }

    this.phrasesTraveldInCurrentSegment = 0;
    this.distanceCovered += segment.distance;
    this.currentSegmentIndex += 1;

    const nextSegment = this.route[this.currentSegmentIndex];
    this.currentLocation = nextSegment ? nextSegment.from : segment.to;

    if (!nextSegment && segment.to === this.to) {
      this.currentLocation = this.to;
      this.completed = true;
    }
  }
}

class RailTravelManager {
  party: RailTravelingParty[] = [];

  addParty(party: RailTravelingParty) {
    this.party.push(party);
  }

  removeParty(id: string) {
    this.party = this.party.filter((p) => p.party.partyID !== id);
  }

  async allTravel(
    _day: DayOfWeek,
    _phase: TimeOfDay,
  ): Promise<NewsDistribution> {
    const news = emptyNewsDistribution();
    if (this.party.length === 0) return news;

    const completed: RailTravelingParty[] = [];

    for (const travelingParty of this.party) {
      travelingParty.travel();
      if (travelingParty.completed) {
        const destination = railStationRepository[travelingParty.to];
        if (destination) {
          travelingParty.party.location = destination.location;
        }
        completed.push(travelingParty);
      }
    }

    if (completed.length > 0) {
      const ids = new Set(completed.map((p) => p.party.partyID));
      this.party = this.party.filter((p) => !ids.has(p.party.partyID));
    }

    return news;
  }
}

export const railTravelManager = new RailTravelManager();