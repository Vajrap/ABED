import { Elysia, t } from "elysia";
import { BattleSimulatorService } from '../services/BattleSimulatorService';
import { PresetService } from '../services/PresetService';
import type { SimulateBattleRequest, SavePresetRequest } from '../types/requests';
import type { BattleMetadataResponse, PresetsResponse } from '../types/responses';
import { RaceEnum, ClassEnum } from 'src/InterFacesEnumsAndTypes/Enums';
import { MOBEnum } from 'src/Entity/Character/MOBs/enums';
import { LocationsEnum } from 'src/InterFacesEnumsAndTypes/Enums/Location';
import { BattleType } from 'src/Entity/Battle/types';
import { skillRepository } from 'src/Entity/Skill/repository';
import { equipmentRepository } from 'src/Entity/Item/Equipment/repository';
import { locationRepository } from 'src/Entity/Location/repository';
import { mobRepository } from 'src/Entity/Character/MOBs/repository';
import Report from 'src/Utils/Reporter';

export const playgroundRoutes = new Elysia({ prefix: "/playground" })
  .onError(({ code, error, set }) => {
    if (code === "VALIDATION") {
      Report.warn("Playground validation error", {
        error: error.message,
        code,
      });
      set.status = 400;
      return { error: "Validation error" };
    }
    const errorMessage = error instanceof Error ? error.message : String(error);
    Report.error("Playground route error", {
      code,
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    });
    set.status = 500;
    return { error: errorMessage };
  })
  /**
   * GET /api/playground/metadata
   * Returns available races, classes, MOBs, skills, equipment, locations, and battle types
   */
  .get('/metadata', async ({ set }) => {
    try {
      // Get races
      const races = Object.values(RaceEnum).map(race => ({
        id: race,
        name: { en: race, th: race } // TODO: Add proper L10N
      }));

      // Get classes
      const classes = Object.values(ClassEnum).map(cls => ({
        id: cls,
        name: cls
      }));

      // Get MOBs
      // Temporarily patch Bun.randomUUIDv7 if not available (for Docker environments)
      const originalBunRandomUUIDv7 = (typeof Bun !== 'undefined' && typeof (Bun as any).randomUUIDv7 === 'function') 
        ? (Bun as any).randomUUIDv7 
        : undefined;
      
      if (typeof Bun !== 'undefined' && typeof (Bun as any).randomUUIDv7 !== 'function') {
        (Bun as any).randomUUIDv7 = () => crypto.randomUUID();
      }
      
      const mobs = Object.entries(mobRepository).map(([mobId, factory]) => {
        try {
          // Create a temporary instance to get name and details
          const tempChar = factory(3);
          return {
            id: mobId,
            name: tempChar.name,
            race: tempChar.race,
            class: undefined, // MOBs don't have explicit class
          };
        } catch (error) {
          Report.error('Error creating MOB instance for metadata', { mobId, error });
          // Fallback if MOB creation fails
          const nameFromId = mobId
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
          return {
            id: mobId,
            name: { en: nameFromId, th: nameFromId },
            race: RaceEnum.Human, // Default fallback
            class: undefined,
          };
        }
      });
      
      // Restore original if we patched it
      if (originalBunRandomUUIDv7 === undefined && typeof Bun !== 'undefined') {
        delete (Bun as any).randomUUIDv7;
      } else if (originalBunRandomUUIDv7 && typeof Bun !== 'undefined') {
        (Bun as any).randomUUIDv7 = originalBunRandomUUIDv7;
      }

      // Get skills
      const skills = Object.entries(skillRepository)
        .filter(([_, skill]) => skill && typeof skill === 'object' && 'name' in skill)
        .map(([skillId, skill]) => ({
          id: skillId as string,
          name: skill.name,
          class: skill.class,
          tier: skill.tier?.toString() || '1',
        }));

      // Get equipment
      const equipment = Object.entries(equipmentRepository).map(([equipId, equip]) => {
        // Determine if it's a weapon or armor based on slot
        // Weapon slots: weapon, shield, etc. Armor slots: body, head, etc.
        const weaponSlots = ['weapon', 'shield'] as string[];
        const isWeapon = weaponSlots.includes(equip.slot) || equip.constructor.name.includes('Weapon');
        return {
          id: equipId,
          name: equip.name,
          slot: equip.slot,
          type: (isWeapon ? 'weapon' : 'armor') as 'weapon' | 'armor',
        };
      });

      // Get locations
      const locations = Object.entries(locationRepository).map(([locId, location]) => ({
        id: locId as LocationsEnum,
        name: location.name,
      }));

      // Get battle types
      const battleTypes = Object.values(BattleType).map(type => ({
        id: type,
        name: type,
      }));

      const response: BattleMetadataResponse = {
        races,
        classes,
        mobs,
        skills,
        equipment,
        locations,
        battleTypes,
      };

      return response;
    } catch (error) {
      Report.error('Error fetching battle metadata', { error });
      set.status = 500;
      return { error: 'Failed to fetch metadata' };
    }
  })
  /**
   * POST /api/playground/simulate
   * Run a battle simulation
   */
  .post(
    '/simulate',
    async ({ body, set }) => {
      try {
        const request = body as SimulateBattleRequest;

        // Validate request
        if (!request.partyA || !request.partyB || !request.location || !request.battleType) {
          set.status = 400;
          return { error: 'Missing required fields: partyA, partyB, location, battleType' };
        }

        // Validate party configurations
        if (request.partyA.length === 0 || request.partyB.length === 0) {
          set.status = 400;
          return { error: 'Both parties must have at least one character' };
        }

        if (request.partyA.length > 6 || request.partyB.length > 6) {
          set.status = 400;
          return { error: 'Each party can have at most 6 characters' };
        }

        // Run simulation
        const result = await BattleSimulatorService.simulateBattle(request);

        // Optionally save as preset
        if (request.presetName && request.presetName.trim()) {
          PresetService.savePreset({
            name: request.presetName,
            partyA: request.partyA,
            partyB: request.partyB,
            location: request.location,
            battleType: request.battleType,
          });
        }

        return result;
      } catch (error) {
        Report.error('Error simulating battle', { error });
        set.status = 500;
        return { error: error instanceof Error ? error.message : 'Failed to simulate battle' };
      }
    },
    {
      body: t.Object({
        partyA: t.Array(t.Any()),
        partyB: t.Array(t.Any()),
        location: t.String(),
        battleType: t.String(),
        presetName: t.Optional(t.String()),
      }),
    }
  )
  /**
   * GET /api/playground/presets
   * Get all available presets
   */
  .get('/presets', async ({ set }) => {
    try {
      const presets = PresetService.getPresets();
      const response: PresetsResponse = { presets };
      return response;
    } catch (error) {
      Report.error('Error fetching presets', { error });
      set.status = 500;
      return { error: 'Failed to fetch presets' };
    }
  })
  /**
   * POST /api/playground/presets
   * Save a custom preset
   */
  .post(
    '/presets',
    async ({ body, set }) => {
      try {
        const request = body as SavePresetRequest;

        if (!request.name || !request.partyA || !request.partyB || !request.location || !request.battleType) {
          set.status = 400;
          return { error: 'Missing required fields' };
        }

        const preset = PresetService.savePreset(request);
        return preset;
      } catch (error) {
        Report.error('Error saving preset', { error });
        set.status = 500;
        return { error: 'Failed to save preset' };
      }
    },
    {
      body: t.Object({
        name: t.String(),
        partyA: t.Array(t.Any()),
        partyB: t.Array(t.Any()),
        location: t.String(),
        battleType: t.String(),
      }),
    }
  )
  /**
   * DELETE /api/playground/presets/:id
   * Delete a custom preset
   */
  .delete(
    '/presets/:id',
    async ({ params, set }) => {
      try {
        const { id } = params;
        if (!id) {
          set.status = 400;
          return { error: 'Preset ID is required' };
        }
        const deleted = PresetService.deletePreset(id);

        if (!deleted) {
          set.status = 404;
          return { error: 'Preset not found or cannot be deleted' };
        }

        return { success: true, id };
      } catch (error) {
        Report.error('Error deleting preset', { error });
        set.status = 500;
        return { error: 'Failed to delete preset' };
      }
    }
  );
