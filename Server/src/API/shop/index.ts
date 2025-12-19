import { Elysia, t } from "elysia";
import Report from "../../Utils/Reporter";
import { SessionService } from "../../Services/SessionService";
import { characterManager } from "../../Game/CharacterManager";
import { shopRepository } from "../../Entity/Shop/ShopRepository";
import { CharacterService } from "../../Services/CharacterService";
import { getItem } from "../../Entity/Item/repository";
import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import { GoldId } from "src/Entity/Item";

export const shopRoutes = new Elysia({ prefix: "/shop" })
  .onError(({ code, error, set }) => {
    Report.error("Shop API error", {
      code,
      error: error instanceof Error ? error.message : String(error),
    });
    set.status = 500;
    return { success: false, error: "Internal server error" };
  })
  .get(
    "/list/:locationId",
    async ({ params, headers, set }) => {
      try {
        // Validate session
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

        // Get shops at location
        const shops = shopRepository.getShopsByLocation(params.locationId as LocationsEnum);
        
        // Initialize shops if none exist
        if (shops.length === 0) {
          shopRepository.initializeLocationShops(params.locationId as LocationsEnum);
          const newShops = shopRepository.getShopsByLocation(params.locationId as LocationsEnum);
          return {
            success: true,
            shops: newShops.map(shop => ({
              id: shop.id,
              shopType: shop.shopType,
              locationId: shop.locationId,
            })),
          };
        }

        return {
          success: true,
          shops: shops.map(shop => ({
            id: shop.id,
            shopType: shop.shopType,
            locationId: shop.locationId,
          })),
        };
      } catch (error) {
        Report.error("Error listing shops", {
          error: error instanceof Error ? error.message : String(error),
        });
        set.status = 500;
        return { success: false, error: "Internal server error" };
      }
    }
  )
  .get(
    "/inventory/:shopId",
    async ({ params, headers, set }) => {
      try {
        // Validate session
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

        // Get shop inventory with prices
        const inventory = shopRepository.getShopInventory(params.shopId);
        
        // Enrich with item names
        const enrichedInventory = inventory.map(item => {
          const itemData = getItem(item.itemId);
          return {
            itemId: item.itemId,
            name: itemData?.name || { en: item.itemId, th: item.itemId },
            quantity: item.quantity,
            basePrice: item.basePrice,
            currentPrice: item.currentPrice,
          };
        });

        return {
          success: true,
          inventory: enrichedInventory,
        };
      } catch (error) {
        Report.error("Error getting shop inventory", {
          error: error instanceof Error ? error.message : String(error),
        });
        set.status = 500;
        return { success: false, error: "Internal server error" };
      }
    }
  )
  .post(
    "/buy",
    async ({ body, headers, set }) => {
      try {
        // Validate session
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

        // Get character
        const character = characterManager.getUserCharacterByUserId(user.id);
        if (!character) {
          set.status = 404;
          return { success: false, error: "Character not found" };
        }

        // Get shop
        const shop = shopRepository.getShop(body.shopId);
        if (!shop) {
          set.status = 404;
          return { success: false, error: "Shop not found" };
        }

        // Check if item is in stock
        if (!shop.hasItem(body.itemId as any)) {
          set.status = 400;
          return { success: false, error: "Item out of stock" };
        }

        const availableQuantity = shop.getQuantity(body.itemId as any);
        if (availableQuantity < body.quantity) {
          set.status = 400;
          return { success: false, error: "Insufficient stock" };
        }

        // Calculate total cost
        const unitPrice = shop.getCurrentPrice(body.itemId as any);
        const totalCost = unitPrice * body.quantity;

        // Check if character has enough gold
        const characterGold = character.inventory.get(GoldId.gold) || 0;
        if (characterGold < totalCost) {
          set.status = 400;
          return { success: false, error: "Insufficient gold" };
        } else {
          character.inventory.set(GoldId.gold, characterGold - totalCost);
        }

        // Remove item from shop inventory
        shop.removeItem(body.itemId as any, body.quantity);

        // Add item to character inventory
        const currentQuantity = character.inventory.get(body.itemId) || 0;
        character.inventory.set(body.itemId, currentQuantity + body.quantity);

        // Update quest progress for collect objectives
        const { QuestProgressTracker } = await import("../../Entity/Quest/QuestProgressTracker");
        QuestProgressTracker.onItemAcquired(character, body.itemId as any, body.quantity, "purchase");

        const gold = character.inventory.get(GoldId.gold) || 0;
        if (gold < totalCost) {
          set.status = 400;
          return { success: false, error: "Insufficient gold" };
        }
        character.inventory.set(GoldId.gold, gold - totalCost);

        // Persist character to database
        await CharacterService.updateCharacterInDatabase(character);

        return {
          success: true,
          message: "Item purchased successfully",
          totalCost,
        };
      } catch (error) {
        Report.error("Error buying item", {
          error: error instanceof Error ? error.message : String(error),
        });
        set.status = 500;
        return { success: false, error: "Internal server error" };
      }
    },
    {
      body: t.Object({
        shopId: t.String(),
        itemId: t.String(),
        quantity: t.Number({ minimum: 1 }),
      }),
    }
  )
  .post(
    "/sell",
    async ({ body, headers, set }) => {
      try {
        // Validate session
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

        // Get character
        const character = characterManager.getUserCharacterByUserId(user.id);
        if (!character) {
          set.status = 404;
          return { success: false, error: "Character not found" };
        }

        // Check if character has the item
        const characterQuantity = character.inventory.get(body.itemId) || 0;
        if (characterQuantity < body.quantity) {
          set.status = 400;
          return { success: false, error: "Insufficient items in inventory" };
        }

        // Get shop
        const shop = shopRepository.getShop(body.shopId);
        if (!shop) {
          set.status = 404;
          return { success: false, error: "Shop not found" };
        }

        // Calculate sell price (typically 50% of buy price)
        const buyPrice = shop.getCurrentPrice(body.itemId as any);
        const sellPrice = Math.round(buyPrice * 0.5); // 50% of buy price
        const totalValue = sellPrice * body.quantity;

        // Remove item from character inventory
        const newQuantity = characterQuantity - body.quantity;
        if (newQuantity <= 0) {
          character.inventory.delete(body.itemId);
        } else {
          character.inventory.set(body.itemId, newQuantity);
        }

        // Add item to shop inventory
        shop.addItem(body.itemId as any, body.quantity);

        // Add gold to character
        const characterGold = character.inventory.get(GoldId.gold) || 0;
        character.inventory.set(GoldId.gold, characterGold + totalValue);

        // Persist character to database
        await CharacterService.updateCharacterInDatabase(character);

        return {
          success: true,
          message: "Item sold successfully",
          totalValue,
        };
      } catch (error) {
        Report.error("Error selling item", {
          error: error instanceof Error ? error.message : String(error),
        });
        set.status = 500;
        return { success: false, error: "Internal server error" };
      }
    },
    {
      body: t.Object({
        shopId: t.String(),
        itemId: t.String(),
        quantity: t.Number({ minimum: 1 }),
      }),
    }
  );

