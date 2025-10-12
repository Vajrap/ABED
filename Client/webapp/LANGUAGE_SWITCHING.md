# Language Switching Feature

## Overview

The ABED webapp now includes a floating language switcher that allows users to toggle between English (EN) and Thai (TH) languages in real-time.

## Features

- **Floating Toggle Button**: Located in bottom-right corner
- **Compact/Expanded Views**: Click to expand for full controls
- **Visual Language Switch**: Toggle between EN and TH with flags
- **Persistent Settings**: Language preference saved in localStorage
- **Reactive Updates**: All UI text updates immediately when language changes
- **Smooth Animations**: Fade transitions and hover effects

## Usage

### For Users

1. **Compact View**: Click the language icon (🌐) in bottom-right corner
2. **Expanded View**: Use the toggle switch to change between:
   - **EN** (English) 🇺🇸 - Left side
   - **TH** (Thai) 🇹🇭 - Right side
3. **Auto-Save**: Your language preference is automatically saved

### For Developers

#### Adding New Text

Add new localized text to `src/localization/index.ts`:

```typescript
export const L10N: L10NType = {
  // ... existing content
  myNewSection: {
    myNewText: {
      en: "Hello World",
      th: "สวัสดีชาวโลก",
    },
  },
};
```

#### Using Localized Text in Components

```typescript
import { useLocalization, L10N } from "@/localization";

const MyComponent: React.FC = () => {
  const { t } = useLocalization();

  return (
    <div>
      {t(L10N.myNewSection.myNewText)}
    </div>
  );
};
```

#### Listening to Language Changes

```typescript
import { subscribeToLanguageChanges } from "@/localization";

// Subscribe to language changes
const unsubscribe = subscribeToLanguageChanges((newLanguage) => {
  console.log(`Language changed to: ${newLanguage}`);
});

// Clean up subscription
unsubscribe();
```

## Technical Implementation

### Components

- **`LanguageSwitcher.tsx`**: Main floating language toggle component
- **`useLocalization` hook**: Reactive localization hook for components

### Key Features

1. **State Management**: Uses localStorage for persistence
2. **Event System**: Custom events for cross-component updates
3. **Reactive Updates**: Hook-based system for automatic re-renders
4. **Type Safety**: Full TypeScript support for all text keys

### File Structure

```
src/
├── components/
│   └── LanguageSwitcher.tsx     # Main language switcher component
├── localization/
│   └── index.ts                 # Localization data and utilities
├── types/
│   └── localization.ts          # TypeScript interfaces
└── views/
    ├── LoginView.tsx            # Uses useLocalization()
    └── RegisterView.tsx         # Uses useLocalization()
```

### Language Data Structure

```typescript
interface LocalizedText {
  en: string;
  th: string;
}

interface LoginPageL10N {
  title: LocalizedText;
  usernameLabel: LocalizedText;
  // ... more fields
}
```

## Styling

The language switcher follows the medieval/steampunk theme:

- **Colors**: Soft brown and mystical violet gradients
- **Typography**: Cinzel font for labels
- **Effects**: Backdrop blur, shadows, hover animations
- **Icons**: Language flags and Material-UI icons

## Current Translations

### Supported Sections

- ✅ **Login Page**: Title, form labels, buttons, error messages
- ✅ **Register Page**: EULA, form fields, validation messages
- ✅ **Common Elements**: Loading, error, success messages
- ✅ **Music Player**: Controls tooltips

### Translation Status

- **English**: 100% complete
- **Thai**: 100% complete (includes full EULA translation)

## Future Enhancements

### Planned Features

- [ ] RTL (Right-to-Left) text support for Arabic/Hebrew
- [ ] Additional languages (Japanese, Korean, etc.)
- [ ] Context-aware translations (formal/informal)
- [ ] Pluralization support
- [ ] Date/time localization
- [ ] Number formatting per locale

### Potential Improvements

- [ ] Lazy loading of language packs
- [ ] Translation management system
- [ ] Automatic language detection from browser
- [ ] Professional translation validation
- [ ] A/B testing for different translations

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS/Android)

## Performance

- **Bundle Size**: ~2KB additional for localization
- **Runtime**: Instant language switching
- **Memory**: Minimal impact (~1MB for all translations)
- **Persistence**: localStorage (no server calls)

## Accessibility

- **Keyboard Navigation**: Tab through language options
- **Screen Readers**: Proper ARIA labels and announcements
- **High Contrast**: Maintains visibility in all themes
- **Focus Indicators**: Clear visual focus states

## Testing

### Manual Testing

1. **Basic Functionality**:
   - Toggle between EN and TH
   - Verify all text changes immediately
   - Check persistence across page reloads

2. **UI Testing**:
   - Compact/expanded view transitions
   - Hover effects and animations
   - Mobile responsiveness

3. **Integration Testing**:
   - Works with all existing components
   - No conflicts with music player
   - Proper z-index layering

### Automated Testing

```bash
# Run component tests
bun test LanguageSwitcher

# Run localization tests
bun test localization
```

## Troubleshooting

### Common Issues

1. **Text not updating**: Check if component uses `useLocalization()` hook
2. **Missing translations**: Verify text exists in L10N object
3. **TypeScript errors**: Ensure interface definitions are up to date
4. **Persistence not working**: Check localStorage access permissions

### Debug Mode

Enable debug logging:

```javascript
localStorage.setItem('debug-localization', 'true');
```

This will log all language changes and text lookups to console.
