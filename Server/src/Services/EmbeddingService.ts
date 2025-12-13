/**
 * Embedding Service
 * 
 * Generates text embeddings using local transformer model.
 * Uses @xenova/transformers with all-MiniLM-L6-v2 model (384 dimensions).
 */

import { pipeline } from "@xenova/transformers";
import type { Pipeline } from "@xenova/transformers";
import Report from "../Utils/Reporter";

const MODEL_NAME = "Xenova/all-MiniLM-L6-v2";
const EMBEDDING_DIMENSION = 384;

let embeddingPipeline: Pipeline | null = null;
let isInitializing = false;

/**
 * Initialize the embedding model (lazy loading)
 */
async function initializeModel(): Promise<Pipeline> {
  if (embeddingPipeline) {
    return embeddingPipeline as Pipeline;
  }

  if (isInitializing) {
    // Wait for initialization to complete
    while (isInitializing) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    if (embeddingPipeline) {
      return embeddingPipeline;
    }
  }

  isInitializing = true;
  try {
    Report.info("Initializing embedding model", { model: MODEL_NAME });
    
    const model = await pipeline("feature-extraction", MODEL_NAME, {
      quantized: true, // Use quantized model for faster loading
    });

    embeddingPipeline = model as Pipeline;
    Report.info("Embedding model initialized successfully");
    return embeddingPipeline;
  } catch (error) {
    Report.error("Failed to initialize embedding model", {
      error: error instanceof Error ? error.message : String(error),
      model: MODEL_NAME,
    });
    throw error;
  } finally {
    isInitializing = false;
  }
}

/**
 * Generate embedding vector for text
 * @param text - Text to embed
 * @returns Embedding vector (384 dimensions)
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const model = await initializeModel();
    
    if (!text || text.trim().length === 0) {
      throw new Error("Text cannot be empty");
    }

    // Generate embedding
    const output = await model(text, {
      pooling: "mean", // Mean pooling for sentence embeddings
      normalize: true, // Normalize for cosine similarity
    });

    // Convert tensor to array
    // @ts-ignore - output.data is a TypedArray which converts to number[]
    const embedding = Array.from(output.data) as number[];
    
    if (embedding.length !== EMBEDDING_DIMENSION) {
      Report.warn("Embedding dimension mismatch", {
        expected: EMBEDDING_DIMENSION,
        actual: embedding.length,
      });
    }

    return embedding;
  } catch (error) {
    Report.error("Error generating embedding", {
      error: error instanceof Error ? error.message : String(error),
      textLength: text.length,
    });
    throw error;
  }
}

/**
 * Generate embeddings for multiple texts (batch processing)
 * @param texts - Array of texts to embed
 * @returns Array of embedding vectors
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  try {
    const model = await initializeModel();
    
    const embeddings: number[][] = [];
    
    // Process in batches to avoid memory issues
    const BATCH_SIZE = 10;
    for (let i = 0; i < texts.length; i += BATCH_SIZE) {
      const batch = texts.slice(i, i + BATCH_SIZE);
      const batchEmbeddings = await Promise.all(
        batch.map((text) => generateEmbedding(text))
      );
      embeddings.push(...batchEmbeddings);
    }
    
    return embeddings;
  } catch (error) {
    Report.error("Error generating batch embeddings", {
      error: error instanceof Error ? error.message : String(error),
      count: texts.length,
    });
    throw error;
  }
}

/**
 * Get embedding dimension
 */
export function getEmbeddingDimension(): number {
  return EMBEDDING_DIMENSION;
}

