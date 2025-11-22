import { defaultPresets } from "../presets/defaultPresets";
import type { PresetInfo } from "../types/responses";
import type { CharacterConfig, SavePresetRequest } from "../types/requests";

/**
 * Service for managing battle presets
 * Stores custom presets in memory (can be extended to file-based storage)
 */
export class PresetService {
  private static customPresets: Map<string, PresetInfo> = new Map();

  /**
   * Get all presets (default + custom)
   */
  static getPresets(): PresetInfo[] {
    return [...defaultPresets, ...Array.from(this.customPresets.values())];
  }

  /**
   * Get a specific preset by ID
   */
  static getPreset(id: string): PresetInfo | undefined {
    // Check default presets first
    const defaultPreset = defaultPresets.find(p => p.id === id);
    if (defaultPreset) {
      return defaultPreset;
    }
    
    // Check custom presets
    return this.customPresets.get(id);
  }

  /**
   * Save a custom preset
   */
  static savePreset(request: SavePresetRequest): PresetInfo {
    // Generate UUID with fallback for environments where Bun.randomUUIDv7 is not available
    const generateId = () => {
      if (typeof Bun !== 'undefined' && typeof (Bun as any).randomUUIDv7 === 'function') {
        return (Bun as any).randomUUIDv7();
      }
      return crypto.randomUUID();
    };

    const preset: PresetInfo = {
      id: `custom_${generateId()}`,
      name: request.name,
      description: request.description,
      isDefault: false,
      partyA: request.partyA,
      partyB: request.partyB,
      location: request.location,
      battleType: request.battleType,
    };

    this.customPresets.set(preset.id, preset);
    return preset;
  }

  /**
   * Delete a custom preset
   */
  static deletePreset(id: string): boolean {
    // Don't allow deleting default presets
    if (defaultPresets.some(p => p.id === id)) {
      return false;
    }
    
    return this.customPresets.delete(id);
  }

  /**
   * Update an existing custom preset
   */
  static updatePreset(id: string, request: Partial<SavePresetRequest>): PresetInfo | null {
    const preset = this.customPresets.get(id);
    if (!preset) {
      return null;
    }

    const updated: PresetInfo = {
      ...preset,
      name: request.name ?? preset.name,
      description: request.description ?? preset.description,
      partyA: request.partyA ?? preset.partyA,
      partyB: request.partyB ?? preset.partyB,
      location: request.location ?? preset.location,
      battleType: request.battleType ?? preset.battleType,
    };

    this.customPresets.set(id, updated);
    return updated;
  }
}

