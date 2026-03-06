import React from 'react';
import type { Todo } from '../../types';
import TodoItem from './TodoItem';
import { MSG_NO_ITEMS } from '../../assets/text/en_US';

/**
 * Props interface for the FilteredList component.
 *
 * @property items - Array of Todo objects to display in the list
 * @property changeStatus - Callback function to update a todo's completion status
 */
interface FilteredListProps {
  /**
   * Array of todo items to render in the list.
   * When empty, the component displays an informational message.
   */
  items: Todo[];

  /**
   * Callback function invoked when a todo item's status changes.
   * Receives the todo's id and new completed status as parameters.
   *
   * @param id - The unique identifier of the todo being updated
   * @param completed - The new completed status (true = completed, false = active)
   */
  changeStatus: (id: number, completed: boolean) => void;
}

/**
 * FilteredList Component
 *
 * Renders a list of TodoItem components or displays an empty state message
 * when there are no items to show. This component is typically used to display
 * the filtered/searched results from the todo list.
 *
 * Features:
 * - Renders a list of TodoItem components with proper keys
 * - Displays an informational alert when the items array is empty
 * - Passes individual todo data and the changeStatus callback to each TodoItem
 * - Fully typed with TypeScript for type safety
 *
 * Single Responsibility Principle (SRP):
 * This component has a single responsibility: rendering a list of todo items
 * or an empty state. It delegates the rendering of individual items to TodoItem
 * and does not handle filtering logic (which is done elsewhere).
 *
 * @param props - FilteredListProps containing items array and status change handler
 * @returns JSX element representing either an empty state message or a list of todos
 *
 * @example
 * ```tsx
 * const todos: Todo[] = [
 *   { id: 1, text: 'Learn React', completed: false },
 *   { id: 2, text: 'Build an app', completed: true }
 * ];
 *
 * <FilteredList
 *   items={todos}
 *   changeStatus={(id, completed) => updateTodoStatus(id, completed)}
 * />
 * ```
 */
function FilteredList({ items, changeStatus }: FilteredListProps): JSX.Element {
  /**
   * Empty state handling:
   * When there are no items to display (either because the list is empty
   * or all items have been filtered out), show an informational message.
   */
  if (items.length === 0) {
    return (
      <p className="alert alert-info">{MSG_NO_ITEMS}</p>
    );
  }

  /**
   * Render the list of todo items.
   * Each TodoItem receives:
   * - key: The todo's unique id for React's reconciliation
   * - data: The complete Todo object
   * - changeStatus: Callback for status updates
   */
  return (
    <ul className="list-unstyled">
      {items.map((item: Todo) => (
        <TodoItem key={item.id} data={item} changeStatus={changeStatus} />
      ))}
    </ul>
  );
}

export default FilteredList;
