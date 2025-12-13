/**
 * Lore Content Embedding Script (From Markdown Files)
 * 
 * Reads lore content from markdown files in the Lore/ directory
 * and generates embeddings for RAG retrieval.
 */

import { readdir, readFile, stat } from "fs/promises";
import { join, extname, basename, dirname } from "path";
import { fileURLToPath } from "url";
import { storeLoreContent, createVectorIndex } from "../src/Services/RAGService";
import Report from "../src/Utils/Reporter";

// Get Lore directory: from Server/scripts/ -> up to Server/ -> up to project root -> into Lore/
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const LORE_DIR = join(__dirname, "..", "..", "Lore");

interface LoreMetadata {
  content_type?: string;
  content_id?: string;
  tags?: string[];
  [key: string]: any;
}

/**
 * Parse markdown file and extract content + metadata
 */
async function parseMarkdownFile(filePath: string): Promise<{
  content: string;
  metadata: LoreMetadata;
  contentType: string;
  contentId: string;
} | null> {
  try {
    const fileContent = await readFile(filePath, "utf-8");
    const fileName = basename(filePath, ".md");
    
    // Extract metadata from frontmatter or metadata section
    let content = fileContent;
    let metadata: LoreMetadata = {};
    
    // Check for YAML frontmatter
    const frontmatterMatch = fileContent.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
    if (frontmatterMatch && frontmatterMatch[1] && frontmatterMatch[2]) {
      const frontmatter = frontmatterMatch[1];
      content = frontmatterMatch[2];

      // Parse YAML-like frontmatter (simple key-value)
      for (const line of frontmatter.split("\n")) {
        const match = line.match(/^(\w+):\s*(.+)$/);
        if (match && match[1] && match[2]) {
          const key = match[1].trim();
          let value: any = match[2].trim();

          // Handle arrays (tags: tag1, tag2)
          if (value.includes(",")) {
            value = value.split(",").map((v: string) => v.trim());
          }

          metadata[key] = value;
        }
      }
    }
    
    // Check for metadata section at end
    const metadataSectionMatch = content.match(/## Metadata\s*\n([\s\S]*?)(?=\n##|\n#|$)/);
    if (metadataSectionMatch && metadataSectionMatch[1]) {
      const metadataText = metadataSectionMatch[1];
      content = content.replace(/## Metadata\s*\n[\s\S]*?$/, "").trim();

      // Parse metadata lines
      for (const line of metadataText.split("\n")) {
        const match = line.match(/^-\s*(\w+):\s*(.+)$/);
        if (match && match[1] && match[2]) {
          const key = match[1].trim();
          let value: any = match[2].trim();

          if (value.includes(",")) {
            value = value.split(",").map((v: string) => v.trim());
          }

          metadata[key] = value;
        }
      }
    }
    
    // Remove markdown headers from content (keep text only)
    content = content
      .replace(/^#+\s+.+$/gm, "") // Remove headers
      .replace(/^## Metadata[\s\S]*$/m, "") // Remove metadata section
      .trim();
    
    // Determine content type from folder structure
    const relativePath = filePath.replace(LORE_DIR + "/", "");
    const folder = relativePath.split("/")[0] || "";

    const contentType = metadata.content_type || (folder ? folder.slice(0, -1) : "") || "unknown"; // Remove 's' from folder name
    const contentId = metadata.content_id || fileName;
    
    // Add folder info to metadata
    metadata.folder = folder;
    metadata.source = "lore_markdown";
    
    return {
      content,
      metadata,
      contentType,
      contentId,
    };
  } catch (error) {
    Report.error("Error parsing markdown file", {
      error: error instanceof Error ? error.message : String(error),
      filePath,
    });
    return null;
  }
}

/**
 * Recursively find all markdown files in a directory
 */
async function findMarkdownFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Recursively search subdirectories
        const subFiles = await findMarkdownFiles(fullPath);
        files.push(...subFiles);
      } else if (entry.isFile() && extname(entry.name) === ".md") {
        files.push(fullPath);
      }
    }
  } catch (error) {
    Report.error("Error reading directory", {
      error: error instanceof Error ? error.message : String(error),
      dir,
    });
  }
  
  return files;
}

/**
 * Process all lore files and generate embeddings
 */
async function embedLoreFromFiles(): Promise<void> {
  try {
    // Check if Lore directory exists
    try {
      const loreDirStat = await stat(LORE_DIR);
      if (!loreDirStat.isDirectory()) {
        Report.error("Lore path exists but is not a directory", { path: LORE_DIR });
        return;
      }
    } catch (error) {
      Report.error("Lore directory not found", {
        error: error instanceof Error ? error.message : String(error),
        path: LORE_DIR,
        hint: "Create a 'Lore' folder at the project root with markdown files",
      });
      return;
    }
    
    Report.info("🔍 Scanning for markdown files...", { loreDir: LORE_DIR });
    
    // Find all markdown files
    const markdownFiles = await findMarkdownFiles(LORE_DIR);
    
    if (markdownFiles.length === 0) {
      Report.warn("No markdown files found in Lore directory", { path: LORE_DIR });
      return;
    }
    
    Report.info(`📚 Found ${markdownFiles.length} markdown files`);
    
    let successCount = 0;
    let errorCount = 0;
    
    // Process each file
    for (const filePath of markdownFiles) {
      try {
        const parsed = await parseMarkdownFile(filePath);
        
        if (!parsed || !parsed.content || parsed.content.trim().length === 0) {
          Report.warn("Skipping empty file", { filePath });
          continue;
        }
        
        await storeLoreContent(
          parsed.contentType,
          parsed.contentId,
          parsed.content,
          parsed.metadata
        );
        
        successCount++;
        Report.debug("Embedded lore file", {
          filePath,
          contentType: parsed.contentType,
          contentId: parsed.contentId,
          contentLength: parsed.content.length,
        });
      } catch (error) {
        errorCount++;
        Report.error("Error processing file", {
          error: error instanceof Error ? error.message : String(error),
          filePath,
        });
      }
    }
    
    Report.info(`✅ Successfully embedded ${successCount} files`);
    if (errorCount > 0) {
      Report.warn(`⚠️  Failed to embed ${errorCount} files`);
    }
    
    // Create vector index after all embeddings are stored
    if (successCount > 0) {
      Report.info("Creating vector index...");
      await createVectorIndex();
    }
    
  } catch (error) {
    Report.error("Error embedding lore from files", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  try {
    Report.info("🚀 Starting lore content embedding from markdown files...");
    await embedLoreFromFiles();
    Report.info("✅ Lore content embedding complete!");
  } catch (error) {
    Report.error("❌ Error embedding lore content", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.main) {
  main();
}

