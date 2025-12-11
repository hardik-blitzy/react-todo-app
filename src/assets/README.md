# Assets

> ← Back to [src](../README.md) | [Main README](../../README.md)

## Overview

This folder contains static UI assets used throughout the React Todo App. The assets are organized into three categories: images for SVG icons, styles for global CSS, and text for locale string constants. These resources support the visual presentation and internationalization of the application.

## Contents

### images/

Contains SVG icon files used in the application UI.

| File | Description | Size |
|------|-------------|------|
| `add.svg` | Plus icon for the create/add button | 24×24 |
| `search.svg` | Magnifying glass icon for the search button | 24×24 |

These icons are referenced as CSS background images in the `ButtonWrapper` component styling. The SVG format ensures crisp rendering at any display resolution.

### style/

Contains the global stylesheet for the application.

| File | Description |
|------|-------------|
| `index.css` | Global styles imported by the application entry point |

The `index.css` file provides styling for:

- **Body**: Background color (`#eee`) and text color (`#555`)
- **Container**: `.todolist` class with 600px width, centered layout, white background, and rounded border
- **Header**: Centered, uppercase title styling
- **Todo items**: `li.ui-state-default` with bottom borders and white background
- **Completed items**: `li.completed label` with line-through text decoration
- **Footer**: Green-tinted background (`#F4FCE8`) with filter buttons and mode buttons
- **Filter buttons**: `.filters` with hover and selected states using semi-transparent red borders
- **Icon buttons**: `.buttons .add` and `.buttons .search` classes referencing the SVG icons

This stylesheet works alongside Bootstrap CSS, which is imported separately in `src/index.js`.

### text/

Contains locale string constants for internationalization support.

| File | Description |
|------|-------------|
| `en_US.js` | English (US) locale constants |

The `en_US.js` file exports three string constants:

| Constant | Value | Usage |
|----------|-------|-------|
| `MSG_NO_ITEMS` | "There are no items." | Displayed when the todo list is empty |
| `INFO_SHORTCUT_KEYS` | "Press \`/\` to search and \`N\` to create a new item." | Keyboard shortcut hints shown in default mode |
| `INFO_CANCEL_SHORTCUT_KEY` | "Press \`Esc\` to cancel." | Hint shown during search or create mode |

This structure enables future internationalization by adding additional locale files (e.g., `es_ES.js`, `fr_FR.js`).

## Usage

### Importing Styles

The global stylesheet is imported as a side effect in `src/index.js`:

```javascript
import './assets/style/index.css';
```

### Using SVG Icons

The SVG icons are not imported directly in JavaScript. Instead, they are referenced in `index.css` as background images:

```css
.buttons .add {
    background: url(../images/add.svg) no-repeat center;
}

.buttons .search {
    background: url(../images/search.svg) no-repeat center;
}
```

### Importing Locale Constants

Components import specific constants from the locale file:

```javascript
// In FilteredList.js
import { MSG_NO_ITEMS } from '../../assets/text/en_US';

// In Info.js
import { INFO_SHORTCUT_KEYS, INFO_CANCEL_SHORTCUT_KEY } from '../../assets/text/en_US';
```

## Related

- [components/ui/](../components/ui/README.md) — UI components that consume these assets
  - `FilteredList.js` uses `MSG_NO_ITEMS` for empty state
  - `Info.js` uses `INFO_SHORTCUT_KEYS` and `INFO_CANCEL_SHORTCUT_KEY` for hints
  - `ButtonWrapper.js` displays icons via CSS classes defined in `index.css`
- [src/](../README.md) — Source overview and entry point documentation
