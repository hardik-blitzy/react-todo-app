/**
 * @fileoverview TypeScript React component that renders the footer section.
 *
 * This component renders the footer section of the todo application containing:
 * - ButtonWrapper for mode toggles (Add New and Search buttons)
 * - Item count display showing number of active (incomplete) todos
 * - Filter buttons for filtering todos by completion status
 *
 * The Footer component follows the Single Responsibility Principle (SRP) by
 * focusing solely on composing and laying out its child components. It receives
 * typed props and distributes them appropriately to child components.
 *
 * Features:
 * - Mode toggle buttons via ButtonWrapper (create mode, search mode)
 * - Active item count display
 * - Filter options via Filter component (All, Active, Completed)
 * - Maintains Bootstrap styling with clearfix layout
 *
 * @example
 * // Basic usage
 * import Footer from './Footer';
 * import type { Mode, FilterOption } from '../../types';
 *
 * const MyComponent = () => {
 *   const [mode, setMode] = useState<Mode>('none');
 *   const [filter, setFilter] = useState<FilterOption>('all');
 *   const activeCount = 5;
 *
 *   return (
 *     <Footer
 *       activeItemCount={activeCount}
 *       filter={filter}
 *       changeFilter={setFilter}
 *       mode={mode}
 *       changeMode={setMode}
 *     />
 *   );
 * };
 */

import React from 'react';
import type { Mode, FilterOption } from '../../types';
import Filter from './Filter';
import ButtonWrapper from './ButtonWrapper';

// =============================================================================
// Component Props Interface
// =============================================================================

/**
 * Props interface for the Footer component.
 *
 * Extends the required props from both ButtonWrapper and Filter components,
 * combining them with the activeItemCount for the todo counter display.
 *
 * @property activeItemCount - Number of active (incomplete) todo items to display
 * @property filter - The currently selected filter option ('all', 'active', or 'completed')
 * @property changeFilter - Callback function invoked when user selects a different filter
 * @property mode - The current application mode ('none', 'search', or 'create')
 * @property changeMode - Callback function invoked when user toggles a mode button
 */
interface FooterProps {
  /**
   * The number of active (not completed) todo items.
   * Displayed in the footer as "{count} items left".
   */
  activeItemCount: number;

  /**
   * The currently active filter option.
   * Passed to the Filter component to highlight the selected filter.
   */
  filter: FilterOption;

  /**
   * Callback function to change the current filter selection.
   * Passed to the Filter component for handling filter button clicks.
   *
   * @param filter - The newly selected filter option
   */
  changeFilter: (filter: FilterOption) => void;

  /**
   * The current application mode state.
   * Passed to ButtonWrapper to determine which mode button is active.
   */
  mode: Mode;

  /**
   * Callback function to change the application mode.
   * Passed to ButtonWrapper for handling mode toggle button clicks.
   *
   * @param mode - The new mode to set
   */
  changeMode: (mode: Mode) => void;
}

// =============================================================================
// Footer Component
// =============================================================================

/**
 * Footer component that renders the application footer section.
 *
 * Composes the footer layout with three main sections:
 * 1. Left side (buttons): Mode toggle buttons via ButtonWrapper
 * 2. Left side (text): Active item count display
 * 3. Right side: Filter buttons via Filter component
 *
 * Uses Bootstrap's clearfix and pull-left/pull-right classes for layout.
 *
 * @param props - Component props containing all required state and callbacks
 * @returns JSX element containing the complete footer structure
 *
 * @example
 * // In a parent component
 * <Footer
 *   activeItemCount={todos.filter(t => !t.completed).length}
 *   filter="active"
 *   changeFilter={handleFilterChange}
 *   mode="none"
 *   changeMode={handleModeChange}
 * />
 */
function Footer({
  activeItemCount,
  filter,
  changeFilter,
  mode,
  changeMode,
}: FooterProps): React.ReactElement {
  return (
    <footer className="clearfix">
      {/* Mode toggle buttons - Add New and Search */}
      <div className="pull-left buttons">
        <ButtonWrapper mode={mode} changeMode={changeMode} />
      </div>

      {/* Active items counter display */}
      <div className="pull-left">
        {`${activeItemCount} items left`}
      </div>

      {/* Filter buttons - All, Active, Completed */}
      <div className="pull-right">
        <Filter filter={filter} changeFilter={changeFilter} />
      </div>
    </footer>
  );
}

export default Footer;
