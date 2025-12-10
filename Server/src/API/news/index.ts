import { Elysia, t } from "elysia";
import Report from "../../Utils/Reporter";
import { SessionService } from "../../Services/SessionService";
import { characterManager } from "../../Game/CharacterManager";
import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";

// Schema for markRead request
const MarkReadSchema = t.Object({
  newsId: t.String({ minLength: 1 }),
});

export const newsRoutes = new Elysia({ prefix: "/news" })
  .onError(({ code, error, set }) => {
    if (code === "VALIDATION") {
      Report.warn("News route validation error", {
        error: error.message,
        code,
      });
      set.status = 400;
      return { success: false, messageKey: "news.validationError" };
    }
    throw error;
  })
  /**
   * GET /api/news/user
   * Get news for the logged-in user's character
   * Returns both all news and unseen news at character's location
   */
  .get("/user", async ({ headers, set }) => {
    Report.debug("User news request received", {
      route: "/news/user",
    });

    try {
      // 1. Validate session
      const authHeader = headers.authorization;
      const token = authHeader?.split(" ")[1];
      
      if (!token) {
        set.status = 401;
        return { success: false, messageKey: "auth.noToken" };
      }

      const user = await SessionService.validateSession(token);
      if (!user) {
        set.status = 401;
        return { success: false, messageKey: "auth.invalidSession" };
      }

      // 2. Get character from in-memory manager
      const character = characterManager.getUserCharacterByUserId(user.id);
      if (!character) {
        Report.warn("Character not found for user", { userId: user.id });
        set.status = 404;
        return { success: false, messageKey: "character.notFound" };
      }

      // 3. Get party to find location
      if (!character.partyID) {
        Report.warn("Character has no party ID", { characterId: character.id });
        set.status = 404;
        return { success: false, messageKey: "party.notFound" };
      }

      // Import partyManager and newsArchiveService here to avoid circular dependencies
      const { partyManager } = await import("../../Game/PartyManager");
      const party = partyManager.getPartyByID(character.partyID);
      if (!party) {
        Report.warn("Party not found for character", {
          characterId: character.id,
          partyId: character.partyID,
        });
        set.status = 404;
        return { success: false, messageKey: "party.notFound" };
      }

      // 4. Get news from news archive
      const { newsArchiveService } = await import("../../Entity/News/NewsArchive");
      const location = party.location as LocationsEnum;

      // Get all news at location (that character can see)
      const allNews = newsArchiveService.getNewsForCharacter(
        character.id,
        location,
        {
          minFreshness: 0, // Get all news regardless of freshness
        }
      );

      // Get unseen news (only unread)
      const unseenNews = newsArchiveService.getNewsForCharacter(
        character.id,
        location,
        {
          onlyUnread: true,
          minFreshness: 0,
        }
      );

      return {
        success: true,
        news: allNews,
        unseenNews: unseenNews,
      };
    } catch (error) {
      Report.error("User news fetch error", {
        error,
      });
      set.status = 500;
      return { success: false, messageKey: "news.fetchFailed" };
    }
  })
  /**
   * POST /api/news/markRead
   * Mark a news item as read by the character
   */
  .post("/markRead", async ({ body, headers, set }) => {
    Report.debug("Mark news as read request received", {
      route: "/news/markRead",
    });

    try {
      // 1. Validate session
      const authHeader = headers.authorization;
      const token = authHeader?.split(" ")[1];
      
      if (!token) {
        set.status = 401;
        return { success: false, messageKey: "auth.noToken" };
      }

      const user = await SessionService.validateSession(token);
      if (!user) {
        set.status = 401;
        return { success: false, messageKey: "auth.invalidSession" };
      }

      // 2. Get character
      const character = characterManager.getUserCharacterByUserId(user.id);
      if (!character) {
        set.status = 404;
        return { success: false, messageKey: "character.notFound" };
      }

      // 3. Validate body (newsId)
      if (!body.newsId || typeof body.newsId !== 'string') {
        set.status = 400;
        return { success: false, messageKey: "news.invalidNewsId" };
      }

      // 4. Mark news as read
      const { newsArchiveService } = await import("../../Entity/News/NewsArchive");
      newsArchiveService.markAsRead(character.id, body.newsId);

      return {
        success: true,
      };
    } catch (error) {
      Report.error("Mark news as read error", {
        error,
      });
      set.status = 500;
      return { success: false, messageKey: "news.markReadFailed" };
    }
  }, {
    body: MarkReadSchema,
  });

