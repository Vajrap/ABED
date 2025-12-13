# Embeddings vs LLM: Understanding the Difference

## Two Separate Systems

### 1. **Embeddings (RAG System)** - Local, Separate from LM Studio

**What it does:**
- Generates **vector representations** of text (numbers/vectors)
- Used for **similarity search** (finding relevant lore content)
- Runs **locally in your Node/Bun server**

**Technology:**
- Library: `@xenova/transformers` (JavaScript port of Hugging Face transformers)
- Model: `Xenova/all-MiniLM-L6-v2` (384 dimensions, ~90MB)
- Runs: **Inside your server process** (not LM Studio)

**How it works:**
```typescript
// This runs LOCALLY in your server
import { generateEmbedding } from "./Services/EmbeddingService";

const text = "The Central Plains are fertile...";
const embedding = await generateEmbedding(text);
// Returns: [0.123, -0.456, 0.789, ...] (384 numbers)
```

**Purpose:**
- Store game lore in database as vectors
- When AI needs info, search for similar content
- Retrieve relevant lore to include in prompts

---

### 2. **LLM (LM Studio)** - External Service for Chat

**What it does:**
- Generates **text responses** (NPC dialogue)
- Used for **conversation** and **chat**
- Runs **separately** (LM Studio application)

**Technology:**
- Service: LM Studio (local LLM server)
- Model: Whatever you load in LM Studio (e.g., Llama, Mistral, etc.)
- Runs: **Separate process** (LM Studio app)

**How it works:**
```typescript
// This calls LM Studio API (external service)
import { callLMStudio } from "./Services/LMStudioService";

const response = await callLMStudio({
  prompt: "You are an NPC...",
  npcId: "...",
});
// Returns: "Hello! How can I help you?" (text response)
```

**Purpose:**
- Generate NPC dialogue
- Understand player messages
- Make decisions (tool calling)

---

## The Flow: How They Work Together

```
1. Player asks NPC: "Tell me about the Central Plains"

2. RAG System (Embeddings):
   ├─ Search lore_embeddings table
   ├─ Find similar content about "Central Plains"
   └─ Retrieve: "The Central Plains are Eloria's fertile core..."

3. Build Prompt:
   ├─ NPC character prompt
   ├─ Retrieved lore (from RAG)
   ├─ Player's message
   └─ Send to LM Studio

4. LM Studio (LLM):
   ├─ Receives prompt with lore context
   ├─ Generates response
   └─ Returns: "Ah, the Central Plains! They are indeed..."

5. NPC responds to player
```

---

## Key Differences

| Feature | Embeddings (RAG) | LLM (LM Studio) |
|---------|-----------------|-----------------|
| **Purpose** | Find relevant content | Generate text |
| **Input** | Text | Text + Context |
| **Output** | Vector (numbers) | Text |
| **Runs** | Local (in server) | External (LM Studio) |
| **Model** | all-MiniLM-L6-v2 | Your choice in LM Studio |
| **Library** | @xenova/transformers | HTTP API calls |
| **When Used** | Before chat (retrieval) | During chat (generation) |

---

## Why Separate?

1. **Different Models**: Embeddings use small, fast models. LLMs use large, slow models.
2. **Different Purposes**: Embeddings = search, LLMs = generation
3. **Performance**: Embeddings run instantly, LLMs take seconds
4. **Cost**: Embeddings are free (local), LLMs can be expensive

---

## You DON'T Need to Configure Embeddings in LM Studio

**Common Confusion:**
- ❌ "Do I need to load all-MiniLM-L6-v2 in LM Studio?"
- ✅ **NO!** Embeddings run separately in your server

**What you DO need:**
- ✅ Load an LLM model in LM Studio (for chat)
- ✅ Embeddings automatically download when first used
- ✅ They're completely independent systems

---

## Model Selection

### For Embeddings (Automatic):
- Model: `Xenova/all-MiniLM-L6-v2`
- Downloads automatically on first use
- Cached locally (~90MB)
- No configuration needed

### For LLM (You Choose):
- Open LM Studio
- Download any LLM model you want (Llama, Mistral, etc.)
- Load it in LM Studio
- Server connects via API

---

## Summary

- **Embeddings**: Local, automatic, for search → Don't configure in LM Studio
- **LLM**: External, you choose model, for chat → Configure in LM Studio

They work together but are completely separate systems!

