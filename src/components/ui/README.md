# UI Components

> ← Back to [Components](../README.md) | [Main README](../../../README.md)

## What are UI Components?

Welcome! You've found the visual building blocks of our todo app. 🎨

**Think of UI components like actors on a stage** — they perform based on the script (props) they're given, but they don't write the script themselves. These components receive information and display it beautifully on screen. That's it!

Here's the simple idea:
- **They don't think** — they just look pretty
- **They receive data** (called "props") from their parent components
- **They show things** — text, buttons, checkboxes, input fields
- **They tell parents when things happen** — "Hey, someone clicked me!"

If you're new to React, this is a great place to start! These components are simple and focused. Each one does just one thing really well, making them easy to understand and learn from.

## Overview

Here you'll find 12 React components that make up everything you see in the todo app. We've organized them by what they do in the interface — some handle the header area, others deal with the todo list, and a few manage the footer controls.

The key thing to remember: these components are "presentational." They don't manage any data themselves — they just display whatever information gets passed to them and let their parent components know when a user does something.

## Component Catalog

Here's a quick tour of each component and what it does:

| Component | Props | What It Does |
|-----------|-------|--------------|
| `TodoList.js` | `{data, actions}` | The main container that brings everything together — header, list, footer, and info. It's like the frame that holds all the other pieces. Gets `data` (your todos, filters, mode, and search query) and `actions` (functions to add, filter, and update things). |
| `Header.js` | `{addNew, mode, query, setSearchQuery}` | The top section with your app title "Things To Do" and the input area. This is where users start adding or searching for todos. |
| `Footer.js` | `{activeItemCount, filter, changeFilter, mode, changeMode}` | The bottom bar with mode buttons, item count, and filter options. Think of it as the control panel for the app. |
| `FilteredList.js` | `{items, changeStatus}` | Shows your todos (or a friendly message when the list is empty). It loops through items and displays each one. |
| `TodoItem.js` | `{data, changeStatus}` | A single todo with its checkbox — click to complete! Gets the todo's `id`, `text`, and `completed` status. |
| `CheckBox.js` | `{checked, onChange}` | The checkbox you click to mark todos done. Simple but essential! |
| `InputBox.js` | Enhanced by HOC | Where you type new todos. This one's special — it's wrapped by a "higher-order component" that handles all the typing and Enter key magic for you. |
| `InputWrapper.js` | `{mode, addNew, query, setSearchQuery}` | The traffic cop that decides whether to show the add input, search input, or nothing at all based on what mode you're in. |
| `SearchBox.js` | `{query, setSearchQuery}` | Where you type to search your todos. As you type, the list filters in real-time. |
| `Filter.js` | `{filter, changeFilter}` | Buttons to show All, Active, or Completed todos. Helps you focus on what matters right now. |
| `ButtonWrapper.js` | `{mode, changeMode}` | Buttons to switch between Create mode (add new todos) and Search mode (find existing ones). |
| `Info.js` | `{mode}` | Shows helpful keyboard shortcuts at the bottom. The hints change based on what you can do in the current mode. |

### Understanding Props

If you're new to React, "props" might sound confusing. Think of them as **information passed from parent to child**:

- `addNew` → The function to call when someone wants to add a new todo
- `changeStatus` → Call this when a todo's completion status changes  
- `mode` → Tells the component which mode the app is in (creating, searching, or neither)
- `filter` → The current filter setting (all, active, or completed)
- `query` → What the user has typed in the search box

## Usage Patterns

Let's look at some common patterns you'll see in these components. Don't worry if they seem tricky at first — we'll explain each one!

### Prop Spreading

**Why use this pattern?** When you have several pieces of information to pass to child components, you could write out each prop individually. But that gets repetitive! Prop spreading lets you pass multiple props at once in a cleaner way.

**When would you need this?** Whenever a parent component needs to distribute information to its children. TodoList does this a lot because it acts as a hub that receives all the data and actions, then passes relevant parts to each child.

```jsx
// From TodoList.js
// Instead of writing: addNew={addNew} mode={mode} query={query} setSearchQuery={setSearchQuery}
// We can spread them all at once:
<Header {...{addNew, mode, query, setSearchQuery}}/>
<FilteredList {...{items, changeStatus}}/>
<Footer {...{activeItemCount, filter, changeFilter, mode, changeMode}}/>
<Info {...{mode}}/>
```

### HOC Enhancement

**What's happening here?** InputBox is the text field where users type new todos. It's enhanced by something called a "Higher-Order Component" (HOC) — think of it as a helper that automatically handles:
- Tracking what the user types
- Responding when they press Enter
- Clearing the input after adding a todo

**Why is this useful?** Without the HOC, InputBox would need to include all that logic itself. By separating it out, InputBox stays simple and focused on just displaying an input field.

```jsx
// From InputBox.js
import enhance from '../hoc/wrapInputBox';

function InputBox(props) {
    // These props come FROM the HOC, not from our parent component!
    const { value, handleChange, handleKeyUp } = props;
    // ...render input
}

// The HOC wraps InputBox and adds the extra props
export default enhance(InputBox);
```

Want to learn more about HOCs? Check out the [HOC documentation](../hoc/README.md) for a deeper explanation.

### List Rendering

**What's happening here?** When we have an array of items (like todos), we need to create a component for each one. The `map` function loops through the array and returns a TodoItem for each todo.

**Why do we need `key`?** React uses keys to track which items have changed, been added, or removed. Without keys, React would have to re-render the entire list every time something changes. With keys, it can smartly update only what's necessary — making your app faster!

```jsx
// From FilteredList.js
{items.map(item => (
    // key={item.id} helps React track which todo is which
    <TodoItem key={item.id} data={item} changeStatus={changeStatus}/>
))}
```

### Conditional Rendering

**What's happening here?** The app has different modes — Create mode for adding todos, Search mode for finding them, and None mode when neither input is shown. InputWrapper looks at the current mode and decides which component to display.

**In plain terms:**
- If we're in Create mode → Show the InputBox for adding new todos
- If we're in Search mode → Show the SearchBox for finding todos  
- Otherwise → Show nothing (return `null`)

```jsx
// From InputWrapper.js
switch (mode) {
    case MODE_CREATE:
        // User wants to add a todo — show the add input
        return <InputBox {...{addNew}}/>;
    case MODE_SEARCH:
        // User wants to search — show the search input
        return <SearchBox {...{query, setSearchQuery}}/>;
    default:
        // Neither mode — hide the input area
        return null;
}
```

## Related

### Where to Go Next

Now that you understand the UI components, here are some great next steps:

**Want to understand how these components get their data?**
→ Check out [Wrapper Components](../wrappers/README.md) — they're the "brains" that manage state and feed information to these UI components.

**Curious about that InputBox HOC thing?**
→ The [HOC documentation](../hoc/README.md) explains exactly how `wrapInputBox` adds typing and keyboard handling magic.

**Wondering where the business logic lives?**
→ Visit [Services](../../services/README.md) to see the functions that handle filtering, mode management, and todo operations.

### Quick Links

- [Wrapper Components](../wrappers/README.md) — State management components that provide data and actions to these UI components
- [HOC](../hoc/README.md) — Higher-order component that enhances InputBox with controlled input behavior
- [Services](../../services/README.md) — Business logic for filtering, mode management, and todo operations
- [Components Overview](../README.md) — See how all the component folders fit together
