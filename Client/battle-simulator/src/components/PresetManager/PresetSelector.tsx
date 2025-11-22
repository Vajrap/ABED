import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { PresetInfo, CharacterConfig } from '../../services/types';

interface PresetSelectorProps {
  presets: PresetInfo[];
  onLoadPreset: (preset: PresetInfo) => void;
  onSavePreset: (name: string, description?: string) => void;
  onDeletePreset: (id: string) => void;
  currentConfig: {
    partyA: CharacterConfig[];
    partyB: CharacterConfig[];
    location: string;
    battleType: string;
  };
}

export default function PresetSelector({
  presets,
  onLoadPreset,
  onSavePreset,
  onDeletePreset,
  currentConfig,
}: PresetSelectorProps) {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [presetDescription, setPresetDescription] = useState('');

  const handleSaveClick = () => {
    setPresetName('');
    setPresetDescription('');
    setSaveDialogOpen(true);
  };

  const handleSaveConfirm = () => {
    if (presetName.trim()) {
      onSavePreset(presetName.trim(), presetDescription.trim() || undefined);
      setSaveDialogOpen(false);
    }
  };

  const defaultPresets = presets.filter(p => p.isDefault);
  const customPresets = presets.filter(p => !p.isDefault);

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Battle Presets</Typography>
        <Button
          variant="contained"
          onClick={handleSaveClick}
          disabled={currentConfig.partyA.length === 0 || currentConfig.partyB.length === 0}
        >
          Save Current Configuration
        </Button>
      </Box>

      {defaultPresets.length > 0 && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            Default Presets
          </Typography>
          <List>
            {defaultPresets.map((preset) => (
              <ListItem
                key={preset.id}
                button
                onClick={() => onLoadPreset(preset)}
                sx={{ border: '1px solid', borderColor: 'divider', mb: 1, borderRadius: 1 }}
              >
                <ListItemText
                  primary={preset.name}
                  secondary={preset.description || `${preset.partyA.length} vs ${preset.partyB.length} characters`}
                />
                <ListItemSecondaryAction>
                  <Button size="small" onClick={() => onLoadPreset(preset)}>
                    Load
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {customPresets.length > 0 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            Custom Presets
          </Typography>
          <List>
            {customPresets.map((preset) => (
              <ListItem
                key={preset.id}
                button
                onClick={() => onLoadPreset(preset)}
                sx={{ border: '1px solid', borderColor: 'divider', mb: 1, borderRadius: 1 }}
              >
                <ListItemText
                  primary={preset.name}
                  secondary={preset.description || `${preset.partyA.length} vs ${preset.partyB.length} characters`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeletePreset(preset.id);
                    }}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Button size="small" onClick={() => onLoadPreset(preset)} sx={{ ml: 1 }}>
                    Load
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {presets.length === 0 && (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">No presets available</Typography>
        </Paper>
      )}

      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Save Battle Configuration</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Preset Name"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Description (optional)"
              value={presetDescription}
              onChange={(e) => setPresetDescription(e.target.value)}
              fullWidth
              multiline
              rows={3}
            />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Current configuration: {currentConfig.partyA.length} vs {currentConfig.partyB.length} characters
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveConfirm} variant="contained" disabled={!presetName.trim()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

