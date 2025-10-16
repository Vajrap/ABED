import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import { locationRepository } from "../Repository/location";
import Report from "../../Utils/Reporter";

/**
 * LocationGraph - Manages location connectivity for travel and news propagation
 * 
 * Builds a graph of which locations connect to which others
 * Provides BFS-based distance calculations
 * Used by both travel system and news spreading
 */
export class LocationGraph {
  private connections: Map<LocationsEnum, Set<LocationsEnum>>;
  
  constructor() {
    this.connections = new Map();
    this.buildFromLocations();
  }
  
  /**
   * Build connection graph from Location.connectedLocations
   */
  buildFromLocations(): void {
    this.connections.clear();
    
    for (const location of locationRepository.values()) {
      if (!location.connectedLocations || location.connectedLocations.length === 0) continue;
      
      // Initialize set for this location
      if (!this.connections.has(location.id)) {
        this.connections.set(location.id, new Set());
      }
      
      const neighbors = this.connections.get(location.id)!;
      
      // Add all connected locations
      // connectedLocations is array of { location: Location, distance: number }
      for (const connected of location.connectedLocations) {
        const connectedId = connected.location.id;
        neighbors.add(connectedId);
        
        // Bidirectional connection
        if (!this.connections.has(connectedId)) {
          this.connections.set(connectedId, new Set());
        }
        this.connections.get(connectedId)!.add(location.id);
      }
    }
    
    Report.info(`LocationGraph built: ${this.connections.size} locations, ${this.getTotalConnections()} connections`);
  }
  
  /**
   * Get all locations directly connected to this one
   */
  getConnections(location: LocationsEnum): LocationsEnum[] {
    return Array.from(this.connections.get(location) ?? []);
  }
  
  /**
   * Check if two locations are directly connected
   */
  areConnected(loc1: LocationsEnum, loc2: LocationsEnum): boolean {
    return this.connections.get(loc1)?.has(loc2) ?? false;
  }
  
  /**
   * Get shortest distance between two locations (BFS)
   * Returns -1 if no path exists
   */
  getDistance(from: LocationsEnum, to: LocationsEnum): number {
    if (from === to) return 0;
    
    const visited = new Set<LocationsEnum>();
    const queue: { location: LocationsEnum; distance: number }[] = [
      { location: from, distance: 0 }
    ];
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (visited.has(current.location)) continue;
      visited.add(current.location);
      
      const neighbors = this.connections.get(current.location) ?? new Set();
      
      for (const neighbor of neighbors) {
        if (neighbor === to) {
          return current.distance + 1;
        }
        
        if (!visited.has(neighbor)) {
          queue.push({
            location: neighbor,
            distance: current.distance + 1
          });
        }
      }
    }
    
    return -1; // No path exists
  }
  
  /**
   * Get all locations within N hops (BFS)
   */
  getLocationsWithin(center: LocationsEnum, maxDistance: number): LocationsEnum[] {
    if (maxDistance === 0) return [];
    if (maxDistance === Infinity) return Array.from(this.connections.keys());
    
    const result: LocationsEnum[] = [];
    const visited = new Set<LocationsEnum>();
    const queue: { location: LocationsEnum; distance: number }[] = [
      { location: center, distance: 0 }
    ];
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (visited.has(current.location)) continue;
      visited.add(current.location);
      
      if (current.distance > 0 && current.distance <= maxDistance) {
        result.push(current.location);
      }
      
      if (current.distance < maxDistance) {
        const neighbors = this.connections.get(current.location) ?? new Set();
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            queue.push({
              location: neighbor,
              distance: current.distance + 1
            });
          }
        }
      }
    }
    
    return result;
  }
  
  /**
   * Get all locations in the graph
   */
  getAllLocations(): LocationsEnum[] {
    return Array.from(this.connections.keys());
  }
  
  /**
   * Get total number of connections (edges in graph)
   */
  private getTotalConnections(): number {
    let total = 0;
    for (const neighbors of this.connections.values()) {
      total += neighbors.size;
    }
    return total / 2; // Bidirectional, so divide by 2
  }
  
  /**
   * Rebuild graph (useful if locations change)
   */
  rebuild(): void {
    this.buildFromLocations();
  }
}

// Global instance
export const locationGraph = new LocationGraph();

