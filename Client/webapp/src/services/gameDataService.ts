// Game data service - fetches all essential game data on login
import { partyService } from './partyService';
import { locationService } from './locationService';
import { newsService } from './newsService';
import type { PartyInterface, GameTimeInterface } from '@/types/api';
import type { LocationData } from './locationService';
import type { News } from '@/types/api';

export interface GameData {
  party: PartyInterface;
  location: LocationData;
  news: News[];
  unseenNews: News[];
  gameTime?: GameTimeInterface;
}

export interface GameDataResponse {
  success: boolean;
  data?: GameData;
  errors?: {
    party?: string;
    location?: string;
    news?: string;
  };
}

class GameDataService {
  /**
   * Fetch all essential game data (Party, Location, News) in parallel
   * This is called when player logs in to get everything needed for the game view
   */
  async fetchGameData(): Promise<GameDataResponse> {
    const errors: { party?: string; location?: string; news?: string } = {};
    
    try {
      // Fetch all data in parallel for better performance
      const [partyResponse, locationResponse, newsResponse] = await Promise.allSettled([
        partyService.getUserParty(),
        locationService.getCurrentLocation(),
        newsService.getUserNews(),
      ]);

      // Process party response
      let party: PartyInterface | undefined;
      if (partyResponse.status === 'fulfilled' && partyResponse.value.success && partyResponse.value.party) {
        party = partyResponse.value.party;
      } else {
        errors.party = partyResponse.status === 'fulfilled' 
          ? partyResponse.value.messageKey || 'Failed to fetch party'
          : partyResponse.reason?.message || 'Failed to fetch party';
      }

      // Process location response
      let location: LocationData | undefined;
      if (locationResponse.status === 'fulfilled' && locationResponse.value.success && locationResponse.value.location) {
        location = locationResponse.value.location;
      } else {
        errors.location = locationResponse.status === 'fulfilled'
          ? locationResponse.value.messageKey || 'Failed to fetch location'
          : locationResponse.reason?.message || 'Failed to fetch location';
      }

      // Process news response
      let news: News[] = [];
      let unseenNews: News[] = [];
      if (newsResponse.status === 'fulfilled' && newsResponse.value.success) {
        news = newsResponse.value.news || [];
        unseenNews = newsResponse.value.unseenNews || [];
      } else {
        errors.news = newsResponse.status === 'fulfilled'
          ? newsResponse.value.messageKey || 'Failed to fetch news'
          : newsResponse.reason?.message || 'Failed to fetch news';
      }

      // Extract game time from location response (preferred) or news
      let gameTime: GameTimeInterface | undefined = location?.gameTime;
      if (!gameTime && news.length > 0) {
        gameTime = news[0].ts;
      }

      // If we have all critical data, return success
      if (party && location) {
        return {
          success: true,
          data: {
            party,
            location,
            news,
            unseenNews,
            gameTime,
          },
          errors: Object.keys(errors).length > 0 ? errors : undefined,
        };
      }

      // Otherwise, return failure
      return {
        success: false,
        errors,
      };
    } catch (error) {
      console.error("Fetch game data error:", error);
      return {
        success: false,
        errors: {
          party: error instanceof Error ? error.message : "Unknown error",
        },
      };
    }
  }
}

// Export singleton instance
export const gameDataService = new GameDataService();
export default gameDataService;

