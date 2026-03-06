/**
 * @fileoverview TypeScript type definitions for application mode state management.
 * 
 * This module defines the Mode type as a union type of 'none' | 'search' | 'create',
 * mode constants with const assertions, and type-safe function signatures for mode
 * transitions used by the keyboard handler and mode service.
 * 
 * The application supports three modes:
 * - 'none': Default mode, no special input mode active
 * - 'search': Search mode activated by pressing '/' key
 * - 'create': Create mode activated by pressing 'n' key
 * 
 * Mode transitions are triggered by keyboard events and follow a state machine pattern.
 */

// =============================================================================
// Mode Constants with Const Assertions
// =============================================================================

/**
 * Mode constant representing the default/inactive mode.
 * In this mode, the application is ready to receive keyboard shortcuts
 * to switch to search or create modes.
 */
export const MODE_NONE = 'none' as const;

/**
 * Mode constant representing the search mode.
 * In this mode, the search input is active and the user can filter todos.
 * Activated by pressing the '/' key from the none mode.
 */
export const MODE_SEARCH = 'search' as const;

/**
 * Mode constant representing the create/add new todo mode.
 * In this mode, the input for creating new todos is active.
 * Activated by pressing the 'n' key from the none mode.
 */
export const MODE_CREATE = 'create' as const;

// =============================================================================
// Type Definitions
// =============================================================================

/**
 * Mode represents the current application input mode.
 * This union type ensures type safety when working with mode values.
 * 
 * @example
 * const currentMode: Mode = 'search';
 * 
 * function handleMode(mode: Mode) {
 *   switch (mode) {
 *     case 'none':
 *       // Handle none mode
 *       break;
 *     case 'search':
 *       // Handle search mode
 *       break;
 *     case 'create':
 *       // Handle create mode
 *       break;
 *   }
 * }
 */
export type Mode = 'none' | 'search' | 'create';

/**
 * ModeConstant is a type that represents the union of all mode constant types.
 * This is useful for type guards and ensuring consistency between constants
 * and the Mode type.
 * 
 * @example
 * function isValidMode(value: string): value is ModeConstant {
 *   return value === MODE_NONE || value === MODE_SEARCH || value === MODE_CREATE;
 * }
 */
export type ModeConstant = typeof MODE_NONE | typeof MODE_SEARCH | typeof MODE_CREATE;

// =============================================================================
// Function Signature Types
// =============================================================================

/**
 * GetNextModeByKey is a function signature type for determining the next mode
 * based on the current mode and a key press event.
 * 
 * This function follows a state machine pattern where:
 * - From 'none' mode: '/' (KEY_SLASH) → 'search', 'n' (KEY_N) → 'create'
 * - From 'search' or 'create' mode: Escape (KEY_ESCAPE) → 'none'
 * - Any other key press returns the current mode unchanged
 * 
 * @param current - The current application mode
 * @param keyPressed - The numeric key code of the pressed key (from keycode-js)
 * @returns The next mode after processing the key press
 * 
 * @example
 * const getNextMode: GetNextModeByKey = (current, keyPressed) => {
 *   if (current === 'none' && keyPressed === KEY_SLASH) {
 *     return 'search';
 *   }
 *   return current;
 * };
 */
export type GetNextModeByKey = (current: Mode, keyPressed: number) => Mode;

// =============================================================================
// Interfaces
// =============================================================================

/**
 * ModeTransition represents a single state transition in the mode state machine.
 * This interface is useful for defining transition rules, testing, and
 * potentially implementing a more sophisticated state machine pattern.
 * 
 * @property from - The source mode before the transition
 * @property trigger - The key code that triggers this transition (from keycode-js)
 * @property to - The target mode after the transition
 * 
 * @example
 * // Define the transition from 'none' to 'search' when '/' is pressed
 * const searchTransition: ModeTransition = {
 *   from: 'none',
 *   trigger: KEY_SLASH, // from keycode-js
 *   to: 'search'
 * };
 * 
 * // Define all valid transitions
 * const transitions: ModeTransition[] = [
 *   { from: 'none', trigger: KEY_SLASH, to: 'search' },
 *   { from: 'none', trigger: KEY_N, to: 'create' },
 *   { from: 'search', trigger: KEY_ESCAPE, to: 'none' },
 *   { from: 'create', trigger: KEY_ESCAPE, to: 'none' }
 * ];
 */
export interface ModeTransition {
  /**
   * The source mode before the transition occurs.
   */
  from: Mode;

  /**
   * The numeric key code that triggers this transition.
   * Uses key codes from the keycode-js library (e.g., KEY_SLASH, KEY_N, KEY_ESCAPE).
   */
  trigger: number;

  /**
   * The target mode after the transition is applied.
   */
  to: Mode;
}
