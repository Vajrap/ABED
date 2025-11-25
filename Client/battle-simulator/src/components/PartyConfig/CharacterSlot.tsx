import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material';
import type { BattleMetadataResponse, CharacterConfig } from '../../services/types';

interface CharacterSlotProps {
  position: number;
  character: CharacterConfig | null;
  metadata: BattleMetadataResponse;
  onChange: (character: CharacterConfig | null) => void;
}

export default function CharacterSlot({ position, character, metadata, onChange }: CharacterSlotProps) {
  const [open, setOpen] = useState(false);
  const [editChar, setEditChar] = useState<CharacterConfig | null>(character);

  const isFrontRow = position < 3;

  const handleOpen = () => {
    setEditChar(character || {
      type: 'custom',
      level: 3,
      name: { en: '', th: '' },
      position: position as 0 | 1 | 2 | 3 | 4 | 5,
      race: 'Human',
      class: 'Warrior',
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (editChar) {
      // Allow saving even without a name - names will be auto-generated before simulation
      onChange(editChar);
    }
    setOpen(false);
  };

  const handleRemove = () => {
    onChange(null);
    setOpen(false);
  };

  return (
    <>
      <Paper
        sx={{
          p: 1.5,
          minHeight: 120,
          border: isFrontRow ? '2px solid #1976d2' : '2px solid #666',
          cursor: 'pointer',
          '&:hover': { bgcolor: 'action.hover' },
        }}
        onClick={handleOpen}
      >
        {character ? (
          <Box>
            <Typography variant="subtitle2" fontWeight="bold">
              {character.name.en || 'Unnamed'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {character.type === 'mob' ? `MOB: ${character.mobId}` : `${character.race} ${character.class}`}
            </Typography>
            <Typography variant="caption" display="block">
              Level {character.level} | Pos {position} {isFrontRow ? '(Front)' : '(Back)'}
            </Typography>
            {character.skills && character.skills.length > 0 && (
              <Box sx={{ mt: 0.5 }}>
                {character.skills.slice(0, 2).map((skill, idx) => (
                  <Chip key={idx} label={skill.id} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                ))}
              </Box>
            )}
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Typography variant="caption" color="text.secondary">
              Pos {position} {isFrontRow ? '(Front)' : '(Back)'}
              <br />
              Click to add
            </Typography>
          </Box>
        )}
      </Paper>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Configure Character - Position {position}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={editChar?.type || 'custom'}
                label="Type"
                onChange={(e) => setEditChar({ ...editChar!, type: e.target.value as 'mob' | 'custom' })}
              >
                <MenuItem value="mob">MOB (Predefined)</MenuItem>
                <MenuItem value="custom">Custom</MenuItem>
              </Select>
            </FormControl>

            {editChar?.type === 'mob' ? (
              <FormControl fullWidth>
                <InputLabel>MOB</InputLabel>
                <Select
                  value={editChar.mobId || ''}
                  label="MOB"
                  onChange={(e) => setEditChar({ ...editChar!, mobId: e.target.value })}
                >
                  {metadata.mobs.map((mob) => (
                    <MenuItem key={mob.id} value={mob.id}>
                      {mob.name.en}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <>
                <FormControl fullWidth>
                  <InputLabel>Race</InputLabel>
                  <Select
                    value={editChar?.race || ''}
                    label="Race"
                    onChange={(e) => setEditChar({ ...editChar!, race: e.target.value as any })}
                  >
                    {metadata.races.map((race) => (
                      <MenuItem key={race.id} value={race.id}>
                        {race.name.en}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Class</InputLabel>
                  <Select
                    value={editChar?.class || ''}
                    label="Class"
                    onChange={(e) => setEditChar({ ...editChar!, class: e.target.value as any })}
                  >
                    {metadata.classes.map((cls) => (
                      <MenuItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}

            <TextField
              label="Name (EN)"
              value={editChar?.name.en || ''}
              onChange={(e) => setEditChar({ ...editChar!, name: { ...editChar!.name, en: e.target.value } })}
              fullWidth
            />

            <TextField
              label="Name (TH)"
              value={editChar?.name.th || ''}
              onChange={(e) => setEditChar({ ...editChar!, name: { ...editChar!.name, th: e.target.value } })}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Level</InputLabel>
              <Select
                value={editChar?.level || 3}
                label="Level"
                onChange={(e) => setEditChar({ ...editChar!, level: e.target.value as any })}
              >
                {[1, 2, 3, 4, 5].map((level) => (
                  <MenuItem key={level} value={level}>
                    Level {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          {character && (
            <Button onClick={handleRemove} color="error">
              Remove
            </Button>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

