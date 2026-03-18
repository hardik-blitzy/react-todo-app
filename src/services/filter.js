/**
 * @module services/filter
 * @description Centralized filtering and search service for the todo list application.
 * Provides three filter constants ({@link FILTER_ALL}, {@link FILTER_ACTIVE},
 * {@link FILTER_COMPLETED}), a status-based filter function ({@link applyFilter}),
 * a case-insensitive text search function ({@link search}), and a filter options
 * factory ({@link getOptions}) for UI rendering. All functions are pure with no
 * side effects.
 * @requires ../util/common — stringInclues (intentionally misspelled name preserved
 * for backward compatibility) is imported from the utility module for case-insensitive
 * substring matching in the search function.
 */
import {stringInclues} from '../util/common';

/**
 * @constant {string} FILTER_ALL
 * @description Default filter constant with value 'all'. When passed to applyFilter,
 * returns the complete list without any filtering. Represented as "All" in the UI
 * filter controls.
 */
export const FILTER_ALL = 'all';
/**
 * @constant {string} FILTER_ACTIVE
 * @description Filter constant with value 'active'. When passed to applyFilter,
 * returns only items where completed !== true (pending/active items). Represented
 * as "Active" in the UI filter controls.
 */
export const FILTER_ACTIVE = 'active';
/**
 * @constant {string} FILTER_COMPLETED
 * @description Filter constant with value 'completed'. When passed to applyFilter,
 * returns only items where completed === true. Represented as "Completed" in the UI
 * filter controls.
 */
export const FILTER_COMPLETED = 'completed';

/**
 * Filters a list of todo items based on completion status. Uses a switch statement
 * to select the appropriate filter predicate. Returns the full list for FILTER_ALL
 * (default case), items with completed === true for FILTER_COMPLETED, and items
 * with completed !== true for FILTER_ACTIVE.
 *
 * @function applyFilter
 * @param {Array<{id: number, text: string, completed: boolean}>} list - The full array of todo items to filter.
 * @param {string} filter - One of the filter constants: FILTER_ALL, FILTER_ACTIVE,
 *     or FILTER_COMPLETED. Falls through to default (all) for any unrecognized value.
 * @returns {Array<{id: number, text: string, completed: boolean}>} A new filtered array
 *     of todo items. Returns the original array reference for FILTER_ALL.
 * @example
 * applyFilter(list, FILTER_ACTIVE);
 * // Returns items where completed !== true
 */
export function applyFilter(list, filter) {
    switch (filter) {
        case FILTER_COMPLETED:
            return list.filter(item => item.completed === true);

        case FILTER_ACTIVE:
            return list.filter(item => item.completed !== true);

        default:
            return list;
    }
}

/**
 * Filters a list of todo items by text content using case-insensitive substring
 * matching. Trims and lowercases the query string, then filters items whose lowercased
 * text property contains the processed query. Uses stringInclues from ../util/common
 * for the substring check.
 *
 * @function search
 * @param {Array<{id: number, text: string, completed: boolean}>} list - The array of todo items to search through.
 * @param {string} query - The search query string. Trimmed and lowercased before
 *     matching. An empty or whitespace-only query returns all items.
 * @returns {Array<{id: number, text: string, completed: boolean}>} A new filtered array
 *     containing only items whose text includes the query.
 * @see stringInclues from ../util/common (note: intentionally misspelled function name
 *     preserved for backward compatibility)
 * @example
 * search(list, 'react');
 * // Returns items where text includes 'react' (case-insensitive)
 */
export function search(list, query) {
    let q = query.trim().toLowerCase();

    return list.filter(({text}) => stringInclues(text.toLowerCase(), q));
}


/**
 * Returns a map of filter constant values to their human-readable labels for UI
 * rendering. Uses computed property names ([FILTER_ALL], [FILTER_ACTIVE],
 * [FILTER_COMPLETED]) to ensure the keys match the actual constant values. Consumed
 * by the Filter component to render filter anchor elements.
 *
 * @function getOptions
 * @returns {Object.<string, string>} An object mapping filter constant values to
 *     display labels: { all: 'All', active: 'Active', completed: 'Completed' }.
 * @example
 * const options = getOptions();
 * // { all: 'All', active: 'Active', completed: 'Completed' }
 */
export function getOptions() {
    return {
        [FILTER_ALL]: 'All',
        [FILTER_ACTIVE]: 'Active',
        [FILTER_COMPLETED]: 'Completed'
    };
}
