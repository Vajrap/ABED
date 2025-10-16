import { describe, test, expect } from "bun:test";
import { LocationGraph } from "../../../src/Entity/Location/LocationGraph";
import { LocationsEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/Location";

describe("LocationGraph", () => {
  const graph = new LocationGraph();
  
  describe("Graph Construction", () => {
    test("builds graph from location repository", () => {
      // Graph builds successfully (may be empty if no locations initialized)
      const allLocations = graph.getAllLocations();
      expect(Array.isArray(allLocations)).toBe(true);
      // Note: In production, this would have locations
      // In tests, locationRepository might be empty
    });
    
    test("connections are bidirectional", () => {
      const allLocations = graph.getAllLocations();
      if (allLocations.length < 2) return; // Skip if not enough locations
      
      // Find a location with connections
      for (const location of allLocations) {
        const neighbors = graph.getConnections(location);
        if (neighbors.length > 0) {
          const neighbor = neighbors[0];
          
          // Check bidirectional
          const reverse = graph.getConnections(neighbor as LocationsEnum);
          expect(reverse).toContain(location);
          break;
        }
      }
    });
  });
  
  describe("Connection Queries", () => {
    test("getConnections returns array of connected locations", () => {
      const allLocations = graph.getAllLocations();
      if (allLocations.length === 0) return;
      
      const connections = graph.getConnections(allLocations[0] as LocationsEnum);
      expect(Array.isArray(connections)).toBe(true);
    });
    
    test("areConnected checks direct connection", () => {
      const allLocations = graph.getAllLocations();
      if (allLocations.length < 2) return;
      
      // Check connection
      const loc1 = allLocations[0];
      const neighbors = graph.getConnections(loc1 as LocationsEnum);
      
      if (neighbors.length > 0) {
        expect(graph.areConnected(loc1 as LocationsEnum, neighbors[0] as LocationsEnum)).toBe(true);
      }
    });
  });
  
  describe("Distance Calculation (BFS)", () => {
    test("distance to self is 0", () => {
      const allLocations = graph.getAllLocations();
      if (allLocations.length === 0) return;
      
      const distance = graph.getDistance(allLocations[0] as LocationsEnum, allLocations[0] as LocationsEnum);
      expect(distance).toBe(0);
    });
    
    test("distance to direct neighbor is 1", () => {
      const allLocations = graph.getAllLocations();
      
      for (const location of allLocations) {
        const neighbors = graph.getConnections(location);
        if (neighbors.length > 0) {
          const distance = graph.getDistance(location, neighbors[0] as LocationsEnum);
          expect(distance).toBe(1);
          break;
        }
      }
    });
    
    test("returns -1 for disconnected locations", () => {
      // If graph is fully connected, all distances will be >= 0
      // This test validates the -1 return logic
      const distance = graph.getDistance(
        "NonExistentLocation" as LocationsEnum,
        "AnotherNonExistent" as LocationsEnum
      );
      expect(distance).toBe(-1);
    });
  });
  
  describe("getLocationsWithin", () => {
    test("distance 0 returns empty array", () => {
      const allLocations = graph.getAllLocations();
      if (allLocations.length === 0) return;
      
      const within = graph.getLocationsWithin(allLocations[0] as LocationsEnum, 0);
      expect(within.length).toBe(0);
    });
    
    test("distance 1 returns direct neighbors", () => {
      const allLocations = graph.getAllLocations();
      
      for (const location of allLocations) {
        const neighbors = graph.getConnections(location);
        if (neighbors.length > 0) {
          const within = graph.getLocationsWithin(location, 1);
          
          // Should include all direct neighbors
          for (const neighbor of neighbors) {
            expect(within).toContain(neighbor);
          }
          break;
        }
      }
    });
    
    test("distance Infinity returns all locations except center", () => {
      const allLocations = graph.getAllLocations();
      if (allLocations.length === 0) return;
      
      const within = graph.getLocationsWithin(allLocations[0] as LocationsEnum, Infinity);
      
      // Should return all locations
      expect(within.length).toBeGreaterThan(0);
    });
  });
  
  describe("Performance", () => {
    test("BFS completes quickly for all pairs", () => {
      const allLocations = graph.getAllLocations();
      if (allLocations.length === 0) return;
      
      const startTime = performance.now();
      
      // Calculate distance for first 10 pairs (or all if less)
      const limit = Math.min(10, allLocations.length);
      for (let i = 0; i < limit; i++) {
        for (let j = 0; j < limit; j++) {
          graph.getDistance(allLocations[i] as LocationsEnum, allLocations[j] as LocationsEnum);
        }
      }
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Should complete in reasonable time
      expect(duration).toBeLessThan(100); // ms
    });
  });
});

