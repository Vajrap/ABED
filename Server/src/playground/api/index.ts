import express, { type Request, type Response } from 'express';
import { BattleSimulatorService } from '../services/BattleSimulatorService';
import { PresetService } from '../services/PresetService';
import type { SimulateBattleRequest, SavePresetRequest } from '../types/requests';
import type { BattleMetadataResponse, PresetsResponse } from '../types/responses';
import { RaceEnum, ClassEnum, CharacterEquipmentSlot } from 'src/InterFacesEnumsAndTypes/Enums';
import { MOBs } from 'src/Entity/Character/MOBs/enums';
import { LocationsEnum } from 'src/InterFacesEnumsAndTypes/Enums/Location';
import { BattleType } from 'src/Entity/Battle/types';
import { skillRepository } from 'src/Entity/Skill/repository';
import type { SkillId } from 'src/Entity/Skill/enums';
import { equipmentRepository } from 'src/Entity/Item/Equipment/repository';
import { locationRepository } from 'src/Entity/Location/Location/repository';
import { mobRepository } from 'src/Entity/Character/MOBs/repository';
import Report from 'src/Utils/Reporter';

export const playgroundRoutes = express.Router();

/**
 * GET /api/playground/metadata
 * Returns available races, classes, MOBs, skills, equipment, locations, and battle types
 */
playgroundRoutes.get('/metadata', async (req: Request, res: Response) => {
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

    res.json(response);
  } catch (error) {
    Report.error('Error fetching battle metadata', { error });
    res.status(500).json({ error: 'Failed to fetch metadata' });
  }
});

/**
 * POST /api/playground/simulate
 * Run a battle simulation
 */
playgroundRoutes.post('/simulate', async (req: Request, res: Response) => {
  try {
    const request = req.body as SimulateBattleRequest;

    // Validate request
    if (!request.partyA || !request.partyB || !request.location || !request.battleType) {
      return res.status(400).json({ error: 'Missing required fields: partyA, partyB, location, battleType' });
    }

    // Validate party configurations
    if (request.partyA.length === 0 || request.partyB.length === 0) {
      return res.status(400).json({ error: 'Both parties must have at least one character' });
    }

    if (request.partyA.length > 6 || request.partyB.length > 6) {
      return res.status(400).json({ error: 'Each party can have at most 6 characters' });
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

    res.json(result);
  } catch (error) {
    Report.error('Error simulating battle', { error });
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to simulate battle' });
  }
});

/**
 * GET /api/playground/presets
 * Get all available presets
 */
playgroundRoutes.get('/presets', async (req: Request, res: Response) => {
  try {
    const presets = PresetService.getPresets();
    const response: PresetsResponse = { presets };
    res.json(response);
  } catch (error) {
    Report.error('Error fetching presets', { error });
    res.status(500).json({ error: 'Failed to fetch presets' });
  }
});

/**
 * POST /api/playground/presets
 * Save a custom preset
 */
playgroundRoutes.post('/presets', async (req: Request, res: Response) => {
  try {
    const request = req.body as SavePresetRequest;

    if (!request.name || !request.partyA || !request.partyB || !request.location || !request.battleType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const preset = PresetService.savePreset(request);
    res.json(preset);
  } catch (error) {
    Report.error('Error saving preset', { error });
    res.status(500).json({ error: 'Failed to save preset' });
  }
});

/**
 * DELETE /api/playground/presets/:id
 * Delete a custom preset
 */
playgroundRoutes.delete('/presets/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Preset ID is required' });
    }
    const deleted = PresetService.deletePreset(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Preset not found or cannot be deleted' });
    }

    res.json({ success: true, id });
  } catch (error) {
    Report.error('Error deleting preset', { error });
    res.status(500).json({ error: 'Failed to delete preset' });
  }
});

