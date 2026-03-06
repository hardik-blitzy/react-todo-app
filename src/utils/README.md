> ← Back to [src](../README.md) | [Main README](../../README.md)

# Utilities

## Overview

This folder contains shared helper functions used across the application. The `common.ts` module provides three lightweight, fully-typed TypeScript utilities for object manipulation, React child element handling, and string operations.

These utilities have no external dependencies beyond React and are designed to be simple, focused functions that solve common patterns in the codebase. All functions include comprehensive TypeScript generics and type annotations for maximum type safety.

## common.ts

This module exports three utility functions used by services and components throughout the application. Each function is fully typed with TypeScript and includes JSDoc documentation.

### Type Definitions

```typescript
/**
 * Type for an object containing methods that will be bound.
 * Used by objectWithOnly to ensure type safety when extracting and binding methods.
 */
export type MethodContainer = Record<string, (...args: unknown[]) => unknown>;
```

### objectWithOnly<T, K>(object, attrs)

Creates a new object containing only specified methods from the source object. Each method is bound to the original object so that `this` context is preserved when called.

**TypeScript Signature:**

```typescript
function objectWithOnly<T extends MethodContainer, K extends keyof T>(
  object: T,
  attrs: K[]
): Pick<T, K>
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `object` | `T extends MethodContainer` | The source object containing methods |
| `attrs` | `K[]` | Array of method names (keys of T) to include |

**Returns:** `Pick<T, K>` - A new object with only the selected methods, each bound to the original object.

**Usage Example (from useTodoState hook):**

```typescript
import { objectWithOnly } from '../../utils/common';

// In useTodoState hook
const actions = objectWithOnly(stateRef.current, [
  'addNew',
  'changeFilter',
  'changeStatus',
  'changeMode',
  'setSearchQuery'
]);
```

This creates an `actions` object with only the listed methods, bound to the original instance. Child components can call these methods without losing the correct `this` context.

**Implementation Note:** Methods are bound using `.bind(object)` so they can be passed to child components and called without losing their original context. The generic types `T` and `K` ensure type safety when extracting methods.

### wrapChildrenWith(children, props)

Clones React children elements and adds additional props to each child. This is useful for passing data down to child components without explicit prop drilling.

**TypeScript Signature:**

```typescript
function wrapChildrenWith(
  children: ReactNode,
  props: Record<string, unknown>
): ReactElement[] | null | undefined
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `children` | `ReactNode` | The children elements to wrap |
| `props` | `Record<string, unknown>` | Props to merge into each child |

**Returns:** `ReactElement[] | null | undefined` - An array of cloned children with the merged props, or null/undefined if no children.

**Usage Example (with TodoContext):**

```typescript
import { ReactNode } from 'react';
import { wrapChildrenWith } from '../../utils/common';

interface ProviderProps {
  children: ReactNode;
  data: TodoState;
  actions: TodoActions;
}

const TodoProvider = ({ children, data, actions }: ProviderProps) => {
  const enhancedChildren = wrapChildrenWith(children, {
    data,
    actions
  });

  return <div>{enhancedChildren}</div>;
};
```

**Usage Example (prop forwarding):**

```typescript
import { ReactNode } from 'react';
import { wrapChildrenWith } from '../../utils/common';

interface WrapperProps {
  children: ReactNode;
  disabled?: boolean;
  theme?: string;
}

const Wrapper = ({ children, ...props }: WrapperProps) => {
  return <div>{wrapChildrenWith(children, props)}</div>;
};
```

**Implementation Note:** Uses `React.Children.map` and `React.cloneElement` internally to safely iterate over children and create copies with merged props. Only valid React elements are cloned; primitive values (strings, numbers, null, undefined) pass through unchanged.

### stringIncludes(str, substr)

Checks if a string contains a substring. Performs a case-sensitive search.

**TypeScript Signature:**

```typescript
function stringIncludes(str: string, substr: string): boolean
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `str` | `string` | The string to search within |
| `substr` | `string` | The substring to find |

**Returns:** `boolean` - `true` if the substring is found, `false` otherwise.

**Usage Example (from filter.ts search function):**

```typescript
import { stringIncludes } from '../utils/common';
import { Todo } from '../types';

export function search(list: Todo[], query: string): Todo[] {
  const q = query.trim().toLowerCase();

  return list.filter(({ text }) => stringIncludes(text.toLowerCase(), q));
}
```

**Migration Note:** This function was renamed from `stringInclues` (typo in the original JavaScript codebase) to `stringIncludes` during the TypeScript migration. All imports should use the corrected name `stringIncludes`.

## TypeScript Benefits

The TypeScript migration provides several benefits for these utilities:

1. **Type Safety:** Generic constraints on `objectWithOnly` ensure only valid method names can be passed.
2. **IntelliSense:** IDE autocompletion works with the properly typed function signatures.
3. **Refactoring Safety:** The TypeScript compiler catches incorrect usage during refactoring.
4. **Self-Documentation:** Type annotations serve as inline documentation for function contracts.

## Related

These utilities are used by the following modules:

- [`services/filter.ts`](../services/filter.ts) - Uses `stringIncludes` for search filtering
- [`context/TodoContext.tsx`](../context/TodoContext.tsx) - Uses `objectWithOnly` and `wrapChildrenWith` for state management
- [`hooks/useTodoState.ts`](../hooks/useTodoState.ts) - Uses `objectWithOnly` for extracting bound action methods
