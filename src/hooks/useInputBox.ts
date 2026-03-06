/**
 * @file useInputBox.ts
 * @description Custom React hook that replaces the recompose-based wrapInputBox HOC.
 * Provides controlled input state management with value/setValue, handleChange for input
 * updates, and handleKeyUp for Enter key submission. Used by InputBox and SearchBox
 * components to share input handling logic following the DRY principle.
 * 
 * @migration This hook replaces the legacy src/components/hoc/wrapInputBox.js which used:
 * - recompose's compose, withState, withHandlers (deprecated)
 * - Class-based HOC patterns
 * 
 * @changes
 * - withState('value', 'setValue', ...) → useState(initialValue)
 * - withHandlers({ handleKeyUp, handleChange }) → useCallback for both handlers
 * - Removed console.log debug statement from original code
 * - Added full TypeScript type safety
 */

import { useState, useCallback, KeyboardEvent, ChangeEvent } from 'react';
import { KEY_RETURN } from 'keycode-js';

/**
 * Options interface for the useInputBox hook
 * @interface UseInputBoxOptions
 * @property {string} [initialValue=''] - Initial value for the input field
 * @property {function} onSubmit - Callback function invoked when user presses Enter with non-empty text
 */
export interface UseInputBoxOptions {
  /** Initial value for the input field, defaults to empty string if not provided */
  initialValue?: string;
  /** Callback function invoked when user presses Enter with non-empty trimmed text */
  onSubmit: (text: string) => void;
}

/**
 * Return value interface for the useInputBox hook
 * @interface UseInputBoxReturn
 * @property {string} value - Current input value
 * @property {React.Dispatch<React.SetStateAction<string>>} setValue - State setter for direct value manipulation
 * @property {function} handleChange - Event handler for input onChange events
 * @property {function} handleKeyUp - Event handler for input onKeyUp events (handles Enter key submission)
 */
export interface UseInputBoxReturn {
  /** Current value of the input field */
  value: string;
  /** State setter function for direct value manipulation if needed */
  setValue: React.Dispatch<React.SetStateAction<string>>;
  /** Event handler for input onChange events - updates the value state */
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Event handler for input onKeyUp events - submits on Enter if text is non-empty */
  handleKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * Custom hook for managing controlled input state with Enter key submission.
 * 
 * This hook provides a reusable pattern for input fields that need to:
 * 1. Track and update input value state
 * 2. Submit the trimmed value when Enter key is pressed
 * 3. Clear the input after successful submission
 * 
 * @example
 * // Basic usage in a component
 * const MyInput = ({ onAddItem }) => {
 *   const { value, handleChange, handleKeyUp } = useInputBox({
 *     initialValue: '',
 *     onSubmit: onAddItem
 *   });
 *   
 *   return (
 *     <input
 *       value={value}
 *       onChange={handleChange}
 *       onKeyUp={handleKeyUp}
 *       placeholder="Type and press Enter"
 *     />
 *   );
 * };
 * 
 * @param {UseInputBoxOptions} options - Configuration options for the hook
 * @param {string} [options.initialValue=''] - Initial value for the input
 * @param {function} options.onSubmit - Callback invoked with trimmed text on Enter press
 * @returns {UseInputBoxReturn} Object containing value, setValue, handleChange, and handleKeyUp
 */
export function useInputBox({ 
  initialValue = '', 
  onSubmit 
}: UseInputBoxOptions): UseInputBoxReturn {
  /**
   * State for the current input value
   * Initialized with initialValue prop or empty string if not provided
   * Replaces: withState('value', 'setValue', props => props.value || '')
   */
  const [value, setValue] = useState<string>(initialValue ?? '');

  /**
   * Handler for keyup events on the input field.
   * When Enter key (KEY_RETURN) is pressed and the input contains non-empty trimmed text:
   * 1. Calls the onSubmit callback with the trimmed text
   * 2. Clears the input field by setting value to empty string
   * 
   * @param e - Keyboard event from the input element
   * 
   * Replaces the original withHandlers handleKeyUp:
   * handleKeyUp: ({ addNew, setValue }) => e => {
   *   const text = e.target.value.trim();
   *   if (e.keyCode === KeyCode.KEY_RETURN && text) {
   *     addNew(text);
   *     setValue('');
   *   }
   * }
   */
  const handleKeyUp = useCallback(
    (e: KeyboardEvent<HTMLInputElement>): void => {
      const text = (e.target as HTMLInputElement).value.trim();
      
      if (e.keyCode === KEY_RETURN && text) {
        onSubmit(text);
        setValue('');
      }
    },
    [onSubmit]
  );

  /**
   * Handler for change events on the input field.
   * Updates the value state with the current input value.
   * 
   * @param e - Change event from the input element
   * 
   * Replaces the original withHandlers handleChange:
   * handleChange: ({ setValue }) => e => {
   *   setValue(e.target.value);
   * }
   */
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setValue(e.target.value);
    },
    []
  );

  return {
    value,
    setValue,
    handleChange,
    handleKeyUp
  };
}
