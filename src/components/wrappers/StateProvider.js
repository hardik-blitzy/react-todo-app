/**
 * @module components/wrappers/StateProvider
 * @description Centralized state container and single source of truth for the entire React Todo
 * App. This React 15.x class-based component manages all application state through four state
 * fields (`query`, `mode`, `filter`, `list`) and exposes five action methods (`addNew`,
 * `changeFilter`, `changeStatus`, `changeMode`, `setSearchQuery`) for child components to trigger
 * state mutations. State distribution bypasses React's Context API (unavailable in React 15.x) and
 * relies on a custom prop injection mechanism: `objectWithOnly()` extracts bound action method
 * references and `wrapChildrenWith()` clones child elements with the merged
 * `{data: this.state, actions}` props via `React.Children.map` + `React.cloneElement`. This
 * pattern ensures unidirectional data flow where state originates exclusively in StateProvider and
 * flows downward, while mutations travel upward through action method callbacks.
 *
 * @requires react - Uses `React.Component` for class-based component definition (React 15.x
 *   pattern; no Hooks, no Context API).
 * @requires ../../services/filter - Imports `FILTER_ALL` constant (value: `'all'`) used as the
 *   default filter selection in initial state.
 * @requires ../../services/mode - Imports `MODE_CREATE` (default initial mode) and `MODE_NONE`
 *   (idle mode, used as default parameter in `changeMode`).
 * @requires ../../util/common - Imports `objectWithOnly(object, attrs)` for extracting bound
 *   action methods and `wrapChildrenWith(children, props)` for React child element cloning with
 *   prop injection.
 * @requires ../../services/todo - Imports `getAll()` for seeding initial todo list (3 items),
 *   `addToList(list, data)` for immutable item creation, and `updateStatus(items, itemId,
 *   completed)` for immutable status toggling via `immutability-helper`.
 */
import React, {Component} from 'react';
import {FILTER_ALL} from '../../services/filter';
import {MODE_CREATE, MODE_NONE} from '../../services/mode';
import {objectWithOnly, wrapChildrenWith} from '../../util/common';
import {getAll, addToList, updateStatus} from '../../services/todo';

/**
 * @class StateProvider
 * @extends {React.Component}
 * @description Centralized state container and single source of truth for the React Todo App.
 * This class-based component (React 15.x pattern — no Hooks, no stable Context API) holds all
 * application state in its React component state and provides five action methods that child
 * components invoke to trigger state mutations. Child components receive state and actions via the
 * custom prop injection mechanism using `objectWithOnly()` + `wrapChildrenWith()` — a pattern
 * that replaces the Context API (unavailable in React 15.x) with explicit `React.Children.map` +
 * `React.cloneElement` prop cloning.
 * @prop {React.ReactNode} children - Child elements (typically `KeyStrokeHandler > TodoList`) to
 *   render with injected state and action props.
 */
class StateProvider extends Component {
    /**
     * @constructor
     * @description Initializes the application's centralized state with four fields. Calls
     * `super()` to invoke `React.Component`'s constructor, then sets `this.state` with the
     * initial values.
     * @property {string} state.query - Current search query for text filtering via `search()` in
     *   `filter.js`. Default: `''` (empty string, showing all items).
     * @property {string} state.mode - Current input mode controlling which input component is
     *   displayed. Default: `MODE_CREATE` (imported from `mode.js`, value: `'create'`). Possible
     *   values: `MODE_NONE` (idle, no input shown), `MODE_CREATE` (add new todo input),
     *   `MODE_SEARCH` (search/filter input).
     * @property {string} state.filter - Current filter selection controlling which todo items are
     *   displayed. Default: `FILTER_ALL` (imported from `filter.js`, value: `'all'`). Possible
     *   values: `FILTER_ALL` (show all), `FILTER_ACTIVE` (show pending), `FILTER_COMPLETED`
     *   (show completed).
     * @property {Array<{id: number, text: string, completed: boolean}>} state.list - Array of
     *   todo items. Default: `getAll()` from `todo.js` which returns 3 seeded items:
     *   `[{id:1, text:'Learn Javascript', completed:false}, {id:2, text:'Learn React',
     *   completed:false}, {id:3, text:'Build a React App', completed:false}]`.
     */
    constructor() {
        super();
        this.state = {
            query: '',
            mode: MODE_CREATE,
            filter: FILTER_ALL,
            list: getAll()
        }
    }

    /**
     * @method render
     * @returns {React.ReactElement} A `<div>` wrapper element containing children cloned with
     *   injected `data` and `actions` props.
     * @description Constructs the prop injection payload and distributes it to child components.
     * Workflow:
     * 1. Calls `objectWithOnly(this, ['addNew', 'changeFilter', 'changeStatus', 'changeMode',
     *    'setSearchQuery'])` to extract the five action methods from the StateProvider instance
     *    as bound method references. The `objectWithOnly` utility creates a new plain object,
     *    iterates the method name array, and for each name calls `this[methodName].bind(this)`
     *    to ensure the correct `this` context is preserved when child components invoke these
     *    methods.
     * 2. Calls `wrapChildrenWith(this.props.children, { data: this.state, actions })` to clone
     *    each child element with the merged props. The `wrapChildrenWith` utility uses
     *    `React.Children.map` to safely iterate over children and `React.cloneElement` to create
     *    copies with the merged `{data, actions}` props. This means each immediate child
     *    (KeyStrokeHandler) receives:
     *    - `data`: `{query, mode, filter, list}` — the full current state
     *    - `actions`: `{addNew, changeFilter, changeStatus, changeMode, setSearchQuery}` — the
     *      5 bound action methods
     * 3. Returns `<div>{children}</div>`. The `<div>` wrapper is required because React 15.x
     *    does not support Fragments.
     */
    render() {
        let children = wrapChildrenWith(this.props.children, {
            data: this.state,
            actions: objectWithOnly(this, ['addNew', 'changeFilter', 'changeStatus', 'changeMode', 'setSearchQuery'])
        });

        return <div>{children}</div>;
    }

    /**
     * @method addNew
     * @param {string} text - The text content for the new todo item.
     * @description Creates a new todo item and appends it to the list state. Calls
     * `addToList(this.state.list, {text, completed: false})` from `todo.js`, which:
     * 1. Generates a unique ID via `getNextId()` (internal to todo.js, deterministic:
     *    `getAll().length + todoCounter++`, starting at 4)
     * 2. Creates an item object via `Object.assign({id: getNextId()}, {text, completed: false})`
     * 3. Returns `list.concat([item])` — an immutable list operation that preserves the original
     *    array
     * Then calls `this.setState({list: updatedList})` to trigger a re-render with the new list.
     */
    addNew(text) {
        let updatedList = addToList(this.state.list, {text, completed: false});

        this.setState({list: updatedList});
    }

    /**
     * @method changeFilter
     * @param {string} filter - The filter constant to apply. Expected values: `FILTER_ALL`
     *   (`'all'`), `FILTER_ACTIVE` (`'active'`), or `FILTER_COMPLETED` (`'completed'`) from
     *   `filter.js`.
     * @description Updates the active filter selection. Uses ES6 shorthand property `{filter}` in
     * `setState` to update the `filter` state field. The filter value is consumed by `TodoList.js`
     * which calls `applyFilter(list, filter)` from `filter.js` to compute the displayed items.
     */
    changeFilter(filter) {
        this.setState({filter});
    }

    /**
     * @method changeStatus
     * @param {number} itemId - The unique identifier of the todo item to update.
     * @param {boolean} completed - The new completion status for the item.
     * @description Updates a todo item's completion status using immutable state transformation.
     * Calls `updateStatus(this.state.list, itemId, completed)` from `todo.js`, which:
     * 1. Locates the item index via `items.findIndex(item => item.id === itemId)`
     * 2. Uses `immutability-helper`'s `update()` with
     *    `{[index]: {completed: {$set: completed}}}` command syntax to create a new array with
     *    the modified item
     * 3. Returns the new array (original array is never mutated)
     * Then calls `this.setState({list: updatedList})` to trigger a re-render.
     */
    changeStatus(itemId, completed) {
        const updatedList = updateStatus(this.state.list, itemId, completed);

        this.setState({list: updatedList});
    }

    /**
     * @method changeMode
     * @param {string} [mode=MODE_NONE] - The mode to switch to. Defaults to `MODE_NONE` (idle
     *   mode, value: `'none'`) if not provided. Expected values: `MODE_NONE`, `MODE_CREATE`
     *   (`'create'`), or `MODE_SEARCH` (`'search'`) from `mode.js`.
     * @description Sets the current UI input mode. The mode determines which input component (if
     * any) is rendered by `InputWrapper.js`: `MODE_CREATE` shows `InputBox` for adding new todos,
     * `MODE_SEARCH` shows `SearchBox` for filtering, and `MODE_NONE` hides the input area. Called
     * by `KeyStrokeHandler` in response to keyboard shortcuts (`N` → MODE_CREATE, `/` →
     * MODE_SEARCH, `Escape` → MODE_NONE) and by `ButtonWrapper.js` in response to button clicks.
     * The default parameter `mode = MODE_NONE` ensures that calling `changeMode()` without
     * arguments resets to idle mode.
     */
    changeMode(mode = MODE_NONE) {
        this.setState({mode});
    }

    /**
     * @method setSearchQuery
     * @param {string} text - The search query text entered by the user. Falsy values (null,
     *   undefined, empty string) are normalized to `''`.
     * @description Updates the search query string for real-time text filtering. Normalizes the
     * input by using `text || ''` to convert any falsy value to an empty string. The query is
     * consumed by `TodoList.js` which calls `search(filteredList, query)` from `filter.js` to
     * perform case-insensitive substring matching on todo item text. Called by `SearchBox.js` on
     * every keystroke (`onChange` event).
     */
    setSearchQuery(text) {
        this.setState({query: text || ''});
    }
}

export default StateProvider;
