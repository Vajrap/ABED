import {
  Box,
  Paper,
  Typography,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import type { AIAnalysis } from '../../services/types';

interface AIAnalysisPanelProps {
  analysis: AIAnalysis;
}

export default function AIAnalysisPanel({ analysis }: AIAnalysisPanelProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'success';
    if (score >= 70) return 'info';
    if (score >= 50) return 'warning';
    return 'error';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircleIcon />;
    if (score >= 70) return <WarningIcon />;
    return <ErrorIcon />;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box>
      {/* Sanity Score */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 3,
          bgcolor: `${getScoreColor(analysis.sanityScore)}.light`,
          color: `${getScoreColor(analysis.sanityScore)}.contrastText`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          {getScoreIcon(analysis.sanityScore)}
          <Typography variant="h5">
            Sanity Score: {analysis.sanityScore}/100
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={analysis.sanityScore}
          color={getScoreColor(analysis.sanityScore)}
          sx={{ height: 10, borderRadius: 5 }}
        />
        <Typography variant="body1" sx={{ mt: 2 }}>
          {analysis.summary}
        </Typography>
      </Paper>

      {/* Anomalies (if any) */}
      {analysis.anomalies && analysis.anomalies.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Anomalies Found ({analysis.anomalies.length})
          </Typography>
          {analysis.anomalies.map((anomaly, index) => (
            <Alert
              key={index}
              severity={getSeverityColor(anomaly.severity) as any}
              sx={{ mb: 1 }}
            >
              <Typography variant="subtitle2" gutterBottom>
                [{anomaly.type.toUpperCase()}] {anomaly.description}
                {anomaly.character && ` - ${anomaly.character}`}
                {anomaly.turn && ` (Turn ${anomaly.turn})`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Evidence: {anomaly.evidence}
              </Typography>
            </Alert>
          ))}
        </Box>
      )}

      {/* Detailed Analysis Sections */}
      <Accordion defaultExpanded={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Skill Flow Analysis</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Diversity:</Typography>
            <Typography variant="body2" paragraph>{analysis.skillFlow.diversity}</Typography>
            
            <Typography variant="subtitle2" gutterBottom>Selection Logic:</Typography>
            <Typography variant="body2" paragraph>{analysis.skillFlow.selectionLogic}</Typography>
            
            <Typography variant="subtitle2" gutterBottom>Conditional Deck:</Typography>
            <Typography variant="body2" paragraph>{analysis.skillFlow.conditionalDeck}</Typography>
            
            {analysis.skillFlow.issues && analysis.skillFlow.issues.length > 0 && (
              <>
                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>Issues:</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {analysis.skillFlow.issues.map((issue, i) => (
                    <Chip key={i} label={issue} size="small" color="warning" />
                  ))}
                </Box>
              </>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Element Flow Analysis</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Production:</Typography>
            <Typography variant="body2" paragraph>{analysis.elementFlow.production}</Typography>
            
            <Typography variant="subtitle2" gutterBottom>Consumption:</Typography>
            <Typography variant="body2" paragraph>{analysis.elementFlow.consumption}</Typography>
            
            <Typography variant="subtitle2" gutterBottom>Chains:</Typography>
            <Typography variant="body2" paragraph>{analysis.elementFlow.chains}</Typography>
            
            <Typography variant="subtitle2" gutterBottom>Accumulation:</Typography>
            <Typography variant="body2" paragraph>{analysis.elementFlow.accumulation}</Typography>
            
            <Typography variant="subtitle2" gutterBottom>Efficiency:</Typography>
            <Typography variant="body2" paragraph>{analysis.elementFlow.efficiency}</Typography>
            
            {analysis.elementFlow.issues && analysis.elementFlow.issues.length > 0 && (
              <>
                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>Issues:</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {analysis.elementFlow.issues.map((issue, i) => (
                    <Chip key={i} label={issue} size="small" color="warning" />
                  ))}
                </Box>
              </>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Battle Flow Analysis</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Duration:</Typography>
            <Typography variant="body2" paragraph>{analysis.battleFlow.duration}</Typography>
            
            <Typography variant="subtitle2" gutterBottom>Resource Usage:</Typography>
            <Typography variant="body2" paragraph>{analysis.battleFlow.resourceUsage}</Typography>
            
            <Typography variant="subtitle2" gutterBottom>Turn Efficiency:</Typography>
            <Typography variant="body2" paragraph>{analysis.battleFlow.turnEfficiency}</Typography>
            
            <Typography variant="subtitle2" gutterBottom>Party Balance:</Typography>
            <Typography variant="body2" paragraph>{analysis.battleFlow.partyBalance}</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Character Performance</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Role Fulfillment:</Typography>
            <Typography variant="body2" paragraph>{analysis.performance.roleFulfillment}</Typography>
            
            <Typography variant="subtitle2" gutterBottom>Position Logic:</Typography>
            <Typography variant="body2" paragraph>{analysis.performance.positionLogic}</Typography>
            
            <Typography variant="subtitle2" gutterBottom>Resource Management:</Typography>
            <Typography variant="body2" paragraph>{analysis.performance.resourceManagement}</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Recommendations */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <Paper sx={{ p: 2, mt: 3, bgcolor: 'info.light' }}>
          <Typography variant="h6" gutterBottom>
            Recommendations
          </Typography>
          <Box component="ul" sx={{ pl: 3, m: 0 }}>
            {analysis.recommendations.map((rec, index) => (
              <li key={index}>
                <Typography variant="body2">{rec}</Typography>
              </li>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
}

