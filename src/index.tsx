/**
 * @fileoverview Main entry point for the React Todo application.
 *
 * This module bootstraps the React 18 application using the new createRoot API,
 * sets up global CSS styles (Bootstrap and application styles), and mounts the
 * App component to the DOM.
 *
 * REFACTORED from src/index.js:
 * - UPGRADED: React rendering from ReactDOM.render() to React 18 createRoot API
 * - CONVERTED: JavaScript to TypeScript (.js → .tsx)
 * - UPDATED: App import path from './components/wrappers/App' to './components/App'
 * - ADDED: React.StrictMode wrapper for development best practices
 * - ADDED: Null check for root element with descriptive error message
 *
 * Migration Notes:
 * - The createRoot API is the recommended way to render React 18+ applications
 * - StrictMode helps identify potential problems in the application during development
 * - The root element check provides a clear error message if the DOM setup is incorrect
 *
 * @module index
 */

import React from 'react';
import { createRoot } from 'react-dom/client';

// Import root application component
import App from './components/App';

// Global CSS imports
// Bootstrap CSS framework for responsive grid system, typography, forms, and UI components
import 'bootstrap/dist/css/bootstrap.css';

// Application-specific style overrides and customizations
import './assets/style/index.css';

// =============================================================================
// Application Bootstrap
// =============================================================================

/**
 * Get the root DOM element where the React application will be mounted.
 * This element is defined in public/index.html as <div id="root"></div>
 */
const container = document.getElementById('root');

/**
 * Validate that the root element exists in the DOM.
 * This check provides a clear error message during development if the
 * HTML setup is incorrect, rather than failing silently or with a cryptic error.
 */
if (!container) {
  throw new Error(
    'Failed to find the root element. ' +
    'Please ensure there is a DOM element with id="root" in your HTML file.'
  );
}

/**
 * Create a React 18 root using the concurrent rendering API.
 * The createRoot API enables:
 * - Concurrent features like automatic batching
 * - Improved hydration for server-rendered apps
 * - Better support for Suspense boundaries
 * - More predictable rendering behavior
 */
const root = createRoot(container);

/**
 * Render the application tree.
 *
 * React.StrictMode is a development tool that:
 * - Identifies components with unsafe lifecycles
 * - Warns about deprecated findDOMNode usage
 * - Detects unexpected side effects by double-invoking certain functions
 * - Ensures reusable state by unmounting and remounting components
 *
 * Note: StrictMode only runs additional checks in development mode and has
 * no impact on production builds.
 */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
