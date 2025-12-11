# UI Components

> ← Back to [Components](../README.md) | [Main README](../../../README.md)

## Overview

This folder contains the presentational React components that form the visual interface of the Todo application. These components are responsible for rendering the UI based on data and callbacks received through props. They focus purely on visual presentation and user interaction, while the actual state management is handled by wrapper components.

The folder contains 12 React components organized by their role in the user interface.

## Component Catalog

| Component | Props | Description |
|-----------|-------|-------------|
| `TodoList.js` | `{data, actions}` | Main container component. Applies filters to the todo list and renders Header, FilteredList, Footer, and Info. The `data` prop contains `{list, filter, mode, query}`. The `actions` prop contains `{addNew, changeFilter, changeStatus, changeMode, setSearchQuery}`. |
| `Header.js` | `{addNew, mode, query, setSearchQuery}` | Renders the application title "Things To Do" and the InputWrapper component for user input. |
| `Footer.js` | `{activeItemCount, filter, changeFilter, mode, changeMode}` | Renders the bottom section containing ButtonWrapper, item count display, and Filter buttons. |
| `FilteredList.js` | `{items, changeStatus}` | Renders a list of TodoItem components. Shows an empty state message when there are no items to display. |
| `TodoItem.js` | `{data, changeStatus}` | Renders an individual todo item with a checkbox. The `data` prop contains `{id, text, completed}`. |
| `CheckBox.js` | `{checked, onChange}` | A controlled checkbox component that manages its checked state and calls `onChange` when toggled. |
| `InputBox.js` | Enhanced by HOC | Text input for adding new todos. Enhanced by the `wrapInputBox` HOC which injects `{value, handleChange, handleKeyUp}`. Also receives `{addNew}` from parent. |
| `InputWrapper.js` | `{mode, addNew, query, setSearchQuery}` | Conditional router that renders InputBox when in create mode, SearchBox when in search mode, or nothing when in none mode. |
| `SearchBox.js` | `{query, setSearchQuery}` | Text input for searching through todo items. Updates the search query as the user types. |
| `Filter.js` | `{filter, changeFilter}` | Renders filter toggle buttons (All, Active, Completed) that let users filter the todo list by completion status. |
| `ButtonWrapper.js` | `{mode, changeMode}` | Renders mode toggle buttons with Add and Search icons. Clicking toggles between create mode, search mode, and none mode. |
| `Info.js` | `{mode}` | Displays keyboard shortcut hints based on the current mode. Shows different messages depending on whether the user can start an action or cancel one. |

## Usage Patterns

### Prop Spreading

TodoList distributes props to its children using object shorthand syntax. This keeps the code concise while making it clear which props each child receives:

```jsx
// From TodoList.js
<Header {...{addNew, mode, query, setSearchQuery}}/>
<FilteredList {...{items, changeStatus}}/>
<Footer {...{activeItemCount, filter, changeFilter, mode, changeMode}}/>
<Info {...{mode}}/>
```

### HOC Enhancement

InputBox is enhanced by a higher-order component that provides controlled input behavior. The HOC wraps the component and injects additional props:

```jsx
// From InputBox.js
import enhance from '../hoc/wrapInputBox';

function InputBox(props) {
    const { value, handleChange, handleKeyUp } = props;
    // ...render input
}

export default enhance(InputBox);
```

### List Rendering

FilteredList maps over the items array to render individual TodoItem components. Each item receives a unique key for React reconciliation:

```jsx
// From FilteredList.js
{items.map(item => (
    <TodoItem key={item.id} data={item} changeStatus={changeStatus}/>
))}
```

### Conditional Rendering

InputWrapper uses the mode value to conditionally render different input components:

```jsx
// From InputWrapper.js
switch (mode) {
    case MODE_CREATE:
        return <InputBox {...{addNew}}/>;
    case MODE_SEARCH:
        return <SearchBox {...{query, setSearchQuery}}/>;
    default:
        return null;
}
```

## Related

### Related Components

- [Wrapper Components](../wrappers/README.md) — State management components that provide data and actions to these UI components
- [HOC](../hoc/README.md) — Higher-order component that enhances InputBox

### Services

- [Services](../../services/README.md) — Business logic for filtering, mode management, and todo operations used by TodoList and other components
