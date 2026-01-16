import React, { ChangeEvent } from 'react';

/**
 * Props interface for SearchBox component.
 * Defines the contract for the controlled search input.
 */
interface SearchBoxProps {
  /** Current search query value */
  query: string;
  /** Callback function to update the search query */
  setSearchQuery: (query: string) => void;
}

/**
 * SearchBox Component
 * 
 * A controlled text input component for searching todo items.
 * Renders a text input that updates the search query on each keystroke.
 * 
 * @param props - The component props
 * @param props.query - Current search query value
 * @param props.setSearchQuery - Callback to update the search query
 * @returns JSX element containing the search input
 * 
 * @example
 * ```tsx
 * <SearchBox
 *   query={searchTerm}
 *   setSearchQuery={setSearchTerm}
 * />
 * ```
 */
export default function SearchBox({ query, setSearchQuery }: SearchBoxProps): JSX.Element {
  /**
   * Handles input change events by extracting the value and passing
   * it to the setSearchQuery callback.
   * 
   * @param e - The change event from the input element
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  return (
    <input
      type="text"
      autoFocus
      className="form-control search"
      value={query}
      onChange={handleChange}
      placeholder="Search"
    />
  );
}
