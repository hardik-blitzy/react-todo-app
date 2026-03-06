# Technical Specification

# 0. Agent Action Plan

## 0.1 Intent Clarification

Based on the prompt, the Blitzy platform understands that the refactoring objective is to modernize a legacy React TODO application by applying industry best practices and design principles to improve code quality, maintainability, and scalability.

### 0.1.1 Core Refactoring Objective

**Refactoring Type:** Code structure improvement + Tech stack modernization + Design pattern application

**Target Repository:** Same repository (in-place refactoring)

**Primary Goals:**
- Apply DRY (Don't Repeat Yourself) principle to eliminate code duplication
- Implement SOLID principles adapted for React functional programming:
  - **Single Responsibility Principle (SRP):** Each component should handle only one concern
  - **Open/Closed Principle (OCP):** Components should be extensible without modification
  - **Interface Segregation Principle (ISP):** Components should not depend on props they don't use
  - **Dependency Inversion Principle (DIP):** Depend on abstractions via proper prop drilling and context
- Adopt modern React best practices including functional components and hooks
- Add TypeScript for type safety and improved developer experience

**Implicit Requirements Surfaced:**
- Migrate from deprecated `recompose` library to native React Hooks
- Fix existing bugs (memory leak in `KeyStrokeHandler.js`, typo in `stringInclues`)
- Replace legacy lifecycle methods (`componentWillMount`) with modern equivalents
- Upgrade React from version 15.4.2 to a modern version supporting hooks (16.8+)
- Configure TypeScript compiler and type definitions
- Maintain backward compatibility with existing functionality

### 0.1.2 Special Instructions and Constraints

**Critical Directives:**
- Preserve all existing application functionality during refactoring
- Maintain the same UI/UX behavior for end users
- Keep the Bootstrap 3.4.1 styling intact
- Ensure all keyboard shortcuts continue working as expected

**Migration Requirements:**
- Convert all class components to functional components with hooks
- Replace `recompose` HOC patterns (`compose`, `withState`, `withHandlers`) with `useState`, `useCallback`, and custom hooks
- Convert all `.js` files to `.tsx` for components and `.ts` for utilities/services

**Performance Improvements Expected:**
- Eliminate unnecessary re-renders through proper memoization
- Fix memory leaks from unbound event listeners
- Remove deprecated libraries that increase bundle size

### 0.1.3 Technical Interpretation

This refactoring translates to the following technical transformation strategy:

**Architecture Transformation:**
```
Current Architecture          →    Target Architecture
─────────────────────────────────────────────────────────────
React 15.4.2 (Class-based)   →    React 18.x (Functional)
JavaScript (.js)              →    TypeScript (.ts/.tsx)
recompose HOCs               →    React Hooks
componentWillMount           →    useEffect
window.addEventListener      →    useEffect with cleanup
wrapChildrenWith utility     →    React Context API
Manual prop injection        →    Custom hooks
No type safety               →    Full TypeScript coverage
```

**Transformation Rules:**
1. Every `compose(withState, withHandlers)` pattern becomes a custom hook
2. Every class component with lifecycle methods becomes a functional component with `useEffect`
3. Every utility function gets explicit TypeScript type annotations
4. Every component gets a properly typed props interface
5. All event handlers use proper cleanup patterns to prevent memory leaks

## 0.2 Source Analysis

### 0.2.1 Comprehensive Source File Discovery

**Search Patterns Applied:**
- Legacy patterns: `src/**/*.js` - All JavaScript files requiring TypeScript migration
- HOC patterns: `src/components/hoc/*.js` - Recompose-based Higher Order Components
- Class components: `src/components/wrappers/*.js` - Components with lifecycle methods
- Utility functions: `src/util/*.js`, `src/services/*.js` - Business logic modules
- Entry points: `src/index.js` - Application bootstrap

**Current Structure Mapping:**
```
Current:
src/
├── index.js (entry point - renders App)
├── README.md
├── assets/
│   ├── README.md
│   ├── style/
│   │   └── index.css (Bootstrap overrides - 177 lines)
│   └── text/
│       └── en_US.js (localization constants - 12 exports)
├── components/
│   ├── README.md
│   ├── hoc/
│   │   ├── README.md
│   │   └── wrapInputBox.js (recompose HOC - to be converted to hook)
│   ├── ui/
│   │   ├── README.md
│   │   ├── ButtonWrapper.js (stateless functional)
│   │   ├── CheckBox.js (stateless functional)
│   │   ├── Filter.js (stateless functional)
│   │   ├── FilteredList.js (stateless functional)
│   │   ├── Footer.js (stateless functional)
│   │   ├── Header.js (stateless functional)
│   │   ├── Info.js (stateless functional)
│   │   ├── InputBox.js (enhanced with wrapInputBox HOC)
│   │   ├── InputWrapper.js (conditional rendering)
│   │   ├── SearchBox.js (enhanced with wrapInputBox HOC)
│   │   ├── TodoItem.js (stateless functional)
│   │   └── TodoList.js (main container component)
│   └── wrappers/
│       ├── README.md
│       ├── App.js (composition root)
│       ├── KeyStrokeHandler.js (class component - has bug)
│       └── StateProvider.js (class component - state management)
├── services/
│   ├── README.md
│   ├── filter.js (filter business logic)
│   ├── mode.js (application mode constants/logic)
│   └── todo.js (todo CRUD operations)
└── util/
    ├── README.md
    └── common.js (shared utilities - has typo bug)
```

### 0.2.2 Files Requiring Refactoring

**Critical Issues Identified:**

| File | Issue Type | Description | Priority |
|------|-----------|-------------|----------|
| `src/components/wrappers/KeyStrokeHandler.js` | Bug + Legacy | Memory leak: `removeEventListener` uses different function reference than `addEventListener`. Uses deprecated `componentWillMount`. | HIGH |
| `src/util/common.js` | Bug | Function named `stringInclues` (typo, should be `stringIncludes`) | MEDIUM |
| `src/components/hoc/wrapInputBox.js` | Deprecated | Uses `recompose` library which is discontinued | HIGH |
| `src/components/wrappers/StateProvider.js` | Legacy | Class component managing application state, should use Context + Hooks | HIGH |
| `src/components/ui/InputBox.js` | Pattern | Wrapped with HOC, should use hooks directly | MEDIUM |
| `src/components/ui/SearchBox.js` | Pattern | Wrapped with HOC, should use hooks directly | MEDIUM |

**Complete Source File List (21 JavaScript files):**

1. `src/index.js` - Entry point
2. `src/components/wrappers/App.js` - Application root composition
3. `src/components/wrappers/KeyStrokeHandler.js` - Global keyboard handler (class)
4. `src/components/wrappers/StateProvider.js` - State management wrapper (class)
5. `src/components/hoc/wrapInputBox.js` - HOC for input components
6. `src/components/ui/ButtonWrapper.js` - Button container
7. `src/components/ui/CheckBox.js` - Checkbox component
8. `src/components/ui/Filter.js` - Filter option component
9. `src/components/ui/FilteredList.js` - Filtered todo list
10. `src/components/ui/Footer.js` - Footer with filters
11. `src/components/ui/Header.js` - Header with input
12. `src/components/ui/Info.js` - Info/help text component
13. `src/components/ui/InputBox.js` - New todo input
14. `src/components/ui/InputWrapper.js` - Conditional input wrapper
15. `src/components/ui/SearchBox.js` - Search input
16. `src/components/ui/TodoItem.js` - Individual todo item
17. `src/components/ui/TodoList.js` - Main todo list container
18. `src/services/filter.js` - Filter business logic
19. `src/services/mode.js` - Mode constants and logic
20. `src/services/todo.js` - Todo CRUD operations
21. `src/util/common.js` - Shared utility functions
22. `src/assets/text/en_US.js` - Localization strings

## 0.3 Target Design

### 0.3.1 Refactored Structure Planning

**Target Architecture:**
```
Target:
src/
├── index.tsx (entry point - typed)
├── README.md
├── types/
│   ├── index.ts (shared type definitions)
│   ├── todo.types.ts (Todo-related interfaces)
│   └── mode.types.ts (Mode enum and types)
├── assets/
│   ├── README.md
│   ├── style/
│   │   └── index.css (unchanged - styling preserved)
│   └── text/
│       └── en_US.ts (typed localization constants)
├── hooks/
│   ├── index.ts (barrel export)
│   ├── useInputBox.ts (replaces wrapInputBox HOC)
│   ├── useKeyboard.ts (replaces KeyStrokeHandler class)
│   └── useTodoState.ts (replaces StateProvider class)
├── context/
│   ├── index.ts (barrel export)
│   └── TodoContext.tsx (React Context for state)
├── components/
│   ├── README.md
│   ├── ui/
│   │   ├── README.md
│   │   ├── ButtonWrapper.tsx (typed functional)
│   │   ├── CheckBox.tsx (typed functional)
│   │   ├── Filter.tsx (typed functional)
│   │   ├── FilteredList.tsx (typed functional)
│   │   ├── Footer.tsx (typed functional)
│   │   ├── Header.tsx (typed functional)
│   │   ├── Info.tsx (typed functional)
│   │   ├── InputBox.tsx (uses useInputBox hook)
│   │   ├── InputWrapper.tsx (typed conditional rendering)
│   │   ├── SearchBox.tsx (uses useInputBox hook)
│   │   ├── TodoItem.tsx (typed functional)
│   │   └── TodoList.tsx (typed main container)
│   └── App.tsx (simplified composition root)
├── services/
│   ├── README.md
│   ├── filter.ts (typed filter business logic)
│   ├── mode.ts (typed mode constants/logic)
│   └── todo.ts (typed todo CRUD operations)
└── utils/
    ├── README.md
    └── common.ts (typed utilities - typo fixed)
```

### 0.3.2 Web Search Research Conducted

**React TypeScript Best Practices (2025):**
- Use explicit type interfaces for component props instead of `React.FC`
- Enable strict mode in `tsconfig.json` for maximum type safety
- Use `.tsx` extension for all components with JSX
- Use `.ts` extension for utility files and hooks without JSX
- Leverage TypeScript utility types: `Pick`, `Omit`, `Partial`, `Record`

**SOLID Principles in React:**
- **SRP:** Each component handles a single concern; separate UI from logic using hooks
- **OCP:** Extend behavior through composition and hooks without modifying core components
- **ISP:** Components receive only the props they need; avoid bloated prop interfaces
- **DIP:** Use Context API and dependency injection patterns for loose coupling

**Recompose to Hooks Migration:**
- `withState` → `useState` hook
- `withHandlers` → `useCallback` hook
- `compose()` → Sequential hook calls or custom hooks
- HOC wrapping → Direct hook usage in functional components

### 0.3.3 Design Pattern Applications

**Custom Hook Pattern (replacing recompose):**
```typescript
// Before: wrapInputBox.js with recompose
const enhance = compose(
  withState('value', 'setValue', ...),
  withHandlers({ handleChange, handleKeyUp })
);

// After: useInputBox.ts custom hook
const useInputBox = (initialValue, onSubmit) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = useCallback(...);
  const handleKeyUp = useCallback(...);
  return { value, setValue, handleChange, handleKeyUp };
};
```

**Context Pattern (replacing prop drilling):**
```typescript
// TodoContext.tsx - Centralized state management
interface TodoContextValue {
  todos: Todo[];
  mode: Mode;
  filter: FilterOption;
  actions: TodoActions;
}
```

**Event Handler Pattern (fixing memory leak):**
```typescript
// Before: Memory leak in KeyStrokeHandler
componentWillMount() {
  window.addEventListener('keyup', this.handleKeyUp);
}
componentWillUnmount() {
  window.removeEventListener('keyup', this.handleKeyUp); // Bug: different reference
}

// After: Proper cleanup in useKeyboard hook
useEffect(() => {
  const handler = (e: KeyboardEvent) => {...};
  window.addEventListener('keyup', handler);
  return () => window.removeEventListener('keyup', handler); // Same reference
}, [dependencies]);
```

### 0.3.4 TypeScript Configuration

**Recommended tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "ESNext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

## 0.4 Transformation Mapping

### 0.4.1 File-by-File Transformation Plan

**Transformation Modes:**
- **UPDATE** - Update an existing file (rename to TypeScript, apply refactoring)
- **CREATE** - Create a new file that doesn't exist in source
- **REFERENCE** - Use as example for patterns, styles, or designs

| Target File | Transformation | Source File | Key Changes |
|-------------|----------------|-------------|-------------|
| `src/index.tsx` | UPDATE | `src/index.js` | Convert to TypeScript, add type imports |
| `src/types/index.ts` | CREATE | N/A | Create barrel export for all types |
| `src/types/todo.types.ts` | CREATE | `src/services/todo.js` | Extract Todo interface from service |
| `src/types/mode.types.ts` | CREATE | `src/services/mode.js` | Extract Mode enum from service |
| `src/hooks/index.ts` | CREATE | N/A | Create barrel export for all hooks |
| `src/hooks/useInputBox.ts` | CREATE | `src/components/hoc/wrapInputBox.js` | Convert HOC to custom hook with TypeScript |
| `src/hooks/useKeyboard.ts` | CREATE | `src/components/wrappers/KeyStrokeHandler.js` | Convert class to hook, fix memory leak |
| `src/hooks/useTodoState.ts` | CREATE | `src/components/wrappers/StateProvider.js` | Convert class state to hook |
| `src/context/index.ts` | CREATE | N/A | Create barrel export for context |
| `src/context/TodoContext.tsx` | CREATE | `src/components/wrappers/StateProvider.js` | Create React Context for global state |
| `src/components/App.tsx` | UPDATE | `src/components/wrappers/App.js` | Simplify composition, use Context Provider |
| `src/components/ui/ButtonWrapper.tsx` | UPDATE | `src/components/ui/ButtonWrapper.js` | Add TypeScript types, apply SRP |
| `src/components/ui/CheckBox.tsx` | UPDATE | `src/components/ui/CheckBox.js` | Add TypeScript types, type event handlers |
| `src/components/ui/Filter.tsx` | UPDATE | `src/components/ui/Filter.js` | Add TypeScript types for filter options |
| `src/components/ui/FilteredList.tsx` | UPDATE | `src/components/ui/FilteredList.js` | Add TypeScript types, use typed Todo array |
| `src/components/ui/Footer.tsx` | UPDATE | `src/components/ui/Footer.js` | Add TypeScript types for filter callbacks |
| `src/components/ui/Header.tsx` | UPDATE | `src/components/ui/Header.js` | Add TypeScript types, use context |
| `src/components/ui/Info.tsx` | UPDATE | `src/components/ui/Info.js` | Add TypeScript types for info display |
| `src/components/ui/InputBox.tsx` | UPDATE | `src/components/ui/InputBox.js` | Remove HOC wrapper, use useInputBox hook directly |
| `src/components/ui/InputWrapper.tsx` | UPDATE | `src/components/ui/InputWrapper.js` | Add TypeScript types for mode switching |
| `src/components/ui/SearchBox.tsx` | UPDATE | `src/components/ui/SearchBox.js` | Remove HOC wrapper, use useInputBox hook directly |
| `src/components/ui/TodoItem.tsx` | UPDATE | `src/components/ui/TodoItem.js` | Add TypeScript types for Todo item props |
| `src/components/ui/TodoList.tsx` | UPDATE | `src/components/ui/TodoList.js` | Add TypeScript types, use context instead of prop drilling |
| `src/services/filter.ts` | UPDATE | `src/services/filter.js` | Add TypeScript types, type all functions |
| `src/services/mode.ts` | UPDATE | `src/services/mode.js` | Convert to TypeScript enum, type exports |
| `src/services/todo.ts` | UPDATE | `src/services/todo.js` | Add TypeScript types for Todo operations |
| `src/utils/common.ts` | UPDATE | `src/util/common.js` | Fix typo (`stringInclues` → `stringIncludes`), add types |
| `src/assets/text/en_US.ts` | UPDATE | `src/assets/text/en_US.js` | Add TypeScript const assertions |
| `tsconfig.json` | CREATE | N/A | TypeScript compiler configuration |
| `package.json` | UPDATE | `package.json` | Update dependencies, add TypeScript |

### 0.4.2 Files to Delete/Remove

| File to Delete | Reason |
|---------------|--------|
| `src/components/hoc/wrapInputBox.js` | Replaced by `src/hooks/useInputBox.ts` |
| `src/components/hoc/README.md` | HOC folder no longer needed |
| `src/components/wrappers/KeyStrokeHandler.js` | Replaced by `src/hooks/useKeyboard.ts` |
| `src/components/wrappers/StateProvider.js` | Replaced by `src/context/TodoContext.tsx` and `src/hooks/useTodoState.ts` |
| `src/components/wrappers/README.md` | Wrappers folder structure changed |

### 0.4.3 Cross-File Dependencies

**Import Statement Updates:**

```typescript
// FROM (old pattern):
import { compose, withState, withHandlers } from 'recompose';
import KeyStrokeHandler from './KeyStrokeHandler';
import StateProvider from './StateProvider';
import { wrapInputBox } from '../hoc/wrapInputBox';

// TO (new pattern):
import { useInputBox } from '../hooks/useInputBox';
import { useKeyboard } from '../hooks/useKeyboard';
import { TodoProvider, useTodoContext } from '../context/TodoContext';
```

**Configuration Updates:**
- `package.json`: Remove `recompose` dependency, add TypeScript and type definitions
- New `tsconfig.json`: Configure TypeScript compiler options

### 0.4.4 One-Phase Execution

The entire refactor will be executed by Blitzy in **ONE phase**. All files are included in a single transformation batch:

**Files Count Summary:**
- Files to UPDATE: 22
- Files to CREATE: 10
- Files to DELETE: 5
- Total transformations: 37

## 0.5 Dependency Inventory

### 0.5.1 Current Dependencies

| Registry | Package Name | Current Version | Purpose |
|----------|-------------|-----------------|---------|
| npm | react | ^15.4.2 | UI library (legacy) |
| npm | react-dom | ^15.4.2 | React DOM rendering (legacy) |
| npm | bootstrap | ^3.4.1 | CSS framework |
| npm | recompose | ^0.23.5 | HOC utilities (deprecated) |
| npm | immutability-helper | ^2.1.1 | Immutable state updates |
| npm | keycode-js | ^0.0.4 | Keyboard key constants |
| npm | react-scripts | 0.9.0 | Build tooling (dev dependency) |

### 0.5.2 Target Dependencies

| Registry | Package Name | Target Version | Purpose | Change Type |
|----------|-------------|----------------|---------|-------------|
| npm | react | ^18.2.0 | UI library (modern) | UPGRADE |
| npm | react-dom | ^18.2.0 | React DOM rendering | UPGRADE |
| npm | bootstrap | ^3.4.1 | CSS framework | KEEP |
| npm | immutability-helper | ^3.1.1 | Immutable state updates | UPGRADE |
| npm | keycode-js | ^3.1.0 | Keyboard key constants | UPGRADE |
| npm | typescript | ^5.3.0 | TypeScript compiler | ADD |
| npm | @types/react | ^18.2.0 | React type definitions | ADD |
| npm | @types/react-dom | ^18.2.0 | ReactDOM type definitions | ADD |
| npm | react-scripts | ^5.0.1 | Build tooling (dev) | UPGRADE |

**Dependencies to Remove:**
| Package | Reason |
|---------|--------|
| recompose | Deprecated library, replaced by React Hooks |

### 0.5.3 Import Refactoring

**Files Requiring Import Updates:**

| File Pattern | Old Import | New Import |
|--------------|-----------|------------|
| `src/components/hoc/wrapInputBox.js` | `import { compose, withState, withHandlers } from 'recompose'` | Remove file entirely |
| `src/components/ui/InputBox.js` | `import enhance from '../hoc/wrapInputBox'` | `import { useInputBox } from '../../hooks/useInputBox'` |
| `src/components/ui/SearchBox.js` | `import enhance from '../hoc/wrapInputBox'` | `import { useInputBox } from '../../hooks/useInputBox'` |
| `src/components/wrappers/App.js` | `import StateProvider from './StateProvider'` | `import { TodoProvider } from '../context/TodoContext'` |
| `src/components/wrappers/App.js` | `import KeyStrokeHandler from './KeyStrokeHandler'` | Remove (use hook in TodoList) |
| `src/components/ui/*.js` | No type imports | Add `import type { ... } from '../../types'` |
| `src/services/*.js` | No type imports | Add interface exports and imports |

### 0.5.4 External Reference Updates

**Configuration Files to Update:**

| File | Updates Required |
|------|-----------------|
| `package.json` | Update dependencies, add scripts, add TypeScript |
| `tsconfig.json` | Create new TypeScript configuration |
| `public/index.html` | No changes required |
| `.editorconfig` | No changes required |

### 0.5.5 Updated package.json Structure

```json
{
  "name": "react-todo-app",
  "version": "0.2.0",
  "private": true,
  "dependencies": {
    "bootstrap": "^3.4.1",
    "immutability-helper": "^3.1.1",
    "keycode-js": "^3.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "react-scripts": "^5.0.1",
    "typescript": "^5.3.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "type-check": "tsc --noEmit"
  }
}
```

## 0.6 Scope Boundaries

### 0.6.1 Exhaustively In Scope

**Source Transformations:**
- `src/**/*.js` - All JavaScript source files (21 files)
- `src/index.js` - Application entry point
- `src/components/**/*.js` - All React components (15 files)
- `src/services/**/*.js` - All service modules (3 files)
- `src/util/**/*.js` - All utility modules (1 file)
- `src/assets/text/**/*.js` - Localization files (1 file)

**New File Creation:**
- `src/types/**/*.ts` - Type definition files (3 files)
- `src/hooks/**/*.ts` - Custom hook files (4 files)
- `src/context/**/*.tsx` - React Context files (2 files)
- `tsconfig.json` - TypeScript configuration (1 file)

**Configuration Updates:**
- `package.json` - Dependency updates and script additions

**Documentation Updates:**
- `src/README.md` - Update to reflect new structure
- `src/components/README.md` - Update component documentation
- `src/services/README.md` - Update service documentation
- `src/components/ui/README.md` - Update UI component documentation

**Bug Fixes:**
- `src/util/common.js` → `src/utils/common.ts` - Fix `stringInclues` typo
- `src/components/wrappers/KeyStrokeHandler.js` → `src/hooks/useKeyboard.ts` - Fix memory leak

**Import Corrections:**
- Every file containing `recompose` imports
- Every file importing from `./hoc/wrapInputBox`
- Every file importing from `./wrappers/StateProvider`
- Every file importing from `./wrappers/KeyStrokeHandler`

### 0.6.2 Explicitly Out of Scope

| Item | Reason |
|------|--------|
| `src/assets/style/index.css` | CSS styling preserved as-is |
| `src/assets/images/**/*` | Static assets not affected |
| `public/**/*` | Public assets unchanged |
| `node_modules/**/*` | External dependencies managed by npm |
| `build/**/*` | Generated output, not source |
| `.editorconfig` | Editor configuration unchanged |
| `README.md` (root) | Project-level documentation unchanged |
| Backend/API changes | No backend exists in this project |
| New features | Focus is on refactoring, not feature additions |
| UI/UX redesign | Visual design preserved |
| Bootstrap upgrade | Staying on Bootstrap 3.4.1 for compatibility |
| Test file creation | Tests can be added separately after refactor |

### 0.6.3 Scope Validation Checklist

| Requirement | In Scope | Verification |
|-------------|----------|--------------|
| DRY principle applied | ✅ | Eliminate duplicate code in InputBox/SearchBox via shared hook |
| SOLID principles applied | ✅ | SRP in component separation, DIP via Context |
| TypeScript migration | ✅ | All 22 JS files converted to TS/TSX |
| React best practices | ✅ | Functional components, hooks, proper effect cleanup |
| Bug fixes | ✅ | Memory leak and typo corrected |
| recompose removal | ✅ | Replaced with native hooks |
| Functionality preserved | ✅ | Same behavior maintained |
| Styling preserved | ✅ | CSS files unchanged |

### 0.6.4 Wildcard Patterns Summary

**Files to Transform (Trailing Patterns):**
```
src/**/*.js                    → src/**/*.tsx or src/**/*.ts
src/components/**/*.js         → src/components/**/*.tsx
src/services/**/*.js           → src/services/**/*.ts
src/util/**/*.js               → src/utils/**/*.ts
src/assets/text/**/*.js        → src/assets/text/**/*.ts
```

**Files to Create:**
```
src/types/*.ts                 (new type definitions)
src/hooks/*.ts                 (new custom hooks)
src/context/*.tsx              (new React Context)
tsconfig.json                  (TypeScript config)
```

**Files to Delete:**
```
src/components/hoc/**/*        (HOC pattern replaced by hooks)
src/components/wrappers/KeyStrokeHandler.js   (replaced by hook)
src/components/wrappers/StateProvider.js      (replaced by context)
```

## 0.7 Refactoring Rules

### 0.7.1 DRY Principle Application

**Identified Duplication to Eliminate:**

| Duplication Pattern | Current Location | Refactored Solution |
|--------------------|------------------|---------------------|
| Input handling logic | `InputBox.js`, `SearchBox.js` (both use same HOC) | Single `useInputBox` hook shared by both |
| State management boilerplate | `StateProvider.js` class methods | `useTodoState` hook with cleaner API |
| Child wrapping pattern | `common.js` `wrapChildrenWith` utility | React Context `Provider` pattern |
| Event listener setup/cleanup | `KeyStrokeHandler.js` lifecycle | `useKeyboard` hook with proper cleanup |

**DRY Implementation Strategy:**
```typescript
// Instead of duplicating enhance() pattern in multiple components:
// InputBox.js: export default enhance(InputBox)
// SearchBox.js: export default enhance(SearchBox)

// Use shared hook in each component:
const InputBox = ({ addNew }) => {
  const { value, handleChange, handleKeyUp } = useInputBox('', addNew);
  return <input value={value} onChange={handleChange} onKeyUp={handleKeyUp} />;
};
```

### 0.7.2 SOLID Principles Application

**Single Responsibility Principle (SRP):**
- Each component handles ONE concern
- `TodoItem` renders a single todo (not list management)
- `FilteredList` applies filters (not filtering logic)
- `useInputBox` manages input state (not todo creation)

**Open/Closed Principle (OCP):**
- Components extensible via props without modification
- `Filter` component accepts any filter options via props
- `ButtonWrapper` accepts any click handler

**Liskov Substitution Principle (LSP):**
- Type interfaces ensure component substitutability
- All input components implement same `InputProps` interface
- Filter components can be swapped if implementing `FilterProps`

**Interface Segregation Principle (ISP):**
- Components receive only props they use
- `TodoItem` receives single todo, not entire list
- `CheckBox` receives checked state, not filter logic

**Dependency Inversion Principle (DIP):**
- Use Context API instead of direct prop drilling
- Components depend on `useTodoContext` abstraction
- Services are pure functions without component dependencies

### 0.7.3 React Best Practices

**Functional Component Pattern:**
```typescript
// Props interface first
interface TodoItemProps {
  todo: Todo;
  onStatusChange: (id: string, completed: boolean) => void;
}

// Functional component with explicit typing
const TodoItem = ({ todo, onStatusChange }: TodoItemProps) => {
  // Component logic
};
```

**Hook Rules:**
- Call hooks at top level only
- Call hooks from React functions only
- Use custom hooks for reusable stateful logic
- Use `useCallback` for event handlers passed to children
- Use `useMemo` for expensive computations

**Effect Cleanup Pattern:**
```typescript
useEffect(() => {
  const handler = (e: KeyboardEvent) => { /* ... */ };
  window.addEventListener('keyup', handler);
  
  // Cleanup function prevents memory leaks
  return () => window.removeEventListener('keyup', handler);
}, [dependencies]);
```

### 0.7.4 TypeScript Best Practices

**Type Definition Rules:**
- Define explicit interfaces for all component props
- Use `type` for unions and intersections
- Use `interface` for object shapes that may be extended
- Avoid `any` type - use `unknown` if type is uncertain
- Enable `strict` mode in tsconfig.json

**Naming Conventions:**
- Props interfaces: `ComponentNameProps` (e.g., `TodoItemProps`)
- Context types: `ContextNameValue` (e.g., `TodoContextValue`)
- Hook return types: Inferred or explicit tuple/object types

**File Extension Rules:**
- `.tsx` for files containing JSX
- `.ts` for files without JSX (services, utils, types, hooks without JSX)

### 0.7.5 Code Quality Rules

| Rule | Implementation |
|------|----------------|
| No `any` types | Use proper typing or `unknown` |
| No unused variables | Remove or prefix with `_` |
| No console.log in production | Remove debug statements |
| Consistent naming | camelCase for functions/variables, PascalCase for components/types |
| Explicit return types | Optional but recommended for public APIs |
| Readonly where applicable | Use `readonly` for immutable properties |
| Const assertions | Use `as const` for literal types |

### 0.7.6 Preserved Functionality Requirements

**Must Maintain:**
- All keyboard shortcuts (Enter to add, search mode toggle)
- Filter functionality (All, Active, Completed)
- Todo status toggle via checkbox
- Search filtering behavior
- Mode switching (None, Search, Create)
- Localization text from `en_US.js`

**Behavioral Contracts:**
- Adding empty todos should be prevented
- Search should filter case-insensitively
- Completed todos should display with strikethrough
- Filter counts should update in real-time

## 0.8 References

### 0.8.1 Files and Folders Analyzed

**Root Level Files:**
| File | Purpose |
|------|---------|
| `package.json` | Dependency manifest - identified React 15.4.2, recompose 0.23.5 |
| `README.md` | Project documentation |
| `.editorconfig` | Editor configuration |

**Source Directory Structure:**
| Path | Files Analyzed | Key Findings |
|------|----------------|--------------|
| `src/` | `index.js`, `README.md` | Entry point rendering App component |
| `src/components/wrappers/` | `App.js`, `KeyStrokeHandler.js`, `StateProvider.js` | Class components with lifecycle methods, memory leak bug |
| `src/components/hoc/` | `wrapInputBox.js`, `README.md` | Recompose HOC pattern requiring migration |
| `src/components/ui/` | 12 component files | Stateless functional components, some enhanced with HOC |
| `src/services/` | `filter.js`, `mode.js`, `todo.js` | Business logic modules |
| `src/util/` | `common.js` | Utility functions with typo bug |
| `src/assets/text/` | `en_US.js` | Localization constants |
| `src/assets/style/` | `index.css` | Bootstrap overrides (out of scope) |

### 0.8.2 Technical Specifications Consulted

| Section | Information Extracted |
|---------|----------------------|
| 5.2 Component Details | Component architecture and relationships |
| 6.6 Testing Strategy | Test patterns for services |
| 3.3 Frameworks & Libraries | Current dependency versions |

### 0.8.3 Web Search Research Conducted

**React TypeScript Best Practices:**
- Source: Medium, Dev.to, LogRocket (November 2025 - January 2026)
- Key insights: Use explicit prop interfaces, enable strict mode, prefer `.tsx` for components
- TypeScript has become "the gold standard for React development" with over 70% adoption

**SOLID Principles in React:**
- Source: GitHub repositories, Medium articles (2024-2025)
- Key insights: SRP applies to components handling single concerns, ISP means components shouldn't depend on props they don't use
- "Applying SOLID principles in React applications improves code quality, scalability, and maintainability"

**Recompose to Hooks Migration:**
- Source: Medium, GitHub guides (2019-2025)
- Key insight: Recompose author Andrew Clark stated "Hooks solves all the problems I attempted to address with Recompose"
- Migration pattern: `withState` → `useState`, `withHandlers` → `useCallback`, `compose` → custom hooks

### 0.8.4 User-Provided Attachments

No attachments were provided for this project.

### 0.8.5 User-Provided URLs

No Figma URLs or external design references were provided.

### 0.8.6 Setup Instructions Reference

User-provided setup commands executed during environment preparation:
```bash
# Install dependencies with legacy peer resolution
npm i --legacy-peer-deps

#### Start development server
npm run start

#### Build for production
npm run build
```

### 0.8.7 Search and Discovery Log

| Search # | Tool | Target | Purpose | Result |
|----------|------|--------|---------|--------|
| 1 | bash | `find / -name ".blitzyignore"` | Check for ignored patterns | None found |
| 2 | get_source_folder_contents | `""` (root) | Discover project structure | 6 items found |
| 3 | get_source_folder_contents | `src` | Explore source directory | 6 items found |
| 4 | get_source_folder_contents | `src/components` | Explore components | 4 subdirectories |
| 5 | get_source_folder_contents | `src/components/ui` | Explore UI components | 12 components |
| 6 | get_source_folder_contents | `src/components/wrappers` | Explore wrappers | 4 items |
| 7 | get_source_folder_contents | `src/services` | Explore services | 4 items |
| 8 | get_source_folder_contents | `src/util` | Explore utilities | 2 items |
| 9 | get_source_folder_contents | `src/assets` | Explore assets | 4 items |
| 10 | read_file | `package.json` | Get dependencies | Versions confirmed |
| 11-27 | read_file | Various `.js` files | Analyze source code | Bugs and patterns identified |
| 28 | bash | `npm i --legacy-peer-deps` | Install dependencies | Success |
| 29 | bash | `npm run build` | Verify build | Build successful |
| 30 | web_search | React TypeScript best practices | Research modern patterns | Multiple sources |
| 31 | web_search | React SOLID DRY principles | Research design principles | Multiple sources |
| 32 | web_search | Recompose to hooks migration | Research migration strategy | Multiple sources |

**Total Searches Performed:** 32
**Files Retrieved:** 22
**Folders Explored:** 9

