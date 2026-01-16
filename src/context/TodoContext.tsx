/**
 * @fileoverview React Context implementation for todo application state management.
 *
 * This module replaces the legacy StateProvider class component with a modern
 * React Context-based solution. It provides:
 * - TodoContext: The React Context for sharing state across the component tree
 * - TodoProvider: Provider component that wraps children with state context
 * - useTodoContext: Custom hook for consuming context with type safety
 * - TodoContextValue: Interface defining the shape of the context value
 *
 * This implementation follows React best practices and SOLID principles:
 * - Single Responsibility: Each export has a single, well-defined purpose
 * - Dependency Inversion: Components depend on the context abstraction,
 *   not concrete implementations
 * - Type Safety: Full TypeScript support with explicit interfaces
 *
 * The context provides access to:
 * - State: todos, mode, filter, query
 * - Actions: addNew, changeFilter, changeStatus, changeMode, setSearchQuery
 *
 * @example
 * ```tsx
 * // Wrap your app with the provider
 * import { TodoProvider } from './context/TodoContext';
 *
 * function App() {
 *   return (
 *     <TodoProvider>
 *       <TodoList />
 *     </TodoProvider>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Consume context in child components
 * import { useTodoContext } from './context/TodoContext';
 *
 * function TodoList() {
 *   const { todos, addNew, changeStatus } = useTodoContext();
 *
 *   return (
 *     <ul>
 *       {todos.map(todo => (
 *         <li key={todo.id}>
 *           <input
 *             type="checkbox"
 *             checked={todo.completed}
 *             onChange={(e) => changeStatus(todo.id, e.target.checked)}
 *           />
 *           {todo.text}
 *         </li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 *
 * @module context/TodoContext
 */

import React, { createContext, useContext, ReactNode } from 'react';
import type { Todo, Mode, FilterOption, TodoState, TodoActions } from '../types';
import { useTodoState } from '../hooks/useTodoState';

// =============================================================================
// Interfaces
// =============================================================================

/**
 * TodoContextValue defines the complete interface for the todo context.
 *
 * This interface extends the state properties (from TodoState) with action
 * methods (from TodoActions) to provide a unified API for consuming components.
 * It represents all the data and operations available through the context.
 *
 * State Properties:
 * - todos: Array of all todo items in the application
 * - mode: Current application input mode ('none', 'search', or 'create')
 * - filter: Current filter selection for displaying todos
 * - query: Current search query string for filtering todos
 *
 * Action Methods:
 * - addNew: Add a new todo item with the specified text
 * - changeFilter: Change the current filter selection
 * - changeStatus: Update the completed status of a specific todo
 * - changeMode: Change the application mode
 * - setSearchQuery: Set the search query string
 *
 * @example
 * ```typescript
 * const contextValue: TodoContextValue = {
 *   // State
 *   todos: [{ id: 1, text: 'Learn React', completed: false }],
 *   mode: 'create',
 *   filter: 'all',
 *   query: '',
 *   // Actions
 *   addNew: (text) => { /* add todo *\/ },
 *   changeFilter: (filter) => { /* change filter *\/ },
 *   changeStatus: (id, completed) => { /* update status *\/ },
 *   changeMode: (mode) => { /* change mode *\/ },
 *   setSearchQuery: (query) => { /* set query *\/ }
 * };
 * ```
 */
export interface TodoContextValue {
  // ===========================================================================
  // State Properties (from TodoState)
  // ===========================================================================

  /**
   * Array of all todo items in the application.
   * This is the master list that gets filtered based on filter and query values.
   */
  todos: Todo[];

  /**
   * Current application input mode.
   * - 'none': Default mode, ready for keyboard shortcuts
   * - 'search': Search input is active
   * - 'create': Create new todo input is active
   */
  mode: Mode;

  /**
   * Current filter selection for displaying todos.
   * - 'all': Show all todos
   * - 'active': Show only incomplete todos
   * - 'completed': Show only completed todos
   */
  filter: FilterOption;

  /**
   * Current search query string.
   * Used to filter todos by text content when in search mode.
   */
  query: string;

  // ===========================================================================
  // Action Methods (from TodoActions)
  // ===========================================================================

  /**
   * Adds a new todo item with the specified text.
   * The todo will be created with a unique id and completed set to false.
   *
   * @param text - The text content for the new todo item
   *
   * @example
   * ```typescript
   * addNew('Learn TypeScript');
   * // Creates: { id: <auto>, text: 'Learn TypeScript', completed: false }
   * ```
   */
  addNew: (text: string) => void;

  /**
   * Changes the current filter selection for displaying todos.
   *
   * @param filter - The new filter option ('all', 'active', or 'completed')
   *
   * @example
   * ```typescript
   * changeFilter('active');
   * // Only incomplete todos will be displayed
   * ```
   */
  changeFilter: (filter: FilterOption) => void;

  /**
   * Updates the completed status of a specific todo item.
   *
   * @param itemId - The unique identifier of the todo to update
   * @param completed - The new completed status (true = completed, false = active)
   *
   * @example
   * ```typescript
   * changeStatus(1, true);
   * // Marks todo with id 1 as completed
   * ```
   */
  changeStatus: (itemId: number, completed: boolean) => void;

  /**
   * Changes the current application mode.
   *
   * @param mode - The new mode ('none', 'search', or 'create')
   *
   * @example
   * ```typescript
   * changeMode('search');
   * // Activates the search input
   * ```
   */
  changeMode: (mode: Mode) => void;

  /**
   * Sets the search query for filtering todos by text.
   *
   * @param text - The search string to filter todos (empty string clears search)
   *
   * @example
   * ```typescript
   * setSearchQuery('react');
   * // Filters todos containing "react" in their text
   * ```
   */
  setSearchQuery: (text: string) => void;
}

/**
 * Props interface for the TodoProvider component.
 *
 * @property children - React nodes to be wrapped by the provider
 */
interface TodoProviderProps {
  /**
   * Child components that will have access to the todo context.
   * Any component in this subtree can use useTodoContext() to access state.
   */
  children: ReactNode;
}

// =============================================================================
// Context Creation
// =============================================================================

/**
 * TodoContext is the React Context for sharing todo state across the component tree.
 *
 * The context is created with null as the default value to ensure that:
 * 1. Components must be wrapped in a TodoProvider to access the context
 * 2. The useTodoContext hook can throw a helpful error if used outside the provider
 *
 * This context provides access to both the Provider and Consumer components:
 * - Provider: Wraps the component tree to provide state
 * - Consumer: Legacy render prop pattern (prefer useTodoContext hook)
 *
 * @example
 * ```tsx
 * // Using the Provider directly (prefer TodoProvider component)
 * <TodoContext.Provider value={contextValue}>
 *   {children}
 * </TodoContext.Provider>
 *
 * // Using the Consumer (legacy pattern, prefer useTodoContext hook)
 * <TodoContext.Consumer>
 *   {(context) => context && <div>{context.todos.length} todos</div>}
 * </TodoContext.Consumer>
 * ```
 */
export const TodoContext = createContext<TodoContextValue | null>(null);

// Set display name for better debugging in React DevTools
TodoContext.displayName = 'TodoContext';

// =============================================================================
// Provider Component
// =============================================================================

/**
 * TodoProvider is the context provider component for the todo application state.
 *
 * This component replaces the legacy StateProvider class component by:
 * - Using the useTodoState hook for state management
 * - Providing state and actions through React Context instead of prop cloning
 * - Eliminating the need for wrapChildrenWith and objectWithOnly utilities
 *
 * The provider wraps children with the TodoContext.Provider, making state
 * and actions available to any descendant component via useTodoContext().
 *
 * @param props - Component props containing children to wrap
 * @returns JSX element with context provider wrapping children
 *
 * @example
 * ```tsx
 * // In your App component
 * import { TodoProvider } from './context/TodoContext';
 * import { TodoList } from './components/ui/TodoList';
 *
 * function App() {
 *   return (
 *     <TodoProvider>
 *       <div className="app">
 *         <TodoList />
 *       </div>
 *     </TodoProvider>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Multiple levels of nesting work seamlessly
 * <TodoProvider>
 *   <Header />
 *   <main>
 *     <TodoList />
 *   </main>
 *   <Footer />
 * </TodoProvider>
 * ```
 */
export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  // Use the custom hook to get state and actions
  // This encapsulates all the useState and useCallback logic
  const { state, actions } = useTodoState();

  // Combine state and actions into a single context value
  // This matches the TodoContextValue interface structure
  const contextValue: TodoContextValue = {
    // Spread state properties: todos, mode, filter, query
    ...state,
    // Spread action methods: addNew, changeFilter, changeStatus, changeMode, setSearchQuery
    ...actions,
  };

  // Render the context provider with the combined value
  // Children will have access to all state and actions via useTodoContext()
  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};

// Set display name for better debugging in React DevTools
TodoProvider.displayName = 'TodoProvider';

// =============================================================================
// Custom Hook
// =============================================================================

/**
 * useTodoContext is a custom hook for consuming the todo context.
 *
 * This hook provides type-safe access to the todo state and actions.
 * It must be used within a component that is a descendant of TodoProvider.
 *
 * The hook performs a null check on the context value and throws a
 * descriptive error if used outside of a TodoProvider. This helps
 * developers quickly identify and fix context usage issues.
 *
 * Benefits over using useContext directly:
 * - Automatic null checking with helpful error messages
 * - Guaranteed non-null return type (TodoContextValue, not TodoContextValue | null)
 * - Type-safe access to all state properties and action methods
 *
 * @returns The complete context value with state and actions
 * @throws Error if used outside of a TodoProvider
 *
 * @example
 * ```tsx
 * // Basic usage - accessing state and actions
 * function TodoList() {
 *   const { todos, filter, changeStatus } = useTodoContext();
 *
 *   return (
 *     <ul>
 *       {todos
 *         .filter(todo => filter === 'all' || todo.completed === (filter === 'completed'))
 *         .map(todo => (
 *           <li key={todo.id}>
 *             <input
 *               type="checkbox"
 *               checked={todo.completed}
 *               onChange={(e) => changeStatus(todo.id, e.target.checked)}
 *             />
 *             {todo.text}
 *           </li>
 *         ))}
 *     </ul>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Using multiple context values
 * function Header() {
 *   const { mode, addNew, changeMode, setSearchQuery } = useTodoContext();
 *
 *   const handleSubmit = (text: string) => {
 *     if (mode === 'create') {
 *       addNew(text);
 *     } else if (mode === 'search') {
 *       setSearchQuery(text);
 *     }
 *   };
 *
 *   return (
 *     <header>
 *       <input onSubmit={handleSubmit} />
 *       <button onClick={() => changeMode('none')}>Cancel</button>
 *     </header>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Error case - used outside provider (will throw)
 * function OrphanComponent() {
 *   // This will throw: "useTodoContext must be used within a TodoProvider"
 *   const context = useTodoContext();
 *   return <div>{context.todos.length}</div>;
 * }
 * ```
 */
export function useTodoContext(): TodoContextValue {
  const context = useContext(TodoContext);

  // Throw a descriptive error if used outside of a TodoProvider
  // This helps developers quickly identify context usage issues
  if (!context) {
    throw new Error(
      'useTodoContext must be used within a TodoProvider. ' +
      'Wrap your component tree with <TodoProvider> to fix this error.'
    );
  }

  return context;
}
