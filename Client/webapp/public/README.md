# Public Assets Directory

This directory contains static assets that are served directly by the web server without processing.

## 📁 Directory Structure

```
public/
├── music/                 # Game music and sound effects
│   ├── tavern-melody.mp3
│   ├── mystical-forest.mp3
│   └── steam-workshop.mp3
├── images/               # Static images and graphics
│   ├── backgrounds/      # Background images
│   ├── characters/       # Character portraits and sprites
│   ├── ui/              # UI elements and icons
│   └── logo.png         # App logo
├── icons/               # Favicons and app icons
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── android-chrome-*.png
└── README.md           # This file
```

## 🎵 Music Files

### Format Requirements
- **Format**: MP3 (preferred) or OGG
- **Bitrate**: 128-192 kbps (balance between quality and size)
- **Sample Rate**: 44.1 kHz
- **Max File Size**: 5MB per track (for web performance)

### Current Tracks
- `tavern-melody.mp3` - Background music for town/social areas
- `mystical-forest.mp3` - Ambient music for exploration
- `steam-workshop.mp3` - Workshop/crafting background music

### Adding New Music
1. Place MP3 files in `/public/music/`
2. Update `SAMPLE_TRACKS` array in `src/components/MusicPlayer.tsx`
3. Test playback in development server

## 🖼️ Image Files

### Format Guidelines
- **Logos**: SVG (scalable) or PNG with transparency
- **Backgrounds**: JPG (smaller file size) or WebP
- **UI Elements**: PNG or SVG
- **Icons**: SVG (preferred) or PNG

### Optimization
- Compress images before adding (use tools like TinyPNG)
- Use WebP format when browser support allows
- Keep file sizes under 1MB each

### Directory Purpose
- `/backgrounds/` - Large background images for pages
- `/characters/` - Character portraits and game sprites
- `/ui/` - Interface elements, buttons, borders
- `/logo.png` - Main application logo

## 🔗 URL Access

All files in this directory are accessible via direct URLs:

### Development
```
http://localhost:3000/music/tavern-melody.mp3
http://localhost:3000/images/logo.png
http://localhost:3000/favicon.ico
```

### Production
```
https://yourdomain.com/music/tavern-melody.mp3
https://yourdomain.com/images/logo.png
https://yourdomain.com/favicon.ico
```

## 📝 Usage in Code

### Audio Files
```typescript
// In components - reference by absolute path
const audioSrc = "/music/tavern-melody.mp3";

// In HTML audio element
<audio src="/music/tavern-melody.mp3" />
```

### Image Files
```typescript
// In React components
<img src="/images/logo.png" alt="ABED Logo" />

// In CSS
background-image: url('/images/backgrounds/medieval-castle.jpg');
```

## ⚠️ Important Notes

### Do NOT put in `public/`:
- Files that need bundling/optimization (use `src/assets/` instead)
- Files that change frequently during development
- Sensitive files or source code
- Files larger than 10MB (consider CDN or compression)

### Always put in `public/`:
- Audio/music files (like your game OST)
- Large static images
- Files referenced by absolute URLs
- Favicon and app icons
- Files that external services need to access directly

## 🔧 Build Process

During `bun run build`:
1. All files in `public/` are copied to `dist/` unchanged
2. Directory structure is preserved
3. URLs remain the same (`/music/...` works in production)

## 📊 File Size Guidelines

- **Music**: 2-5MB per track
- **Background Images**: 200KB - 1MB
- **UI Images**: 10-100KB
- **Icons**: 1-50KB
- **Total public folder**: Keep under 50MB for good loading performance

## 🎮 Game-Specific Assets

### Medieval/Steampunk Theme
- Use warm color palettes (browns, brass, copper)
- Authentic medieval/industrial imagery
- High-quality audio that matches the theme

### Asset Naming Convention
- Use kebab-case: `steam-workshop.mp3`
- Be descriptive: `tavern-background-music.mp3`
- Include context: `ui-button-hover.png`

## 📦 Adding Assets

1. **Create appropriate subdirectory** if needed
2. **Optimize file size** before adding
3. **Test in development** server
4. **Update relevant components** that use the assets
5. **Commit changes** to version control

Remember: Files in `public/` are served as-is, so make sure they're optimized and ready for production!
