/**
 * @fileoverview Barrel export file for the React Context module.
 *
 * This module provides a single, clean import point for all context-related
 * functionality in the todo application. It re-exports the TodoContext,
 * TodoProvider component, useTodoContext hook, and TodoContextValue type
 * from the TodoContext module.
 *
 * By using this barrel export, consumers can import all context-related
 * items from a single location, promoting clean import statements and
 * better code organization.
 *
 * @example
 * ```typescript
 * // Instead of:
 * import { TodoContext, TodoProvider, useTodoContext } from './context/TodoContext';
 * import type { TodoContextValue } from './context/TodoContext';
 *
 * // Use:
 * import { TodoContext, TodoProvider, useTodoContext } from './context';
 * import type { TodoContextValue } from './context';
 * ```
 *
 * @example
 * ```typescript
 * // Typical usage in App component
 * import { TodoProvider } from './context';
 *
 * function App() {
 *   return (
 *     <TodoProvider>
 *       <YourApp />
 *     </TodoProvider>
 *   );
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Consuming context in child components
 * import { useTodoContext } from './context';
 *
 * function TodoList() {
 *   const { todos, changeStatus } = useTodoContext();
 *   // ...
 * }
 * ```
 *
 * @module context
 */

// =============================================================================
// Component and Hook Exports
// =============================================================================

/**
 * Re-exports from TodoContext module:
 *
 * - TodoContext: The React Context object for todo state management.
 *   Provides access to Provider and Consumer components.
 *
 * - TodoProvider: Provider component that wraps the application and provides
 *   todo state and actions to all descendant components.
 *
 * - useTodoContext: Custom hook for consuming todo context with type safety
 *   and automatic null checking.
 */
export { TodoContext, TodoProvider, useTodoContext } from './TodoContext';

// =============================================================================
// Type Exports
// =============================================================================

/**
 * Re-exports type definitions from TodoContext module:
 *
 * - TodoContextValue: Interface defining the complete shape of the context value,
 *   including all state properties (todos, mode, filter, query) and action methods
 *   (addNew, changeFilter, changeStatus, changeMode, setSearchQuery).
 */
export type { TodoContextValue } from './TodoContext';
