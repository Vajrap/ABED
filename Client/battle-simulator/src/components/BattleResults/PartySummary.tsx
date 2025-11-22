import { Box, Typography, Chip, Paper } from '@mui/material';
import type { CharacterSnapshot } from '../../services/types';

interface PartySummaryProps {
  title: string;
  characters: CharacterSnapshot[];
  survivors: number;
}

export default function PartySummary({ title, characters, survivors }: PartySummaryProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {title} - {survivors} Survivors
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {characters.map((char) => (
          <Box
            key={char.id}
            sx={{
              p: 1,
              bgcolor: char.isDead ? 'error.dark' : 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" fontWeight="bold">
                {char.name} (Pos {char.position})
              </Typography>
              {char.isDead && <Chip label="DEAD" size="small" color="error" />}
            </Box>
            <Typography variant="caption" color="text.secondary">
              HP: {char.hp.current}/{char.hp.max} | 
              MP: {char.mp.current}/{char.mp.max} | 
              SP: {char.sp.current}/{char.sp.max}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

