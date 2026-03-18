# UI Components

> ← Back to [Components](../README.md) | [Main README](../../../README.md)

## Overview

This folder contains the 12 presentational React components that form the visual interface of the Todo application. Of these, 11 are stateless functional components and 1 (`CheckBox`) is a class component with local state. These components are responsible for rendering the UI based on data and callbacks received through props. They focus purely on visual presentation and user interaction, while the actual state management is handled by wrapper components.

## Component Catalog

### TodoList

**File:** `TodoList.js` — Stateless functional component

Main container component that executes a two-stage data pipeline (`applyFilter` then `search`) and renders the four primary UI sections: Header, FilteredList, Footer, and Info.

| Prop | Type | Description |
|------|------|-------------|
| `data` | `Object` | State object from StateProvider |
| `data.list` | `Array<{id: number, text: string, completed: boolean}>` | Complete list of all todo items |
| `data.filter` | `string` | Current active filter key (`FILTER_ALL`, `FILTER_ACTIVE`, or `FILTER_COMPLETED`) |
| `data.query` | `string` | Current search query text for filtering items by text match |
| `data.mode` | `string` | Current interaction mode (`MODE_NONE`, `MODE_CREATE`, or `MODE_SEARCH`) |
| `actions` | `Object` | Action callbacks from StateProvider |
| `actions.addNew` | `Function` | Callback to add a new todo item, receives `(text: string)` |
| `actions.changeFilter` | `Function` | Callback to change the active filter, receives `(filter: string)` |
| `actions.changeStatus` | `Function` | Callback to toggle a todo item's completion status, receives `(id: number, completed: boolean)` |
| `actions.changeMode` | `Function` | Callback to change the interaction mode, receives `(mode: string)` |
| `actions.setSearchQuery` | `Function` | Callback to update the search query text, receives `(query: string)` |

### Header

**File:** `Header.js` — Stateless functional component

Renders the application title "Things To Do" and the InputWrapper component for user input. Receives all props from TodoList via spread and forwards them to InputWrapper.

| Prop | Type | Description |
|------|------|-------------|
| `addNew` | `Function` | Callback to add a new todo item |
| `mode` | `string` | Current interaction mode |
| `query` | `string` | Current search query text |
| `setSearchQuery` | `Function` | Callback to update the search query text |

### InputWrapper

**File:** `InputWrapper.js` — Stateless functional component

Conditional router that renders InputBox when in create mode, SearchBox when in search mode, or nothing when in none mode.

| Prop | Type | Description |
|------|------|-------------|
| `mode` | `string` | Current interaction mode; determines which input component to render |
| `addNew` | `Function` | Callback forwarded to InputBox when in `MODE_CREATE` |
| `query` | `string` | Current search query forwarded to SearchBox when in `MODE_SEARCH` |
| `setSearchQuery` | `Function` | Callback forwarded to SearchBox when in `MODE_SEARCH` |

### InputBox

**File:** `InputBox.js` — Stateless functional component enhanced by `wrapInputBox` HOC

Auto-focused text input for adding new todos. The base component is enhanced by the `wrapInputBox` higher-order component which injects controlled input behavior.

**Props injected by `wrapInputBox` HOC:**

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Current controlled input value managed by HOC local state |
| `handleChange` | `Function` | onChange handler that updates HOC local state |
| `handleKeyUp` | `Function` | onKeyUp handler that detects Enter key, trims value, calls `addNew`, and clears input |

**Props from parent (via InputWrapper):**

| Prop | Type | Description |
|------|------|-------------|
| `addNew` | `Function` | Callback to add a new todo; consumed by the HOC's handleKeyUp logic |

### SearchBox

**File:** `SearchBox.js` — Stateless functional component

Auto-focused search input that forwards every keystroke to the search query callback for real-time filtering.

| Prop | Type | Description |
|------|------|-------------|
| `query` | `string` | Current search query text, used as the input's controlled value |
| `setSearchQuery` | `Function` | Callback invoked on every onChange event with `e.target.value` |

### FilteredList

**File:** `FilteredList.js` — Stateless functional component

Renders a list of TodoItem components from the pre-filtered items array. Displays an empty state message (`MSG_NO_ITEMS`) when there are no items to render.

| Prop | Type | Description |
|------|------|-------------|
| `items` | `Array<{id: number, text: string, completed: boolean}>` | Pre-filtered and searched array of todo items to render |
| `changeStatus` | `Function` | Callback forwarded to each TodoItem for toggling completion status |

### TodoItem

**File:** `TodoItem.js` — Stateless functional component

Renders a single todo item row with a checkbox. Applies `completed` or `pending` CSS class based on item status.

| Prop | Type | Description |
|------|------|-------------|
| `data` | `{id: number, text: string, completed: boolean}` | A single todo item object |
| `changeStatus` | `Function` | Callback invoked with `(data.id, checked)` when CheckBox is toggled |

### CheckBox

**File:** `CheckBox.js` — **Class component** with local state

A controlled checkbox component that extends `React.Component`. Maintains local `checked` state seeded from `props.checked` in the constructor. Synchronizes local state with the DOM before propagating changes upward via `props.onChange`.

| Prop | Type | Description |
|------|------|-------------|
| `checked` | `boolean` | Initial checked state, seeded into `this.state.checked` in constructor |
| `onChange` | `Function` | Callback invoked with `(checked: boolean)` after local state update in handleChange |

### Footer

**File:** `Footer.js` — Stateless functional component

Renders the bottom section containing ButtonWrapper, active item count display, and Filter controls.

| Prop | Type | Description |
|------|------|-------------|
| `activeItemCount` | `number` | Count of non-completed todo items, displayed as `"N items left"` |
| `filter` | `string` | Current active filter key, forwarded to Filter |
| `changeFilter` | `Function` | Callback forwarded to Filter for changing the active filter |
| `mode` | `string` | Current interaction mode, forwarded to ButtonWrapper |
| `changeMode` | `Function` | Callback forwarded to ButtonWrapper for mode switching |

### ButtonWrapper

**File:** `ButtonWrapper.js` — Stateless functional component

Renders mode toggle buttons with Add and Search SVG icon backgrounds. Clicking toggles between create mode, search mode, and none mode. Applies the `selected` CSS class to the active mode button.

| Prop | Type | Description |
|------|------|-------------|
| `mode` | `string` | Current interaction mode; compared to `MODE_CREATE` and `MODE_SEARCH` for the `selected` class |
| `changeMode` | `Function` | Callback invoked with `MODE_NONE`, `MODE_CREATE`, or `MODE_SEARCH` on click |

### Filter

**File:** `Filter.js` — Stateless functional component

Renders three filter anchor elements (All, Active, Completed) sourced from `getOptions()`. Highlights the currently selected filter with the `selected` CSS class.

| Prop | Type | Description |
|------|------|-------------|
| `filter` | `string` | Current active filter key; matched against option keys for `selected` class |
| `changeFilter` | `Function` | Callback invoked with the clicked filter key string |

### Info

**File:** `Info.js` — Stateless functional component

Displays contextual keyboard shortcut guidance text. Shows `INFO_SHORTCUT_KEYS` when in `MODE_NONE`, and `INFO_CANCEL_SHORTCUT_KEY` for all other modes.

| Prop | Type | Description |
|------|------|-------------|
| `mode` | `string` | Current interaction mode; compared to `MODE_NONE` to choose which shortcut message to display |

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

## Integration with Other Layers

UI components import constants and functions from the service, asset, and HOC layers to implement their rendering logic.

### Service Layer Imports

| Component | Import | Source | Purpose |
|-----------|--------|--------|---------|
| `TodoList.js` | `applyFilter`, `search`, `FILTER_ACTIVE` | `../../services/filter` | Two-stage data pipeline and active item count computation |
| `InputWrapper.js` | `MODE_SEARCH`, `MODE_CREATE` | `../../services/mode` | Conditional input rendering based on interaction mode |
| `ButtonWrapper.js` | `MODE_NONE`, `MODE_CREATE`, `MODE_SEARCH` | `../../services/mode` | Mode toggle button logic and `selected` class assignment |
| `Filter.js` | `getOptions` | `../../services/filter` | Available filter option labels for rendering filter anchors |
| `Info.js` | `MODE_NONE` | `../../services/mode` | Shortcut message selection based on current mode |

### Asset Layer Imports

| Component | Import | Source | Purpose |
|-----------|--------|--------|---------|
| `FilteredList.js` | `MSG_NO_ITEMS` | `../../assets/text/en_US` | Empty state message when no items match the current filter and search |
| `Info.js` | `INFO_SHORTCUT_KEYS`, `INFO_CANCEL_SHORTCUT_KEY` | `../../assets/text/en_US` | Keyboard shortcut guidance messages displayed to the user |

### HOC Layer Imports

| Component | Import | Source | Purpose |
|-----------|--------|--------|---------|
| `InputBox.js` | `enhance` (default export) | `../hoc/wrapInputBox` | Controlled input behavior enhancement via Recompose composition |

## Component Patterns

### Stateless Functional Components

11 of the 12 components (`TodoList`, `Header`, `InputWrapper`, `InputBox`, `SearchBox`, `FilteredList`, `TodoItem`, `Footer`, `ButtonWrapper`, `Filter`, `Info`) are stateless functional components. They receive all data via props, have no lifecycle methods, and focus purely on rendering. Each component uses plain function syntax (not arrow function exports).

### Class Component

`CheckBox` is the only class component in the UI layer. It extends `React.Component` and maintains local `checked` state seeded from `props.checked` in the constructor. The component synchronizes local state with the DOM before propagating changes upward via `props.onChange`. This pattern is used because the checkbox requires local state tracking that differs from the application-level state managed by StateProvider.

### React 15.x Compatibility

All components target React `^15.4.2`. The following modern React APIs are **not used**:

- No Hooks (`useState`, `useEffect`, `useContext`, etc.)
- No Context API (`React.createContext`)
- No Fragments (`<React.Fragment>` or `<>...</>`)
- No `forwardRef` or `createRoot`

The class component imports `Component` as a named import from `react`. Functional components import `React` as the default import for JSX transformation.

## Related

### Related Components

- [Wrapper Components](../wrappers/README.md) — State management components that provide data and actions to these UI components
- [HOC](../hoc/README.md) — Higher-order component that enhances InputBox

### Services

- [Services](../../services/README.md) — Business logic for filtering, mode management, and todo operations used by TodoList and other components
