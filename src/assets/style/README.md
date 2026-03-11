# Stylesheet Architecture

> ← Back to [Assets](../README.md) | [Main README](../../../README.md)

## Overview

The file `index.css` is the **single global stylesheet** for the entire React Todo App. It defines all custom visual styling — layout, colors, typography, borders, button icons, and empty-state presentation — in approximately 127 lines of flat, class-based CSS.

This stylesheet is imported as a **side-effect** in `src/index.js` and works alongside **Bootstrap 3.4.1 CSS**, which is imported separately in the same entry point. Bootstrap provides the base grid system, typography resets, form-control classes, and the `.alert` component used for the empty-state banner. The custom stylesheet then layers application-specific overrides and additions on top of Bootstrap's foundation.

## Design System Tokens

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| Body background | `#eee` | Page background |
| Card background | `#FFF` | `.todolist` panel |
| Footer background | `#F4FCE8` | `footer` pale green tint |
| Primary text | `#555` | Base body text color |
| Footer text | `#777` | Footer element color |
| Info text | `#999` | `.todolist .info` hint text |
| Completed text | `#aaa` | `li.completed label` muted text |
| Alert text | `#888` | `.alert.alert-info` banner text |
| Card/item borders | `#ddd` | `.todolist` border, `li.ui-state-default` bottom border |
| Button divider | `#ccc` | `footer .buttons` right border |
| Filter hover | `rgba(175, 47, 47, 0.1)` | `.filters li a:hover` border |
| Filter selected | `rgba(175, 47, 47, 0.2)` | `.filters li a.selected` border |

### Spacing Scale

| Element | Value | Property |
|---------|-------|----------|
| Card padding | `20px 20px 10px 20px` | `.todolist` padding |
| Card margin | `30px auto` | `.todolist` centering |
| Footer padding | `12px 20px` | `footer` padding |
| Footer negative margins | `0 -20px -10px -20px` | `footer` extends beyond card |
| Filter link padding | `4px 8px` | `.filters li a` padding |
| Filter link margin | `3px` | `.filters li a` margin |
| Button margin | `0 5px` | `.buttons .button` margin |
| Title bottom padding | `20px` | `.todolist h1` padding-bottom |
| Info top margin | `20px` | `.todolist .info` margin-top |

### Typography

- **Title**: `text-transform: uppercase` and `text-align: center` (`.todolist h1`)
- **Completed items**: `text-decoration: line-through` (`li.completed label`)
- **Info text**: `text-align: center` (`.todolist .info`)

### Border Treatments

| Element | Value | Selector |
|---------|-------|----------|
| Card border | `1px solid #ddd` | `.todolist` |
| Card border-radius | `2px` | `.todolist` |
| Form control radius | `0` | `.form-control` |
| Item border | `1px solid #ddd` (bottom only) | `li.ui-state-default` |
| Footer top border | `1px solid #ddd` | `footer` |
| Filter link radius | `3px` | `.filters li a` |
| Filter link border | `1px solid transparent` (default) | `.filters li a` |
| Alert radius | `0` | `.alert.alert-info` |

## CSS Selectors Reference

The following table lists every selector defined in `index.css` and its purpose:

| Selector | Purpose |
|----------|---------|
| `body` | Page background and base text color |
| `.todolist` | Main card panel container |
| `.todolist h1` | Application title styling |
| `.todolist .info` | Contextual hint text positioning |
| `.form-control` | Bootstrap form control override (removes border-radius) |
| `li.ui-state-default` | Individual todo item row styling |
| `li.ui-state-default:last-child` | Removes bottom border from last item |
| `li.completed label` | Completed item visual indicator |
| `footer` | Footer container with green tint |
| `.filters` | Filter list reset |
| `.filters li` | Inline-block filter items |
| `.filters li a` | Filter tab link styling |
| `.filters li a.selected, .filters li a:hover` | Filter hover/selected state |
| `.filters li a.selected` | Active filter emphasis |
| `footer .buttons` | Button container with divider |
| `.buttons .button` | Individual toggle button base |
| `.buttons .button:hover, .buttons .button.selected` | Button hover/active state |
| `.buttons .add` | Add mode button with plus SVG |
| `.buttons .search` | Search mode button with magnifying glass SVG |
| `.alert.alert-info` | Empty state information banner |

## SVG Icon References

The add and search mode toggle buttons use **CSS `background-image`** to render their icons rather than inline `<img>` or `<svg>` elements. The relevant declarations are:

```css
.buttons .add {
    background: url(../images/add.svg) no-repeat center;
}

.buttons .search {
    background: url(../images/search.svg) no-repeat center;
}
```

- `../images/add.svg` — 24×24 plus icon for the create button
- `../images/search.svg` — 24×24 magnifying glass for the search button

These icons render as centered backgrounds within the 18×18px `.button` elements. The button opacity transitions from `0.5` to `1.0` on hover or when the corresponding mode is active (`.selected` class).

## Responsive Layout

- The `.todolist` card uses a **fixed width of 600px**, centered horizontally via `margin: 30px auto`.
- **No media queries** are present in the stylesheet — the card does not adapt to viewport changes and will overflow on screens narrower than 600px.
- The `footer` extends beyond the card's content area using **negative margins** (`margin: 0 -20px -10px -20px`), creating a full-bleed footer effect within the card border.

## Bootstrap Integration

The application imports `bootstrap/dist/css/bootstrap.css` (v3.4.1) as a separate side-effect import in `src/index.js`:

```javascript
import 'bootstrap/dist/css/bootstrap.css';
import './assets/style/index.css';
```

The custom stylesheet includes one explicit Bootstrap override:

```css
.form-control {
    border-radius: 0;
}
```

This removes the default rounded corners from Bootstrap's `.form-control` class to maintain the squared card aesthetic. No other Bootstrap class overrides are present. Bootstrap provides the base grid system, typography resets, and the `.alert` component class used by the empty-state banner in `FilteredList.js`.

## Import Pattern

The global stylesheet is loaded as a CSS side-effect import in `src/index.js`:

```javascript
import './assets/style/index.css';
```

This import does not export any values. CRA's Webpack configuration (via `react-scripts` 0.9.0) processes the CSS file, injects it into the page's `<style>` tags during development, and extracts it into a separate `.css` bundle during production builds. No other source file imports this stylesheet — it is loaded exactly once at the application entry point.

## Naming Conventions

- **Flat class-based selectors**: e.g., `.todolist`, `.buttons`, `.filters` — no deep nesting beyond two levels
- **No CSS Modules**: all styles are global
- **No CSS-in-JS**: no styled-components, Emotion, or inline style objects
- **No ID selectors**: all selectors target classes or element types
- **No `!important` overrides**: specificity is managed through selector structure alone
- **Component-oriented grouping**: selectors are grouped by the UI component they style (card → title → info → items → footer → filters → buttons → alert)

## EditorConfig Compliance

All CSS content in this folder follows the project's `.editorconfig` rules:

- **Indentation**: 4 spaces (no tabs)
- **Line endings**: LF (`\n`)
- **Encoding**: UTF-8
- **Final newline**: mandatory
- **Trailing whitespace**: trimmed
