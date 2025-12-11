> ← Back to [src](../README.md) | [Main README](../../README.md)

# Utilities

## Overview

This folder contains shared helper functions used across the application. The `common.js` module provides three lightweight utilities for object manipulation, React child element handling, and string operations.

These utilities have no external dependencies beyond React and are designed to be simple, focused functions that solve common patterns in the codebase.

## common.js

This module exports three utility functions used by services and components throughout the application.

### objectWithOnly(object, attrs)

Creates a new object containing only specified methods from the source object. Each method is bound to the original object so that `this` context is preserved when called.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `object` | Object | The source object containing methods |
| `attrs` | Array | Array of method names to include |

**Returns:** A new object with only the selected methods, each bound to the original object.

**Usage Example (from StateProvider):**

```javascript
import {objectWithOnly} from '../../util/common';

// In StateProvider.render()
actions: objectWithOnly(this, ['addNew', 'changeFilter', 'changeStatus', 'changeMode', 'setSearchQuery'])
```

This creates an `actions` object with only the listed methods, bound to the StateProvider instance. Child components can call these methods without losing the correct `this` context.

**Implementation Note:** Methods are bound using `.bind(object)` so they can be passed to child components and called without losing their original context.

### wrapChildrenWith(children, props)

Clones React children elements and adds additional props to each child. This is useful for passing data down to child components without explicit prop drilling.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `children` | React.Children | The children elements to wrap |
| `props` | Object | Props to merge into each child |

**Returns:** An array of cloned children with the merged props.

**Usage Example (from StateProvider):**

```javascript
import {wrapChildrenWith} from '../../util/common';

render() {
    let children = wrapChildrenWith(this.props.children, {
        data: this.state,
        actions: objectWithOnly(this, ['addNew', 'changeFilter', 'changeStatus', 'changeMode', 'setSearchQuery'])
    });

    return <div>{children}</div>;
}
```

**Usage Example (from KeyStrokeHandler):**

```javascript
import {wrapChildrenWith} from '../../util/common';

render() {
    return <div>{wrapChildrenWith(this.props.children, this.props)}</div>;
}
```

**Implementation Note:** Uses `React.Children.map` and `React.cloneElement` internally to safely iterate over children and create copies with merged props.

### stringInclues(str, substr)

Checks if a string contains a substring. Performs a case-sensitive search.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `str` | String | The string to search within |
| `substr` | String | The substring to find |

**Returns:** `Boolean` - `true` if the substring is found, `false` otherwise.

**Usage Example (from filter.js search function):**

```javascript
import {stringInclues} from '../util/common';

export function search(list, query) {
    let q = query.trim().toLowerCase();

    return list.filter(({text}) => stringInclues(text.toLowerCase(), q));
}
```

**Important Note:** The function name has an intentional typo (missing 'd' in 'Includes'). This is kept for backward compatibility. When importing, use `stringInclues`, not `stringIncludes`.

## Related

These utilities are used by the following modules:

- [`services/filter.js`](../services/filter.js) - Uses `stringInclues` for search filtering
- [`components/wrappers/StateProvider.js`](../components/wrappers/StateProvider.js) - Uses `objectWithOnly` and `wrapChildrenWith` for state management
- [`components/wrappers/KeyStrokeHandler.js`](../components/wrappers/KeyStrokeHandler.js) - Uses `wrapChildrenWith` for prop forwarding
