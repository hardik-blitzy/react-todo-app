/**
 * @module components/wrappers/KeyStrokeHandler
 * @description Global keyboard event interceptor for the React Todo App. This class-based
 * component registers a `window.keydown` listener on mount and removes it on unmount,
 * intercepting keyboard events to trigger mode transitions (e.g., pressing `N` to enter
 * create mode, `/` to enter search mode, `Escape` to return to idle mode). The component
 * itself does not render any visible DOM elements — it delegates all rendering to its
 * children via `wrapChildrenWith()`, forwarding the `data` and `actions` props received
 * from its parent `StateProvider`. KeyStrokeHandler sits in the middle of the provider
 * hierarchy: `StateProvider > KeyStrokeHandler > TodoList`.
 * @requires react — Uses `React.Component` for class-based component definition with
 * lifecycle methods (React 15.x pattern).
 * @requires ../../services/mode — Imports `getNextModeByKey(currentMode, keyCode)` for
 * FSM-based mode transition logic. The FSM maps: `/` (KEY_SLASH) → MODE_SEARCH, `N`
 * (KEY_N) → MODE_CREATE from MODE_NONE; `Escape` (KEY_ESCAPE) → MODE_NONE from any mode.
 * @requires ../../util/common — Imports `wrapChildrenWith(children, props)` for prop
 * injection into child elements via `React.Children.map` + `React.cloneElement`.
 */
import React, {Component} from 'react';
import {getNextModeByKey} from '../../services/mode';
import {wrapChildrenWith} from '../../util/common';

/**
 * @class KeyStrokeHandler
 * @extends {React.Component}
 * @description Global keyboard event listener component that enables keyboard shortcuts
 * for switching between UI modes (create, search, idle). Positioned between `StateProvider`
 * and `TodoList` in the provider hierarchy to intercept keyboard events before UI rendering.
 * @prop {Object} data — Application state injected by StateProvider via `wrapChildrenWith()`.
 * Expected to contain `data.mode` (string) — the current UI mode (`MODE_NONE`,
 * `MODE_CREATE`, or `MODE_SEARCH`).
 * @prop {Object} actions — Bound action methods injected by StateProvider. Expected to
 * contain `actions.changeMode(mode)` — function to trigger mode transitions in StateProvider.
 * @prop {React.ReactNode} children — Child elements (typically `TodoList`) to render with
 * forwarded props.
 */
class KeyStrokeHandler extends Component {
    /**
     * @method componentWillMount
     * @description React 15.x lifecycle method called immediately before mounting. Binds
     * the `handleKeyUp` method to `this` (the KeyStrokeHandler instance) and registers it
     * as a `window.keydown` event listener. This ensures keyboard events are captured
     * globally regardless of which DOM element has focus.
     * @note This lifecycle is `componentWillMount` (React 15.x). In React 16.3+ this was
     * deprecated in favor of `componentDidMount`, and in React 17+ the unsafe prefix
     * `UNSAFE_componentWillMount` is required. For this React 15.x application,
     * `componentWillMount` is the correct API.
     * @note The binding `this.handleKeyUp.bind(this)` creates a new function reference each
     * time, which means the bound reference in `componentWillMount` differs from
     * `this.handleKeyUp` in `componentWillUnmount`. This is an existing pattern in the
     * codebase.
     */
    componentWillMount() {
        window.addEventListener('keydown', this.handleKeyUp.bind(this));
    }

    /**
     * @method componentWillUnmount
     * @description React lifecycle method called immediately before the component is removed
     * from the DOM. Removes the `window.keydown` event listener to prevent memory leaks and
     * stale event handling when the component is unmounted.
     * @note The `removeEventListener` call uses `this.handleKeyUp` (unbound reference),
     * which differs from the bound reference registered in `componentWillMount`. This is an
     * existing implementation detail in the source.
     */
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyUp);
    }

    /**
     * @method handleKeyUp
     * @param {KeyboardEvent} e — The native keyboard event object from the `window.keydown`
     * listener. The method uses `e.keyCode` for key identification and `e.preventDefault()`
     * for suppressing default browser behavior.
     * @description Keyboard event handler that delegates mode transition logic to the
     * `getNextModeByKey` FSM service. Workflow:
     * 1. Destructures `const {mode} = this.props.data` to get the current UI mode.
     * 2. Calls `getNextModeByKey(mode, e.keyCode)` from `mode.js` to determine the next
     *    mode based on the FSM transition table.
     * 3. If `nextMode !== mode` (a mode transition is detected):
     *    - Calls `e.preventDefault()` to suppress the default browser behavior (e.g.,
     *      preventing `/` from triggering browser find, `N` from typing into an input).
     *    - Calls `this.props.actions.changeMode(nextMode)` to trigger the state update in
     *      StateProvider, which will cause a re-render with the new mode.
     * 4. If `nextMode === mode` (no transition): does nothing, allowing the event to
     *    propagate normally.
     *
     * FSM Transition Table (from mode.js):
     * - From `MODE_NONE`: `KEY_SLASH` (`/`) → `MODE_SEARCH`, `KEY_N` (`N`) → `MODE_CREATE`
     * - From `MODE_SEARCH` or `MODE_CREATE`: `KEY_ESCAPE` → `MODE_NONE`
     * - All other keys: no mode change (returns current mode)
     */
    handleKeyUp(e) {
        const {mode} = this.props.data;
        const nextMode = getNextModeByKey(mode, e.keyCode);

        if (nextMode !== mode) {
            e.preventDefault();
            this.props.actions.changeMode(nextMode);
        }
    }

    /**
     * @method render
     * @returns {React.ReactElement} A `<div>` wrapper element containing the cloned children
     * with forwarded props.
     * @description Renders children within a `<div>` wrapper, forwarding all received props
     * (`data` and `actions`) to child components via
     * `wrapChildrenWith(this.props.children, this.props)`. The `<div>` wrapper is necessary
     * because React 15.x does not support Fragments (`<>...</>` or `React.Fragment`). The
     * `wrapChildrenWith` call uses `React.Children.map` + `React.cloneElement` to clone each
     * child element and merge the full `this.props` object (containing `data`, `actions`, and
     * `children`) into each clone.
     * @note This method does NOT render any visible UI elements itself — it acts as a
     * transparent prop-forwarding wrapper.
     */
    render() {
        return <div>{wrapChildrenWith(this.props.children, this.props)}</div>;
    }
}

export default KeyStrokeHandler;
