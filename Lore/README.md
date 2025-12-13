# Game Lore Content

This folder contains all game lore content in markdown format.

## Structure

```
Lore/
├── regions/          # Region descriptions
│   ├── central-plain.md
│   ├── southern-shore.md
│   └── ...
├── locations/        # Location descriptions
│   ├── wayward-inn.md
│   └── ...
├── characters/       # Character backgrounds
│   ├── thomas.md
│   ├── lana.md
│   └── ...
├── quests/           # Quest descriptions
│   ├── wayward-inn-intro.md
│   └── ...
└── kingdoms/         # Kingdom/empire lore
    └── ...
```

## File Format

Each markdown file should have:

```markdown
# Title

Content here...

## Metadata (optional)
- content_type: region|location|character|quest|kingdom
- content_id: unique-identifier
- tags: tag1, tag2, tag3
```

## Example

**`regions/central-plain.md`:**
```markdown
# Central Plain

The Central Plains are Eloria's fertile core, a golden expanse fed by the Great White River and crossed by iron rails. They are the continent's breadbasket and safest land, though still threatened by wolves, dragonlings, bandits, and storms.

Villages and markets cluster around stations and river crossings, the Temple of Laoh dominates faith, and the Azure Wind Caravan still roams, keeping old ways alive in a land that is both the heart of kingdoms and the first proving ground for adventurers.

## Metadata
- content_type: region
- content_id: CentralPlain
- tags: fertile, safe, breadbasket
```

## Embedding Generation

Run the embedding script to process all markdown files:

```bash
bun run embed:lore
```

This will:
1. Read all `.md` files in this folder
2. Extract content and metadata
3. Generate embeddings
4. Store in database

