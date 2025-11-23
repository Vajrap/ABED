import type {
  BattleMetadataResponse,
  SimulateBattleRequest,
  SimulateBattleResponse,
  PresetsResponse,
  SavePresetRequest,
  PresetInfo,
  AIAnalysisResponse,
  AIAnalysis,
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

  /**
   * Analyze battle result with AI via n8n webhook
   */
  static async analyzeBattle(battleResult: SimulateBattleResponse, systemPrompt: string): Promise<AIAnalysis> {
    // Format the chat input with system prompt + battle data
    const chatInput = this.formatAnalysisPrompt(battleResult, systemPrompt);
    
    const webhookUrl = import.meta.env.VITE_N8N_ANALYSIS_WEBHOOK || 
    // 'http://localhost:5678/webhook-test/3542b87e-d630-4827-a146-7ffbd2ed7a23';
    'http://localhost:5678/webhook/3542b87e-d630-4827-a146-7ffbd2ed7a23';
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatInput: chatInput,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze battle');
    }

    const data: AIAnalysisResponse = await response.json();
    
    // Parse the response - n8n returns { outPut: "..." } or { output: "..." }
    let analysisText: string;
    if (typeof data.outPut === 'string') {
      analysisText = data.outPut;
    } else if (typeof data.output === 'string') {
      analysisText = data.output;
    } else if (typeof data === 'string') {
      analysisText = data;
    } else {
      // Try to stringify if it's an object
      analysisText = JSON.stringify(data);
    }

    // Try to parse JSON from the response
    // Remove markdown code blocks if present
    const cleanedText = analysisText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    try {
      const analysis: AIAnalysis = JSON.parse(cleanedText);
      return analysis;
    } catch (error) {
      // If parsing fails, return a structured error
      throw new Error(`Failed to parse AI analysis: ${error}. Response: ${cleanedText.substring(0, 200)}`);
    }
  }

  /**
   * Format battle result and system prompt for AI analysis
   */
  private static formatAnalysisPrompt(battleResult: SimulateBattleResponse, systemPrompt: string): string {
    // Build concise battle data summary
    const battleData = {
      battleId: battleResult.battleId,
      duration: battleResult.outcome.duration,
      winner: battleResult.outcome.winner,
      partyA: {
        characters: battleResult.partyA.characters.map(c => ({
          name: c.name,
          position: c.position,
          isDead: c.isDead,
          hp: { current: c.hp.current, max: c.hp.max },
          mp: { current: c.mp.current, max: c.mp.max },
          sp: { current: c.sp.current, max: c.sp.max },
        })),
        survivors: battleResult.partyA.survivors,
      },
      partyB: {
        characters: battleResult.partyB.characters.map(c => ({
          name: c.name,
          position: c.position,
          isDead: c.isDead,
          hp: { current: c.hp.current, max: c.hp.max },
          mp: { current: c.mp.current, max: c.mp.max },
          sp: { current: c.sp.current, max: c.sp.max },
        })),
        survivors: battleResult.partyB.survivors,
      },
      statistics: battleResult.statistics.structured,
      turns: battleResult.turns.map(t => ({
        turnNumber: t.turnNumber,
        actor: t.actorName,
        skill: t.details.skillUsed?.name || 'Unknown',
        summary: t.summary,
        targets: t.details.targets?.map(tgt => ({
          name: tgt.name,
          damage: tgt.damage,
          healing: tgt.healing,
          isCrit: tgt.isCrit,
        })) || [],
      })),
    };

    return `${systemPrompt}\n\n## BATTLE DATA\n\n${JSON.stringify(battleData, null, 2)}`;
  }
}

