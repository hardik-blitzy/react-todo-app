# Higher-Order Components (HOC)

> ← Back to [Components](../README.md) | [Main README](../../../README.md)

## What is a Higher-Order Component?

A Higher-Order Component (HOC) is like a gift wrapper for your component—it adds extra features without changing what's inside. You give it a component, and it gives you back an enhanced version with new superpowers.

Think of it like adding a case to your phone. Your phone still works exactly the same way, but now it has extra protection and maybe some cool new features like a kickstand. The phone didn't change—the case just added something useful on top.

In code terms, an HOC is simply a function that:
1. Takes a component as input
2. Returns a new component with additional props or behavior

Don't worry if this seems complex at first—HOCs are one of those things that really clicks after you see them in action. By the end of this page, you'll understand exactly how we use them in this app!

## Overview

This folder is home to our higher-order components. We use the [recompose](https://github.com/acdlite/recompose) library to build them, which gives us handy helpers like `compose`, `withState`, and `withHandlers` to chain enhancements together.

HOCs can be confusing at first, but once you get the hang of them, they're incredibly useful. The main benefit? You can reuse component logic across your app without copying and pasting code or modifying the original components.

## Contents

| File | Purpose |
|------|---------|
| `wrapInputBox.js` | Adds smart typing and keyboard handling to input components |

## wrapInputBox.js

### Purpose

This helper wraps your input components to handle typing and Enter key presses automatically. Instead of your input component needing to manage its own value and keyboard events, this HOC takes care of all that work for you.

### Why Does This Exist?

Imagine you have several input fields in your app, and each one needs to:
- Keep track of what the user is typing
- Respond when the user presses Enter
- Clear itself after submission

Without an HOC, you'd have to write this same logic in every input component. That's tedious and error-prone! With `wrapInputBox`, you write the logic once and then "wrap" any input that needs it.

Think of it like a universal adapter that makes any input "smart"—plug in a basic input component, and out comes one that knows how to handle typing and submissions.

### Implementation Details

Under the hood, the HOC uses recompose's `compose` function to chain two enhancements together:

1. **withState** — This adds a `value` variable to track what the user types, along with a `setValue` function to update it. If the component already has a value prop, it uses that as the starting point; otherwise, it starts with an empty string.

2. **withHandlers** — This creates two event handlers that work with the state above:
   - `handleChange` — Updates the value whenever the user types something
   - `handleKeyUp` — Watches for the Enter key; when pressed (and the input isn't empty), it calls the `addNew` function and clears the input

### Injected Props

When you wrap a component with this HOC, it automatically gets these props:

| Prop | Type | What It Does |
|------|------|--------------|
| `value` | string | The current text in the input |
| `setValue` | function | A way to update the input value directly |
| `handleChange` | function | Connect this to your input's `onChange` event |
| `handleKeyUp` | function | Connect this to your input's `onKeyUp` event |

### Expected Props

For the HOC to work its magic, the parent component needs to pass in:

| Prop | Type | What It Does |
|------|------|--------------|
| `addNew` | function | Gets called with the input text when the user presses Enter (only if there's actual text) |

### Usage Example

Here's how the `InputBox` component uses this HOC to add controlled input behavior:

```javascript
import React from 'react';
import enhance from '../hoc/wrapInputBox';

// This is a simple input component that receives its "smarts" from the HOC
function InputBox(props) {
    // We destructure the props that the HOC injects for us
    const { value, handleChange, handleKeyUp } = props;

    return (
        <input autoFocus
            type="text"
            className="form-control add-todo"
            // The HOC manages this value - we just display it
            value={value}
            // When the user presses a key, the HOC checks if it's Enter
            onKeyUp={handleKeyUp}
            // When the user types, the HOC updates the value
            onChange={handleChange}
            placeholder="Add New"
        />
    );
}

// Here's where the magic happens! We wrap our component with the HOC
// This transforms our simple input into a smart one that handles
// typing and Enter key presses automatically
export default enhance(InputBox);
```

Notice how the component itself stays simple and focused on rendering. All the state management and keyboard logic lives in the HOC, making `InputBox` easy to read and maintain.

The `addNew` prop isn't shown here because it gets passed down from the parent component. The HOC intercepts it internally and calls it when the user presses Enter.

## The Compose Pattern

Think of `compose` like stacking filters on a photo app—each filter adds something new to your image, and they apply in a specific order.

The `compose` function from recompose chains multiple enhancers together. Each enhancer wraps the component, and they're applied from bottom to top (or right to left if you think of it horizontally).

In `wrapInputBox.js`, here's how the composition works:

```javascript
compose(
    // Step 1: First, add state management for the input value
    // This gives us 'value' and 'setValue' props
    withState('value', 'setValue', props => props.value || ''),
    
    // Step 2: Then, add event handlers that use the state from Step 1
    // These handlers can access 'value' and 'setValue' because
    // withState ran first
    withHandlers({
        handleKeyUp: ({ addNew, setValue }) => e => { /* ... */ },
        handleChange: ({ setValue }) => e => { /* ... */ }
    })
)
```

Here's the key insight: **the bottom enhancer wraps the component first**, then the next one wraps around that. So:

1. `withState` runs first → adds `value` and `setValue` to the props
2. `withHandlers` runs second → creates handlers that can use `value` and `setValue` from step 1

It's like putting on clothes—you put on your shirt first, then your jacket goes over it. The jacket can see and interact with the shirt, but not the other way around.

## Related

### Where to Go Next

Now that you understand HOCs, here are some logical next steps:

- **See it in action** — Check out [InputBox](../ui/InputBox.js) to see how this HOC is used in a real component
- **Explore more components** — Visit [UI Components](../ui/README.md) to see all the presentational components
- **Understand the big picture** — Head to [Components README](../README.md) to see how everything fits together

### Quick Links

- [InputBox](../ui/InputBox.js) — The component that uses this HOC
- [Components README](../README.md) — Parent folder documentation
- [UI Components](../ui/README.md) — All presentational components
