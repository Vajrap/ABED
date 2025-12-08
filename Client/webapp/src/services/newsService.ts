// News service for fetching and managing news data
import { restHandler } from './RestHandler';
import type { News } from '@/types/api';

export interface NewsResponse {
  success: boolean;
  news?: News[];
  unseenNews?: News[];
  messageKey?: string;
}

export interface MarkReadResponse {
  success: boolean;
  messageKey?: string;
}

class NewsService {
  /**
   * Get all news and unseen news for the logged-in user's character
   */
  async getUserNews(): Promise<NewsResponse> {
    try {
      const response = await restHandler.get<NewsResponse>(
        "/api/news/user",
        true // requireAuth
      );
      return response;
    } catch (error) {
      console.error("Get user news error:", error);
      return {
        success: false,
        messageKey: error instanceof Error ? error.message : "news.fetchFailed",
      };
    }
  }

  /**
   * Mark a news item as read
   */
  async markAsRead(newsId: string): Promise<MarkReadResponse> {
    try {
      const response = await restHandler.post<{ newsId: string }, MarkReadResponse>(
        "/api/news/markRead",
        { newsId },
        true // requireAuth
      );
      return response;
    } catch (error) {
      console.error("Mark news as read error:", error);
      return {
        success: false,
        messageKey: error instanceof Error ? error.message : "news.markReadFailed",
      };
    }
  }
}

// Export singleton instance
export const newsService = new NewsService();
export default newsService;

