/**
 * Localization constants for English (US) locale.
 * 
 * These constants use TypeScript const assertions ('as const') to ensure
 * literal type inference rather than generic string types, enabling better
 * type checking in consuming components like FilteredList.tsx and Info.tsx.
 */

/** Message displayed when the todo list is empty */
export const MSG_NO_ITEMS = 'There are no items.' as const;

/** Information text showing keyboard shortcuts for search and create actions */
export const INFO_SHORTCUT_KEYS = 'Press `/` to search and `N` to create a new item.' as const;

/** Information text showing the escape key shortcut to cancel current action */
export const INFO_CANCEL_SHORTCUT_KEY = 'Press `Esc` to cancel.' as const;
