import React, { useState, useCallback, ChangeEvent } from 'react';

/**
 * Props interface for the CheckBox component
 * @property checked - Initial checked state of the checkbox
 * @property onChange - Callback function invoked when checkbox state changes
 */
interface CheckBoxProps {
  /** Initial checked state of the checkbox */
  checked: boolean;
  /** Callback function invoked when the checkbox state changes */
  onChange: (checked: boolean) => void;
}

/**
 * CheckBox Component
 * 
 * A controlled checkbox component that manages its own internal checked state
 * while also propagating changes to the parent component via the onChange callback.
 * 
 * This component follows the React best practices:
 * - Uses functional component with hooks instead of class component
 * - Uses useState for local state management
 * - Uses useCallback for memoized event handler to prevent unnecessary re-renders
 * - Properly typed with TypeScript for type safety
 * 
 * @param props - CheckBoxProps containing checked state and onChange handler
 * @returns JSX checkbox input element
 * 
 * @example
 * ```tsx
 * <CheckBox 
 *   checked={isCompleted} 
 *   onChange={(newChecked) => handleStatusChange(newChecked)} 
 * />
 * ```
 */
function CheckBox({ checked: initialChecked, onChange }: CheckBoxProps): JSX.Element {
  // Local state to track the checkbox checked status
  // Initialized with the prop value for controlled component behavior
  const [checked, setChecked] = useState<boolean>(initialChecked);

  /**
   * Handle checkbox change events
   * Updates local state and notifies parent component of the change
   * Memoized with useCallback to maintain stable reference and prevent
   * unnecessary re-renders of child components
   */
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { checked: newChecked } = e.target;
    setChecked(newChecked);
    onChange(newChecked);
  }, [onChange]);

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={handleChange}
    />
  );
}

export default CheckBox;
