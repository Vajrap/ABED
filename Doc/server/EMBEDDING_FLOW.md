# Embedding Flow Documentation

## Overview

The embedding system generates vector embeddings for game lore content stored in **markdown files** in the `Lore/` directory and stores them in the `lore_embeddings` table for RAG (Retrieval Augmented Generation) retrieval.

**Important:** Lore content is now stored separately from game code in the `Lore/` folder at the project root. This allows you to manage lore content independently without touching game definition files.

## Flow Options

There are **three ways** to trigger embedding generation:

### Option 1: CLI Script (Recommended for Initial Setup)

Run the script directly from the command line:

```bash
cd Server
bun run embed:lore
# or
bun run scripts/embed-lore-content.ts
```

**When to use:**
- Initial setup after database migration
- After adding new lore content (regions, locations, NPCs, quests)
- Manual maintenance tasks
- CI/CD pipelines

**What it does:**
1. Reads markdown files from `Lore/` directory:
   - `Lore/regions/*.md` - Region descriptions
   - `Lore/locations/*.md` - Location descriptions  
   - `Lore/characters/*.md` - Character backgrounds
   - `Lore/quests/*.md` - Quest descriptions
   - `Lore/kingdoms/*.md` - Kingdom/empire lore
2. Extracts content and metadata from markdown files
3. Generates embeddings using `@xenova/transformers` (all-MiniLM-L6-v2 model)
4. Stores embeddings in `lore_embeddings` table
5. Creates vector index for fast similarity search

---

### Option 2: Admin API Endpoint

Trigger embedding generation via HTTP API:

```bash
curl -X POST http://localhost:7890/api/admin/embed-lore \
  -H "X-Admin-Secret: your-admin-secret-here"
```

**Setup:**
1. Set `ADMIN_SECRET` environment variable in `.env` or `docker-compose.yml`:
   ```bash
   ADMIN_SECRET=your-secure-secret-key-here
   ```
2. Default secret is `"change-me-in-production"` (⚠️ change this!)

**When to use:**
- Remote server management
- Automated scripts/cron jobs
- Admin dashboard integration
- CI/CD pipelines

**Response:**
```json
{
  "success": true,
  "message": "Lore content embedding completed successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Unauthorized. Admin secret required."
}
```

---

### Option 3: Programmatic API

Call the service functions directly from code:

```typescript
import { storeLoreContent, createVectorIndex } from "../Services/RAGService";

// Store a single lore entry
await storeLoreContent(
  "region",
  "CentralPlain",
  "The Central Plains are Eloria's fertile core...",
  { name: "Central Plain", source: "custom" }
);

// Create/update vector index
await createVectorIndex();
```

**When to use:**
- Custom embedding workflows
- Incremental updates (adding single entries)
- Testing/debugging
- Custom content types

---

## Embedding Process

### Step 1: Content Extraction

The script reads markdown files from:
- `Lore/regions/*.md` - Region descriptions
- `Lore/locations/*.md` - Location descriptions
- `Lore/characters/*.md` - Character backgrounds
- `Lore/quests/*.md` - Quest descriptions
- `Lore/kingdoms/*.md` - Kingdom/empire lore

**File Format:**
Each markdown file can include:
- Content text (main body)
- YAML frontmatter (optional)
- Metadata section (optional)

See `Lore/README.md` for format details.

### Step 2: Embedding Generation

Uses `@xenova/transformers` with `Xenova/all-MiniLM-L6-v2` model:
- **Dimensions**: 384
- **Model Size**: ~90MB (quantized)
- **First Load**: Downloads model on first use (~30 seconds)
- **Subsequent Uses**: Loads from cache (instant)

### Step 3: Database Storage

Stores in `lore_embeddings` table:
- `content_type`: "region", "location", "character", "quest"
- `content_id`: Unique identifier (enum value, NPC ID, quest ID)
- `content_text`: The actual lore text
- `embedding`: Vector(384) - the embedding vector
- `metadata`: JSONB with additional info (name, source, etc.)

### Step 4: Vector Index Creation

Creates `ivfflat` index for fast cosine similarity search:
- Index name: `lore_embeddings_vector_idx`
- Only created after data exists
- Speeds up similarity queries significantly

---

## Usage in RAG System

Once embeddings are stored, they can be retrieved via `RAGService`:

```typescript
import { searchSimilar, getLoreDescription } from "../Services/RAGService";

// Search for similar lore content
const results = await searchSimilar(
  "Tell me about the Central Plains",
  5, // top 5 results
  "region" // optional: filter by content type
);

// Get specific lore entry
const description = await getLoreDescription("region", "CentralPlain");
```

---

## When to Re-run Embeddings

Re-run embedding generation when:
- ✅ **New content added**: New regions, locations, NPCs, or quests
- ✅ **Content updated**: Modified descriptions, prompts, or backgrounds
- ✅ **After database reset**: If `lore_embeddings` table is cleared
- ✅ **Model changes**: If switching to a different embedding model

**Note**: Re-running is safe - it updates existing entries based on `content_type` + `content_id`.

---

## Troubleshooting

### Model Download Issues
- First run downloads ~90MB model
- Check internet connection
- Model cached in `~/.cache/huggingface/` (or Bun's cache)

### Database Connection
- Ensure PostgreSQL is running
- Check `DATABASE_URL` environment variable
- Verify pgvector extension is installed

### Vector Index Creation Fails
- Index requires at least some data
- Run after embeddings are inserted
- Check PostgreSQL logs for errors

### Memory Issues
- Embedding generation uses CPU (not GPU)
- Large batches may take time
- Process runs sequentially (not parallel)

---

## Environment Variables

```bash
# Required
DATABASE_URL=postgres://user:pass@host:port/db

# Optional (for admin API)
ADMIN_SECRET=your-secure-secret-key-here
```

---

## Performance Notes

- **Initial Run**: ~2-5 minutes (depends on content volume)
- **Subsequent Runs**: Faster (model cached)
- **Embedding Generation**: ~100ms per text entry
- **Database Insert**: ~10-50ms per entry
- **Vector Index**: Created once, speeds up queries 10-100x

---

## Next Steps

After embeddings are generated:
1. ✅ Test RAG search: `searchSimilar("query", 5)`
2. ✅ Integrate into AI tools (Phase 2 of AI Tools Plan)
3. ✅ Add RAG retrieval to NPC chat prompts
4. ✅ Monitor embedding quality and adjust as needed

