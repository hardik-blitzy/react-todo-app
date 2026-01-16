import React, { ReactNode, ReactElement } from 'react';

/**
 * Type for an object containing methods that will be bound.
 * Used by objectWithOnly to ensure type safety when extracting and binding methods.
 */
export type MethodContainer = Record<string, (...args: unknown[]) => unknown>;

/**
 * Returns a new object with only selected attributes of the original object.
 * Note: the attributes/properties will still be bound to the original object,
 * ensuring proper `this` context when methods are called.
 *
 * This utility is useful for extracting specific methods from a class instance
 * or object while maintaining their binding to the original object.
 *
 * @template T - The type of the source object containing methods
 * @template K - The keys to extract from the source object
 * @param object - The source object containing methods to extract
 * @param attrs - Array of attribute/method names to extract
 * @returns New object containing only the selected attributes, bound to the original object
 *
 * @example
 * const stateProvider = new StateProvider();
 * const actions = objectWithOnly(stateProvider, ['addTodo', 'toggleTodo']);
 * // actions.addTodo() will be properly bound to stateProvider
 */
export function objectWithOnly<T extends MethodContainer, K extends keyof T>(
  object: T,
  attrs: K[]
): Pick<T, K> {
  const newObject: Partial<Pick<T, K>> = {};

  attrs.forEach((attr) => {
    // Bind each method to the original object to preserve 'this' context
    newObject[attr] = object[attr].bind(object) as T[K];
  });

  return newObject as Pick<T, K>;
}

/**
 * Wraps React children elements by cloning them with additional props.
 * Uses React.Children.map to safely iterate over children and React.cloneElement
 * to create new elements with merged props.
 *
 * This utility is useful for parent components that need to inject props
 * into their children without requiring explicit prop passing.
 *
 * @param children - React children nodes to be wrapped
 * @param props - Additional props to merge into each child element
 * @returns Array of cloned React elements with merged props, or null/undefined if no children
 *
 * @example
 * const enhancedChildren = wrapChildrenWith(children, { disabled: true, theme: 'dark' });
 */
export function wrapChildrenWith(
  children: ReactNode,
  props: Record<string, unknown>
): ReactElement[] | null | undefined {
  return React.Children.map(children, (child) => {
    // Only clone valid React elements (skip null, undefined, strings, numbers)
    if (React.isValidElement(child)) {
      return React.cloneElement(child, props);
    }
    return child as unknown as ReactElement;
  });
}

/**
 * Checks if a string contains a specified substring.
 * Uses indexOf for broad browser compatibility.
 *
 * NOTE: This function was renamed from 'stringInclues' (typo) to 'stringIncludes'
 * to fix the spelling error in the original codebase.
 *
 * @param str - The string to search within
 * @param substr - The substring to search for
 * @returns True if the substring is found within the string, false otherwise
 *
 * @example
 * stringIncludes('Hello World', 'World'); // returns true
 * stringIncludes('Hello World', 'world'); // returns false (case-sensitive)
 */
export function stringIncludes(str: string, substr: string): boolean {
  return str.indexOf(substr) !== -1;
}
