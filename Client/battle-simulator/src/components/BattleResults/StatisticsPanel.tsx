import { Box, Typography, Paper, Chip, Grid, Accordion, AccordionSummary, AccordionDetails, LinearProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { StructuredBattleStatistics, CharacterStructuredStats, TurnAction } from '../../services/types';

interface StatisticsPanelProps {
  statistics: {
    characters: any[];
    summary: string;
    structured: StructuredBattleStatistics;
  };
}

export default function StatisticsPanel({ statistics }: StatisticsPanelProps) {
  const { structured } = statistics;
  
  if (!structured || !structured.characters || Object.keys(structured.characters).length === 0) {
    return (
      <Box>
        <Typography variant="body2" color="text.secondary">
          No statistics available
        </Typography>
      </Box>
    );
  }

  const characters = Object.values(structured.characters);

  // Sort by overall damage descending
  const sortedCharacters = [...characters].sort((a, b) => b.overallDamage - a.overallDamage);
  const maxDamage = Math.max(...characters.map(c => c.overallDamage), 1);

  const getActionColor = (type: TurnAction['type']) => {
    switch (type) {
      case 'damage': return 'error';
      case 'heal': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Front-Back Ratio */}
      <Paper sx={{ p: 2, mb: 3, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          Targeting Analysis
        </Typography>
        <Typography variant="body1">
          Front/Back Row Ratio: <strong>{structured.frontBackRatio.toFixed(2)}:1</strong>
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.9 }}>
          {structured.frontBackRatio > 1 ? 'More targeting on front row' : 'More targeting on back row'}
        </Typography>
      </Paper>

      {/* Character Statistics */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 2 }}>
        Character Performance
      </Typography>

      {sortedCharacters.map((char: CharacterStructuredStats) => (
        <Accordion key={char.characterId} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ width: '100%', pr: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {char.characterName} (Pos {char.position})
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {char.overallDamage > 0 && (
                    <Chip 
                      label={`${char.overallDamage} dmg`} 
                      color="error" 
                      size="small"
                    />
                  )}
                  {char.overallHealing > 0 && (
                    <Chip 
                      label={`${char.overallHealing} heal`} 
                      color="success" 
                      size="small"
                    />
                  )}
                </Box>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(char.overallDamage / maxDamage) * 100} 
                sx={{ height: 6, borderRadius: 3 }}
                color="error"
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {/* Overall Stats */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                  Overall Stats
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography variant="body2">
                    Damage Dealt: <strong>{char.overallDamage}</strong>
                  </Typography>
                  <Typography variant="body2">
                    Healing Done: <strong>{char.overallHealing}</strong>
                  </Typography>
                  <Typography variant="body2">
                    Damage Taken: <strong>{char.damageTaken}</strong>
                  </Typography>
                  <Typography variant="body2">
                    Healing Received: <strong>{char.healingReceived}</strong>
                  </Typography>
                </Box>
              </Grid>

              {/* Targeting */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                  Targeting
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography variant="body2">
                    Front Row Hits: <strong>{char.frontRowTargets}</strong>
                  </Typography>
                  <Typography variant="body2">
                    Back Row Hits: <strong>{char.backRowTargets}</strong>
                  </Typography>
                </Box>
              </Grid>

              {/* Skills Used */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                  Skills Used
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {Object.entries(char.skillsUsed).map(([skill, count]) => (
                    <Chip 
                      key={skill}
                      label={`${skill} (${count})`}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Grid>

              {/* Turn-by-Turn Actions */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                  Turn-by-Turn Actions ({char.turns.length} turns)
                </Typography>
                <Box 
                  sx={{ 
                    maxHeight: 300, 
                    overflow: 'auto',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 1
                  }}
                >
                  {char.turns.map((turn, idx) => (
                    <Box 
                      key={idx}
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1, 
                        py: 0.5,
                        borderBottom: idx < char.turns.length - 1 ? '1px solid' : 'none',
                        borderColor: 'divider'
                      }}
                    >
                      <Chip 
                        label={`T${turn.turnNumber}`}
                        size="small"
                        variant="outlined"
                        sx={{ minWidth: 45 }}
                      />
                      <Chip 
                        label={turn.skill}
                        size="small"
                        color={getActionColor(turn.type)}
                        variant={turn.value > 0 ? "filled" : "outlined"}
                      />
                      {turn.value > 0 && (
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {turn.type === 'damage' ? '-' : '+'}{turn.value}
                        </Typography>
                      )}
                      {turn.targetName && (
                        <Typography variant="body2" color="text.secondary">
                          → {turn.targetName}
                        </Typography>
                      )}
                      {turn.isCrit && (
                        <Chip label="CRIT" size="small" color="warning" />
                      )}
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

