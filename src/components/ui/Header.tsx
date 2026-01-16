/**
 * @fileoverview TypeScript React component that renders the application header
 * with title and InputWrapper component.
 *
 * This component serves as the top-level header for the Todo application,
 * displaying the application title "Things To Do" and rendering the appropriate
 * input component (InputBox or SearchBox) based on the current application mode.
 *
 * The component follows the Single Responsibility Principle (SRP) by focusing
 * solely on header layout, delegating input handling to the InputWrapper component.
 * All props are spread to InputWrapper for flexible input handling across different
 * application modes.
 *
 * @migration This file was converted from Header.js to TypeScript with:
 * - Added HeaderProps interface for type-safe props
 * - Added Mode type import for type-safe mode handling
 * - Properly typed function signature with destructured props
 * - Maintained identical JSX structure for backward compatibility
 */

import React from 'react';
import type { Mode } from '../../types';
import InputWrapper from './InputWrapper';

/**
 * Props interface for the Header component.
 *
 * This interface defines all required props that the Header component needs
 * to render the application header and pass to the InputWrapper child component.
 * All props are forwarded to InputWrapper for handling different input modes.
 *
 * @interface HeaderProps
 * @property {function} addNew - Callback function to add a new todo item
 * @property {Mode} mode - Current application mode determining which input to render
 * @property {string} query - Current search query value
 * @property {function} setSearchQuery - Callback to update search query
 */
interface HeaderProps {
  /**
   * Callback function invoked when a new todo is submitted.
   * Passed through to InputWrapper and ultimately to InputBox
   * when the mode is set to 'create'.
   *
   * @param text - The text content of the new todo item to add
   */
  addNew: (text: string) => void;

  /**
   * Current application mode ('none' | 'search' | 'create').
   * Determines which input component is rendered by InputWrapper:
   * - 'create': InputBox for adding new todos
   * - 'search': SearchBox for filtering todos
   * - 'none': No input component displayed
   */
  mode: Mode;

  /**
   * Current search query string value.
   * Passed through to InputWrapper and ultimately to SearchBox
   * when the mode is set to 'search'.
   */
  query: string;

  /**
   * Callback function to update the search query.
   * Passed through to InputWrapper and ultimately to SearchBox
   * when the mode is set to 'search'.
   *
   * @param query - The new search query value to set
   */
  setSearchQuery: (query: string) => void;
}

/**
 * Header Component
 *
 * Renders the application header containing the title "Things To Do" and the
 * InputWrapper component for handling user input based on the current mode.
 *
 * This component acts as a pass-through container, spreading all received props
 * to the InputWrapper child component. The InputWrapper then determines which
 * specific input component to render based on the mode prop.
 *
 * Structure:
 * - <header>: Semantic HTML header element
 *   - <h1>: Application title "Things To Do"
 *   - <InputWrapper>: Conditional input component (InputBox/SearchBox/null)
 *
 * @param {HeaderProps} props - Component props
 * @param {function} props.addNew - Callback to add a new todo item
 * @param {Mode} props.mode - Current application mode
 * @param {string} props.query - Current search query value
 * @param {function} props.setSearchQuery - Callback to update search query
 * @returns {JSX.Element} The header element with title and input wrapper
 *
 * @example
 * // Usage in a parent component
 * const [mode, setMode] = useState<Mode>('none');
 * const [query, setQuery] = useState('');
 *
 * const handleAddNew = (text: string) => {
 *   // Add new todo logic
 * };
 *
 * return (
 *   <Header
 *     addNew={handleAddNew}
 *     mode={mode}
 *     query={query}
 *     setSearchQuery={setQuery}
 *   />
 * );
 *
 * @example
 * // Rendered output structure
 * // <header>
 * //   <h1>Things To Do</h1>
 * //   <InputWrapper mode={mode} addNew={addNew} query={query} setSearchQuery={setSearchQuery} />
 * // </header>
 */
function Header({
  addNew,
  mode,
  query,
  setSearchQuery,
}: HeaderProps): JSX.Element {
  return (
    <header>
      <h1>Things To Do</h1>
      <InputWrapper {...{ addNew, mode, query, setSearchQuery }} />
    </header>
  );
}

export default Header;
