import { useState, useEffect } from 'react';
import { Container, Box, Typography, Tabs, Tab, Alert } from '@mui/material';
import { BattleSimulatorAPI } from './services/api';
import type { BattleMetadataResponse, CharacterConfig, SimulateBattleResponse, PresetInfo } from './services/types';
import PartyConfigPanel from './components/PartyConfig/PartyConfigPanel';
import BattleResultsView from './components/BattleResults/BattleResultsView';
import PresetSelector from './components/PresetManager/PresetSelector';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simulator-tabpanel-${index}`}
      aria-labelledby={`simulator-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [tabValue, setTabValue] = useState(0);
  const [metadata, setMetadata] = useState<BattleMetadataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [partyA, setPartyA] = useState<CharacterConfig[]>([]);
  const [partyB, setPartyB] = useState<CharacterConfig[]>([]);
  const [location, setLocation] = useState<string>('WaywardInn');
  const [battleType, setBattleType] = useState<'Normal' | 'Training' | 'Arena' | 'Scripted' | 'NoReward'>('Normal');
  
  const [battleResult, setBattleResult] = useState<SimulateBattleResponse | null>(null);
  const [simulating, setSimulating] = useState(false);
  const [presets, setPresets] = useState<PresetInfo[]>([]);

  useEffect(() => {
    loadMetadata();
    loadPresets();
  }, []);

  const loadMetadata = async () => {
    try {
      setLoading(true);
      const data = await BattleSimulatorAPI.getMetadata();
      setMetadata(data);
      if (data.locations.length > 0) {
        setLocation(data.locations[0].id);
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load metadata');
    } finally {
      setLoading(false);
    }
  };

  const loadPresets = async () => {
    try {
      const data = await BattleSimulatorAPI.getPresets();
      setPresets(data.presets);
    } catch (err) {
      console.error('Failed to load presets:', err);
    }
  };

  const handleLoadPreset = (preset: PresetInfo) => {
    setPartyA(preset.partyA);
    setPartyB(preset.partyB);
    setLocation(preset.location);
    setBattleType(preset.battleType);
    setBattleResult(null);
    setTabValue(0); // Switch to configuration tab
  };

  const handleSimulate = async () => {
    if (partyA.length === 0 || partyB.length === 0) {
      setError('Both parties must have at least one character');
      return;
    }

    try {
      setSimulating(true);
      setError(null);
      const result = await BattleSimulatorAPI.simulateBattle({
        partyA,
        partyB,
        location,
        battleType,
      });
      setBattleResult(result);
      setTabValue(1); // Switch to results tab
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to simulate battle');
    } finally {
      setSimulating(false);
    }
  };

  const handleSavePreset = async (name: string, description?: string) => {
    try {
      await BattleSimulatorAPI.savePreset({
        name,
        description,
        partyA,
        partyB,
        location,
        battleType,
      });
      await loadPresets();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save preset');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!metadata) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error">Failed to load battle metadata</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Battle Simulator
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="Configuration" />
          <Tab label="Battle Results" />
          <Tab label="Presets" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <PartyConfigPanel
          metadata={metadata}
          partyA={partyA}
          partyB={partyB}
          location={location}
          battleType={battleType}
          onPartyAChange={setPartyA}
          onPartyBChange={setPartyB}
          onLocationChange={setLocation}
          onBattleTypeChange={setBattleType}
          onSimulate={handleSimulate}
          simulating={simulating}
          presets={presets}
          onLoadPreset={handleLoadPreset}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {battleResult ? (
          <BattleResultsView result={battleResult} />
        ) : (
          <Typography>No battle results yet. Configure and simulate a battle first.</Typography>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <PresetSelector
          presets={presets}
          onLoadPreset={handleLoadPreset}
          onSavePreset={handleSavePreset}
          onDeletePreset={async (id) => {
            try {
              await BattleSimulatorAPI.deletePreset(id);
              await loadPresets();
            } catch (err) {
              setError(err instanceof Error ? err.message : 'Failed to delete preset');
            }
          }}
          currentConfig={{
            partyA,
            partyB,
            location,
            battleType,
          }}
        />
      </TabPanel>
    </Container>
  );
}

export default App;

