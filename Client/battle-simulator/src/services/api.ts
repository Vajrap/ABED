import type {
  BattleMetadataResponse,
  SimulateBattleRequest,
  SimulateBattleResponse,
  PresetsResponse,
  SavePresetRequest,
  PresetInfo,
} from './types';

const API_BASE = '/api/playground';

export class BattleSimulatorAPI {
  static async getMetadata(): Promise<BattleMetadataResponse> {
    const response = await fetch(`${API_BASE}/metadata`);
    if (!response.ok) {
      throw new Error('Failed to fetch metadata');
    }
    return response.json();
  }

  static async simulateBattle(request: SimulateBattleRequest): Promise<SimulateBattleResponse> {
    const response = await fetch(`${API_BASE}/simulate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to simulate battle' }));
      throw new Error(error.error || 'Failed to simulate battle');
    }
    return response.json();
  }

  static async getPresets(): Promise<PresetsResponse> {
    const response = await fetch(`${API_BASE}/presets`);
    if (!response.ok) {
      throw new Error('Failed to fetch presets');
    }
    return response.json();
  }

  static async savePreset(request: SavePresetRequest): Promise<PresetInfo> {
    const response = await fetch(`${API_BASE}/presets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      throw new Error('Failed to save preset');
    }
    return response.json();
  }

  static async deletePreset(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/presets/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete preset');
    }
  }
}

