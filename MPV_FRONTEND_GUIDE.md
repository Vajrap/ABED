# MPV Frontend Implementation Guide

## Overview

This document provides detailed guidance for implementing the frontend components and features for MPV.

---

## **Architecture Overview**

### **State Management Strategy**

For MPV, we'll use **React Context + useState** (no Redux/Zustand yet):

```
GameContext (Global State)
├── Party Data
├── Character Data
├── Game Time
├── News Feed
└── WebSocket Connection

Component Tree
├── App
│   ├── GameView (protected route)
│   │   ├── GameHeader (time display)
│   │   ├── GameSidebar (navigation buttons)
│   │   ├── PartyDisplay (6 member cards)
│   │   ├── ActionScheduleModal
│   │   ├── ActionSelectionModal
│   │   ├── TrainingSelectionModal (NEW)
│   │   ├── NewsModal (NEW)
│   │   └── CharacterStatsModal (NEW)
│   ├── LoginView
│   ├── RegisterView
│   └── CharacterCreationView
```

---

## **New Components to Create**

### **1. GameContext** ⬜
**Location**: `Client/webapp/src/contexts/GameContext.tsx`

**Purpose**: Global state management for game data

```typescript
interface GameContextType {
  // Party
  party: Party | null;
  loadParty: () => Promise<void>;
  updateParty: (changes: Partial<Party>) => void;
  
  // Character
  character: Character | null;
  loadCharacter: () => Promise<void>;
  updateCharacter: (changes: Partial<Character>) => void;
  
  // Time
  gameTime: GameTime | null;
  updateGameTime: (time: GameTime) => void;
  
  // News
  news: NewsItem[];
  addNews: (items: NewsItem[]) => void;
  markNewsAsRead: () => Promise<void>;
  unreadCount: number;
  
  // WebSocket
  socket: Socket | null;
  isConnected: boolean;
  
  // Loading states
  isLoading: boolean;
  error: string | null;
}

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [party, setParty] = useState<Party | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);
  const [gameTime, setGameTime] = useState<GameTime | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  // Initialize WebSocket on mount
  useEffect(() => {
    const token = localStorage.getItem('sessionToken');
    if (!token) return;
    
    const newSocket = io('http://localhost:7890', {
      auth: { token }
    });
    
    newSocket.on('connect', () => setIsConnected(true));
    newSocket.on('disconnect', () => setIsConnected(false));
    
    newSocket.on('time:advanced', (time: GameTime) => {
      setGameTime(time);
    });
    
    newSocket.on('news:new', (data: { news: NewsItem[] }) => {
      setNews(prev => [...data.news, ...prev]);
    });
    
    newSocket.on('character:updated', (data: any) => {
      setCharacter(prev => prev ? { ...prev, ...data.changes } : null);
    });
    
    newSocket.on('party:updated', (data: any) => {
      setParty(prev => prev ? { ...prev, ...data.changes } : null);
    });
    
    setSocket(newSocket);
    
    return () => {
      newSocket.close();
    };
  }, []);
  
  const loadParty = async () => {
    // Fetch party data
    const response = await partyService.getParty();
    if (response.success) {
      setParty(response.party);
    }
  };
  
  const loadCharacter = async () => {
    // Fetch character data
    const response = await characterService.getCharacter();
    if (response.success) {
      setCharacter(response.character);
    }
  };
  
  // ... other methods
  
  return (
    <GameContext.Provider value={{
      party,
      loadParty,
      character,
      loadCharacter,
      gameTime,
      news,
      socket,
      isConnected,
      // ... other values
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};
```

---

### **2. GameHeader** ⬜
**Location**: `Client/webapp/src/components/GameView/GameHeader.tsx`

**Purpose**: Display current game time and party info

```typescript
export const GameHeader: React.FC = () => {
  const { gameTime, party, isConnected } = useGame();
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  useEffect(() => {
    if (!gameTime) return;
    
    // Countdown to next phase
    const interval = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [gameTime]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      p: 2,
      borderBottom: '2px solid',
      borderColor: 'primary.main',
      bgcolor: 'background.paper'
    }}>
      {/* Time Display */}
      <Box>
        <Typography variant="h6">
          Day {gameTime?.day} - {PHASE_NAMES[gameTime?.phase || 0]}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Month {gameTime?.month}, Year {gameTime?.year}
        </Typography>
        <Typography variant="caption" color="primary">
          Next phase in: {formatTime(timeRemaining)}
        </Typography>
      </Box>
      
      {/* Party Info */}
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="h6">{party?.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {party?.location}
        </Typography>
        <Typography variant="body2" color="gold">
          💰 {party?.gold} Gold
        </Typography>
      </Box>
      
      {/* Connection Status */}
      <Box>
        <Chip 
          label={isConnected ? 'Connected' : 'Disconnected'}
          color={isConnected ? 'success' : 'error'}
          size="small"
        />
      </Box>
    </Box>
  );
};
```

---

### **3. NewsModal** ⬜
**Location**: `Client/webapp/src/components/GameView/NewsModal.tsx`

**Purpose**: Display news feed

```typescript
interface NewsModalProps {
  open: boolean;
  onClose: () => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({ open, onClose }) => {
  const { news, markNewsAsRead, unreadCount } = useGame();
  const [filter, setFilter] = useState<'all' | 'private' | 'party'>('all');
  
  const filteredNews = news.filter(item => {
    if (filter === 'all') return true;
    return item.scope === filter;
  });
  
  const handleClose = () => {
    markNewsAsRead();
    onClose();
  };
  
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: 800,
        maxHeight: '80vh',
        bgcolor: 'background.paper',
        border: '2px solid',
        borderColor: 'primary.main',
        boxShadow: 24,
        p: 4,
        overflow: 'auto'
      }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5">
            📰 News Feed {unreadCount > 0 && `(${unreadCount} unread)`}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        {/* Filter Tabs */}
        <Tabs value={filter} onChange={(_, val) => setFilter(val)}>
          <Tab label="All" value="all" />
          <Tab label="Private" value="private" />
          <Tab label="Party" value="party" />
        </Tabs>
        
        {/* News List */}
        <List sx={{ mt: 2 }}>
          {filteredNews.length === 0 ? (
            <Typography color="text.secondary" textAlign="center">
              No news yet. Actions will generate news each phase.
            </Typography>
          ) : (
            filteredNews.map(item => (
              <NewsItem key={item.id} item={item} />
            ))
          )}
        </List>
      </Box>
    </Modal>
  );
};

const NewsItem: React.FC<{ item: NewsItem }> = ({ item }) => {
  const getScopeIcon = (scope: string) => {
    switch (scope) {
      case 'private': return '🔒';
      case 'party': return '👥';
      case 'location': return '📍';
      default: return '📰';
    }
  };
  
  return (
    <ListItem sx={{ 
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1,
      mb: 1
    }}>
      <ListItemIcon>{getScopeIcon(item.scope)}</ListItemIcon>
      <ListItemText
        primary={item.message}
        secondary={new Date(item.timestamp).toLocaleString()}
      />
    </ListItem>
  );
};
```

---

### **4. TrainingSelectionModal** ⬜
**Location**: `Client/webapp/src/components/GameView/TrainingSelectionModal.tsx`

**Purpose**: Select what to train (attribute, artisan, etc.)

```typescript
interface TrainingSelectionModalProps {
  open: boolean;
  onClose: () => void;
  trainingType: 'attribute' | 'artisan' | 'proficiency' | 'skill';
  onSelect: (target: string) => void;
}

export const TrainingSelectionModal: React.FC<TrainingSelectionModalProps> = ({
  open,
  onClose,
  trainingType,
  onSelect
}) => {
  const [options, setOptions] = useState<TrainingOption[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (!open) return;
    
    const fetchOptions = async () => {
      setLoading(true);
      const response = await trainingService.getOptions(trainingType);
      if (response.success) {
        setOptions(response.options);
      }
      setLoading(false);
    };
    
    fetchOptions();
  }, [open, trainingType]);
  
  const handleSelect = (target: string) => {
    onSelect(target);
    onClose();
  };
  
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid',
        borderColor: 'primary.main',
        boxShadow: 24,
        p: 4
      }}>
        <Typography variant="h6" mb={2}>
          Select {trainingType} to train
        </Typography>
        
        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {options.map(option => (
              <ListItem
                key={option.id}
                button
                onClick={() => handleSelect(option.id)}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  mb: 1,
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                <ListItemText
                  primary={option.name}
                  secondary={`Current: ${option.current}`}
                />
              </ListItem>
            ))}
          </List>
        )}
        
        <Button onClick={onClose} fullWidth sx={{ mt: 2 }}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};
```

---

### **5. CharacterStatsModal** ⬜
**Location**: `Client/webapp/src/components/GameView/CharacterStatsModal.tsx`

**Purpose**: Display full character sheet

```typescript
interface CharacterStatsModalProps {
  open: boolean;
  onClose: () => void;
}

export const CharacterStatsModal: React.FC<CharacterStatsModalProps> = ({ open, onClose }) => {
  const { character } = useGame();
  
  if (!character) return null;
  
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 1000,
        maxHeight: '90vh',
        bgcolor: 'background.paper',
        border: '2px solid',
        borderColor: 'primary.main',
        boxShadow: 24,
        p: 4,
        overflow: 'auto'
      }}>
        <Typography variant="h4" mb={3}>
          {character.name} - Level {character.level}
        </Typography>
        
        {/* Vitals */}
        <Box mb={3}>
          <Typography variant="h6" mb={1}>Vitals</Typography>
          <VitalBar label="HP" current={character.vitals.hp.current} max={character.vitals.hp.max} color="error" />
          <VitalBar label="MP" current={character.vitals.mp.current} max={character.vitals.mp.max} color="primary" />
          <VitalBar label="SP" current={character.vitals.sp.current} max={character.vitals.sp.max} color="warning" />
        </Box>
        
        {/* Attributes */}
        <Box mb={3}>
          <Typography variant="h6" mb={1}>Attributes</Typography>
          <Grid container spacing={2}>
            {Object.entries(character.attributes).map(([key, value]) => (
              <Grid item xs={6} md={4} key={key}>
                <StatDisplay name={key} value={value.total} />
              </Grid>
            ))}
          </Grid>
        </Box>
        
        {/* Artisan Skills */}
        <Box mb={3}>
          <Typography variant="h6" mb={1}>Artisan Skills</Typography>
          <Grid container spacing={2}>
            {Object.entries(character.artisans).map(([key, value]) => (
              <Grid item xs={6} md={4} key={key}>
                <StatDisplay name={key} value={value.total} />
              </Grid>
            ))}
          </Grid>
        </Box>
        
        {/* Close Button */}
        <Button onClick={onClose} fullWidth variant="contained">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

const VitalBar: React.FC<{ label: string; current: number; max: number; color: string }> = ({
  label, current, max, color
}) => (
  <Box mb={1}>
    <Typography variant="body2">{label}: {current} / {max}</Typography>
    <LinearProgress 
      variant="determinate" 
      value={(current / max) * 100} 
      color={color as any}
      sx={{ height: 8, borderRadius: 1 }}
    />
  </Box>
);

const StatDisplay: React.FC<{ name: string; value: number }> = ({ name, value }) => (
  <Paper sx={{ p: 1, textAlign: 'center' }}>
    <Typography variant="caption" color="text.secondary">
      {name.toUpperCase()}
    </Typography>
    <Typography variant="h6">{value}</Typography>
  </Paper>
);
```

---

## **Service Layer Updates**

### **6. PartyService** ⬜
**Location**: `Client/webapp/src/services/partyService.ts`

```typescript
import { restHandler } from './RestHandler';

interface Party {
  id: string;
  name: string;
  playerCharacterId: string;
  location: string;
  gold: number;
  supplies: Record<string, number>;
  characterIds: (string | null)[];
}

class PartyService {
  async getParty(): Promise<{ success: boolean; party?: Party }> {
    try {
      const response = await restHandler.get<{ success: boolean; party: Party }>('/api/party', true);
      return response;
    } catch (error) {
      console.error('Get party error:', error);
      return { success: false };
    }
  }
}

export const partyService = new PartyService();
```

---

### **7. NewsService** ⬜
**Location**: `Client/webapp/src/services/newsService.ts`

```typescript
import { restHandler } from './RestHandler';

interface NewsItem {
  id: string;
  timestamp: string;
  scope: string;
  message: string;
  metadata: Record<string, any>;
}

class NewsService {
  async getNews(since?: string): Promise<{ success: boolean; news?: NewsItem[] }> {
    try {
      const url = since ? `/api/news?since=${since}` : '/api/news';
      const response = await restHandler.get<{ success: boolean; news: NewsItem[] }>(url, true);
      return response;
    } catch (error) {
      console.error('Get news error:', error);
      return { success: false };
    }
  }
  
  async markAsRead(timestamp: string): Promise<{ success: boolean }> {
    try {
      const response = await restHandler.post<{ lastReadTimestamp: string }, { success: boolean }>(
        '/api/news/mark-read',
        { lastReadTimestamp: timestamp },
        true
      );
      return response;
    } catch (error) {
      console.error('Mark news as read error:', error);
      return { success: false };
    }
  }
}

export const newsService = new NewsService();
```

---

### **8. TrainingService** ⬜
**Location**: `Client/webapp/src/services/trainingService.ts`

```typescript
import { restHandler } from './RestHandler';

interface TrainingOption {
  id: string;
  name: string;
  current: number;
}

class TrainingService {
  async getOptions(type: string): Promise<{ success: boolean; options?: TrainingOption[] }> {
    try {
      const response = await restHandler.get<{ success: boolean; options: TrainingOption[] }>(
        `/api/training/options?type=${type}`,
        true
      );
      return response;
    } catch (error) {
      console.error('Get training options error:', error);
      return { success: false };
    }
  }
}

export const trainingService = new TrainingService();
```

---

## **Updated GameView Integration**

### **9. GameView Updates** ⬜
**Location**: `Client/webapp/src/views/GameView.tsx`

```typescript
export const GameView: React.FC = () => {
  const { loadParty, loadCharacter, party, character } = useGame();
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  
  useEffect(() => {
    // Load data on mount
    loadParty();
    loadCharacter();
  }, []);
  
  if (!party || !character) {
    return <CircularProgress />;
  }
  
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <GameHeader />
      
      <Box sx={{ display: 'flex', flex: 1 }}>
        <GameSidebar 
          onNewsClick={() => setNewsModalOpen(true)}
          onStatsClick={() => setStatsModalOpen(true)}
        />
        
        <Box sx={{ flex: 1, p: 2 }}>
          <PartyDisplay />
        </Box>
      </Box>
      
      <NewsModal open={newsModalOpen} onClose={() => setNewsModalOpen(false)} />
      <CharacterStatsModal open={statsModalOpen} onClose={() => setStatsModalOpen(false)} />
      {/* ... other modals */}
    </Box>
  );
};
```

---

## **Implementation Checklist**

### **Core Components**
- [ ] GameContext + Provider
- [ ] GameHeader
- [ ] NewsModal
- [ ] TrainingSelectionModal
- [ ] CharacterStatsModal

### **Services**
- [ ] PartyService
- [ ] NewsService
- [ ] TrainingService
- [ ] WebSocket client integration

### **Integration**
- [ ] Wrap App with GameProvider
- [ ] Update GameView to use context
- [ ] Update GameSidebar with News button
- [ ] Connect ActionSelectionModal to training modal
- [ ] Test WebSocket events

### **Polish**
- [ ] Loading states
- [ ] Error handling
- [ ] Reconnection logic
- [ ] Notification system (toast for new news)
- [ ] Responsive design

---

**Last Updated**: October 8, 2025  
**Status**: Implementation Guide Complete - Ready for Development
