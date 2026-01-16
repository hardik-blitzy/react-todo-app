/**
 * @fileoverview TypeScript type definitions for Todo data structures and operations.
 *
 * This module defines the core Todo-related types and interfaces used throughout
 * the application. It includes:
 * - Todo interface: The main data structure for todo items
 * - TodoData interface: Input type for creating new todos
 * - NewTodo type: Complete todo object after id assignment
 * - TodoActions interface: CRUD operations for todo state management
 * - FilterOption type: Union type for filter values
 * - Filter constants: Constant values for filters with const assertions
 * - FilterOptions interface: Shape of filter options display object
 * - TodoState interface: Complete application state shape for context
 *
 * These types ensure type safety across components, hooks, and services.
 */

import type { Mode } from './mode.types';

// =============================================================================
// Filter Constants with Const Assertions
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
// Type Definitions
// =============================================================================

/**
 * FilterOption represents the possible filter values for displaying todos.
 * This union type ensures type safety when working with filter selections.
 *
 * @example
 * const currentFilter: FilterOption = 'active';
 *
 * function handleFilter(filter: FilterOption) {
 *   switch (filter) {
 *     case 'all':
 *       // Show all todos
 *       break;
 *     case 'active':
 *       // Show only active todos
 *       break;
 *     case 'completed':
 *       // Show only completed todos
 *       break;
 *   }
 * }
 */
export type FilterOption = 'all' | 'active' | 'completed';

/**
 * NewTodo is the complete todo object type after an id has been assigned.
 * This is used when a new todo is created and added to the list.
 * It combines TodoData with the required id property.
 *
 * @example
 * const newTodo: NewTodo = {
 *   id: 4,
 *   text: 'Learn TypeScript',
 *   completed: false
 * };
 */
export type NewTodo = TodoData & {
  /**
   * Unique identifier for the todo item, assigned by the system.
   */
  readonly id: number;
};

// =============================================================================
// Interfaces
// =============================================================================

/**
 * Todo represents a single todo item in the application.
 * This is the core data structure used throughout the application.
 *
 * @property id - Unique identifier for the todo item (readonly to prevent mutation)
 * @property text - The text content/description of the todo
 * @property completed - Boolean indicating whether the todo is completed
 *
 * @example
 * const todo: Todo = {
 *   id: 1,
 *   text: 'Learn React',
 *   completed: false
 * };
 */
export interface Todo {
  /**
   * Unique identifier for the todo item.
   * This value is assigned when the todo is created and should not be modified.
   */
  readonly id: number;

  /**
   * The text content or description of the todo item.
   * This describes what task needs to be accomplished.
   */
  text: string;

  /**
   * Boolean indicating whether the todo has been completed.
   * true = completed, false = active/incomplete
   */
  completed: boolean;
}

/**
 * TodoData represents the input data required to create a new todo item.
 * This interface is used when adding new todos before an id is assigned.
 *
 * @property text - The text content/description of the todo (required)
 * @property completed - Optional initial completed state (defaults to false)
 *
 * @example
 * // Creating todo data for a new item
 * const todoData: TodoData = {
 *   text: 'Build a React App',
 *   completed: false // optional, defaults to false
 * };
 *
 * // Or with only required fields
 * const minimalTodoData: TodoData = {
 *   text: 'Learn TypeScript'
 * };
 */
export interface TodoData {
  /**
   * The text content or description of the todo item.
   * This is required when creating a new todo.
   */
  text: string;

  /**
   * Optional initial completed state for the todo.
   * If not provided, defaults to false (active/incomplete).
   */
  completed?: boolean;
}

/**
 * FilterOptions represents the display labels for each filter option.
 * This interface defines the shape of the object returned by getOptions().
 *
 * @property all - Display label for the "all" filter
 * @property active - Display label for the "active" filter
 * @property completed - Display label for the "completed" filter
 *
 * @example
 * const options: FilterOptions = {
 *   all: 'All',
 *   active: 'Active',
 *   completed: 'Completed'
 * };
 */
export interface FilterOptions {
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

/**
 * TodoActions defines the interface for all todo-related state management operations.
 * This interface is used by the TodoContext to provide type-safe action methods.
 *
 * @property addNew - Function to add a new todo with the given text
 * @property changeStatus - Function to toggle a todo's completed status
 * @property changeFilter - Function to change the current filter selection
 * @property changeMode - Function to change the application mode
 * @property setSearchQuery - Function to set the search query string
 *
 * @example
 * const actions: TodoActions = {
 *   addNew: (text) => { /* add todo with text *\/ },
 *   changeStatus: (id, completed) => { /* update todo status *\/ },
 *   changeFilter: (filter) => { /* set new filter *\/ },
 *   changeMode: (mode) => { /* set new mode *\/ },
 *   setSearchQuery: (query) => { /* set search query *\/ }
 * };
 */
export interface TodoActions {
  /**
   * Adds a new todo item with the specified text.
   * The todo will be created with a unique id and completed set to false.
   *
   * @param text - The text content for the new todo item
   */
  addNew: (text: string) => void;

  /**
   * Updates the completed status of a specific todo item.
   *
   * @param id - The unique identifier of the todo to update
   * @param completed - The new completed status (true = completed, false = active)
   */
  changeStatus: (id: number, completed: boolean) => void;

  /**
   * Changes the current filter selection for displaying todos.
   *
   * @param filter - The new filter option ('all', 'active', or 'completed')
   */
  changeFilter: (filter: FilterOption) => void;

  /**
   * Changes the current application mode.
   *
   * @param mode - The new mode ('none', 'search', or 'create')
   */
  changeMode: (mode: Mode) => void;

  /**
   * Sets the search query for filtering todos by text.
   *
   * @param query - The search string to filter todos
   */
  setSearchQuery: (query: string) => void;
}

/**
 * TodoState represents the complete application state shape for the TodoContext.
 * This interface defines all the state properties managed by the context provider.
 *
 * @property todos - Array of all todo items in the application
 * @property mode - Current application input mode ('none', 'search', or 'create')
 * @property filter - Current filter selection for displaying todos
 * @property query - Current search query string for filtering todos
 *
 * @example
 * const initialState: TodoState = {
 *   todos: [],
 *   mode: 'none',
 *   filter: 'all',
 *   query: ''
 * };
 */
export interface TodoState {
  /**
   * Array of all todo items in the application.
   * This is the master list that gets filtered based on filter and query.
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
}
