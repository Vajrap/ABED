# ABED - Arcane Browser-Based Exploration & Development

## 🎮 Project Overview

ABED is an **idle MMORPG** where players control a character within a party, planning their weekly schedule of actions (training, resting, exploring) and watching their character grow over time. The game runs continuously with phases advancing every 15 minutes in real-time.

### **Core Concept**
- **Idle Gameplay**: Set your schedule and let the game run
- **Party-Based**: Control your character in a party of up to 6 members
- **Time-Based**: 4 phases per day, 6 days per week, 24 days per month
- **Action-Driven**: Plan actions like training, resting, strolling
- **News System**: Receive updates about events and character progress

---

## 📁 Project Structure

```
MyProject/
├── Client/webapp/          # React + TypeScript frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── views/          # Page-level components
│   │   ├── services/       # API service layer
│   │   ├── contexts/       # React Context providers
│   │   ├── config/         # Configuration files
│   │   └── styles/         # Global styles & theme
│   └── public/             # Static assets
│
├── Server/                 # Node.js + Express backend
│   ├── src/
│   │   ├── API/            # REST API endpoints
│   │   ├── Database/       # Drizzle ORM schemas
│   │   ├── Entity/         # Game entities (Character, Party, Location)
│   │   ├── Game/           # Game loop & time system
│   │   ├── Services/       # Business logic layer
│   │   ├── WebSocket/      # Socket.IO integration
│   │   └── Utils/          # Utility functions
│   └── Tests/              # Unit tests
│
├── Doc/                    # Project documentation
├── MPV_*.md               # MPV planning documents (see below)
└── docker-compose.yml     # PostgreSQL + services
```

---

## 📚 Documentation

### **MPV Planning Documents**

| Document | Description |
|----------|-------------|
| **[MPV_SUMMARY.md](./MPV_SUMMARY.md)** | 📋 Quick reference & overview |
| **[MPV_ROADMAP.md](./MPV_ROADMAP.md)** | 🗺️ Master plan, features, timeline |
| **[MPV_API_SPEC.md](./MPV_API_SPEC.md)** | 🔌 API endpoint specifications |
| **[MPV_DATABASE_SCHEMA.md](./MPV_DATABASE_SCHEMA.md)** | 🗄️ Database schema design |
| **[MPV_FRONTEND_GUIDE.md](./MPV_FRONTEND_GUIDE.md)** | 🎨 Frontend implementation guide |
| **[MPV_BACKEND_GUIDE.md](./MPV_BACKEND_GUIDE.md)** | ⚙️ Backend implementation guide |

**Start Here**: Read [MPV_SUMMARY.md](./MPV_SUMMARY.md) for a quick overview, then dive into specific guides based on your role.

### **Additional Documentation**

- **[DATABASE.md](./Server/DATABASE.md)** - Database setup & usage
- **[PORT_CONFIGURATION.md](./PORT_CONFIGURATION.md)** - Port assignments
- **[LANGUAGE_SWITCHING.md](./Client/webapp/LANGUAGE_SWITCHING.md)** - Localization system

---

## 🚀 Quick Start

### **Prerequisites**

- **Node.js**: v18+ (use nvm: `nvm use 18`)
- **Bun**: Latest version ([install](https://bun.sh))
- **Docker**: For PostgreSQL
- **PostgreSQL**: 15+ (via Docker)

### **1. Clone & Setup**

```bash
# Clone repository
git clone <repo-url>
cd MyProject

# Start PostgreSQL
docker-compose up postgres -d
```

### **2. Backend Setup**

```bash
cd Server

# Install dependencies
bun install

# Run database migrations
bun run db:generate
bun run db:migrate:run

# Test database connection
bun run db:test

# Start server
bun run dev
```

**Backend runs on**: `http://localhost:7890`

### **3. Frontend Setup**

```bash
cd Client/webapp

# Install dependencies
bun install

# Start dev server
bun run dev
```

**Frontend runs on**: `http://localhost:5173`

### **4. Test the Application**

1. Open browser: `http://localhost:5173`
2. Register a new account
3. Create a character
4. You should see the Game View

---

## 🎯 Current Status

### **✅ Completed (Phase 0)**

- User authentication (login/register)
- Character creation system
- Navigation flow
- Component-based architecture
- Theme system (purple/copper/teal/magenta)
- GameView layout
- Action planning modals

### **🚧 In Progress (Phase 1 - MPV)**

- Party system
- News system
- Game time API
- Action schedule API
- WebSocket integration
- Action processing

### **📋 Planned (Phase 2+)**

- Travel system
- Battle system
- NPC recruitment
- Crafting system
- Quest system
- Market/economy

**See [MPV_ROADMAP.md](./MPV_ROADMAP.md) for detailed feature list and timeline.**

---

## 🛠️ Development

### **Backend Development**

```bash
cd Server

# Run in development mode
bun run dev

# Run tests
bun test

# Database commands
bun run db:generate    # Generate migration from schema changes
bun run db:migrate:run # Run migrations
bun run db:test        # Test database connection

# Manual time advance (testing)
curl -X POST http://localhost:7890/api/game/time/advance \
  -H "Content-Type: application/json" \
  -d '{"phases": 1}'
```

### **Frontend Development**

```bash
cd Client/webapp

# Run in development mode
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Lint code
bun run lint
```

### **Database Management**

```bash
# Start PostgreSQL
docker-compose up postgres -d

# Stop PostgreSQL
docker-compose stop postgres

# View logs
docker-compose logs -f postgres

# Connect to database
docker exec -it myproject-postgres-1 psql -U abed_user -d abed_db
```

---

## 🎮 Game Mechanics

### **Time System**

- **Real-time**: 15 minutes = 1 game phase
- **Game day**: 4 phases (morning, afternoon, evening, night)
- **Game week**: 6 days (Laoh, Rowana, Aftree, Udur, Matris, Seethar)
- **Game month**: 24 days
- **Game year**: 14 months

### **Action System**

Players plan a weekly schedule (6 days × 4 phases = 24 action slots):

**Basic Actions (MPV):**
- **Rest**: Restore HP/MP/SP
- **Strolling**: Explore, chance for events
- **Train Attribute**: Increase STR, INT, VIT, etc.
- **Train Artisan**: Increase smithing, cooking, etc.

**Future Actions:**
- Training proficiencies/skills
- Crafting items
- Social activities
- Combat/quests

### **News System**

Events generate news at different scopes:
- **Private**: Only you see (e.g., "You rested and recovered 20 HP")
- **Party**: Your party sees (e.g., "Party found 50 gold")
- **Location**: Everyone at location sees
- **Region/World**: Broader events (post-MPV)

---

## 🔧 Technology Stack

### **Frontend**
- **Framework**: React 18 + TypeScript
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router v6
- **State Management**: React Context (MPV), Redux Toolkit (future)
- **WebSocket**: Socket.IO client
- **Build Tool**: Vite
- **Package Manager**: Bun

### **Backend**
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL 15
- **ORM**: Drizzle ORM
- **WebSocket**: Socket.IO
- **Authentication**: Session-based (JWT future)
- **Package Manager**: Bun

### **DevOps**
- **Containerization**: Docker + Docker Compose
- **Database**: PostgreSQL in Docker
- **Logging**: Custom Reporter class
- **Testing**: Bun test runner

---

## 📊 API Endpoints

### **Authentication**
- `POST /api/register` - Create account
- `POST /api/login` - Login
- `GET /api/auth` - Validate session

### **Character**
- `POST /api/character/create` - Create character
- `GET /api/character` - Get character data
- `POST /api/character/schedule` - Update action schedule
- `GET /api/character/schedule` - Get action schedule

### **Party (MPV)**
- `GET /api/party` - Get party data

### **Game (MPV)**
- `GET /api/game/time` - Get current game time
- `POST /api/game/time/advance` - Manually advance time (admin)

### **News (MPV)**
- `GET /api/news` - Get news feed
- `POST /api/news/mark-read` - Mark news as read

**See [MPV_API_SPEC.md](./MPV_API_SPEC.md) for full API documentation.**

---

## 🔌 WebSocket Events

### **Server → Client**
- `time:advanced` - Game phase advanced
- `news:new` - New news items
- `character:updated` - Character stats changed
- `party:updated` - Party resources changed

### **Client → Server**
- `subscribe:party` - Subscribe to party updates
- `unsubscribe:party` - Unsubscribe from party updates

---

## 🧪 Testing

### **Backend Tests**

```bash
cd Server
bun test

# Run specific test file
bun test Tests/Services/CharacterService.pure.test.ts
```

### **Manual Testing**

1. **Character Creation Flow**:
   - Register → Login → Create Character → See Game View

2. **Action Planning**:
   - Click "Schedule" → Plan actions → Save → Verify saved

3. **Time Advance** (Admin):
   ```bash
   curl -X POST http://localhost:7890/api/game/time/advance \
     -H "Content-Type: application/json" \
     -d '{"phases": 1}'
   ```

4. **News System**:
   - Advance time → Check news modal → Verify news appears

---

## 🐛 Troubleshooting

### **Backend won't start**
```bash
# Check PostgreSQL is running
docker-compose ps

# Restart PostgreSQL
docker-compose restart postgres

# Check logs
docker-compose logs -f postgres
```

### **Frontend build fails**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
bun install

# Check Node version (should be 18+)
node -v
nvm use 18
```

### **Database connection fails**
```bash
# Test connection
cd Server
bun run db:test

# Check environment variables
cat .env

# Verify DATABASE_URL is correct
```

### **WebSocket not connecting**
- Check backend is running on port 7890
- Verify token in localStorage
- Check browser console for errors
- Verify CORS settings in `Server/src/index.ts`

---

## 🤝 Contributing

### **Development Workflow**

1. **Pick a task** from MPV_ROADMAP.md
2. **Create a branch**: `git checkout -b feature/task-name`
3. **Implement** following the relevant guide
4. **Test** thoroughly
5. **Commit** with clear messages
6. **Push** and create PR

### **Code Style**

- **TypeScript**: Strict mode enabled
- **Formatting**: Use Prettier (configured in project)
- **Linting**: ESLint rules enforced
- **Naming**: camelCase for variables, PascalCase for components

### **Commit Messages**

```
feat: Add party system API endpoint
fix: Resolve WebSocket disconnection issue
docs: Update MPV roadmap with progress
test: Add unit tests for CharacterService
```

---

## 📞 Support

### **Documentation**
- Start with [MPV_SUMMARY.md](./MPV_SUMMARY.md)
- Check relevant guide for your task
- Review existing code in similar areas

### **Common Issues**
- See Troubleshooting section above
- Check GitHub issues
- Review error logs in `Server/logs/`

---

## 📜 License

[Your License Here]

---

## 🎉 Acknowledgments

- Built with love for idle game enthusiasts
- Inspired by classic RPGs and modern idle games
- Special thanks to all contributors

---

**Last Updated**: October 8, 2025  
**Version**: MPV Development Phase  
**Status**: Active Development 🚀

---

## 🚀 Quick Links

- **[Get Started](./MPV_SUMMARY.md)** - Quick reference
- **[Roadmap](./MPV_ROADMAP.md)** - Feature plan
- **[API Docs](./MPV_API_SPEC.md)** - API reference
- **[Database](./MPV_DATABASE_SCHEMA.md)** - Schema design
- **[Frontend Guide](./MPV_FRONTEND_GUIDE.md)** - UI implementation
- **[Backend Guide](./MPV_BACKEND_GUIDE.md)** - Server implementation

**Ready to build? Start with [MPV_SUMMARY.md](./MPV_SUMMARY.md)!** 🎮
