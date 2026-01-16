# UI Components

> ← Back to [Components](../README.md) | [Main README](../../../README.md)

## Overview

This folder contains the presentational React components that form the visual interface of the Todo application. These components are responsible for rendering the UI based on data and callbacks received through props. They focus purely on visual presentation and user interaction, while the actual state management is handled by the Context API and custom hooks.

All components are written in TypeScript (.tsx) and follow functional component patterns with React Hooks. Each component has a corresponding Props interface that defines its expected properties.

The folder contains 12 React components organized by their role in the user interface.

## TypeScript Interfaces

Each component defines a Props interface that provides type safety and documentation for its expected properties. These interfaces are imported from the centralized types module:

```typescript
// Importing shared types
import type { Todo, Mode, FilterOption } from '../../types';

// Example component props interface
interface TodoItemProps {
  data: Todo;
  changeStatus: (id: string, completed: boolean) => void;
}
```

## Component Catalog

| Component | Props Interface | Description |
|-----------|-----------------|-------------|
| `TodoList.tsx` | `TodoListProps: {data, actions}` | Main container component. Applies filters to the todo list and renders Header, FilteredList, Footer, and Info. The `data` prop contains `{list, filter, mode, query}`. The `actions` prop contains `{addNew, changeFilter, changeStatus, changeMode, setSearchQuery}`. |
| `Header.tsx` | `HeaderProps: {addNew, mode, query, setSearchQuery}` | Renders the application title "Things To Do" and the InputWrapper component for user input. |
| `Footer.tsx` | `FooterProps: {activeItemCount, filter, changeFilter, mode, changeMode}` | Renders the bottom section containing ButtonWrapper, item count display, and Filter buttons. |
| `FilteredList.tsx` | `FilteredListProps: {items, changeStatus}` | Renders a list of TodoItem components. Shows an empty state message when there are no items to display. |
| `TodoItem.tsx` | `TodoItemProps: {data, changeStatus}` | Renders an individual todo item with a checkbox. The `data` prop contains `{id, text, completed}`. |
| `CheckBox.tsx` | `CheckBoxProps: {checked, onChange}` | A controlled checkbox functional component that receives its checked state via props and calls `onChange` when toggled. Uses React's event handling for checkbox interactions. |
| `InputBox.tsx` | `InputBoxProps: {addNew}` | Text input for adding new todos. Uses the `useInputBox` custom hook which provides `{value, handleChange, handleKeyUp}` for controlled input behavior. |
| `InputWrapper.tsx` | `InputWrapperProps: {mode, addNew, query, setSearchQuery}` | Conditional router that renders InputBox when in create mode, SearchBox when in search mode, or nothing when in none mode. |
| `SearchBox.tsx` | `SearchBoxProps: {query, setSearchQuery}` | Text input for searching through todo items. Uses the `useInputBox` custom hook for consistent input handling. Updates the search query as the user types. |
| `Filter.tsx` | `FilterProps: {filter, changeFilter}` | Renders filter toggle buttons (All, Active, Completed) that let users filter the todo list by completion status. |
| `ButtonWrapper.tsx` | `ButtonWrapperProps: {mode, changeMode}` | Renders mode toggle buttons with Add and Search icons. Clicking toggles between create mode, search mode, and none mode. |
| `Info.tsx` | `InfoProps: {mode}` | Displays keyboard shortcut hints based on the current mode. Shows different messages depending on whether the user can start an action or cancel one. |

## Usage Patterns

### Prop Spreading

TodoList distributes props to its children using object shorthand syntax. This keeps the code concise while making it clear which props each child receives:

```tsx
// From TodoList.tsx
<Header {...{addNew, mode, query, setSearchQuery}}/>
<FilteredList {...{items, changeStatus}}/>
<Footer {...{activeItemCount, filter, changeFilter, mode, changeMode}}/>
<Info {...{mode}}/>
```

### Custom Hook Usage

InputBox and SearchBox use the `useInputBox` custom hook for controlled input behavior. This hook encapsulates the input state management and event handling logic, replacing the previous HOC pattern:

```tsx
// From InputBox.tsx
import { useInputBox } from '../../hooks/useInputBox';
import type { Todo } from '../../types';

interface InputBoxProps {
  addNew: (text: string) => void;
}

function InputBox({ addNew }: InputBoxProps): JSX.Element {
  const { value, handleChange, handleKeyUp } = useInputBox('', (text: string) => {
    addNew(text);
  });

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      onKeyUp={handleKeyUp}
      placeholder="What needs to be done?"
    />
  );
}

export default InputBox;
```

The `useInputBox` hook provides:
- `value`: The current input value (string)
- `handleChange`: Event handler for input changes
- `handleKeyUp`: Event handler for key presses (handles Enter key submission)

### List Rendering

FilteredList maps over the items array to render individual TodoItem components. Each item receives a unique key for React reconciliation:

```tsx
// From FilteredList.tsx
import type { Todo } from '../../types';

interface FilteredListProps {
  items: Todo[];
  changeStatus: (id: string, completed: boolean) => void;
}

// ...

{items.map((item: Todo) => (
  <TodoItem key={item.id} data={item} changeStatus={changeStatus}/>
))}
```

### Conditional Rendering

InputWrapper uses the mode value to conditionally render different input components:

```tsx
// From InputWrapper.tsx
import { MODE_CREATE, MODE_SEARCH } from '../../services/mode';
import type { Mode } from '../../types';

interface InputWrapperProps {
  mode: Mode;
  addNew: (text: string) => void;
  query: string;
  setSearchQuery: (query: string) => void;
}

function InputWrapper({ mode, addNew, query, setSearchQuery }: InputWrapperProps): JSX.Element | null {
  switch (mode) {
    case MODE_CREATE:
      return <InputBox addNew={addNew}/>;
    case MODE_SEARCH:
      return <SearchBox query={query} setSearchQuery={setSearchQuery}/>;
    default:
      return null;
  }
}
```

### Type-Safe Props Pattern

All components follow a consistent pattern for defining and using typed props:

```tsx
// Example: TodoItem.tsx
import type { Todo } from '../../types';

interface TodoItemProps {
  data: Todo;
  changeStatus: (id: string, completed: boolean) => void;
}

function TodoItem({ data, changeStatus }: TodoItemProps): JSX.Element {
  const { id, text, completed } = data;
  
  const handleChange = (checked: boolean): void => {
    changeStatus(id, checked);
  };

  return (
    <div className={`todo-item ${completed ? 'completed' : ''}`}>
      <CheckBox checked={completed} onChange={handleChange} />
      <span>{text}</span>
    </div>
  );
}

export default TodoItem;
```

## Related

### Related Components

- [App Component](../App.tsx) — Application root that provides Context and renders TodoList

### Hooks

- [Custom Hooks](../../hooks/README.md) — Custom hooks including `useInputBox` for input state management, `useKeyboard` for keyboard shortcuts, and `useTodoState` for todo state management

### Context

- [Todo Context](../../context/README.md) — React Context that provides global state and actions to components

### Services

- [Services](../../services/README.md) — Business logic for filtering, mode management, and todo operations used by TodoList and other components

### Types

- [Type Definitions](../../types/README.md) — TypeScript interfaces and types shared across the application including `Todo`, `Mode`, and `FilterOption`
