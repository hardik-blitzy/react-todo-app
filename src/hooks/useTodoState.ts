/**
 * @fileoverview Custom React hook for managing todo application state.
 *
 * This hook extracts and manages the todo application state that was previously
 * handled by the legacy StateProvider class component. It provides state for
 * todos list, mode, filter, and search query, along with action functions for
 * all state mutations.
 *
 * This hook follows React best practices:
 * - Uses useState for state management
 * - Uses useCallback for stable function references
 * - Uses useMemo for memoized derived values
 * - Uses lazy initialization for expensive initial state
 *
 * The hook is designed to be used by TodoContext for centralized state management,
 * enabling the Dependency Inversion Principle (DIP) by providing abstractions
 * rather than concrete implementations to consuming components.
 *
 * @example
 * ```typescript
 * // In a context provider
 * const { state, actions } = useTodoState();
 *
 * return (
 *   <TodoContext.Provider value={{ state, actions }}>
 *     {children}
 *   </TodoContext.Provider>
 * );
 * ```
 *
 * @module hooks/useTodoState
 */

import { useState, useCallback, useMemo } from 'react';
import type { Todo, Mode, FilterOption, TodoState, TodoActions } from '../types';
import { FILTER_ALL } from '../services/filter';
import { MODE_CREATE, MODE_NONE } from '../services/mode';
import { getAll, addToList, updateStatus } from '../services/todo';

// =============================================================================
// Interfaces
// =============================================================================

/**
 * UseTodoStateReturn defines the return type of the useTodoState hook.
 *
 * This interface provides a clear contract for what the hook returns,
 * separating the state object from the action methods for cleaner
 * consumption patterns.
 *
 * @property state - The current application state (todos, mode, filter, query)
 * @property actions - Methods for mutating the application state
 *
 * @example
 * ```typescript
 * const { state, actions }: UseTodoStateReturn = useTodoState();
 *
 * // Access state
 * console.log(state.todos);
 * console.log(state.mode);
 *
 * // Call actions
 * actions.addNew('New todo');
 * actions.changeFilter('active');
 * ```
 */
export interface UseTodoStateReturn {
  /**
   * The current application state containing all todo-related data.
   * This is a memoized object that only changes when its properties change.
   */
  state: TodoState;

  /**
   * Collection of action methods for mutating the application state.
   * All methods are memoized with useCallback for stable references.
   */
  actions: TodoActions;
}

// =============================================================================
// Custom Hook Implementation
// =============================================================================

/**
 * Custom React hook that manages the todo application state.
 *
 * This hook replaces the legacy StateProvider class component by converting
 * class state and methods to React hooks. It manages:
 * - todos: The list of todo items (initialized from getAll())
 * - mode: The current application mode (create, search, or none)
 * - filter: The current filter selection (all, active, or completed)
 * - query: The current search query string
 *
 * The hook provides action methods wrapped in useCallback to maintain
 * stable function references across re-renders:
 * - addNew: Add a new todo item
 * - changeStatus: Toggle a todo's completed status
 * - changeFilter: Change the filter selection
 * - changeMode: Change the application mode
 * - setSearchQuery: Set the search query string
 *
 * Both state and actions objects are memoized using useMemo to prevent
 * unnecessary re-renders in consuming components.
 *
 * @returns An object containing the current state and action methods
 *
 * @example
 * ```typescript
 * function TodoProvider({ children }: { children: React.ReactNode }) {
 *   const { state, actions } = useTodoState();
 *
 *   return (
 *     <TodoContext.Provider value={{ state, actions }}>
 *       {children}
 *     </TodoContext.Provider>
 *   );
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Using within a component
 * function MyComponent() {
 *   const { state, actions } = useTodoState();
 *
 *   const handleAddTodo = () => {
 *     actions.addNew('New todo item');
 *   };
 *
 *   return (
 *     <div>
 *       <p>Total todos: {state.todos.length}</p>
 *       <button onClick={handleAddTodo}>Add Todo</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useTodoState(): UseTodoStateReturn {
  // ===========================================================================
  // State Initialization
  // ===========================================================================

  /**
   * Search query state for filtering todos by text.
   * Initialized to empty string, meaning no search filter is applied.
   */
  const [query, setQuery] = useState<string>('');

  /**
   * Application mode state controlling which input is active.
   * Initialized to MODE_CREATE so the new todo input is ready on load.
   */
  const [mode, setMode] = useState<Mode>(MODE_CREATE);

  /**
   * Filter state for displaying todos by completion status.
   * Initialized to FILTER_ALL to show all todos on load.
   */
  const [filter, setFilter] = useState<FilterOption>(FILTER_ALL);

  /**
   * Todo list state containing all todo items.
   * Uses lazy initialization to call getAll() only once on mount,
   * preventing unnecessary function calls on re-renders.
   */
  const [todos, setTodos] = useState<Todo[]>(() => getAll());

  // ===========================================================================
  // Action Callbacks
  // ===========================================================================

  /**
   * Adds a new todo item to the list with the specified text.
   *
   * Uses functional state update to ensure consistency when multiple
   * updates occur in quick succession. The new todo is created with
   * completed: false.
   *
   * @param text - The text content for the new todo item
   *
   * @example
   * ```typescript
   * actions.addNew('Learn TypeScript');
   * // Adds a new incomplete todo with text "Learn TypeScript"
   * ```
   */
  const addNew = useCallback((text: string): void => {
    setTodos((currentTodos) =>
      addToList(currentTodos, { text, completed: false })
    );
  }, []);

  /**
   * Changes the current filter selection for displaying todos.
   *
   * @param newFilter - The new filter option ('all', 'active', or 'completed')
   *
   * @example
   * ```typescript
   * actions.changeFilter('active');
   * // Only active (incomplete) todos will be displayed
   * ```
   */
  const changeFilter = useCallback((newFilter: FilterOption): void => {
    setFilter(newFilter);
  }, []);

  /**
   * Updates the completed status of a specific todo item.
   *
   * Uses functional state update with the updateStatus service function
   * to immutably update the todo item in the list.
   *
   * @param itemId - The unique identifier of the todo to update
   * @param completed - The new completed status (true = completed, false = active)
   *
   * @example
   * ```typescript
   * actions.changeStatus(1, true);
   * // Marks the todo with id 1 as completed
   * ```
   */
  const changeStatus = useCallback((itemId: number, completed: boolean): void => {
    setTodos((currentTodos) => updateStatus(currentTodos, itemId, completed));
  }, []);

  /**
   * Changes the current application mode.
   *
   * The mode determines which input is active:
   * - MODE_NONE: No input active, ready for keyboard shortcuts
   * - MODE_SEARCH: Search input is active
   * - MODE_CREATE: New todo input is active
   *
   * @param newMode - The new mode to set (defaults to MODE_NONE if not provided)
   *
   * @example
   * ```typescript
   * actions.changeMode(MODE_SEARCH);
   * // Activates the search input
   *
   * actions.changeMode();
   * // Resets to MODE_NONE (no input active)
   * ```
   */
  const changeMode = useCallback((newMode: Mode = MODE_NONE): void => {
    setMode(newMode);
  }, []);

  /**
   * Sets the search query for filtering todos by text.
   *
   * Handles null/undefined input by converting to empty string.
   * The search is applied when the filter mode is active.
   *
   * @param text - The search string to filter todos (empty string clears search)
   *
   * @example
   * ```typescript
   * actions.setSearchQuery('react');
   * // Filters todos containing "react"
   *
   * actions.setSearchQuery('');
   * // Clears the search filter
   * ```
   */
  const setSearchQuery = useCallback((text: string): void => {
    setQuery(text || '');
  }, []);

  // ===========================================================================
  // Memoized Return Objects
  // ===========================================================================

  /**
   * Memoized state object containing all application state.
   * Only recreated when one of the state values changes.
   */
  const state = useMemo<TodoState>(
    () => ({
      todos,
      mode,
      filter,
      query,
    }),
    [todos, mode, filter, query]
  );

  /**
   * Memoized actions object containing all state mutation methods.
   * Since all callbacks are wrapped in useCallback with empty dependency arrays,
   * this object is stable and won't cause unnecessary re-renders.
   */
  const actions = useMemo<TodoActions>(
    () => ({
      addNew,
      changeFilter,
      changeStatus,
      changeMode,
      setSearchQuery,
    }),
    [addNew, changeFilter, changeStatus, changeMode, setSearchQuery]
  );

  // ===========================================================================
  // Return
  // ===========================================================================

  return { state, actions };
}
