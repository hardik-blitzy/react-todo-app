/**
 * @fileoverview Filter service providing list filtering and search functionality.
 *
 * This module provides pure utility functions for filtering todo items based on
 * their completion status and performing case-insensitive text search. It follows
 * the Single Responsibility Principle (SRP) by focusing solely on filtering logic.
 *
 * Exports:
 * - Filter constants: FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED
 * - applyFilter: Filters todos by completion status
 * - search: Performs case-insensitive text search on todos
 * - FilterOptionsMap: Interface for filter option labels
 * - getOptions: Returns display labels for filter options
 *
 * @example
 * import {
 *   FILTER_ALL,
 *   FILTER_ACTIVE,
 *   FILTER_COMPLETED,
 *   applyFilter,
 *   search,
 *   getOptions
 * } from '../services/filter';
 *
 * // Filter todos by status
 * const activeTodos = applyFilter(todos, FILTER_ACTIVE);
 *
 * // Search todos by text
 * const matchingTodos = search(todos, 'react');
 *
 * // Get filter option labels
 * const options = getOptions(); // { all: 'All', active: 'Active', completed: 'Completed' }
 */

import { stringIncludes } from '../utils/common';
import type { Todo } from '../types/todo.types';
import type { FilterOption } from '../types';

// =============================================================================
// Filter Constants
// =============================================================================

/**
 * Filter constant representing showing all todos (completed and active).
 * This is the default filter state when the application loads.
 */
export const FILTER_ALL = 'all' as const;

/**
 * Filter constant representing showing only active (incomplete) todos.
 * Active todos are those with completed === false.
 */
export const FILTER_ACTIVE = 'active' as const;

/**
 * Filter constant representing showing only completed todos.
 * Completed todos are those with completed === true.
 */
export const FILTER_COMPLETED = 'completed' as const;

// =============================================================================
// Interfaces
// =============================================================================

/**
 * FilterOptionsMap represents the display labels for each filter option.
 * This interface defines the shape of the object returned by getOptions().
 *
 * @property all - Display label for the "all" filter
 * @property active - Display label for the "active" filter
 * @property completed - Display label for the "completed" filter
 *
 * @example
 * const options: FilterOptionsMap = {
 *   all: 'All',
 *   active: 'Active',
 *   completed: 'Completed'
 * };
 */
export interface FilterOptionsMap {
  /**
   * Display label for the filter showing all todos.
   */
  [FILTER_ALL]: string;

  /**
   * Display label for the filter showing only active todos.
   */
  [FILTER_ACTIVE]: string;

  /**
   * Display label for the filter showing only completed todos.
   */
  [FILTER_COMPLETED]: string;
}

// =============================================================================
// Filter Functions
// =============================================================================

/**
 * Filters a list of todos based on the specified filter option.
 *
 * This function implements the core filtering logic for the todo application:
 * - FILTER_ALL: Returns all todos without filtering
 * - FILTER_ACTIVE: Returns only todos where completed === false
 * - FILTER_COMPLETED: Returns only todos where completed === true
 *
 * The function is pure and does not mutate the input array.
 *
 * @param list - Array of Todo items to filter
 * @param filter - The filter option to apply ('all', 'active', or 'completed')
 * @returns A new array containing only the todos matching the filter criteria
 *
 * @example
 * const todos: Todo[] = [
 *   { id: 1, text: 'Learn React', completed: true },
 *   { id: 2, text: 'Build App', completed: false }
 * ];
 *
 * applyFilter(todos, FILTER_ALL);       // Returns all todos
 * applyFilter(todos, FILTER_ACTIVE);    // Returns [{ id: 2, text: 'Build App', completed: false }]
 * applyFilter(todos, FILTER_COMPLETED); // Returns [{ id: 1, text: 'Learn React', completed: true }]
 */
export function applyFilter(list: Todo[], filter: FilterOption): Todo[] {
  switch (filter) {
    case FILTER_COMPLETED:
      return list.filter((item) => item.completed === true);

    case FILTER_ACTIVE:
      return list.filter((item) => item.completed !== true);

    default:
      // FILTER_ALL or any unrecognized filter returns full list
      return list;
  }
}

/**
 * Performs a case-insensitive search on a list of todos.
 *
 * This function filters todos by checking if their text property contains
 * the search query. Both the todo text and query are converted to lowercase
 * for case-insensitive matching. Leading and trailing whitespace in the
 * query is trimmed before searching.
 *
 * The function is pure and does not mutate the input array.
 *
 * @param list - Array of Todo items to search through
 * @param query - The search string to look for in todo text
 * @returns A new array containing only todos whose text includes the query
 *
 * @example
 * const todos: Todo[] = [
 *   { id: 1, text: 'Learn React', completed: false },
 *   { id: 2, text: 'Build TypeScript App', completed: false },
 *   { id: 3, text: 'Write Tests', completed: true }
 * ];
 *
 * search(todos, 'react');    // Returns [{ id: 1, text: 'Learn React', completed: false }]
 * search(todos, 'REACT');    // Same result - case insensitive
 * search(todos, '  app  ');  // Returns [{ id: 2, text: 'Build TypeScript App', completed: false }]
 * search(todos, 'xyz');      // Returns [] (no matches)
 */
export function search(list: Todo[], query: string): Todo[] {
  // Trim whitespace and convert to lowercase for case-insensitive matching
  const q = query.trim().toLowerCase();

  // Filter todos where the lowercase text includes the lowercase query
  return list.filter(({ text }) => stringIncludes(text.toLowerCase(), q));
}

// =============================================================================
// Option Functions
// =============================================================================

/**
 * Returns the display labels for all filter options.
 *
 * This function provides a mapping from filter constant values to their
 * human-readable display labels. These labels are used in the UI for
 * filter buttons and accessibility purposes.
 *
 * @returns An object mapping filter constants to their display labels
 *
 * @example
 * const options = getOptions();
 * // Returns: {
 * //   all: 'All',
 * //   active: 'Active',
 * //   completed: 'Completed'
 * // }
 *
 * // Usage in UI
 * Object.entries(options).map(([value, label]) => (
 *   <button key={value}>{label}</button>
 * ));
 */
export function getOptions(): FilterOptionsMap {
  return {
    [FILTER_ALL]: 'All',
    [FILTER_ACTIVE]: 'Active',
    [FILTER_COMPLETED]: 'Completed',
  };
}
