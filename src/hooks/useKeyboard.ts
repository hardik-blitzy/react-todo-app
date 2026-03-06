/**
 * @fileoverview Custom React hook for handling global keyboard events for mode transitions.
 *
 * This hook replaces the legacy KeyStrokeHandler class component with a modern
 * functional approach using React hooks. It manages global keyboard event listeners
 * with proper cleanup to prevent memory leaks.
 *
 * The original class component had a critical memory leak bug:
 * - addEventListener used `this.handleKeyUp.bind(this)` creating a new function reference
 * - removeEventListener used `this.handleKeyUp` directly (a different reference)
 * - This meant event listeners were never properly removed
 *
 * This hook fixes the issue by defining the handler inside useEffect and using
 * the same reference for both add and remove operations.
 *
 * Keyboard shortcuts handled:
 * - '/' (slash): Switch to search mode from none mode
 * - 'n': Switch to create mode from none mode
 * - 'Escape': Return to none mode from any active mode
 *
 * @example
 * function MyComponent() {
 *   const [mode, setMode] = useState<Mode>('none');
 *
 *   useKeyboard({
 *     mode,
 *     onModeChange: setMode
 *   });
 *
 *   return <div>Current mode: {mode}</div>;
 * }
 */

import { useEffect } from 'react';

import type { Mode } from '../types';
import { getNextModeByKey } from '../services/mode';

// =============================================================================
// Interface Definitions
// =============================================================================

/**
 * Options for configuring the useKeyboard hook behavior.
 *
 * @interface UseKeyboardOptions
 * @property mode - The current application mode ('none' | 'search' | 'create')
 * @property onModeChange - Callback function invoked when a mode transition should occur
 *
 * @example
 * const options: UseKeyboardOptions = {
 *   mode: 'none',
 *   onModeChange: (newMode) => {
 *     console.log(`Mode changed to: ${newMode}`);
 *     setState({ mode: newMode });
 *   }
 * };
 */
export interface UseKeyboardOptions {
  /**
   * The current application mode.
   *
   * This determines which keyboard shortcuts are active:
   * - 'none': Can transition to 'search' (/) or 'create' (n)
   * - 'search': Can transition to 'none' (Escape)
   * - 'create': Can transition to 'none' (Escape)
   */
  mode: Mode;

  /**
   * Callback function to be called when a mode change should occur.
   *
   * This function is invoked with the new mode value when a valid
   * keyboard shortcut triggers a mode transition.
   *
   * @param newMode - The mode to transition to
   */
  onModeChange: (newMode: Mode) => void;
}

// =============================================================================
// Hook Implementation
// =============================================================================

/**
 * Custom hook for handling global keyboard events to trigger mode transitions.
 *
 * This hook sets up a global keydown event listener that monitors for specific
 * keyboard shortcuts and triggers mode changes accordingly. The listener is
 * properly cleaned up when the component unmounts or when dependencies change,
 * preventing memory leaks.
 *
 * **MEMORY LEAK FIX:** The original KeyStrokeHandler class component had a bug
 * where `addEventListener` used `.bind(this)` creating a new function reference,
 * but `removeEventListener` used the original method reference. This meant the
 * listener was never actually removed. This hook fixes the issue by defining
 * the handler inside the useEffect, ensuring the same reference is used for
 * both add and remove operations.
 *
 * @param options - Configuration options for the keyboard handler
 * @param options.mode - Current application mode
 * @param options.onModeChange - Callback for mode changes
 * @returns void - This hook does not return any value
 *
 * @example
 * // Basic usage with useState
 * function App() {
 *   const [mode, setMode] = useState<Mode>('none');
 *
 *   useKeyboard({
 *     mode,
 *     onModeChange: setMode
 *   });
 *
 *   return (
 *     <div>
 *       <p>Press '/' for search, 'n' for create, 'Escape' to cancel</p>
 *       <p>Current mode: {mode}</p>
 *     </div>
 *   );
 * }
 *
 * @example
 * // Usage with context
 * function TodoApp() {
 *   const { mode, changeMode } = useTodoContext();
 *
 *   useKeyboard({
 *     mode,
 *     onModeChange: changeMode
 *   });
 *
 *   return <TodoList />;
 * }
 */
export function useKeyboard({ mode, onModeChange }: UseKeyboardOptions): void {
  useEffect(() => {
    /**
     * Handle keydown events and trigger mode transitions.
     *
     * This handler is defined inside useEffect to ensure the same function
     * reference is used for both addEventListener and removeEventListener,
     * which fixes the memory leak present in the original class component.
     *
     * @param event - The native keyboard event from the DOM
     */
    const handleKeyDown = (event: KeyboardEvent): void => {
      // Determine the next mode based on current mode and key pressed
      const nextMode = getNextModeByKey(mode, event.keyCode);

      // Only trigger change if the mode actually changes
      if (nextMode !== mode) {
        // Prevent default browser behavior for handled shortcuts
        // This stops '/' from triggering browser quick-find, etc.
        event.preventDefault();

        // Invoke the callback with the new mode
        onModeChange(nextMode);
      }
    };

    // Add the event listener to the window object for global keyboard handling
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function: Remove the event listener when effect re-runs or unmounts
    // CRITICAL: Uses the SAME handleKeyDown reference, fixing the memory leak
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mode, onModeChange]); // Dependencies: Re-run effect when mode or callback changes
}
