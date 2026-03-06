/**
 * @fileoverview Barrel export file for all TypeScript type definitions.
 *
 * This module serves as the single import point for all type definitions used
 * throughout the application. It re-exports all types, interfaces, enums, and
 * constants from the individual type definition files, enabling consumers to
 * import everything they need from a single location.
 *
 * Exported from this module:
 *
 * From todo.types.ts:
 * - Todo interface: The main data structure for todo items
 * - TodoData interface: Input type for creating new todos
 * - NewTodo type: Complete todo object after id assignment
 * - TodoActions interface: CRUD operations for todo state management
 * - FilterOption type: Union type for filter values ('all' | 'active' | 'completed')
 * - Filter constants: FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED
 * - FilterOptions interface: Shape of filter options display object
 * - TodoState interface: Complete application state shape for context
 *
 * From mode.types.ts:
 * - Mode type: Union type for application modes ('none' | 'search' | 'create')
 * - Mode constants: MODE_NONE, MODE_SEARCH, MODE_CREATE
 * - ModeConstant type: Union of all mode constant types
 * - GetNextModeByKey type: Function signature for mode transitions
 * - ModeTransition interface: State transition definition for mode changes
 *
 * @example
 * // Single import for all needed types
 * import {
 *   Todo,
 *   TodoData,
 *   TodoActions,
 *   FilterOption,
 *   FILTER_ALL,
 *   Mode,
 *   MODE_NONE,
 *   MODE_SEARCH
 * } from '../types';
 *
 * // Or import all types
 * import * as Types from '../types';
 * const todo: Types.Todo = { id: 1, text: 'Learn React', completed: false };
 */

// =============================================================================
// Re-exports from todo.types.ts
// =============================================================================

/**
 * Re-export all Todo-related type definitions.
 *
 * Types and Interfaces:
 * - Todo: Interface for a single todo item (id, text, completed)
 * - TodoData: Interface for creating new todos (text, completed?)
 * - NewTodo: Type for complete todo after id assignment
 * - TodoActions: Interface defining state management operations
 * - FilterOption: Type for filter values ('all' | 'active' | 'completed')
 * - FilterOptions: Interface for filter option labels
 * - TodoState: Interface for complete application state
 *
 * Constants:
 * - FILTER_ALL: Constant for showing all todos
 * - FILTER_ACTIVE: Constant for showing active todos only
 * - FILTER_COMPLETED: Constant for showing completed todos only
 */
export {
  // Constants with const assertions
  FILTER_ALL,
  FILTER_ACTIVE,
  FILTER_COMPLETED,
  // Types
  type FilterOption,
  type NewTodo,
  // Interfaces
  type Todo,
  type TodoData,
  type FilterOptions,
  type TodoActions,
  type TodoState,
} from './todo.types';

// =============================================================================
// Re-exports from mode.types.ts
// =============================================================================

/**
 * Re-export all Mode-related type definitions.
 *
 * Types:
 * - Mode: Union type for application modes ('none' | 'search' | 'create')
 * - ModeConstant: Union of all mode constant types
 * - GetNextModeByKey: Function signature for determining next mode by key press
 *
 * Interfaces:
 * - ModeTransition: State transition definition (from, trigger, to)
 *
 * Constants:
 * - MODE_NONE: Constant for default/inactive mode
 * - MODE_SEARCH: Constant for search mode
 * - MODE_CREATE: Constant for create/add new todo mode
 */
export {
  // Constants with const assertions
  MODE_NONE,
  MODE_SEARCH,
  MODE_CREATE,
  // Types
  type Mode,
  type ModeConstant,
  type GetNextModeByKey,
  // Interfaces
  type ModeTransition,
} from './mode.types';
