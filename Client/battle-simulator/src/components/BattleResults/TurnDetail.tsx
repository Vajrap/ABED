import { Box, Typography, Chip, Grid } from '@mui/material';
import type { TurnDetail as TurnDetailType } from '../../services/types';

interface TurnDetailProps {
  turn: TurnDetailType;
}

export default function TurnDetail({ turn }: TurnDetailProps) {
  const { details } = turn;

  return (
    <Box>
      <Grid container spacing={2}>
        {details.resourcesBefore && (
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" color="text.secondary">Resources Before</Typography>
            <Typography variant="body2">
              HP: {details.resourcesBefore.hp} | 
              MP: {details.resourcesBefore.mp} | 
              SP: {details.resourcesBefore.sp}
            </Typography>
          </Grid>
        )}

        {details.resourcesAfter && (
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" color="text.secondary">Resources After</Typography>
            <Typography variant="body2">
              HP: {details.resourcesAfter.hp} | 
              MP: {details.resourcesAfter.mp} | 
              SP: {details.resourcesAfter.sp}
            </Typography>
          </Grid>
        )}

        {details.skillUsed && (
          <Grid item xs={12}>
            <Typography variant="caption" color="text.secondary">Skill Used</Typography>
            <Box>
              <Chip 
                label={`${details.skillUsed.name} (Level ${details.skillUsed.level})`} 
                size="small" 
                color="primary"
              />
            </Box>
          </Grid>
        )}

        {details.targets && details.targets.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="caption" color="text.secondary">Targets</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {details.targets.map((target, idx) => (
                <Box key={idx} sx={{ pl: 2, borderLeft: '2px solid', borderColor: 'divider' }}>
                  <Typography variant="body2" fontWeight="bold">
                    {target.name}
                  </Typography>
                  {target.damage !== undefined && (
                    <Typography variant="body2" color="error">
                      Damage: {target.damage} {target.isCrit && '(CRIT!)'}
                    </Typography>
                  )}
                  {target.healing !== undefined && (
                    <Typography variant="body2" color="success.main">
                      Healing: +{target.healing}
                    </Typography>
                  )}
                  {target.effects && target.effects.length > 0 && (
                    <Box sx={{ mt: 0.5 }}>
                      {target.effects.map((effect, eIdx) => (
                        <Chip key={eIdx} label={effect} size="small" sx={{ mr: 0.5 }} />
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

