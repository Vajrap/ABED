# Vector Search Performance Explained

## How Vector Search Works

### Two-Step Process

```
Step 1: Generate Query Embedding (Transformer - Server)
  ↓
Step 2: Vector Similarity Search (pgvector - PostgreSQL)
  ↓
Results
```

### Step 1: Query Embedding Generation (~100ms)

**What happens:**
- Uses `@xenova/transformers` (local transformer)
- Converts search query text → vector (384 numbers)
- Runs in your Node.js server

**Performance:**
- First call: ~500ms (model loading)
- Subsequent calls: ~50-100ms (model in memory)
- CPU-bound (not GPU)

**When it happens:**
- Only when you search (not on every request)
- Only for the query text (not all database vectors)

---

### Step 2: Vector Similarity Search (~1-10ms)

**What happens:**
- Uses **pgvector** extension in PostgreSQL
- Compares query vector against stored vectors
- Returns top N most similar results

**Performance:**
- **Without index**: ~10-50ms (linear scan)
- **With ivfflat index**: ~1-10ms (approximate nearest neighbor)
- Runs in PostgreSQL (separate process, optimized C code)

**When it happens:**
- Database query (PostgreSQL handles it)
- No transformer model involved
- Uses optimized vector operations

---

## Performance Breakdown

### Example: Searching for "Central Plains"

```typescript
// Step 1: Generate embedding (~100ms)
const queryEmbedding = await generateEmbedding("Central Plains");
// [0.123, -0.456, 0.789, ...] (384 numbers)

// Step 2: Database search (~5ms with index)
const results = await db.execute(sql`
  SELECT *, embedding <=> '${queryEmbedding}'::vector as distance
  FROM lore_embeddings
  ORDER BY distance
  LIMIT 5
`);
```

**Total time: ~105ms** (mostly embedding generation)

---

## Why It's Fast

### 1. pgvector is Optimized C Code

- Runs in PostgreSQL (not Node.js)
- Uses SIMD instructions (CPU vector operations)
- Highly optimized for vector math
- Separate process (doesn't block Node.js)

### 2. ivfflat Index Speeds Up Searches

```sql
CREATE INDEX lore_embeddings_vector_idx 
ON lore_embeddings 
USING ivfflat (embedding vector_cosine_ops) 
WITH (lists = 100);
```

**What it does:**
- Pre-clusters vectors into lists
- Searches only relevant clusters (not all vectors)
- 10-100x faster than linear scan

**Performance:**
- 1,000 vectors: ~1-2ms
- 10,000 vectors: ~2-5ms
- 100,000 vectors: ~5-10ms

### 3. Embedding Only Generated Once Per Query

- Query text → embedding (once)
- Database search (fast, uses index)
- No need to re-embed stored vectors

---

## Server Load Impact

### Minimal Impact on Server

**Why:**
1. **Embedding generation** (~100ms):
   - Only happens when searching
   - CPU-bound (doesn't block I/O)
   - Model stays in memory (no reload)

2. **Vector search** (PostgreSQL):
   - Runs in separate process
   - Doesn't use Node.js CPU
   - Uses PostgreSQL's optimized code

### Typical Workflow

```
NPC Chat Request
  ↓
Need lore info? → Generate query embedding (~100ms)
  ↓
PostgreSQL vector search (~5ms)
  ↓
Include in prompt
  ↓
Send to LM Studio (external)
```

**Total overhead: ~105ms** (mostly embedding generation)

---

## Performance Comparison

| Operation | Time | Where |
|-----------|------|-------|
| Generate embedding | ~100ms | Node.js server |
| Vector search (1K vectors) | ~1-2ms | PostgreSQL |
| Vector search (10K vectors) | ~2-5ms | PostgreSQL |
| Vector search (100K vectors) | ~5-10ms | PostgreSQL |
| Full text search (PostgreSQL) | ~10-50ms | PostgreSQL |

**Note:** Vector search scales better than full-text search for semantic similarity.

---

## Optimization Tips

### 1. Cache Query Embeddings

If you search for the same query multiple times:

```typescript
const queryCache = new Map<string, number[]>();

async function getCachedEmbedding(query: string): Promise<number[]> {
  if (queryCache.has(query)) {
    return queryCache.get(query)!;
  }
  const embedding = await generateEmbedding(query);
  queryCache.set(query, embedding);
  return embedding;
}
```

### 2. Batch Searches

If searching multiple queries:

```typescript
// Generate all embeddings first
const embeddings = await generateEmbeddings([
  "Central Plains",
  "Wayward Inn",
  "Thomas the innkeeper"
]);

// Then search (PostgreSQL handles multiple queries efficiently)
```

### 3. Use Content Type Filters

Filtering by `content_type` reduces search space:

```typescript
// Faster: searches only regions
await searchSimilar("plains", 5, "region");

// Slower: searches all content types
await searchSimilar("plains", 5);
```

---

## Real-World Performance

### Scenario: NPC Chat with RAG

```
1. Player: "Tell me about the Central Plains"
2. Generate embedding: ~100ms
3. Vector search: ~5ms
4. Retrieve top 3 results: ~1ms
5. Build prompt with lore: ~1ms
6. Send to LM Studio: ~2000ms (external)

Total RAG overhead: ~107ms (5% of total time)
```

**Conclusion:** RAG adds minimal overhead compared to LLM generation.

---

## Monitoring Performance

### Check Query Performance

```sql
-- Check index usage
EXPLAIN ANALYZE
SELECT *, embedding <=> '[0.1,0.2,...]'::vector as distance
FROM lore_embeddings
ORDER BY distance
LIMIT 5;

-- Should show: "Index Scan using lore_embeddings_vector_idx"
```

### Monitor Embedding Generation

```typescript
const start = Date.now();
const embedding = await generateEmbedding("query");
const duration = Date.now() - start;
Report.debug("Embedding generation time", { duration });
```

---

## Summary

✅ **Vector search is fast:**
- Uses pgvector (optimized C code in PostgreSQL)
- With index: ~1-10ms even for thousands of vectors
- Runs in PostgreSQL (doesn't slow Node.js server)

✅ **Embedding generation is acceptable:**
- ~100ms per query (only when searching)
- Model stays in memory (no reload overhead)
- Can be cached for repeated queries

✅ **Minimal server impact:**
- Most work happens in PostgreSQL
- Only query embedding runs in Node.js
- Total overhead: ~100ms per search

**Bottom line:** Vector search won't slow down your server significantly. The bottleneck is usually LLM generation (LM Studio), not vector search.

