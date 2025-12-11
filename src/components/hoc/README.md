# Higher-Order Components (HOC)

> ← Back to [Components](../README.md) | [Main README](../../../README.md)

## Overview

Higher-Order Components are functions that take a component and return an enhanced version of that component with additional props or behavior. This pattern allows you to reuse component logic without modifying the original component.

This folder uses the [recompose](https://github.com/acdlite/recompose) library to create HOCs. Recompose provides utility functions like `compose`, `withState`, and `withHandlers` that make it easier to build enhancement pipelines.

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
| `value` | string | Current input value |
| `setValue` | function | Updates the input value |
| `handleChange` | function | Event handler that updates value on input change |
| `handleKeyUp` | function | Event handler that triggers `addNew` when Enter is pressed |

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

## Related

- [InputBox](../ui/InputBox.js) — The component that uses this HOC
- [Components README](../README.md) — Parent folder documentation
- [UI Components](../ui/README.md) — All presentational components
