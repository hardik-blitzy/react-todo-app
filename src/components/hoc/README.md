# Higher-Order Components (HOC)

> ← Back to [Components](../README.md) | [Main README](../../../README.md)

## Overview

Higher-Order Components are functions that take a component and return an enhanced version of that component with additional props or behavior. This pattern allows you to reuse component logic without modifying the original component.

This folder uses the [recompose](https://github.com/acdlite/recompose) library to create HOCs. Recompose provides utility functions like `compose`, `withState`, and `withHandlers` that make it easier to build enhancement pipelines.

## Why Higher-Order Components?

This project targets **React 15.x**, which predates several modern React features that would otherwise eliminate the need for HOCs:

- **No Hooks**: React 15.x does not support Hooks (`useState`, `useEffect`, etc.), which were introduced in React 16.8. Hooks are the modern approach for injecting stateful logic into functional components, but they are unavailable here.
- **No stable Context API**: React 15.x does not include the stable Context API (`React.createContext`), which was introduced in React 16.3. Without it, prop drilling or alternative patterns like HOCs are required for cross-cutting concerns.
- **Functional composition via Recompose**: The [recompose](https://github.com/acdlite/recompose) library provides a functional composition alternative for injecting stateful behavior into components without converting them to class components. Utilities like `withState` and `withHandlers` allow stateless functional components (like `InputBox`) to gain controlled input state and keyboard handling without any local class-based state.
- **Pre-Hooks standard**: Recompose was the standard solution for HOC composition in the pre-Hooks era. It has been deprecated since October 2018 (the author recommends migrating to Hooks), but it remains fully functional for React 15.x projects where Hooks are not available.

## Contents

| File | Purpose |
|------|---------|
| `wrapInputBox.js` | Enhances input components with controlled value state and keyboard event handlers |

## wrapInputBox.js

### Purpose

This HOC enhances input components with controlled input state management and keyboard handling. It adds the ability to track the input value, update it on change, and trigger an action when the user presses Enter.

### Implementation Details

The HOC uses recompose's `compose` function to chain two enhancers together:

1. **withState** — Adds a `value` state variable and a `setValue` function to update it. The initial value comes from props or defaults to an empty string.

2. **withHandlers** — Adds event handler functions that work with the state:
   - `handleChange` updates the value when the input changes
   - `handleKeyUp` checks for the Enter key and calls the `addNew` prop with the trimmed text

### Injected Props

The HOC injects the following props into the wrapped component:

| Prop | Type | Description |
|------|------|-------------|
| `value` | string | Current input value managed by Recompose's `withState`; initialized from `props.value` or defaults to an empty string `''` |
| `setValue` | function | Recompose state updater function that replaces the current `value` state; called internally by `handleChange` and `handleKeyUp` |
| `handleChange` | function | `onChange` event handler that extracts `e.target.value` and passes it to `setValue` to keep the input controlled on every keystroke |
| `handleKeyUp` | function | `onKeyUp` event handler that detects the Enter key via `KeyCode.KEY_RETURN` from `keycode-js`, trims the current input value via `.trim()`, and if the trimmed text is non-empty, calls `props.addNew(text)` to add a new todo item, then calls `setValue('')` to clear the input field |

### Expected Props

The wrapped component's parent must provide:

| Prop | Type | Description |
|------|------|-------------|
| `addNew` | function | Called with the input text when Enter is pressed and the input is non-empty |

### Usage Example

The `InputBox` component uses this HOC to add controlled input behavior:

```javascript
import React from 'react';
import enhance from '../hoc/wrapInputBox';

function InputBox(props) {
    const { value, handleChange, handleKeyUp } = props;

    return (
        <input autoFocus
            type="text"
            className="form-control add-todo"
            value={value}
            onKeyUp={handleKeyUp}
            onChange={handleChange}
            placeholder="Add New"
        />
    );
}

export default enhance(InputBox);
```

The component receives `value`, `handleChange`, and `handleKeyUp` from the HOC. The `addNew` prop is passed through from the parent component and used internally by `handleKeyUp`.

## The compose Pattern

The `compose` function from recompose chains multiple enhancers together. Each enhancer wraps the component, and they are applied from bottom to top (right to left).

In `wrapInputBox.js`, the composition order is:

```javascript
compose(
    withState('value', 'setValue', props => props.value || ''),
    withHandlers({
        handleKeyUp: ({ addNew, setValue }) => e => { /* ... */ },
        handleChange: ({ setValue }) => e => { /* ... */ }
    })
)
```

This means:
1. `withState` runs first, adding `value` and `setValue` to props
2. `withHandlers` runs second, adding `handleKeyUp` and `handleChange` that can access the state from step 1

## External Dependencies

The HOC in this folder relies on two external npm packages, both declared in the project's root `package.json`:

| Package | Version | Purpose |
|---------|---------|---------|
| `recompose` | ^0.23.5 | Provides `compose`, `withState`, and `withHandlers` utility functions for HOC composition |
| `keycode-js` | ^0.0.4 | Provides the `KEY_RETURN` constant for cross-platform Enter key detection |

> **Note:** Recompose is deprecated since October 2018 (the author recommends migrating to Hooks), but it remains fully functional and appropriate for this React 15.x project where Hooks are not available.

## Related

- [InputBox](../ui/InputBox.js) — The component that uses this HOC
- [Components README](../README.md) — Parent folder documentation
- [UI Components](../ui/README.md) — All presentational components
