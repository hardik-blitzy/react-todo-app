/**
 * @module util/common
 * @description Shared helper module providing three lightweight utilities: bound method
 * extraction ({@link objectWithOnly}), React child element cloning
 * ({@link wrapChildrenWith}), and legacy substring checking ({@link stringInclues}).
 * Used across services and wrapper components throughout the application.
 * @requires react — React is imported specifically for {@link wrapChildrenWith}, which
 * uses `React.Children.map` and `React.cloneElement` to safely iterate and clone React
 * child elements with additional props.
 */
import React from 'react';

/**
 * Creates a new plain object containing only the specified methods/properties from
 * the source object. Each extracted method is bound to the original object via
 * `Function.prototype.bind()`, ensuring the correct `this` context is preserved
 * when the method is later invoked by a different caller (e.g., child components
 * calling action methods).
 *
 * Primary use case: Extracting bound action methods from `StateProvider` for safe
 * distribution to child components via prop injection.
 *
 * @param {Object} object - The source object (typically a class component instance
 *     such as `StateProvider`) from which methods will be extracted.
 * @param {string[]} attrs - Array of property/method names (strings) to include in
 *     the returned object.
 * @returns {Object} A new plain object containing only the specified properties,
 *     each bound to the original source object.
 * @example
 * // In StateProvider.render():
 * objectWithOnly(this, ['addNew', 'changeFilter', 'changeStatus', 'changeMode', 'setSearchQuery'])
 */
export function objectWithOnly(object, attrs) {
    let newObject = {};

    attrs.forEach(attr => {
        newObject[attr] = object[attr].bind(object);
    });

    return newObject;
}

/**
 * Clones React children elements and merges additional props into each child. Uses
 * `React.Children.map` to safely iterate over any React children structure (single
 * child, array, fragments, nulls) and `React.cloneElement` to create copies with the
 * merged props while preserving original keys, refs, and reconciliation semantics.
 *
 * This is the core mechanism for the application's prop injection pattern, enabling
 * wrapper components like `StateProvider` and `KeyStrokeHandler` to distribute state
 * and action props to their descendants without explicit prop drilling.
 *
 * @param {React.ReactNode} children - The children elements to clone (from
 *     `this.props.children`). Accepts single elements, arrays, fragments, or null.
 * @param {Object} props - Props object to merge into each cloned child element.
 *     Typically contains `data` (state) and `actions` (bound methods).
 * @returns {Array<React.ReactElement>} An array of cloned React elements, each
 *     receiving the merged props.
 * @see {@link https://facebook.github.io/react/docs/react-api.html#react.children.map|React.Children.map}
 * @see {@link https://facebook.github.io/react/docs/react-api.html#cloneelement|React.cloneElement}
 * @example
 * // In StateProvider.render():
 * wrapChildrenWith(this.props.children, { data: this.state, actions })
 */
export function wrapChildrenWith(children, props) {
    return React.Children.map(children, child => React.cloneElement(child, props));
}

/**
 * Checks if a string contains a specified substring using `String.prototype.indexOf`.
 * Performs a case-sensitive comparison.
 *
 * Note: The function name is intentionally misspelled (missing 'd' in 'Includes')
 * and must be preserved for backward compatibility across all consuming modules.
 *
 * @param {string} str - The string to search within.
 * @param {string} substr - The substring to search for.
 * @returns {boolean} `true` if `substr` is found within `str`, `false` otherwise.
 * @example
 * // In filter.js search():
 * stringInclues(text.toLowerCase(), query.toLowerCase())
 */
export function stringInclues(str, substr) {
    return str.indexOf(substr) !== -1;
}
