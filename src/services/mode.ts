/**
 * @fileoverview TypeScript service module for managing UI mode state with keyboard navigation support.
 *
 * This module provides mode constants and a state machine function for keyboard-driven
 * mode transitions. The application supports three modes:
 * - MODE_NONE: Default mode, ready to receive keyboard shortcuts
 * - MODE_SEARCH: Search input is active for filtering todos
 * - MODE_CREATE: Input for creating new todos is active
 *
 * Mode transitions follow a state machine pattern:
 * - From 'none': '/' key → 'search', 'n' key → 'create'
 * - From any active mode: 'Escape' key → 'none'
 *
 * All functions are pure and properly typed for type-safe mode management.
 */

import { KEY_SLASH, KEY_N, KEY_ESCAPE } from 'keycode-js';
import type { Mode } from '../types/mode.types';

// =============================================================================
// Mode Constants
// =============================================================================

/**
 * Mode constant representing the default/inactive mode.
 * In this mode, the application is ready to receive keyboard shortcuts
 * to switch to search or create modes.
 */
export const MODE_NONE: Mode = 'none' as const;

/**
 * Mode constant representing the search mode.
 * In this mode, the search input is active and the user can filter todos.
 * Activated by pressing the '/' key from the none mode.
 */
export const MODE_SEARCH: Mode = 'search' as const;

/**
 * Mode constant representing the create/add new todo mode.
 * In this mode, the input for creating new todos is active.
 * Activated by pressing the 'n' key from the none mode.
 */
export const MODE_CREATE: Mode = 'create' as const;

// =============================================================================
// Mode Transition Functions
// =============================================================================

/**
 * Get the next mode based on the current mode and key pressed.
 *
 * This function implements a state machine for keyboard-driven mode transitions:
 * - When in MODE_NONE:
 *   - Pressing '/' (KEY_SLASH) transitions to MODE_SEARCH
 *   - Pressing 'n' (KEY_N) transitions to MODE_CREATE
 * - When in MODE_SEARCH or MODE_CREATE:
 *   - Pressing 'Escape' (KEY_ESCAPE) transitions back to MODE_NONE
 * - Any other key press returns the current mode unchanged
 *
 * @param current - The current application mode
 * @param keyPressed - The keycode of the pressed key (from keycode-js)
 * @returns The next mode after the key press
 *
 * @example
 * // Transition from none to search mode
 * const nextMode = getNextModeByKey(MODE_NONE, KEY_SLASH);
 * console.log(nextMode); // 'search'
 *
 * @example
 * // Escape from search mode back to none
 * const nextMode = getNextModeByKey(MODE_SEARCH, KEY_ESCAPE);
 * console.log(nextMode); // 'none'
 *
 * @example
 * // Unhandled key keeps current mode
 * const nextMode = getNextModeByKey(MODE_NONE, 65); // 'A' key
 * console.log(nextMode); // 'none'
 */
export function getNextModeByKey(current: Mode, keyPressed: number): Mode {
  switch (current) {
    case MODE_NONE:
      if (keyPressed === KEY_SLASH) return MODE_SEARCH;
      if (keyPressed === KEY_N) return MODE_CREATE;
      break;

    default:
      // From any active mode (search or create), Escape returns to none
      if (keyPressed === KEY_ESCAPE) return MODE_NONE;
  }

  // Return current mode unchanged if no transition applies
  return current;
}
