/**
 * @fileoverview Barrel export file for all custom React hooks.
 *
 * This module provides a single, centralized import point for all custom hooks
 * used throughout the todo application. It follows the barrel export pattern
 * to enable cleaner imports and better organization.
 *
 * Instead of importing from individual hook files:
 * ```typescript
 * import { useInputBox } from '../hooks/useInputBox';
 * import { useKeyboard } from '../hooks/useKeyboard';
 * import { useTodoState } from '../hooks/useTodoState';
 * ```
 *
 * Consumers can use a single import:
 * ```typescript
 * import { useInputBox, useKeyboard, useTodoState } from '../hooks';
 * ```
 *
 * This pattern applies the DRY (Don't Repeat Yourself) principle by:
 * - Centralizing exports in one location
 * - Reducing import statement redundancy across the codebase
 * - Providing a clear API surface for the hooks module
 *
 * Hooks included:
 * - useInputBox: Manages controlled input state with Enter key submission
 * - useKeyboard: Handles global keyboard events for mode transitions
 * - useTodoState: Manages todo application state (todos, mode, filter, query)
 *
 * @module hooks
 */

// =============================================================================
// Hook Function Exports
// =============================================================================

/**
 * Re-export useInputBox hook for managing controlled input state.
 * Replaces the legacy recompose-based wrapInputBox HOC pattern.
 *
 * @see {@link module:hooks/useInputBox} for full documentation
 */
export { useInputBox } from './useInputBox';

/**
 * Re-export useKeyboard hook for handling global keyboard events.
 * Replaces the legacy KeyStrokeHandler class component with proper cleanup.
 *
 * @see {@link module:hooks/useKeyboard} for full documentation
 */
export { useKeyboard } from './useKeyboard';

/**
 * Re-export useTodoState hook for managing todo application state.
 * Replaces the legacy StateProvider class component.
 *
 * @see {@link module:hooks/useTodoState} for full documentation
 */
export { useTodoState } from './useTodoState';

// =============================================================================
// Type Exports
// =============================================================================

/**
 * Re-export UseInputBoxOptions type for typing hook parameters.
 * Contains: initialValue (optional string), onSubmit (callback function)
 *
 * @see {@link module:hooks/useInputBox~UseInputBoxOptions}
 */
export type { UseInputBoxOptions } from './useInputBox';

/**
 * Re-export UseInputBoxReturn type for typing hook return value.
 * Contains: value, setValue, handleChange, handleKeyUp
 *
 * @see {@link module:hooks/useInputBox~UseInputBoxReturn}
 */
export type { UseInputBoxReturn } from './useInputBox';

/**
 * Re-export UseKeyboardOptions type for typing hook parameters.
 * Contains: mode (Mode type), onModeChange (callback function)
 *
 * @see {@link module:hooks/useKeyboard~UseKeyboardOptions}
 */
export type { UseKeyboardOptions } from './useKeyboard';

/**
 * Re-export UseTodoStateReturn type for typing hook return value.
 * Contains: state (TodoState), actions (TodoActions)
 *
 * @see {@link module:hooks/useTodoState~UseTodoStateReturn}
 */
export type { UseTodoStateReturn } from './useTodoState';
