> ← Back to [src](../README.md) | [Main README](../../README.md)

# Utilities

## What You'll Find Here

Welcome to the utility functions! Think of these as the Swiss Army knife of the app—small, handy tools that get used all over the place. You'll find three helper functions here that make the rest of the code cleaner and easier to work with.

Don't worry if you're new to the codebase—these utilities are straightforward JavaScript with just a tiny bit of React sprinkled in. They're designed to do one thing well and be easy to understand.

## Quick Note Before You Dive In

> **Heads up!** You might notice one of our functions is called `stringInclues` (missing a 'd'). That's not a typo on your part—it's been that way since the beginning, and changing it now would break things throughout the app. When you import it, use `stringInclues` exactly as written.

## Overview

Here's what these helpers do for you:

- **`objectWithOnly`** — Picks just the methods you want from an object and keeps them working properly
- **`wrapChildrenWith`** — Passes the same props to all child components at once, saving you from repetitive code
- **`stringInclues`** — Checks if one string contains another (yes, with the quirky spelling!)

These utilities have no complicated dependencies—just React for the one that works with children. They're simple, focused functions that solve common patterns you'll see throughout the codebase.

## common.js

This is where all the utility functions live. Let's walk through each one and see when you'd actually use them.

### objectWithOnly(object, attrs)

**When would I use this?**

Ever need to pass just a few methods from a class to a child component? This function lets you pick exactly which methods you want and safely pass them around. The clever part? It remembers where it came from (preserves the `this` context), so you can call these methods anywhere without breaking things.

**How it works:**

| Parameter | Type | What it does |
|-----------|------|--------------|
| `object` | Object | The object you want to pick methods from |
| `attrs` | Array | A list of method names you want to keep |

**What you get back:** A brand new object containing only the methods you asked for, and they'll still work correctly when called.

**Real-world example from StateProvider:**

```javascript
import {objectWithOnly} from '../../util/common';

// Inside StateProvider.render()
// We want to give child components access to certain actions, but not everything
actions: objectWithOnly(this, ['addNew', 'changeFilter', 'changeStatus', 'changeMode', 'setSearchQuery'])

// Now 'actions' is a clean object with just those five methods
// Child components can call actions.addNew() and it still works!
```

**Why this matters:** Without the binding magic happening inside, if you passed `this.addNew` directly to a child and it called it, the method would lose its connection to StateProvider. This utility keeps everything working smoothly.

### wrapChildrenWith(children, props)

**When would I use this?**

This is your go-to when you need to pass the same information to all your child components at once. Instead of manually adding props to every single child, this helper does the work for you automatically. Super handy for things like state management where many components need the same data.

**How it works:**

| Parameter | Type | What it does |
|-----------|------|--------------|
| `children` | React.Children | The child elements you want to enhance |
| `props` | Object | The additional props you want to give each child |

**What you get back:** An array of your children, but now they all have the extra props merged in.

**Real-world example from StateProvider:**

```javascript
import {wrapChildrenWith} from '../../util/common';

render() {
    // Give all children access to our state and actions
    // Every child component now automatically gets 'data' and 'actions' props!
    let children = wrapChildrenWith(this.props.children, {
        data: this.state,            // The current app state
        actions: objectWithOnly(this, ['addNew', 'changeFilter', 'changeStatus', 'changeMode', 'setSearchQuery'])
    });

    return <div>{children}</div>;
}
```

**Another example from KeyStrokeHandler:**

```javascript
import {wrapChildrenWith} from '../../util/common';

render() {
    // Just pass along all our props to children
    // Simple one-liner to forward everything down
    return <div>{wrapChildrenWith(this.props.children, this.props)}</div>;
}
```

**Under the hood:** This uses React's built-in `React.Children.map` and `React.cloneElement` to safely clone each child with the merged props. It handles all the edge cases for you.

### stringInclues(str, substr)

**When would I use this?**

Need to check if one string contains another? This is your function. It's mainly used for the search/filter feature in the app—when users type in the search box, this function helps find matching todos.

**How it works:**

| Parameter | Type | What it does |
|-----------|------|--------------|
| `str` | String | The string you're searching within |
| `substr` | String | The text you're looking for |

**What you get back:** `true` if the substring is found, `false` if it's not.

**Real-world example from the filter service:**

```javascript
import {stringInclues} from '../util/common';

export function search(list, query) {
    // Clean up the search query first
    let q = query.trim().toLowerCase();

    // Filter the list to only items whose text contains the query
    // We lowercase both sides so the search isn't case-sensitive
    return list.filter(({text}) => stringInclues(text.toLowerCase(), q));
}
```

**Remember:** The function name is `stringInclues` (no 'd'). It's a quirk of the codebase that we've kept for backward compatibility!

## Related

### Where These Helpers Come in Handy

These utilities pop up in several key places throughout the app:

- **[`services/filter.js`](../services/filter.js)** — Uses `stringInclues` to power the search feature
- **[`components/wrappers/StateProvider.js`](../components/wrappers/StateProvider.js)** — Uses both `objectWithOnly` and `wrapChildrenWith` to share state and actions with the whole app
- **[`components/wrappers/KeyStrokeHandler.js`](../components/wrappers/KeyStrokeHandler.js)** — Uses `wrapChildrenWith` to pass props down to its children

### What to Explore Next

- Want to see how state flows through the app? Check out the [Wrappers documentation](../components/wrappers/README.md)
- Curious about the search feature? Head over to the [Services documentation](../services/README.md)
- Need to understand the component structure? Start with the [Components overview](../components/README.md)
