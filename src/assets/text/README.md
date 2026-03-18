# Text — Locale Constants

> ← Back to [Assets](../README.md) | [src](../../README.md) | [Main README](../../../README.md)

## Overview

This folder serves as the English localization catalog for the React Todo App. It contains locale string constant modules that centralize all user-facing text displayed in the application. Currently, the project ships with a single English (US) locale (`en_US.js`). All user-facing strings are defined here as named exports, and components import specific constants by name to render locale-appropriate text in the UI.

## Exported Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `MSG_NO_ITEMS` | "There are no items." | Empty state message displayed when the filtered todo list contains no items |
| `INFO_SHORTCUT_KEYS` | "Press \`/\` to search and \`N\` to create a new item." | Keyboard shortcut guidance shown in default mode (`MODE_NONE`) |
| `INFO_CANCEL_SHORTCUT_KEY` | "Press \`Esc\` to cancel." | Cancel/escape guidance shown during search or create modes |

## Export Pattern

All constants use `export const` named exports. Named exports enable tree-shaking — consuming bundles include only the constants they actually reference, keeping the production bundle lean. No default export is used; each constant is imported individually by name.

## Component Consumers

| Component | File Path | Constants Used |
|-----------|-----------|----------------|
| `FilteredList` | `src/components/ui/FilteredList.js` | `MSG_NO_ITEMS` |
| `Info` | `src/components/ui/Info.js` | `INFO_SHORTCUT_KEYS`, `INFO_CANCEL_SHORTCUT_KEY` |

## Import Examples

```javascript
// In FilteredList.js — empty state message
import { MSG_NO_ITEMS } from '../../assets/text/en_US';
```

```javascript
// In Info.js — keyboard shortcut guidance
import { INFO_SHORTCUT_KEYS, INFO_CANCEL_SHORTCUT_KEY } from '../../assets/text/en_US';
```

## Internationalization

Future locales (e.g., `es_ES.js`, `fr_FR.js`) would follow the same named export pattern. Each new locale file would export identical constant names with translated string values. Consumer components would switch imports based on an active locale selector or dynamic import mechanism.

No i18n framework is currently integrated; the current approach uses static imports for the English locale. This keeps the implementation simple and avoids unnecessary runtime overhead for a single-locale application.

## Related

- [Assets](../README.md) — Parent asset layer documentation
- [FilteredList.js](../../components/ui/README.md) — UI component consuming `MSG_NO_ITEMS`
- [Info.js](../../components/ui/README.md) — UI component consuming shortcut guidance strings
- [src/](../../README.md) — Source tree overview
