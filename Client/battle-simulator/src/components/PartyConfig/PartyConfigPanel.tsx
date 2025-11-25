import { Box, Grid, Paper, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import type { BattleMetadataResponse, CharacterConfig } from '../../services/types';
import CharacterSlot from './CharacterSlot';

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

        {presets.filter(p => p.isDefault).slice(0, 3).map((preset) => (
          <Button
            key={preset.id}
            variant="outlined"
            size="small"
            onClick={() => handleQuickLoad(preset)}
          >
            Load {preset.name}
          </Button>
        ))}

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
            <Typography variant="h6" gutterBottom>
              Party A
            </Typography>
            {renderLineColumns(partyA, handlePartyACharacterChange, [
              { label: 'Back Line', positions: backLinePositions },
              { label: 'Front Line', positions: frontLinePositions },
            ])}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Party B
            </Typography>
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

