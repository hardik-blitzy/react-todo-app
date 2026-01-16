/**
 * @fileoverview Root application component for the React Todo application.
 *
 * This module serves as the composition root for the application, providing
 * the context provider that wraps all child components with access to shared
 * state and actions.
 *
 * REFACTORED from src/components/wrappers/App.js:
 * - CONVERTED: Class component to TypeScript functional component
 * - SIMPLIFIED: Replaced nested StateProvider + KeyStrokeHandler with single TodoProvider
 * - MOVED: File location from components/wrappers/App.js to components/App.tsx
 *
 * Architecture Changes:
 * - StateProvider behavior is now handled by TodoProvider context
 * - KeyStrokeHandler behavior is now handled by useKeyboard hook inside TodoList
 * - This simplifies the composition tree while maintaining all functionality
 *
 * Design Principles Applied:
 * - Single Responsibility Principle (SRP): App only handles composition
 * - Dependency Inversion Principle (DIP): Uses Context abstraction instead of
 *   direct state management
 * - Modern React Best Practices: Functional components with hooks
 *
 * @example
 * ```tsx
 * // Entry point usage
 * import App from './components/App';
 *
 * ReactDOM.render(<App />, document.getElementById('root'));
 * ```
 *
 * @module components/App
 */

import React from 'react';
import { TodoProvider } from '../context/TodoContext';
import TodoList from './ui/TodoList';

// =============================================================================
// Component Implementation
// =============================================================================

/**
 * App is the root component of the React Todo application.
 *
 * This functional component serves as the composition root, wrapping the entire
 * application with the TodoProvider context. All child components within the
 * TodoList tree can access the shared state (todos, mode, filter, query) and
 * actions (addNew, changeFilter, changeStatus, changeMode, setSearchQuery)
 * through the useTodoContext hook.
 *
 * Component Hierarchy:
 * ```
 * App
 * └── TodoProvider (provides global state via context)
 *     └── TodoList (main UI container, consumes context)
 *         ├── Header
 *         │   ├── InputBox or SearchBox (based on mode)
 *         │   └── Title
 *         ├── FilteredList
 *         │   └── TodoItem (multiple)
 *         ├── Footer
 *         │   ├── ButtonWrapper (mode toggles)
 *         │   ├── ItemCount
 *         │   └── Filter options
 *         └── Info (keyboard shortcuts)
 * ```
 *
 * Previous Implementation (source App.js):
 * ```jsx
 * <StateProvider>
 *     <KeyStrokeHandler>
 *         <TodoList/>
 *     </KeyStrokeHandler>
 * </StateProvider>
 * ```
 *
 * Current Implementation:
 * - StateProvider → TodoProvider (context-based state management)
 * - KeyStrokeHandler → useKeyboard hook (called inside TodoList)
 *
 * @returns {JSX.Element} The root application element with context provider
 *
 * @example
 * ```tsx
 * // Standard usage in index.tsx
 * import React from 'react';
 * import ReactDOM from 'react-dom/client';
 * import App from './components/App';
 *
 * const root = ReactDOM.createRoot(document.getElementById('root')!);
 * root.render(<App />);
 * ```
 */
function App(): JSX.Element {
  return (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
}

// =============================================================================
// Export
// =============================================================================

export default App;
