"use client";

import GameView from "../GameView";
import { mockParty } from "@/data/mockPartyData";

/**
 * Mock page for UI development
 * This page renders GameView with mock data so you can develop UI without backend
 * 
 * Access at: /game/mock
 */
export default function MockGamePage() {
  // Pass mock data to GameView for UI development
  return <GameView mockPartyData={mockParty} />;
}

