/**
 * @module en_US
 * @description English (US) locale constants for the React Todo App.
 *
 * This is the English localization catalog. All user-facing strings are centralized
 * here as named exports. Components import specific constants by name for tree-shaking
 * compatibility.
 *
 * Consumers:
 * - {@link FilteredList} (`src/components/ui/FilteredList.js`) uses {@link MSG_NO_ITEMS}
 * - {@link Info} (`src/components/ui/Info.js`) uses {@link INFO_SHORTCUT_KEYS} and {@link INFO_CANCEL_SHORTCUT_KEY}
 */

/**
 * Empty state message displayed when the filtered todo list contains no items.
 * @constant {string}
 * @see {@link FilteredList} — Consumer component (`src/components/ui/FilteredList.js`)
 */
export const MSG_NO_ITEMS = 'There are no items.';

/**
 * Keyboard shortcut guidance shown in default mode (`MODE_NONE`).
 * @constant {string}
 * @see {@link Info} — Consumer component (`src/components/ui/Info.js`)
 */
export const INFO_SHORTCUT_KEYS = 'Press `/` to search and `N` to create a new item.';

/**
 * Cancel/escape guidance shown during search or create modes.
 * @constant {string}
 * @see {@link Info} — Consumer component (`src/components/ui/Info.js`)
 */
export const INFO_CANCEL_SHORTCUT_KEY = 'Press `Esc` to cancel.';
