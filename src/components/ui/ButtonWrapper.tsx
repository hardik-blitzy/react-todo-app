/**
 * @fileoverview TypeScript React component for rendering mode toggle buttons.
 *
 * This component provides Add New (create mode) and Search (search mode) toggle
 * buttons. Each button toggles between its respective mode and the none mode,
 * following the Single Responsibility Principle by focusing solely on mode
 * toggling UI representation.
 *
 * Features:
 * - Add New button: Toggles between MODE_CREATE and MODE_NONE
 * - Search button: Toggles between MODE_SEARCH and MODE_NONE
 * - Visual feedback: 'selected' class applied when mode is active
 * - Accessible: Title attributes for screen readers
 *
 * @example
 * ```tsx
 * import ButtonWrapper from './ButtonWrapper';
 * import { MODE_NONE } from '../../services/mode';
 * import type { Mode } from '../../types';
 *
 * const MyComponent = () => {
 *   const [mode, setMode] = useState<Mode>(MODE_NONE);
 *   return <ButtonWrapper mode={mode} changeMode={setMode} />;
 * };
 * ```
 */

import React from 'react';
import type { Mode } from '../../types';
import { MODE_NONE, MODE_CREATE, MODE_SEARCH } from '../../services/mode';

// =============================================================================
// Type Definitions
// =============================================================================

/**
 * Props interface for the ButtonWrapper component.
 *
 * @property mode - The current application mode state
 * @property changeMode - Callback function to update the application mode
 */
interface ButtonWrapperProps {
  /** Current application mode ('none' | 'search' | 'create') */
  mode: Mode;
  /** Callback to change the application mode */
  changeMode: (mode: Mode) => void;
}

// =============================================================================
// Component Implementation
// =============================================================================

/**
 * ButtonWrapper component renders mode toggle buttons for Add New and Search.
 *
 * Each button:
 * - Displays a visual indicator (via CSS class) when its mode is active
 * - Toggles between its mode and MODE_NONE on click
 *
 * Implements Single Responsibility Principle by handling only mode toggle UI.
 *
 * @param props - Component props containing mode and changeMode
 * @returns JSX element containing the toggle buttons
 */
function ButtonWrapper({ mode, changeMode }: ButtonWrapperProps): React.JSX.Element {
  /**
   * Checks if the current mode is create mode.
   * @returns True if mode equals MODE_CREATE, false otherwise
   */
  const isCreateMode = (): boolean => mode === MODE_CREATE;

  /**
   * Checks if the current mode is search mode.
   * @returns True if mode equals MODE_SEARCH, false otherwise
   */
  const isSearchMode = (): boolean => mode === MODE_SEARCH;

  /**
   * Handles click on the Add New button.
   * Toggles between MODE_CREATE and MODE_NONE.
   *
   * @param event - React mouse event from the anchor element
   */
  const handleAddClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    changeMode(isCreateMode() ? MODE_NONE : MODE_CREATE);
  };

  /**
   * Handles click on the Search button.
   * Toggles between MODE_SEARCH and MODE_NONE.
   *
   * @param event - React mouse event from the anchor element
   */
  const handleSearchClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    changeMode(isSearchMode() ? MODE_NONE : MODE_SEARCH);
  };

  return (
    <div>
      <a
        title="Add New"
        className={'button add ' + (isCreateMode() ? 'selected' : '')}
        onClick={handleAddClick}
      ></a>
      <a
        title="Search"
        className={'button search ' + (isSearchMode() ? 'selected' : '')}
        onClick={handleSearchClick}
      ></a>
    </div>
  );
}

export default ButtonWrapper;
