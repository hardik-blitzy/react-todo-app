/**
 * @file InputBox.tsx
 * @description TypeScript React component that renders a controlled text input for adding
 * new todo items. This component replaces the previous HOC-enhanced pattern with direct
 * useInputBox hook usage, following modern React best practices and the DRY principle.
 * 
 * @migration This component was refactored from the original InputBox.js which used:
 * - import enhance from '../hoc/wrapInputBox' (recompose-based HOC)
 * - Props destructured from HOC-injected props
 * - export default enhance(InputBox) pattern
 * 
 * @changes
 * - Removed HOC wrapper pattern entirely
 * - Replaced enhance HOC import with useInputBox hook
 * - Added TypeScript types with InputBoxProps interface
 * - Component now calls useInputBox hook directly for state management
 * - Export changed from enhance(InputBox) to plain InputBox
 */

import React from 'react';
import { useInputBox } from '../../hooks/useInputBox';

/**
 * Props interface for the InputBox component
 * @interface InputBoxProps
 * @property {function} addNew - Callback function invoked when user submits new todo text.
 *                               Called with the trimmed text value when Enter is pressed.
 */
interface InputBoxProps {
  /** Callback function to add a new todo item with the provided text */
  addNew: (text: string) => void;
}

/**
 * InputBox Component
 * 
 * A controlled text input component for adding new todo items to the list.
 * Uses the useInputBox custom hook for state management and event handling,
 * which provides:
 * - value: Current input value
 * - handleChange: Updates value state on input changes
 * - handleKeyUp: Submits the todo on Enter key press if text is non-empty
 * 
 * The input automatically focuses on mount (autoFocus) and clears after
 * successful submission.
 * 
 * @param {InputBoxProps} props - Component props
 * @param {function} props.addNew - Callback to add new todo with text
 * @returns {JSX.Element} Controlled text input element for adding todos
 * 
 * @example
 * // Usage in parent component
 * const handleAddTodo = (text: string) => {
 *   // Add new todo to list
 *   setTodos(prev => [...prev, { id: Date.now(), text, completed: false }]);
 * };
 * 
 * return <InputBox addNew={handleAddTodo} />;
 */
function InputBox({ addNew }: InputBoxProps): JSX.Element {
  /**
   * Use the useInputBox hook to get controlled input state and handlers.
   * - initialValue: Start with empty string for new todo input
   * - onSubmit: Use the addNew prop as the submission handler
   */
  const { value, handleChange, handleKeyUp } = useInputBox({
    initialValue: '',
    onSubmit: addNew
  });

  return (
    <input
      autoFocus
      type="text"
      className="form-control add-todo"
      value={value}
      onKeyUp={handleKeyUp}
      onChange={handleChange}
      placeholder="Add New"
    />
  );
}

export default InputBox;
