# Portrait Images Needed for Mock Page

## Portrait Images Required

All portrait images should be placed in: **`/public/img/portraits/`**

### Characters Referenced in Mock Data:

1. **m_elven01.png** 
   - Character: Viljah
   - Gender: Male
   - Race: Elven
   - Used in: Party member, News tooltips (news-003, news-004, news-008)

2. **m_dwarf01.png**
   - Character: Thorin
   - Gender: Male
   - Race: Dwarf
   - Used in: Party member

3. **f_human01.png**
   - Character: Luna
   - Gender: Female
   - Race: Human
   - Used in: Party member, News tooltips (news-003, news-005)

## Portrait Specifications:

- **Format**: PNG (with transparency preferred)
- **Size**: Recommended 128x128px or higher (will be displayed at various sizes)
- **Shape**: Square images (will be cropped to circle in UI)
- **Aspect Ratio**: 1:1 (square)
- **Style**: Should be circular/portrait style suitable for character cards

## Portrait Display Sizes:

- **Party Member Cards**: 80x80px circles
- **Character Tooltips in News**: 64x64px circles (centered)
- **Character Stats Modal**: Various sizes (if used there)

## Image Path Format:

- Portrait IDs in mock data match the filename (without .png extension)
- Images will be loaded as: `/img/portraits/{portraitId}.png`
- Examples:
  - `m_elven01` → `/img/portraits/m_elven01.png`
  - `f_human01` → `/img/portraits/f_human01.png`
  - `m_dwarf01` → `/img/portraits/m_dwarf01.png`

## Notes:

- All portraits are displayed as circular with borders
- Portraits are centered in tooltips
- If a portrait is missing, the tooltip will still show but without the portrait image
- Portrait IDs follow the pattern: `{gender}_{race}{number}`
  - `m` = Male, `f` = Female
  - Race abbreviations: `elven`, `human`, `dwarf`, etc.

