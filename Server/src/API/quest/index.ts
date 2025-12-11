import { Elysia, t } from "elysia";
import Report from "../../Utils/Reporter";
import { SessionService } from "../../Services/SessionService";
import { characterManager } from "../../Game/CharacterManager";
import { CharacterService } from "../../Services/CharacterService";
import { QuestOfferService } from "../../Services/QuestOfferService";
import { handleGuildAction } from "../../Entity/Location/Events/handlers/special/guild";
import { locationManager } from "../../Entity/Location/Manager/LocationManager";

export const questRoutes = new Elysia({ prefix: "/quest" })
  .onError(({ code, error, set }) => {
    Report.error("Quest API error", {
      code,
      error: error instanceof Error ? error.message : String(error),
    });
    set.status = 500;
    return { success: false, error: "Internal server error" };
  })
  .get(
    "/offers",
    async ({ headers, set }) => {
      try {
        const authHeader = headers.authorization;
        const token = authHeader?.split(" ")[1];
        
        if (!token) {
          set.status = 401;
          return { success: false, error: "No authentication token provided" };
        }

        const user = await SessionService.validateSession(token);
        if (!user) {
          set.status = 401;
          return { success: false, error: "Invalid session" };
        }

        const character = characterManager.getUserCharacterByUserId(user.id);
        if (!character) {
          set.status = 404;
          return { success: false, error: "Character not found" };
        }

        // Check for expired offers and get pending ones
        const expiredNews = QuestOfferService.checkExpiredOffers(character);
        const pendingOffers = QuestOfferService.getPendingOffers(character);

        return {
          success: true,
          offers: pendingOffers.map(offer => ({
            id: offer.id,
            quest: {
              id: offer.quest.id,
              name: offer.quest.name,
              description: offer.quest.description,
              type: offer.quest.type,
              tier: offer.quest.tier,
              objectives: offer.quest.objectives,
              rewards: offer.quest.rewards,
            },
            offeredAt: offer.offeredAt.toISOString(),
            expiresAt: offer.expiresAt.toISOString(),
            status: offer.status,
            giverId: offer.giverId,
            locationId: offer.locationId,
          })),
          expiredCount: expiredNews.length,
        };
      } catch (error) {
        Report.error("Error fetching quest offers", {
          error: error instanceof Error ? error.message : String(error),
        });
        set.status = 500;
        return { success: false, error: "Internal server error" };
      }
    }
  )
  .post(
    "/accept/:offerId",
    async ({ params, headers, set }) => {
      try {
        const authHeader = headers.authorization;
        const token = authHeader?.split(" ")[1];
        
        if (!token) {
          set.status = 401;
          return { success: false, error: "No authentication token provided" };
        }

        const user = await SessionService.validateSession(token);
        if (!user) {
          set.status = 401;
          return { success: false, error: "Invalid session" };
        }

        const character = characterManager.getUserCharacterByUserId(user.id);
        if (!character) {
          set.status = 404;
          return { success: false, error: "Character not found" };
        }

        // Check for expired offers first
        QuestOfferService.checkExpiredOffers(character);

        const offer = character.questOffers.get(params.offerId);
        if (!offer) {
          set.status = 404;
          return { success: false, error: "Quest offer not found" };
        }

        if (!offer.canAccept()) {
          set.status = 400;
          return { 
            success: false, 
            error: offer.isExpired() ? "Quest offer has expired" : "Quest offer cannot be accepted" 
          };
        }

        // Get location context for handler
        if (!character.location) {
          set.status = 400;
          return { success: false, error: "Character has no location" };
        }

        const location = locationManager.locations[character.location];
        if (!location) {
          set.status = 400;
          return { success: false, error: "Location not found" };
        }

        const context = {
          region: location.region,
          subRegion: location.subRegion,
          location: character.location,
          partyId: character.partyID || "",
          characterIds: [character.id],
        };

        // Accept the quest via handler
        const news = handleGuildAction(character, context, "acceptQuest", params.offerId);
        
        // Save character
        await CharacterService.updateCharacterInDatabase(character);

        return {
          success: true,
          message: "Quest accepted successfully",
          questId: offer.quest.id,
          news: news.map(n => ({
            content: n.content,
            significance: n.significance,
          })),
        };
      } catch (error) {
        Report.error("Error accepting quest", {
          error: error instanceof Error ? error.message : String(error),
        });
        set.status = 500;
        return { success: false, error: "Internal server error" };
      }
    },
    {
      params: t.Object({
        offerId: t.String(),
      }),
    }
  )
  .post(
    "/decline/:offerId",
    async ({ params, headers, set }) => {
      try {
        const authHeader = headers.authorization;
        const token = authHeader?.split(" ")[1];
        
        if (!token) {
          set.status = 401;
          return { success: false, error: "No authentication token provided" };
        }

        const user = await SessionService.validateSession(token);
        if (!user) {
          set.status = 401;
          return { success: false, error: "Invalid session" };
        }

        const character = characterManager.getUserCharacterByUserId(user.id);
        if (!character) {
          set.status = 404;
          return { success: false, error: "Character not found" };
        }

        const offer = character.questOffers.get(params.offerId);
        if (!offer) {
          set.status = 404;
          return { success: false, error: "Quest offer not found" };
        }

        // Mark as declined and remove
        offer.status = "declined";
        character.questOffers.delete(params.offerId);

        await CharacterService.updateCharacterInDatabase(character);

        return {
          success: true,
          message: "Quest offer declined",
        };
      } catch (error) {
        Report.error("Error declining quest", {
          error: error instanceof Error ? error.message : String(error),
        });
        set.status = 500;
        return { success: false, error: "Internal server error" };
      }
    },
    {
      params: t.Object({
        offerId: t.String(),
      }),
    }
  )
  .get(
    "/active",
    async ({ headers, set }) => {
      try {
        const authHeader = headers.authorization;
        const token = authHeader?.split(" ")[1];
        
        if (!token) {
          set.status = 401;
          return { success: false, error: "No authentication token provided" };
        }

        const user = await SessionService.validateSession(token);
        if (!user) {
          set.status = 401;
          return { success: false, error: "Invalid session" };
        }

        const character = characterManager.getUserCharacterByUserId(user.id);
        if (!character) {
          set.status = 404;
          return { success: false, error: "Character not found" };
        }

        const activeQuests = Array.from(character.quests.active.values());

        return {
          success: true,
          quests: activeQuests.map(quest => ({
            id: quest.id,
            name: quest.name,
            description: quest.description,
            type: quest.type,
            tier: quest.tier,
            objectives: quest.objectives,
            rewards: quest.rewards,
            status: quest.status,
            locationId: quest.locationId,
          })),
        };
      } catch (error) {
        Report.error("Error fetching active quests", {
          error: error instanceof Error ? error.message : String(error),
        });
        set.status = 500;
        return { success: false, error: "Internal server error" };
      }
    }
  )
  .post(
    "/turnIn/:questId",
    async ({ params, headers, set }) => {
      try {
        const authHeader = headers.authorization;
        const token = authHeader?.split(" ")[1];
        
        if (!token) {
          set.status = 401;
          return { success: false, error: "No authentication token provided" };
        }

        const user = await SessionService.validateSession(token);
        if (!user) {
          set.status = 401;
          return { success: false, error: "Invalid session" };
        }

        const character = characterManager.getUserCharacterByUserId(user.id);
        if (!character) {
          set.status = 404;
          return { success: false, error: "Character not found" };
        }

        if (!character.location) {
          set.status = 400;
          return { success: false, error: "Character has no location" };
        }

        const location = locationManager.locations[character.location];
        if (!location) {
          set.status = 400;
          return { success: false, error: "Location not found" };
        }

        const context = {
          region: location.region,
          subRegion: location.subRegion,
          location: character.location,
          partyId: character.partyID || "",
          characterIds: [character.id],
        };

        // Turn in quest via handler
        const news = handleGuildAction(character, context, "turnInQuest", params.questId);
        
        await CharacterService.updateCharacterInDatabase(character);

        return {
          success: true,
          message: "Quest turned in successfully",
          news: news.map(n => ({
            content: n.content,
            significance: n.significance,
          })),
        };
      } catch (error) {
        Report.error("Error turning in quest", {
          error: error instanceof Error ? error.message : String(error),
        });
        set.status = 500;
        return { success: false, error: "Internal server error" };
      }
    },
    {
      params: t.Object({
        questId: t.String(),
      }),
    }
  );

