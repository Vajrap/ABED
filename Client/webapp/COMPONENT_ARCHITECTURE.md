# Component-Based Architecture

## Philosophy

We are transitioning to a **component-based architecture** where reusable UI components are centralized in `src/components/` and shared across all views. This approach ensures consistency, maintainability, and reduces code duplication.

## Core Principles

### 1. **Reusability First**
- Components in `src/components/` should be **highly reusable** across multiple views
- Each component should serve a **single, well-defined purpose**
- Components should be **self-contained** with their own logic and styling

### 2. **Consistency Over Flexibility**
- Components should enforce **consistent styling** across the app
- **No custom style props** - all styling is internal to maintain visual consistency
- Use theme variables for colors, spacing, and typography

### 3. **Clear Separation of Concerns**
- **Components** (`src/components/`) - Reusable UI elements
- **Views** (`src/views/`) - Page-level components that compose smaller components
- **Services** (`src/services/`) - API calls and business logic
- **ViewModels** (`src/viewmodels/`) - State management and validation logic

## Component Guidelines

### When to Create a Component

✅ **Create a component when:**
- The UI element is used in **2+ places**
- The element has **complex logic** that should be isolated
- The element has **consistent styling** requirements
- The element represents a **common UI pattern** (modals, alerts, cards, etc.)

❌ **Don't create a component when:**
- It's only used **once** and is simple
- It's too **tightly coupled** to a specific view
- It's just a wrapper with no logic

### Component Structure

```
src/components/
├── Alert/              # Alert/Modal components
│   ├── AlertBox.tsx    # Main alert component
│   └── index.ts        # Barrel export
├── MusicPlayer/        # Music player feature
│   └── ...
├── LanguageSwitcher/   # Language selection
│   └── ...
└── VR/                 # VR-related components
    └── ...
```

## Component: AlertBox

### Purpose
A **floating, fixed-position alert/dialog box** that displays messages and actions to the user.

### Design Requirements

#### Positioning
- **Fixed position** - Always visible on screen
- **Centered** - Horizontally and vertically centered
- **Overlay** - Semi-transparent backdrop
- **Z-index** - High enough to appear above all content

#### Styling
- **Consistent theme** - Uses app theme colors and fonts
- **No style props** - Ensures visual consistency across all uses
- **Responsive** - Works on all screen sizes
- **Animated** - Smooth fade-in/fade-out transitions

#### Functionality
- **Multiple buttons** - Supports 0 to N action buttons
- **Button callbacks** - Each button has its own click handler
- **Default behavior** - Single "OK" (รับทราบ) button that closes the alert
- **Auto-close** - Closes when any button is clicked (unless prevented)
- **Backdrop click** - Optional close on backdrop click

### API Design

```typescript
interface AlertButton {
  label: string;           // Button text (supports i18n keys)
  onClick?: () => void;    // Optional callback (default: close alert)
  variant?: "primary" | "secondary" | "danger"; // Button style variant
}

interface AlertBoxProps {
  open: boolean;                    // Controls visibility
  onClose: () => void;              // Callback when alert closes
  title?: string;                   // Alert title (optional)
  message: string;                  // Alert message (required)
  severity?: "info" | "warning" | "error" | "success"; // Alert type
  buttons?: AlertButton[];          // Custom buttons (default: OK button)
}
```

### Usage Examples

#### Example 1: Simple Info Alert (Default)
```typescript
<AlertBox
  open={showAlert}
  onClose={() => setShowAlert(false)}
  message="Character created successfully!"
  severity="success"
/>
// Renders with default "OK" button that closes the alert
```

#### Example 2: Confirmation Dialog
```typescript
<AlertBox
  open={showConfirm}
  onClose={() => setShowConfirm(false)}
  title="Confirm Deletion"
  message="Are you sure you want to delete this character?"
  severity="warning"
  buttons={[
    {
      label: "Cancel",
      variant: "secondary",
      onClick: () => setShowConfirm(false)
    },
    {
      label: "Delete",
      variant: "danger",
      onClick: () => {
        deleteCharacter();
        setShowConfirm(false);
      }
    }
  ]}
/>
```

#### Example 3: Multi-Action Alert
```typescript
<AlertBox
  open={showSavePrompt}
  onClose={() => setShowSavePrompt(false)}
  title="Unsaved Changes"
  message="You have unsaved changes. What would you like to do?"
  severity="warning"
  buttons={[
    {
      label: "Discard",
      variant: "secondary",
      onClick: () => {
        discardChanges();
        setShowSavePrompt(false);
      }
    },
    {
      label: "Save",
      variant: "primary",
      onClick: () => {
        saveChanges();
        setShowSavePrompt(false);
      }
    },
    {
      label: "Cancel",
      variant: "secondary",
      onClick: () => setShowSavePrompt(false)
    }
  ]}
/>
```

## Future Components

### Planned Components
- **LoadingSpinner** - Consistent loading indicators
- **Card** - Reusable card container with consistent styling
- **Button** - Themed button variants (primary, secondary, danger, etc.)
- **Input** - Themed form inputs with validation display
- **Toast** - Brief notifications (auto-dismiss)
- **ConfirmDialog** - Quick confirmation wrapper around AlertBox

### Component Development Process

1. **Identify the need** - Find repeated UI patterns in views
2. **Design the API** - Define props interface with clear purpose
3. **Document first** - Update this doc with component specs
4. **Implement** - Build the component following the spec
5. **Test** - Create unit tests for component logic
6. **Refactor** - Replace old code with new component

## Benefits

✅ **Consistency** - All alerts look and behave the same  
✅ **Maintainability** - Change once, update everywhere  
✅ **Testability** - Components can be tested in isolation  
✅ **Reusability** - Write once, use everywhere  
✅ **Quality** - More time to polish fewer components  

---

**Last Updated:** October 7, 2025  
**Status:** In Progress - Starting with AlertBox component

