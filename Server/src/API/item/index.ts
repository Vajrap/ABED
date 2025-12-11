import { Elysia, t } from "elysia";
import Report from "../../Utils/Reporter";
import { SessionService } from "../../Services/SessionService";
import { characterManager } from "../../Game/CharacterManager";
import { CharacterEquipmentSlot } from "../../InterFacesEnumsAndTypes/Enums";
import { equip } from "../../Utils/equip";
import { remove } from "../../Entity/Item/Equipment/remove";
import { consumableRepository } from "../../Entity/Item/Consumable/repository";
import { CharacterService } from "../../Services/CharacterService";
import type { ConsumableId } from "../../Entity/Item/Consumable/index";

export const itemRoutes = new Elysia({ prefix: "/item" })
  .onError(({ code, error, set }) => {
    Report.error("Item API error", {
      code,
      error: error instanceof Error ? error.message : String(error),
    });
    set.status = 500;
    return { success: false, error: "Internal server error" };
  })
  .post(
    "/equip",
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

        // Validate character ownership
        if (character.id !== body.characterId) {
          set.status = 403;
          return { success: false, error: "Character ownership mismatch" };
        }

        // Equip item
        const success = equip(character, body.itemId as any, body.slot);
        if (!success) {
          set.status = 400;
          return { success: false, error: "Failed to equip item" };
        }

        // Persist to database
        await CharacterService.updateCharacterInDatabase(character);

        return { success: true, message: "Item equipped successfully" };
      } catch (error) {
        Report.error("Error equipping item", {
          error: error instanceof Error ? error.message : String(error),
        });
        set.status = 500;
        return { success: false, error: "Internal server error" };
      }
    },
    {
      body: t.Object({
        characterId: t.String(),
        itemId: t.String(),
        slot: t.Enum(CharacterEquipmentSlot),
      }),
    }
  )
  .post(
    "/unequip",
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

        // Validate character ownership
        if (character.id !== body.characterId) {
          set.status = 403;
          return { success: false, error: "Character ownership mismatch" };
        }

        // Get equipped item
        const equippedItemId = character.equipments[body.slot];
        if (!equippedItemId) {
          set.status = 400;
          return { success: false, error: "No item equipped in slot" };
        }

        // Unequip item
        const success = remove(character, equippedItemId, body.slot);
        if (!success) {
          set.status = 400;
          return { success: false, error: "Failed to unequip item" };
        }

        // Persist to database
        await CharacterService.updateCharacterInDatabase(character);

        return { success: true, message: "Item unequipped successfully" };
      } catch (error) {
        Report.error("Error unequipping item", {
          error: error instanceof Error ? error.message : String(error),
        });
        set.status = 500;
        return { success: false, error: "Internal server error" };
      }
    },
    {
      body: t.Object({
        characterId: t.String(),
        slot: t.Enum(CharacterEquipmentSlot),
      }),
    }
  )
  .get(
    "/inventory/:characterId",
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

        // Get character
        const character = characterManager.getUserCharacterByUserId(user.id);
        if (!character) {
          set.status = 404;
          return { success: false, error: "Character not found" };
        }

        // Validate character ownership
        if (character.id !== params.characterId) {
          set.status = 403;
          return { success: false, error: "Character ownership mismatch" };
        }

        // Convert inventory Map to object
        const inventory: Record<string, number> = {};
        for (const [itemId, quantity] of character.inventory.entries()) {
          inventory[itemId] = quantity;
        }

        // Convert resources Map to object
        const resources: Record<string, number> = {};
        for (const [resourceType, amount] of character.materialResources.entries()) {
          resources[resourceType] = amount;
        }

        return {
          success: true,
          inventory,
          resources,
          equipments: character.equipments,
        };
      } catch (error) {
        Report.error("Error getting inventory", {
          error: error instanceof Error ? error.message : String(error),
        });
        set.status = 500;
        return { success: false, error: "Internal server error" };
      }
    }
  )
  .post(
    "/use-consumable",
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

        // Validate character ownership
        if (character.id !== body.characterId) {
          set.status = 403;
          return { success: false, error: "Character ownership mismatch" };
        }

        // Check if item exists in inventory
        const itemQuantity = character.inventory.get(body.itemId) || 0;
        if (itemQuantity === 0) {
          set.status = 400;
          return { success: false, error: "Item not found in inventory" };
        }

        // Get consumable from repository
        const consumable = consumableRepository[body.itemId as ConsumableId];
        if (!consumable) {
          set.status = 400;
          return { success: false, error: "Item is not a consumable" };
        }

        // Use consumable (apply effects)
        if ('consume' in consumable && typeof consumable.consume === 'function') {
          consumable.consume(character);
        } else {
          set.status = 400;
          return { success: false, error: "Consumable does not have use function" };
        }

        // Remove item from inventory
        const newQuantity = itemQuantity - 1;
        if (newQuantity <= 0) {
          character.inventory.delete(body.itemId);
        } else {
          character.inventory.set(body.itemId, newQuantity);
        }

        // Persist to database
        await CharacterService.updateCharacterInDatabase(character);

        return { success: true, message: "Consumable used successfully" };
      } catch (error) {
        Report.error("Error using consumable", {
          error: error instanceof Error ? error.message : String(error),
        });
        set.status = 500;
        return { success: false, error: "Internal server error" };
      }
    },
    {
      body: t.Object({
        characterId: t.String(),
        itemId: t.String(),
      }),
    }
  );

