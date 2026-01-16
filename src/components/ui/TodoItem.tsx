import React, { useCallback } from 'react';
import type { Todo } from '../../types';
import CheckBox from './CheckBox';

/**
 * Props interface for the TodoItem component.
 * 
 * @property data - The Todo object containing id, text, and completed status
 * @property changeStatus - Callback function to update a todo's completion status
 */
interface TodoItemProps {
  /**
   * The Todo object containing all data for this item.
   * Expected to have id (number), text (string), and completed (boolean) properties.
   */
  data: Todo;

  /**
   * Callback function invoked when the todo's status changes.
   * Receives the todo's id and new completed status as parameters.
   * 
   * @param id - The unique identifier of the todo being updated
   * @param completed - The new completed status (true = completed, false = active)
   */
  changeStatus: (id: number, completed: boolean) => void;
}

/**
 * TodoItem Component
 * 
 * Renders an individual todo item with a checkbox for toggling completion status
 * and displaying the todo text. The component uses proper memoization for the
 * change handler to prevent unnecessary re-renders.
 * 
 * Features:
 * - Displays todo text with a checkbox for status toggle
 * - Applies conditional CSS classes based on completion status:
 *   - 'completed' class when todo.completed is true
 *   - 'pending' class when todo.completed is false
 * - Uses memoized callback handler for optimal performance
 * - Properly typed with TypeScript for type safety
 * 
 * @param props - TodoItemProps containing todo data and status change handler
 * @returns JSX element representing a single todo list item
 * 
 * @example
 * ```tsx
 * <TodoItem
 *   data={{ id: 1, text: 'Learn React', completed: false }}
 *   changeStatus={(id, completed) => updateTodo(id, completed)}
 * />
 * ```
 */
function TodoItem({ data, changeStatus }: TodoItemProps): JSX.Element {
  /**
   * Memoized change handler for the checkbox.
   * Transforms the checkbox's boolean checked value into a changeStatus call
   * with the todo's id and the new completed state.
   * 
   * Dependencies:
   * - data.id: Re-creates handler if the todo id changes
   * - changeStatus: Re-creates handler if the callback reference changes
   */
  const handleChange = useCallback(
    (checked: boolean): void => {
      changeStatus(data.id, checked);
    },
    [data.id, changeStatus]
  );

  /**
   * Computed CSS class name for the todo item.
   * Always includes 'todo-item' and 'ui-state-default' base classes.
   * Adds 'completed' class when todo is done, 'pending' when still active.
   */
  const className: string =
    'todo-item ui-state-default ' +
    (data.completed === true ? 'completed' : 'pending');

  return (
    <li className={className}>
      <div className="checkbox">
        <label>
          <CheckBox checked={data.completed} onChange={handleChange} /> {data.text}
        </label>
      </div>
    </li>
  );
}

export default TodoItem;
