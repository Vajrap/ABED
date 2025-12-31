import { Box, Grid, Paper, Typography, Button, Select, MenuItem, FormControl, InputLabel, Menu } from '@mui/material';
import type { BattleMetadataResponse, CharacterConfig } from '../../services/types';
import type { ClassEnum } from '../../services/types';
import CharacterSlot from './CharacterSlot';
import { useState } from 'react';

interface PartyConfigPanelProps {
  metadata: BattleMetadataResponse;
  partyA: CharacterConfig[];
  partyB: CharacterConfig[];
  location: string;
  battleType: 'Normal' | 'Training' | 'Arena' | 'Scripted' | 'NoReward';
  onPartyAChange: (party: CharacterConfig[]) => void;
  onPartyBChange: (party: CharacterConfig[]) => void;
  onLocationChange: (location: string) => void;
  onBattleTypeChange: (type: 'Normal' | 'Training' | 'Arena' | 'Scripted' | 'NoReward') => void;
  onSimulate: () => void;
  simulating: boolean;
  presets: any[];
  onLoadPreset: (preset: any) => void;
}

export default function PartyConfigPanel({
  metadata,
  partyA,
  partyB,
  location,
  battleType,
  onPartyAChange,
  onPartyBChange,
  onLocationChange,
  onBattleTypeChange,
  onSimulate,
  simulating,
  presets,
  onLoadPreset,
}: PartyConfigPanelProps) {
  const [partyAAnchor, setPartyAAnchor] = useState<null | HTMLElement>(null);
  const [partyBAnchor, setPartyBAnchor] = useState<null | HTMLElement>(null);

  const updateCharacter = (party: CharacterConfig[], position: number, character: CharacterConfig | null) => {
    const newParty = party.filter(c => c.position !== position);
    if (character) {
      newParty.push({ ...character, position: position as 0 | 1 | 2 | 3 | 4 | 5 });
    }
    return newParty;
  };

  const handlePartyACharacterChange = (position: number, character: CharacterConfig | null) => {
    onPartyAChange(updateCharacter(partyA, position, character));
  };

  const handlePartyBCharacterChange = (position: number, character: CharacterConfig | null) => {
    onPartyBChange(updateCharacter(partyB, position, character));
  };

  const handleQuickLoad = (preset: any) => {
    onLoadPreset(preset);
  };

  const loadouts = {
    goblin: {
      S: { name: 'Goblin S (2)', size: 2, mobs: ['goblinWarrior', 'goblinScout'] as const },
      M: { name: 'Goblin M (4)', size: 4, mobs: ['goblinCaptain', 'goblinWarrior', 'goblinScout', 'goblinMage'] as const },
      L: { name: 'Goblin L (6)', size: 6, mobs: ['goblinCaptain', 'goblinWarrior', 'goblinWarrior', 'goblinScout', 'goblinMage', 'goblinCleric'] as const },
    },
    human: {
      S1: { name: 'Human S1 (2)', size: 2, classes: ['Warrior', 'Paladin'] as const },
      S2: { name: 'Human S2 (2)', size: 2, classes: ['Knight', 'Guardian'] as const },
      S3: { name: 'Human S3 (2)', size: 2, classes: ['Cleric', 'Druid'] as const },
      M1: { name: 'Human M1 (4)', size: 4, classes: ['Mage', 'Warlock', 'Witch', 'Inquisitor'] as const },
      M2: { name: 'Human M2 (4)', size: 4, classes: ['Spellblade', 'Mystic', 'Seer', 'Mage'] as const },
      M3: { name: 'Human M3 (4)', size: 4, classes: ['Warlock', 'Witch', 'Inquisitor', 'Spellblade'] as const },
      L1: { name: 'Human L1 (6)', size: 6, classes: ['Rogue', 'Duelist', 'Monk', 'Barbarian', 'Shaman', 'Scholar'] as const },
      L2: { name: 'Human L2 (6)', size: 6, classes: ['Rogue', 'Monk', 'Barbarian', 'Shaman', 'Scholar', 'Duelist'] as const },
      L3: { name: 'Human L3 (6)', size: 6, classes: ['Duelist', 'Monk', 'Barbarian', 'Shaman', 'Scholar', 'Rogue'] as const },
    },
  };

  const handleLoadLoadout = (party: 'A' | 'B', loadoutKey: string, loadoutType: 'goblin' | 'human') => {
    const loadout = loadoutType === 'goblin' 
      ? loadouts.goblin[loadoutKey as keyof typeof loadouts.goblin]
      : loadouts.human[loadoutKey as keyof typeof loadouts.human];
    
    if (!loadout) return;

    const newParty: CharacterConfig[] = [];
    
    if (loadoutType === 'goblin' && 'mobs' in loadout) {
      const mobNames: Record<string, { en: string; th: string }> = {
        goblinWarrior: { en: 'Goblin Warrior', th: 'ก๊อปลินนักรบ' },
        goblinScout: { en: 'Goblin Scout', th: 'ก๊อปลินสายลับ' },
        goblinCaptain: { en: 'Goblin Captain', th: 'ก๊อปลินกัปตัน' },
        goblinMage: { en: 'Goblin Mage', th: 'ก๊อปลินนักเวทย์' },
        goblinCleric: { en: 'Goblin Cleric', th: 'ก๊อปลินนักบวช' },
      };
      
      loadout.mobs.forEach((mobId, index) => {
        const name = mobNames[mobId] || { en: mobId, th: mobId };
        // If duplicate mobs, add a number
        const count = loadout.mobs.filter((m, i) => i < index && m === mobId).length;
        const displayName = count > 0 
          ? { en: `${name.en} ${count + 1}`, th: `${name.th} ${count + 1}` }
          : name;
        
        newParty.push({
          type: 'mob',
          mobId: mobId,
          level: 3,
          name: displayName,
          position: index as 0 | 1 | 2 | 3 | 4 | 5,
        });
      });
    } else if (loadoutType === 'human' && 'classes' in loadout) {
      loadout.classes.forEach((className, index) => {
        newParty.push({
          type: 'custom',
          race: 'Human',
          class: className as ClassEnum,
          level: 3,
          name: { en: `Human ${className}`, th: `${className} มนุษย์` },
          position: index as 0 | 1 | 2 | 3 | 4 | 5,
        });
      });
    }

    if (party === 'A') {
      onPartyAChange(newParty);
    } else {
      onPartyBChange(newParty);
    }

    setPartyAAnchor(null);
    setPartyBAnchor(null);
  };

  const frontLinePositions = [0, 1, 2];
  const backLinePositions = [3, 4, 5];

  const renderLineColumns = (
    party: CharacterConfig[],
    onChange: (position: number, character: CharacterConfig | null) => void,
    columns: Array<{ label: string; positions: number[] }>
  ) => (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
      {columns.map((column) => (
        <Box key={column.label} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 600 }}>
            {column.label}
          </Typography>
          {column.positions.map((position) => (
            <CharacterSlot
              key={position}
              position={position}
              character={party.find((c) => c.position === position) || null}
              metadata={metadata}
              onChange={(char) => onChange(position, char)}
            />
          ))}
        </Box>
      ))}
    </Box>
  );

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Location</InputLabel>
          <Select value={location} label="Location" onChange={(e) => onLocationChange(e.target.value)}>
            {metadata.locations.map((loc) => (
              <MenuItem key={loc.id} value={loc.id}>
                {loc.name.en}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Battle Type</InputLabel>
          <Select value={battleType} label="Battle Type" onChange={(e) => onBattleTypeChange(e.target.value as any)}>
            {metadata.battleTypes.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          variant="contained"
          size="large"
          onClick={onSimulate}
          disabled={simulating || partyA.length === 0 || partyB.length === 0}
        >
          {simulating ? 'Simulating...' : 'Simulate Battle'}
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Party A
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => setPartyAAnchor(e.currentTarget)}
              >
                Load Party A
              </Button>
              <Menu
                anchorEl={partyAAnchor}
                open={Boolean(partyAAnchor)}
                onClose={() => setPartyAAnchor(null)}
              >
                <MenuItem disabled sx={{ fontWeight: 600 }}>Goblin</MenuItem>
                {Object.entries(loadouts.goblin).map(([key, loadout]) => (
                  <MenuItem key={key} onClick={() => handleLoadLoadout('A', key, 'goblin')}>
                    {loadout.name}
                  </MenuItem>
                ))}
                <MenuItem disabled sx={{ fontWeight: 600, mt: 1 }}>Human</MenuItem>
                {Object.entries(loadouts.human).map(([key, loadout]) => (
                  <MenuItem key={key} onClick={() => handleLoadLoadout('A', key, 'human')}>
                    {loadout.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {renderLineColumns(partyA, handlePartyACharacterChange, [
              { label: 'Back Line', positions: backLinePositions },
              { label: 'Front Line', positions: frontLinePositions },
            ])}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Party B
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => setPartyBAnchor(e.currentTarget)}
              >
                Load Party B
              </Button>
              <Menu
                anchorEl={partyBAnchor}
                open={Boolean(partyBAnchor)}
                onClose={() => setPartyBAnchor(null)}
              >
                <MenuItem disabled sx={{ fontWeight: 600 }}>Goblin</MenuItem>
                {Object.entries(loadouts.goblin).map(([key, loadout]) => (
                  <MenuItem key={key} onClick={() => handleLoadLoadout('B', key, 'goblin')}>
                    {loadout.name}
                  </MenuItem>
                ))}
                <MenuItem disabled sx={{ fontWeight: 600, mt: 1 }}>Human</MenuItem>
                {Object.entries(loadouts.human).map(([key, loadout]) => (
                  <MenuItem key={key} onClick={() => handleLoadLoadout('B', key, 'human')}>
                    {loadout.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {renderLineColumns(partyB, handlePartyBCharacterChange, [
              { label: 'Front Line', positions: frontLinePositions },
              { label: 'Back Line', positions: backLinePositions },
            ])}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

