/**
 * @module index
 * @description
 * Application entry point for the React Todo App.
 *
 * This module bootstraps the single-page application by:
 * 1. Importing React and ReactDOM (v15.4.2) for component rendering
 * 2. Importing the root App component from the wrappers layer
 * 3. Loading Bootstrap 3.4.1 CSS for responsive grid and base typography
 * 4. Loading the custom global stylesheet for Todo App theming
 * 5. Mounting the App component tree onto the DOM element with id "root"
 *
 * The App component initializes the provider hierarchy:
 * StateProvider → KeyStrokeHandler → TodoList
 *
 * @see {@link ./components/wrappers/App} Root application component
 * @see {@link ../public/index.html} HTML shell with mount point
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/wrappers/App';

// Add bootstrap
import 'bootstrap/dist/css/bootstrap.css';

// Add our style
import './assets/style/index.css';

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
