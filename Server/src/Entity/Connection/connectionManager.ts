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
  characterId: string;
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

  /**
   * Get connection by userId
   * Returns the WebSocket connection and context for a specific user
   */
  getConnectionByUserId(userId: string): { ws: WebSocket; context: ClientContext } | null {
    const connection = this.connections.get(userId);
    return connection || null;
  }

  /**
   * Get userId by WebSocket connection
   * Used to unregister connection on close
   */
  getUserIdByWebSocket(ws: WebSocket): string | null {
    for (const [userId, connection] of this.connections.entries()) {
      if (connection.ws === ws) {
        return userId;
      }
    }
    return null;
  }

  private isMatch(scope: NewsScope, context: ClientContext): boolean {
    switch (scope.kind) {
      case "worldScope":
        return true;
      case "regionScope":
        return context.regionId === scope.region;
      case "subRegionScope":
        return context.subRegionId === scope.subRegion;
      case "locationScope":
        return context.locationId === scope.location;
      case "partyScope":
        return context.partyId === scope.partyId;
      case "privateScope":
        return context.characterId === scope.characterId;
      default:
        return false;
    }
  }
}

export const connectionManager = new ConnectionManager();
