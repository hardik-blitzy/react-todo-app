/**
 * @fileoverview Todo service module providing CRUD operations for todo items.
 *
 * This service module handles all todo-related data operations including:
 * - Retrieving sample todo data (getAll)
 * - Finding individual todo items by ID (getItemById)
 * - Updating todo completion status immutably (updateStatus)
 * - Adding new todos to the list immutably (addToList)
 *
 * All operations are designed to be immutable, returning new arrays/objects
 * instead of mutating existing data. This follows React best practices for
 * state management and ensures predictable data flow.
 *
 * @module services/todo
 */

import update from 'immutability-helper';
import type { Todo, TodoData } from '../types/todo.types';

/**
 * Counter for generating unique IDs for new todo items.
 * This is a temporary solution for client-side ID generation.
 * In a production app, IDs would typically come from a backend/database.
 *
 * @internal
 */
let todoCounter: number = 1;

/**
 * Generates the next unique ID for a new todo item.
 * Combines the length of the default todo list with an incrementing counter
 * to ensure unique IDs across application sessions.
 *
 * @returns The next available unique ID number
 * @internal
 */
function getNextId(): number {
  return getAll().length + todoCounter++;
}

/**
 * Retrieves the initial list of sample todo items.
 * This function returns a static array of predefined todos that serve as
 * the initial state of the application.
 *
 * In a production application, this would typically fetch data from an API
 * or database. For this demo application, it returns hardcoded sample data.
 *
 * @returns Array of sample todo items with predefined IDs, text, and completion status
 *
 * @example
 * ```typescript
 * const todos = getAll();
 * console.log(todos);
 * // Output:
 * // [
 * //   { id: 1, text: 'Learn Javascript', completed: false },
 * //   { id: 2, text: 'Learn React', completed: false },
 * //   { id: 3, text: 'Build a React App', completed: false }
 * // ]
 * ```
 */
export function getAll(): Todo[] {
  return [
    {
      id: 1,
      text: 'Learn Javascript',
      completed: false
    },
    {
      id: 2,
      text: 'Learn React',
      completed: false
    },
    {
      id: 3,
      text: 'Build a React App',
      completed: false
    }
  ];
}

/**
 * Finds and returns a todo item by its unique identifier.
 * Uses the Array.find method to search through the default todo list.
 *
 * @param itemId - The unique identifier of the todo item to find
 * @returns The matching Todo object if found, or undefined if no match exists
 *
 * @example
 * ```typescript
 * const todo = getItemById(1);
 * if (todo) {
 *   console.log(todo.text); // 'Learn Javascript'
 * }
 *
 * const notFound = getItemById(999);
 * console.log(notFound); // undefined
 * ```
 */
export function getItemById(itemId: number): Todo | undefined {
  return getAll().find(item => item.id === itemId);
}

/**
 * Updates the completion status of a specific todo item immutably.
 * Uses the immutability-helper library to create a new array with the
 * updated item, without modifying the original array.
 *
 * This function finds the todo item by its ID and updates only its
 * 'completed' property using the $set command from immutability-helper.
 *
 * @param items - The current array of todo items
 * @param itemId - The unique identifier of the todo item to update
 * @param completed - The new completion status (true = completed, false = active)
 * @returns A new array with the updated todo item (original array is unchanged)
 *
 * @example
 * ```typescript
 * const todos = [
 *   { id: 1, text: 'Learn TypeScript', completed: false }
 * ];
 *
 * const updated = updateStatus(todos, 1, true);
 * console.log(updated[0].completed); // true
 * console.log(todos[0].completed);    // false (original unchanged)
 * ```
 */
export function updateStatus(items: Todo[], itemId: number, completed: boolean): Todo[] {
  const index = items.findIndex(item => item.id === itemId);

  // Handle case where item is not found
  if (index === -1) {
    return items;
  }

  // Returns a new list of data with updated item.
  return update(items, {
    [index]: {
      completed: { $set: completed }
    }
  });
}

/**
 * Adds a new todo item to the list and returns the updated list immutably.
 * Creates a new todo item with an auto-generated unique ID and the provided
 * data, then concatenates it to the existing list.
 *
 * This function does not modify the original list - it returns a new array
 * containing all the original items plus the new item.
 *
 * @param list - The current array of todo items
 * @param data - The data for the new todo item (text and optional completed status)
 * @returns A new array containing all original items plus the new todo item
 *
 * @example
 * ```typescript
 * const todos: Todo[] = [];
 *
 * const newTodos = addToList(todos, { text: 'New task' });
 * console.log(newTodos);
 * // [{ id: 4, text: 'New task', completed: false }]
 *
 * const moreTodos = addToList(newTodos, { text: 'Another task', completed: true });
 * console.log(moreTodos.length); // 2
 * ```
 */
export function addToList(list: Todo[], data: TodoData): Todo[] {
  const item: Todo = {
    id: getNextId(),
    text: data.text,
    completed: data.completed ?? false
  };

  return list.concat([item]);
}
