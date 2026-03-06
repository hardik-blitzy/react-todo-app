/**
 * @fileoverview Main container component for the todo application.
 *
 * This component serves as the primary container that composes the application's
 * main UI elements: Header, FilteredList, Footer, and Info components. It is
 * responsible for consuming the global state from TodoContext and integrating
 * global keyboard handling via the useKeyboard hook.
 *
 * CRITICAL REFACTOR from source TodoList.js:
 * - REMOVED: props.data and props.actions destructuring pattern
 * - ADDED: useTodoContext() hook for consuming global state and actions
 * - ADDED: useKeyboard() hook for global keyboard event handling
 * - CHANGED: 'list' variable renamed to 'todos' (context naming convention)
 *
 * This refactored implementation follows modern React best practices:
 * - Uses React Context for state management instead of prop drilling
 * - Uses custom hooks for side effects (keyboard handling)
 * - Follows Single Responsibility Principle (SRP) by delegating:
 *   - State management to TodoContext
 *   - Keyboard handling to useKeyboard hook
 *   - Child rendering to specialized components
 *
 * @example
 * // Usage (must be wrapped in TodoProvider)
 * import { TodoProvider } from '../../context/TodoContext';
 * import TodoList from './TodoList';
 *
 * function App() {
 *   return (
 *     <TodoProvider>
 *       <TodoList />
 *     </TodoProvider>
 *   );
 * }
 *
 * @module components/ui/TodoList
 */

import React from 'react';
import type { Todo } from '../../types';
import { useTodoContext } from '../../context/TodoContext';
import { useKeyboard } from '../../hooks/useKeyboard';
import Info from './Info';
import Header from './Header';
import Footer from './Footer';
import FilteredList from './FilteredList';
import { applyFilter, search, FILTER_ACTIVE } from '../../services/filter';

// =============================================================================
// Type Definitions
// =============================================================================

/**
 * Props interface for the TodoList component.
 *
 * This interface is intentionally minimal (or empty) because the component
 * now obtains its data and actions from the TodoContext instead of receiving
 * them via props. This follows the Dependency Inversion Principle (DIP) by
 * depending on the context abstraction rather than direct prop passing.
 *
 * If additional configuration props are needed in the future (e.g., styling
 * overrides, className, or feature flags), they can be added here without
 * affecting the context-based state management.
 *
 * @example
 * // Current usage - no props needed
 * <TodoList />
 *
 * // Future extensibility example
 * interface TodoListProps {
 *   className?: string;
 *   showInfo?: boolean;
 * }
 */
interface TodoListProps {
  // Currently empty - all data comes from context
  // This interface exists for future extensibility and type consistency
}

// =============================================================================
// Component Implementation
// =============================================================================

/**
 * TodoList is the main container component for the todo application.
 *
 * This component orchestrates the display of all todo-related UI elements:
 * - Header: Contains the title and input components (InputBox or SearchBox)
 * - FilteredList: Displays the filtered and searched list of todo items
 * - Footer: Contains mode toggle buttons, item count, and filter options
 * - Info: Displays keyboard shortcut hints
 *
 * Key Responsibilities:
 * 1. Consume global state from TodoContext (todos, mode, filter, query)
 * 2. Consume global actions from TodoContext (addNew, changeFilter, etc.)
 * 3. Set up global keyboard handling via useKeyboard hook
 * 4. Calculate derived state (activeItemCount, filtered items)
 * 5. Distribute props to child components
 *
 * Layout Structure:
 * ```
 * <div.container>
 *   <div.row>
 *     <div.todolist>
 *       <Header />
 *       <FilteredList />
 *       <Footer />
 *       <Info />
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * @param _props - Component props (currently unused, reserved for extensibility)
 * @returns The complete TodoList component structure
 *
 * @example
 * // Basic usage within TodoProvider
 * import { TodoProvider } from '../../context/TodoContext';
 * import TodoList from './TodoList';
 *
 * function App() {
 *   return (
 *     <TodoProvider>
 *       <TodoList />
 *     </TodoProvider>
 *   );
 * }
 *
 * @throws {Error} If used outside of a TodoProvider context
 */
function TodoList(_props: TodoListProps): React.ReactElement {
  // ===========================================================================
  // Context Consumption
  // ===========================================================================

  /**
   * Consume global state and actions from TodoContext.
   *
   * This replaces the old pattern of:
   * - const {list, filter, mode, query} = props.data;
   * - const {addNew, changeFilter, changeStatus, changeMode, setSearchQuery} = props.actions;
   *
   * The context provides all state and actions in a single, unified interface.
   * Using context eliminates prop drilling and makes the component tree cleaner.
   */
  const {
    // State properties
    todos,
    mode,
    filter,
    query,
    // Action methods
    addNew,
    changeFilter,
    changeStatus,
    changeMode,
    setSearchQuery,
  } = useTodoContext();

  // ===========================================================================
  // Keyboard Event Handling
  // ===========================================================================

  /**
   * Set up global keyboard event handling for mode transitions.
   *
   * This hook attaches a keydown event listener to the window that handles:
   * - '/' key: Switch to search mode (from none mode)
   * - 'n' key: Switch to create mode (from none mode)
   * - 'Escape' key: Return to none mode (from any active mode)
   *
   * The hook properly cleans up the event listener when the component unmounts
   * or when dependencies change, preventing memory leaks.
   *
   * This replaces the old KeyStrokeHandler class component that was wrapped
   * around the application tree. The hook approach is cleaner and follows
   * React's composition patterns.
   */
  useKeyboard({
    mode,
    onModeChange: changeMode,
  });

  // ===========================================================================
  // Derived State Calculations
  // ===========================================================================

  /**
   * Calculate the count of active (incomplete) todo items.
   *
   * This count is displayed in the Footer component to show users how many
   * items are remaining. It's calculated by filtering the full todos array
   * with FILTER_ACTIVE and getting the length.
   *
   * Note: Uses 'todos' instead of 'list' (original variable name) to match
   * the context's naming convention.
   */
  const activeItemCount: number = applyFilter(todos, FILTER_ACTIVE).length;

  /**
   * Calculate the filtered and searched list of items to display.
   *
   * This two-step filtering process:
   * 1. Applies the current filter (all/active/completed) to the todos array
   * 2. Applies the search query to filter by text content
   *
   * The result is passed to FilteredList for rendering.
   *
   * Note: Uses 'todos' instead of 'list' (original variable name) to match
   * the context's naming convention.
   */
  const items: Todo[] = search(applyFilter(todos, filter), query);

  // ===========================================================================
  // Render
  // ===========================================================================

  /**
   * Render the complete TodoList layout.
   *
   * The layout follows Bootstrap's grid system:
   * - .container: Responsive fixed-width container
   * - .row: Horizontal grouping of columns
   * - .todolist: Custom class for todo-specific styling
   *
   * Child components receive their required props via object spread.
   * This pattern maintains prop type safety while keeping the JSX concise.
   */
  return (
    <div className="container">
      <div className="row">
        <div className="todolist">
          {/* Header with title and input component (InputBox or SearchBox) */}
          <Header {...{ addNew, mode, query, setSearchQuery }} />

          {/* Filtered list of todo items or empty state message */}
          <FilteredList {...{ items, changeStatus }} />

          {/* Footer with mode buttons, item count, and filter options */}
          <Footer {...{ activeItemCount, filter, changeFilter, mode, changeMode }} />

          {/* Info section with keyboard shortcut hints */}
          <Info {...{ mode }} />
        </div>
      </div>
    </div>
  );
}

export default TodoList;
