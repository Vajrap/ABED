import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import type { RegionEnum } from "../../InterFacesEnumsAndTypes/Enums/Region";
import type { SubRegionEnum } from "../../InterFacesEnumsAndTypes/Enums/SubRegion";
import type { NewsScope } from "../News/News";

export type ClientContext = {
  userId: string;
  regionId: RegionEnum;
  subRegionId: SubRegionEnum;
  locationId: LocationsEnum;
  partyId: string;
  characterIds: string[];
};

class ConnectionManager {
  private connections: Map<string, { ws: WebSocket; context: ClientContext }> =
    new Map();

  register(userId: string, ws: WebSocket, context: ClientContext) {
    this.connections.set(userId, { ws, context });
  }

  unregister(userId: string) {
    this.connections.delete(userId);
  }

  getConnections() {
    return Array.from(this.connections.values());
  }

  getConnectionsByScope(scope: NewsScope): WebSocket[] {
    const result: WebSocket[] = [];

    for (const { ws, context } of this.connections.values()) {
      if (this.isMatch(scope, context)) {
        result.push(ws);
      }
    }

    return result;
  }

  private isMatch(scope: NewsScope, context: ClientContext): boolean {
    switch (scope.kind) {
      case "world":
        return true;
      case "region":
        return context.regionId === scope.region;
      case "subRegion":
        return context.subRegionId === scope.subRegion;
      case "location":
        return context.locationId === scope.location;
      case "party":
        return context.partyId === scope.partyId;
      case "private":
        return scope.characterIds.some((id) =>
          context.characterIds.includes(id),
        );
      default:
        return false;
    }
  }
}

export const connectionManager = new ConnectionManager();
