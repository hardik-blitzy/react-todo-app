/**
 * @fileoverview TypeScript React component that conditionally renders input components
 * based on application mode.
 *
 * This component acts as a router/switch for input components, determining whether to
 * display the InputBox (for creating new todos), SearchBox (for filtering todos),
 * or nothing (when in MODE_NONE).
 *
 * The component follows the Single Responsibility Principle (SRP) by focusing solely
 * on input component selection based on mode, delegating actual input handling to
 * the child components.
 *
 * @migration This file was converted from InputWrapper.js to TypeScript with:
 * - Added InputWrapperProps interface for type-safe props
 * - Added Mode type import for type-safe mode switching
 * - Properly typed function return value as JSX.Element | null
 * - Maintained identical switch statement logic for backward compatibility
 */

import React from 'react';
import type { Mode } from '../../types';
import { MODE_SEARCH, MODE_CREATE } from '../../services/mode';
import InputBox from './InputBox';
import SearchBox from './SearchBox';

/**
 * Props interface for the InputWrapper component.
 *
 * This interface defines all required props for conditionally rendering
 * the appropriate input component based on application mode.
 *
 * @interface InputWrapperProps
 * @property {Mode} mode - Current application mode determining which input to render
 * @property {function} addNew - Callback function to add a new todo item (used by InputBox)
 * @property {string} query - Current search query value (used by SearchBox)
 * @property {function} setSearchQuery - Callback to update search query (used by SearchBox)
 */
interface InputWrapperProps {
  /**
   * Current application mode ('none' | 'search' | 'create').
   * Determines which input component is rendered:
   * - MODE_CREATE: Renders InputBox for adding new todos
   * - MODE_SEARCH: Renders SearchBox for filtering todos
   * - MODE_NONE or other: Returns null (no input displayed)
   */
  mode: Mode;

  /**
   * Callback function invoked when a new todo is submitted.
   * Passed to InputBox component when mode is MODE_CREATE.
   *
   * @param text - The text content of the new todo item
   */
  addNew: (text: string) => void;

  /**
   * Current search query string value.
   * Passed to SearchBox component when mode is MODE_SEARCH
   * for controlled input behavior.
   */
  query: string;

  /**
   * Callback function to update the search query.
   * Passed to SearchBox component when mode is MODE_SEARCH.
   *
   * @param query - The new search query value
   */
  setSearchQuery: (query: string) => void;
}

/**
 * InputWrapper Component
 *
 * A conditional rendering component that acts as a router for input components
 * based on the current application mode. This component determines whether to
 * display the InputBox (for creating new todos), SearchBox (for filtering todos),
 * or nothing at all (when in default mode).
 *
 * The component receives all props needed by both InputBox and SearchBox,
 * then passes only the relevant props to the active component.
 *
 * Mode-to-Component Mapping:
 * - MODE_CREATE ('create'): Renders InputBox with addNew callback
 * - MODE_SEARCH ('search'): Renders SearchBox with query and setSearchQuery
 * - MODE_NONE ('none') or default: Renders null (no input displayed)
 *
 * @param {InputWrapperProps} props - Component props
 * @param {Mode} props.mode - Current application mode
 * @param {function} props.addNew - Callback to add new todo
 * @param {string} props.query - Current search query value
 * @param {function} props.setSearchQuery - Callback to update search query
 * @returns {JSX.Element | null} The appropriate input component or null
 *
 * @example
 * // In a parent component managing state
 * const [mode, setMode] = useState<Mode>('none');
 * const [query, setQuery] = useState('');
 *
 * const handleAddNew = (text: string) => {
 *   // Add new todo logic
 * };
 *
 * return (
 *   <InputWrapper
 *     mode={mode}
 *     addNew={handleAddNew}
 *     query={query}
 *     setSearchQuery={setQuery}
 *   />
 * );
 *
 * @example
 * // Mode transitions and expected renders
 * // mode='create' → renders <InputBox addNew={addNew} />
 * // mode='search' → renders <SearchBox query={query} setSearchQuery={setSearchQuery} />
 * // mode='none' → renders null (nothing displayed)
 */
function InputWrapper({
  mode,
  addNew,
  query,
  setSearchQuery,
}: InputWrapperProps): JSX.Element | null {
  switch (mode) {
    case MODE_CREATE:
      // Render InputBox for creating new todos
      // Only passes the addNew callback needed by InputBox
      return <InputBox addNew={addNew} />;

    case MODE_SEARCH:
      // Render SearchBox for filtering existing todos
      // Passes query value and setSearchQuery callback for controlled input
      return <SearchBox query={query} setSearchQuery={setSearchQuery} />;

    default:
      // MODE_NONE or any unhandled mode: render nothing
      // This is the default state when no input mode is active
      return null;
  }
}

export default InputWrapper;
