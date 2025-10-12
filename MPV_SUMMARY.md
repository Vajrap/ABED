# MPV Documentation Summary

## Overview

This document provides a quick reference to all MPV planning documents and their purpose.

---

## **📚 Document Index**

### **1. MPV_ROADMAP.md** - Master Plan
**Purpose**: High-level overview of MPV scope, features, and timeline

**Key Sections:**
- Game mechanics understanding
- Feature list (completed vs. pending)
- Implementation priority (3-week plan)
- Technical decisions (answered)
- Out of scope items
- Success criteria
- Effort estimates

**Use When**: Planning sprints, understanding overall scope, checking what's in/out of MPV

---

### **2. MPV_API_SPEC.md** - API Contract
**Purpose**: Detailed specification of all backend API endpoints

**Key Sections:**
- Authentication requirements
- Party management API
- Character data API
- Game time API
- Action schedule API
- News system API
- WebSocket events
- Error responses
- Rate limiting

**Use When**: Implementing backend endpoints, writing frontend API calls, testing API

---

### **3. MPV_DATABASE_SCHEMA.md** - Data Layer
**Purpose**: Database schema design for new tables

**Key Sections:**
- Existing tables review
- New tables (parties, news, user_news_read)
- Schema modifications
- Migration plan
- Data relationships
- Query patterns
- Performance considerations

**Use When**: Creating migrations, writing database queries, understanding data model

---

### **4. MPV_FRONTEND_GUIDE.md** - UI Implementation
**Purpose**: Detailed frontend component and integration guide

**Key Sections:**
- Architecture overview (React Context strategy)
- New components to create
- Service layer updates
- GameView integration
- Implementation checklist

**Use When**: Building frontend components, integrating WebSocket, managing state

---

### **5. MPV_BACKEND_GUIDE.md** - Server Implementation
**Purpose**: Step-by-step backend implementation guide

**Key Sections:**
- Implementation order
- Database migration steps
- Service layer (Party, News, Character)
- API endpoint implementations
- WebSocket setup
- Game loop integration
- Implementation checklist

**Use When**: Building backend services, implementing APIs, integrating game loop

---

## **🎯 Quick Start Guide**

### **For Backend Developers:**

1. **Read**: MPV_ROADMAP.md (understand scope)
2. **Reference**: MPV_DATABASE_SCHEMA.md (understand data model)
3. **Follow**: MPV_BACKEND_GUIDE.md (step-by-step implementation)
4. **Validate**: MPV_API_SPEC.md (ensure API matches spec)

**Start Here**: Database migration → Party Service → API endpoints

---

### **For Frontend Developers:**

1. **Read**: MPV_ROADMAP.md (understand scope)
2. **Reference**: MPV_API_SPEC.md (understand API contract)
3. **Follow**: MPV_FRONTEND_GUIDE.md (component implementation)
4. **Test**: With backend running, test WebSocket integration

**Start Here**: GameContext → GameHeader → NewsModal

---

### **For Full-Stack Developers:**

**Week 1: Backend Foundation**
- Day 1-2: Database schema + Party Service
- Day 3-4: API endpoints (party, time, news)
- Day 5: WebSocket setup
- Day 6-7: Game loop integration + testing

**Week 2: Frontend Integration**
- Day 1-2: GameContext + core components
- Day 3-4: Modals (News, Training, Stats)
- Day 5: WebSocket client integration
- Day 6-7: Testing + bug fixes

**Week 3: Polish & Testing**
- Day 1-2: End-to-end testing
- Day 3-4: Bug fixes + performance
- Day 5: Documentation + deployment prep
- Day 6-7: Buffer for unexpected issues

---

## **🔑 Key Technical Decisions**

### **Answered Questions:**

1. **Time Progression**: Auto-advance every 15 minutes, manual advance for testing
2. **Party Formation**: Solo start (1 character), recruitment is post-MPV
3. **Action Validation**: Client shows available, server validates on execution
4. **News Delivery**: WebSocket push + on-demand fetch
5. **State Persistence**: Auto-save every phase, immediate save on schedule change

### **Technology Stack:**

**Backend:**
- Node.js + Express
- PostgreSQL + Drizzle ORM
- Socket.IO for WebSocket
- Existing game engine (Character, Party, Location entities)

**Frontend:**
- React + TypeScript
- Material-UI (MUI)
- React Context for state
- Socket.IO client
- React Router

---

## **📊 Implementation Status**

### **Completed (Phase 0):**
- ✅ User authentication
- ✅ Character creation
- ✅ Navigation flow
- ✅ Component architecture
- ✅ Theme system
- ✅ GameView layout
- ✅ Action modals (schedule, selection)

### **In Progress (Phase 1):**
- ⬜ Database schema migration
- ⬜ Party system
- ⬜ News system
- ⬜ Game time API
- ⬜ Action schedule API
- ⬜ WebSocket integration

### **Pending (Phase 2-3):**
- ⬜ Action processing
- ⬜ Character stats modal
- ⬜ Inventory modal
- ⬜ Save/load system
- ⬜ End-to-end testing

---

## **🎮 Core Game Loop (MPV)**

```
Player logs in
    ↓
Loads GameView
    ↓
Sees party (1 character + 5 empty slots)
    ↓
Sees current game time
    ↓
Plans weekly schedule (6 days × 4 phases)
    ↓
Selects actions: Rest, Strolling, Training
    ↓
Saves schedule
    ↓
Waits for phase to advance (15 min real-time)
    ↓
Server processes actions
    ↓
Generates news
    ↓
Pushes updates via WebSocket
    ↓
Player sees news notification
    ↓
Opens news modal
    ↓
Sees "You rested and recovered 20 HP"
    ↓
Sees "Your Strength increased by 1"
    ↓
Checks character stats (HP restored, STR increased)
    ↓
Plans next week's schedule
    ↓
Repeat
```

---

## **🚀 MVP Completion Criteria**

### **Player Can:**
- ✅ Create account and character
- ⬜ See their party (1 character + 5 empty slots)
- ⬜ See current game time
- ⬜ Plan weekly action schedule
- ⬜ Select actions: Rest, Strolling, Train Attribute, Train Artisan
- ⬜ See schedule saved and persisted
- ⬜ Wait for time to advance (or manually advance for testing)
- ⬜ See news about what happened
- ⬜ See character stats change
- ⬜ View character stats modal
- ⬜ Logout and resume game

### **Technical Goals:**
- ⬜ < 200ms API response times
- ⬜ No data loss on page refresh
- ⬜ Graceful error handling
- ⬜ Clean, maintainable code
- ⬜ WebSocket reconnection handling

---

## **🛠️ Development Workflow**

### **Backend Development:**
```bash
cd Server

# 1. Create migration
bun run db:generate

# 2. Run migration
bun run db:migrate:run

# 3. Start server
bun run dev

# 4. Test API
curl http://localhost:7890/api/game/time
```

### **Frontend Development:**
```bash
cd Client/webapp

# 1. Install dependencies
bun install

# 2. Start dev server
bun run dev

# 3. Open browser
# http://localhost:5173
```

### **Testing:**
```bash
# Backend tests
cd Server
bun test

# Manual testing
# 1. Create character
# 2. Login
# 3. Check party created
# 4. Plan schedule
# 5. Advance time (admin endpoint)
# 6. Check news generated
```

---

## **📝 Common Tasks**

### **Add a New Action Type:**
1. **Backend**: Add to `ActionInput` enum
2. **Backend**: Add processing logic in `Location.processActions`
3. **Frontend**: Add to `ACTION_DEFINITIONS` in `config/actions.ts`
4. **Frontend**: Add icon/text to action config

### **Add a New API Endpoint:**
1. **Spec**: Document in `MPV_API_SPEC.md`
2. **Backend**: Create route in `Server/src/API/<module>/index.ts`
3. **Backend**: Add to `Server/src/API/index.ts`
4. **Frontend**: Add method in `Client/webapp/src/services/<service>.ts`
5. **Test**: Verify with curl or Postman

### **Add a New Modal:**
1. **Component**: Create in `Client/webapp/src/components/GameView/<Modal>.tsx`
2. **State**: Add open/close state in `GameView.tsx`
3. **Trigger**: Add button in `GameSidebar.tsx`
4. **Data**: Fetch data via service in modal's `useEffect`

---

## **🐛 Troubleshooting**

### **Backend Issues:**

**Database connection fails:**
```bash
# Check PostgreSQL is running
docker-compose ps

# Restart PostgreSQL
docker-compose restart postgres

# Check connection
bun run db:test
```

**WebSocket not connecting:**
- Check CORS settings in `Server/src/index.ts`
- Verify token in `Authorization` header
- Check browser console for errors

### **Frontend Issues:**

**API calls fail:**
- Check backend is running (`http://localhost:7890`)
- Verify token in localStorage
- Check network tab in browser DevTools

**WebSocket disconnects:**
- Check token expiration
- Verify reconnection logic in `GameContext`
- Check server logs for disconnect reason

---

## **📞 Support & Resources**

### **Documentation:**
- Backend game engine: `Server/src/Entity/`
- Database schema: `Server/src/Database/Schema/`
- Frontend components: `Client/webapp/src/components/`

### **Key Files:**
- Game loop: `Server/src/Game/GameLoop.ts`
- Character entity: `Server/src/Entity/Character/Character.ts`
- Action definitions: `Server/src/Entity/Character/Subclass/Action/CharacterAction.ts`
- Location processing: `Server/src/Entity/Location/Location.ts`

---

## **🎯 Next Steps**

### **Immediate (This Week):**
1. Review all MPV documents
2. Set up development environment
3. Start database migration
4. Implement Party Service
5. Create party API endpoint

### **Short Term (Next 2 Weeks):**
1. Complete all backend APIs
2. Implement WebSocket
3. Build frontend components
4. Integrate WebSocket client
5. Test end-to-end flow

### **Before Launch:**
1. Performance testing
2. Security review
3. Bug fixes
4. Documentation updates
5. Deployment preparation

---

**Last Updated**: October 8, 2025  
**Status**: Planning Complete - Ready for Implementation  
**Team**: Ready to start development  
**Timeline**: 2-3 weeks to MPV completion

---

## **📋 Quick Reference**

| Document | Purpose | Primary Audience |
|----------|---------|------------------|
| MPV_ROADMAP.md | Master plan & scope | Everyone |
| MPV_API_SPEC.md | API contract | Backend + Frontend |
| MPV_DATABASE_SCHEMA.md | Data model | Backend |
| MPV_FRONTEND_GUIDE.md | UI implementation | Frontend |
| MPV_BACKEND_GUIDE.md | Server implementation | Backend |
| MPV_SUMMARY.md | Quick reference | Everyone |

---

**Good luck with development! 🚀**
