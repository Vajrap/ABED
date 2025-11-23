import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import type { SimulateBattleResponse, AIAnalysis } from '../../services/types';
import { BattleSimulatorAPI } from '../../services/api';
import { BATTLE_ANALYSIS_SYSTEM_PROMPT } from '../../constants/aiSystemPrompt';
import TurnDetail from './TurnDetail';
import StatisticsPanel from './StatisticsPanel';
import PartySummary from './PartySummary';
import AIAnalysisPanel from './AIAnalysisPanel';

interface BattleResultsViewProps {
  result: SimulateBattleResponse;
}

export default function BattleResultsView({ result }: BattleResultsViewProps) {
  const [expandedTurn, setExpandedTurn] = useState<number | false>(false);
  const [expandedSections, setExpandedSections] = useState({
    turnByTurn: true,
    statistics: true,
    aiAnalysis: false,
  });
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const handleTurnChange = (turn: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedTurn(isExpanded ? turn : false);
  };

  const handleSectionChange = (section: 'turnByTurn' | 'statistics' | 'aiAnalysis') => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedSections(prev => ({ ...prev, [section]: isExpanded }));
  };

  const handleAIAnalysis = async () => {
    setAnalyzing(true);
    setAnalysisError(null);
    try {
      const analysis = await BattleSimulatorAPI.analyzeBattle(result, BATTLE_ANALYSIS_SYSTEM_PROMPT);
      setAiAnalysis(analysis);
      setExpandedSections(prev => ({ ...prev, aiAnalysis: true }));
    } catch (error) {
      console.error('AI analysis failed', error);
      setAnalysisError(error instanceof Error ? error.message : 'Failed to analyze battle');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Battle Outcome
        </Typography>
        <Typography variant="h6" color={result.outcome.winner === 'draw' ? 'warning.main' : 'primary.main'}>
          {result.outcome.message.en}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Duration: {result.outcome.duration} turns | 
          Party A Survivors: {result.partyA.survivors} | 
          Party B Survivors: {result.partyB.survivors}
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <PartySummary
            title="Party A"
            characters={result.partyA.characters}
            survivors={result.partyA.survivors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <PartySummary
            title="Party B"
            characters={result.partyB.characters}
            survivors={result.partyB.survivors}
          />
        </Grid>
      </Grid>

      <Accordion 
        expanded={expandedSections.turnByTurn} 
        onChange={handleSectionChange('turnByTurn')}
        sx={{ mt: 3 }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            Turn-by-Turn Results ({result.turns.length} turns)
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <Box sx={{ maxHeight: 600, overflow: 'auto', p: 3 }}>
            {result.turns.map((turn) => (
              <Accordion
                key={turn.turnNumber}
                expanded={expandedTurn === turn.turnNumber}
                onChange={handleTurnChange(turn.turnNumber)}
                sx={{ mb: 1 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Typography variant="subtitle2" sx={{ minWidth: 80 }}>
                      Turn {turn.turnNumber}
                    </Typography>
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                      <strong>{turn.actorName}</strong>: {turn.summary}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <TurnDetail turn={turn} />
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion 
        expanded={expandedSections.statistics} 
        onChange={handleSectionChange('statistics')}
        sx={{ mt: 3 }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            Battle Statistics
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <Box sx={{ p: 3 }}>
            <StatisticsPanel statistics={result.statistics} />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* AI Analysis Section */}
      <Paper sx={{ p: 2, mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">AI Battle Analysis</Typography>
          <Button
            onClick={handleAIAnalysis}
            disabled={analyzing}
            variant="outlined"
            startIcon={analyzing ? <CircularProgress size={20} /> : <AutoAwesomeIcon />}
          >
            {analyzing ? 'Analyzing...' : 'Analyze with AI'}
          </Button>
        </Box>

        {analysisError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {analysisError}
          </Alert>
        )}

        {aiAnalysis && (
          <Accordion
            expanded={expandedSections.aiAnalysis}
            onChange={handleSectionChange('aiAnalysis')}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                Analysis Results
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <Box sx={{ p: 3 }}>
                <AIAnalysisPanel analysis={aiAnalysis} />
              </Box>
            </AccordionDetails>
          </Accordion>
        )}
      </Paper>
    </Box>
  );
}

