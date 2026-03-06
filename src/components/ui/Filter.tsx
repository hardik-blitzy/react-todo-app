/**
 * @fileoverview Filter component for selecting todo display filter options.
 *
 * This component renders a set of filter toggle buttons (All, Active, Completed)
 * that allow users to filter the displayed todo items by their completion status.
 * It follows the Single Responsibility Principle (SRP) by focusing solely on
 * rendering filter options and handling filter selection.
 *
 * Features:
 * - Displays all available filter options from the filter service
 * - Highlights the currently selected filter with 'selected' class
 * - Triggers filter changes via callback prop
 * - Maintains Bootstrap styling compatibility
 *
 * @example
 * // Basic usage
 * import Filter from './Filter';
 *
 * const MyComponent = () => {
 *   const [filter, setFilter] = useState<FilterOption>('all');
 *
 *   return (
 *     <Filter
 *       filter={filter}
 *       changeFilter={setFilter}
 *     />
 *   );
 * };
 */

import React from 'react';
import type { FilterOption, FilterOptions } from '../../types';
import { getOptions } from '../../services/filter';

// =============================================================================
// Component Props Interface
// =============================================================================

/**
 * Props interface for the Filter component.
 *
 * @property filter - The currently selected filter option ('all', 'active', or 'completed')
 * @property changeFilter - Callback function invoked when user selects a different filter
 */
interface FilterProps {
  /**
   * The currently active filter option.
   * Determines which filter button is highlighted as selected.
   */
  filter: FilterOption;

  /**
   * Callback function to change the current filter selection.
   * Called when user clicks on a filter option button.
   *
   * @param filter - The newly selected filter option
   */
  changeFilter: (filter: FilterOption) => void;
}

// =============================================================================
// Filter Component
// =============================================================================

/**
 * Filter component that renders filter toggle buttons for todo items.
 *
 * Displays a horizontal list of filter options (All, Active, Completed) that
 * allow users to filter the displayed todos by their completion status. The
 * currently selected filter is visually indicated with the 'selected' class.
 *
 * The component uses the getOptions() service function to dynamically generate
 * filter buttons, ensuring consistency with the filter service definitions.
 *
 * @param props - Component props containing current filter and change handler
 * @returns JSX element containing the filter options list
 *
 * @example
 * // In a parent component
 * <Filter
 *   filter="active"
 *   changeFilter={(newFilter) => handleFilterChange(newFilter)}
 * />
 */
function Filter({ filter, changeFilter }: FilterProps): React.ReactElement {
  // Get the filter options mapping from the service
  // Returns: { all: 'All', active: 'Active', completed: 'Completed' }
  const options: FilterOptions = getOptions();

  /**
   * Determines the CSS class for a filter button based on selection state.
   *
   * @param key - The filter option key to check
   * @returns 'selected' if the key matches current filter, empty string otherwise
   */
  const getClass = (key: string): string => (key === filter ? 'selected' : '');

  return (
    <ul className="filters list-unstyled clearfix">
      {(Object.keys(options) as FilterOption[]).map((key: FilterOption) => (
        <li key={key}>
          <a
            onClick={() => changeFilter(key)}
            className={getClass(key)}
            role="button"
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
              // Support keyboard navigation for accessibility
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                changeFilter(key);
              }
            }}
            aria-pressed={key === filter}
            aria-label={`Filter by ${options[key]}`}
          >
            {options[key]}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default Filter;
